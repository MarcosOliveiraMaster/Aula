// Ilustrações e animações interativas de História (SVG + framer-motion).
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

/* ------------------------- 1. Quem governa? (tipos de governo) ------------------------- */

const governos = [
  {
    id: "democracia",
    nome: "Democracia",
    emoji: "🗳️",
    quem: "O povo escolhe",
    texto: "As pessoas votam para escolher quem vai governar. Se o governante não fizer um bom trabalho, o povo pode trocá-lo na próxima eleição.",
  },
  {
    id: "ditadura",
    nome: "Ditadura",
    emoji: "🔒",
    quem: "Uma pessoa ou um grupo pequeno manda sozinho",
    texto: "Ninguém pode escolher quem governa. As pessoas não têm liberdade para dar sua opinião ou reclamar.",
  },
  {
    id: "monarquia",
    nome: "Monarquia",
    emoji: "👑",
    quem: "Um rei ou uma rainha governa",
    texto: "O poder passa de pai ou mãe para filho ou filha. Na monarquia absolutista, o rei manda em tudo sozinho.",
  },
] as const;

export function QuemGoverna() {
  const [sel, setSel] = useState<(typeof governos)[number]["id"]>("democracia");
  const reduce = useReducedMotion();
  const g = governos.find((x) => x.id === sel)!;
  const povo = Array.from({ length: 10 });

  return (
    <figure className="k-vis">
      <div className="k-toggle wrap" role="group" aria-label="Tipos de governo">
        {governos.map((x) => (
          <button key={x.id} className={x.id === sel ? "on" : ""} onClick={() => setSel(x.id)}>
            {x.emoji} {x.nome}
          </button>
        ))}
      </div>
      <div className="k-gov-scene" role="img" aria-label={`${g.nome}: ${g.quem}`}>
        <motion.div key={`lider-${sel}`} className="k-gov-leader" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <span>{sel === "monarquia" ? "🤴" : sel === "ditadura" ? "🧍" : "🧑‍💼"}</span>
          <small>{sel === "democracia" ? "representante eleito" : sel === "monarquia" ? "rei" : "ditador"}</small>
        </motion.div>
        <div className="k-gov-arrows" aria-hidden="true">
          {sel === "democracia" ? (
            povo.slice(0, 5).map((_, i) => (
              <motion.span key={`${sel}-${i}`} className="k-ballot" initial={{ y: 60, opacity: 0 }} animate={reduce ? { y: 0, opacity: 1 } : { y: [60, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.6, delay: i * 0.25, repeat: reduce ? 0 : Infinity, repeatDelay: 0.6 }}>
                🗳️
              </motion.span>
            ))
          ) : (
            <motion.span key={sel} className="k-gov-order" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {sel === "ditadura" ? "⬇️ “Eu mando!”" : "⬇️ “Eu herdei a coroa!”"}
            </motion.span>
          )}
        </div>
        <div className="k-gov-people">
          {povo.map((_, i) => (
            <motion.span key={`${sel}-${i}`} animate={sel === "democracia" && !reduce ? { y: [0, -6, 0] } : { y: 0 }} transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity, repeatDelay: 1 }}>
              {sel === "ditadura" ? "😶" : "🙂"}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="k-vis-panel">
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <b>{g.emoji} {g.nome}: {g.quem}</b>
            <p>{g.texto}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}

/* ------------------------- 2. Democracia direta x representativa ------------------------- */

export function DiretaRepresentativa() {
  const [modo, setModo] = useState<"direta" | "representativa">("representativa");
  const reduce = useReducedMotion();
  const pessoas = Array.from({ length: 24 });
  const representantes = [3, 10, 17];

  return (
    <figure className="k-vis">
      <div className="k-toggle" role="group" aria-label="Tipo de democracia">
        <button className={modo === "direta" ? "on" : ""} onClick={() => setModo("direta")}>✋ Direta</button>
        <button className={modo === "representativa" ? "on" : ""} onClick={() => setModo("representativa")}>🧑‍💼 Representativa</button>
      </div>
      <div className="k-assembly" role="img" aria-label={modo === "direta" ? "Todas as pessoas votam em todas as decisões" : "O povo escolhe alguns representantes, que decidem por todos"}>
        <div className="k-assembly-decision">📜 Nova lei: construir uma praça?</div>
        <div className="k-assembly-grid">
          {pessoas.map((_, i) => {
            const rep = representantes.includes(i);
            const ativo = modo === "direta" || rep;
            return (
              <motion.span
                key={`${modo}-${i}`}
                className={`k-citizen ${ativo ? "on" : ""} ${modo === "representativa" && rep ? "rep" : ""}`}
                animate={ativo && !reduce ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{ duration: 0.7, delay: (i % 8) * 0.06, repeat: ativo && !reduce ? Infinity : 0, repeatDelay: 1.2 }}
              >
                {ativo ? "🙋" : "🧑"}
              </motion.span>
            );
          })}
        </div>
      </div>
      <figcaption>
        {modo === "direta"
          ? "Democracia direta: TODAS as pessoas votam em TODAS as decisões. Funciona em grupos pequenos, como na Atenas antiga ou numa votação da sala."
          : "Democracia representativa: o povo vota para escolher representantes (os de gravata ⭐), e eles decidem em nome de todos. É assim no Brasil!"}
      </figcaption>
    </figure>
  );
}

/* ------------------------- 3. Quem elegemos? (níveis) ------------------------- */

const niveis = [
  { id: "municipio", nome: "Município (cidade)", cor: "#f2b84b", cargos: ["Vereadores", "Prefeito ou prefeita"], texto: "Cuidam da cidade: ruas, praças, postos de saúde e escolas municipais." },
  { id: "estado", nome: "Estado", cor: "#e7834a", cargos: ["Deputados estaduais", "Governador ou governadora"], texto: "Cuidam do estado (como Alagoas): estradas estaduais, polícia, escolas estaduais." },
  { id: "pais", nome: "País (Brasil)", cor: "#b5532a", cargos: ["Deputados federais", "Senadores", "Presidente da República"], texto: "Cuidam do país inteiro: leis nacionais, relações com outros países, a moeda." },
];

export function QuemElegemos() {
  const [sel, setSel] = useState(0);
  const n = niveis[sel];
  return (
    <figure className="k-vis">
      <div className="k-levels">
        <svg viewBox="0 0 300 300" role="img" aria-label="Círculos: país, estado e município">
          {[...niveis].reverse().map((nv, ri) => {
            const i = niveis.length - 1 - ri;
            return (
              <motion.circle key={nv.id} cx="150" cy="150" r={50 + i * 45} fill={nv.cor} fillOpacity={i === sel ? 1 : 0.35} stroke="#fff" strokeWidth="3"
                style={{ cursor: "pointer" }} onClick={() => setSel(i)} animate={{ scale: i === sel ? 1.03 : 1 }} />
            );
          })}
          <text x="150" y="156" textAnchor="middle" fontSize="15" fontWeight="900" fill="#2e1d10" pointerEvents="none">🏙️ Cidade</text>
          <text x="150" y="66" textAnchor="middle" fontSize="13" fontWeight="900" fill="#2e1d10" pointerEvents="none">Estado</text>
          <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill="#2e1d10" pointerEvents="none">Brasil</text>
        </svg>
        <div className="k-levels-info">
          <div className="k-toggle wrap col">
            {niveis.map((nv, i) => <button key={nv.id} className={i === sel ? "on" : ""} onClick={() => setSel(i)}>{nv.nome}</button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={sel} className="k-levels-card" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <b>Votamos para:</b>
              <ul className="k-list">{n.cargos.map((c) => <li key={c}>{c}</li>)}</ul>
              <p>{n.texto}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <figcaption>Toque nos círculos: a cidade fica dentro do estado, que fica dentro do país. Em cada nível, escolhemos representantes diferentes.</figcaption>
    </figure>
  );
}

/* ------------------------- 4. Quem podia votar? ------------------------- */

type Pessoa = { e: string; rotulo: string; grupo: "homem-rico" | "homem-pobre" | "mulher" | "escravizado" | "estrangeiro" | "jovem" };
const multidao: Pessoa[] = [
  { e: "🧔", rotulo: "homem rico", grupo: "homem-rico" }, { e: "👨", rotulo: "homem rico", grupo: "homem-rico" },
  { e: "👨‍🌾", rotulo: "homem pobre", grupo: "homem-pobre" }, { e: "🧑‍🔧", rotulo: "homem pobre", grupo: "homem-pobre" }, { e: "👴", rotulo: "homem pobre", grupo: "homem-pobre" },
  { e: "👩", rotulo: "mulher", grupo: "mulher" }, { e: "👩‍🌾", rotulo: "mulher", grupo: "mulher" }, { e: "👵", rotulo: "mulher", grupo: "mulher" }, { e: "👩‍🦱", rotulo: "mulher", grupo: "mulher" },
  { e: "⛓️", rotulo: "pessoa escravizada", grupo: "escravizado" }, { e: "⛓️", rotulo: "pessoa escravizada", grupo: "escravizado" },
  { e: "🧳", rotulo: "estrangeiro", grupo: "estrangeiro" },
  { e: "🧑", rotulo: "jovem de 16 a 17 anos", grupo: "jovem" },
];

const epocas = [
  { id: "atenas", nome: "Atenas antiga", ano: "séc. VI a.C.", pode: ["homem-rico", "homem-pobre"], nota: "Só homens livres, maiores de 18 anos, filhos de pai e mãe atenienses. Mulheres, escravizados e estrangeiros ficavam de fora." },
  { id: "franca", nome: "França", ano: "1789", pode: ["homem-rico"], nota: "A Revolução falou em liberdade e igualdade, mas as mulheres continuaram sem direito ao voto e as colônias continuaram exploradas." },
  { id: "brasil1824", nome: "Brasil Império", ano: "1824", pode: ["homem-rico"], nota: "Só homens livres ou libertos, nascidos no Brasil, maiores de 25 anos e com renda acima de 100 mil réis. Pessoas escravizadas e mulheres não votavam." },
  { id: "hoje", nome: "Brasil hoje", ano: "2026", pode: ["homem-rico", "homem-pobre", "mulher", "jovem"], nota: "Todos os brasileiros a partir de 16 anos podem votar, ricos ou pobres, homens ou mulheres. Não existe mais escravidão. (Estrangeiros só votam se se tornarem brasileiros.)" },
];

export function QuemPodiaVotar() {
  const [sel, setSel] = useState(0);
  const ep = epocas[sel];
  const podem = multidao.filter((p) => (ep.pode as string[]).includes(p.grupo)).length;
  return (
    <figure className="k-vis">
      <div className="k-era-tabs" role="group" aria-label="Escolha a época">
        {epocas.map((x, i) => (
          <button key={x.id} className={i === sel ? "on" : ""} onClick={() => setSel(i)}>
            <b>{x.nome}</b>
            <small>{x.ano}</small>
          </button>
        ))}
      </div>
      <div className="k-crowd" role="img" aria-label={`${ep.nome}: ${podem} de ${multidao.length} pessoas podiam votar`}>
        {multidao.map((p, i) => {
          const vota = (ep.pode as string[]).includes(p.grupo);
          return (
            <motion.div key={i} className={`k-crowd-person ${vota ? "yes" : "no"}`} animate={{ opacity: vota ? 1 : 0.35, scale: vota ? 1 : 0.88 }} transition={{ duration: 0.35, delay: i * 0.03 }}>
              <span aria-hidden="true">{p.e}</span>
              <small>{p.rotulo}</small>
              <i aria-hidden="true">{vota ? "🗳️" : "🚫"}</i>
            </motion.div>
          );
        })}
      </div>
      <div className="k-vis-panel">
        <div>
          <b>{ep.nome} ({ep.ano}): {podem} de {multidao.length} pessoas desta multidão podiam votar.</b>
          <p>{ep.nota}</p>
        </div>
      </div>
      <figcaption>Viu? Com o passar do tempo, mais e mais pessoas conquistaram o direito de participar da política. Isso é a <b>ampliação da participação política</b>.</figcaption>
    </figure>
  );
}

/* ------------------------- 5. Os três poderes ------------------------- */

const poderes = [
  { id: "legislativo", nome: "Legislativo", emoji: "📜", faz: "Faz as leis", quem: "Deputados, senadores e vereadores", x: 150, y: 50 },
  { id: "executivo", nome: "Executivo", emoji: "🏛️", faz: "Governa e coloca as leis em prática", quem: "Presidente, governadores e prefeitos", x: 58, y: 200 },
  { id: "judiciario", nome: "Judiciário", emoji: "⚖️", faz: "Julga se as leis estão sendo cumpridas", quem: "Juízes e tribunais", x: 242, y: 200 },
];

export function TresPoderes() {
  const [sel, setSel] = useState(0);
  const p = poderes[sel];
  return (
    <figure className="k-vis">
      <div className="k-levels">
        <svg viewBox="0 0 300 280" role="img" aria-label="Triângulo dos três poderes: Legislativo, Executivo e Judiciário, que fiscalizam uns aos outros">
          {[[0, 1], [1, 2], [2, 0]].map(([a, b]) => (
            <line key={`${a}${b}`} x1={poderes[a].x} y1={poderes[a].y} x2={poderes[b].x} y2={poderes[b].y} stroke="#d8c3b0" strokeWidth="6" strokeDasharray="2 10" strokeLinecap="round" className="k-pipe-flow" />
          ))}
          <text x="150" y="150" textAnchor="middle" fontSize="12" fontWeight="800" fill="#8a3a19">um fiscaliza</text>
          <text x="150" y="166" textAnchor="middle" fontSize="12" fontWeight="800" fill="#8a3a19">o outro 👀</text>
          {poderes.map((x, i) => (
            <g key={x.id} onClick={() => setSel(i)} style={{ cursor: "pointer" }}>
              <motion.circle cx={x.x} cy={x.y} r="40" fill={i === sel ? "var(--accent)" : "#fff"} stroke="var(--accent)" strokeWidth="3" animate={{ scale: i === sel ? 1.1 : 1 }} />
              <text x={x.x} y={x.y + 4} textAnchor="middle" fontSize="28" pointerEvents="none">{x.emoji}</text>
              <text x={x.x} y={x.y + 58} textAnchor="middle" fontSize="13" fontWeight="900" fill="#2e1d10" pointerEvents="none">{x.nome}</text>
            </g>
          ))}
        </svg>
        <AnimatePresence mode="wait">
          <motion.div key={sel} className="k-levels-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <b>{p.emoji} Poder {p.nome}</b>
            <p><b>O que faz:</b> {p.faz}.</p>
            <p><b>Quem faz parte:</b> {p.quem}.</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <figcaption>A ideia dos três poderes independentes inspirou a Revolução Francesa e as democracias de hoje: ninguém manda sozinho, e um poder vigia o outro.</figcaption>
    </figure>
  );
}

/* ------------------------- 6. Linha do tempo (genérica) ------------------------- */

export type Evento = { ano: string; titulo: string; texto: string; emoji: string; tom?: "luta" | "lei" | "fato" };

export function LinhaHistoria({ eventos, titulo }: { eventos: Evento[]; titulo?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [tocando, setTocando] = useState(false);
  useEffect(() => {
    if (!tocando) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % eventos.length), 3500);
    return () => window.clearInterval(id);
  }, [tocando, eventos.length]);
  const ev = eventos[i];
  return (
    <figure className="k-vis">
      {titulo && <b className="k-vis-title">{titulo}</b>}
      <div className="k-htl" role="tablist" aria-label="Linha do tempo">
        <div className="k-htl-line"><motion.i animate={{ width: `${(i / Math.max(1, eventos.length - 1)) * 100}%` }} transition={{ duration: reduce ? 0 : 0.5 }} /></div>
        {eventos.map((e, k) => (
          <button key={e.ano + e.titulo} role="tab" aria-selected={k === i} className={`k-htl-dot ${k === i ? "on" : ""} ${k < i ? "past" : ""} ${e.tom ?? ""}`} onClick={() => { setI(k); setTocando(false); }}>
            <span aria-hidden="true">{e.emoji}</span>
            <small>{e.ano}</small>
          </button>
        ))}
      </div>
      <div className="k-vis-panel">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <b>{ev.emoji} {ev.ano} — {ev.titulo}</b>
            <p>{ev.texto}</p>
          </motion.div>
        </AnimatePresence>
        <div className="k-vis-controls">
          <button className="k-btn ghost" onClick={() => { setI((i + eventos.length - 1) % eventos.length); setTocando(false); }} aria-label="Anterior">◀</button>
          <button className="k-btn ghost" onClick={() => setTocando(!tocando)} aria-label={tocando ? "Pausar" : "Tocar"}>{tocando ? <Pause size={15} /> : <Play size={15} />}</button>
          <button className="k-btn ghost" onClick={() => { setI((i + 1) % eventos.length); setTocando(false); }} aria-label="Próximo">▶</button>
        </div>
      </div>
      <figcaption>Toque nos marcos da linha do tempo ou aperte ▶ para ver em ordem.</figcaption>
    </figure>
  );
}

/* ------------------------- 7. Quase 400 anos ------------------------- */

export function QuaseQuatrocentos() {
  const total = 2026 - 1500;
  const esc = 1888 - 1500;
  return (
    <figure className="k-vis k-vis-plain">
      <div className="k-span" role="img" aria-label={`De 1500 a 1888: ${esc} anos de escravidão legal. De 1888 a 2026: ${2026 - 1888} anos sem escravidão.`}>
        <motion.div className="k-span-a" initial={{ width: 0 }} whileInView={{ width: `${(esc / total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }}>
          <span>⛓️ {esc} anos</span>
        </motion.div>
        <motion.div className="k-span-b" initial={{ width: 0 }} whileInView={{ width: `${((2026 - 1888) / total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}>
          <span>{2026 - 1888} anos</span>
        </motion.div>
      </div>
      <div className="k-span-axis"><span>1500</span><span>1888</span><span>2026</span></div>
      <figcaption>A escravidão foi permitida por lei no Brasil por quase <b>400 anos</b> (de 1500 a 1888). O tempo <b>sem</b> escravidão ainda é bem menor. Por isso os efeitos do racismo ainda aparecem hoje: é o <b>racismo estrutural</b>.</figcaption>
    </figure>
  );
}

/* ------------------------- 8. As leis: no papel x na prática ------------------------- */

const leis = [
  { ano: "1871", nome: "Lei do Ventre Livre", papel: "Os filhos de mulheres escravizadas nasceriam livres.", pratica: "As crianças ficavam com os senhores de suas mães até os 8 anos e podiam ser obrigadas a trabalhar até os 21 anos." },
  { ano: "1885", nome: "Lei do Sexagenário", papel: "Pessoas escravizadas com mais de 60 anos ficariam livres.", pratica: "Poucas chegavam aos 60 anos por causa da vida tão dura, e os libertos ainda tinham que trabalhar alguns anos para “indenizar” os senhores." },
  { ano: "1888", nome: "Lei Áurea", papel: "A escravidão acabou: todas as pessoas escravizadas ficaram livres.", pratica: "Não houve nenhum apoio aos libertos: ficaram sem terra, sem trabalho e sem ajuda. O Brasil foi o último país da América a abolir a escravidão." },
];

export function LeisPapelPratica() {
  const [virada, setVirada] = useState<number[]>([]);
  return (
    <figure className="k-vis">
      <div className="k-flipgrid">
        {leis.map((l, i) => {
          const v = virada.includes(i);
          return (
            <button key={l.ano} className="k-flip-card" onClick={() => setVirada(v ? virada.filter((x) => x !== i) : [...virada, i])} aria-pressed={v}>
              <motion.div className="k-flip-inner" animate={{ rotateY: v ? 180 : 0 }} transition={{ duration: 0.5 }}>
                <div className="k-flip-face front">
                  <span className="k-flip-year">{l.ano}</span>
                  <b>{l.nome}</b>
                  <p>📄 <b>No papel:</b> {l.papel}</p>
                  <small>Toque para ver o que aconteceu na prática ↻</small>
                </div>
                <div className="k-flip-face back">
                  <span className="k-flip-year">{l.ano}</span>
                  <b>{l.nome}</b>
                  <p>👀 <b>Na prática:</b> {l.pratica}</p>
                  <small>Toque para voltar ↻</small>
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
      <figcaption>O fim da escravidão foi <b>lento e gradual</b>: as elites que lucravam com a escravidão tentaram atrasar ao máximo.</figcaption>
    </figure>
  );
}

/* ------------------------- 9. Modelo biomédico x modelo social ------------------------- */

const barreiras = [
  { id: "escada", antes: "🪜 Só escada na entrada", depois: "♿ Rampa e elevador", emoji: "🛗" },
  { id: "placa", antes: "🪧 Placa só com letras", depois: "⠿ Placa em braille e piso tátil", emoji: "🦯" },
  { id: "aula", antes: "🗣️ Aula só falada", depois: "🤟 Intérprete de Libras", emoji: "🤟" },
  { id: "porta", antes: "🚪 Porta estreita", depois: "🚪↔️ Porta larga", emoji: "🚪" },
  { id: "atitude", antes: "😒 Preconceito (capacitismo)", depois: "🤝 Respeito e convivência", emoji: "🤝" },
];

export function RemoveBarreiras() {
  const [modelo, setModelo] = useState<"biomedico" | "social">("biomedico");
  const [removidas, setRemovidas] = useState<string[]>([]);
  const pct = Math.round((removidas.length / barreiras.length) * 100);

  return (
    <figure className="k-vis">
      <div className="k-toggle" role="group" aria-label="Modelo">
        <button className={modelo === "biomedico" ? "on" : ""} onClick={() => setModelo("biomedico")}>🩺 Modelo biomédico</button>
        <button className={modelo === "social" ? "on" : ""} onClick={() => setModelo("social")}>🏙️ Modelo social</button>
      </div>
      <AnimatePresence mode="wait">
        {modelo === "biomedico" ? (
          <motion.div key="bio" className="k-model-box bio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="k-model-scene" aria-hidden="true">
              <span className="k-model-person">🧑‍🦽</span>
              <span className="k-model-arrow">➜ ❓ ➜</span>
              <span className="k-model-stairs">🏫<br />🪜🪜🪜</span>
            </div>
            <p><b>Ideia antiga:</b> a deficiência era vista como um problema só da pessoa, uma doença a ser tratada. <b>A pessoa é que precisava se adaptar</b> à sociedade, e as escadas continuavam lá.</p>
          </motion.div>
        ) : (
          <motion.div key="soc" className="k-model-box soc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p><b>Ideia de hoje:</b> é a <b>sociedade</b> que precisa tirar as barreiras para que todos participem. Toque em cada barreira para removê-la!</p>
            <div className="k-barriers">
              {barreiras.map((b) => {
                const ok = removidas.includes(b.id);
                return (
                  <motion.button key={b.id} layout className={`k-barrier ${ok ? "ok" : ""}`} onClick={() => setRemovidas(ok ? removidas.filter((x) => x !== b.id) : [...removidas, b.id])} whileTap={{ scale: 0.95 }}>
                    <AnimatePresence mode="wait">
                      <motion.span key={ok ? "d" : "a"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                        {ok ? `✅ ${b.depois}` : `⛔ ${b.antes}`}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
            <div className="k-meter-row">
              <span>Escola inclusiva</span>
              <div className="k-meter"><motion.i animate={{ width: `${pct}%` }} /></div>
              <b>{pct}%</b>
            </div>
            {pct === 100 && <p className="k-burger-done">🎉 Sem barreiras, todas as pessoas podem participar! É isso que a Convenção de 2006 defende.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
