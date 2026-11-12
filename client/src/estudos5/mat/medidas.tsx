// U9 · Perímetro e área na malha · Perímetro de polígonos · Área do retângulo
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { LigarPontos } from "../jogos";
import { CampoNumero, Desafio, Resultado, embaralhar, fmt, igual, lerNumero, pick, rnd, tx, useSemente, type Lang, type QA } from "./util";

/* =============================== figuras na malha =============================== */

export type Figura = { cels: Array<[number, number]>; linhas: number; colunas: number };
const k = (r: number, c: number) => `${r},${c}`;

function normalizar(cels: Array<[number, number]>): Figura {
  const minR = Math.min(...cels.map((x) => x[0])); const minC = Math.min(...cels.map((x) => x[1]));
  const n = cels.map(([r, c]) => [r - minR, c - minC] as [number, number]);
  return { cels: n, linhas: Math.max(...n.map((x) => x[0])) + 1, colunas: Math.max(...n.map((x) => x[1])) + 1 };
}

/** Figura aleatória de quadradinhos ligados pelos lados (como as figuras A–D da questão 3). */
export function novaFigura(min = 5, max = 10, maxW = 7, maxH = 5): Figura {
  for (let t = 0; t < 200; t++) {
    const alvo = rnd(min, max);
    const set = new Set<string>([k(0, 0)]);
    const lista: Array<[number, number]> = [[0, 0]];
    while (lista.length < alvo) {
      const [r, c] = pick(lista);
      const [dr, dc] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]] as const);
      if (!set.has(k(r + dr, c + dc))) { set.add(k(r + dr, c + dc)); lista.push([r + dr, c + dc]); }
    }
    const f = normalizar(lista);
    if (f.colunas <= maxW && f.linhas <= maxH && f.colunas > 1 && f.linhas > 1) return f;
  }
  return normalizar([[0, 0], [0, 1], [1, 0], [1, 1], [0, 2]]);
}
export const girar = (f: Figura): Figura => normalizar(f.cels.map(([r, c]) => [c, -r] as [number, number]));
export const area = (f: Figura) => f.cels.length;
export function perimetro(f: Figura | Array<[number, number]>) {
  const cels = Array.isArray(f) ? f : f.cels;
  const s = new Set(cels.map(([r, c]) => k(r, c)));
  let p = 0;
  for (const [r, c] of cels) for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!s.has(k(r + dr, c + dc))) p++;
  return p;
}
export function bordas(f: Figura) {
  const s = new Set(f.cels.map(([r, c]) => k(r, c)));
  const out: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (const [r, c] of f.cels) {
    if (!s.has(k(r - 1, c))) out.push({ x1: c, y1: r, x2: c + 1, y2: r });
    if (!s.has(k(r + 1, c))) out.push({ x1: c, y1: r + 1, x2: c + 1, y2: r + 1 });
    if (!s.has(k(r, c - 1))) out.push({ x1: c, y1: r, x2: c, y2: r + 1 });
    if (!s.has(k(r, c + 1))) out.push({ x1: c + 1, y1: r, x2: c + 1, y2: r + 1 });
  }
  return out;
}

/** Desenha a figura sobre uma malha com 1 quadradinho de margem. */
export function DesenhoMalha({ f, cor = "#c9d9f2", rotulo, tam = 30, children }: { f: Figura; cor?: string; rotulo?: string; tam?: number; children?: React.ReactNode }) {
  const W = (f.colunas + 2) * tam; const H = (f.linhas + 2) * tam;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="k-malha" style={{ maxWidth: W * 1.4 }} role="img" aria-label={rotulo ?? "Figura na malha"}>
      {Array.from({ length: f.colunas + 3 }, (_, i) => <line key={`v${i}`} x1={i * tam} y1={0} x2={i * tam} y2={H} stroke="#d5dde8" />)}
      {Array.from({ length: f.linhas + 3 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * tam} x2={W} y2={i * tam} stroke="#d5dde8" />)}
      <g transform={`translate(${tam} ${tam})`}>
        {f.cels.map(([r, c]) => <rect key={k(r, c)} x={c * tam} y={r * tam} width={tam} height={tam} fill={cor} />)}
        {bordas(f).map((b, i) => <line key={i} x1={b.x1 * tam} y1={b.y1 * tam} x2={b.x2 * tam} y2={b.y2 * tam} stroke="#3b5f8f" strokeWidth="2.5" strokeLinecap="round" />)}
        {rotulo && <text x={(f.colunas * tam) / 2} y={(f.linhas * tam) / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="900" fill="#1f3554">{rotulo}</text>}
        {children}
      </g>
    </svg>
  );
}

/** PT 1 — pinte uma figura com a área pedida. */
export function PinteNaMalha({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const alvo = useMemo(() => rnd(5, 12), [semente]);
  const [cel, setCel] = useState<Set<string>>(new Set());
  const [conf, setConf] = useState(false);
  const L = 6, C = 9, tam = 34;
  const lista = Array.from(cel).map((s) => s.split(",").map(Number) as [number, number]);
  const ligado = (() => {
    if (!lista.length) return false;
    const vis = new Set([k(...lista[0])]); const fila = [lista[0]];
    while (fila.length) { const [r, c] = fila.pop()!; for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const kk = k(r + dr, c + dc); if (cel.has(kk) && !vis.has(kk)) { vis.add(kk); fila.push([r + dr, c + dc]); } } }
    return vis.size === cel.size;
  })();
  const ok = conf ? cel.size === alvo && ligado : null;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Desenhe na malha", "Draw on the grid")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, "Pinte uma figura (com os quadradinhos encostados pelos lados) com", "Color one shape (squares touching by their sides) with")} <b>{tx(lang, "área", "area")} = {alvo}</b> {tx(lang, "quadradinhos. Veja o perímetro mudar!", "squares. Watch the perimeter change!")}</>}
      onNovo={() => { novo(); setCel(new Set()); setConf(false); }}>
      <svg viewBox={`0 0 ${C * tam} ${L * tam}`} className="k-malha k-malha-edit" role="grid">
        {Array.from({ length: L * C }, (_, i) => {
          const r = Math.floor(i / C), c = i % C; const on = cel.has(k(r, c));
          return <rect key={i} x={c * tam} y={r * tam} width={tam} height={tam} fill={on ? "#7fb0ea" : "#fff"} stroke="#d5dde8" style={{ cursor: "pointer" }}
            onClick={() => { const n = new Set(cel); if (on) n.delete(k(r, c)); else n.add(k(r, c)); setCel(n); setConf(false); }} />;
        })}
        {lista.length > 0 && bordas(normalizarSemMover(lista)).map((b, i) => <line key={i} x1={b.x1 * tam} y1={b.y1 * tam} x2={b.x2 * tam} y2={b.y2 * tam} stroke="#1f4f8a" strokeWidth="3" pointerEvents="none" />)}
      </svg>
      <div className="k-counters">
        <span>🟦 {tx(lang, "Área", "Area")}: <b>{cel.size}</b></span>
        <span>📏 {tx(lang, "Perímetro", "Perimeter")}: <b>{lista.length ? perimetro(lista) : 0}</b></span>
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
      </div>
      <Resultado ok={ok} lang={lang}>
        {ok ? tx(lang, `Área = ${alvo} quadradinhos. O perímetro é o contorno: ${perimetro(lista)} lados de quadradinho.`, `Area = ${alvo} squares. The perimeter is the outline: ${perimetro(lista)} units.`)
          : !ligado && cel.size ? tx(lang, "Os quadradinhos precisam formar UMA figura, encostados pelos lados.", "The squares must make ONE shape, touching by their sides.")
          : tx(lang, `A área precisa ser ${alvo}. Você pintou ${cel.size}.`, `The area must be ${alvo}. You colored ${cel.size}.`)}
      </Resultado>
    </Desafio>
  );
}
function normalizarSemMover(cels: Array<[number, number]>): Figura {
  return { cels, linhas: Math.max(...cels.map((x) => x[0])) + 1, colunas: Math.max(...cels.map((x) => x[1])) + 1 };
}

/** PT 2 — figura aleatória: calcule perímetro e área (gira, cresce, diminui). */
export function FiguraNaMalha({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const [f, setF] = useState<Figura>(() => novaFigura());
  const [p, setP] = useState(""); const [a, setA] = useState(""); const [conf, setConf] = useState(false);
  const okP = igual(lerNumero(p), perimetro(f)); const okA = igual(lerNumero(a), area(f));
  const trocar = (nf: Figura) => { setF(nf); setP(""); setA(""); setConf(false); };
  return (
    <Desafio lang={lang} titulo={tx(lang, "Perímetro e área da figura", "Perimeter and area of the shape")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={tx(lang, "Conte os lados de quadradinho no contorno (perímetro) e os quadradinhos de dentro (área).", "Count the unit sides around the outline (perimeter) and the squares inside (area).")}>
      <motion.div key={`${semente}-${f.cels.length}-${f.colunas}`} initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="k-center">
        <DesenhoMalha f={f} />
      </motion.div>
      <div className="k-counters">
        <label>{tx(lang, "Perímetro", "Perimeter")} <CampoNumero valor={p} onChange={setP} rotulo="perimetro" estado={conf ? (okP ? "ok" : "bad") : ""} /> {tx(lang, "unidades", "units")}</label>
        <label>{tx(lang, "Área", "Area")} <CampoNumero valor={a} onChange={setA} rotulo="area" estado={conf ? (okA ? "ok" : "bad") : ""} /> {tx(lang, "quadradinhos", "squares")}</label>
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
      </div>
      <Resultado ok={conf ? okP && okA : null} lang={lang}>{tx(lang, "Perímetro", "Perimeter")} = <b>{perimetro(f)}</b> · {tx(lang, "Área", "Area")} = <b>{area(f)}</b></Resultado>
      <div className="k-actions">
        <button className="k-btn ghost" onClick={() => trocar(girar(f))}><RotateCw size={15} /> {tx(lang, "Girar a figura", "Rotate the shape")}</button>
        <button className="k-btn ghost" onClick={() => trocar(novaFigura(9, 14, 8, 6))}>➕ {tx(lang, "Figura maior", "Bigger shape")}</button>
        <button className="k-btn ghost" onClick={() => trocar(novaFigura(4, 6, 5, 4))}>➖ {tx(lang, "Figura menor", "Smaller shape")}</button>
        <button className="k-btn ghost" onClick={() => { novo(); trocar(novaFigura()); }}>🔄 {tx(lang, "Outra figura", "New shape")}</button>
      </div>
      <p className="k-vis-help">{tx(lang, "Repare: girar a figura não muda o perímetro nem a área!", "Notice: rotating the shape does not change its perimeter or area!")}</p>
    </Desafio>
  );
}

/** EN 1 — toque em cada lado do contorno para contar o perímetro. */
export function TraceThePerimeter({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const f = useMemo(() => novaFigura(5, 9), [semente]);
  const bs = useMemo(() => bordas(f), [f]);
  const [marcados, setMarcados] = useState<Set<number>>(new Set());
  const [a, setA] = useState(""); const [conf, setConf] = useState(false);
  const tam = 34;
  const completo = marcados.size === bs.length;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Contorne o perímetro", "Trace the perimeter")} nivel="Step 3"
      instrucao={tx(lang, "Toque em cada lado do contorno para contá-lo. Depois escreva a área.", "Tap each side of the outline to count it. Then write the area.")}
      onNovo={() => { novo(); setMarcados(new Set()); setA(""); setConf(false); }}>
      <div className="k-center">
        <DesenhoMalha f={f} tam={tam}>
          {bs.map((b, i) => (
            <g key={i} onClick={() => { const n = new Set(marcados); n.add(i); setMarcados(n); }} style={{ cursor: "pointer" }}>
              <line x1={b.x1 * tam} y1={b.y1 * tam} x2={b.x2 * tam} y2={b.y2 * tam} stroke="transparent" strokeWidth="16" />
              <motion.line x1={b.x1 * tam} y1={b.y1 * tam} x2={b.x2 * tam} y2={b.y2 * tam} stroke={marcados.has(i) ? "#e0573f" : "#3b5f8f"} strokeWidth={marcados.has(i) ? 6 : 2.5} strokeLinecap="round" animate={{ opacity: 1 }} />
            </g>
          ))}
        </DesenhoMalha>
      </div>
      <div className="k-counters">
        <span>📏 Perimeter: <b>{marcados.size}</b>{completo ? " ✅" : ""}</span>
        <label>Area <CampoNumero valor={a} onChange={setA} rotulo="area" estado={conf ? (igual(lerNumero(a), area(f)) ? "ok" : "bad") : ""} /> squares</label>
        <button className="k-btn" onClick={() => setConf(true)}>Check</button>
      </div>
      <Resultado ok={conf ? completo && igual(lerNumero(a), area(f)) : null} lang={lang}>
        Perimeter = <b>{bs.length} units</b> (all sides traced: {completo ? "yes" : "not yet"}). Area = <b>{area(f)} squares</b>.
      </Resultado>
    </Desafio>
  );
}

/** EN 2 — compare duas figuras. */
export function CompareShapes({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const dados = useMemo(() => {
    const pergunta = pick(["area", "perimeter"] as const);
    for (let t = 0; t < 100; t++) {
      const A = novaFigura(4, 10, 6, 4), B = novaFigura(4, 10, 6, 4);
      const va = pergunta === "area" ? area(A) : perimetro(A); const vb = pergunta === "area" ? area(B) : perimetro(B);
      if (va !== vb) return { A, B, pergunta, va, vb };
    }
    const A = novaFigura(), B = novaFigura(); return { A, B, pergunta, va: area(A), vb: area(B) + 1 };
  }, [semente]);
  const [esc, setEsc] = useState<"A" | "B" | null>(null);
  const certo = dados.va > dados.vb ? "A" : "B";
  return (
    <Desafio lang={lang} titulo={tx(lang, "Qual é maior?", "Which one is greater?")} nivel="Step 4"
      instrucao={<>Which shape has the <b>greater {dados.pergunta}</b>? Tap it.</>}
      onNovo={() => { novo(); setEsc(null); }}>
      <div className="k-compare-shapes">
        {(["A", "B"] as const).map((l) => (
          <button key={l} className={`k-shape-pick ${esc === l ? (l === certo ? "ok" : "bad") : ""}`} onClick={() => setEsc(l)}>
            <DesenhoMalha f={l === "A" ? dados.A : dados.B} rotulo={l} tam={26} />
          </button>
        ))}
      </div>
      <Resultado ok={esc === null ? null : esc === certo} lang={lang}>
        A: {dados.pergunta} = <b>{dados.va}</b> · B: {dados.pergunta} = <b>{dados.vb}</b>.
      </Resultado>
    </Desafio>
  );
}

/* quizzes da malha */
export const quizMalhaPT: Array<() => QA> = [
  () => { const f = novaFigura(5, 11); const a = area(f); return { q: <>Qual é a <b>área</b> desta figura? (cada quadradinho = 1)</>, figura: <DesenhoMalha f={f} tam={26} />, certa: `${a} quadradinhos`, erradas: [`${perimetro(f)} quadradinhos`, `${a + 1} quadradinhos`, `${a - 1} quadradinhos`, `${a + 2} quadradinhos`], why: <>Conte os quadradinhos pintados: <b>{a}</b>.</> }; },
  () => { const f = novaFigura(5, 11); const p = perimetro(f); return { q: <>Qual é o <b>perímetro</b> desta figura? (cada lado de quadradinho = 1)</>, figura: <DesenhoMalha f={f} tam={26} />, certa: `${p} unidades`, erradas: [`${area(f)} unidades`, `${p + 2} unidades`, `${p - 2} unidades`, `${p + 4} unidades`], why: <>Ande pelo contorno contando cada ladinho: <b>{p}</b>.</> }; },
];
export const quizMalhaEN: Array<() => QA> = [
  () => { const f = novaFigura(5, 11); const p = perimetro(f); return { q: <>What is the <b>perimeter</b> of this shape? (each side = 1 unit)</>, figura: <DesenhoMalha f={f} tam={26} />, certa: `${p} units`, erradas: [`${area(f)} units`, `${p + 2} units`, `${p - 2} units`, `${p + 1} units`], why: <>Count every unit side around the outline: <b>{p}</b>.</> }; },
  () => { const f = novaFigura(5, 11); const a = area(f); return { q: <>What is the <b>area</b> of this shape?</>, figura: <DesenhoMalha f={f} tam={26} />, certa: `${a} square units`, erradas: [`${perimetro(f)} square units`, `${a + 1} square units`, `${a - 1} square units`, `${a + 3} square units`], why: <>Count the squares inside: <b>{a}</b>.</> }; },
];

/* =============================== perímetro de polígonos =============================== */

const NOMES_PT: Record<number, string> = { 3: "triângulo", 4: "quadrilátero", 5: "pentágono", 6: "hexágono" };
const NOMES_EN: Record<number, string> = { 3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon" };
export function novoPoligono() {
  const n = rnd(3, 6);
  const lados = Array.from({ length: n }, () => rnd(2, 15));
  const pontos = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2 + (Math.random() - 0.5) * 0.4;
    const r = 80 + Math.random() * 25;
    return [150 + r * Math.cos(a), 115 + r * Math.sin(a)] as [number, number];
  });
  return { n, lados, pontos };
}

function DesenhoPoligono({ pol, marcados, onLado, unidade }: { pol: ReturnType<typeof novoPoligono>; marcados?: Set<number>; onLado?: (i: number) => void; unidade: string }) {
  const { pontos, lados } = pol;
  return (
    <svg viewBox="0 0 300 230" className="k-vis-svg k-poly" role="img" aria-label={`Polígono com lados ${lados.join(", ")}`}>
      <polygon points={pontos.map((p) => p.join(",")).join(" ")} fill="#fdf0d8" />
      {pontos.map((p, i) => {
        const q = pontos[(i + 1) % pontos.length];
        const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
        const dx = mx - 150, dy = my - 115, len = Math.hypot(dx, dy) || 1;
        const on = marcados?.has(i);
        return (
          <g key={i} onClick={() => onLado?.(i)} style={{ cursor: onLado ? "pointer" : "default" }}>
            <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="transparent" strokeWidth="18" />
            <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={on ? "#e0573f" : "#8a5a1a"} strokeWidth={on ? 6 : 4} strokeLinecap="round" />
            <text x={mx + (dx / len) * 18} y={my + (dy / len) * 18 + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill="#5a3a10">{lados[i]} {unidade}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** PT 1 — a formiguinha anda pelos lados somando. */
export function FormigaPerimetro({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const pol = useMemo(() => novoPoligono(), [semente]);
  const [ordem, setOrdem] = useState<number[]>([]);
  const [t, setT] = useState(""); const [conf, setConf] = useState(false);
  const total = pol.lados.reduce((s, x) => s + x, 0);
  const ultimo = ordem[ordem.length - 1];
  const formiga = ultimo === undefined ? pol.pontos[0] : pol.pontos[(ultimo + 1) % pol.n];
  return (
    <Desafio lang={lang} titulo={tx(lang, "A formiguinha mede o contorno", "The ant walks the outline")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, `Este ${NOMES_PT[pol.n]} tem ${pol.n} lados. Toque em cada lado: a formiguinha anda e soma. Depois escreva o perímetro.`, `This ${NOMES_EN[pol.n]} has ${pol.n} sides. Tap each side: the ant walks and adds. Then write the perimeter.`)}</>}
      onNovo={() => { novo(); setOrdem([]); setT(""); setConf(false); }}>
      <div className="k-center k-poly-wrap">
        <DesenhoPoligono pol={pol} marcados={new Set(ordem)} unidade="cm" onLado={(i) => { if (!ordem.includes(i)) setOrdem([...ordem, i]); }} />
        <motion.span className="k-ant" animate={{ left: `${(formiga[0] / 300) * 100}%`, top: `${(formiga[1] / 230) * 100}%` }} transition={{ duration: 0.6 }}>🐜</motion.span>
      </div>
      <p className="k-live">{ordem.length ? ordem.map((i) => pol.lados[i]).join(" + ") : "…"} {ordem.length === pol.n && <>= <b>{total} cm</b></>}</p>
      <div className="k-counters">
        <label>{tx(lang, "Perímetro", "Perimeter")} <CampoNumero valor={t} onChange={setT} rotulo="perimetro" estado={conf ? (igual(lerNumero(t), total) ? "ok" : "bad") : ""} /> cm</label>
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
      </div>
      <Resultado ok={conf ? igual(lerNumero(t), total) : null} lang={lang}>{tx(lang, "Perímetro = soma de todos os lados", "Perimeter = sum of all sides")}: {pol.lados.join(" + ")} = <b>{total} cm</b>.</Resultado>
    </Desafio>
  );
}

/** PT 2 — ache a largura do retângulo (como a questão 4). */
export function LarguraQueFalta({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const r = useMemo(() => { const C = pick([20, 30, 40, 50, 60, 70, 80]); const L = pick([10, 15, 20, 25, 30, 35, 40].filter((x) => x < C)); return { C, L, P: 2 * (C + L) }; }, [semente]);
  const [l, setL] = useState(5);
  const P = 2 * (r.C + l);
  const ok = P === r.P;
  const esc = 3.2;
  return (
    <Desafio lang={lang} titulo={tx(lang, "O parquinho retangular", "The rectangular playground")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={<>{tx(lang, `O parquinho tem comprimento ${r.C} m e perímetro ${r.P} m. Arraste o controle até achar a largura.`, `The playground is ${r.C} m long and its perimeter is ${r.P} m. Move the slider to find the width.`)}</>}
      onNovo={() => { novo(); setL(5); }}>
      <svg viewBox="0 0 320 170" className="k-vis-svg" role="img" aria-label="Retângulo">
        <motion.rect x="20" y="20" width={r.C * esc} height={l * esc} initial={false} animate={{ width: r.C * esc, height: l * esc }} fill="#bfe6b3" stroke="#3d8a2f" strokeWidth="3" rx="4" />
        <text x={20 + (r.C * esc) / 2} y="14" textAnchor="middle" fontSize="13" fontWeight="900">{r.C} m</text>
        <text x={26 + r.C * esc} y={24 + (l * esc) / 2} fontSize="13" fontWeight="900">{l} m</text>
      </svg>
      <div className="k-sim-controls">
        <label>{tx(lang, "Largura", "Width")}: <b>{l} m</b><input type="range" min={1} max={r.C} value={l} onChange={(e) => setL(+e.target.value)} /></label>
      </div>
      <p className="k-live">{tx(lang, "Perímetro", "Perimeter")} = {r.C} + {l} + {r.C} + {l} = <b className={ok ? "k-ok" : ""}>{P} m</b> {ok ? "✅" : P < r.P ? tx(lang, "(falta)", "(too small)") : tx(lang, "(passou)", "(too big)")}</p>
      {ok && <Resultado ok lang={lang}>{tx(lang, "Conta direta", "Shortcut")}: ({r.P} − {r.C} − {r.C}) ÷ 2 = {r.P - 2 * r.C} ÷ 2 = <b>{r.L} m</b>.</Resultado>}
    </Desafio>
  );
}

/** EN 1 — ligue o polígono ao perímetro. */
export function MatchPerimeters({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const dados = useMemo(() => {
    const itens: Array<{ txt: string; p: number }> = []; const vistos = new Set<number>();
    while (itens.length < 4) {
      const n = rnd(3, 6); const lados = Array.from({ length: n }, () => rnd(2, 12)); const p = lados.reduce((s, x) => s + x, 0);
      if (!vistos.has(p)) { vistos.add(p); itens.push({ txt: `${NOMES_EN[n]}: ${lados.join(" cm, ")} cm`, p }); }
    }
    const direita = embaralhar(itens.map((i) => `${i.p} cm`));
    return { esquerda: itens.map((i) => i.txt), direita, certo: itens.map((i) => direita.indexOf(`${i.p} cm`)) };
  }, [semente]);
  return (
    <Desafio lang={lang} titulo="Match each polygon to its perimeter" nivel="Step 3" instrucao="Add all the sides of each polygon." onNovo={novo}>
      <LigarPontos key={semente} titulo="Polygon → perimeter" esquerda={dados.esquerda} direita={dados.direita} certo={dados.certo} />
    </Desafio>
  );
}

/** EN 2 — lado do retângulo a partir do perímetro (número que falta). */
export function MissingWidth({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const r = useMemo(() => { const C = rnd(6, 30) * 2; const L = rnd(3, C / 2); return { C, L, P: 2 * (C + L) }; }, [semente]);
  const [v, setV] = useState(""); const [conf, setConf] = useState(false);
  const ok = conf ? igual(lerNumero(v), r.L) : null;
  return (
    <Desafio lang={lang} titulo="Find the missing width" nivel="Step 4"
      instrucao={<>A rectangle is <b>{r.C} m</b> long. Its perimeter is <b>{r.P} m</b>. What is its width?</>}
      onNovo={() => { novo(); setV(""); setConf(false); }}>
      <div className="k-eq-row">
        <span>{r.C} + ? + {r.C} + ? = {r.P}</span>
        <label>Width <CampoNumero valor={v} onChange={setV} rotulo="width" estado={conf ? (ok ? "ok" : "bad") : ""} /> m</label>
        <button className="k-btn" onClick={() => setConf(true)}>Check</button>
      </div>
      <Resultado ok={ok} lang={lang}>{r.P} − {r.C} − {r.C} = {r.P - 2 * r.C}; {r.P - 2 * r.C} ÷ 2 = <b>{r.L} m</b>.</Resultado>
    </Desafio>
  );
}

export const quizPerimetroPT: Array<() => QA> = [
  () => { const n = rnd(3, 6); const l = Array.from({ length: n }, () => rnd(3, 15)); const p = l.reduce((s, x) => s + x, 0); return { q: <>Um {NOMES_PT[n]} tem lados de <b>{l.join(" cm, ")} cm</b>. Qual é o perímetro?</>, certa: `${p} cm`, erradas: [`${p + rnd(1, 5)} cm`, `${p - rnd(1, 5)} cm`, `${l[0] * l[1]} cm`], why: <>Some todos os lados: {l.join(" + ")} = <b>{p} cm</b>.</> }; },
  () => { const C = pick([40, 50, 60, 70, 80, 90]); const L = pick([10, 20, 25, 30, 35].filter((x) => x < C)); const P = 2 * (C + L); return { q: <>O parquinho do Centro Comunitário é retangular. O comprimento é <b>{C} m</b> e o perímetro é <b>{P} m</b>. Qual é a largura?</>, certa: `${L} m`, erradas: [`${P - C} m`, `${P - 2 * C} m`, `${(P - C) / 2} m`, `${P / 4} m`], why: <>{P} − {C} − {C} = {P - 2 * C}. Como são 2 larguras: {P - 2 * C} ÷ 2 = <b>{L} m</b>.</> }; },
];
export const quizPerimetroEN: Array<() => QA> = [
  () => { const s = rnd(3, 20); return { q: <>A square has a perimeter of <b>{4 * s} cm</b>. How long is each side?</>, certa: `${s} cm`, erradas: [`${2 * s} cm`, `${4 * s} cm`, `${s + 4} cm`], why: <>A square has 4 equal sides: {4 * s} ÷ 4 = <b>{s} cm</b>.</> }; },
  () => { const C = pick([30, 40, 50, 60, 70]); const L = pick([10, 15, 20, 25].filter((x) => x < C)); const P = 2 * (C + L); return { q: <>A rectangular field is <b>{C} m</b> long. The perimeter is <b>{P} m</b>. What is the width?</>, certa: `${L} m`, erradas: [`${P - 2 * C} m`, `${P - C} m`, `${P / 4} m`], why: <>{P} − 2 × {C} = {P - 2 * C}; {P - 2 * C} ÷ 2 = <b>{L} m</b>.</> }; },
];

/* =============================== área do retângulo =============================== */

/** PT 1 — monte um retângulo com a área pedida. */
export function MonteRetangulo({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const alvo = useMemo(() => rnd(2, 9) * rnd(2, 8), [semente]);
  const [c, setC] = useState(3); const [l, setL] = useState(2);
  const tam = 26;
  const ok = c * l === alvo;
  return (
    <Desafio lang={lang} titulo={tx(lang, "Monte o retângulo", "Build the rectangle")} nivel={tx(lang, "Degrau 1", "Step 1")}
      instrucao={<>{tx(lang, "Mude o comprimento e a largura até a área ser", "Change the length and the width until the area is")} <b>{alvo}</b> {tx(lang, "quadradinhos.", "squares.")}</>}
      onNovo={() => { novo(); setC(3); setL(2); }}>
      <div className="k-center">
        <svg viewBox={`0 0 ${10 * tam + 4} ${10 * tam + 4}`} className="k-malha" style={{ maxWidth: 300 }}>
          {Array.from({ length: c * l }, (_, i) => (
            <motion.rect key={`${c}-${i}`} x={2 + (i % c) * tam} y={2 + Math.floor(i / c) * tam} width={tam} height={tam} fill={ok ? "#9fd8a8" : "#a9c8ef"} stroke="#fff" strokeWidth="2"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.008 }} />
          ))}
        </svg>
      </div>
      <div className="k-sim-controls">
        <label>{tx(lang, "Comprimento", "Length")}: <b>{c}</b><input type="range" min={1} max={10} value={c} onChange={(e) => setC(+e.target.value)} /></label>
        <label>{tx(lang, "Largura", "Width")}: <b>{l}</b><input type="range" min={1} max={10} value={l} onChange={(e) => setL(+e.target.value)} /></label>
      </div>
      <p className="k-live">{tx(lang, "Área", "Area")} = {c} × {l} = <b className={ok ? "k-ok" : ""}>{c * l}</b> {ok ? "✅" : ""}</p>
      {ok && <Resultado ok lang={lang}>{tx(lang, "A regra: área do retângulo = comprimento × largura.", "The rule: area of a rectangle = length × width.")}</Resultado>}
    </Desafio>
  );
}

const UNIDADES = ["km", "m", "dm", "cm"];
export function novoRetDecimal() {
  const u = pick(UNIDADES);
  if (Math.random() < 0.5) { const a = rnd(11, 89) / 10; const b = rnd(2, 9); return { a, b, u, casasA: 1, casasB: 1 }; }
  const a = rnd(2, 9); const b = rnd(1, 9) / 10; return { a, b, u, casasA: 1, casasB: 1 };
}
export const areaDec = (r: { a: number; b: number }) => Math.round(r.a * r.b * 100) / 100;

/** PT 2 — área com decimais (como a questão 6). */
export function AreaDecimal({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const r = useMemo(() => novoRetDecimal(), [semente]);
  const [v, setV] = useState(""); const [conf, setConf] = useState(false);
  const A = areaDec(r);
  const ok = conf ? igual(lerNumero(v), A) : null;
  const larg = 200, alt = Math.max(30, Math.min(150, (r.b / r.a) * larg));
  return (
    <Desafio lang={lang} titulo={tx(lang, "Área com números decimais", "Area with decimals")} nivel={tx(lang, "Degrau 2", "Step 2")}
      instrucao={tx(lang, "Calcule a área do retângulo: comprimento × largura.", "Find the area: length × width.")}
      onNovo={() => { novo(); setV(""); setConf(false); }}>
      <svg viewBox="0 0 300 200" className="k-vis-svg" style={{ maxWidth: 360 }} role="img" aria-label="Retângulo">
        <rect x="60" y="30" width={larg} height={alt} fill="#fff" stroke="#333" strokeWidth="2.5" />
        <text x={60 + larg / 2} y="22" textAnchor="middle" fontSize="15" fontWeight="900">{fmt(r.a, lang, 1)} {r.u}</text>
        <text x="54" y={34 + alt / 2} textAnchor="end" fontSize="15" fontWeight="900">{fmt(r.b, lang, 1)} {r.u}</text>
      </svg>
      <div className="k-counters">
        <label>{tx(lang, "Área", "Area")} = <CampoNumero valor={v} onChange={setV} largura={90} rotulo="area" estado={conf ? (ok ? "ok" : "bad") : ""} /> {r.u}²</label>
        <button className="k-btn" onClick={() => setConf(true)}>{tx(lang, "Conferir", "Check")}</button>
      </div>
      <Resultado ok={ok} lang={lang}>{fmt(r.a, lang, 1)} × {fmt(r.b, lang, 1)} = <b>{fmt(A, lang)} {r.u}²</b>. {tx(lang, "Dica: faça a conta sem a vírgula e depois coloque de volta as casas decimais.", "Tip: multiply without the point, then put the decimal places back.")}</Resultado>
    </Desafio>
  );
}

/** EN 1 — ordene os retângulos pela área. */
export function OrderByArea({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const rets = useMemo(() => {
    const out: Array<{ c: number; l: number; id: string }> = []; const vistos = new Set<number>();
    while (out.length < 3) { const c = rnd(2, 9), l = rnd(2, 7); if (!vistos.has(c * l)) { vistos.add(c * l); out.push({ c, l, id: "ABC"[out.length] }); } }
    return out;
  }, [semente]);
  const [ordem, setOrdem] = useState<string[]>([]);
  const certa = [...rets].sort((a, b) => a.c * a.l - b.c * b.l).map((x) => x.id);
  const fim = ordem.length === 3;
  return (
    <Desafio lang={lang} titulo="Order by area" nivel="Step 3" instrucao="Tap the rectangles from the SMALLEST area to the LARGEST area. Area = length × width."
      onNovo={() => { novo(); setOrdem([]); }}>
      <div className="k-rects">
        {rets.map((r) => (
          <button key={r.id} className={`k-rect-pick ${ordem.includes(r.id) ? "on" : ""}`} onClick={() => !ordem.includes(r.id) && setOrdem([...ordem, r.id])}>
            <svg viewBox="0 0 120 100" width="130">
              <rect x={60 - r.c * 6} y={50 - r.l * 6} width={r.c * 12} height={r.l * 12} fill="#ffe1a8" stroke="#b5782a" strokeWidth="2" />
              <text x="60" y="56" textAnchor="middle" fontSize="16" fontWeight="900">{r.id}</text>
            </svg>
            <small>{r.c} cm × {r.l} cm</small>
            {ordem.includes(r.id) && <span className="k-order-badge">{ordem.indexOf(r.id) + 1}</span>}
          </button>
        ))}
      </div>
      {fim && <Resultado ok={ordem.join() === certa.join()} lang={lang}>Order: {certa.map((id) => { const r = rets.find((x) => x.id === id)!; return `${id} (${r.c * r.l} cm²)`; }).join(" < ")}</Resultado>}
      {fim && <div className="k-actions"><button className="k-btn ghost" onClick={() => setOrdem([])}>Try again</button></div>}
    </Desafio>
  );
}

/** EN 2 — área com decimais e a unidade certa. */
export function AreaUnits({ lang }: { lang: Lang }) {
  const { semente, novo } = useSemente();
  const r = useMemo(() => novoRetDecimal(), [semente]);
  const [v, setV] = useState(""); const [u, setU] = useState(""); const [conf, setConf] = useState(false);
  const A = areaDec(r);
  const ok = conf ? igual(lerNumero(v), A) && u === `${r.u}²` : null;
  return (
    <Desafio lang={lang} titulo="Area and its unit" nivel="Step 4"
      instrucao={<>A rectangle is <b>{fmt(r.a, "en", 1)} {r.u}</b> by <b>{fmt(r.b, "en", 1)} {r.u}</b>. Write its area and choose the unit.</>}
      onNovo={() => { novo(); setV(""); setU(""); setConf(false); }}>
      <div className="k-counters">
        <label>Area = <CampoNumero valor={v} onChange={setV} largura={90} rotulo="area" estado={conf ? (igual(lerNumero(v), A) ? "ok" : "bad") : ""} /></label>
        <select className={`k-select ${conf ? (u === `${r.u}²` ? "right" : "wrong") : ""}`} value={u} onChange={(e) => setU(e.target.value)} aria-label="unit">
          <option value="">unit</option>
          {[r.u, `${r.u}²`, "cm", "m²"].filter((x, i, a) => a.indexOf(x) === i).map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
        <button className="k-btn" onClick={() => setConf(true)}>Check</button>
      </div>
      <Resultado ok={ok} lang={lang}>{fmt(r.a, "en", 1)} × {fmt(r.b, "en", 1)} = <b>{fmt(A, "en")} {r.u}²</b>. Area is measured in <b>square units</b>.</Resultado>
    </Desafio>
  );
}

export const quizAreaPT: Array<() => QA> = [
  () => { const c = rnd(3, 12), l = rnd(2, 9); return { q: <>Um retângulo tem <b>{c} m</b> de comprimento e <b>{l} m</b> de largura. Qual é a área?</>, certa: `${c * l} m²`, erradas: [`${2 * (c + l)} m²`, `${c + l} m²`, `${c * l + c} m²`], why: <>Área = comprimento × largura = {c} × {l} = <b>{c * l} m²</b>.</> }; },
  () => { const r = novoRetDecimal(); const A = areaDec(r); return { q: <>Qual é a área de um retângulo de <b>{fmt(r.a, "pt", 1)} {r.u}</b> por <b>{fmt(r.b, "pt", 1)} {r.u}</b>?</>, certa: `${fmt(A, "pt")} ${r.u}²`, erradas: [`${fmt(Math.round((r.a + r.b) * 2 * 10) / 10, "pt")} ${r.u}²`, `${fmt(Math.round(A * 10 * 100) / 100, "pt")} ${r.u}²`, `${fmt(Math.round((r.a + r.b) * 10) / 10, "pt")} ${r.u}²`], why: <>{fmt(r.a, "pt", 1)} × {fmt(r.b, "pt", 1)} = <b>{fmt(A, "pt")} {r.u}²</b>.</> }; },
];
export const quizAreaEN: Array<() => QA> = [
  () => { const c = rnd(3, 12), l = rnd(2, 9); return { q: <>A rectangle is <b>{c} cm</b> long and <b>{l} cm</b> wide. What is its area?</>, certa: `${c * l} cm²`, erradas: [`${2 * (c + l)} cm²`, `${c + l} cm²`, `${c * l - l} cm²`], why: <>Area = length × width = {c} × {l} = <b>{c * l} cm²</b>.</> }; },
  () => { const r = novoRetDecimal(); const A = areaDec(r); return { q: <>Find the area of a rectangle <b>{fmt(r.a, "en", 1)} {r.u}</b> by <b>{fmt(r.b, "en", 1)} {r.u}</b>.</>, certa: `${fmt(A, "en")} ${r.u}²`, erradas: [`${fmt(Math.round((r.a + r.b) * 20) / 10, "en")} ${r.u}²`, `${fmt(Math.round(A * 1000) / 100, "en")} ${r.u}²`, `${fmt(A, "en")} ${r.u}`], why: <>{fmt(r.a, "en", 1)} × {fmt(r.b, "en", 1)} = <b>{fmt(A, "en")} {r.u}²</b>.</> }; },
];
