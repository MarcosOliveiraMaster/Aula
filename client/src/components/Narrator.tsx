import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Loader2, Pause, Play, Settings2, SkipBack, SkipForward, Sparkles, Square, Volume2 } from "lucide-react";
import { jump, narrator, pause, resume, setEngine, setRate, stop, toggle } from "@/lib/speech/narrator";

export function useNarrator() {
  return useSyncExternalStore(narrator.subscribe, narrator.getState, narrator.getState);
}

let autoId = 0;

export function SpeakButton({ text, title, accent = "#f06d55", compact = false, id }: { text: string; title?: string; accent?: string; compact?: boolean; id?: string }) {
  const state = useNarrator();
  const idRef = useRef(id ?? `fala-${++autoId}`);
  const myId = id ?? idRef.current;
  const active = state.currentId === myId && state.status !== "idle";
  const loading = active && state.status === "loading";
  const label = active ? "Parar explicação" : "Ouvir explicação completa";
  const heading = title ?? text.split(/[.!?]/)[0].slice(0, 70);

  return (
    <button
      className={`speak-button ${compact ? "compact" : ""} ${active ? "speaking" : ""}`}
      style={{ "--speak-accent": accent } as React.CSSProperties}
      onClick={() => toggle(myId, heading, text)}
      aria-label={label}
      title={label}
    >
      {loading ? <Loader2 size={compact ? 13 : 15} className="spin" /> : active ? <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span> : <Volume2 size={compact ? 13 : 15} />}
      {!compact && <span className="speak-label">{active ? "Parar" : "Ouvir"}</span>}
    </button>
  );
}

const RATES = [0.8, 1, 1.2];

export function NarratorBar() {
  const state = useNarrator();
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = state.status !== "idle";

  useEffect(() => {
    if (!visible) setMenuOpen(false);
  }, [visible]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && narrator.getState().status !== "idle") stop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  const total = state.sentences.length;
  const progress = total ? ((state.index + (state.status === "paused" ? 0 : 0.5)) / total) * 100 : 0;
  const downloading = state.engine === "neural" && state.neural.state === "downloading";
  const engineLabel = state.activeEngine === "neural" ? "voz neural natural" : downloading ? "voz do aparelho (a voz natural está carregando)" : "voz do aparelho";

  return (
    <div className="narrator-bar" role="region" aria-label="Narrador da aula">
      <div className="narrator-progress"><i style={{ width: `${progress}%` }} /></div>
      <div className="narrator-inner">
        <div className="narrator-controls">
          <button onClick={() => jump(-1)} aria-label="Frase anterior" disabled={state.index === 0}><SkipBack size={16} /></button>
          {state.status === "paused" ? (
            <button className="narrator-main" onClick={resume} aria-label="Continuar"><Play size={18} fill="currentColor" /></button>
          ) : (
            <button className="narrator-main" onClick={pause} aria-label="Pausar">{state.status === "loading" ? <Loader2 size={18} className="spin" /> : <Pause size={18} fill="currentColor" />}</button>
          )}
          <button onClick={() => jump(1)} aria-label="Próxima frase" disabled={state.index >= total - 1}><SkipForward size={16} /></button>
          <button onClick={stop} aria-label="Parar"><Square size={14} fill="currentColor" /></button>
        </div>
        <div className="narrator-caption" aria-live="polite">
          <div className="narrator-meta"><span>{state.title}</span><b>{state.index + 1}/{total}</b></div>
          <p>{state.sentences[state.index]}</p>
        </div>
        <div className="narrator-settings">
          <button className="narrator-rate" onClick={() => setRate(RATES[(RATES.indexOf(state.rate) + 1) % RATES.length] ?? 1)} aria-label="Mudar velocidade">{String(state.rate).replace(".", ",")}×</button>
          <button className={menuOpen ? "active" : ""} onClick={() => setMenuOpen(!menuOpen)} aria-label="Escolher voz" aria-expanded={menuOpen}><Settings2 size={16} /></button>
        </div>
      </div>
      <div className="narrator-status">
        <Sparkles size={12} /> {engineLabel}
        {downloading && <span className="narrator-download"> · baixando voz natural {state.neural.progress}% (só na 1ª vez)</span>}
        {state.engine === "neural" && state.neural.state === "error" && <span className="narrator-download"> · a voz natural não carregou, usando a do aparelho</span>}
      </div>
      {menuOpen && (
        <div className="narrator-menu">
          <strong>Escolha a voz</strong>
          <button className={state.engine === "neural" ? "active" : ""} onClick={() => setEngine("neural")}>
            <span>Voz neural natural <em>recomendada</em></span>
            <small>{state.neural.state === "ready" ? "pronta" : state.neural.state === "downloading" ? `baixando ${state.neural.progress}%` : state.neural.state === "error" ? "indisponível neste navegador" : "baixa uma vez (~60 MB) e fica salva"}</small>
          </button>
          {state.systemVoices.map((voice) => (
            <button key={voice.uri} className={state.engine === "system" && state.systemVoiceURI === voice.uri ? "active" : ""} onClick={() => setEngine("system", voice.uri)}>
              <span>{voice.name.replace(/Microsoft |Google /, "")}{voice.score >= 6 && <em>natural</em>}</span>
              <small>voz do aparelho</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
