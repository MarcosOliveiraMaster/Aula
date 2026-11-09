// Ilustrações e animações interativas (SVG + framer-motion), sem imagens externas.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Say } from "./ui";

/* =============================== GEOGRAFIA =============================== */

/* ------------------------- 1. Ciclo da água na cidade ------------------------- */

const etapasAgua = [
  { emoji: "🏞️", nome: "Rio ou represa", texto: "A água é retirada de um rio ou de uma represa. Ela ainda não está pronta para beber!", x: 70 },
  { emoji: "🏭", nome: "Estação de tratamento de água", texto: "Aqui a água é limpa: tiram a sujeira, matam os micróbios e ela vira água potável.", x: 215 },
  { emoji: "🏠", nome: "Sua casa", texto: "A água tratada chega pelos canos. Usamos para beber, cozinhar e tomar banho. Depois de usada, ela vira esgoto.", x: 360 },
  { emoji: "⚙️", nome: "Estação de tratamento de esgoto", texto: "O esgoto viaja por outros canos até aqui, onde é limpo de novo antes de voltar para a natureza.", x: 505 },
  { emoji: "🐟", nome: "De volta à natureza", texto: "Tratada, a água volta para o rio sem poluir. Os peixes e as pessoas agradecem!", x: 650 },
];
const canos = ["#3d8bd6", "#3d8bd6", "#8a6a3d", "#2bb3a3"];

export function CicloAgua() {
  const reduce = useReducedMotion();
  const [ativo, setAtivo] = useState(0);
  const [tocando, setTocando] = useState(!reduce);

  useEffect(() => {
    if (!tocando) return;
    const id = window.setInterval(() => setAtivo((a) => (a + 1) % etapasAgua.length), 3200);
    return () => window.clearInterval(id);
  }, [tocando]);

  const etapa = etapasAgua[ativo];
  return (
    <figure className="k-vis">
      <svg viewBox="0 0 720 230" className="k-vis-svg" role="img" aria-label="Caminho da água: rio, estação de tratamento, casa, tratamento de esgoto e de volta ao rio">
        <rect x="0" y="0" width="720" height="150" fill="#eef7ff" />
        <rect x="0" y="150" width="720" height="80" fill="#eadfca" />
        {canos.map((cor, i) => {
          const x1 = etapasAgua[i].x;
          const x2 = etapasAgua[i + 1].x;
          return (
            <g key={i}>
              <line x1={x1} y1={195} x2={x2} y2={195} stroke={cor} strokeOpacity=".28" strokeWidth="14" strokeLinecap="round" />
              <line x1={x1} y1={195} x2={x2} y2={195} stroke={cor} strokeWidth="5" strokeLinecap="round" className="k-pipe-flow" />
            </g>
          );
        })}
        {etapasAgua.map((e, i) => (
          <g key={e.nome} onClick={() => { setAtivo(i); setTocando(false); }} style={{ cursor: "pointer" }}>
            <line x1={e.x} y1={140} x2={e.x} y2={195} stroke="#b9a98d" strokeWidth="6" />
            <motion.circle cx={e.x} cy={100} r={40} fill="#fff" stroke={i === ativo ? "var(--accent)" : "#d9cdb8"} strokeWidth={i === ativo ? 5 : 2}
              animate={{ scale: i === ativo ? 1.12 : 1 }} />
            <text x={e.x} y={112} textAnchor="middle" fontSize="34">{e.emoji}</text>
            <circle cx={e.x + 30} cy={66} r={12} fill={i === ativo ? "var(--accent)" : "#cfc3ad"} />
            <text x={e.x + 30} y={71} textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">{i + 1}</text>
          </g>
        ))}
      </svg>
      <div className="k-vis-panel">
        <AnimatePresence mode="wait">
          <motion.div key={ativo} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <b>{ativo + 1}. {etapa.nome}</b>
            <p>{etapa.texto}</p>
          </motion.div>
        </AnimatePresence>
        <div className="k-vis-controls">
          <button className="k-btn ghost" onClick={() => { setAtivo((ativo + etapasAgua.length - 1) % etapasAgua.length); setTocando(false); }}>◀</button>
          <button className="k-btn ghost" onClick={() => setTocando(!tocando)} aria-label={tocando ? "Pausar" : "Tocar"}>{tocando ? <Pause size={15} /> : <Play size={15} />}</button>
          <button className="k-btn ghost" onClick={() => { setAtivo((ativo + 1) % etapasAgua.length); setTocando(false); }}>▶</button>
        </div>
      </div>
      <figcaption>Toque nos círculos para ver cada etapa. Os tracinhos mostram a água correndo pelos canos: azul = água limpa, marrom = esgoto.</figcaption>
    </figure>
  );
}

/* ------------------------- 2. Rua com e sem saneamento ------------------------- */

type Coisa = { e: string; x: number; y: number; s?: number; tag?: string; voa?: boolean };
const ruaCom: Coisa[] = [
  { e: "🌳", x: 8, y: 34, s: 2.6 }, { e: "🗑️", x: 30, y: 26, s: 1.6, tag: "lixo na lixeira" }, { e: "🚰", x: 48, y: 30, s: 1.5, tag: "água tratada" },
  { e: "🧒", x: 64, y: 22, s: 1.7 }, { e: "👧", x: 72, y: 22, s: 1.7, tag: "crianças com saúde" }, { e: "🌼", x: 88, y: 18, s: 1.3 },
];
const ruaSem: Coisa[] = [
  { e: "🛍️", x: 14, y: 20, s: 1.5 }, { e: "🗑️", x: 21, y: 18, s: 1.3, tag: "lixo jogado" }, { e: "🐀", x: 34, y: 16, s: 1.4 },
  { e: "🦟", x: 50, y: 60, s: 1.2, voa: true }, { e: "🦟", x: 60, y: 70, s: 1.1, voa: true, tag: "mosquitos" }, { e: "🦟", x: 70, y: 56, s: 1.0, voa: true },
  { e: "🤒", x: 84, y: 22, s: 1.7, tag: "doenças" },
];

export function RuaSaneamento() {
  const [com, setCom] = useState(true);
  const reduce = useReducedMotion();
  const coisas = com ? ruaCom : ruaSem;
  return (
    <figure className="k-vis">
      <div className="k-toggle" role="group" aria-label="Escolha a rua">
        <button className={com ? "on" : ""} onClick={() => setCom(true)}>✅ Com saneamento</button>
        <button className={!com ? "on bad" : ""} onClick={() => setCom(false)}>❌ Sem saneamento</button>
      </div>
      <div className={`k-scene ${com ? "clean" : "dirty"}`} role="img" aria-label={com ? "Rua com saneamento: limpa, com lixeira, água tratada e crianças saudáveis" : "Rua sem saneamento: lixo, esgoto a céu aberto, ratos, mosquitos e pessoas doentes"}>
        <div className="k-scene-houses" aria-hidden="true"><span>🏠</span><span>🏡</span><span>🏠</span><span>🏘️</span></div>
        <div className="k-scene-ground" />
        <AnimatePresence>
          {!com && <motion.div key="esgoto" className="k-sewage" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0, opacity: 0 }} transition={{ duration: 0.6 }}><span>esgoto a céu aberto</span></motion.div>}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {coisas.map((c, i) => (
            <motion.div key={`${com}-${i}`} className="k-thing" style={{ left: `${c.x}%`, bottom: `${c.y}%`, fontSize: `${(c.s ?? 1) * 22}px` }}
              initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.3 }} transition={{ delay: i * 0.06 }}>
              <motion.span aria-hidden="true" animate={c.voa && !reduce ? { x: [0, 18, -12, 8, 0], y: [0, -10, 6, -14, 0] } : {}} transition={{ duration: 2.4 + i * 0.3, repeat: Infinity }}>{c.e}</motion.span>
              {c.tag && <small>{c.tag}</small>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <figcaption>{com ? "Com saneamento a rua fica limpa, a água é segura e as pessoas têm saúde." : "Sem saneamento aparecem esgoto, lixo, ratos e mosquitos, e as pessoas ficam doentes."}</figcaption>
    </figure>
  );
}

/* ------------------------- 3. O banquinho de três pernas ------------------------- */

const pernas = [
  { id: "educacao", nome: "Educação", cor: "#3d82d6", x: 70 },
  { id: "moradia", nome: "Moradia", cor: "#e7a50f", x: 150 },
  { id: "seguranca", nome: "Segurança", cor: "#1f9d7a", x: 230 },
];

export function Banquinho() {
  const [tem, setTem] = useState<Record<string, boolean>>({ educacao: true, moradia: true, seguranca: true });
  const faltando = pernas.filter((p) => !tem[p.id]);
  let rotate = 0;
  let origem = "50% 100%";
  if (faltando.length === 1 && faltando[0].id !== "moradia") {
    rotate = faltando[0].id === "educacao" ? -9 : 9;
  }
  if (faltando.length >= 2) { rotate = faltando.some((p) => p.id === "educacao") ? -80 : 80; origem = rotate < 0 ? "0% 100%" : "100% 100%"; }
  const bambo = faltando.length === 1 && faltando[0].id === "moradia";

  return (
    <figure className="k-vis">
      <div className="k-stool-stage">
        <motion.div className="k-stool" style={{ transformOrigin: origem }} animate={bambo ? { rotate: [0, -6, 6, -4, 4, 0] } : { rotate }} transition={bambo ? { duration: 1.2, repeat: Infinity } : { type: "spring", stiffness: 120, damping: 12 }}>
          <svg viewBox="0 0 300 190" role="img" aria-label="Banquinho com as pernas educação, moradia e segurança segurando a qualidade de vida">
            <rect x="30" y="20" width="240" height="42" rx="14" fill="#c98a4b" />
            <text x="150" y="48" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff">Qualidade de vida</text>
            {pernas.map((p) => (
              <AnimatePresence key={p.id}>
                {tem[p.id] && (
                  <motion.g initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
                    <rect x={p.x - 13} y="60" width="26" height="125" rx="8" fill={p.cor} />
                    <text x={p.x} y="125" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff" transform={`rotate(-90 ${p.x} 122)`}>{p.nome}</text>
                  </motion.g>
                )}
              </AnimatePresence>
            ))}
          </svg>
        </motion.div>
        <div className="k-stool-floor" />
      </div>
      <div className="k-toggle" role="group" aria-label="Tirar ou colocar pernas">
        {pernas.map((p) => (
          <button key={p.id} className={tem[p.id] ? "on" : "bad"} style={{ "--leg": p.cor } as React.CSSProperties} onClick={() => setTem({ ...tem, [p.id]: !tem[p.id] })}>
            {tem[p.id] ? "✔" : "✖"} {p.nome}
          </button>
        ))}
      </div>
      <figcaption>
        {faltando.length === 0
          ? "Firme! Com as três pernas, a qualidade de vida fica de pé. Toque numa perna para tirá-la."
          : `Sem ${faltando.map((p) => p.nome.toLowerCase()).join(" e ")}, a qualidade de vida fica ${faltando.length >= 2 ? "no chão" : "bamba"}! Toque de novo para devolver.`}
      </figcaption>
    </figure>
  );
}

/* ------------------------- 4. Lanterna da cidade invisível ------------------------- */

const problemas = [
  { x: 66, y: 38, t: "Casas em área de risco" },
  { x: 84, y: 56, t: "Sem coleta de esgoto" },
  { x: 62, y: 74, t: "Ônibus demora 2 horas" },
  { x: 86, y: 22, t: "Sem posto de saúde" },
  { x: 30, y: 86, t: "Pessoa dormindo na calçada" },
  { x: 14, y: 44, t: "Muros altos separam bairros" },
];
// Rótulos perto das bordas não podem sair da cidade.
const ancora = (x: number) => (x > 75 ? "-88%" : x < 25 ? "-12%" : "-50%");

export function LanternaCidade() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [achados, setAchados] = useState<number[]>([]);
  const [ligada, setLigada] = useState(false);
  const [raio, setRaio] = useState(58);

  const mover = (clientX: number, clientY: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const px = clientX - box.left;
    const py = clientY - box.top;
    const r = Math.max(36, Math.min(58, box.width * 0.08));
    setRaio(r);
    setLigada(true);
    setPos({ x: (px / box.width) * 100, y: (py / box.height) * 100 });
    const novos = problemas
      .map((p, i) => ({ i, d: Math.hypot((p.x / 100) * box.width - px, (p.y / 100) * box.height - py) }))
      .filter(({ i, d }) => d < r + 4 && !achados.includes(i))
      .map(({ i }) => i);
    if (novos.length) setAchados((a) => [...a, ...novos]);
  };

  const todos = achados.length === problemas.length;
  return (
    <figure className="k-vis">
      <div
        ref={ref}
        className="k-city"
        onPointerMove={(e) => e.pointerType === "mouse" && mover(e.clientX, e.clientY)}
        onClick={(e) => mover(e.clientX, e.clientY)}
        role="img"
        aria-label="Cidade com problemas escondidos. Passe a lanterna para encontrá-los."
      >
        <div className="k-city-sky" />
        <div className="k-city-center" aria-hidden="true">
          <span style={{ fontSize: 54 }}>🏙️</span><span style={{ fontSize: 44 }}>🏢</span><span style={{ fontSize: 34 }}>🏥</span><span style={{ fontSize: 30 }}>🌳</span><span style={{ fontSize: 34 }}>🏫</span>
        </div>
        <div className="k-city-hill" aria-hidden="true">
          {["🏠", "🏚️", "🏠", "🏚️", "🏠", "🏠", "🏚️", "🏠"].map((e, i) => <span key={i} style={{ left: `${12 + (i % 4) * 22}%`, bottom: `${18 + Math.floor(i / 4) * 32}%` }}>{e}</span>)}
        </div>
        <div className="k-city-street" />
        <div className="k-city-labels left">Centro</div>
        <div className="k-city-labels right">Periferia</div>
        <div className="k-city-hidden" style={{ WebkitMaskImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #000 0 ${raio}px, transparent ${raio + 12}px)`, maskImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #000 0 ${raio}px, transparent ${raio + 12}px)` }}>
          {problemas.map((p, i) => !achados.includes(i) && <span key={p.t} className="k-problem" style={{ left: `${p.x}%`, top: `${p.y}%`, translate: `${ancora(p.x)} -50%` }}>{p.t}</span>)}
        </div>
        {problemas.map((p, i) => achados.includes(i) && (
          <motion.span key={p.t} className="k-problem found" style={{ left: `${p.x}%`, top: `${p.y}%`, translate: `${ancora(p.x)} -50%` }} initial={{ scale: 0.4 }} animate={{ scale: 1 }}>✓ {p.t}</motion.span>
        ))}
        {ligada && <div className="k-lantern" style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: raio * 2 + 8, height: raio * 2 + 8 }} aria-hidden="true" />}
        {!ligada && <div className="k-city-hint">🔦 Passe o mouse ou toque na cidade</div>}
      </div>
      <div className="k-vis-row">
        <b aria-live="polite">{todos ? "🎉 Você tornou a cidade visível!" : `Problemas encontrados: ${achados.length} de ${problemas.length}`}</b>
        <div className="k-vis-controls">
          <button className="k-btn ghost" onClick={() => setAchados(problemas.map((_, i) => i))}>Mostrar tudo</button>
          <button className="k-btn ghost" onClick={() => { setAchados([]); setLigada(false); }}><RotateCcw size={15} /></button>
        </div>
      </div>
      <figcaption>A cidade invisível está aí o tempo todo, mas só aparece quando a gente olha com atenção.</figcaption>
    </figure>
  );
}

/* ------------------------- 5. Favelas: barras animadas ------------------------- */

export function BarrasFavelas() {
  const dados = [
    { ano: "2010", valor: 6329, cidades: 323 },
    { ano: "2019", valor: 13151, cidades: 743 },
  ];
  const max = 13151;
  return (
    <figure className="k-vis k-vis-plain">
      <div className="k-growbars">
        {dados.map((d, i) => (
          <div key={d.ano} className="k-growbar">
            <span className="k-growbar-year">{d.ano}</span>
            <div className="k-growbar-track">
              <motion.div className="k-growbar-fill" initial={{ width: 0 }} whileInView={{ width: `${(d.valor / max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.5, ease: "easeOut" }}>
                <span>{"🏘️".repeat(i === 0 ? 3 : 6)}</span>
              </motion.div>
            </div>
            <p><b>{d.valor.toLocaleString("pt-BR")}</b> favelas em <b>{d.cidades}</b> municípios</p>
          </div>
        ))}
      </div>
      <figcaption>Em 9 anos, o número de favelas mais que dobrou (dados do IBGE).</figcaption>
    </figure>
  );
}

/* ------------------------- 6. Pictograma de 100 pessoas ------------------------- */

const estatisticas = [
  { n: 87, curto: "Homens", frase: "87 de cada 100 pessoas em situação de rua são homens." },
  { n: 87, curto: "Adultos (18 a 59 anos)", frase: "87 de cada 100 têm entre 18 e 59 anos." },
  { n: 68, curto: "Pessoas negras", frase: "68 de cada 100 são pessoas negras (pretas e pardas)." },
  { n: 47, curto: "Sem terminar o fundamental", frase: "47 de cada 100 não terminaram o ensino fundamental." },
];

function Pessoa({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 20 32" className={`k-person ${on ? "on" : ""}`} aria-hidden="true">
      <circle cx="10" cy="6" r="5" />
      <path d="M3 32 V18 a7 7 0 0 1 14 0 V32 Z" />
    </svg>
  );
}

export function Pictograma() {
  const [sel, setSel] = useState(0);
  const est = estatisticas[sel];
  return (
    <figure className="k-vis k-vis-plain">
      <div className="k-toggle wrap" role="group" aria-label="Escolha um dado">
        {estatisticas.map((e, i) => <button key={e.curto} className={i === sel ? "on" : ""} onClick={() => setSel(i)}>{e.curto}</button>)}
      </div>
      <div className="k-picto" role="img" aria-label={est.frase}>
        {Array.from({ length: 100 }, (_, i) => <Pessoa key={i} on={i < est.n} />)}
      </div>
      <figcaption><b className="k-picto-num">{est.n}%</b> {est.frase} Cada bonequinho representa 1 pessoa em cada 100.</figcaption>
    </figure>
  );
}

/* ================================== E.L.A. ================================== */

/* ------------------------- 7. Palco dos verbos ------------------------- */

const verbosPalco: Record<string, { pt: string; past: string; dur: number; hop: number; hopDur: number; lean: number; squash: number; grupo: "walk" | "run" }> = {
  walk: { pt: "andar", past: "walked", dur: 4, hop: 6, hopDur: 0.5, lean: 0, squash: 1, grupo: "walk" },
  stroll: { pt: "passear tranquilo", past: "strolled", dur: 6.5, hop: 3, hopDur: 0.9, lean: -4, squash: 1, grupo: "walk" },
  march: { pt: "marchar", past: "marched", dur: 4, hop: 16, hopDur: 0.32, lean: 0, squash: 1, grupo: "walk" },
  creep: { pt: "andar de mansinho", past: "crept", dur: 7.5, hop: 1, hopDur: 1, lean: 0, squash: 0.6, grupo: "walk" },
  stride: { pt: "andar a passos largos", past: "strode", dur: 3, hop: 12, hopDur: 0.65, lean: 4, squash: 1, grupo: "walk" },
  run: { pt: "correr", past: "ran", dur: 2, hop: 9, hopDur: 0.25, lean: 8, squash: 1, grupo: "run" },
  sprint: { pt: "correr a toda velocidade", past: "sprinted", dur: 1.1, hop: 8, hopDur: 0.16, lean: 14, squash: 1, grupo: "run" },
  dash: { pt: "disparar", past: "dashed", dur: 1.4, hop: 5, hopDur: 0.18, lean: 11, squash: 1, grupo: "run" },
  bolt: { pt: "sair em disparada", past: "bolted", dur: 0.7, hop: 2, hopDur: 0.14, lean: 18, squash: 1, grupo: "run" },
  scamper: { pt: "correr saltitando", past: "scampered", dur: 2.4, hop: 20, hopDur: 0.22, lean: 3, squash: 1, grupo: "run" },
};

function usePista() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(300);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, distancia: Math.max(120, w - 80) };
}

export function PalcoVerbos() {
  const [verbo, setVerbo] = useState("walk");
  const [corrida, setCorrida] = useState(0);
  const { ref, distancia } = usePista();
  const reduce = useReducedMotion();
  const v = verbosPalco[verbo];
  const frase = `The cat ${v.past} across the stage.`;
  const escolher = (k: string) => { setVerbo(k); setCorrida((c) => c + 1); };

  return (
    <figure className="k-vis">
      {(["walk", "run"] as const).map((g) => (
        <div key={g} className="k-verb-row">
          <span className="k-verb-group">{g === "walk" ? "🚶 walk" : "🏃 run"}</span>
          <div className="k-toggle wrap">
            {Object.entries(verbosPalco).filter(([, x]) => x.grupo === g).map(([k]) => (
              <button key={k} className={k === verbo ? "on" : ""} onClick={() => escolher(k)} lang="en">{k}</button>
            ))}
          </div>
        </div>
      ))}
      <div className="k-stage" ref={ref}>
        <motion.div key={`${verbo}-${corrida}`} className="k-actor" initial={{ x: 0 }} animate={{ x: distancia }} transition={{ duration: reduce ? 0 : v.dur, ease: verbo === "bolt" ? "easeIn" : "linear" }}>
          <motion.div animate={reduce ? {} : { y: [0, -v.hop, 0] }} transition={{ duration: v.hopDur, repeat: Infinity, ease: "easeOut" }} style={{ rotate: v.lean, scaleY: v.squash, originY: 1 }}>
            <span className="k-flip">🐈</span>
          </motion.div>
          {verbo === "creep" && <span className="k-actor-fx">🤫</span>}
          {(verbo === "sprint" || verbo === "bolt" || verbo === "dash") && <span className="k-actor-fx speed">💨</span>}
        </motion.div>
        <div className="k-stage-floor" />
      </div>
      <div className="k-vis-row">
        <div className="k-vis-sentence">
          <Say text={frase} />
          <span lang="en">The cat <mark>{v.past}</mark> across the stage.</span>
          <small>({verbo} = {v.pt})</small>
        </div>
        <button className="k-btn ghost" onClick={() => setCorrida((c) => c + 1)}><RotateCcw size={15} /> De novo</button>
      </div>
      <figcaption>Escolha um verbo e veja como o gato se mexe. Cada verbo forte mostra um jeito diferente de andar ou correr!</figcaption>
    </figure>
  );
}

/* ------------------------- 8. Linha do tempo dos verbos ------------------------- */

const tempos = [
  { nome: "Past", pt: "passado", palavra: "Yesterday", i: "I played soccer.", she: "She played soccer.", pos: 12 },
  { nome: "Present", pt: "presente", palavra: "Every day", i: "I play soccer.", she: "She plays soccer.", pos: 50 },
  { nome: "Future", pt: "futuro", palavra: "Tomorrow", i: "I will play soccer.", she: "She will play soccer.", pos: 88 },
];

export function LinhaDoTempo() {
  const [t, setT] = useState(1);
  const tempo = tempos[t];
  return (
    <figure className="k-vis k-vis-plain">
      <div className="k-timeline">
        <div className="k-timeline-line" />
        {tempos.map((x, i) => (
          <button key={x.nome} className={`k-timeline-stop ${i === t ? "on" : ""}`} style={{ left: `${x.pos}%` }} onClick={() => setT(i)}>
            <span>{i === 0 ? "⬅️" : i === 1 ? "⏺️" : "➡️"}</span>
            <b lang="en">{x.nome}</b>
            <small>{x.pt}</small>
          </button>
        ))}
        <motion.div className="k-timeline-marker" animate={{ left: `${tempo.pos}%` }} transition={{ type: "spring", stiffness: 200, damping: 20 }} aria-hidden="true">⚽</motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={t} className="k-timeline-text" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p lang="en"><Say text={`${tempo.palavra}, ${tempo.i}`} /> <b>{tempo.palavra},</b> {tempo.i}</p>
          <p lang="en"><Say text={`${tempo.palavra}, ${tempo.she}`} /> <b>{tempo.palavra},</b> She <mark>{tempo.she.replace(/^She | soccer\.$/g, "")}</mark> soccer.</p>
        </motion.div>
      </AnimatePresence>
    </figure>
  );
}

/* ------------------------- 9. Máquina de adjetivos ------------------------- */

const tamanhos: Record<string, number> = { tiny: 0.42, small: 0.62, big: 0.88, gigantic: 1.12 };
const cores: Record<string, string> = { red: "#e5534b", blue: "#3d82d6", green: "#2fa36b", purple: "#8e5bd8", yellow: "#e9b412" };
const sentimentos = ["happy", "sad", "angry", "scared"] as const;
const traducao: Record<string, string> = { tiny: "minúsculo", small: "pequeno", big: "grande", gigantic: "gigantesco", red: "vermelho", blue: "azul", green: "verde", purple: "roxo", yellow: "amarelo", happy: "feliz", sad: "triste", angry: "bravo", scared: "assustado" };

export function MaquinaAdjetivos() {
  const [tam, setTam] = useState("big");
  const [cor, setCor] = useState("purple");
  const [sent, setSent] = useState<(typeof sentimentos)[number]>("happy");
  const frase = `A ${tam} ${cor} monster. It looks ${sent}.`;
  const boca = { happy: "M75 128 Q100 152 125 128", sad: "M75 140 Q100 118 125 140", angry: "M78 136 L122 136", scared: "M88 128 Q100 150 112 128 Q100 138 88 128" }[sent];

  return (
    <figure className="k-vis">
      <div className="k-adj-grid">
        <div className="k-monster-stage">
          <motion.div className="k-monster" animate={{ scale: tamanhos[tam] }} transition={{ type: "spring", stiffness: 160, damping: 12 }}>
            <motion.svg viewBox="0 0 200 210" animate={sent === "scared" ? { x: [0, -3, 3, -3, 0] } : { x: 0 }} transition={{ duration: 0.4, repeat: sent === "scared" ? Infinity : 0 }}>
              <rect x="62" y="170" width="22" height="34" rx="10" fill="#555" />
              <rect x="116" y="170" width="22" height="34" rx="10" fill="#555" />
              <motion.ellipse cx="100" cy="110" rx="78" ry="80" animate={{ fill: cores[cor] }} />
              <motion.path d="M40 50 L55 20 L70 45 M130 45 L145 20 L160 50" stroke="#555" strokeWidth="7" fill="none" strokeLinecap="round" />
              <circle cx="72" cy="95" r="17" fill="#fff" /><circle cx="128" cy="95" r="17" fill="#fff" />
              <circle cx={sent === "scared" ? 72 : 76} cy="97" r="8" fill="#222" /><circle cx={sent === "scared" ? 128 : 124} cy="97" r="8" fill="#222" />
              {sent === "angry" && <path d="M52 70 L90 82 M148 70 L110 82" stroke="#222" strokeWidth="6" strokeLinecap="round" />}
              {sent === "sad" && <path d="M54 80 L88 72 M146 80 L112 72" stroke="#222" strokeWidth="5" strokeLinecap="round" />}
              {sent === "sad" && <circle cx="62" cy="122" r="6" fill="#7cc4ff" />}
              {sent === "scared" && <path d="M160 60 q8 14 0 20 q-8 -6 0 -20" fill="#7cc4ff" />}
              <path d={boca} stroke="#222" strokeWidth="6" fill={sent === "scared" ? "#222" : "none"} strokeLinecap="round" />
            </motion.svg>
          </motion.div>
        </div>
        <div className="k-adj-controls">
          <div><span className="k-verb-group">📏 Size</span><div className="k-toggle wrap">{Object.keys(tamanhos).map((k) => <button key={k} lang="en" className={k === tam ? "on" : ""} onClick={() => setTam(k)}>{k}</button>)}</div></div>
          <div><span className="k-verb-group">🎨 Color</span><div className="k-toggle wrap">{Object.keys(cores).map((k) => <button key={k} lang="en" className={k === cor ? "on" : ""} onClick={() => setCor(k)}><i className="k-swatch" style={{ background: cores[k] }} />{k}</button>)}</div></div>
          <div><span className="k-verb-group">😊 Feeling</span><div className="k-toggle wrap">{sentimentos.map((k) => <button key={k} lang="en" className={k === sent ? "on" : ""} onClick={() => setSent(k)}>{k}</button>)}</div></div>
        </div>
      </div>
      <div className="k-vis-sentence big">
        <Say text={frase} />
        <span lang="en">A <mark>{tam}</mark> <mark>{cor}</mark> monster. It <u>looks</u> <mark>{sent}</mark>.</span>
      </div>
      <figcaption>Um monstro <b>{traducao[tam]}</b> e <b>{traducao[cor]}</b>, que parece <b>{traducao[sent]}</b>. Repare: em inglês o adjetivo vem <b>antes</b> do substantivo (<i lang="en">a big purple monster</i>), e “looks” é um <i lang="en">linking verb</i>.</figcaption>
    </figure>
  );
}

/* ------------------------- 10. A tartaruga e os advérbios ------------------------- */

const adverbiosTartaruga: Record<string, { adj: string; pt: string; dur: number; fx?: string }> = {
  slowly: { adj: "slow", pt: "devagar", dur: 8 },
  quickly: { adj: "quick", pt: "rapidamente", dur: 1.4, fx: "💨" },
  nervously: { adj: "nervous", pt: "nervosamente", dur: 5, fx: "💦" },
  happily: { adj: "happy", pt: "alegremente", dur: 4, fx: "💖" },
  carefully: { adj: "careful", pt: "com cuidado", dur: 6, fx: "👀" },
  loudly: { adj: "loud", pt: "fazendo barulho", dur: 4, fx: "📢" },
  silently: { adj: "silent", pt: "em silêncio", dur: 5, fx: "🤫" },
};

export function TartarugaAdverbios() {
  const [adv, setAdv] = useState("slowly");
  const [corrida, setCorrida] = useState(0);
  const { ref, distancia } = usePista();
  const reduce = useReducedMotion();
  const a = adverbiosTartaruga[adv];

  const xAnim = adv === "carefully" ? [0, distancia * 0.25, distancia * 0.25, distancia * 0.55, distancia * 0.55, distancia] : [0, distancia];
  const inner =
    adv === "nervously" ? { rotate: [0, -8, 8, -8, 0] } :
    adv === "happily" ? { y: [0, -18, 0] } :
    adv === "quickly" ? { y: [0, -4, 0] } :
    adv === "loudly" ? { y: [0, -10, 0], scale: [1, 1.12, 1] } : {};

  return (
    <figure className="k-vis">
      <div className="k-toggle wrap">
        {Object.keys(adverbiosTartaruga).map((k) => <button key={k} lang="en" className={k === adv ? "on" : ""} onClick={() => { setAdv(k); setCorrida((c) => c + 1); }}>{k}</button>)}
      </div>
      <div className={`k-stage turtle ${adv === "silently" ? "hush" : ""}`} ref={ref}>
        <motion.div key={`${adv}-${corrida}`} className="k-actor" initial={{ x: 0 }} animate={{ x: xAnim }} transition={{ duration: reduce ? 0 : a.dur, ease: "linear" }}>
          <motion.div animate={reduce ? {} : inner} transition={{ duration: adv === "happily" ? 0.6 : 0.3, repeat: Infinity }}>
            <span className="k-flip">🐢</span>
          </motion.div>
          {a.fx && <motion.span className="k-actor-fx" animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }}>{a.fx}{adv === "loudly" ? " STOMP!" : ""}</motion.span>}
        </motion.div>
        <div className="k-stage-floor grass" />
      </div>
      <div className="k-adv-compare">
        <div>
          <span className="k-vs-tag">ADVERB</span>
          <p lang="en"><Say text={`The turtle walked ${adv}.`} /> The turtle walked <mark>{adv}</mark>.</p>
          <small>descreve o verbo <b>walked</b> → como ela andou? <b>{a.pt}</b></small>
        </div>
        <div>
          <span className="k-vs-tag alt">ADJECTIVE</span>
          <p lang="en"><Say text={`It is a ${a.adj} turtle.`} /> It is a <mark>{a.adj}</mark> turtle.</p>
          <small>descreve o substantivo <b>turtle</b></small>
        </div>
      </div>
      <figcaption>Escolha um advérbio e veja como a tartaruga anda. Repare que o advérbio é o adjetivo + <b>-ly</b>.</figcaption>
    </figure>
  );
}

/* ------------------------- 11. Medidor de persuasão ------------------------- */

const ingredientes = [
  { id: "opiniao", nome: "Opinião clara", tec: "opinion", pts: 2, frase: "I strongly believe our school should have a longer recess." },
  { id: "razao", nome: "Razão com because", tec: "reason", pts: 2, frase: "We need it because playing helps us focus in class." },
  { id: "exemplo", nome: "Exemplo / prova", tec: "evidence", pts: 2, frase: "For example, after running outside, kids pay more attention to the teacher." },
  { id: "pergunta", nome: "Pergunta retórica", tec: "rhetorical question", pts: 1, frase: "Who doesn't want happier students?" },
  { id: "adjetivo", nome: "Adjetivo forte", tec: "strong adjective", pts: 1, frase: "Recess is an amazing time to make friends." },
  { id: "chamada", nome: "Chamada para ação", tec: "call to action", pts: 2, frase: "For these reasons, please give us ten more minutes!" },
];

export function MedidorPersuasao() {
  const [on, setOn] = useState<string[]>(["opiniao"]);
  const total = ingredientes.reduce((s, i) => s + i.pts, 0);
  const pts = ingredientes.filter((i) => on.includes(i.id)).reduce((s, i) => s + i.pts, 0);
  const pct = Math.round((pts / total) * 100);
  const [rosto, texto] = pct >= 100 ? ["🤩", "Convencido! Pode ter mais recreio!"] : pct >= 60 ? ["🙂", "Quase lá… falta pouco!"] : pct >= 30 ? ["🤔", "Hmm, me dê mais razões."] : ["😐", "Não me convenceu ainda."];
  const paragrafo = ingredientes.filter((i) => on.includes(i.id)).map((i) => i.frase).join(" ");

  return (
    <figure className="k-vis">
      <div className="k-persuade">
        <div className="k-toggle wrap col">
          {ingredientes.map((i) => (
            <button key={i.id} className={on.includes(i.id) ? "on" : ""} onClick={() => setOn(on.includes(i.id) ? on.filter((x) => x !== i.id) : [...on, i.id])}>
              {on.includes(i.id) ? "✔" : "+"} {i.nome} <small lang="en">({i.tec})</small>
            </button>
          ))}
        </div>
        <div className="k-meter-box">
          <motion.div className="k-meter-face" key={rosto} initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}>{rosto}</motion.div>
          <div className="k-meter"><motion.i animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 18 }} /></div>
          <b>{pct}% convencido</b>
          <small>{texto}</small>
        </div>
      </div>
      <div className="k-model-text">
        {paragrafo ? <><Say text={paragrafo} /><p lang="en">{paragrafo}</p></> : <p>Escolha os ingredientes para montar o parágrafo.</p>}
      </div>
      <figcaption>Junte os ingredientes e veja o leitor ser convencido. Quanto mais razões e provas, mais forte fica o parágrafo!</figcaption>
    </figure>
  );
}

/* ------------------------- 12. Monte o hambúrguer ------------------------- */

const camadas = [
  { papel: "Topic sentence", cor: "#e9b56a", texto: "Last Saturday, my family and I went to the beach for the first time." },
  { papel: "Supporting sentence", cor: "#9bd17e", texto: "First, we built a giant sandcastle near the water." },
  { papel: "Supporting sentence", cor: "#f08a6c", texto: "Then, a huge wave suddenly crashed and destroyed it." },
  { papel: "Supporting sentence", cor: "#f7d257", texto: "Next, we laughed and built an even bigger one together." },
  { papel: "Concluding sentence", cor: "#e9b56a", texto: "Finally, we went home tired but very happy." },
];
const embaralhado = [2, 4, 0, 3, 1];

export function MonteHamburguer() {
  const [pilha, setPilha] = useState<number[]>([]);
  const [erro, setErro] = useState<number | null>(null);
  const restantes = useMemo(() => embaralhado.filter((i) => !pilha.includes(i)), [pilha]);
  const pronto = pilha.length === camadas.length;

  const escolher = (i: number) => {
    if (i === pilha.length) { setPilha([...pilha, i]); setErro(null); }
    else setErro(i);
  };

  return (
    <figure className="k-vis">
      <p className="k-vis-help">Toque nas frases <b>na ordem certa</b> para montar o parágrafo narrativo (comece pela <i lang="en">topic sentence</i>).</p>
      <div className="k-burger-game">
        <div className="k-burger-options">
          {restantes.map((i) => (
            <motion.button key={i} layout lang="en" className={`k-burger-option ${erro === i ? "wrong" : ""}`} onClick={() => escolher(i)}
              animate={erro === i ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
              {camadas[i].texto}
            </motion.button>
          ))}
          {erro !== null && <p className="k-inline-hint">Ops! Pense: o que acontece antes? Procure as palavras <i lang="en">first, then, next, finally</i>.</p>}
          {pronto && <p className="k-burger-done">🍔 Hambúrguer completo! Primeiro a <b>topic sentence</b>, depois as <b>supporting sentences</b> e, por fim, a <b>concluding sentence</b>.</p>}
        </div>
        <ol className="k-burger-stack">
          <AnimatePresence>
            {pilha.map((i, n) => (
              <motion.li key={i} lang="en" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: camadas[i].cor }} className={n === 0 ? "top" : pronto && n === camadas.length - 1 ? "bottom" : ""}>
                <small>{camadas[i].papel}</small>
                {camadas[i].texto}
              </motion.li>
            ))}
          </AnimatePresence>
          {pilha.length === 0 && <li className="k-burger-empty">O hambúrguer aparece aqui 🍔</li>}
        </ol>
      </div>
      <div className="k-actions">
        <button className="k-btn ghost" onClick={() => { setPilha([]); setErro(null); }}><RotateCcw size={15} /> Recomeçar</button>
        {pronto && <Say text={camadas.map((c) => c.texto).join(" ")} label="Ouvir o parágrafo" />}
      </div>
    </figure>
  );
}
