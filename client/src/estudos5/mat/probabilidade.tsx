// U11 · Probabilidade: impossível, pouco provável, provável, certo
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Desafio, Resultado, embaralhar, pick, rnd, tx, useSemente, type Lang, type QA } from "./util";

export const PALAVRAS = { pt: ["impossível", "pouco provável", "provável", "certo"], en: ["impossible", "unlikely", "likely", "certain"] } as const;
export const CORES = [
  { id: "red", pt: "vermelha", pts: "vermelhas", en: "red", hex: "#e0573f" },
  { id: "blue", pt: "azul", pts: "azuis", en: "blue", hex: "#3d82d6" },
  { id: "green", pt: "verde", pts: "verdes", en: "green", hex: "#2aa26f" },
  { id: "purple", pt: "roxa", pts: "roxas", en: "purple", hex: "#8e5bd8" },
  { id: "yellow", pt: "amarela", pts: "amarelas", en: "yellow", hex: "#e9b412" },
  { id: "black", pt: "preta", pts: "pretas", en: "black", hex: "#333333" },
];
type Cor = (typeof CORES)[number];

/** 0 impossível · 1 pouco provável · 2 provável · 3 certo */
export function chance(qtd: number, total: number) {
  if (qtd === 0) return 0;
  if (qtd === total) return 3;
  return qtd * 2 > total ? 2 : 1;
}

/** Saco com fichas (desenho). */
export function Saco({ fichas, tam = 180, sorteada }: { fichas: Cor[]; tam?: number; sorteada?: number | null }) {
  return (
    <svg viewBox="0 0 200 200" width={tam} className="k-bag" role="img" aria-label={`Saco com ${fichas.length} fichas`}>
      <path d="M40 60 Q30 190 100 192 Q170 190 160 60 Z" fill="#f4e3c3" stroke="#9a6a2a" strokeWidth="3" />
      <path d="M40 60 Q100 40 160 60" fill="none" stroke="#9a6a2a" strokeWidth="3" />
      {fichas.map((f, i) => {
        const col = i % 4, lin = Math.floor(i / 4);
        return <motion.circle key={i} cx={70 + col * 20 + (lin % 2) * 6} cy={166 - lin * 21} r="9" fill={f.hex} stroke="#fff" strokeWidth="2"
          initial={{ cy: 40, opacity: 0 }} animate={{ cy: 166 - lin * 21, opacity: sorteada === i ? 0.25 : 1 }} transition={{ delay: i * 0.03 }} />;
      })}
    </svg>
  );
}

const fichasDe = (contagem: Array<{ cor: Cor; n: number }>) => contagem.flatMap(({ cor, n }) => Array.from({ length: n }, () => cor));

/* ============================= PT 1 — monte o saco (questão 7) ============================= */

export function MonteOSaco({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const regras = useMemo(() => {
    const total = pick([10, 12, 12, 14]);
    const cores = embaralhar(CORES).slice(0, 4);
    const cats = embaralhar([2, 1, 1, 0]);
    return { total, itens: cores.map((cor, i) => ({ cor, cat: cats[i] })) };
  }, [semente]);
  const [qtd, setQtd] = useState<Record<string, number>>({});
  const [conf, setConf] = useState(false);
  const [tiradas, setTiradas] = useState<Record<string, number>>({});
  const soma = regras.itens.reduce((s, it) => s + (qtd[it.cor.id] ?? 0), 0);
  const ok = soma === regras.total && regras.itens.every((it) => chance(qtd[it.cor.id] ?? 0, regras.total) === it.cat);
  const fichas = fichasDe(regras.itens.map((it) => ({ cor: it.cor, n: qtd[it.cor.id] ?? 0 })));
  const sortear = () => {
    const t: Record<string, number> = {};
    for (let i = 0; i < 20; i++) { const f = pick(fichas); t[f.id] = (t[f.id] ?? 0) + 1; }
    setTiradas(t);
  };
  return (
    <Desafio lang={lang} titulo={tx(lang, "Monte o saco de fichas", "Fill the bag of counters")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, `Coloque exatamente ${regras.total} fichas no saco para que:`, `Put exactly ${regras.total} counters in the bag so that:`)}
        <ul className="k-list">{regras.itens.map((it) => <li key={it.cor.id}>{tx(lang, `Tirar uma ficha ${it.cor.pt} seja`, `Picking a ${it.cor.en} counter is`)} <b>{PALAVRAS[lang][it.cat]}</b>.</li>)}</ul></>}
      onNovo={() => { novo(); setQtd({}); setConf(false); setTiradas({}); }}>
      <div className="k-bag-layout">
        <Saco fichas={fichas} />
        <div className="k-bag-controls">
          {regras.itens.map((it) => (
            <div key={it.cor.id} className="k-bag-row">
              <i style={{ background: it.cor.hex }} />
              <span>{lang === "pt" ? it.cor.pt : it.cor.en}</span>
              <button className="k-btn ghost" onClick={() => { setQtd({ ...qtd, [it.cor.id]: Math.max(0, (qtd[it.cor.id] ?? 0) - 1) }); setConf(false); setTiradas({}); }}>−</button>
              <b>{qtd[it.cor.id] ?? 0}</b>
              <button className="k-btn ghost" onClick={() => { if (soma < regras.total) { setQtd({ ...qtd, [it.cor.id]: (qtd[it.cor.id] ?? 0) + 1 }); setConf(false); setTiradas({}); } }}>+</button>
            </div>
          ))}
          <p className="k-live">{tx(lang, "Total", "Total")}: <b>{soma}/{regras.total}</b></p>
        </div>
      </div>
      <div className="k-actions">
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
        {ok && conf && <button className="k-btn ghost" onClick={sortear}>🎲 {tx(lang, "Sortear 20 vezes", "Draw 20 times")}</button>}
      </div>
      <Resultado ok={conf ? ok : null} lang={lang}>
        {tx(lang, "Provável = mais da metade das fichas. Pouco provável = poucas fichas (menos da metade). Impossível = nenhuma ficha.", "Likely = more than half of the counters. Unlikely = only a few (less than half). Impossible = none.")}
      </Resultado>
      {Object.keys(tiradas).length > 0 && (
        <div className="k-tally">
          {regras.itens.map((it) => (
            <div key={it.cor.id} className="k-tally-row"><i style={{ background: it.cor.hex }} /><motion.div className="k-tally-bar" style={{ background: it.cor.hex }} initial={{ width: 0 }} animate={{ width: `${((tiradas[it.cor.id] ?? 0) / 20) * 100}%` }} /><b>{tiradas[it.cor.id] ?? 0}</b></div>
          ))}
          <small>{tx(lang, "Resultado de 20 sorteios (devolvendo a ficha a cada vez).", "Results of 20 draws (putting the counter back each time).")}</small>
        </div>
      )}
    </Desafio>
  );
}

/* ================================== roleta ================================== */

function Roleta({ setores, giro }: { setores: Cor[]; giro: number }) {
  const n = setores.length, r = 90;
  return (
    <div className="k-spinner">
      <motion.svg viewBox="0 0 200 200" width="200" animate={{ rotate: giro }} transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}>
        {setores.map((c, i) => {
          const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
          return <path key={i} d={`M100 100 L${100 + r * Math.cos(a0)} ${100 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${100 + r * Math.cos(a1)} ${100 + r * Math.sin(a1)} Z`} fill={c.hex} stroke="#fff" strokeWidth="3" />;
        })}
        <circle cx="100" cy="100" r="10" fill="#fff" stroke="#333" strokeWidth="2" />
      </motion.svg>
      <span className="k-spinner-arrow">▼</span>
    </div>
  );
}
/** Setor que fica embaixo da seta depois de girar. */
const setorNoTopo = (giro: number, n: number) => { const ang = ((360 - (giro % 360)) % 360); return Math.floor(ang / (360 / n)) % n; };

/** PT 2 — classifique a chance de cada cor na roleta e gire. */
export function RoletaChances({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const d = useMemo(() => {
    const cores = embaralhar(CORES).slice(0, 4);
    const a = rnd(5, 7); const b = rnd(1, 8 - a - 1); const c = 8 - a - b;
    const setores = embaralhar([...Array(a).fill(cores[0]), ...Array(b).fill(cores[1]), ...Array(c).fill(cores[2])]) as Cor[];
    return { setores, perguntas: embaralhar([cores[0], cores[1], cores[2], cores[3]]) };
  }, [semente]);
  const [resp, setResp] = useState<Record<string, number>>({});
  const [conf, setConf] = useState(false);
  const [giro, setGiro] = useState(0);
  const conta = (c: Cor) => d.setores.filter((s) => s.id === c.id).length;
  const acertos = d.perguntas.filter((c) => resp[c.id] === chance(conta(c), 8)).length;
  const caiu = giro ? d.setores[setorNoTopo(giro, 8)] : null;
  return (
    <Desafio lang={lang} titulo={tx(lang, "A roleta das chances", "The chance spinner")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={tx(lang, "A roleta tem 8 partes iguais. Escolha a chance de a seta parar em cada cor. Depois gire!", "The spinner has 8 equal parts. Choose the chance of landing on each color. Then spin!")}
      onNovo={() => { novo(); setResp({}); setConf(false); setGiro(0); }}>
      <div className="k-bag-layout">
        <div className="k-center">
          <Roleta setores={d.setores} giro={giro} />
          <button className="k-btn" onClick={() => setGiro(giro + 720 + rnd(0, 359))}>🌀 {tx(lang, "Girar", "Spin")}</button>
          <AnimatePresence>{caiu && <motion.p key={giro} className="k-live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>{tx(lang, "Parou no", "Landed on")} <b style={{ color: caiu.hex }}>{lang === "pt" ? caiu.pt : caiu.en}</b>!</motion.p>}</AnimatePresence>
        </div>
        <div className="k-bag-controls">
          {d.perguntas.map((c) => (
            <div key={c.id} className="k-bag-row wide">
              <i style={{ background: c.hex }} />
              <span>{lang === "pt" ? c.pt : c.en}</span>
              <select className={`k-select ${conf ? (resp[c.id] === chance(conta(c), 8) ? "right" : "wrong") : ""}`} value={resp[c.id] ?? ""} onChange={(e) => { setResp({ ...resp, [c.id]: +e.target.value }); setConf(false); }}>
                <option value="">…</option>
                {PALAVRAS[lang].map((p, i) => <option key={p} value={i}>{p}</option>)}
              </select>
            </div>
          ))}
          <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
        </div>
      </div>
      <Resultado ok={conf ? acertos === 4 : null} lang={lang}>
        {d.perguntas.map((c) => `${lang === "pt" ? c.pt : c.en}: ${conta(c)}/8 → ${PALAVRAS[lang][chance(conta(c), 8)]}`).join(" · ")}
      </Resultado>
    </Desafio>
  );
}

/* ============================ EN 1 — monte a roleta ============================ */

export function BuildSpinner({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const regras = useMemo(() => {
    const cores = embaralhar(CORES).slice(0, 3);
    return [{ cor: cores[0], cat: 2 }, { cor: cores[1], cat: 1 }, { cor: cores[2], cat: 0 }];
  }, [semente]);
  const opcoes = [regras[0].cor, regras[1].cor, regras[2].cor, CORES.find((c) => !regras.some((r) => r.cor.id === c.id))!];
  const [setores, setSetores] = useState<number[]>(() => Array(8).fill(3));
  const [giro, setGiro] = useState(0);
  const [conf, setConf] = useState(false);
  const cores = setores.map((i) => opcoes[i]);
  const ok = regras.every((r) => chance(cores.filter((c) => c.id === r.cor.id).length, 8) === r.cat);
  const n = 8, r = 90;
  return (
    <Desafio lang={lang} titulo="Design the spinner" nivel="Step 3"
      instrucao={<>Tap the parts of the spinner to change their color. Make: {regras.map((x, i) => <span key={i}><b>{x.cor.en}</b> {PALAVRAS.en[x.cat]}{i < 2 ? ", " : "."}</span>)}</>}
      onNovo={() => { novo(); setSetores(Array(8).fill(3)); setConf(false); setGiro(0); }}>
      <div className="k-bag-layout">
        <div className="k-spinner">
          <motion.svg viewBox="0 0 200 200" width="210" animate={{ rotate: giro }} transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}>
            {cores.map((c, i) => {
              const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
              return <path key={i} d={`M100 100 L${100 + r * Math.cos(a0)} ${100 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${100 + r * Math.cos(a1)} ${100 + r * Math.sin(a1)} Z`} fill={c.hex} stroke="#fff" strokeWidth="3" style={{ cursor: "pointer" }}
                onClick={() => { const s = [...setores]; s[i] = (s[i] + 1) % opcoes.length; setSetores(s); setConf(false); }} />;
            })}
          </motion.svg>
          <span className="k-spinner-arrow">▼</span>
        </div>
        <div className="k-bag-controls">
          {opcoes.map((c) => <div key={c.id} className="k-bag-row"><i style={{ background: c.hex }} /><span>{c.en}</span><b>{cores.filter((x) => x.id === c.id).length}/8</b></div>)}
          <button className="k-btn" onClick={() => setConf(true)}>Check</button>
          {conf && ok && <button className="k-btn ghost" onClick={() => setGiro(giro + 720 + rnd(0, 359))}>🌀 Spin</button>}
        </div>
      </div>
      <Resultado ok={conf ? ok : null} lang={lang}>Likely: more than 4 of the 8 parts. Unlikely: only a few parts (less than half). Impossible: 0 parts.</Resultado>
    </Desafio>
  );
}

/* ======================= EN 2 — preveja e sorteie ======================= */

export function PredictAndDraw({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const d = useMemo(() => {
    const cores = embaralhar(CORES).slice(0, 3);
    const ns = embaralhar([rnd(6, 9), rnd(3, 4), rnd(1, 2)]);
    return cores.map((cor, i) => ({ cor, n: ns[i] }));
  }, [semente]);
  const fichas = fichasDe(d);
  const [prev, setPrev] = useState<string | null>(null);
  const [cont, setCont] = useState<Record<string, number>>({});
  const [sorteando, setSorteando] = useState(false);
  const mais = [...d].sort((a, b) => b.n - a.n)[0].cor.id;
  const sortear = () => {
    setSorteando(true); setCont({});
    let i = 0;
    const id = window.setInterval(() => {
      const f = pick(fichas);
      setCont((c) => ({ ...c, [f.id]: (c[f.id] ?? 0) + 1 }));
      if (++i >= 30) { window.clearInterval(id); setSorteando(false); }
    }, 70);
  };
  return (
    <Desafio lang={lang} titulo="Predict, then draw" nivel="Step 4" instrucao="Which color are you most likely to pick from this bag? Predict, then draw 30 times (putting the counter back each time)."
      onNovo={() => { novo(); setPrev(null); setCont({}); }}>
      <div className="k-bag-layout">
        <Saco fichas={fichas} />
        <div className="k-bag-controls">
          {d.map(({ cor, n }) => (
            <button key={cor.id} className={`k-bag-row pick ${prev === cor.id ? "on" : ""}`} onClick={() => setPrev(cor.id)}>
              <i style={{ background: cor.hex }} /><span>{cor.en} ({n})</span>
            </button>
          ))}
          <button className="k-btn" disabled={!prev || sorteando} onClick={sortear}>🎲 Draw 30 times</button>
        </div>
      </div>
      {Object.keys(cont).length > 0 && (
        <div className="k-tally">
          {d.map(({ cor }) => <div key={cor.id} className="k-tally-row"><i style={{ background: cor.hex }} /><motion.div className="k-tally-bar" style={{ background: cor.hex }} animate={{ width: `${((cont[cor.id] ?? 0) / 30) * 100}%` }} /><b>{cont[cor.id] ?? 0}</b></div>)}
        </div>
      )}
      {prev && !sorteando && Object.keys(cont).length > 0 && (
        <Resultado ok={prev === mais} lang={lang}>The <b>{d.find((x) => x.cor.id === mais)!.cor.en}</b> counters are the most, so picking {d.find((x) => x.cor.id === mais)!.cor.en} is the <b>most likely</b>.</Resultado>
      )}
    </Desafio>
  );
}

/* ================================== quizzes ================================== */

function sacoAleatorio() {
  const cores = embaralhar(CORES).slice(0, 3);
  const total = pick([10, 12]);
  const a = rnd(Math.floor(total / 2) + 1, total - 2); const b = rnd(1, total - a - 1); const c = total - a - b;
  return { total, itens: [{ cor: cores[0], n: a }, { cor: cores[1], n: b }, { cor: cores[2], n: c }], fora: CORES.find((x) => !cores.includes(x))! };
}

export const quizProbPT: Array<() => QA> = [
  () => {
    const s = sacoAleatorio(); const alvo = pick(s.itens); const cat = chance(alvo.n, s.total);
    return { q: <>Num saco há {s.itens.map((x) => (x.n === 1 ? `1 ficha ${x.cor.pt}` : `${x.n} fichas ${x.cor.pts}`)).join(", ")}. Tirar uma ficha <b>{alvo.cor.pt}</b> sem olhar é:</>, figura: <Saco fichas={fichasDe(s.itens)} tam={140} />,
      certa: PALAVRAS.pt[cat], erradas: PALAVRAS.pt.filter((p) => p !== PALAVRAS.pt[cat]) as string[],
      why: <>{alvo.n} de {s.total} fichas. {cat === 2 ? "É mais da metade: provável." : "É menos da metade: pouco provável."}</> };
  },
  () => {
    const s = sacoAleatorio(); const certo = Math.random() < 0.5;
    return { q: certo ? <>No saco só há fichas {s.itens.map((x) => x.cor.pts).join(", ")}. Tirar uma ficha que <b>não é {s.fora.pt}</b> é:</> : <>No saco só há fichas {s.itens.map((x) => x.cor.pts).join(", ")}. Tirar uma ficha <b>{s.fora.pt}</b> é:</>,
      figura: <Saco fichas={fichasDe(s.itens)} tam={140} />,
      certa: certo ? "certo" : "impossível", erradas: certo ? ["impossível", "provável", "pouco provável"] : ["certo", "provável", "pouco provável"],
      why: certo ? <>Nenhuma ficha é {s.fora.pt}, então qualquer ficha tirada <b>não é {s.fora.pt}</b>: é <b>certo</b>.</> : <>Não há nenhuma ficha {s.fora.pt}: é <b>impossível</b>.</> };
  },
];
export const quizProbEN: Array<() => QA> = [
  () => {
    const s = sacoAleatorio(); const alvo = pick(s.itens); const cat = chance(alvo.n, s.total);
    return { q: <>A bag has {s.itens.map((x) => `${x.n} ${x.cor.en}`).join(", ")} counters. Picking a <b>{alvo.cor.en}</b> counter without looking is:</>, figura: <Saco fichas={fichasDe(s.itens)} tam={140} />,
      certa: PALAVRAS.en[cat], erradas: PALAVRAS.en.filter((p) => p !== PALAVRAS.en[cat]) as string[],
      why: <>{alvo.n} out of {s.total}. {cat === 2 ? "More than half: likely." : "Less than half: unlikely."}</> };
  },
  () => {
    const s = sacoAleatorio(); const certo = Math.random() < 0.5;
    return { q: certo ? <>A bag has only {s.itens.map((x) => x.cor.en).join(", ")} counters. Picking a counter that is <b>not {s.fora.en}</b> is:</> : <>A bag has only {s.itens.map((x) => x.cor.en).join(", ")} counters. Picking a <b>{s.fora.en}</b> counter is:</>,
      figura: <Saco fichas={fichasDe(s.itens)} tam={140} />,
      certa: certo ? "certain" : "impossible", erradas: certo ? ["impossible", "likely", "unlikely"] : ["certain", "likely", "unlikely"],
      why: certo ? <>There are no {s.fora.en} counters, so it is <b>certain</b>.</> : <>There are no {s.fora.en} counters: <b>impossible</b>.</> };
  },
];
