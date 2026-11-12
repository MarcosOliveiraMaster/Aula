// Resumo PDF: as 9 questões da Review Activity com tradução, resolução e gabarito (português + inglês).
import { useMemo, useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Say } from "../ui";
import { Pizzas, duasFracoes, novoDecimal, novoMisto } from "./fracoes";
import { DesenhoMalha, area, areaDec, novaFigura, novoRetDecimal, perimetro } from "./medidas";
import { dicaFator, novoFatorQueFalta, novoTriplo, textoFator } from "./padroes";
import { CORES, Saco } from "./probabilidade";
import { Frac, Passos, fmt, mdc, pick, rnd } from "./util";

const letra = (i: number) => String.fromCharCode(97 + i);

function Cartao({ n, enunciado, figura, traducao, resolucao, gabaritoPT, gabaritoEN }: {
  n: number; enunciado: ReactNode; figura?: ReactNode; traducao: ReactNode; resolucao: ReactNode; gabaritoPT: ReactNode; gabaritoEN: Array<string>;
}) {
  return (
    <article className="k-section k-resumo">
      <div className="k-resumo-q">
        <span className="k-prova-n">{n}</span>
        <div className="k-resumo-enunciado" lang="en">{enunciado}</div>
      </div>
      {figura && <div className="k-resumo-fig">{figura}</div>}
      <div className="k-resumo-bloco trad">
        <b className="k-resumo-label">🇧🇷 Tradução</b>
        <div>{traducao}</div>
      </div>
      <div className="k-resumo-bloco res">
        <b className="k-resumo-label">🧮 Resolução passo a passo</b>
        <div>{resolucao}</div>
      </div>
      <div className="k-resumo-gab">
        <div className="k-resumo-bloco gab-pt">
          <b className="k-resumo-label">✅ Gabarito (português)</b>
          <div>{gabaritoPT}</div>
        </div>
        <div className="k-resumo-bloco gab-en">
          <b className="k-resumo-label">🇬🇧 Answer to write on the test</b>
          <ul className="k-resumo-en">
            {gabaritoEN.map((g) => <li key={g} lang="en"><span>{g}</span><Say text={g.replace(/×/g, " times ").replace(/=/g, " equals ").replace(/²/g, " squared")} /></li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------------------- */

function gerar() {
  const mistos = [{ ...novoMisto(3), nome: "pizzas", nomePt: "pizzas", tipo: "pizza" as const }, { ...novoMisto(4), nome: "sandwiches", nomePt: "sanduíches", tipo: "sanduiche" as const }];
  const decs: Array<ReturnType<typeof novoDecimal>> = [];
  const vistos = new Set<number>();
  while (decs.length < 4) {
    const d = decs.length === 2 ? (() => { const x = rnd(11, 19); return { v: x / 10, num: x, den: 10 }; })() : novoDecimal();
    if (!vistos.has(d.v)) { vistos.add(d.v); decs.push(d); }
  }
  const figs = [0, 1, 2, 3].map(() => novaFigura(5, 11));
  const C = pick([40, 50, 60, 70, 80, 90]); const L = pick([15, 20, 25, 30, 35].filter((x) => x < C));
  const fatores = [0, 1, 2, 3].map((forma) => { let f = novoFatorQueFalta(); while (f.forma !== forma) f = novoFatorQueFalta(); return f; });
  const rets = [0, 1, 2].map(() => novoRetDecimal());
  const total = 12;
  const verm = rnd(7, 9); const roxa = rnd(1, total - verm - 1); const verde = total - verm - roxa;
  const triplos = Array.from({ length: 6 }, () => novoTriplo());
  return { mistos, decs, figs, C, L, P: 2 * (C + L), fatores, rets, saco: { verm, roxa, verde, total }, triplos };
}

function estrategia(t: number[]) {
  const prod = t.reduce((s, x) => s * x, 1);
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    const par = t[i] * t[j];
    if ([10, 100, 1000].includes(par)) {
      const outro = t[3 - i - j];
      return {
        pt: <>Junte {t[i]} × {t[j]} = <b>{par}</b> (forma {par}!). Depois {par} × {outro} = <b>{prod}</b>.</>,
        en: `${t.join(" × ")}${i === 0 && j === 1 ? "" : ` = ${t[i]} × ${t[j]} × ${outro}`} = ${par} × ${outro} = ${prod}. Strategy: I multiplied ${t[i]} × ${t[j]} first to make ${par}.`,
      };
    }
  }
  const i10 = t.findIndex((x) => x % 10 === 0);
  if (i10 >= 0) {
    const r = t.filter((_, k) => k !== i10);
    return {
      pt: <>Faça {r[0]} × {r[1]} = <b>{r[0] * r[1]}</b>. Depois × {t[i10]}: {r[0] * r[1]} × {t[i10]} = <b>{prod}</b>.</>,
      en: `${t.join(" × ")}${i10 === 2 ? "" : ` = ${r[0]} × ${r[1]} × ${t[i10]}`} = ${r[0] * r[1]} × ${t[i10]} = ${prod}. Strategy: I multiplied ${r[0]} × ${r[1]} first, then multiplied by ${t[i10]}.`,
    };
  }
  return { pt: <>{t[0]} × {t[1]} = {t[0] * t[1]}; {t[0] * t[1]} × {t[2]} = <b>{prod}</b>.</>, en: `${t.join(" × ")} = ${prod}.` };
}

export function ResumoPDF() {
  const [versao, setVersao] = useState(0);
  const d = useMemo(() => gerar(), [versao]);
  const cor = (id: string) => CORES.find((c) => c.id === id)!;
  const fichas = [
    ...Array(d.saco.verm).fill(cor("red")),
    ...Array(d.saco.roxa).fill(cor("purple")),
    ...Array(d.saco.verde).fill(cor("green")),
  ];

  return (
    <div className="k-resumo-wrap">
      <div className="k-prova-top">
        <p>📄 As 9 questões da <b>Review Activity</b> do PDF. Em cada uma: o <b>enunciado em inglês</b>, a <b>tradução</b>, a <b>resolução</b> e o <b>gabarito</b> em português e em inglês, do jeito que a professora espera na prova. Os números mudam a cada vez.</p>
        <button className="k-btn" onClick={() => setVersao((v) => v + 1)}><RefreshCw size={15} /> Gerar outros números</button>
      </div>

      {/* 1 ---------------------------------------------------------------- */}
      <Cartao n={1}
        enunciado={<><p>Draw a picture to show each mixed number. Then, write an equivalent improper fraction.</p>
          {d.mistos.map((m, i) => <p key={i}><b>{letra(i)})</b> <Frac inteiro={m.w} n={m.n} d={m.d} /> {m.nome}</p>)}</>}
        traducao={<>Faça um desenho para mostrar cada número misto. Depois, escreva uma fração imprópria equivalente. {d.mistos.map((m, i) => <span key={i}><b>{letra(i)})</b> <Frac inteiro={m.w} n={m.n} d={m.d} /> {m.nomePt}{i === 0 ? "; " : "."}</span>)}</>}
        resolucao={<>{d.mistos.map((m, i) => (
          <div key={i} className="k-resumo-item">
            <b>{letra(i)})</b> Desenhe {m.tipo === "pizza"
              ? <>{m.w} {m.w === 1 ? "pizza inteira" : "pizzas inteiras"}, cada uma dividida em {m.d} partes, e mais {m.n} {m.n === 1 ? "parte" : "partes"} de outra pizza:</>
              : <>{m.w} {m.w === 1 ? "sanduíche inteiro" : "sanduíches inteiros"}, cada um dividido em {m.d} partes, e mais {m.n} {m.n === 1 ? "parte" : "partes"} de outro sanduíche:</>}
            <Pizzas total={m.w * m.d + m.n} d={m.d} tipo={m.tipo} tamanho={64} />
            <Passos itens={[<>Inteiros × denominador: {m.w} × {m.d} = {m.w * m.d}.</>, <>Some o numerador: {m.w * m.d} + {m.n} = {m.w * m.d + m.n}.</>, <>Mantenha o denominador {m.d}: <b><Frac n={m.w * m.d + m.n} d={m.d} /></b>.</>]} />
          </div>))}</>}
        gabaritoPT={<ul className="k-list">{d.mistos.map((m, i) => <li key={i}>{letra(i)}) <Frac inteiro={m.w} n={m.n} d={m.d} /> = <b><Frac n={m.w * m.d + m.n} d={m.d} /></b></li>)}</ul>}
        gabaritoEN={d.mistos.map((m, i) => `${letra(i)}) ${m.w} ${m.n}/${m.d} ${m.nome} = ${m.w * m.d + m.n}/${m.d}`)}
      />

      {/* 2 ---------------------------------------------------------------- */}
      <Cartao n={2}
        enunciado={<><p>Write two equivalent fractions for each decimal.</p><p>{d.decs.map((x, i) => <span key={i} className="k-resumo-inline"><b>{letra(i)})</b> {fmt(x.v, "en", x.den === 10 ? 1 : 2)}</span>)}</p></>}
        traducao={<>Escreva duas frações equivalentes para cada decimal. (Em inglês o decimal usa <b>ponto</b>: {fmt(d.decs[0].v, "en", d.decs[0].den === 10 ? 1 : 2)} = {fmt(d.decs[0].v, "pt", d.decs[0].den === 10 ? 1 : 2)}.)</>}
        resolucao={<ul className="k-list">{d.decs.map((x, i) => {
          const [a, b] = duasFracoes(x);
          return <li key={i}><b>{letra(i)})</b> {fmt(x.v, "pt", x.den === 10 ? 1 : 2)}: {x.den === 10
            ? <>1 casa depois da vírgula = décimos → <b>{a}</b>. Multiplicando em cima e embaixo por 10 → <b>{b}</b>.</>
            : <>2 casas = centésimos → <b>{a}</b>. Dividindo em cima e embaixo por {mdc(x.num, 100)} → <b>{b}</b>.</>}</li>;
        })}</ul>}
        gabaritoPT={<ul className="k-list">{d.decs.map((x, i) => { const [a, b] = duasFracoes(x); return <li key={i}>{letra(i)}) {fmt(x.v, "pt", x.den === 10 ? 1 : 2)} = <b>{a}</b> = <b>{b}</b></li>; })}</ul>}
        gabaritoEN={d.decs.map((x, i) => { const [a, b] = duasFracoes(x); return `${letra(i)}) ${fmt(x.v, "en", x.den === 10 ? 1 : 2)} = ${a} = ${b}`; })}
      />

      {/* 3 ---------------------------------------------------------------- */}
      <Cartao n={3}
        enunciado={<p>Find the perimeter and area of each figure. Record your results in the chart.</p>}
        figura={<div className="k-prova-figs">{d.figs.map((f, i) => <DesenhoMalha key={i} f={f} rotulo={"ABCD"[i]} tam={22} />)}</div>}
        traducao={<>Encontre o perímetro e a área de cada figura. Registre os resultados na tabela.</>}
        resolucao={<Passos itens={[<><b>Perímetro:</b> ande pelo contorno contando cada ladinho de quadradinho.</>, <><b>Área:</b> conte os quadradinhos de dentro da figura.</>, <>Escreva os números na tabela (Figure · Perimeter · Area).</>]} />}
        gabaritoPT={
          <div className="k-table-wrap">
            <table className="k-table k-resumo-table"><thead><tr><th>Figura</th><th>Perímetro<br /><small>(unid.)</small></th><th>Área<br /><small>(quadr.)</small></th></tr></thead>
              <tbody>{d.figs.map((f, i) => <tr key={i}><td><b>{"ABCD"[i]}</b></td><td><b>{perimetro(f)}</b></td><td><b>{area(f)}</b></td></tr>)}</tbody></table>
          </div>}
        gabaritoEN={d.figs.map((f, i) => `Figure ${"ABCD"[i]}: Perimeter = ${perimetro(f)} units; Area = ${area(f)} square units`)}
      />

      {/* 4 ---------------------------------------------------------------- */}
      <Cartao n={4}
        enunciado={<p>The playground at the Community Centre is rectangular. Its length is {d.C} m. The perimeter is {d.P} m. What is the width of the playground?</p>}
        traducao={<>O parquinho do Centro Comunitário é retangular. O comprimento é {d.C} m. O perímetro é {d.P} m. Qual é a largura do parquinho?</>}
        resolucao={<Passos itens={[
          <>Perímetro do retângulo = comprimento + largura + comprimento + largura.</>,
          <>Tire os dois comprimentos: {d.P} − {d.C} − {d.C} = <b>{d.P - 2 * d.C}</b>.</>,
          <>Sobram as duas larguras: {d.P - 2 * d.C} ÷ 2 = <b>{d.L} m</b>.</>,
          <>Confira: {d.C} + {d.L} + {d.C} + {d.L} = {d.P} ✔</>,
        ]} />}
        gabaritoPT={<>A largura do parquinho é <b>{d.L} m</b>.</>}
        gabaritoEN={[`${d.P} − ${d.C} − ${d.C} = ${d.P - 2 * d.C}`, `${d.P - 2 * d.C} ÷ 2 = ${d.L}`, `The width of the playground is ${d.L} m.`]}
      />

      {/* 5 ---------------------------------------------------------------- */}
      <Cartao n={5}
        enunciado={<><p>Find each missing factor.</p><div className="k-resumo-grid">{d.fatores.map((f, i) => <span key={i}><b>{letra(i)})</b> {textoFator(f)}</span>)}</div></>}
        traducao={<>Encontre cada fator que falta.</>}
        resolucao={<ul className="k-list">{d.fatores.map((f, i) => <li key={i}><b>{letra(i)})</b> {dicaFator(f, "pt")}</li>)}</ul>}
        gabaritoPT={<ul className="k-list">{d.fatores.map((f, i) => <li key={i}>{letra(i)}) {textoFator(f, <b>{f.x}</b>)}</li>)}</ul>}
        gabaritoEN={d.fatores.map((f, i) => {
          const eq = f.forma === 0 ? `${f.x} × ${f.a} = ${f.p}` : f.forma === 1 ? `${f.a} × ${f.x} = ${f.p}` : f.forma === 2 ? `${f.p} = ${f.a} × ${f.x}` : `${f.p} = ${f.x} × ${f.a}`;
          return `${letra(i)}) ${eq} (missing factor: ${f.x})`;
        })}
      />

      {/* 6 ---------------------------------------------------------------- */}
      <Cartao n={6}
        enunciado={<p>Find the area of each rectangle.</p>}
        figura={<div className="k-prova-rects">{d.rets.map((r, i) => {
          const W = 120, H = Math.max(24, Math.min(100, (r.b / r.a) * W));
          return <div key={i} className="k-prova-rect"><b>{letra(i)})</b>
            <svg viewBox="0 0 180 140" width="180"><rect x="45" y="22" width={W} height={H} fill="#fff" stroke="#333" strokeWidth="2" />
              <text x={45 + W / 2} y="16" textAnchor="middle" fontSize="13" fontWeight="800">{fmt(r.a, "en", 1)} {r.u}</text>
              <text x="40" y={26 + H / 2} textAnchor="end" fontSize="13" fontWeight="800">{fmt(r.b, "en", 1)} {r.u}</text></svg></div>;
        })}</div>}
        traducao={<>Encontre a área de cada retângulo.</>}
        resolucao={<><p>Regra: <b>área = comprimento × largura</b>. Com decimais, faça a conta sem a vírgula e depois coloque as casas decimais de volta.</p>
          <ul className="k-list">{d.rets.map((r, i) => {
            const A = areaDec(r); const sa = Math.round(r.a * 10), sb = Math.round(r.b * 10);
            return <li key={i}><b>{letra(i)})</b> {fmt(r.a, "pt", 1)} × {fmt(r.b, "pt", 1)} → {sa} × {sb} = {sa * sb}; são 2 casas decimais → <b>{fmt(A, "pt", 2)} = {fmt(A, "pt")} {r.u}²</b></li>;
          })}</ul></>}
        gabaritoPT={<ul className="k-list">{d.rets.map((r, i) => <li key={i}>{letra(i)}) Área = <b>{fmt(areaDec(r), "pt")} {r.u}²</b></li>)}</ul>}
        gabaritoEN={d.rets.map((r, i) => `${letra(i)}) Area = ${fmt(r.a, "en", 1)} × ${fmt(r.b, "en", 1)} = ${fmt(areaDec(r), "en")} ${r.u}²`)}
      />

      {/* 7 ---------------------------------------------------------------- */}
      <Cartao n={7}
        enunciado={<><p>Draw {d.saco.total} counters in the bag to show these outcomes:</p>
          <ul className="k-list"><li>Picking a red counter is likely.</li><li>Picking a purple counter is unlikely.</li><li>Picking a green counter is unlikely.</li><li>Picking a black counter is impossible.</li></ul></>}
        traducao={<>Desenhe {d.saco.total} fichas no saco para mostrar estes resultados: tirar uma ficha <b>vermelha</b> é <b>provável</b>; tirar uma <b>roxa</b> é <b>pouco provável</b>; tirar uma <b>verde</b> é <b>pouco provável</b>; tirar uma <b>preta</b> é <b>impossível</b>.</>}
        resolucao={<Passos itens={[
          <><b>Provável</b> (likely) = mais da metade. Metade de {d.saco.total} é {d.saco.total / 2}, então vermelhas: <b>mais de {d.saco.total / 2}</b>.</>,
          <><b>Pouco provável</b> (unlikely) = poucas fichas, mas pelo menos 1: roxas e verdes.</>,
          <><b>Impossível</b> (impossible) = nenhuma ficha preta.</>,
          <>Confira se o total dá {d.saco.total}: {d.saco.verm} + {d.saco.roxa} + {d.saco.verde} + 0 = {d.saco.total} ✔</>,
        ]} />}
        figura={<div className="k-resumo-bag"><Saco fichas={fichas} tam={170} /><div className="k-resumo-legend">
          <span><i style={{ background: cor("red").hex }} /> {d.saco.verm} red</span>
          <span><i style={{ background: cor("purple").hex }} /> {d.saco.roxa} purple</span>
          <span><i style={{ background: cor("green").hex }} /> {d.saco.verde} green</span>
          <span><i style={{ background: cor("black").hex }} /> 0 black</span></div></div>}
        gabaritoPT={<>Exemplo: <b>{d.saco.verm} vermelhas, {d.saco.roxa} roxa(s), {d.saco.verde} verde(s) e nenhuma preta</b>. Há outras respostas certas: vermelhas devem ser mais da metade, roxas e verdes poucas (pelo menos 1) e nenhuma preta.</>}
        gabaritoEN={[`I drew ${d.saco.verm} red, ${d.saco.roxa} purple, ${d.saco.verde} green and 0 black counters.`, `Red is likely because more than half of the counters are red.`, `Black is impossible because there are no black counters.`]}
      />

      {/* 8 ---------------------------------------------------------------- */}
      <Cartao n={8}
        enunciado={<><p>Describe each outcome. Use these words: impossible, unlikely, likely, certain.</p>
          <ul className="k-list">
            <li><b>a)</b> Someone in your class will win a raffle.</li>
            <li><b>b)</b> Someone in your class is 10 years old.</li>
            <li><b>c)</b> It will rain tomorrow.</li>
            <li><b>d)</b> Your favourite team will win the Stanley Cup this year.</li>
            <li><b>e)</b> You will have math homework next Wednesday.</li>
          </ul></>}
        traducao={<>Descreva cada resultado usando: <b>impossible</b> (impossível), <b>unlikely</b> (pouco provável), <b>likely</b> (provável), <b>certain</b> (certo). a) Alguém da sua turma vai ganhar uma rifa. b) Alguém da sua turma tem 10 anos. c) Vai chover amanhã. d) Seu time favorito vai ganhar a Stanley Cup (campeonato de hóquei) este ano. e) Você vai ter lição de casa de Math na próxima quarta-feira.</>}
        resolucao={<><p>Estas respostas dependem da sua realidade: o importante é <b>escolher a palavra e explicar o porquê</b>. Sugestões:</p>
          <ul className="k-list">
            <li><b>a)</b> Numa rifa muitas pessoas concorrem e poucas ganham → <b>pouco provável</b>.</li>
            <li><b>b)</b> No Year 5 quase todos têm 10 ou 11 anos → <b>provável</b> (ou <b>certo</b>, se você sabe que um colega tem 10 anos).</li>
            <li><b>c)</b> Depende da previsão do tempo → <b>provável</b> em época de chuva, <b>pouco provável</b> em época de seca.</li>
            <li><b>d)</b> Muitos times disputam e só um ganha → <b>pouco provável</b>.</li>
            <li><b>e)</b> Se a professora costuma passar lição às quartas → <b>provável</b> (ou <b>certo</b>, se sempre passa).</li>
          </ul></>}
        gabaritoPT={<>a) pouco provável · b) provável · c) provável ou pouco provável (explique) · d) pouco provável · e) provável</>}
        gabaritoEN={[
          "a) Unlikely, because many people buy raffle tickets and only a few win.",
          "b) Likely, because most students in Year 5 are 10 years old.",
          "c) Likely (or unlikely), because it depends on the weather forecast.",
          "d) Unlikely, because many teams play and only one team wins.",
          "e) Likely, because we usually have math homework on Wednesdays.",
        ]}
      />

      {/* 9 ---------------------------------------------------------------- */}
      <Cartao n={9}
        enunciado={<><p>Calculate the numbers below. What strategies did you use? Show your work.</p><div className="k-resumo-grid">{d.triplos.map((t, i) => <span key={i}><b>{letra(i)})</b> {t.join(" × ")}</span>)}</div></>}
        traducao={<>Calcule as contas abaixo. Quais estratégias você usou? Mostre como fez.</>}
        resolucao={<><p>Estratégia: a ordem dos fatores não muda o resultado. Multiplique primeiro os números que formam <b>10, 100 ou 1000</b> (2 × 5, 2 × 50, 4 × 25, 5 × 20, 2 × 500).</p>
          <ul className="k-list">{d.triplos.map((t, i) => <li key={i}><b>{letra(i)})</b> {t.join(" × ")}: {estrategia(t).pt}</li>)}</ul></>}
        gabaritoPT={<ul className="k-list">{d.triplos.map((t, i) => <li key={i}>{letra(i)}) {t.join(" × ")} = <b>{t.reduce((s, x) => s * x, 1)}</b></li>)}</ul>}
        gabaritoEN={d.triplos.map((t, i) => `${letra(i)}) ${estrategia(t).en}`)}
      />

      <div className="k-actions k-center"><button className="k-btn" onClick={() => { setVersao((v) => v + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}><RefreshCw size={15} /> Gerar outros números</button></div>
    </div>
  );
}
