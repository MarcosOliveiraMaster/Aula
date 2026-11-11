// Simuladores de Ciências: máquinas simples e tempo/clima (SVG + framer-motion).
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Say } from "./ui";

/* ------------------------------------ util ------------------------------------ */

function Medidor({ rotulo, valor, max, cor, unidade = "kg" }: { rotulo: string; valor: number; max: number; cor: string; unidade?: string }) {
  return (
    <div className="k-gauge">
      <div className="k-gauge-label"><span>{rotulo}</span><b>{Math.round(valor)} {unidade}</b></div>
      <div className="k-gauge-track"><motion.i animate={{ width: `${Math.min(100, (valor / max) * 100)}%` }} style={{ background: cor }} /></div>
    </div>
  );
}

/* ============================ 1. Plano inclinado (rampa) ============================ */

export function SimRampa() {
  const [angulo, setAngulo] = useState(30);
  const [empurrar, setEmpurrar] = useState(0);
  const peso = 50;
  const altura = 1;
  const rad = (angulo * Math.PI) / 180;
  const forca = peso * Math.sin(rad);
  const distancia = altura / Math.sin(rad);
  // desenho: rampa sobe até y=60 a partir de y=200
  const h = 140;
  const base = Math.min(440, h / Math.tan(rad));
  const x0 = 520 - base;
  const t = empurrar / 100;
  const bx = x0 + base * t;
  const by = 200 - h * t;

  return (
    <figure className="k-vis">
      <svg viewBox="0 0 600 230" className="k-vis-svg" role="img" aria-label={`Rampa com ${angulo} graus`}>
        <rect x="0" y="200" width="600" height="30" fill="#e8dcc6" />
        <rect x="520" y="60" width="70" height="140" fill="#9fb7cf" />
        <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="800" fill="#2b3a4a">🚚 caminhão</text>
        <polygon points={`${x0},200 520,200 520,60`} fill="#d9a066" stroke="#a8743f" strokeWidth="3" />
        <g transform={`translate(${bx} ${by}) rotate(${-angulo})`}>
          <rect x="-22" y="-40" width="44" height="40" rx="5" fill="#8b5a2b" stroke="#5e3a17" strokeWidth="3" />
          <text x="0" y="-15" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">50 kg</text>
        </g>
        <text x={x0 + 40} y="192" fontSize="15" fontWeight="900" fill="#5e3a17">{angulo}°</text>
      </svg>
      <div className="k-sim-controls">
        <label>Inclinação da rampa: <b>{angulo}°</b>
          <input type="range" min={10} max={70} value={angulo} onChange={(e) => { setAngulo(+e.target.value); setEmpurrar(0); }} />
        </label>
        <label>Empurrar a caixa: <b>{empurrar}%</b>
          <input type="range" min={0} max={100} value={empurrar} onChange={(e) => setEmpurrar(+e.target.value)} />
        </label>
      </div>
      <div className="k-gauges">
        <Medidor rotulo="Força para empurrar" valor={forca} max={peso} cor="#e0573f" />
        <Medidor rotulo="Caminho percorrido" valor={distancia} max={6} cor="#3d82d6" unidade="m" />
      </div>
      <figcaption>Rampa <b>deitada</b> = <b>menos força</b>, mas um caminho <b>mais longo</b>. Rampa <b>em pé</b> = caminho curto, mas muita força. Sem rampa, você teria que levantar os 50 kg inteiros!</figcaption>
    </figure>
  );
}

/* ================================== 2. Alavanca ================================== */

const classes = [
  { id: 1, nome: "1ª classe", en: "First class lever", meio: "Fulcro (ponto de apoio)", exemplos: "gangorra, tesoura, alicate, pé de cabra" },
  { id: 2, nome: "2ª classe", en: "Second class lever", meio: "Carga", exemplos: "carrinho de mão, quebra-nozes, abridor de garrafa" },
  { id: 3, nome: "3ª classe", en: "Third class lever", meio: "Esforço (força)", exemplos: "vassoura, vara de pescar, pinça, taco de beisebol" },
];

export function SimAlavanca() {
  const [classe, setClasse] = useState(1);
  const [pos, setPos] = useState(50);
  const [empurrou, setEmpurrou] = useState(false);
  const carga = 60;
  const X0 = 60, X1 = 540, Y = 150;
  const L = X1 - X0;
  // posições (em px) de fulcro, carga e esforço conforme a classe
  let xf: number, xc: number, xe: number;
  if (classe === 1) { xc = X0; xe = X1; xf = X0 + (L * pos) / 100; }
  else if (classe === 2) { xf = X0; xe = X1; xc = X0 + (L * pos) / 100; }
  else { xf = X0; xc = X1; xe = X0 + (L * pos) / 100; }
  const dc = Math.abs(xc - xf);
  const de = Math.max(1, Math.abs(xe - xf));
  const forca = (carga * dc) / de;
  const c = classes[classe - 1];
  // inclinação ao empurrar: a carga sobe
  const giro = empurrou ? (classe === 1 ? 10 : -8) : 0;

  return (
    <figure className="k-vis">
      <div className="k-toggle wrap" role="group" aria-label="Classe da alavanca">
        {classes.map((x) => <button key={x.id} className={x.id === classe ? "on" : ""} onClick={() => { setClasse(x.id); setPos(50); setEmpurrou(false); }}>{x.nome}</button>)}
      </div>
      <svg viewBox="0 0 600 240" className="k-vis-svg" role="img" aria-label={`Alavanca de ${c.nome}: no meio fica ${c.meio}`}>
        <rect x="0" y="205" width="600" height="35" fill="#eadfca" />
        <polygon points={`${xf - 26},205 ${xf + 26},205 ${xf},${Y + 8}`} fill="#7a5ad6" />
        <text x={xf} y="228" textAnchor="middle" fontSize="13" fontWeight="900" fill="#4f35a8">fulcro</text>
        <motion.g animate={{ rotate: giro }} style={{ originX: `${xf}px`, originY: `${Y}px` }} transition={{ type: "spring", stiffness: 80, damping: 12 }}>
          <rect x={X0 - 10} y={Y - 6} width={L + 20} height="12" rx="6" fill="#c98a4b" />
          <rect x={xc - 26} y={Y - 58} width="52" height="52" rx="6" fill="#8b5a2b" />
          <text x={xc} y={Y - 27} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">60 kg</text>
          <text x={xc} y={Y - 66} textAnchor="middle" fontSize="12" fontWeight="900" fill="#5e3a17">carga</text>
          <g>
            <line x1={xe} y1={classe === 1 ? Y - 70 : Y + 52} x2={xe} y2={classe === 1 ? Y - 10 : Y + 10} stroke="#e0573f" strokeWidth="6" strokeLinecap="round" />
            <polygon points={classe === 1 ? `${xe - 10},${Y - 20} ${xe + 10},${Y - 20} ${xe},${Y - 6}` : `${xe - 10},${Y + 20} ${xe + 10},${Y + 20} ${xe},${Y + 6}`} fill="#e0573f" />
            <text x={xe} y={classe === 1 ? Y - 78 : Y + 68} textAnchor="middle" fontSize="12" fontWeight="900" fill="#a4351f">esforço</text>
          </g>
        </motion.g>
      </svg>
      <div className="k-sim-controls">
        <label>{classe === 1 ? "Posição do fulcro" : classe === 2 ? "Posição da carga" : "Posição da mão (esforço)"}: <b>{pos}%</b>
          <input type="range" min={10} max={90} value={pos} onChange={(e) => { setPos(+e.target.value); setEmpurrou(false); }} />
        </label>
        <button className="k-btn" onClick={() => setEmpurrou(!empurrou)}>{empurrou ? "↺ Soltar" : "💪 Fazer força"}</button>
      </div>
      <div className="k-gauges">
        <Medidor rotulo="Força que você precisa fazer" valor={forca} max={180} cor={forca < carga ? "#2aa26f" : "#e0573f"} />
      </div>
      <div className="k-vis-panel">
        <div>
          <b>{c.nome} · <span lang="en">{c.en}</span> <Say text={c.en} /></b>
          <p>No <b>meio</b> fica: <b>{c.meio}</b>. Exemplos: {c.exemplos}.</p>
          <p>{forca < carga - 1 ? `✅ Você faz menos força (${Math.round(forca)} kg) do que o peso da carga (60 kg)!` : forca > carga + 1 ? `⚠️ Aqui você faz mais força (${Math.round(forca)} kg), mas ganha velocidade e alcance no movimento.` : "⚖️ A força é igual ao peso da carga."}</p>
        </div>
      </div>
      <figcaption>Mova o controle e veja: quanto mais <b>longe do fulcro</b> você faz força, <b>menos força</b> precisa.</figcaption>
    </figure>
  );
}

/* ================================ 3. Roda e eixo ================================ */

export function SimRodaEixo() {
  const [raio, setRaio] = useState(80);
  const [voltas, setVoltas] = useState(0);
  const reduce = useReducedMotion();
  const eixo = 20;
  const carga = 40;
  const forca = (carga * eixo) / raio;
  const subida = Math.min(110, voltas * 2 * Math.PI * eixo * 0.18);

  return (
    <figure className="k-vis">
      <svg viewBox="0 0 600 260" className="k-vis-svg" role="img" aria-label="Roda grande presa a um eixo pequeno que enrola a corda e levanta um balde">
        <rect x="0" y="0" width="600" height="260" fill="#f2f7fd" />
        <rect x="140" y="20" width="16" height="230" fill="#8a6a3d" />
        <rect x="380" y="20" width="16" height="230" fill="#8a6a3d" />
        <rect x="0" y="240" width="600" height="20" fill="#9bd17e" />
        <motion.g animate={{ rotate: reduce ? 0 : voltas * 360 }} transition={{ duration: 1.2, ease: "easeInOut" }} style={{ originX: "268px", originY: "80px" }}>
          <circle cx="268" cy="80" r={raio * 0.7} fill="none" stroke="#3d82d6" strokeWidth="10" />
          {[0, 60, 120].map((a) => (
            <line key={a} x1={268 - Math.cos((a * Math.PI) / 180) * raio * 0.7} y1={80 - Math.sin((a * Math.PI) / 180) * raio * 0.7} x2={268 + Math.cos((a * Math.PI) / 180) * raio * 0.7} y2={80 + Math.sin((a * Math.PI) / 180) * raio * 0.7} stroke="#3d82d6" strokeWidth="5" />
          ))}
          <circle cx="268" cy="80" r={eixo * 0.7} fill="#555" />
          <circle cx={268 + raio * 0.7} cy="80" r="9" fill="#e0573f" />
        </motion.g>
        <line x1={268 + eixo * 0.7} y1="80" x2={268 + eixo * 0.7} y2={190 - subida} stroke="#6b4a2b" strokeWidth="3" />
        <g transform={`translate(${268 + eixo * 0.7} ${190 - subida})`}>
          <path d="M-22 0 H22 L16 40 H-16 Z" fill="#9aa7b4" stroke="#55606b" strokeWidth="3" />
          <text x="0" y="26" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">40 kg</text>
        </g>
        <text x="268" y={80 - raio * 0.7 - 10} textAnchor="middle" fontSize="13" fontWeight="900" fill="#205c99">roda (wheel)</text>
        <text x="200" y="125" textAnchor="middle" fontSize="12" fontWeight="900" fill="#333">eixo (axle)</text>
      </svg>
      <div className="k-sim-controls">
        <label>Tamanho da roda: <b>{raio} cm</b>
          <input type="range" min={30} max={100} value={raio} onChange={(e) => setRaio(+e.target.value)} />
        </label>
        <button className="k-btn" onClick={() => setVoltas((v) => (subida >= 110 ? 0 : v + 1))}>{subida >= 110 ? "↺ Descer o balde" : "🔄 Girar a roda"}</button>
      </div>
      <div className="k-gauges">
        <Medidor rotulo="Força na roda" valor={forca} max={carga} cor="#2aa26f" />
      </div>
      <figcaption>A <b>roda grande</b> gira junto com o <b>eixo pequeno</b>. Girando a roda, você usa <b>menos força</b> para levantar o balde. Quanto <b>maior a roda</b>, mais fácil!</figcaption>
    </figure>
  );
}

/* ==================================== 4. Polias ==================================== */

const modos = [
  { id: "nenhuma", nome: "Sem polia", cordas: 1, dir: "para cima ⬆️", texto: "Você levanta o peso inteiro, puxando para cima. Cansativo!" },
  { id: "fixa", nome: "Polia fixa", cordas: 1, dir: "para baixo ⬇️", texto: "A polia fica presa no lugar. A força é a mesma, mas você puxa para BAIXO, o que é mais fácil: muda a direção da força." },
  { id: "movel", nome: "Polia móvel", cordas: 2, dir: "para cima ⬆️", texto: "A polia sobe junto com a carga. Duas partes da corda seguram o peso, então você faz metade da força." },
  { id: "composta", nome: "Polias combinadas", cordas: 4, dir: "para baixo ⬇️", texto: "Várias polias juntas (fixas + móveis). Quatro partes da corda seguram o peso: você faz só um quarto da força!" },
];

export function SimPolia() {
  const [modo, setModo] = useState(1);
  const [puxar, setPuxar] = useState(0);
  const m = modos[modo];
  const carga = 80;
  const forca = carga / m.cordas;
  const sobe = (puxar / 100) * 90;
  const corda = sobe * m.cordas;
  const yCarga = 200 - sobe;

  return (
    <figure className="k-vis">
      <div className="k-toggle wrap" role="group" aria-label="Tipo de polia">
        {modos.map((x, i) => <button key={x.id} className={i === modo ? "on" : ""} onClick={() => { setModo(i); setPuxar(0); }}>{x.nome}</button>)}
      </div>
      <svg viewBox="0 0 600 270" className="k-vis-svg" role="img" aria-label={`${m.nome}: ${m.cordas} partes da corda seguram a carga`}>
        <rect x="0" y="0" width="600" height="270" fill="#f6f3ff" />
        <rect x="120" y="14" width="360" height="12" fill="#8a6a3d" />
        <rect x="0" y="252" width="600" height="18" fill="#eadfca" />
        {/* carga */}
        <g transform={`translate(260 ${yCarga})`}>
          <rect x="-30" y="0" width="60" height="44" rx="6" fill="#8b5a2b" />
          <text x="0" y="27" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">80 kg</text>
        </g>
        {m.id === "nenhuma" && (
          <>
            <line x1="260" y1={yCarga} x2="260" y2={yCarga - 60} stroke="#6b4a2b" strokeWidth="3" />
            <text x="260" y={yCarga - 66} textAnchor="middle" fontSize="24">🧒</text>
          </>
        )}
        {m.id === "fixa" && (
          <>
            <line x1="260" y1="26" x2="260" y2="44" stroke="#555" strokeWidth="4" />
            <circle cx="275" cy="58" r="16" fill="#fff" stroke="#3d82d6" strokeWidth="6" />
            <line x1="259" y1="58" x2="259" y2={yCarga} stroke="#6b4a2b" strokeWidth="3" />
            <line x1="291" y1="58" x2="291" y2={150 + sobe} stroke="#6b4a2b" strokeWidth="3" />
            <text x="291" y={176 + sobe} textAnchor="middle" fontSize="26">✊</text>
          </>
        )}
        {m.id === "movel" && (
          <>
            <circle cx="260" cy={yCarga - 18} r="16" fill="#fff" stroke="#2aa26f" strokeWidth="6" />
            <line x1="244" y1="26" x2="244" y2={yCarga - 18} stroke="#6b4a2b" strokeWidth="3" />
            <line x1="276" y1={yCarga - 18} x2="276" y2={60 - corda / 6} stroke="#6b4a2b" strokeWidth="3" />
            <text x="290" y={58 - corda / 6} fontSize="24">✊</text>
          </>
        )}
        {m.id === "composta" && (
          <>
            <circle cx="245" cy="48" r="14" fill="#fff" stroke="#3d82d6" strokeWidth="5" />
            <circle cx="278" cy="48" r="14" fill="#fff" stroke="#3d82d6" strokeWidth="5" />
            <circle cx="245" cy={yCarga - 16} r="14" fill="#fff" stroke="#2aa26f" strokeWidth="5" />
            <circle cx="278" cy={yCarga - 16} r="14" fill="#fff" stroke="#2aa26f" strokeWidth="5" />
            {[231, 259, 264, 292].map((x, i) => <line key={i} x1={x} y1="48" x2={x} y2={yCarga - 16} stroke="#6b4a2b" strokeWidth="3" />)}
            <line x1="292" y1="48" x2="330" y2="48" stroke="#6b4a2b" strokeWidth="3" />
            <line x1="330" y1="48" x2="330" y2={140 + Math.min(80, corda / 4)} stroke="#6b4a2b" strokeWidth="3" />
            <text x="330" y={166 + Math.min(80, corda / 4)} textAnchor="middle" fontSize="26">✊</text>
          </>
        )}
        <text x="470" y="80" textAnchor="middle" fontSize="14" fontWeight="900" fill="#4f35a8">{m.cordas} {m.cordas === 1 ? "corda segura" : "cordas seguram"}</text>
        <text x="470" y="100" textAnchor="middle" fontSize="14" fontWeight="900" fill="#4f35a8">o peso</text>
        <text x="470" y="140" textAnchor="middle" fontSize="13" fontWeight="800" fill="#a4351f">Puxar {m.dir}</text>
      </svg>
      <div className="k-sim-controls">
        <label>Puxe a corda: <b>{puxar}%</b>
          <input type="range" min={0} max={100} value={puxar} onChange={(e) => setPuxar(+e.target.value)} />
        </label>
      </div>
      <div className="k-gauges">
        <Medidor rotulo="Força que você faz" valor={forca} max={carga} cor="#2aa26f" />
        <Medidor rotulo="Corda que você puxa" valor={(corda / 90) * 1} max={4} cor="#3d82d6" unidade="m" />
      </div>
      <div className="k-vis-panel"><div><b>{m.nome}</b><p>{m.texto}</p></div></div>
      <figcaption>Repare na troca: com mais polias você faz <b>menos força</b>, mas precisa puxar <b>mais corda</b>.</figcaption>
    </figure>
  );
}

/* ================================ 5. O Sol aquece a Terra ================================ */

export function SimSol() {
  const [hora, setHora] = useState(12);
  const [nuvens, setNuvens] = useState(false);
  const reduce = useReducedMotion();
  const dia = hora >= 6 && hora <= 18;
  const ang = ((hora - 6) / 12) * Math.PI; // 0 = nascer, PI = pôr
  const sx = 300 - Math.cos(ang) * 240;
  const sy = 190 - Math.sin(ang) * 150;
  const intensidade = dia ? Math.sin(ang) * (nuvens ? 0.45 : 1) : 0;
  // terra aquece mais rápido que a água
  const tTerra = 18 + intensidade * 17;
  const tAgua = 20 + intensidade * 6;
  const tAr = 18 + intensidade * 12;

  return (
    <figure className="k-vis">
      <svg viewBox="0 0 600 260" className="k-vis-svg" role="img" aria-label={`Às ${hora} horas: terra ${Math.round(tTerra)} graus, água ${Math.round(tAgua)} graus`}>
        <defs>
          <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={dia ? "#7cc4ff" : "#1b2547"} />
            <stop offset="1" stopColor={dia ? "#dff1ff" : "#3a4775"} />
          </linearGradient>
        </defs>
        <rect width="600" height="200" fill="url(#ceu)" />
        {dia && <circle cx={sx} cy={sy} r="26" fill="#ffd23f" stroke="#ffb100" strokeWidth="5" />}
        {!dia && <text x="480" y="60" fontSize="34">🌙</text>}
        {dia && !reduce && [0, 1, 2, 3].map((i) => (
          <motion.line key={i} x1={sx} y1={sy} x2={i < 2 ? 150 + i * 40 : 400 + (i - 2) * 50} y2="200" stroke="#ffd23f" strokeWidth="3" strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} opacity={intensidade} />
        ))}
        {nuvens && <g opacity="0.95"><ellipse cx="300" cy="70" rx="80" ry="26" fill="#eef1f5" /><ellipse cx="260" cy="60" rx="40" ry="24" fill="#f6f8fa" /><ellipse cx="340" cy="58" rx="44" ry="26" fill="#f6f8fa" /></g>}
        <rect x="0" y="200" width="300" height="60" fill="#b07a45" />
        <rect x="300" y="200" width="300" height="60" fill="#3d8bd6" />
        <text x="150" y="236" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">🏜️ Terra {Math.round(tTerra)}°C</text>
        <text x="450" y="236" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">🌊 Água {Math.round(tAgua)}°C</text>
      </svg>
      <div className="k-sim-controls">
        <label>Hora do dia: <b>{hora}h</b>
          <input type="range" min={4} max={20} value={hora} onChange={(e) => setHora(+e.target.value)} />
        </label>
        <button className={`k-btn ${nuvens ? "" : "ghost"}`} onClick={() => setNuvens(!nuvens)}>☁️ {nuvens ? "Tirar as nuvens" : "Colocar nuvens"}</button>
      </div>
      <div className="k-gauges">
        <Medidor rotulo="🌡️ Temperatura do ar" valor={tAr} max={40} cor="#e0573f" unidade="°C" />
      </div>
      <figcaption>O <b>Sol</b> aquece a Terra. Ao meio-dia, os raios chegam mais <b>diretos</b> e esquentam mais. A <b>terra</b> esquenta (e esfria) mais rápido que a <b>água</b>. As <b>nuvens</b> bloqueiam parte da luz do Sol.</figcaption>
    </figure>
  );
}

/* =========================== 6. Como a nuvem se forma =========================== */

const etapasNuvem = [
  { nome: "Evaporação", en: "Evaporation", texto: "O Sol aquece a água dos rios, mares e lagos. A água vira vapor e sobe para o céu." },
  { nome: "Condensação", en: "Condensation", texto: "Lá em cima o ar é frio. O vapor esfria e vira gotinhas minúsculas de água (ou cristais de gelo). Juntas, elas formam a nuvem!" },
  { nome: "Precipitação", en: "Precipitation", texto: "Quando as gotinhas se juntam e ficam pesadas, caem como chuva, granizo ou neve." },
  { nome: "Coleta", en: "Collection", texto: "A água volta para rios, mares e lagos, e o ciclo começa de novo." },
];

export function SimNuvem() {
  const [etapa, setEtapa] = useState(0);
  const reduce = useReducedMotion();
  const e = etapasNuvem[etapa];
  const nuvemTam = etapa === 0 ? 0.3 : etapa === 1 ? 1 : etapa === 2 ? 1.1 : 0.5;
  return (
    <figure className="k-vis">
      <svg viewBox="0 0 600 250" className="k-vis-svg" role="img" aria-label={`Ciclo da água: ${e.nome}`}>
        <rect width="600" height="250" fill="#e6f3ff" />
        <circle cx="70" cy="50" r="28" fill="#ffd23f" />
        <rect x="0" y="200" width="600" height="50" fill="#3d8bd6" />
        <path d="M0 200 Q150 170 300 200" fill="#9bd17e" />
        <motion.g animate={{ scale: nuvemTam }} style={{ originX: "360px", originY: "70px" }} transition={{ duration: 0.8 }}>
          <ellipse cx="360" cy="72" rx="90" ry="30" fill={etapa === 2 ? "#9aa7b4" : "#fff"} />
          <ellipse cx="320" cy="58" rx="45" ry="30" fill={etapa === 2 ? "#a9b4bf" : "#fff"} />
          <ellipse cx="395" cy="55" rx="50" ry="32" fill={etapa === 2 ? "#a9b4bf" : "#fff"} />
        </motion.g>
        {etapa === 0 && !reduce && [0, 1, 2, 3, 4].map((i) => (
          <motion.text key={i} x={300 + i * 30} fontSize="18" fill="#3d82d6" animate={{ y: [200, 110], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}>〰</motion.text>
        ))}
        {etapa === 1 && !reduce && [0, 1, 2, 3, 4, 5].map((i) => (
          <motion.circle key={i} cx={310 + i * 20} r="4" fill="#7cc4ff" animate={{ cy: [120, 80], opacity: [1, 0] }} transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity }} />
        ))}
        {etapa === 2 && !reduce && [0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.line key={i} x1={300 + i * 18} x2={296 + i * 18} stroke="#3d82d6" strokeWidth="3" strokeLinecap="round" animate={{ y1: [100, 190], y2: [112, 202], opacity: [1, 0.2] }} transition={{ duration: 0.9, delay: i * 0.13, repeat: Infinity }} />
        ))}
        {etapa === 3 && !reduce && (
          <motion.path d="M120 205 Q200 215 300 205" stroke="#fff" strokeWidth="4" fill="none" animate={{ pathLength: [0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        )}
      </svg>
      <div className="k-toggle wrap" role="group" aria-label="Etapas">
        {etapasNuvem.map((x, i) => <button key={x.nome} className={i === etapa ? "on" : ""} onClick={() => setEtapa(i)}>{i + 1}. {x.nome}</button>)}
      </div>
      <div className="k-vis-panel">
        <AnimatePresence mode="wait">
          <motion.div key={etapa} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <b>{e.nome} · <span lang="en">{e.en}</span> <Say text={e.en} /></b>
            <p>{e.texto}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}

/* ============================ 7. Tipos de nuvem (altura) ============================ */

const tiposNuvem = [
  { id: "cirrus", nome: "Cirrus", alt: "Altas", y: 40, pt: "Finas e brancas, parecem penas ou fios de cabelo. São feitas de cristais de gelo, bem lá no alto. Indicam tempo bom (mas o tempo pode mudar).", en: "High, thin and wispy clouds made of ice crystals. They look like feathers." },
  { id: "cumulus", nome: "Cumulus", alt: "Médias / baixas", y: 115, pt: "Brancas e fofas, parecem bolas de algodão ou couve-flor. Aparecem em dias de sol. Se crescerem muito, viram cumulonimbus, que trazem tempestades!", en: "Puffy, white clouds that look like cotton balls. They usually mean fair weather." },
  { id: "stratus", nome: "Stratus", alt: "Baixas", y: 180, pt: "Cinzentas e baixas, cobrem o céu como um cobertor. Podem trazer garoa (chuva fina). A neblina é um stratus bem perto do chão.", en: "Low, gray clouds that cover the whole sky like a blanket. They can bring drizzle." },
];

function NuvemDesenho({ tipo, x, y }: { tipo: string; x: number; y: number }) {
  if (tipo === "cirrus") return <g stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round">{[0, 1, 2].map((i) => <path key={i} d={`M${x - 70 + i * 10} ${y + i * 12} q40 -18 90 -6 q20 4 40 -10`} />)}</g>;
  if (tipo === "cumulus") return <g fill="#fff"><ellipse cx={x} cy={y + 10} rx="70" ry="22" /><circle cx={x - 30} cy={y - 4} r="24" /><circle cx={x + 6} cy={y - 16} r="30" /><circle cx={x + 40} cy={y} r="22" /></g>;
  return <rect x={x - 250} y={y - 12} width="500" height="26" rx="13" fill="#b9c3cd" />;
}

export function SimTiposNuvem() {
  const [sel, setSel] = useState(1);
  const t = tiposNuvem[sel];
  return (
    <figure className="k-vis">
      <svg viewBox="0 0 600 240" className="k-vis-svg" role="img" aria-label="Altura dos tipos de nuvem">
        <rect width="600" height="240" fill="#8cc8f5" />
        <rect y="210" width="600" height="30" fill="#7fbf6a" />
        {tiposNuvem.map((n, i) => (
          <g key={n.id} onClick={() => setSel(i)} style={{ cursor: "pointer" }} opacity={i === sel ? 1 : 0.55}>
            <NuvemDesenho tipo={n.id} x={i === 2 ? 300 : 160 + i * 220} y={n.y} />
            <text x={i === 2 ? 540 : 160 + i * 220 + 90} y={n.y + 4} fontSize="14" fontWeight="900" fill="#123">{n.nome}</text>
          </g>
        ))}
        <text x="8" y="22" fontSize="12" fontWeight="800" fill="#123">⬆ alto</text>
        <text x="8" y="204" fontSize="12" fontWeight="800" fill="#123">⬇ baixo</text>
      </svg>
      <div className="k-toggle wrap" role="group" aria-label="Tipos de nuvem">
        {tiposNuvem.map((n, i) => <button key={n.id} className={i === sel ? "on" : ""} onClick={() => setSel(i)}>☁️ {n.nome}</button>)}
      </div>
      <div className="k-vis-panel">
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <b>{t.nome} — nuvens {t.alt.toLowerCase()}</b>
            <p>🇧🇷 {t.pt}</p>
            <p lang="en">🇬🇧 {t.en} <Say text={`${t.nome}. ${t.en}`} /></p>
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}

/* ======================== 8. Ferramentas para prever o tempo ======================== */

const ferramentas = [
  { id: "termometro", nome: "Termômetro", en: "Thermometer", emoji: "🌡️", mede: "a temperatura (se está quente ou frio)" },
  { id: "anemometro", nome: "Anemômetro", en: "Anemometer", emoji: "🌬️", mede: "a velocidade do vento" },
  { id: "pluviometro", nome: "Pluviômetro", en: "Rain gauge", emoji: "🌧️", mede: "quanta chuva caiu" },
  { id: "barometro", nome: "Barômetro", en: "Barometer", emoji: "🧭", mede: "a pressão do ar (se ela cai, pode vir chuva)" },
  { id: "balao", nome: "Balão meteorológico", en: "Weather balloon", emoji: "🎈", mede: "temperatura, umidade e vento lá no alto do céu" },
  { id: "radar", nome: "Radar meteorológico", en: "Weather radar", emoji: "📡", mede: "onde está chovendo ou caindo granizo agora (mapa colorido)" },
  { id: "satelite", nome: "Satélite meteorológico", en: "Weather satellite", emoji: "🛰️", mede: "fotos das nuvens e tempestades vistas do espaço" },
];

function AnimFerramenta({ id }: { id: string }) {
  const reduce = useReducedMotion();
  const loop = reduce ? 0 : Infinity;
  if (id === "termometro") return (
    <svg viewBox="0 0 200 140"><rect x="90" y="10" width="20" height="100" rx="10" fill="#fff" stroke="#999" strokeWidth="3" /><circle cx="100" cy="115" r="16" fill="#e0573f" />
      <motion.rect x="95" width="10" fill="#e0573f" animate={{ y: [90, 30, 90], height: [25, 85, 25] }} transition={{ duration: 3, repeat: loop }} /></svg>
  );
  if (id === "anemometro") return (
    <svg viewBox="0 0 200 140"><line x1="100" y1="70" x2="100" y2="135" stroke="#555" strokeWidth="5" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 1, repeat: loop, ease: "linear" }} style={{ originX: "100px", originY: "70px" }}>
        {[0, 120, 240].map((a) => { const x = 100 + Math.cos((a * Math.PI) / 180) * 45; const y = 70 + Math.sin((a * Math.PI) / 180) * 45; return <g key={a}><line x1="100" y1="70" x2={x} y2={y} stroke="#555" strokeWidth="4" /><circle cx={x} cy={y} r="11" fill="#3d82d6" /></g>; })}
      </motion.g></svg>
  );
  if (id === "pluviometro") return (
    <svg viewBox="0 0 200 140"><path d="M70 20 H130 L120 40 V130 H80 V40 Z" fill="#e8f3ff" stroke="#3d82d6" strokeWidth="3" />
      <motion.rect x="82" width="36" fill="#7cc4ff" animate={{ y: [128, 60, 128], height: [2, 70, 2] }} transition={{ duration: 4, repeat: loop }} />
      {[0, 1, 2].map((i) => <motion.line key={i} x1={90 + i * 10} x2={90 + i * 10} stroke="#3d82d6" strokeWidth="3" animate={{ y1: [0, 30], y2: [8, 38] }} transition={{ duration: 0.6, delay: i * 0.2, repeat: loop }} />)}</svg>
  );
  if (id === "barometro") return (
    <svg viewBox="0 0 200 140"><circle cx="100" cy="72" r="55" fill="#fff" stroke="#8a6a3d" strokeWidth="6" />
      <text x="62" y="60" fontSize="11" fontWeight="900">chuva</text><text x="112" y="60" fontSize="11" fontWeight="900">sol</text>
      <motion.line x1="100" y1="72" x2="100" y2="30" stroke="#e0573f" strokeWidth="4" strokeLinecap="round" animate={{ rotate: [-40, 40, -40] }} transition={{ duration: 4, repeat: loop }} style={{ originX: "100px", originY: "72px" }} /></svg>
  );
  if (id === "balao") return (
    <svg viewBox="0 0 200 140"><rect width="200" height="140" fill="#dff1ff" />
      <motion.g animate={{ y: [100, -10] }} transition={{ duration: 4, repeat: loop }}><ellipse cx="100" cy="30" rx="18" ry="22" fill="#e0573f" /><line x1="100" y1="52" x2="100" y2="66" stroke="#555" strokeWidth="2" /><rect x="94" y="66" width="12" height="9" fill="#555" /></motion.g>
      <text x="150" y="20" fontSize="11" fontWeight="900">-50°C</text><text x="150" y="130" fontSize="11" fontWeight="900">25°C</text></svg>
  );
  if (id === "radar") return (
    <svg viewBox="0 0 200 140"><rect width="200" height="140" fill="#1d2a1f" /><circle cx="100" cy="70" r="60" fill="none" stroke="#3c6" strokeWidth="1.5" /><circle cx="100" cy="70" r="35" fill="none" stroke="#3c6" strokeWidth="1" />
      <ellipse cx="70" cy="50" rx="18" ry="12" fill="#2aa26f" opacity=".8" /><ellipse cx="75" cy="52" rx="8" ry="6" fill="#f7d257" /><ellipse cx="130" cy="90" rx="14" ry="9" fill="#e0573f" opacity=".85" />
      <motion.line x1="100" y1="70" x2="100" y2="10" stroke="#7f7" strokeWidth="3" animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: loop, ease: "linear" }} style={{ originX: "100px", originY: "70px" }} /></svg>
  );
  return (
    <svg viewBox="0 0 200 140"><rect width="200" height="140" fill="#0d1530" /><circle cx="100" cy="80" r="40" fill="#3d82d6" /><ellipse cx="90" cy="70" rx="16" ry="8" fill="#fff" opacity=".9" /><ellipse cx="115" cy="92" rx="12" ry="6" fill="#fff" opacity=".8" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 6, repeat: loop, ease: "linear" }} style={{ originX: "100px", originY: "80px" }}><text x="100" y="22" textAnchor="middle" fontSize="20">🛰️</text></motion.g></svg>
  );
}

export function SimFerramentasTempo() {
  const [sel, setSel] = useState(4);
  const f = ferramentas[sel];
  return (
    <figure className="k-vis">
      <div className="k-tools">
        {ferramentas.map((x, i) => (
          <button key={x.id} className={`k-tool ${i === sel ? "on" : ""}`} onClick={() => setSel(i)}>
            <span>{x.emoji}</span>
            <small>{x.nome}</small>
          </button>
        ))}
      </div>
      <div className="k-tool-panel">
        <div className="k-tool-anim"><AnimFerramenta id={f.id} /></div>
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <b>{f.emoji} {f.nome}</b>
            <p lang="en">🇬🇧 <b>{f.en}</b> <Say text={f.en} /></p>
            <p>Mede ou mostra: <b>{f.mede}</b>.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}

/* ============================ 9. Seja o meteorologista ============================ */

const casosPrevisao = [
  { pistas: ["☀️ Céu com nuvens cumulus pequenas", "🧭 Pressão do ar alta e estável", "🌬️ Vento fraco"], certa: "sol", porque: "Pressão alta, vento fraco e cumulus pequenas indicam tempo bom." },
  { pistas: ["☁️ Nuvens cumulonimbus enormes e escuras", "🧭 Pressão do ar caindo rápido", "📡 Radar mostra manchas vermelhas"], certa: "tempestade", porque: "Cumulonimbus, pressão caindo e manchas vermelhas no radar indicam tempestade forte." },
  { pistas: ["☁️ Céu todo coberto por nuvens stratus cinzentas", "💧 Muita umidade no ar", "🧭 Pressão caindo devagar"], certa: "chuva", porque: "Stratus cobrindo o céu e pressão caindo devagar costumam trazer chuva fraca ou garoa." },
  { pistas: ["🌡️ Termômetro marca -5 °C", "☁️ Nuvens cinzentas", "🛰️ Satélite mostra uma tempestade de inverno chegando"], certa: "neve", porque: "Temperatura abaixo de zero com nuvens de tempestade: vem neve!" },
];
const previsoes = [
  { id: "sol", nome: "☀️ Sol" },
  { id: "chuva", nome: "🌧️ Chuva fraca" },
  { id: "tempestade", nome: "⛈️ Tempestade" },
  { id: "neve", nome: "🌨️ Neve" },
];

export function SejaMeteorologista() {
  const [caso, setCaso] = useState(0);
  const [resp, setResp] = useState<string | null>(null);
  const [pontos, setPontos] = useState(0);
  const c = casosPrevisao[caso];
  const escolher = (id: string) => { if (resp) return; setResp(id); if (id === c.certa) setPontos((p) => p + 1); };
  return (
    <figure className="k-vis">
      <div className="k-game-head"><b>🧑‍🔬 Seja o meteorologista</b><span>Caso {caso + 1}/{casosPrevisao.length} · Acertos: {pontos}</span></div>
      <p className="k-vis-help">Leia as pistas das ferramentas e faça a previsão do tempo para amanhã:</p>
      <ul className="k-clues">{c.pistas.map((p) => <li key={p}>{p}</li>)}</ul>
      <div className="k-toggle wrap">
        {previsoes.map((p) => (
          <button key={p.id} className={resp ? (p.id === c.certa ? "on" : p.id === resp ? "on bad" : "") : ""} onClick={() => escolher(p.id)}>{p.nome}</button>
        ))}
      </div>
      {resp && (
        <div className={`k-feedback ${resp === c.certa ? "right" : "wrong"}`}>
          <strong>{resp === c.certa ? "Previsão certa! 🎉 " : "Quase! "}</strong>{c.porque}
          <div className="k-actions">
            <button className="k-btn" onClick={() => { setCaso((caso + 1) % casosPrevisao.length); setResp(null); if (caso + 1 >= casosPrevisao.length) setPontos(0); }}>{caso + 1 >= casosPrevisao.length ? "Recomeçar" : "Próximo caso ➜"}</button>
          </div>
        </div>
      )}
    </figure>
  );
}

/* =============================== 10. Clima severo =============================== */

const eventosSeveros = [
  { id: "tempestade", nome: "Tempestade", en: "Thunderstorm", emoji: "⛈️", oque: "Chuva forte com raios, trovões e ventos. Nasce das nuvens cumulonimbus.", efeito: "Raios, alagamentos, árvores caídas, falta de luz.", seguranca: "Fique dentro de casa, longe de janelas, e não fique embaixo de árvores." },
  { id: "furacao", nome: "Furacão", en: "Hurricane", emoji: "🌀", oque: "Uma tempestade gigante que gira e se forma sobre o mar quente. Tem um “olho” calmo no centro.", efeito: "Ventos muito fortes, chuva enorme e ondas gigantes que invadem a costa.", seguranca: "Seguir os avisos e sair da região (evacuação) quando as autoridades pedirem." },
  { id: "tornado", nome: "Tornado", en: "Tornado", emoji: "🌪️", oque: "Uma coluna de ar que gira muito rápido, saindo de uma nuvem escura e tocando o chão.", efeito: "Arranca telhados, árvores e levanta objetos e carros.", seguranca: "Ir para o porão ou um cômodo sem janelas no andar mais baixo." },
  { id: "nevasca", nome: "Nevasca", en: "Blizzard", emoji: "🌨️", oque: "Uma grande tempestade de inverno, com neve forte, vento e muito frio.", efeito: "Não dá para enxergar, estradas fechadas, risco de congelamento.", seguranca: "Ficar em casa, bem agasalhado, com comida e água guardadas." },
  { id: "seca", nome: "Seca", en: "Drought", emoji: "🏜️", oque: "Um longo período, de meses, sem chuva.", efeito: "Terra rachada, plantas morrem, falta água para pessoas e animais.", seguranca: "Economizar água e cuidar das nascentes e dos rios." },
  { id: "enchente", nome: "Enchente", en: "Flood", emoji: "🌊", oque: "Quando chove muito e a água transborda dos rios e cobre as ruas.", efeito: "Casas alagadas, doenças, estragos.", seguranca: "Nunca andar ou brincar na água da enchente e ir para lugares altos." },
];

function AnimSevero({ id }: { id: string }) {
  const reduce = useReducedMotion();
  const loop = reduce ? 0 : Infinity;
  if (id === "tornado") return (
    <svg viewBox="0 0 220 150"><rect width="220" height="150" fill="#6b7480" /><ellipse cx="110" cy="20" rx="100" ry="20" fill="#3d4450" />
      <motion.path d="M70 30 L150 30 L122 140 L98 140 Z" fill="#9aa3ad" animate={{ skewX: [-6, 6, -6] }} transition={{ duration: 1.2, repeat: loop }} style={{ originX: "110px", originY: "30px" }} />
      {[0, 1, 2].map((i) => <motion.text key={i} fontSize="14" animate={{ x: [110, 60 + i * 40, 110], y: [140, 60, 140], rotate: [0, 360] }} transition={{ duration: 2 + i * 0.4, repeat: loop }}>{["🏠", "🌳", "🚗"][i]}</motion.text>)}</svg>
  );
  if (id === "furacao") return (
    <svg viewBox="0 0 220 150"><rect width="220" height="150" fill="#1f4f7a" />
      <motion.g animate={{ rotate: -360 }} transition={{ duration: 4, repeat: loop, ease: "linear" }} style={{ originX: "110px", originY: "75px" }}>
        {[0, 90, 180, 270].map((a) => <path key={a} d="M110 75 q40 -10 60 -45" stroke="#e8f1fa" strokeWidth="14" fill="none" strokeLinecap="round" transform={`rotate(${a} 110 75)`} opacity=".9" />)}
      </motion.g><circle cx="110" cy="75" r="10" fill="#1f4f7a" /></svg>
  );
  if (id === "nevasca") return (
    <svg viewBox="0 0 220 150"><rect width="220" height="150" fill="#c9d6e3" /><rect y="125" width="220" height="25" fill="#fff" />
      {Array.from({ length: 14 }, (_, i) => <motion.text key={i} fontSize="14" fill="#fff" animate={{ x: [i * 16, i * 16 + 40], y: [-10, 150] }} transition={{ duration: 1.6 + (i % 4) * 0.3, delay: i * 0.12, repeat: loop }}>❄</motion.text>)}</svg>
  );
  if (id === "seca") return (
    <svg viewBox="0 0 220 150"><rect width="220" height="150" fill="#ffd98a" /><circle cx="180" cy="30" r="20" fill="#ff9f1c" />
      <rect y="100" width="220" height="50" fill="#c89458" /><path d="M20 110 l20 15 l-5 20 M90 105 l10 20 l25 5 M160 112 l-12 18 l20 15" stroke="#7a5230" strokeWidth="3" fill="none" />
      <motion.text x="60" y="98" fontSize="26" animate={{ rotate: [0, -12, 0] }} transition={{ duration: 2, repeat: loop }}>🥀</motion.text></svg>
  );
  if (id === "enchente") return (
    <svg viewBox="0 0 220 150"><rect width="220" height="150" fill="#8aa1b4" /><text x="40" y="95" fontSize="40">🏠</text><text x="130" y="95" fontSize="40">🏠</text>
      <motion.rect x="0" width="220" fill="#3d6f9e" opacity=".85" animate={{ y: [130, 80, 130], height: [20, 70, 20] }} transition={{ duration: 4, repeat: loop }} /></svg>
  );
  return (
    <svg viewBox="0 0 220 150"><rect width="220" height="150" fill="#4a5260" /><ellipse cx="110" cy="35" rx="95" ry="28" fill="#2d333d" />
      <motion.path d="M120 55 L100 90 L115 90 L95 130" stroke="#ffe066" strokeWidth="5" fill="none" animate={{ opacity: [0, 1, 0, 0] }} transition={{ duration: 1.6, repeat: loop }} />
      {Array.from({ length: 10 }, (_, i) => <motion.line key={i} x1={20 + i * 20} x2={16 + i * 20} stroke="#9cc" strokeWidth="2" animate={{ y1: [60, 150], y2: [70, 160] }} transition={{ duration: 0.7, delay: i * 0.07, repeat: loop }} />)}</svg>
  );
}

export function SimClimaSevero() {
  const [sel, setSel] = useState(2);
  const e = eventosSeveros[sel];
  return (
    <figure className="k-vis">
      <div className="k-tools">
        {eventosSeveros.map((x, i) => (
          <button key={x.id} className={`k-tool ${i === sel ? "on" : ""}`} onClick={() => setSel(i)}>
            <span>{x.emoji}</span>
            <small>{x.nome}</small>
          </button>
        ))}
      </div>
      <div className="k-tool-panel">
        <div className="k-tool-anim wide"><AnimSevero id={e.id} /></div>
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="k-severe-text">
            <b>{e.emoji} {e.nome} · <span lang="en">{e.en}</span> <Say text={e.en} /></b>
            <p><b>O que é:</b> {e.oque}</p>
            <p><b>Efeitos:</b> {e.efeito}</p>
            <p><b>🛟 Como se proteger:</b> {e.seguranca}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}

/* ================== 11. Caça-máquinas: encontre as máquinas simples ================== */

const objetosCasa = [
  { e: "🪓", nome: "Machado", maquina: "Cunha" },
  { e: "✂️", nome: "Tesoura", maquina: "Alavanca" },
  { e: "🚲", nome: "Bicicleta", maquina: "Roda e eixo" },
  { e: "🏳️", nome: "Mastro da bandeira", maquina: "Polia" },
  { e: "🛝", nome: "Escorregador", maquina: "Plano inclinado" },
  { e: "🫙", nome: "Tampa de pote", maquina: "Parafuso" },
  { e: "🚪", nome: "Maçaneta", maquina: "Roda e eixo" },
  { e: "🧹", nome: "Vassoura", maquina: "Alavanca" },
  { e: "🔪", nome: "Faca", maquina: "Cunha" },
];

export function CacaMaquinas() {
  const [abertos, setAbertos] = useState<number[]>([]);
  return (
    <figure className="k-vis">
      <p className="k-vis-help">Toque em cada objeto e descubra qual <b>máquina simples</b> ele usa:</p>
      <div className="k-finder">
        {objetosCasa.map((o, i) => {
          const aberto = abertos.includes(i);
          return (
            <motion.button key={o.nome} className={`k-finder-item ${aberto ? "on" : ""}`} onClick={() => setAbertos(aberto ? abertos.filter((x) => x !== i) : [...abertos, i])} whileTap={{ scale: 0.94 }}>
              <span className="k-finder-emoji">{o.e}</span>
              <b>{o.nome}</b>
              <AnimatePresence>{aberto && <motion.small initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>⚙️ {o.maquina}</motion.small>}</AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <figcaption>Encontrou {abertos.length} de {objetosCasa.length}. Máquinas simples estão por toda parte: na cozinha, no parquinho e na escola!</figcaption>
    </figure>
  );
}
