// Jogos de revisão: memória, forca, ligar pontos, palavras cruzadas e o labirinto das tempestades.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Heart, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { sayEnglish } from "./ui";

function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =============================== 1. Jogo da memória =============================== */

type Carta = { id: number; par: number; texto: string; ingles: boolean };

/** pares: [inglês, português] */
export function JogoMemoria({ pares, titulo }: { pares: Array<[string, string]>; titulo?: string }) {
  const novoBaralho = useCallback(
    () => embaralhar(pares.flatMap(([en, pt], i) => [{ id: i * 2, par: i, texto: en, ingles: true }, { id: i * 2 + 1, par: i, texto: pt, ingles: false }] as Carta[])),
    [pares],
  );
  const [cartas, setCartas] = useState<Carta[]>(novoBaralho);
  const [abertas, setAbertas] = useState<number[]>([]);
  const [achados, setAchados] = useState<number[]>([]);
  const [jogadas, setJogadas] = useState(0);
  const [som, setSom] = useState(true);

  const virar = (idx: number) => {
    const c = cartas[idx];
    if (abertas.length === 2 || abertas.includes(idx) || achados.includes(c.par)) return;
    if (som && c.ingles) sayEnglish(c.texto);
    const novas = [...abertas, idx];
    setAbertas(novas);
    if (novas.length === 2) {
      setJogadas((j) => j + 1);
      const [a, b] = novas.map((i) => cartas[i]);
      window.setTimeout(() => {
        if (a.par === b.par) setAchados((x) => [...x, a.par]);
        setAbertas([]);
      }, a.par === b.par ? 450 : 1000);
    }
  };

  const recomecar = () => { setCartas(novoBaralho()); setAbertas([]); setAchados([]); setJogadas(0); };
  const venceu = achados.length === pares.length;

  return (
    <figure className="k-vis k-game">
      <div className="k-game-head">
        <b>🃏 {titulo ?? "Jogo da memória"}</b>
        <span>Pares: {achados.length}/{pares.length} · Jogadas: {jogadas}</span>
      </div>
      <p className="k-vis-help">Encontre os pares: a palavra em <b>inglês</b> e a tradução em <b>português</b>.</p>
      <div className="k-memory" style={{ "--n": Math.min(6, Math.ceil(Math.sqrt(pares.length * 2))) } as React.CSSProperties}>
        {cartas.map((c, i) => {
          const aberta = abertas.includes(i) || achados.includes(c.par);
          return (
            <button key={c.id} className={`k-mcard ${achados.includes(c.par) ? "found" : ""}`} onClick={() => virar(i)} aria-label={aberta ? c.texto : "Carta virada"}>
              <motion.div className="k-mcard-inner" animate={{ rotateY: aberta ? 180 : 0 }} transition={{ duration: 0.35 }}>
                <div className="k-mcard-face back">?</div>
                <div className={`k-mcard-face front ${c.ingles ? "en" : "pt"}`}>
                  <small>{c.ingles ? "🇬🇧" : "🇧🇷"}</small>
                  <span lang={c.ingles ? "en" : "pt"}>{c.texto}</span>
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
      <div className="k-actions">
        <button className="k-btn ghost" onClick={recomecar}><RotateCcw size={15} /> Embaralhar de novo</button>
        <button className="k-btn ghost" onClick={() => setSom(!som)} aria-pressed={som}>{som ? <Volume2 size={15} /> : <VolumeX size={15} />} {som ? "Falando em inglês" : "Sem som"}</button>
        {venceu && <span className="k-score">🎉 Você achou todos os pares em {jogadas} jogadas!</span>}
      </div>
    </figure>
  );
}

/* =================================== 2. Forca =================================== */

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Forca({ palavras, titulo }: { palavras: Array<{ palavra: string; dica: string; pt: string }>; titulo?: string }) {
  const [ordem, setOrdem] = useState(() => embaralhar(palavras.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [chutes, setChutes] = useState<string[]>([]);
  const [pontos, setPontos] = useState(0);
  const atual = palavras[ordem[pos % ordem.length]];
  const alvo = atual.palavra.toUpperCase();
  const erros = chutes.filter((l) => !alvo.includes(l)).length;
  const MAX = 6;
  const ganhou = alvo.split("").every((l) => !/[A-Z]/.test(l) || chutes.includes(l));
  const perdeu = erros >= MAX;
  const fim = ganhou || perdeu;

  useEffect(() => { if (ganhou) { setPontos((p) => p + 1); sayEnglish(atual.palavra); } }, [ganhou]); // eslint-disable-line react-hooks/exhaustive-deps

  const chutar = (l: string) => { if (!fim && !chutes.includes(l)) setChutes([...chutes, l]); };
  const proxima = () => {
    if (pos + 1 >= ordem.length) { setOrdem(embaralhar(palavras.map((_, i) => i))); setPos(0); }
    else setPos(pos + 1);
    setChutes([]);
  };

  return (
    <figure className="k-vis k-game" tabIndex={0} onKeyDown={(e) => { const l = e.key.toUpperCase(); if (/^[A-Z]$/.test(l)) chutar(l); }}>
      <div className="k-game-head">
        <b>🪢 {titulo ?? "Forca em inglês"}</b>
        <span>Palavra {pos + 1}/{palavras.length} · Acertos: {pontos}</span>
      </div>
      <div className="k-hang">
        <svg viewBox="0 0 120 130" className="k-hang-svg" role="img" aria-label={`${erros} erros de ${MAX}`}>
          <path d="M10 125 H70 M30 125 V8 H80 V22" stroke="#8a6a3d" strokeWidth="5" fill="none" strokeLinecap="round" />
          {erros > 0 && <circle cx="80" cy="34" r="12" stroke="#333" strokeWidth="4" fill="#ffe9b8" />}
          {erros > 1 && <line x1="80" y1="46" x2="80" y2="80" stroke="#333" strokeWidth="4" strokeLinecap="round" />}
          {erros > 2 && <line x1="80" y1="56" x2="66" y2="70" stroke="#333" strokeWidth="4" strokeLinecap="round" />}
          {erros > 3 && <line x1="80" y1="56" x2="94" y2="70" stroke="#333" strokeWidth="4" strokeLinecap="round" />}
          {erros > 4 && <line x1="80" y1="80" x2="68" y2="100" stroke="#333" strokeWidth="4" strokeLinecap="round" />}
          {erros > 5 && <line x1="80" y1="80" x2="92" y2="100" stroke="#333" strokeWidth="4" strokeLinecap="round" />}
        </svg>
        <div className="k-hang-main">
          <p className="k-hang-hint">💡 Dica: <b>{atual.dica}</b></p>
          <div className="k-hang-word" lang="en" aria-live="polite">
            {alvo.split("").map((l, i) => (
              <span key={i} className={l === " " ? "space" : ""}>{/[A-Z]/.test(l) ? (chutes.includes(l) || perdeu ? l : "") : l}</span>
            ))}
          </div>
          <p className="k-hang-lives">Erros: {erros}/{MAX}</p>
        </div>
      </div>
      {!fim ? (
        <div className="k-keyboard">
          {LETRAS.map((l) => (
            <button key={l} disabled={chutes.includes(l)} className={chutes.includes(l) ? (alvo.includes(l) ? "hit" : "miss") : ""} onClick={() => chutar(l)}>{l}</button>
          ))}
        </div>
      ) : (
        <div className={`k-hang-result ${ganhou ? "win" : "lose"}`}>
          <p>{ganhou ? "🎉 Acertou!" : "😅 Não foi dessa vez."} A palavra é <b lang="en">{atual.palavra}</b> = {atual.pt}.</p>
          <div className="k-actions">
            <button className="k-btn ghost" onClick={() => sayEnglish(atual.palavra)}><Volume2 size={15} /> Ouvir</button>
            <button className="k-btn" onClick={proxima}>Próxima palavra ➜</button>
          </div>
        </div>
      )}
    </figure>
  );
}

/* ================================= 3. Ligar os pontos ================================= */

export function LigarPontos({ esquerda, direita, certo, titulo }: { esquerda: string[]; direita: string[]; certo: number[]; titulo?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const pontosE = useRef<Array<HTMLSpanElement | null>>([]);
  const pontosD = useRef<Array<HTMLSpanElement | null>>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [ligacoes, setLigacoes] = useState<Record<number, number>>({});
  const [conferido, setConferido] = useState(false);
  const [linhas, setLinhas] = useState<Array<{ e: number; x1: number; y1: number; x2: number; y2: number }>>([]);

  const medir = useCallback(() => {
    const box = caixa.current?.getBoundingClientRect();
    if (!box) return;
    setLinhas(Object.entries(ligacoes).flatMap(([e, d]) => {
      const a = pontosE.current[+e]?.getBoundingClientRect();
      const b = pontosD.current[d]?.getBoundingClientRect();
      if (!a || !b) return [];
      return [{ e: +e, x1: a.left + a.width / 2 - box.left, y1: a.top + a.height / 2 - box.top, x2: b.left + b.width / 2 - box.left, y2: b.top + b.height / 2 - box.top }];
    }));
  }, [ligacoes]);

  useLayoutEffect(() => { medir(); }, [medir]);
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [medir]);

  const escolherDireita = (d: number) => {
    if (sel === null) return;
    const novo = { ...ligacoes };
    for (const k of Object.keys(novo)) if (novo[+k] === d) delete novo[+k];
    novo[sel] = d;
    setLigacoes(novo);
    setSel(null);
    setConferido(false);
  };
  const acertos = esquerda.filter((_, i) => ligacoes[i] === certo[i]).length;

  return (
    <figure className="k-vis k-game">
      <div className="k-game-head">
        <b>🔗 {titulo ?? "Ligue os pontos"}</b>
        <span>{Object.keys(ligacoes).length}/{esquerda.length} ligados</span>
      </div>
      <p className="k-vis-help">Toque em um item da <b>esquerda</b> e depois no par certo da <b>direita</b>.</p>
      <div className="k-match" ref={caixa}>
        <svg className="k-match-lines" aria-hidden="true">
          {linhas.map((l) => (
            <line key={l.e} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className={conferido ? (ligacoes[l.e] === certo[l.e] ? "ok" : "bad") : ""} />
          ))}
        </svg>
        <div className="k-match-col">
          {esquerda.map((t, i) => (
            <button key={t} className={`k-match-item ${sel === i ? "on" : ""} ${ligacoes[i] !== undefined ? "linked" : ""}`} onClick={() => setSel(sel === i ? null : i)}>
              <span>{t}</span>
              <span className="k-dot-pt" ref={(el) => { pontosE.current[i] = el; }} />
            </button>
          ))}
        </div>
        <div className="k-match-col right">
          {direita.map((t, d) => (
            <button key={t} className={`k-match-item ${Object.values(ligacoes).includes(d) ? "linked" : ""}`} onClick={() => escolherDireita(d)} disabled={sel === null}>
              <span className="k-dot-pt" ref={(el) => { pontosD.current[d] = el; }} />
              <span>{t}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="k-actions">
        <button className="k-btn" onClick={() => setConferido(true)} disabled={Object.keys(ligacoes).length === 0}>Conferir</button>
        <button className="k-btn ghost" onClick={() => { setLigacoes({}); setConferido(false); setSel(null); }}><RotateCcw size={15} /> Limpar</button>
        {conferido && <span className="k-score" aria-live="polite">{acertos}/{esquerda.length} corretas {acertos === esquerda.length ? "🎉" : ""}</span>}
      </div>
    </figure>
  );
}

/* =============================== 4. Palavras cruzadas =============================== */

type PalavraCruzada = { resposta: string; dica: string; linha: number; coluna: number; direcao: string };

export function Cruzadinha({ dados, titulo }: { dados: { linhas: number; colunas: number; palavras: PalavraCruzada[] }; titulo?: string }) {
  const { linhas, colunas, palavras } = dados;
  const mapa = useMemo(() => {
    const m = new Map<string, { letra: string; num?: number; palavras: number[] }>();
    const inicios = [...palavras.map((p, i) => ({ p, i }))].sort((a, b) => a.p.linha - b.p.linha || a.p.coluna - b.p.coluna);
    let n = 0;
    const numeros = new Map<string, number>();
    for (const { p } of inicios) {
      const k = `${p.linha},${p.coluna}`;
      if (!numeros.has(k)) numeros.set(k, ++n);
    }
    palavras.forEach((p, i) => {
      for (let j = 0; j < p.resposta.length; j++) {
        const r = p.linha + (p.direcao === "v" ? j : 0);
        const c = p.coluna + (p.direcao === "h" ? j : 0);
        const k = `${r},${c}`;
        const cel = m.get(k) ?? { letra: p.resposta[j], palavras: [] };
        cel.palavras.push(i);
        if (j === 0) cel.num = numeros.get(k);
        m.set(k, cel);
      }
    });
    return { m, numeros };
  }, [palavras]);

  const [valores, setValores] = useState<Record<string, string>>({});
  const [ativa, setAtiva] = useState(0);
  const [conferido, setConferido] = useState(false);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  const celulasDa = (i: number) => {
    const p = palavras[i];
    return Array.from({ length: p.resposta.length }, (_, j) => `${p.linha + (p.direcao === "v" ? j : 0)},${p.coluna + (p.direcao === "h" ? j : 0)}`);
  };
  const focar = (k: string) => refs.current[k]?.focus();

  const digitar = (k: string, v: string) => {
    const letra = v.toUpperCase().replace(/[^A-Z]/g, "").slice(-1);
    setValores((x) => ({ ...x, [k]: letra }));
    setConferido(false);
    if (letra) {
      const cel = celulasDa(ativa);
      const idx = cel.indexOf(k);
      if (idx >= 0 && idx < cel.length - 1) focar(cel[idx + 1]);
    }
  };

  const numeroDa = (i: number) => mapa.numeros.get(`${palavras[i].linha},${palavras[i].coluna}`);
  const completas = palavras.filter((_, i) => celulasDa(i).every((k) => valores[k] === mapa.m.get(k)!.letra)).length;
  const grupo = (d: string) => palavras.map((p, i) => ({ p, i })).filter(({ p }) => p.direcao === d).sort((a, b) => (numeroDa(a.i) ?? 0) - (numeroDa(b.i) ?? 0));

  return (
    <figure className="k-vis k-game">
      <div className="k-game-head">
        <b>✏️ {titulo ?? "Palavras cruzadas"}</b>
        <span>{completas}/{palavras.length} palavras</span>
      </div>
      <p className="k-vis-help">Escreva em <b>inglês</b> a palavra de cada dica. Toque numa dica para ir até ela.</p>
      <div className="k-cross-wrap">
        <div className="k-cross" style={{ gridTemplateColumns: `repeat(${colunas}, 1fr)`, "--cols": colunas } as React.CSSProperties}>
          {Array.from({ length: linhas * colunas }, (_, idx) => {
            const r = Math.floor(idx / colunas);
            const c = idx % colunas;
            const k = `${r},${c}`;
            const cel = mapa.m.get(k);
            if (!cel) return <div key={k} className="k-cross-cell empty" />;
            const naAtiva = celulasDa(ativa).includes(k);
            const errado = conferido && valores[k] && valores[k] !== cel.letra;
            const certo = conferido && valores[k] === cel.letra;
            return (
              <div key={k} className={`k-cross-cell ${naAtiva ? "active" : ""} ${errado ? "bad" : ""} ${certo ? "ok" : ""}`}>
                {cel.num && <small>{cel.num}</small>}
                <input
                  ref={(el) => { refs.current[k] = el; }}
                  value={valores[k] ?? ""}
                  onChange={(e) => digitar(k, e.target.value)}
                  onFocus={() => { if (!cel.palavras.includes(ativa)) setAtiva(cel.palavras[0]); }}
                  onClick={() => { if (cel.palavras.length > 1 && cel.palavras.includes(ativa)) setAtiva(cel.palavras.find((p) => p !== ativa)!); }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !valores[k]) {
                      const cl = celulasDa(ativa); const ix = cl.indexOf(k);
                      if (ix > 0) focar(cl[ix - 1]);
                    }
                  }}
                  maxLength={2}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={`Linha ${r + 1}, coluna ${c + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="k-cross-clues">
        {(["h", "v"] as const).map((d) => (
          <div key={d}>
            <b>{d === "h" ? "➡️ Horizontais" : "⬇️ Verticais"}</b>
            <ol>
              {grupo(d).map(({ p, i }) => (
                <li key={i} className={i === ativa ? "on" : ""}>
                  <button onClick={() => { setAtiva(i); focar(celulasDa(i)[0]); }}>
                    <span>{numeroDa(i)}.</span> {p.dica} <small>({p.resposta.length} letras)</small>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <div className="k-actions">
        <button className="k-btn" onClick={() => setConferido(true)}>Conferir</button>
        <button className="k-btn ghost" onClick={() => { const v: Record<string, string> = {}; mapa.m.forEach((cel, k) => { v[k] = cel.letra; }); setValores(v); setConferido(true); }}>Mostrar respostas</button>
        <button className="k-btn ghost" onClick={() => { setValores({}); setConferido(false); }}><RotateCcw size={15} /> Limpar</button>
        {completas === palavras.length && <span className="k-score">🎉 Cruzadinha completa!</span>}
      </div>
    </figure>
  );
}

/* ========================= 5. Labirinto: fuja das tempestades ========================= */

const MAPA = [
  "#####A#######",
  "#...........#",
  "#.##.###.##.#",
  "#.#.......#.#",
  "B.#.##.##.#.C",
  "#.....#.....#",
  "###.#...#.###",
  "#...#.#.#...#",
  "#.#...#...#.#",
  "#.#.##.##.#.#",
  "#...........#",
  "#.##.#.#.##.#",
  "#D#########E#",
];
const N = 13;
const SAIDAS = "ABCDE";
type Pos = { r: number; c: number };
type Dir = "up" | "down" | "left" | "right";
const DELTA: Record<Dir, [number, number]> = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
const INICIO: Pos = { r: 6, c: 6 };
const MONSTROS_INICIO: Pos[] = [{ r: 1, c: 1 }, { r: 1, c: 11 }, { r: 10, c: 11 }];
const MONSTROS = ["🌪️", "⛈️", "🌀"];
const cel = (p: Pos) => MAPA[p.r]?.[p.c];
const livre = (p: Pos) => { const ch = cel(p); return ch !== undefined && ch !== "#"; };
const ehSaida = (p: Pos) => SAIDAS.includes(cel(p) ?? "#");
const passo = (p: Pos, d: Dir): Pos => ({ r: p.r + DELTA[d][0], c: p.c + DELTA[d][1] });
const pontosIniciais = () => {
  const s = new Set<string>();
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (MAPA[r][c] === ".") s.add(`${r},${c}`);
  s.delete(`${INICIO.r},${INICIO.c}`);
  return s;
};

export type RodadaLabirinto = { pergunta: string; opcoes: string[]; certa: number };

export function LabirintoTempestades({ rodadas }: { rodadas: RodadaLabirinto[] }) {
  const [rodada, setRodada] = useState(0);
  const [estado, setEstado] = useState<"pronto" | "jogando" | "pego" | "errou" | "acertou" | "venceu" | "perdeu">("pronto");
  const [vidas, setVidas] = useState(3);
  const [pontos, setPontos] = useState(0);
  const [, render] = useState(0);
  const jogador = useRef<Pos>({ ...INICIO });
  const dir = useRef<Dir | null>(null);
  const monstros = useRef<Pos[]>(MONSTROS_INICIO.map((p) => ({ ...p })));
  const ultimaDir = useRef<Dir[]>(["right", "left", "left"]);
  const comidos = useRef<Set<string>>(pontosIniciais());
  const tick = useRef(0);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const tabuleiro = useRef<HTMLDivElement>(null);

  // Cada rodada embaralha a ordem das respostas nas 5 saídas.
  const saidasDaRodada = useMemo(() => {
    const ordem = embaralhar([0, 1, 2, 3, 4]);
    return SAIDAS.split("").map((letra, i) => ({ letra, opcao: ordem[i] }));
  }, [rodada]); // eslint-disable-line react-hooks/exhaustive-deps
  const q = rodadas[rodada];

  const reposicionar = () => {
    jogador.current = { ...INICIO };
    dir.current = null;
    monstros.current = MONSTROS_INICIO.map((p) => ({ ...p }));
  };

  const iniciarRodada = (n: number) => {
    setRodada(n);
    reposicionar();
    comidos.current = pontosIniciais();
    setEstado("jogando");
    tabuleiro.current?.focus();
  };

  const moverMonstros = () => {
    const prob = 0.4 + rodada * 0.1;
    monstros.current = monstros.current.map((m, i) => {
      const opcoes = (Object.keys(DELTA) as Dir[]).map((d) => ({ d, p: passo(m, d) })).filter(({ p }) => livre(p) && !ehSaida(p));
      const oposta: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
      const semVolta = opcoes.length > 1 ? opcoes.filter((o) => o.d !== oposta[ultimaDir.current[i]]) : opcoes;
      let escolha = semVolta[Math.floor(Math.random() * semVolta.length)];
      if (Math.random() < prob) {
        escolha = semVolta.reduce((melhor, o) => {
          const dist = Math.abs(o.p.r - jogador.current.r) + Math.abs(o.p.c - jogador.current.c);
          const dm = Math.abs(melhor.p.r - jogador.current.r) + Math.abs(melhor.p.c - jogador.current.c);
          return dist < dm ? o : melhor;
        }, semVolta[0]);
      }
      ultimaDir.current[i] = escolha.d;
      return escolha.p;
    });
  };

  useEffect(() => {
    if (estado !== "jogando") return;
    const id = window.setInterval(() => {
      tick.current++;
      const antes = { ...jogador.current };
      if (dir.current) {
        const prox = passo(jogador.current, dir.current);
        if (livre(prox)) jogador.current = prox;
      }
      const k = `${jogador.current.r},${jogador.current.c}`;
      if (comidos.current.has(k)) { comidos.current.delete(k); setPontos((p) => p + 10); }

      const monstrosAntes = monstros.current.map((m) => ({ ...m }));
      const lento = rodada < 3 ? 3 : 2;
      if (tick.current % lento === 0) moverMonstros();

      const pego = monstros.current.some((m, i) =>
        (m.r === jogador.current.r && m.c === jogador.current.c) ||
        (m.r === antes.r && m.c === antes.c && monstrosAntes[i].r === jogador.current.r && monstrosAntes[i].c === jogador.current.c));

      if (pego) {
        setVidas((v) => { const nv = v - 1; setEstado(nv <= 0 ? "perdeu" : "pego"); return nv; });
      } else if (ehSaida(jogador.current)) {
        const letra = cel(jogador.current)!;
        const saida = saidasDaRodada.find((s) => s.letra === letra)!;
        if (saida.opcao === q.certa) {
          setPontos((p) => p + 100);
          setEstado(rodada + 1 >= rodadas.length ? "venceu" : "acertou");
        } else {
          setVidas((v) => { const nv = v - 1; setEstado(nv <= 0 ? "perdeu" : "errou"); return nv; });
        }
      }
      render((x) => x + 1);
    }, 170);
    return () => window.clearInterval(id);
  }, [estado, rodada, saidasDaRodada, q]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (estado !== "jogando") return;
    const tecla = (e: KeyboardEvent) => {
      const mapa: Record<string, Dir> = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
      const d = mapa[e.key];
      if (d) { e.preventDefault(); dir.current = d; }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [estado]);

  const continuar = () => { reposicionar(); setEstado("jogando"); };
  const reiniciarTudo = () => { setVidas(3); setPontos(0); iniciarRodada(0); };

  return (
    <figure className="k-vis k-game k-maze-game">
      <div className="k-game-head">
        <b>🌩️ Labirinto: fuja das tempestades!</b>
        <span>Rodada {Math.min(rodada + 1, rodadas.length)}/{rodadas.length} · {pontos} pts · {Array.from({ length: Math.max(0, vidas) }, (_, i) => <Heart key={i} size={14} fill="#e0573f" color="#e0573f" />)}</span>
      </div>
      <div className="k-maze-question">
        <b>Pergunta {rodada + 1}:</b> {q.pergunta}
      </div>
      <div className="k-maze-layout">
        <div
          className="k-maze"
          ref={tabuleiro}
          tabIndex={0}
          aria-label="Labirinto. Use as setas do teclado, deslize o dedo ou os botões para mover."
          onTouchStart={(e) => { toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchEnd={(e) => {
            if (!toque.current) return;
            const dx = e.changedTouches[0].clientX - toque.current.x;
            const dy = e.changedTouches[0].clientY - toque.current.y;
            if (Math.max(Math.abs(dx), Math.abs(dy)) > 20) dir.current = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
            toque.current = null;
          }}
        >
          {MAPA.flatMap((linha, r) => linha.split("").map((ch, c) => {
            const k = `${r},${c}`;
            const aqui = jogador.current.r === r && jogador.current.c === c;
            const m = monstros.current.findIndex((x) => x.r === r && x.c === c);
            const saida = SAIDAS.includes(ch) ? saidasDaRodada.find((s) => s.letra === ch) : null;
            return (
              <div key={k} className={`k-maze-cell ${ch === "#" ? "wall" : ""} ${saida ? "exit" : ""}`}>
                {saida && <span className="k-exit-badge">{ch}</span>}
                {ch === "." && comidos.current.has(k) && <i className="k-pellet" />}
                {m >= 0 && <span className="k-monster-ico">{MONSTROS[m]}</span>}
                {aqui && <span className="k-maze-hero">🧑‍🔬</span>}
              </div>
            );
          }))}
          <AnimatePresence>
            {estado !== "jogando" && (
              <motion.div className="k-maze-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                {estado === "pronto" && (<><p>Leia a pergunta, fuja das tempestades 🌪️⛈️🌀 e saia pela porta com a <b>resposta certa</b>!</p><button className="k-btn" onClick={() => iniciarRodada(0)}>▶ Começar</button></>)}
                {estado === "pego" && (<><p>⛈️ Uma tempestade te pegou! {vidas === 1 ? "Resta 1 vida" : `Restam ${vidas} vidas`}.</p><button className="k-btn" onClick={continuar}>Continuar</button></>)}
                {estado === "errou" && (<><p>🚪 Essa saída não tem a resposta certa. {vidas === 1 ? "Resta 1 vida" : `Restam ${vidas} vidas`}.</p><button className="k-btn" onClick={continuar}>Tentar de novo</button></>)}
                {estado === "acertou" && (<><p>🎉 Resposta certa: <b>{q.opcoes[q.certa]}</b>!</p><button className="k-btn" onClick={() => iniciarRodada(rodada + 1)}>Próxima rodada ➜</button></>)}
                {estado === "venceu" && (<><p>🏆 Você venceu as {rodadas.length} rodadas com {pontos} pontos!</p><button className="k-btn" onClick={reiniciarTudo}>Jogar de novo</button></>)}
                {estado === "perdeu" && (<><p>😅 Acabaram as vidas! Leia a pergunta de novo e tente outra vez.</p><div className="k-actions"><button className="k-btn" onClick={() => { setVidas(3); iniciarRodada(rodada); }}>Tentar esta rodada de novo</button><button className="k-btn ghost" onClick={reiniciarTudo}>Recomeçar do início</button></div></>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
          <ul className="k-exit-list">
            {saidasDaRodada.map((s) => (
              <li key={s.letra}><span className="k-exit-badge">{s.letra}</span> {q.opcoes[s.opcao]}</li>
            ))}
          </ul>
          <div className="k-dpad" aria-label="Controles">
            <button onClick={() => { dir.current = "up"; }} aria-label="Cima" className="up"><ArrowUp size={20} /></button>
            <button onClick={() => { dir.current = "left"; }} aria-label="Esquerda" className="left"><ArrowLeft size={20} /></button>
            <button onClick={() => { dir.current = "right"; }} aria-label="Direita" className="right"><ArrowRight size={20} /></button>
            <button onClick={() => { dir.current = "down"; }} aria-label="Baixo" className="down"><ArrowDown size={20} /></button>
          </div>
      </div>
      <figcaption>Use as <b>setas do teclado</b>, <b>deslize o dedo</b> no labirinto ou toque nos <b>botões</b>. Pegue as bolinhas para ganhar pontos. São {rodadas.length} rodadas e 3 vidas.</figcaption>
    </figure>
  );
}
