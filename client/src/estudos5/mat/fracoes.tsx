// U8 · Frações e números mistos · Frações e decimais
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LigarPontos } from "../jogos";
import { CampoNumero, Classificar, Desafio, Frac, Resultado, embaralhar, fmt, igual, lerNumero, mdc, pick, rnd, tx, useSemente, type Lang, type QA } from "./util";

/* ================================ desenhos ================================ */

/** Pizza (ou sanduíche) dividida em d pedaços. */
export function Pizza({ d, cheias, onFatia, tamanho = 92, tipo = "pizza" }: { d: number; cheias: number; onFatia?: (i: number) => void; tamanho?: number; tipo?: "pizza" | "sanduiche" }) {
  const r = 44;
  if (tipo === "sanduiche") {
    return (
      <svg viewBox="0 0 100 70" width={tamanho} className="k-pizza" role="img" aria-label={`${cheias} de ${d} partes`}>
        {Array.from({ length: d }, (_, i) => (
          <motion.rect key={i} x={4 + (92 / d) * i} y="8" width={92 / d} height="54" rx="3"
            fill={i < cheias ? "#e9a94b" : "#fff6e3"} stroke="#9a6a2a" strokeWidth="2"
            animate={{ scale: i < cheias ? 1 : 0.97 }} onClick={() => onFatia?.(i)} style={{ cursor: onFatia ? "pointer" : "default" }} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" width={tamanho} className="k-pizza" role="img" aria-label={`${cheias} de ${d} fatias`}>
      <circle cx="50" cy="50" r={r + 3} fill="#d9a35b" />
      {Array.from({ length: d }, (_, i) => {
        const a0 = (i / d) * 2 * Math.PI - Math.PI / 2;
        const a1 = ((i + 1) / d) * 2 * Math.PI - Math.PI / 2;
        const p = d === 1
          ? `M50 ${50 - r} A${r} ${r} 0 1 1 49.99 ${50 - r} Z`
          : `M50 50 L${50 + r * Math.cos(a0)} ${50 + r * Math.sin(a0)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${50 + r * Math.cos(a1)} ${50 + r * Math.sin(a1)} Z`;
        return (
          <motion.path key={i} d={p} fill={i < cheias ? "#f2b84b" : "#fff6e3"} stroke="#b5532a" strokeWidth="1.6"
            initial={false} animate={{ opacity: 1 }} onClick={() => onFatia?.(i)} style={{ cursor: onFatia ? "pointer" : "default" }} />
        );
      })}
      {Array.from({ length: d }, (_, i) => {
        if (i >= cheias) return null;
        const a = ((i + 0.5) / d) * 2 * Math.PI - Math.PI / 2;
        return <circle key={`p${i}`} cx={50 + r * 0.6 * Math.cos(a)} cy={50 + r * 0.6 * Math.sin(a)} r="3.2" fill="#c0392b" pointerEvents="none" />;
      })}
    </svg>
  );
}

/** Desenha um número de pedaços distribuídos em pizzas inteiras. */
export function Pizzas({ total, d, tipo = "pizza", tamanho = 80 }: { total: number; d: number; tipo?: "pizza" | "sanduiche"; tamanho?: number }) {
  const qtd = Math.ceil(total / d);
  return (
    <div className="k-pizzas">
      {Array.from({ length: qtd }, (_, i) => <Pizza key={i} d={d} cheias={Math.min(d, total - i * d)} tipo={tipo} tamanho={tamanho} />)}
    </div>
  );
}

/* ================================ números mistos ================================ */

const DEN = [2, 3, 4, 5, 6, 8];
export function novoMisto(maxInteiro = 3) {
  const d = pick(DEN);
  return { w: rnd(1, maxInteiro), n: rnd(1, d - 1), d };
}

/** PT 1 — pinte as fatias para mostrar o número misto. */
export function MonteMisto({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const alvo = useMemo(() => novoMisto(2), [semente]);
  const [pintadas, setPintadas] = useState<Record<string, boolean>>({});
  const qtdPizzas = alvo.w + 1;
  const total = Object.values(pintadas).filter(Boolean).length;
  const certo = alvo.w * alvo.d + alvo.n;
  const [conferido, setConferido] = useState(false);
  const ok = conferido ? total === certo : null;
  const tipo = semente % 2 === 0 ? "pizza" : "sanduiche";
  const nome = tipo === "pizza" ? tx(lang, "pizzas", "pizzas") : tx(lang, "sanduíches", "sandwiches");

  return (
    <Desafio lang={lang} titulo={tx(lang, "Pinte o número misto", "Color the mixed number")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, "Toque nos pedaços para pintar", "Tap the pieces to color")} <b><Frac inteiro={alvo.w} n={alvo.n} d={alvo.d} /> {nome}</b>.</>}
      onNovo={() => { novo(); setPintadas({}); setConferido(false); }}>
      <div className="k-pizzas">
        {Array.from({ length: qtdPizzas }, (_, p) => {
          const cheias = Array.from({ length: alvo.d }, (_, i) => pintadas[`${p}-${i}`]);
          return (
            <svg key={`${semente}-${p}`} viewBox="0 0 100 100" width={96} className="k-pizza">
              {tipo === "pizza" ? (
                <>
                  <circle cx="50" cy="50" r="47" fill="#d9a35b" />
                  {cheias.map((on, i) => {
                    const a0 = (i / alvo.d) * 2 * Math.PI - Math.PI / 2;
                    const a1 = ((i + 1) / alvo.d) * 2 * Math.PI - Math.PI / 2;
                    const r = 44;
                    return <path key={i} d={`M50 50 L${50 + r * Math.cos(a0)} ${50 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${50 + r * Math.cos(a1)} ${50 + r * Math.sin(a1)} Z`}
                      fill={on ? "#f2b84b" : "#fff6e3"} stroke="#b5532a" strokeWidth="1.6" style={{ cursor: "pointer" }}
                      onClick={() => { setPintadas({ ...pintadas, [`${p}-${i}`]: !on }); setConferido(false); }} />;
                  })}
                </>
              ) : (
                cheias.map((on, i) => (
                  <rect key={i} x={4 + (92 / alvo.d) * i} y="20" width={92 / alvo.d} height="60" rx="3" fill={on ? "#e9a94b" : "#fff6e3"} stroke="#9a6a2a" strokeWidth="2"
                    style={{ cursor: "pointer" }} onClick={() => { setPintadas({ ...pintadas, [`${p}-${i}`]: !on }); setConferido(false); }} />
                ))
              )}
            </svg>
          );
        })}
      </div>
      <p className="k-live">{tx(lang, "Você pintou", "You colored")} <b>{total}</b> {tx(lang, "pedaços de", "pieces of")} <b>{alvo.d}</b> = <Frac n={total} d={alvo.d} /></p>
      <div className="k-actions"><button className="k-btn" onClick={() => setConferido(true)}>{tx(lang, "Conferir", "Check")}</button></div>
      <Resultado ok={ok} lang={lang}>
        {ok
          ? <><Frac inteiro={alvo.w} n={alvo.n} d={alvo.d} /> = {alvo.w} × {alvo.d} + {alvo.n} = <b><Frac n={certo} d={alvo.d} /></b> ({tx(lang, "fração imprópria", "improper fraction")}).</>
          : <>{tx(lang, `Pinte ${alvo.w} ${nome} inteiros (${alvo.w * alvo.d} pedaços) e mais ${alvo.n} pedaço(s).`, `Color ${alvo.w} whole ${nome} (${alvo.w * alvo.d} pieces) and ${alvo.n} more piece(s).`)}</>}
      </Resultado>
    </Desafio>
  );
}

/** PT 2 — ligue o número misto à fração imprópria. */
export function LigarMistos({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const dados = useMemo(() => {
    const vistos = new Set<string>();
    const itens: Array<{ w: number; n: number; d: number }> = [];
    while (itens.length < 4) {
      const m = novoMisto(4);
      const k = `${m.w * m.d + m.n}/${m.d}`;
      if (!vistos.has(k)) { vistos.add(k); itens.push(m); }
    }
    const direita = embaralhar(itens.map((m) => `${m.w * m.d + m.n}/${m.d}`));
    return { esquerda: itens.map((m) => `${m.w} ${m.n}/${m.d}`), direita, certo: itens.map((m) => direita.indexOf(`${m.w * m.d + m.n}/${m.d}`)) };
  }, [semente]);
  return (
    <Desafio lang={lang} titulo={tx(lang, "Ligue o misto à imprópria", "Match mixed and improper")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={tx(lang, "Ligue cada número misto à fração imprópria igual. Dica: inteiros × denominador + numerador.", "Match each mixed number to the equal improper fraction. Tip: wholes × denominator + numerator.")} onNovo={novo}>
      <LigarPontos key={semente} titulo={tx(lang, "Misto → imprópria", "Mixed → improper")} esquerda={dados.esquerda} direita={dados.direita} certo={dados.certo} />
    </Desafio>
  );
}

/** EN 1 — improper → mixed (com desenho). */
export function ImproperToMixed({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const m = useMemo(() => novoMisto(3), [semente]);
  const p = m.w * m.d + m.n;
  const [w, setW] = useState(""); const [n, setN] = useState(""); const [d, setD] = useState("");
  const [conf, setConf] = useState(false);
  const ok = conf ? igual(lerNumero(w), m.w) && igual(lerNumero(n), m.n) && igual(lerNumero(d), m.d) : null;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Da imprópria para o misto", "From improper to mixed")} nivel="Step 3"
      instrucao={<>{tx(lang, "Escreva", "Write")} <b><Frac n={p} d={m.d} /></b> {tx(lang, "como número misto. Olhe o desenho!", "as a mixed number. Look at the picture!")}</>}
      onNovo={() => { novo(); setW(""); setN(""); setD(""); setConf(false); }}>
      <Pizzas total={p} d={m.d} tipo={semente % 2 ? "sanduiche" : "pizza"} />
      <div className="k-mixed-input">
        <CampoNumero valor={w} onChange={setW} largura={56} rotulo="whole" estado={conf ? (igual(lerNumero(w), m.w) ? "ok" : "bad") : ""} />
        <span className="k-frac k-frac-input">
          <CampoNumero valor={n} onChange={setN} largura={56} rotulo="numerator" estado={conf ? (igual(lerNumero(n), m.n) ? "ok" : "bad") : ""} />
          <CampoNumero valor={d} onChange={setD} largura={56} rotulo="denominator" estado={conf ? (igual(lerNumero(d), m.d) ? "ok" : "bad") : ""} />
        </span>
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
      </div>
      <Resultado ok={ok} lang={lang}>
        <Frac n={p} d={m.d} />: {p} ÷ {m.d} = {m.w} {tx(lang, "resto", "remainder")} {m.n} → <b><Frac inteiro={m.w} n={m.n} d={m.d} /></b>
      </Resultado>
    </Desafio>
  );
}

/** EN 2 — classifique: proper, improper, mixed. */
export function SortFractions({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const itens = useMemo(() => embaralhar([
    ...[0, 1].map(() => { const d = pick(DEN); return { texto: <Frac n={rnd(1, d - 1)} d={d} />, certo: 0 }; }),
    ...[0, 1].map(() => { const d = pick(DEN); return { texto: <Frac n={rnd(d + 1, 3 * d)} d={d} />, certo: 1 }; }),
    ...[0, 1].map(() => { const m = novoMisto(4); return { texto: <Frac inteiro={m.w} n={m.n} d={m.d} />, certo: 2 }; }),
  ]), [semente]);
  return (
    <Desafio lang={lang} titulo={tx(lang, "Própria, imprópria ou mista?", "Proper, improper or mixed?")} nivel="Step 4"
      instrucao={tx(lang, "Classifique cada número.", "Sort each number. Proper: top < bottom. Improper: top > bottom. Mixed: a whole number and a fraction.")} onNovo={novo}>
      <Classificar key={semente} lang={lang} baldes={["Proper fraction", "Improper fraction", "Mixed number"]} itens={itens} />
    </Desafio>
  );
}

/* --------------------------- quizzes: mistos --------------------------- */

export const quizMistosPT: Array<() => QA> = [
  () => {
    const { w, n, d } = novoMisto(3);
    return {
      q: <>Uma pizza foi cortada em <b>{d}</b> fatias iguais. Quantas fatias há em <b><Frac inteiro={w} n={n} d={d} /></b> pizzas?</>,
      figura: <Pizzas total={w * d + n} d={d} />,
      certa: String(w * d + n), erradas: [String(w + n), String(w * n + d), String(w * d)],
      why: <>{w} pizzas inteiras = {w} × {d} = {w * d} fatias, mais {n} = <b>{w * d + n} fatias</b>.</>,
    };
  },
  () => {
    const { w, n, d } = novoMisto(4);
    return {
      q: <>Escreva <b><Frac inteiro={w} n={n} d={d} /></b> como fração imprópria.</>,
      certa: `${w * d + n}/${d}`, erradas: [`${w + n}/${d}`, `${w * n + d}/${d}`, `${w * d + n}/${d * w}`, `${w * d}/${d}`],
      why: <>Multiplique os inteiros pelo denominador e some o numerador: {w} × {d} + {n} = {w * d + n}. Resposta: <b>{w * d + n}/{d}</b>.</>,
    };
  },
];
export const quizMistosEN: Array<() => QA> = [
  () => {
    const { w, n, d } = novoMisto(3);
    return {
      q: <>Which mixed number is equal to <b><Frac n={w * d + n} d={d} /></b>?</>,
      certa: `${w} ${n}/${d}`, erradas: [`${w + 1} ${n}/${d}`, `${n} ${w}/${d}`, `${w} ${d - n}/${d}`],
      why: <>{w * d + n} ÷ {d} = {w} remainder {n}, so it is <b>{w} {n}/{d}</b>.</>,
    };
  },
  () => {
    const { w, n, d } = novoMisto(4);
    return {
      q: <>There are <b><Frac inteiro={w} n={n} d={d} /></b> sandwiches. Write it as an improper fraction.</>,
      figura: <Pizzas total={w * d + n} d={d} tipo="sanduiche" />,
      certa: `${w * d + n}/${d}`, erradas: [`${w + n}/${d}`, `${w * n + d}/${d}`, `${w * d - n}/${d}`],
      why: <>{w} × {d} + {n} = {w * d + n}. Answer: <b>{w * d + n}/{d}</b>.</>,
    };
  },
];

/* ================================ frações e decimais ================================ */

/** Decimal com denominador 10 ou 100 (centésimos múltiplos de 5, como no PDF). */
export function novoDecimal() {
  if (Math.random() < 0.5) { const x = rnd(1, 19); return { v: x / 10, num: x, den: 10 }; }
  const x = pick([5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 20, 40, 60, 80, 12, 36, 48, 64]);
  return { v: x / 100, num: x, den: 100 };
}
/** Duas frações equivalentes ao decimal (como a questão 2 do PDF). */
export function duasFracoes(dec: { num: number; den: number }) {
  if (dec.den === 10) return [`${dec.num}/10`, `${dec.num * 10}/100`];
  const g = mdc(dec.num, 100);
  return [`${dec.num}/100`, `${dec.num / g}/${100 / g}`];
}

/** PT 1 — pinte a grade de 100. */
export function Grade100({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const alvo = useMemo(() => { const x = rnd(5, 95); return x; }, [semente]);
  const [cheios, setCheios] = useState(0);
  const [conf, setConf] = useState(false);
  const ok = conf ? cheios === alvo : null;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Pinte o decimal na grade de 100", "Color the decimal on the hundred grid")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, "A grade inteira vale 1. Pinte", "The whole grid is 1. Color")} <b>{fmt(alvo / 100, lang, 2)}</b>. {tx(lang, "Toque num quadradinho: ele e todos antes dele ficam pintados.", "Tap a square: it and all before it get colored.")}</>}
      onNovo={() => { novo(); setCheios(0); setConf(false); }}>
      <div className="k-grid100" role="grid" aria-label="Grade de 100 quadradinhos">
        {Array.from({ length: 100 }, (_, i) => (
          <button key={i} className={i < cheios ? "on" : ""} onClick={() => { setCheios(i + 1 === cheios ? i : i + 1); setConf(false); }} aria-label={`${i + 1}`} />
        ))}
      </div>
      <p className="k-live">{tx(lang, "Pintados:", "Colored:")} <b>{cheios}</b> → <Frac n={cheios} d={100} /> = <b>{fmt(cheios / 100, lang, 2)}</b></p>
      <div className="k-actions"><button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button></div>
      <Resultado ok={ok} lang={lang}>{fmt(alvo / 100, lang, 2)} = <Frac n={alvo} d={100} /> → {alvo} {tx(lang, "quadradinhos de 100", "squares out of 100")}.</Resultado>
    </Desafio>
  );
}

/** PT 2 — ligue decimal e fração. */
export function LigarDecimais({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const dados = useMemo(() => {
    const vistos = new Set<number>(); const itens: Array<ReturnType<typeof novoDecimal>> = [];
    while (itens.length < 4) { const d = novoDecimal(); if (!vistos.has(d.v)) { vistos.add(d.v); itens.push(d); } }
    const direita = embaralhar(itens.map((d) => `${d.num}/${d.den}`));
    return { esquerda: itens.map((d) => fmt(d.v, lang, d.den === 10 ? 1 : 2)), direita, certo: itens.map((d) => direita.indexOf(`${d.num}/${d.den}`)) };
  }, [semente, lang]);
  return (
    <Desafio lang={lang} titulo={tx(lang, "Ligue o decimal à fração", "Match decimal and fraction")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={tx(lang, "Uma casa depois da vírgula = décimos (/10). Duas casas = centésimos (/100).", "One digit after the point = tenths (/10). Two digits = hundredths (/100).")} onNovo={novo}>
      <LigarPontos key={semente} titulo={tx(lang, "Decimal → fração", "Decimal → fraction")} esquerda={dados.esquerda} direita={dados.direita} certo={dados.certo} />
    </Desafio>
  );
}

/** EN 1 — reta numérica em décimos. */
export function NumberLine({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const alvo = useMemo(() => rnd(1, 19), [semente]);
  const [marca, setMarca] = useState<number | null>(null);
  const ok = marca === null ? null : marca === alvo;
  const W = 600, x0 = 30, passo = (W - 60) / 20;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Encontre o decimal na reta", "Find the decimal on the number line")} nivel="Step 3"
      instrucao={<>{tx(lang, "Toque no ponto da reta que mostra", "Tap the point that shows")} <b>{fmt(alvo / 10, lang, 1)}</b> = <Frac n={alvo} d={10} />.</>}
      onNovo={() => { novo(); setMarca(null); }}>
      <svg viewBox={`0 0 ${W} 110`} className="k-vis-svg k-numline" role="img" aria-label="Reta numérica de 0 a 2">
        <line x1={x0} y1="60" x2={W - 30} y2="60" stroke="#333" strokeWidth="3" />
        {Array.from({ length: 21 }, (_, i) => (
          <g key={i} onClick={() => setMarca(i)} style={{ cursor: "pointer" }}>
            <rect x={x0 + i * passo - 12} y="30" width="24" height="60" fill="transparent" />
            <line x1={x0 + i * passo} y1={i % 10 === 0 ? 40 : 50} x2={x0 + i * passo} y2={i % 10 === 0 ? 80 : 70} stroke="#333" strokeWidth={i % 10 === 0 ? 3 : 2} />
            {i % 10 === 0 && <text x={x0 + i * passo} y="100" textAnchor="middle" fontSize="16" fontWeight="900">{i / 10}</text>}
          </g>
        ))}
        {marca !== null && (
          <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={marca}>
            <circle cx={x0 + marca * passo} cy="60" r="9" fill={marca === alvo ? "#2aa26f" : "#e0573f"} />
            <text x={x0 + marca * passo} y="25" textAnchor="middle" fontSize="14" fontWeight="900">{fmt(marca / 10, lang, 1)}</text>
          </motion.g>
        )}
      </svg>
      <Resultado ok={ok} lang={lang}>{tx(lang, "Cada tracinho vale 0,1. Conte", "Each small mark is 0.1. Count")} {alvo} {tx(lang, "tracinhos a partir do 0.", "marks from 0.")}</Resultado>
    </Desafio>
  );
}

/** EN 2 — duas frações equivalentes (décimos). */
export function TwoEquivalent({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const x = useMemo(() => rnd(1, 19), [semente]);
  const [a, setA] = useState(""); const [b, setB] = useState(""); const [conf, setConf] = useState(false);
  const okA = igual(lerNumero(a), x); const okB = igual(lerNumero(b), x * 10);
  return (
    <Desafio lang={lang} titulo={tx(lang, "Duas frações equivalentes", "Two equivalent fractions")} nivel="Step 4"
      instrucao={tx(lang, "Complete as duas frações iguais ao decimal.", "Complete the two fractions that equal the decimal.")}
      onNovo={() => { novo(); setA(""); setB(""); setConf(false); }}>
      <div className="k-eq-row">
        <b className="k-big">{fmt(x / 10, lang, 1)}</b> =
        <span className="k-frac k-frac-input"><CampoNumero valor={a} onChange={setA} largura={64} rotulo="tenths" estado={conf ? (okA ? "ok" : "bad") : ""} /><span>10</span></span> =
        <span className="k-frac k-frac-input"><CampoNumero valor={b} onChange={setB} largura={64} rotulo="hundredths" estado={conf ? (okB ? "ok" : "bad") : ""} /><span>100</span></span>
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
      </div>
      <Resultado ok={conf ? okA && okB : null} lang={lang}>{fmt(x / 10, lang, 1)} = <Frac n={x} d={10} /> = <Frac n={x * 10} d={100} /> ({tx(lang, "multiplique em cima e embaixo por 10", "multiply top and bottom by 10")}).</Resultado>
    </Desafio>
  );
}

/* --------------------------- quizzes: decimais --------------------------- */

export const quizDecimaisPT: Array<() => QA> = [
  () => {
    const x = rnd(1, 9);
    return {
      q: <>Qual fração é igual a <b>{fmt(x / 10, "pt", 1)}</b>?</>,
      certa: `${x}/10`, erradas: [`${x}/100`, `1/${x}`, `${x * 10}/10`, `10/${x}`],
      why: <>{fmt(x / 10, "pt", 1)} tem uma casa depois da vírgula: são <b>{x} décimos = {x}/10</b>.</>,
    };
  },
  () => {
    const d = novoDecimal(); const [f1, f2] = duasFracoes(d); const dec = fmt(d.v, "pt", d.den === 10 ? 1 : 2);
    return {
      q: <>Quais são <b>duas frações equivalentes</b> a <b>{dec}</b>?</>,
      certa: `${f1} e ${f2}`,
      erradas: [`${d.num}/1000 e ${d.num}/10000`, d.den === 10 ? `${d.num}/100 e ${d.num}/10` : `${d.num}/10 e ${d.num * 10}/100`, `1/${d.num} e 10/${d.num}`],
      why: d.den === 10
        ? <>{dec} = {d.num} décimos = <b>{f1}</b>. Multiplicando em cima e embaixo por 10: <b>{f2}</b>.</>
        : <>{dec} = {d.num} centésimos = <b>{f1}</b>. Simplificando (÷ {mdc(d.num, 100)}): <b>{f2}</b>.</>,
    };
  },
];
export const quizDecimaisEN: Array<() => QA> = [
  () => {
    const x = pick([5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 12, 36, 48]);
    return {
      q: <>Which decimal is equal to <b><Frac n={x} d={100} /></b>?</>,
      certa: fmt(x / 100, "en", 2), erradas: [fmt(x / 10, "en", 1), String(x), fmt(x / 1000, "en", 3)],
      why: <>{x}/100 means {x} hundredths: <b>{fmt(x / 100, "en", 2)}</b>.</>,
    };
  },
  () => {
    const x = rnd(11, 19);
    return {
      q: <>Write <b>{fmt(x / 10, "en", 1)}</b> as two equivalent fractions.</>,
      certa: `${x}/10 and ${x * 10}/100`, erradas: [`${x}/100 and ${x}/10`, `1/${x} and 10/${x}`, `${x}/10 and ${x}/100`],
      why: <>{fmt(x / 10, "en", 1)} = {x} tenths = <b>{x}/10</b> = <b>{x * 10}/100</b>.</>,
    };
  },
];
