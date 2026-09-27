/// <reference lib="webworker" />
// Roda a voz neural Piper (modelo pt-BR) fora da thread principal, para a página não travar.
import { TtsSession } from "@mintplex-labs/piper-tts-web";

type Incoming = { type: "init"; voiceId: string } | { type: "synth"; id: number; text: string };

const ctx = self as unknown as DedicatedWorkerGlobalScope;
let session: TtsSession | null = null;
let ready: Promise<void> | null = null;

function init(voiceId: string) {
  if (ready) return ready;
  ready = (async () => {
    session = await TtsSession.create({
      voiceId,
      progress: (progress) => {
        if (progress.url.endsWith(".onnx") && progress.total > 0) {
          ctx.postMessage({ type: "progress", loaded: progress.loaded, total: progress.total });
        }
      },
    });
    ctx.postMessage({ type: "ready" });
  })().catch((error) => {
    ready = null;
    ctx.postMessage({ type: "error", message: String(error?.message ?? error) });
    throw error;
  });
  return ready;
}

ctx.onmessage = async (event: MessageEvent<Incoming>) => {
  const message = event.data;
  if (message.type === "init") {
    init(message.voiceId).catch(() => undefined);
    return;
  }
  if (message.type === "synth") {
    try {
      await ready;
      if (!session) throw new Error("Voz neural não carregada");
      const blob = await session.predict(message.text);
      ctx.postMessage({ type: "audio", id: message.id, blob });
    } catch (error: any) {
      ctx.postMessage({ type: "synth-error", id: message.id, message: String(error?.message ?? error) });
    }
  }
};
