// Narrador da aula: toca explicações em voz alta, frase por frase.
// Voz principal: Piper (rede neural, pt-BR, roda no próprio navegador).
// Reserva: a melhor voz do sistema (ex.: vozes "Natural" do Edge, "Google português do Brasil").
import { splitSentences, toSpoken } from "./spoken";

export type EngineChoice = "neural" | "system";
export type NeuralState = "idle" | "downloading" | "ready" | "error";

export type NarratorState = {
  status: "idle" | "loading" | "playing" | "paused";
  currentId: string | null;
  title: string;
  sentences: string[];
  index: number;
  rate: number;
  engine: EngineChoice;
  activeEngine: EngineChoice | null;
  neural: { state: NeuralState; progress: number; error?: string };
  systemVoices: Array<{ uri: string; name: string; score: number }>;
  systemVoiceURI: string | null;
};

const NEURAL_VOICE_ID = "pt_BR-faber-medium";
const STORAGE_KEY = "aula-narrador";
const SILENT_WAV = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

const hasWindow = typeof window !== "undefined";
const hasSystemSpeech = hasWindow && "speechSynthesis" in window;

function readSaved(): Partial<Pick<NarratorState, "rate" | "engine" | "systemVoiceURI">> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const saved = hasWindow ? readSaved() : {};

let state: NarratorState = {
  status: "idle",
  currentId: null,
  title: "",
  sentences: [],
  index: 0,
  rate: saved.rate ?? 1,
  engine: saved.engine ?? "neural",
  activeEngine: null,
  neural: { state: "idle", progress: 0 },
  systemVoices: [],
  systemVoiceURI: saved.systemVoiceURI ?? null,
};

const listeners = new Set<() => void>();

function setState(patch: Partial<NarratorState>) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ rate: state.rate, engine: state.engine, systemVoiceURI: state.systemVoiceURI }));
  } catch {
    /* armazenamento indisponível: o narrador continua funcionando */
  }
}

export const narrator = {
  getState: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/* ------------------------------ vozes do sistema ------------------------------ */

function scoreVoice(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  let score = 0;
  if (/natural|neural/.test(name)) score += 6;
  if (/online/.test(name)) score += 2;
  if (/premium|enhanced|aprimorad|superior/.test(name)) score += 5;
  if (/google/.test(name)) score += 3;
  if (/francisca|thalita|antonio|luciana|felipe/.test(name)) score += 1;
  if (/desktop|compact|eloquence|espeak/.test(name)) score -= 2;
  if (!voice.localService) score += 1;
  return score;
}

function loadSystemVoices() {
  if (!hasSystemSpeech) return;
  const voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => /^pt[-_]br/i.test(voice.lang) || (/^pt\b/i.test(voice.lang) && !/pt[-_]pt/i.test(voice.lang)))
    .map((voice) => ({ uri: voice.voiceURI, name: voice.name, score: scoreVoice(voice) }))
    .sort((a, b) => b.score - a.score);
  if (!voices.length) return;
  const keep = voices.some((voice) => voice.uri === state.systemVoiceURI);
  const patch: Partial<NarratorState> = { systemVoices: voices, systemVoiceURI: keep ? state.systemVoiceURI : voices[0].uri };
  // Se o navegador já tem uma voz natural de alta qualidade (ex.: Edge), ela é usada por padrão.
  if (!saved.engine && voices[0].score >= 6) patch.engine = "system";
  setState(patch);
}

if (hasSystemSpeech) {
  loadSystemVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", loadSystemVoices);
}

function findSystemVoice() {
  if (!hasSystemSpeech) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.voiceURI === state.systemVoiceURI) ?? voices.find((voice) => /^pt[-_]br/i.test(voice.lang)) ?? null;
}

/* --------------------------------- voz neural --------------------------------- */

let worker: Worker | null = null;
let nextSynthId = 1;
const pending = new Map<number, { resolve: (blob: Blob) => void; reject: (error: Error) => void }>();
const audioCache = new Map<string, Promise<Blob>>();

function ensureNeural() {
  if (worker || typeof Worker === "undefined") return;
  try {
    worker = new Worker(new URL("./piper.worker.ts", import.meta.url), { type: "module" });
  } catch (error) {
    setState({ neural: { state: "error", progress: 0, error: String(error) } });
    return;
  }
  setState({ neural: { state: "downloading", progress: 0 } });
  worker.onmessage = (event) => {
    const message = event.data;
    if (message.type === "progress") setState({ neural: { state: "downloading", progress: Math.min(99, Math.round((message.loaded / message.total) * 100)) } });
    if (message.type === "ready") setState({ neural: { state: "ready", progress: 100 } });
    if (message.type === "error") {
      setState({ neural: { state: "error", progress: 0, error: message.message } });
      worker?.terminate();
      worker = null;
    }
    if (message.type === "audio") pending.get(message.id)?.resolve(message.blob);
    if (message.type === "synth-error") pending.get(message.id)?.reject(new Error(message.message));
    if (message.type === "audio" || message.type === "synth-error") pending.delete(message.id);
  };
  worker.postMessage({ type: "init", voiceId: NEURAL_VOICE_ID });
}

function synthesize(text: string) {
  const cached = audioCache.get(text);
  if (cached) return cached;
  const promise = new Promise<Blob>((resolve, reject) => {
    if (!worker) return reject(new Error("Voz neural indisponível"));
    const id = nextSynthId++;
    pending.set(id, { resolve, reject });
    worker.postMessage({ type: "synth", id, text });
  });
  promise.catch(() => audioCache.delete(text));
  audioCache.set(text, promise);
  if (audioCache.size > 80) audioCache.delete(audioCache.keys().next().value as string);
  return promise;
}

/* --------------------------------- reprodução --------------------------------- */

let token = 0;
let audioElement: HTMLAudioElement | null = null;
let currentUrl: string | null = null;

function getAudio() {
  if (!audioElement) {
    audioElement = new Audio();
    audioElement.preload = "auto";
  }
  return audioElement;
}

/** Desbloqueia o áudio no iPhone/iPad: precisa acontecer dentro do clique. */
function unlockAudio() {
  const audio = getAudio();
  if (audio.src) return;
  audio.src = SILENT_WAV;
  audio.play().catch(() => undefined);
}

function stopOutput() {
  if (hasSystemSpeech) window.speechSynthesis.cancel();
  if (audioElement) {
    audioElement.onended = null;
    audioElement.onerror = null;
    audioElement.pause();
  }
  if (currentUrl) {
    URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function playBlob(blob: Blob, myToken: number) {
  return new Promise<void>((resolve, reject) => {
    if (myToken !== token) return resolve();
    const audio = getAudio();
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(blob);
    audio.src = currentUrl;
    audio.playbackRate = state.rate;
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("Falha ao tocar o áudio"));
    audio.play().catch(reject);
  });
}

function speakSystem(text: string, myToken: number) {
  return new Promise<void>((resolve) => {
    if (!hasSystemSpeech || myToken !== token) return resolve();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = findSystemVoice();
    try {
      if (voice) utterance.voice = voice;
    } catch {
      /* voz inválida: o navegador usa a voz padrão do idioma */
    }
    utterance.lang = voice?.lang ?? "pt-BR";
    utterance.rate = state.rate * 0.95;
    utterance.pitch = 1;
    // Alguns navegadores às vezes não disparam "onend": este tempo limite evita travar a fila.
    const guard = setTimeout(resolve, 2500 + text.length * 120 / state.rate);
    utterance.onend = () => { clearTimeout(guard); resolve(); };
    utterance.onerror = () => { clearTimeout(guard); resolve(); };
    window.speechSynthesis.speak(utterance);
  });
}

function waitForNeural() {
  return new Promise<void>((resolve) => {
    const check = () => {
      if (state.neural.state === "ready" || state.neural.state === "error") {
        unsubscribe();
        resolve();
      }
    };
    const unsubscribe = narrator.subscribe(check);
    check();
  });
}

async function run(myToken: number) {
  // Sem voz do sistema (raro), espera a voz neural terminar de carregar.
  if (!hasSystemSpeech && state.engine === "neural" && state.neural.state === "downloading") await waitForNeural();
  if (myToken !== token) return;
  const useNeural = state.engine === "neural" && state.neural.state === "ready";
  setState({ activeEngine: useNeural ? "neural" : "system", status: useNeural ? "loading" : "playing" });
  if (!useNeural) await wait(60); // o Chrome ignora falas iniciadas logo após um cancel()

  for (let i = state.index; i < state.sentences.length; i++) {
    if (myToken !== token) return;
    setState({ index: i });
    const sentence = state.sentences[i];
    if (useNeural) {
      try {
        const blob = await synthesize(sentence);
        if (state.sentences[i + 1]) synthesize(state.sentences[i + 1]).catch(() => undefined);
        if (myToken !== token) return;
        setState({ status: "playing" });
        await playBlob(blob, myToken);
      } catch {
        if (myToken !== token) return;
        // Se a voz neural falhar nesta frase, a voz do sistema assume para não interromper a explicação.
        setState({ activeEngine: "system", status: "playing" });
        await speakSystem(sentence, myToken);
      }
    } else {
      await speakSystem(sentence, myToken);
    }
  }
  if (myToken === token) {
    stopOutput();
    setState({ status: "idle", currentId: null, index: 0, activeEngine: null });
  }
}

export function speak(id: string, title: string, text: string) {
  unlockAudio();
  if (state.engine === "neural") ensureNeural();
  token++;
  stopOutput();
  const sentences = splitSentences(toSpoken(text));
  if (!sentences.length) return;
  setState({ currentId: id, title, sentences, index: 0, status: "loading" });
  run(token);
}

export function toggle(id: string, title: string, text: string) {
  if (state.currentId === id && state.status !== "idle") stop();
  else speak(id, title, text);
}

export function stop() {
  token++;
  stopOutput();
  setState({ status: "idle", currentId: null, index: 0, activeEngine: null });
}

export function pause() {
  if (state.status !== "playing" && state.status !== "loading") return;
  token++;
  stopOutput();
  setState({ status: "paused" });
}

export function resume() {
  if (state.status !== "paused") return;
  unlockAudio();
  token++;
  run(token);
}

export function jump(delta: number) {
  if (state.status === "idle") return;
  const index = Math.max(0, Math.min(state.sentences.length - 1, state.index + delta));
  unlockAudio();
  token++;
  stopOutput();
  setState({ index });
  run(token);
}

export function setRate(rate: number) {
  setState({ rate });
  if (audioElement) audioElement.playbackRate = rate;
  persist();
}

export function setEngine(engine: EngineChoice, systemVoiceURI?: string) {
  setState({ engine, systemVoiceURI: systemVoiceURI ?? state.systemVoiceURI });
  saved.engine = engine;
  persist();
  if (engine === "neural") ensureNeural();
  if (state.status === "playing" || state.status === "loading") {
    token++;
    stopOutput();
    run(token);
  }
}
