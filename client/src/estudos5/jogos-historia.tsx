// Jogos de História: linha do tempo em ordem, verdadeiro ou falso relâmpago, quem sou eu?, caça-palavras e simulado sorteado.
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Play, RotateCcw, Shuffle, Timer, X } from "lucide-react";
import type { QuizQuestion } from "./types";
import { Quiz } from "./ui";
import { load, save } from "./storage";

function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================ 1. Linha do tempo em ordem ============================ */

export type FatoDatado = { ano: number; rotulo?: string; emoji: string; texto: string };

/** Toque nos acontecimentos do MAIS ANTIGO para o MAIS RECENTE. A cada partida, sorteia `quantos` fatos da lista. */
export function OrdemCronologica({ fatos, titulo, quantos = 6 }: { fatos: FatoDatado[]; titulo?: string; quantos?: number }) {
  const sortear = useCallback(() => embaralhar(embaralhar(fatos).slice(0, Math.min(quantos, fatos.length))), [fatos, quantos]);
  const [mesa, setMesa] = useState<FatoDatado[]>(sortear);
  const [linha, setLinha] = useState<FatoDatado[]>([]);
  const [erros, setErros] = useState(0);
  const [tremer, setTremer] = useState<string | null>(null);

  const certa = useMemo(() => [...mesa].sort((a, b) => a.ano - b.ano), [mesa]);
  const fim = linha.length === mesa.length;

  const escolher = (f: FatoDatado) => {
    if (fim || linha.includes(f)) return;
    if (f === certa[linha.length] || f.ano === certa[linha.length].ano) setLinha([...linha, f]);
    else {
      setErros((e) => e + 1);
      setTremer(f.texto);
      window.setTimeout(() => setTremer(null), 450);
    }
  };
  const novaPartida = () => { setMesa(sortear()); setLinha([]); setErros(0); };

  return (
    <figure className="k-vis k-game">
      <div className="k-game-head">
        <b>🕰️ {titulo ?? "Coloque na ordem certa"}</b>
        <span>{linha.length}/{mesa.length} no lugar · Erros: {erros}</span>
      </div>
      <p className="k-vis-help">Toque nos acontecimentos do <b>mais antigo</b> para o <b>mais recente</b>. Eles vão entrando na linha do tempo.</p>
      <ol className="k-ordem-linha" aria-label="Linha do tempo montada">
        {mesa.map((_, i) => {
          const f = linha[i];
          return (
            <li key={i} className={f ? "on" : ""}>
              <span className="k-ordem-pos">{i + 1}º</span>
              {f ? (
                <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="k-ordem-fato">
                  <b>{f.rotulo ?? f.ano}</b> {f.emoji} {f.texto}
                </motion.span>
              ) : <span className="k-ordem-vazio">?</span>}
            </li>
          );
        })}
      </ol>
      {!fim && (
        <div className="k-ordem-mesa">
          {mesa.filter((f) => !linha.includes(f)).map((f) => (
            <motion.button key={f.texto} className="k-ordem-carta" onClick={() => escolher(f)} animate={tremer === f.texto ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
              <span aria-hidden="true">{f.emoji}</span> {f.texto}
            </motion.button>
          ))}
        </div>
      )}
      <div className="k-actions">
        <button className="k-btn ghost" onClick={novaPartida}><Shuffle size={15} /> Novos acontecimentos</button>
        {fim && <span className="k-score" aria-live="polite">{erros === 0 ? "🌟 Perfeito, sem nenhum erro!" : `🎉 Linha do tempo completa, com ${erros} ${erros === 1 ? "erro" : "erros"}.`}</span>}
      </div>
    </figure>
  );
}

/* ============================ 2. Verdadeiro ou falso relâmpago ============================ */

export type Afirmacao = { texto: string; verdade: boolean; porque: string };

const TEMPO_VF = 60;

export function VerdadeiroFalso({ id, afirmacoes, titulo }: { id: string; afirmacoes: Afirmacao[]; titulo?: string }) {
  const [fila, setFila] = useState<Afirmacao[]>(() => embaralhar(afirmacoes));
  const [pos, setPos] = useState(0);
  const [jogando, setJogando] = useState(false);
  const [tempo, setTempo] = useState(TEMPO_VF);
  const [pontos, setPontos] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [ultima, setUltima] = useState<{ certo: boolean; a: Afirmacao } | null>(null);
  const [erradas, setErradas] = useState<Afirmacao[]>([]);
  const [recorde, setRecorde] = useState<number>(() => load(`vf:${id}`, 0));

  const acabou = !jogando && tempo === 0;

  useEffect(() => {
    if (!jogando) return;
    const t = window.setInterval(() => setTempo((s) => {
      if (s <= 1) { window.clearInterval(t); setJogando(false); return 0; }
      return s - 1;
    }), 1000);
    return () => window.clearInterval(t);
  }, [jogando]);

  useEffect(() => {
    if (acabou && pontos > recorde) { setRecorde(pontos); save(`vf:${id}`, pontos); }
  }, [acabou]); // eslint-disable-line react-hooks/exhaustive-deps

  const comecar = () => { setFila(embaralhar(afirmacoes)); setPos(0); setTempo(TEMPO_VF); setPontos(0); setSequencia(0); setUltima(null); setErradas([]); setJogando(true); };

  const responder = (v: boolean) => {
    if (!jogando) return;
    const a = fila[pos % fila.length];
    const certo = a.verdade === v;
    setUltima({ certo, a });
    if (certo) { setPontos((p) => p + 1 + (sequencia >= 2 ? 1 : 0)); setSequencia((s) => s + 1); }
    else { setSequencia(0); setErradas((l) => (l.includes(a) ? l : [...l, a])); }
    if (pos + 1 >= fila.length) { setFila(embaralhar(afirmacoes)); setPos(0); } else setPos(pos + 1);
  };

  const atual = fila[pos % fila.length];

  return (
    <figure className="k-vis k-game" tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowLeft" || e.key.toLowerCase() === "v") responder(true); if (e.key === "ArrowRight" || e.key.toLowerCase() === "f") responder(false); }}>
      <div className="k-game-head">
        <b>⚡ {titulo ?? "Verdadeiro ou falso relâmpago"}</b>
        <span><Timer size={14} /> {tempo}s · Pontos: {pontos} · Recorde: {recorde}</span>
      </div>
      <div className="k-progress-track"><i style={{ width: `${(tempo / TEMPO_VF) * 100}%`, transition: "width 1s linear" }} /></div>

      {!jogando && !acabou && (
        <div className="k-vf-start">
          <p className="k-vis-help">Você tem <b>{TEMPO_VF} segundos</b> para responder ao máximo de frases. Acertou 3 seguidas? Cada acerto passa a valer <b>2 pontos</b>! 🔥</p>
          <button className="k-btn big" onClick={comecar}><Play size={16} /> Começar</button>
        </div>
      )}

      {jogando && (
        <>
          <motion.p key={atual.texto + pos} className="k-vf-frase" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>{atual.texto}</motion.p>
          <div className="k-vf-botoes">
            <button className="k-vf-btn v" onClick={() => responder(true)}><Check size={20} /> Verdadeiro</button>
            <button className="k-vf-btn f" onClick={() => responder(false)}><X size={20} /> Falso</button>
          </div>
          {sequencia >= 3 && <p className="k-vf-fogo">🔥 {sequencia} seguidas! Valendo 2 pontos!</p>}
          {ultima && (
            <p className={`k-feedback ${ultima.certo ? "right" : "wrong"}`}>
              <strong>{ultima.certo ? "Certo! " : "Ops! "}</strong>“{ultima.a.texto}” é <b>{ultima.a.verdade ? "verdadeira" : "falsa"}</b>. {ultima.a.porque}
            </p>
          )}
        </>
      )}

      {acabou && (
        <div className="k-vf-fim">
          <p className="k-vf-total">⏰ Tempo esgotado! Você fez <b>{pontos} pontos</b>. {pontos >= recorde && pontos > 0 ? "🏆 Novo recorde!" : ""}</p>
          {erradas.length > 0 && (
            <>
              <b>Reveja as que você errou:</b>
              <ul className="k-list">
                {erradas.map((a) => <li key={a.texto}><b>{a.verdade ? "✅ Verdadeira" : "❌ Falsa"}:</b> {a.texto} <i>{a.porque}</i></li>)}
              </ul>
            </>
          )}
          <div className="k-actions"><button className="k-btn" onClick={comecar}><RotateCcw size={15} /> Jogar de novo</button></div>
        </div>
      )}
    </figure>
  );
}

/* ==================================== 3. Quem sou eu? ==================================== */

export type Enigma = { resposta: string; emoji: string; pistas: string[]; explicacao: string };

/** Pistas aparecem uma de cada vez. Quanto menos pistas usar, mais pontos (3, 2 ou 1). */
export function QuemSouEu({ enigmas, titulo }: { enigmas: Enigma[]; titulo?: string }) {
  const [ordem, setOrdem] = useState(() => embaralhar(enigmas));
  const [pos, setPos] = useState(0);
  const [pistas, setPistas] = useState(1);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [pontos, setPontos] = useState(0);
  const atual = ordem[pos];
  const opcoes = useMemo(
    () => embaralhar([atual.resposta, ...embaralhar(enigmas.filter((e) => e.resposta !== atual.resposta)).slice(0, 3).map((e) => e.resposta)]),
    [atual, enigmas],
  );
  const fimRodada = escolha !== null;
  const acabouTudo = fimRodada && pos === ordem.length - 1;
  const vale = Math.max(1, 4 - pistas);

  const escolher = (r: string) => {
    if (fimRodada) return;
    setEscolha(r);
    if (r === atual.resposta) setPontos((p) => p + vale);
  };
  const proximo = () => { setPos(pos + 1); setPistas(1); setEscolha(null); };
  const recomecar = () => { setOrdem(embaralhar(enigmas)); setPos(0); setPistas(1); setEscolha(null); setPontos(0); };

  return (
    <figure className="k-vis k-game">
      <div className="k-game-head">
        <b>🕵️ {titulo ?? "Quem sou eu?"}</b>
        <span>Enigma {pos + 1}/{ordem.length} · Pontos: {pontos}</span>
      </div>
      <p className="k-vis-help">Leia as pistas e descubra quem (ou o quê) é. Acertando com <b>1 pista</b> vale 3 pontos; com 2, vale 2; com 3 ou mais, vale 1.</p>
      <ol className="k-qse-pistas">
        {atual.pistas.slice(0, fimRodada ? atual.pistas.length : pistas).map((p, i) => (
          <motion.li key={atual.resposta + i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <span>Pista {i + 1}</span> {p}
          </motion.li>
        ))}
      </ol>
      {!fimRodada && pistas < atual.pistas.length && (
        <button className="k-btn ghost" onClick={() => setPistas(pistas + 1)}>💡 Mais uma pista (vale menos pontos)</button>
      )}
      <div className="k-qse-opcoes">
        {opcoes.map((o) => {
          const estado = !fimRodada ? "" : o === atual.resposta ? "right" : o === escolha ? "wrong" : "dim";
          return <button key={o} className={`k-option ${estado}`} disabled={fimRodada} onClick={() => escolher(o)}><span>{o}</span></button>;
        })}
      </div>
      {fimRodada && (
        <p className={`k-feedback ${escolha === atual.resposta ? "right" : "wrong"}`}>
          <strong>{escolha === atual.resposta ? `Acertou! +${vale} ${vale === 1 ? "ponto" : "pontos"} ${atual.emoji} ` : `Era ${atual.resposta} ${atual.emoji}. `}</strong>
          {atual.explicacao}
        </p>
      )}
      <div className="k-actions">
        {fimRodada && !acabouTudo && <button className="k-btn" onClick={proximo}>Próximo enigma ➜</button>}
        {acabouTudo && <span className="k-score">🏁 Fim! Você fez {pontos} de {ordem.length * 3} pontos possíveis.</span>}
        <button className="k-btn ghost" onClick={recomecar}><RotateCcw size={15} /> Recomeçar</button>
      </div>
    </figure>
  );
}

/* ==================================== 4. Caça-palavras ==================================== */

const TAM = 12;
const ABC = "ABCDEFGHIJLMNOPQRSTUVXZ";
type Celula = { r: number; c: number };
type Colocada = { palavra: string; celulas: Celula[] };

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");

function montarGrade(palavras: string[]): { grade: string[][]; colocadas: Colocada[] } {
  const direcoes: Array<[number, number]> = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  for (let tentativa = 0; tentativa < 60; tentativa++) {
    const grade: string[][] = Array.from({ length: TAM }, () => Array(TAM).fill(""));
    const colocadas: Colocada[] = [];
    let ok = true;
    for (const original of [...palavras].sort((a, b) => b.length - a.length)) {
      const p = semAcento(original);
      let posta = false;
      for (let t = 0; t < 300 && !posta; t++) {
        const [dr, dc] = direcoes[Math.floor(Math.random() * direcoes.length)];
        const r0 = Math.floor(Math.random() * TAM);
        const c0 = Math.floor(Math.random() * TAM);
        const celulas = Array.from(p, (_, i) => ({ r: r0 + dr * i, c: c0 + dc * i }));
        if (celulas.some(({ r, c }, i) => r < 0 || c < 0 || r >= TAM || c >= TAM || (grade[r][c] && grade[r][c] !== p[i]))) continue;
        celulas.forEach(({ r, c }, i) => { grade[r][c] = p[i]; });
        colocadas.push({ palavra: original, celulas });
        posta = true;
      }
      if (!posta) { ok = false; break; }
    }
    if (!ok) continue;
    for (const linha of grade) for (let c = 0; c < TAM; c++) if (!linha[c]) linha[c] = ABC[Math.floor(Math.random() * ABC.length)];
    return { grade, colocadas };
  }
  throw new Error("Não foi possível montar o caça-palavras");
}

/** Toque na PRIMEIRA e na ÚLTIMA letra de cada palavra. A grade muda a cada partida. */
export function CacaPalavras({ palavras, titulo }: { palavras: string[]; titulo?: string }) {
  const [jogo, setJogo] = useState(() => montarGrade(palavras));
  const [inicio, setInicio] = useState<Celula | null>(null);
  const [achadas, setAchadas] = useState<string[]>([]);
  const [errou, setErrou] = useState(false);

  const chave = (c: Celula) => `${c.r},${c.c}`;
  const marcadas = new Set(jogo.colocadas.filter((p) => achadas.includes(p.palavra)).flatMap((p) => p.celulas.map(chave)));

  const tocar = (cel: Celula) => {
    if (!inicio) { setInicio(cel); setErrou(false); return; }
    const achou = jogo.colocadas.find((p) => {
      const a = p.celulas[0]; const b = p.celulas[p.celulas.length - 1];
      return (chave(a) === chave(inicio) && chave(b) === chave(cel)) || (chave(b) === chave(inicio) && chave(a) === chave(cel));
    });
    if (achou && !achadas.includes(achou.palavra)) setAchadas([...achadas, achou.palavra]);
    else if (chave(cel) !== chave(inicio)) setErrou(true);
    setInicio(null);
  };
  const novo = () => { setJogo(montarGrade(palavras)); setAchadas([]); setInicio(null); setErrou(false); };

  return (
    <figure className="k-vis k-game">
      <div className="k-game-head">
        <b>🔎 {titulo ?? "Caça-palavras"}</b>
        <span>{achadas.length}/{palavras.length} encontradas</span>
      </div>
      <p className="k-vis-help">Toque na <b>primeira</b> e depois na <b>última</b> letra da palavra. Elas podem estar na horizontal, na vertical ou na diagonal.</p>
      <div className="k-caca-wrap">
        <div className="k-caca" style={{ gridTemplateColumns: `repeat(${TAM}, 1fr)` }}>
          {jogo.grade.flatMap((linha, r) => linha.map((l, c) => {
            const k = `${r},${c}`;
            return (
              <button key={k} className={`k-caca-cel ${marcadas.has(k) ? "achada" : ""} ${inicio && chave(inicio) === k ? "inicio" : ""}`} onClick={() => tocar({ r, c })} aria-label={`Letra ${l}, linha ${r + 1}, coluna ${c + 1}`}>
                {l}
              </button>
            );
          }))}
        </div>
        <ul className="k-caca-lista">
          {palavras.map((p) => <li key={p} className={achadas.includes(p) ? "ok" : ""}>{achadas.includes(p) ? "✅" : "⬜"} {p}</li>)}
        </ul>
      </div>
      <div className="k-actions">
        <button className="k-btn ghost" onClick={novo}><Shuffle size={15} /> Nova grade</button>
        {errou && <span className="k-score">🤔 Não é uma palavra da lista. Tente de novo!</span>}
        {achadas.length === palavras.length && <span className="k-score">🎉 Você encontrou todas as palavras!</span>}
      </div>
    </figure>
  );
}

/* ==================================== 5. Simulado sorteado ==================================== */

/** Sorteia `quantas` questões de todos os assuntos. O sorteio fica salvo até o estudante pedir um novo. */
export function SimuladoSorteado({ id, bancos, quantas = 10, accent }: { id: string; bancos: Record<string, QuizQuestion[]>; quantas?: number; accent: string }) {
  const todas = useMemo(() => Object.entries(bancos).flatMap(([assunto, lista]) => lista.map((_, i) => `${assunto}#${i}`)), [bancos]);
  const sortear = useCallback(() => embaralhar(todas).slice(0, quantas), [todas, quantas]);
  const [chaves, setChaves] = useState<string[]>(() => {
    const salvas = load<string[]>(`simulado:${id}`, []);
    return salvas.length === quantas && salvas.every((k) => todas.includes(k)) ? salvas : sortear();
  });
  const [rodada, setRodada] = useState(0);

  useEffect(() => save(`simulado:${id}`, chaves), [id, chaves]);

  const questoes = chaves.map((k) => { const [assunto, i] = k.split("#"); return bancos[assunto][+i]; });
  const novo = () => { save(`quiz:${id}`, {}); setChaves(sortear()); setRodada((r) => r + 1); };

  return (
    <div className="k-simulado">
      <div className="k-simulado-head">
        <p>🎲 <b>{quantas} questões sorteadas</b> entre as {todas.length} do banco de História. Cada simulado é diferente!</p>
        <button className="k-btn" onClick={novo}><Shuffle size={15} /> Sortear novo simulado</button>
      </div>
      <Quiz key={rodada} id={id} questions={questoes} accent={accent} title="Simulado sorteado" />
    </div>
  );
}
