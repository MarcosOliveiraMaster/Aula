// U10 · Padrões na multiplicação · Sequência de Fibonacci
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LigarPontos } from "../jogos";
import { CampoNumero, Desafio, Resultado, embaralhar, igual, lerNumero, pick, rnd, tx, useSemente, type Lang, type QA } from "./util";

/* =========================== fator que falta (questão 5) =========================== */

/** Gera "□ × 50 = 1250", "40 × □ = 600", "672 = 28 × □", "882 = □ × 21". */
export function novoFatorQueFalta() {
  const forma = rnd(0, 3);
  if (forma < 2) {
    const a = pick([20, 30, 40, 50, 60, 70, 80, 90]); const x = rnd(11, 39);
    return { a, x, p: a * x, forma };
  }
  const a = rnd(12, 39); const x = rnd(12, 45);
  return { a, x, p: a * x, forma };
}
export function textoFator(f: ReturnType<typeof novoFatorQueFalta>, vazio: React.ReactNode = "□") {
  if (f.forma === 0) return <>{vazio} × {f.a} = {f.p}</>;
  if (f.forma === 1) return <>{f.a} × {vazio} = {f.p}</>;
  if (f.forma === 2) return <>{f.p} = {f.a} × {vazio}</>;
  return <>{f.p} = {vazio} × {f.a}</>;
}
export function dicaFator(f: ReturnType<typeof novoFatorQueFalta>, lang: Lang) {
  if (f.a % 10 === 0) {
    const a1 = f.a / 10, p1 = f.p / 10;
    return tx(lang, `Padrão: ${f.a} = ${a1} × 10. Tire um zero dos dois lados: ${a1} × ? = ${p1}. Então ? = ${p1} ÷ ${a1} = ${f.x}.`, `Pattern: ${f.a} = ${a1} × 10. Remove a zero on both sides: ${a1} × ? = ${p1}. So ? = ${p1} ÷ ${a1} = ${f.x}.`);
  }
  return tx(lang, `Divida: ${f.p} ÷ ${f.a} = ${f.x}. Confira: ${f.a} × ${f.x} = ${f.p}.`, `Divide: ${f.p} ÷ ${f.a} = ${f.x}. Check: ${f.a} × ${f.x} = ${f.p}.`);
}

/** PT 1 — teste números até o produto bater. */
export function FatorQueFalta({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const f = useMemo(() => novoFatorQueFalta(), [semente]);
  const [x, setX] = useState(10);
  const prod = f.a * x;
  const ok = prod === f.p;
  const passo = (d: number) => setX((v) => Math.max(1, v + d));
  return (
    <Desafio lang={lang} titulo={tx(lang, "Ache o fator que falta", "Find the missing factor")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, "Use os botões para testar números até a conta ficar certa:", "Use the buttons to try numbers until the equation is true:")} <b className="k-big">{textoFator(f)}</b></>}
      onNovo={() => { novo(); setX(10); }}>
      <div className="k-factor">
        <div className="k-factor-eq">
          {textoFator(f, <motion.span key={x} className="k-factor-box" initial={{ scale: 1.3 }} animate={{ scale: 1 }}>{x}</motion.span>)}
        </div>
        <div className="k-factor-check">{f.a} × {x} = <b className={ok ? "k-ok" : ""}>{prod}</b> {ok ? "✅" : prod < f.p ? tx(lang, "⬆ pouco", "⬆ too small") : tx(lang, "⬇ passou", "⬇ too big")}</div>
        <div className="k-stepper">
          {[-10, -1, 1, 10].map((d) => <button key={d} className="k-btn ghost" onClick={() => passo(d)}>{d > 0 ? `+${d}` : d}</button>)}
        </div>
      </div>
      {ok && <Resultado ok lang={lang}>{dicaFator(f, lang)}</Resultado>}
    </Desafio>
  );
}

/* ======================== agrupar fatores (questão 9) ======================== */

/** Gera produtos de 3 fatores como na questão 9 (2 × 16 × 5, 25 × 5 × 2, 2 × 34 × 50, 3 × 15 × 10, 4 × 40 × 6…). */
export function novoTriplo(): number[] {
  const par = pick([[2, 5], [5, 2], [2, 50], [50, 2], [5, 20], [4, 25], [25, 4], [2, 500], [10, 1]] as const);
  if (par[0] === 10) { const a = rnd(2, 9), b = pick([10, 20, 40, 50]); return embaralhar([a, rnd(11, 49), b === 10 ? 10 : b]).slice(0, 3); }
  const outro = pick([rnd(11, 49), pick([15, 16, 25, 34, 125, 36, 45])]);
  return embaralhar([par[0], par[1], outro]);
}
const forma10 = (a: number, b: number) => [10, 100, 1000].includes(a * b);

/** PT 2 — escolha dois fatores para multiplicar primeiro. */
export function AgrupeFatores({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const inicial = useMemo(() => novoTriplo(), [semente]);
  return <AgrupeInterno key={semente} lang={lang} inicial={inicial} onNovo={novo} />;
}

function AgrupeInterno({ lang, inicial, onNovo }: { lang: Lang; inicial: number[]; onNovo: () => void }) {
  const [cartas, setCartas] = useState<number[]>(inicial);
  const [sel, setSel] = useState<number[]>([]);
  const [historico, setHistorico] = useState<string[]>([]);
  const [resp, setResp] = useState(""); const [conf, setConf] = useState(false);
  const total = inicial.reduce((s, x) => s * x, 1);
  const reset = (c: number[]) => { setCartas(c); setSel([]); setHistorico([]); setResp(""); setConf(false); };

  const tocar = (i: number) => {
    if (cartas.length < 2) return;
    const n = sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i];
    if (n.length === 2) {
      const [a, b] = n.map((j) => cartas[j]);
      const nova = cartas.filter((_, j) => !n.includes(j));
      nova.unshift(a * b);
      setHistorico([...historico, `${a} × ${b} = ${a * b}${forma10(a, b) ? tx(lang, "  ✨ formou " + a * b + "!", "  ✨ made " + a * b + "!") : ""}`]);
      setCartas(nova); setSel([]);
    } else setSel(n);
  };

  return (
    <Desafio lang={lang} titulo={tx(lang, "Agrupe para facilitar", "Group to make it easy")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={<>{tx(lang, "Calcule", "Calculate")} <b className="k-big">{inicial.join(" × ")}</b>. {tx(lang, "Toque em dois números para multiplicar primeiro. Procure os que formam 10, 100 ou 1000!", "Tap two numbers to multiply first. Look for the ones that make 10, 100 or 1000!")}</>}
      onNovo={onNovo}>
      <div className="k-cards-row">
        <AnimatePresence mode="popLayout">
          {cartas.map((c, i) => (
            <motion.button layout key={`${c}-${i}-${cartas.length}`} className={`k-num-card ${sel.includes(i) ? "on" : ""}`} onClick={() => tocar(i)}
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>{c}</motion.button>
          ))}
        </AnimatePresence>
      </div>
      {historico.length > 0 && <ol className="k-steps-log">{historico.map((h) => <li key={h}>{h}</li>)}</ol>}
      {cartas.length === 1 && (
        <div className="k-counters">
          <label>{tx(lang, "Resultado", "Result")} = <CampoNumero valor={resp} onChange={setResp} largura={90} rotulo="resultado" estado={conf ? (igual(lerNumero(resp), total) ? "ok" : "bad") : ""} /></label>
          <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
          <button className="k-btn ghost" onClick={() => reset(inicial)}>{tx(lang, "Recomeçar", "Start over")}</button>
        </div>
      )}
      <Resultado ok={conf ? igual(lerNumero(resp), total) : null} lang={lang}>{inicial.join(" × ")} = <b>{total}</b>.</Resultado>
    </Desafio>
  );
}

/** EN 1 — ligue a conta ao resultado. */
export function MatchProducts({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const dados = useMemo(() => {
    const itens: number[][] = []; const vistos = new Set<number>();
    while (itens.length < 4) { const t = novoTriplo(); const p = t.reduce((s, x) => s * x, 1); if (!vistos.has(p)) { vistos.add(p); itens.push(t); } }
    const prods = itens.map((t) => String(t.reduce((s, x) => s * x, 1)));
    const direita = embaralhar(prods);
    return { esquerda: itens.map((t) => t.join(" × ")), direita, certo: prods.map((p) => direita.indexOf(p)) };
  }, [semente]);
  return (
    <Desafio lang={lang} titulo="Match each product" nivel="Step 3" instrucao="Look for factors that make 10, 100 or 1000 first." onNovo={novo}>
      <LigarPontos key={semente} titulo="Multiply" esquerda={dados.esquerda} direita={dados.direita} certo={dados.certo} />
    </Desafio>
  );
}

/** EN 2 — padrão do zero: complete a tabela (base para 40 × □ = 600). */
export function ZeroPattern({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const d = useMemo(() => ({ a: rnd(2, 9), b: rnd(11, 25) }), [semente]);
  const linhas = [[d.a, d.b], [d.a * 10, d.b], [d.a * 100, d.b]];
  const [vals, setVals] = useState(["", "", ""]); const [conf, setConf] = useState(false);
  const certos = linhas.map(([x, y]) => x * y);
  const ok = conf ? vals.every((v, i) => igual(lerNumero(v), certos[i])) : null;
  return (
    <Desafio lang={lang} titulo="Find the pattern" nivel="Step 4" instrucao="Complete the table. What happens when a factor is 10 times bigger?"
      onNovo={() => { novo(); setVals(["", "", ""]); setConf(false); }}>
      <div className="k-pattern-table">
        {linhas.map(([x, y], i) => (
          <div key={i} className="k-pattern-row">
            <span>{x} × {y} =</span>
            <CampoNumero valor={vals[i]} onChange={(v) => { const n = [...vals]; n[i] = v; setVals(n); setConf(false); }} largura={90} rotulo={`linha ${i + 1}`} estado={conf ? (igual(lerNumero(vals[i]), certos[i]) ? "ok" : "bad") : ""} />
          </div>
        ))}
      </div>
      <div className="k-actions"><button className="k-btn" onClick={() => setConf(true)}>Check</button></div>
      <Resultado ok={ok} lang={lang}>{d.a} × {d.b} = {certos[0]}. With one more zero in a factor, the product gets one more zero: {certos[1]}, {certos[2]}.</Resultado>
    </Desafio>
  );
}

export const quizMultPT: Array<() => QA> = [
  () => { const f = novoFatorQueFalta(); return { q: <>Qual é o fator que falta? <b className="k-big">{textoFator(f)}</b></>, certa: String(f.x), erradas: [String(f.x + 10), String(f.x - 1), String(f.x * 10), String(f.p - f.a)], why: dicaFator(f, "pt") }; },
  () => { const t = novoTriplo(); const p = t.reduce((s, x) => s * x, 1); return { q: <>Calcule usando uma estratégia: <b className="k-big">{t.join(" × ")}</b></>, certa: String(p), erradas: [String(p * 10), String(p / 10), String(p + t[0])].filter((x) => !x.includes(".")), why: <>Agrupe os números que formam 10, 100 ou 1000 primeiro. {t.join(" × ")} = <b>{p}</b>.</> }; },
];
export const quizMultEN: Array<() => QA> = [
  () => { const f = novoFatorQueFalta(); return { q: <>Find the missing factor: <b className="k-big">{textoFator(f)}</b></>, certa: String(f.x), erradas: [String(f.x + 1), String(f.x * 10), String(f.x - 10), String(f.a)], why: dicaFator(f, "en") }; },
  () => { const t = novoTriplo(); const p = t.reduce((s, x) => s * x, 1); return { q: <>Calculate: <b className="k-big">{t.join(" × ")}</b></>, certa: String(p), erradas: [String(p * 10), String(p + 10), String(t[0] + t[1] + t[2])], why: <>Multiply the friendly pair first (it makes 10, 100 or 1000). {t.join(" × ")} = <b>{p}</b>.</> }; },
];

/* ================================== Fibonacci ================================== */

export const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

/** PT 1 — escolha o próximo número (com barras que crescem). */
export function ProximoFib({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const d = useMemo(() => { const i = rnd(0, 5); const n = rnd(4, 6); const seq = FIB.slice(i, i + n); const prox = FIB[i + n]; return { seq, prox, ops: embaralhar([prox, prox + 1, seq[seq.length - 1] * 2, prox - 2].filter((x, k, a) => a.indexOf(x) === k)) }; }, [semente]);
  const [esc, setEsc] = useState<number | null>(null);
  const max = d.prox;
  const todos = esc === d.prox ? [...d.seq, d.prox] : d.seq;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Qual é o próximo?", "What comes next?")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={tx(lang, "Na sequência de Fibonacci, cada número é a soma dos dois anteriores.", "In the Fibonacci sequence, each number is the sum of the two before it.")}
      onNovo={() => { novo(); setEsc(null); }}>
      <div className="k-fib-bars">
        {todos.map((v, i) => (
          <motion.div key={`${semente}-${i}`} className={`k-fib-bar ${i === d.seq.length ? "new" : ""}`} initial={{ height: 0 }} animate={{ height: `${Math.max(8, (v / max) * 100)}%` }} transition={{ delay: i * 0.08 }}>
            <span>{v}</span>
          </motion.div>
        ))}
        {esc !== d.prox && <div className="k-fib-bar ghost"><span>?</span></div>}
      </div>
      <div className="k-toggle wrap">
        {d.ops.map((o) => <button key={o} className={esc === o ? (o === d.prox ? "on" : "on bad") : ""} onClick={() => setEsc(o)}>{o}</button>)}
      </div>
      <Resultado ok={esc === null ? null : esc === d.prox} lang={lang}>{d.seq[d.seq.length - 2]} + {d.seq[d.seq.length - 1]} = <b>{d.prox}</b>.</Resultado>
    </Desafio>
  );
}

/** PT 2 — construa a sequência digitando cada próximo número. */
export function ConstrutorFib({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const inicio = useMemo(() => rnd(0, 3), [semente]);
  const [seq, setSeq] = useState<number[]>(() => FIB.slice(inicio, inicio + 2));
  const [v, setV] = useState(""); const [erro, setErro] = useState(false);
  const meta = 8;
  const prox = seq[seq.length - 1] + seq[seq.length - 2];
  const enviar = () => { if (igual(lerNumero(v), prox)) { setSeq([...seq, prox]); setV(""); setErro(false); } else setErro(true); };
  const fim = seq.length >= meta;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Construa a sequência", "Build the sequence")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={tx(lang, `Some os dois últimos e escreva o próximo número até ter ${meta} números.`, `Add the last two and write the next number until you have ${meta} numbers.`)}
      onNovo={() => { novo(); const i = rnd(0, 3); setSeq(FIB.slice(i, i + 2)); setV(""); setErro(false); }}>
      <div className="k-fib-chain">
        <AnimatePresence>
          {seq.map((n, i) => (
            <motion.span key={`${i}-${n}`} className="k-fib-chip" initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }}>{n}</motion.span>
          ))}
        </AnimatePresence>
      </div>
      {!fim ? (
        <div className="k-counters">
          <span>{seq[seq.length - 2]} + {seq[seq.length - 1]} =</span>
          <CampoNumero valor={v} onChange={(x) => { setV(x); setErro(false); }} rotulo="proximo" estado={erro ? "bad" : ""} />
          <button className="k-btn" onClick={enviar}>{tx(lang, "Adicionar", "Add")}</button>
        </div>
      ) : <Resultado ok lang={lang}>{tx(lang, "Sequência completa!", "Sequence complete!")} {seq.join(", ")}</Resultado>}
      {erro && <Resultado ok={false} lang={lang}>{tx(lang, "Some os dois últimos números.", "Add the last two numbers.")}</Resultado>}
    </Desafio>
  );
}

/** EN 1 — coloque em ordem. */
export function OrderFib({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const d = useMemo(() => { const i = rnd(1, 6); const seq = FIB.slice(i, i + 6); return { seq, cartas: embaralhar(seq.map((v, k) => ({ v, k }))) }; }, [semente]);
  const [ordem, setOrdem] = useState<number[]>([]);
  const ok = ordem.length === d.seq.length ? ordem.every((k, i) => d.seq[i] === d.cartas[k].v) : null;
  return (
    <Desafio lang={lang} titulo="Put the Fibonacci numbers in order" nivel="Step 3" instrucao="Tap the cards in order, from the smallest to the largest."
      onNovo={() => { novo(); setOrdem([]); }}>
      <div className="k-cards-row">
        {d.cartas.map((c, k) => (
          <button key={k} className={`k-num-card ${ordem.includes(k) ? "on" : ""}`} onClick={() => !ordem.includes(k) && setOrdem([...ordem, k])}>
            {c.v}{ordem.includes(k) && <small className="k-order-badge">{ordem.indexOf(k) + 1}</small>}
          </button>
        ))}
      </div>
      <Resultado ok={ok} lang={lang}>{d.seq.join(", ")} — each number = sum of the two before it.</Resultado>
      {ok === false && <div className="k-actions"><button className="k-btn ghost" onClick={() => setOrdem([])}>Try again</button></div>}
    </Desafio>
  );
}

/** EN 2 — encontre o número errado. */
export function FindTheMistake({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const d = useMemo(() => { const i = rnd(0, 5); const seq = FIB.slice(i, i + 7); const pos = rnd(3, 6); const errado = [...seq]; errado[pos] = seq[pos] + pick([1, 2, -1, 3]); return { seq, errado, pos }; }, [semente]);
  const [esc, setEsc] = useState<number | null>(null);
  return (
    <Desafio lang={lang} titulo="Find the mistake" nivel="Step 4" instrucao="One number in this Fibonacci sequence is wrong. Tap it!"
      onNovo={() => { novo(); setEsc(null); }}>
      <div className="k-cards-row">
        {d.errado.map((v, i) => (
          <button key={i} className={`k-num-card ${esc === i ? (i === d.pos ? "on" : "bad") : ""}`} onClick={() => setEsc(i)}>{v}</button>
        ))}
      </div>
      <Resultado ok={esc === null ? null : esc === d.pos} lang={lang}>{d.seq[d.pos - 2]} + {d.seq[d.pos - 1]} = <b>{d.seq[d.pos]}</b>, not {d.errado[d.pos]}.</Resultado>
    </Desafio>
  );
}

export const quizFibPT: Array<() => QA> = [
  () => { const i = rnd(0, 6); const s = FIB.slice(i, i + 5); const p = FIB[i + 5]; return { q: <>Qual é o próximo número da sequência de Fibonacci? <b className="k-big">{s.join(", ")}, …</b></>, certa: String(p), erradas: [String(p + 1), String(s[4] * 2), String(s[4] + 1)], why: <>{s[3]} + {s[4]} = <b>{p}</b>.</> }; },
  () => { const i = rnd(1, 6); const s = FIB.slice(i, i + 6); const pos = rnd(2, 4); return { q: <>Qual número falta? <b className="k-big">{s.map((v, k) => (k === pos ? "__" : v)).join(", ")}</b></>, certa: String(s[pos]), erradas: [String(s[pos] + 1), String(s[pos] - 1), String(s[pos - 1] * 2)], why: <>{s[pos - 2]} + {s[pos - 1]} = <b>{s[pos]}</b>.</> }; },
];
export const quizFibEN: Array<() => QA> = [
  () => { const i = rnd(0, 6); const s = FIB.slice(i, i + 5); const p = FIB[i + 5]; return { q: <>What is the next number? <b className="k-big">{s.join(", ")}, …</b></>, certa: String(p), erradas: [String(p - 1), String(s[4] + 2), String(s[4] * 2)], why: <>{s[3]} + {s[4]} = <b>{p}</b>.</> }; },
  () => { const i = rnd(2, 7); const a = FIB[i], b = FIB[i + 1]; return { q: <>In the Fibonacci sequence, two numbers in a row are <b>{a}</b> and <b>{b}</b>. What comes next?</>, certa: String(a + b), erradas: [String(b + 1), String(a * b), String(b * 2)], why: <>{a} + {b} = <b>{a + b}</b>.</> }; },
];
