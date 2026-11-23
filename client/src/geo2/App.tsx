import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { NarratorBar, SpeakButton } from "@/components/Narrator";
import { stop as stopNarrator } from "@/lib/speech/narrator";
import { COR, MODULOS } from "./conteudo";

const SUAVE = "#eaf1f8";
const TINTA = "#1d3f61";

function lerHash(): string | null {
  const h = window.location.hash.replace(/^#/, "");
  return MODULOS.some((m) => m.id === h) ? h : null;
}

function ir(id: string | null) {
  window.location.hash = id ?? "";
  window.scrollTo({ top: 0 });
}

export default function App() {
  const [atual, setAtual] = useState<string | null>(lerHash);
  useEffect(() => {
    const on = () => { stopNarrator(); setAtual(lerHash()); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const modulo = MODULOS.find((m) => m.id === atual) ?? null;
  useEffect(() => {
    document.title = modulo ? `${modulo.titulo} · Geografia 02` : "Geografia 02 · Nacionalismo e Geopolítica";
  }, [modulo]);

  return (
    <div className="k-app g2" style={{ "--accent": COR, "--soft": SUAVE, "--ink-accent": TINTA } as React.CSSProperties}>
      <header className="k-header">
        <div className="k-header-inner">
          <button className="k-brand" onClick={() => ir(null)} aria-label="Início da Geografia 02">
            <span className="k-brand-mark" aria-hidden="true">G2</span>
            <span className="k-brand-text">
              <b>Geografia 02</b>
              <small>Nacionalismo e Geopolítica</small>
            </span>
          </button>
          <nav className="k-subject-tabs" aria-label="Navegação">
            <a className="k-home-link" href="../" title="Voltar para a página inicial">
              <Home size={16} />
              <span className="k-tab-label">Início</span>
            </a>
          </nav>
        </div>
      </header>

      <div className="k-layout">
        <aside className="k-sidebar" aria-label="Módulos">
          <button className={`k-side-title ${modulo ? "" : "on"}`} onClick={() => ir(null)}>
            <span aria-hidden="true">🌐</span>
            <span><b>Geografia 02</b><small>Ensino Médio</small></span>
          </button>
          <nav className="k-topic-nav">
            {MODULOS.map((m, i) => (
              <button key={m.id} className={m.id === atual ? "on" : ""} onClick={() => ir(m.id)} aria-current={m.id === atual ? "page" : undefined}>
                <span className="k-topic-num">{i + 1}</span>
                <span className="k-topic-name"><span aria-hidden="true">{m.emoji} </span>{m.titulo}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="k-main" id="conteudo">
          {modulo ? <ModuloView id={modulo.id} /> : <Capa />}
        </main>
      </div>

      <footer className="k-footer">Geografia 02 · Guia de estudos online: Nacionalismo e Conflitos Geopolíticos (Ensino Médio). Bons estudos! 📚</footer>
      <NarratorBar />
    </div>
  );
}

function Capa() {
  return (
    <div className="k-subject-home">
      <div className="k-topic-hero">
        <span className="k-eyebrow">Guia de estudos online · Ensino Médio</span>
        <h1><span aria-hidden="true">🌐</span> Nacionalismo e Conflitos Geopolíticos</h1>
        <div className="k-summary">
          <div>
            <strong>Como estudar</strong>
            <p>Cada módulo começa com uma <b>descrição simplificada</b> (para entender a ideia principal) e depois traz a <b>descrição completa e aprofundada</b>. No fim, teste o que aprendeu na central de jogos e revise pelo glossário.</p>
          </div>
          <SpeakButton id="g2-capa" accent={COR} title="Como estudar" text="Cada módulo começa com uma descrição simplificada, para entender a ideia principal, e depois traz a descrição completa e aprofundada. No fim, teste o que aprendeu na central de jogos e revise pelo glossário." />
        </div>
      </div>
      <h2 className="k-h2">Escolha um módulo</h2>
      <div className="k-topic-cards">
        {MODULOS.map((m) => (
          <button key={m.id} className="k-topic-card" onClick={() => ir(m.id)}>
            <span className="k-topic-card-emoji" aria-hidden="true">{m.emoji}</span>
            <span className="k-topic-card-num">{m.numero}</span>
            <b>{m.titulo}</b>
            <small>{m.resumo}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function ModuloView({ id }: { id: string }) {
  const i = MODULOS.findIndex((m) => m.id === id);
  const m = MODULOS[i];
  const prev = MODULOS[i - 1];
  const next = MODULOS[i + 1];
  const Corpo = m.corpo;
  return (
    <article className="k-topic">
      <div className="k-mobile-topics" role="navigation" aria-label="Outros módulos">
        {MODULOS.map((x, j) => (
          <button key={x.id} className={x.id === id ? "on" : ""} onClick={() => ir(x.id)}>{x.emoji} {j + 1}</button>
        ))}
      </div>
      <header className="k-topic-hero">
        <span className="k-eyebrow">Geografia 02 · {m.numero} de {MODULOS.length}</span>
        <h1><span aria-hidden="true">{m.emoji}</span> {m.titulo}</h1>
        <div className="k-summary">
          <div>
            <strong>Neste módulo</strong>
            <p>{m.resumo}</p>
          </div>
        </div>
      </header>
      <div className="k-topic-body">
        <Corpo />
      </div>
      <div className="k-topic-footer">
        <span />
        <div className="k-pager">
          {prev ? (
            <button className="k-btn ghost" onClick={() => ir(prev.id)}>
              <ArrowLeft size={16} /> <span className="k-hide-sm">{prev.titulo}</span><span className="k-show-sm">Anterior</span>
            </button>
          ) : <span />}
          {next ? (
            <button className="k-btn" onClick={() => ir(next.id)}>
              <span className="k-hide-sm">{next.titulo}</span><span className="k-show-sm">Próximo</span> <ArrowRight size={16} />
            </button>
          ) : (
            <button className="k-btn" onClick={() => ir(null)}>Voltar ao início <ArrowRight size={16} /></button>
          )}
        </div>
      </div>
    </article>
  );
}
