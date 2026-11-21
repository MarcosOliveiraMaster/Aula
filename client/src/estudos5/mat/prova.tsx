// Lista igual à Review Activity do PDF (9 questões), com valores novos a cada carregamento.
import { useMemo, useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { MonteOSaco, PALAVRAS, CORES, chance } from "./probabilidade";
import { Pizzas, duasFracoes, novoDecimal, novoMisto } from "./fracoes";
import { DesenhoMalha, area, novaFigura, perimetro, novoRetDecimal, areaDec } from "./medidas";
import { novoFatorQueFalta, novoTriplo, textoFator, dicaFator } from "./padroes";
import { CampoNumero, Frac, embaralhar, fmt, igual, lerNumero, pick, rnd } from "./util";

function Questao({ n, titulo, pt, children, resolucao, onConferir, ok }: { n: number; titulo: ReactNode; pt: string; children: ReactNode; resolucao: ReactNode; onConferir: () => void; ok: boolean | null }) {
  const [ver, setVer] = useState(false);
  return (
    <section className="k-section k-prova-q">
      <div className="k-prova-head"><span className="k-prova-n">{n}</span><div><h3 lang="en">{titulo}</h3><small>🇧🇷 {pt}</small></div></div>
      <div className="k-section-body">{children}</div>
      <div className="k-actions">
        <button className="k-btn" onClick={onConferir}>Check / Conferir</button>
        <button className="k-btn ghost" onClick={() => setVer(!ver)}>{ver ? "Esconder resolução" : "Ver resolução"}</button>
        {ok !== null && <span className={`k-score ${ok ? "" : "k-bad-text"}`}>{ok ? "✅ Tudo certo!" : "❌ Revise os campos vermelhos"}</span>}
      </div>
      {ver && <div className="k-resolucao">{resolucao}</div>}
    </section>
  );
}

const lerFracao = (s: string) => { const m = s.replace(/\s/g, "").match(/^(\d+)\/(\d+)$/); return m && +m[2] !== 0 ? +m[1] / +m[2] : null; };
const est = (conf: boolean, ok: boolean) => (conf ? (ok ? "ok" : "bad") : "") as "ok" | "bad" | "";

/* ---------------------------------- Q1 ---------------------------------- */
function Q1() {
  const itens = useMemo(() => [{ ...novoMisto(3), nome: "pizzas", tipo: "pizza" as const }, { ...novoMisto(4), nome: "sandwiches", tipo: "sanduiche" as const }], []);
  const [v, setV] = useState<string[][]>([["", ""], ["", ""]]); const [conf, setConf] = useState(false); const [desenho, setDesenho] = useState([false, false]);
  const okI = (i: number) => igual(lerNumero(v[i][0]), itens[i].w * itens[i].d + itens[i].n) && igual(lerNumero(v[i][1]), itens[i].d);
  return (
    <Questao n={1} titulo="Draw a picture to show each mixed number. Then, write an equivalent improper fraction." pt="Desenhe cada número misto e escreva a fração imprópria equivalente."
      ok={conf ? okI(0) && okI(1) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{itens.map((m, i) => <li key={i}><Frac inteiro={m.w} n={m.n} d={m.d} /> = {m.w} × {m.d} + {m.n} = <b><Frac n={m.w * m.d + m.n} d={m.d} /></b></li>)}</ul>}>
      {itens.map((m, i) => (
        <div key={i} className="k-prova-item">
          <p lang="en"><b>{String.fromCharCode(97 + i)})</b> <Frac inteiro={m.w} n={m.n} d={m.d} /> {m.nome}</p>
          <button className="k-btn ghost" onClick={() => setDesenho(desenho.map((x, k) => (k === i ? !x : x)))}>{desenho[i] ? "Esconder desenho" : "✏️ Mostrar o desenho"}</button>
          {desenho[i] && <Pizzas total={m.w * m.d + m.n} d={m.d} tipo={m.tipo} tamanho={70} />}
          <div className="k-eq-row">= <span className="k-frac k-frac-input">
            <CampoNumero valor={v[i][0]} onChange={(x) => { const n = v.map((r) => [...r]); n[i][0] = x; setV(n); }} largura={60} rotulo="numerador" estado={est(conf, igual(lerNumero(v[i][0]), m.w * m.d + m.n))} />
            <CampoNumero valor={v[i][1]} onChange={(x) => { const n = v.map((r) => [...r]); n[i][1] = x; setV(n); }} largura={60} rotulo="denominador" estado={est(conf, igual(lerNumero(v[i][1]), m.d))} />
          </span></div>
        </div>
      ))}
    </Questao>
  );
}

/* ---------------------------------- Q2 ---------------------------------- */
function Q2() {
  const decs = useMemo(() => {
    const out: Array<ReturnType<typeof novoDecimal>> = [];
    const vistos = new Set<number>();
    while (out.length < 4) {
      // como no PDF, um dos decimais é maior que 1 (ex.: 1,6)
      const d = out.length === 2 ? (() => { const x = rnd(11, 19); return { v: x / 10, num: x, den: 10 }; })() : novoDecimal();
      if (!vistos.has(d.v)) { vistos.add(d.v); out.push(d); }
    }
    return out;
  }, []);
  const [v, setV] = useState<string[][]>(decs.map(() => ["", ""])); const [conf, setConf] = useState(false);
  const okC = (i: number, j: number) => { const f = lerFracao(v[i][j]); return f !== null && Math.abs(f - decs[i].v) < 1e-9; };
  const okI = (i: number) => okC(i, 0) && okC(i, 1) && v[i][0].replace(/\s/g, "") !== v[i][1].replace(/\s/g, "");
  return (
    <Questao n={2} titulo="Write two equivalent fractions for each decimal." pt="Escreva duas frações equivalentes para cada decimal (ex.: 4/10)."
      ok={conf ? decs.every((_, i) => okI(i)) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{decs.map((d, i) => { const [a, b] = duasFracoes(d); return <li key={i}>{fmt(d.v, "en", d.den === 10 ? 1 : 2)} = <b>{a}</b> = <b>{b}</b></li>; })}</ul>}>
      {decs.map((d, i) => (
        <div key={i} className="k-eq-row">
          <b>{String.fromCharCode(97 + i)})</b> <b className="k-big">{fmt(d.v, "en", d.den === 10 ? 1 : 2)}</b> =
          {[0, 1].map((j) => <input key={j} className={`k-num ${est(conf, okC(i, j))}`} style={{ width: 84 }} value={v[i][j]} placeholder="?/?" aria-label={`fração ${j + 1}`} onChange={(e) => { const n = v.map((r) => [...r]); n[i][j] = e.target.value; setV(n); }} />)}
        </div>
      ))}
    </Questao>
  );
}

/* ---------------------------------- Q3 ---------------------------------- */
function Q3() {
  const figs = useMemo(() => ["A", "B", "C", "D"].map(() => novaFigura(5, 11)), []);
  const [v, setV] = useState<string[][]>(figs.map(() => ["", ""])); const [conf, setConf] = useState(false);
  const okP = (i: number) => igual(lerNumero(v[i][0]), perimetro(figs[i])); const okA = (i: number) => igual(lerNumero(v[i][1]), area(figs[i]));
  return (
    <Questao n={3} titulo="Find the perimeter and area of each figure. Record your results in the chart." pt="Encontre o perímetro e a área de cada figura e complete a tabela."
      ok={conf ? figs.every((_, i) => okP(i) && okA(i)) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{figs.map((f, i) => <li key={i}>{"ABCD"[i]}: perimeter = <b>{perimetro(f)}</b> units, area = <b>{area(f)}</b> square units</li>)}</ul>}>
      <div className="k-prova-figs">{figs.map((f, i) => <DesenhoMalha key={i} f={f} rotulo={"ABCD"[i]} tam={24} />)}</div>
      <div className="k-table-wrap">
        <table className="k-table k-prova-table">
          <thead><tr><th>Figure</th><th>Perimeter</th><th>Area</th></tr></thead>
          <tbody>{figs.map((_, i) => (
            <tr key={i}><td><b>{"ABCD"[i]}</b></td>
              {[0, 1].map((j) => <td key={j}><CampoNumero valor={v[i][j]} onChange={(x) => { const n = v.map((r) => [...r]); n[i][j] = x; setV(n); }} rotulo={`${"ABCD"[i]} ${j ? "área" : "perímetro"}`} estado={est(conf, j ? okA(i) : okP(i))} /></td>)}
            </tr>))}</tbody>
        </table>
      </div>
    </Questao>
  );
}

/* ---------------------------------- Q4 ---------------------------------- */
function Q4() {
  const r = useMemo(() => { const C = pick([40, 50, 60, 70, 80, 90, 100]); const L = pick([15, 20, 25, 30, 35, 40].filter((x) => x < C)); return { C, L, P: 2 * (C + L) }; }, []);
  const [v, setV] = useState(""); const [conf, setConf] = useState(false);
  return (
    <Questao n={4} titulo={<>The playground at the Community Centre is rectangular. Its length is {r.C} m. The perimeter is {r.P} m. What is the width of the playground?</>}
      pt={`O parquinho é retangular. Comprimento ${r.C} m e perímetro ${r.P} m. Qual é a largura?`}
      ok={conf ? igual(lerNumero(v), r.L) : null} onConferir={() => setConf(true)}
      resolucao={<>Perimeter = {r.C} + width + {r.C} + width. {r.P} − {r.C} − {r.C} = {r.P - 2 * r.C}. {r.P - 2 * r.C} ÷ 2 = <b>{r.L} m</b>.</>}>
      <div className="k-eq-row">Width = <CampoNumero valor={v} onChange={setV} rotulo="largura" estado={est(conf, igual(lerNumero(v), r.L))} /> m</div>
    </Questao>
  );
}

/* ---------------------------------- Q5 ---------------------------------- */
function Q5() {
  const fs = useMemo(() => [0, 1, 2, 3].map((forma) => { let f = novoFatorQueFalta(); while (f.forma !== forma) f = novoFatorQueFalta(); return f; }), []);
  const [v, setV] = useState(fs.map(() => "")); const [conf, setConf] = useState(false);
  return (
    <Questao n={5} titulo="Find each missing factor." pt="Encontre cada fator que falta."
      ok={conf ? fs.every((f, i) => igual(lerNumero(v[i]), f.x)) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{fs.map((f, i) => <li key={i}>{textoFator(f, <b>{f.x}</b>)} — {dicaFator(f, "pt")}</li>)}</ul>}>
      <div className="k-prova-grid">
        {fs.map((f, i) => (
          <div key={i} className="k-eq-row"><b>{String.fromCharCode(97 + i)})</b>
            {textoFator(f, <CampoNumero valor={v[i]} onChange={(x) => { const n = [...v]; n[i] = x; setV(n); }} largura={64} rotulo={`fator ${i + 1}`} estado={est(conf, igual(lerNumero(v[i]), f.x))} />)}
          </div>
        ))}
      </div>
    </Questao>
  );
}

/* ---------------------------------- Q6 ---------------------------------- */
function Q6() {
  const rs = useMemo(() => [0, 1, 2].map(() => novoRetDecimal()), []);
  const [v, setV] = useState(rs.map(() => "")); const [conf, setConf] = useState(false);
  return (
    <Questao n={6} titulo="Find the area of each rectangle." pt="Encontre a área de cada retângulo (comprimento × largura)."
      ok={conf ? rs.every((r, i) => igual(lerNumero(v[i]), areaDec(r))) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{rs.map((r, i) => <li key={i}>{fmt(r.a, "en", 1)} × {fmt(r.b, "en", 1)} = <b>{fmt(areaDec(r), "en")} {r.u}²</b></li>)}</ul>}>
      <div className="k-prova-rects">
        {rs.map((r, i) => {
          const W = 130, H = Math.max(24, Math.min(110, (r.b / r.a) * W));
          return (
            <div key={i} className="k-prova-rect">
              <b>{String.fromCharCode(97 + i)})</b>
              <svg viewBox="0 0 190 150" width="190"><rect x="45" y="22" width={W} height={H} fill="#fff" stroke="#333" strokeWidth="2" />
                <text x={45 + W / 2} y="16" textAnchor="middle" fontSize="13" fontWeight="800">{fmt(r.a, "en", 1)} {r.u}</text>
                <text x="40" y={26 + H / 2} textAnchor="end" fontSize="13" fontWeight="800">{fmt(r.b, "en", 1)} {r.u}</text></svg>
              <div className="k-eq-row">Area = <CampoNumero valor={v[i]} onChange={(x) => { const n = [...v]; n[i] = x; setV(n); }} largura={80} rotulo={`área ${i + 1}`} estado={est(conf, igual(lerNumero(v[i]), areaDec(r)))} /> {r.u}²</div>
            </div>
          );
        })}
      </div>
    </Questao>
  );
}

/* ---------------------------------- Q7 ---------------------------------- */
function Q7() {
  return (
    <section className="k-section k-prova-q">
      <div className="k-prova-head"><span className="k-prova-n">7</span><div><h3 lang="en">Draw counters in the bag to show these outcomes.</h3><small>🇧🇷 Coloque fichas no saco para mostrar estes resultados.</small></div></div>
      <MonteOSaco lang="en" />
    </section>
  );
}

/* ---------------------------------- Q8 ---------------------------------- */
function eventoAleatorio(): { texto: string; cat: number } {
  const [c1, c2, c3] = embaralhar(CORES);
  const tipo = rnd(0, 4);
  if (tipo === 0) { const n = rnd(5, 12); return { texto: `You pick a ${c1.en} counter from a bag with only ${n} ${c1.en} counters.`, cat: 3 }; }
  if (tipo === 1) { return { texto: `You pick a ${c2.en} counter from a bag with only ${c1.en} and ${c3.en} counters.`, cat: 0 }; }
  if (tipo === 2) { const a = rnd(7, 10), b = rnd(1, 3); return { texto: `You pick a ${c1.en} counter from a bag with ${a} ${c1.en} and ${b} ${c2.en} counters.`, cat: 2 }; }
  if (tipo === 3) { const a = rnd(7, 10), b = rnd(1, 3); return { texto: `You pick a ${c2.en} counter from a bag with ${a} ${c1.en} and ${b} ${c2.en} counters.`, cat: 1 }; }
  const a = rnd(5, 7); const alvo = pick([c1, c2]); const n = alvo === c1 ? a : 8 - a;
  return { texto: `A spinner has 8 equal parts: ${a} are ${c1.en} and ${8 - a} are ${c2.en}. It lands on ${alvo.en}.`, cat: chance(n, 8) };
}
function Q8() {
  const evs = useMemo(() => {
    const out: Array<{ texto: string; cat: number }> = [];
    const cats = new Set<number>();
    while (out.length < 5) {
      const e = eventoAleatorio();
      if (out.length < 4 && cats.has(e.cat) && cats.size < 4) continue;
      cats.add(e.cat); out.push(e);
    }
    return embaralhar(out);
  }, []);
  const [v, setV] = useState<Array<number | null>>(evs.map(() => null)); const [conf, setConf] = useState(false);
  return (
    <Questao n={8} titulo="Describe each outcome. Use these words: impossible, unlikely, likely, certain." pt="Descreva cada resultado com: impossível, pouco provável, provável, certo."
      ok={conf ? evs.every((e, i) => v[i] === e.cat) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{evs.map((e, i) => <li key={i}>{String.fromCharCode(97 + i)}) <b>{PALAVRAS.en[e.cat]}</b></li>)}</ul>}>
      {evs.map((e, i) => (
        <div key={i} className="k-prova-item">
          <p lang="en"><b>{String.fromCharCode(97 + i)})</b> {e.texto}</p>
          <select className={`k-select ${conf ? (v[i] === e.cat ? "right" : "wrong") : ""}`} value={v[i] ?? ""} onChange={(x) => { const n = [...v]; n[i] = +x.target.value; setV(n); }}>
            <option value="">…</option>
            {PALAVRAS.en.map((p, k) => <option key={p} value={k}>{p}</option>)}
          </select>
        </div>
      ))}
    </Questao>
  );
}

/* ---------------------------------- Q9 ---------------------------------- */
function Q9() {
  const ts = useMemo(() => Array.from({ length: 6 }, () => novoTriplo()), []);
  const [v, setV] = useState(ts.map(() => "")); const [conf, setConf] = useState(false);
  const prod = (t: number[]) => t.reduce((s, x) => s * x, 1);
  const estrategia = (t: number[]) => {
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if ([10, 100, 1000].includes(t[i] * t[j])) {
      const outro = t[3 - i - j]; return `${t[i]} × ${t[j]} = ${t[i] * t[j]}, then ${t[i] * t[j]} × ${outro} = ${prod(t)}`;
    }
    const i10 = t.findIndex((x) => x % 10 === 0); const resto = t.filter((_, k) => k !== i10);
    return i10 >= 0 ? `${resto[0]} × ${resto[1]} = ${resto[0] * resto[1]}, then × ${t[i10]} = ${prod(t)}` : `${t[0]} × ${t[1]} = ${t[0] * t[1]}, then × ${t[2]} = ${prod(t)}`;
  };
  return (
    <Questao n={9} titulo="Calculate the numbers below. What strategies did you use? Show your work." pt="Calcule. Que estratégia você usou? (Dica: junte os números que formam 10, 100 ou 1000.)"
      ok={conf ? ts.every((t, i) => igual(lerNumero(v[i]), prod(t))) : null} onConferir={() => setConf(true)}
      resolucao={<ul className="k-list">{ts.map((t, i) => <li key={i}>{t.join(" × ")}: {estrategia(t)}</li>)}</ul>}>
      <div className="k-prova-grid">
        {ts.map((t, i) => (
          <div key={i} className="k-eq-row"><b>{String.fromCharCode(97 + i)})</b> {t.join(" × ")} =
            <CampoNumero valor={v[i]} onChange={(x) => { const n = [...v]; n[i] = x; setV(n); }} largura={84} rotulo={`conta ${i + 1}`} estado={est(conf, igual(lerNumero(v[i]), prod(t)))} />
          </div>
        ))}
      </div>
    </Questao>
  );
}

export function ProvaMath() {
  const [versao, setVersao] = useState(0);
  return (
    <div className="k-prova" key={versao}>
      <div className="k-prova-top">
        <p>📝 Mesmas 9 questões da <b>Review Activity</b>, com <b>números novos</b> a cada vez. Resolva no caderno, digite as respostas e confira.</p>
        <button className="k-btn" onClick={() => { setVersao((x) => x + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}><RefreshCw size={15} /> Gerar nova prova</button>
      </div>
      <Q1 /><Q2 /><Q3 /><Q4 /><Q5 /><Q6 /><Q7 /><Q8 /><Q9 />
      <div className="k-actions k-center"><button className="k-btn" onClick={() => { setVersao((x) => x + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}><RefreshCw size={15} /> Gerar nova prova com outros números</button></div>
    </div>
  );
}
