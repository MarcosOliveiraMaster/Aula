// Peças comuns da seção Math: números aleatórios, quiz com valores novos, desafios e entradas.
import { useMemo, useState, type ReactNode } from "react";
import { Check, RefreshCw, X } from "lucide-react";

export type Lang = "pt" | "en";
export const T = (lang: Lang, pt: ReactNode, en: ReactNode) => (lang === "pt" ? pt : en);
export const tx = (lang: Lang, pt: string, en: string) => (lang === "pt" ? pt : en);

/* ------------------------------- aleatório ------------------------------- */

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
export function embaralhar<T>(lista: T[]): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export const mdc = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mdc(b, a % b));

/** Formata número com vírgula (pt) ou ponto (en). */
export function fmt(n: number, lang: Lang, casas?: number) {
  const s = casas === undefined ? String(Math.round(n * 1000) / 1000) : n.toFixed(casas);
  return lang === "pt" ? s.replace(".", ",") : s;
}
/** Lê um número digitado com vírgula ou ponto. */
export function lerNumero(v: string): number | null {
  const s = v.trim().replace(/\s/g, "").replace(",", ".");
  if (!s || !/^-?\d*\.?\d+$/.test(s)) return null;
  return Number(s);
}
export const igual = (a: number | null, b: number) => a !== null && Math.abs(a - b) < 1e-6;

/** Gera alternativas distintas: a certa + erradas (completa com vizinhas se faltar). */
export function alternativas(certa: string, erradas: string[], extra: () => string): string[] {
  const set = new Set<string>([certa]);
  for (const e of erradas) if (e !== certa && set.size < 4) set.add(e);
  let guarda = 0;
  while (set.size < 4 && guarda++ < 50) set.add(extra());
  return Array.from(set);
}

export function useSemente() {
  const [semente, setSemente] = useState(0);
  return { semente, novo: () => setSemente((s) => s + 1) };
}

/* ---------------------------------- fração ---------------------------------- */

export function Frac({ n, d, inteiro }: { n: number | string; d: number | string; inteiro?: number | string }) {
  return (
    <span className="k-frac-wrap">
      {inteiro !== undefined && inteiro !== 0 && <span className="k-frac-int">{inteiro}</span>}
      <span className="k-frac"><span>{n}</span><span>{d}</span></span>
    </span>
  );
}

/* --------------------------------- desafio --------------------------------- */

export function Desafio({ titulo, nivel, lang, instrucao, onNovo, children }: { titulo: string; nivel?: string; lang: Lang; instrucao: ReactNode; onNovo?: () => void; children: ReactNode }) {
  return (
    <figure className="k-vis k-game k-desafio">
      <div className="k-game-head">
        <b>{lang === "pt" ? "🇧🇷" : "🇬🇧"} {titulo}</b>
        {nivel && <span className="k-nivel">{nivel}</span>}
      </div>
      <div className="k-vis-help">{instrucao}</div>
      {children}
      {onNovo && (
        <div className="k-actions">
          <button className="k-btn ghost" onClick={onNovo}><RefreshCw size={15} /> {tx(lang, "Outros números", "New numbers")}</button>
        </div>
      )}
    </figure>
  );
}

export function Resultado({ ok, lang, children }: { ok: boolean | null; lang: Lang; children?: ReactNode }) {
  if (ok === null) return null;
  return (
    <div className={`k-feedback ${ok ? "right" : "wrong"}`} aria-live="polite">
      <strong>{ok ? tx(lang, "Isso aí! 🎉 ", "Great job! 🎉 ") : tx(lang, "Ainda não. ", "Not yet. ")}</strong>
      {children}
    </div>
  );
}

export function CampoNumero({ valor, onChange, largura = 70, rotulo, estado }: { valor: string; onChange: (v: string) => void; largura?: number; rotulo: string; estado?: "ok" | "bad" | "" }) {
  return (
    <input
      className={`k-num ${estado ?? ""}`}
      style={{ width: largura }}
      inputMode="decimal"
      value={valor}
      aria-label={rotulo}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ------------------------------ quiz aleatório ------------------------------ */

export type QA = { q: ReactNode; figura?: ReactNode; certa: string; erradas: string[]; extra?: () => string; why: ReactNode };

export function QuizAleatorio({ titulo, lang, gerar }: { titulo: string; lang: Lang; gerar: Array<() => QA> }) {
  const { semente, novo } = useSemente();
  const perguntas = useMemo(
    () => gerar.map((g) => {
      const qa = g();
      const ops = embaralhar(alternativas(qa.certa, qa.erradas, qa.extra ?? (() => String(rnd(2, 99)))));
      return { ...qa, ops, answer: ops.indexOf(qa.certa) };
    }),
    [semente], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [escolhas, setEscolhas] = useState<Record<string, number>>({});
  const chave = (i: number) => `${semente}-${i}`;
  const acertos = perguntas.filter((p, i) => escolhas[chave(i)] === p.answer).length;

  return (
    <section className="k-quiz k-quiz-rand">
      <div className="k-quiz-head">
        <div>
          <span className="k-eyebrow">{tx(lang, "Quiz · os números mudam a cada vez", "Quiz · numbers change every time")}</span>
          <h2>{lang === "pt" ? "🇧🇷" : "🇬🇧"} {titulo}</h2>
        </div>
        <div className="k-quiz-score">{acertos}/{perguntas.length}<small>{tx(lang, "acertos", "correct")}</small></div>
      </div>
      <ol className="k-quiz-list">
        {perguntas.map((p, qi) => {
          const escolha = escolhas[chave(qi)];
          const respondida = escolha !== undefined;
          return (
            <li key={chave(qi)} className="k-quiz-item">
              <div className="k-quiz-q"><span>{qi + 1}</span><div>{p.q}</div></div>
              {p.figura && <div className="k-quiz-fig">{p.figura}</div>}
              <div className="k-quiz-options">
                {p.ops.map((o, oi) => {
                  const st = !respondida ? "" : oi === p.answer ? "right" : oi === escolha ? "wrong" : "dim";
                  return (
                    <button key={o} className={`k-option ${st}`} disabled={respondida} onClick={() => setEscolhas({ ...escolhas, [chave(qi)]: oi })}>
                      <span className="k-option-letter">{String.fromCharCode(97 + oi)}</span>
                      <span>{o}</span>
                      {st === "right" && <Check size={16} />}
                      {st === "wrong" && <X size={16} />}
                    </button>
                  );
                })}
              </div>
              {respondida && (
                <div className={`k-feedback ${escolha === p.answer ? "right" : "wrong"}`}>
                  <strong>{escolha === p.answer ? tx(lang, "Isso aí! 🎉 ", "Correct! 🎉 ") : tx(lang, "Veja como resolver: ", "Here is how: ")}</strong>
                  {p.why}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="k-actions">
        <button className="k-btn" onClick={() => { novo(); setEscolhas({}); }}><RefreshCw size={15} /> {tx(lang, "Novas perguntas com outros números", "New questions with new numbers")}</button>
      </div>
    </section>
  );
}

/* ------------------------- classificar (sem salvar) ------------------------- */

export function Classificar({ lang, baldes, itens, onConferir }: { lang: Lang; baldes: string[]; itens: Array<{ texto: ReactNode; certo: number }>; onConferir?: (ok: boolean) => void }) {
  const [vals, setVals] = useState<Array<number | null>>(() => itens.map(() => null));
  const [conferido, setConferido] = useState(false);
  const acertos = itens.filter((it, i) => vals[i] === it.certo).length;
  return (
    <div className="k-sorter">
      <ul>
        {itens.map((it, i) => {
          const st = !conferido || vals[i] === null ? "" : vals[i] === it.certo ? "right" : "wrong";
          return (
            <li key={i} className={st}>
              <p>{it.texto}</p>
              <div className="k-sorter-choices">
                {baldes.map((b, bi) => (
                  <button key={b} className={vals[i] === bi ? "on" : ""} onClick={() => { const n = [...vals]; n[i] = bi; setVals(n); setConferido(false); }}>{b}</button>
                ))}
              </div>
              {st === "wrong" && <small className="k-inline-hint">{tx(lang, "Resposta certa:", "Correct answer:")} <b>{baldes[it.certo]}</b></small>}
            </li>
          );
        })}
      </ul>
      <div className="k-actions">
        <button className="k-btn" onClick={() => { setConferido(true); onConferir?.(acertos === itens.length); }}>{tx(lang, "Conferir", "Check")}</button>
        {conferido && <span className="k-score">{acertos}/{itens.length} {tx(lang, "corretas", "correct")}</span>}
      </div>
    </div>
  );
}

/* ------------------------------ explicação EN ------------------------------ */

export function Passos({ itens }: { itens: ReactNode[] }) {
  return (
    <ol className="k-steps">
      {itens.map((x, i) => <li key={i}><span>{i + 1}</span><div>{x}</div></li>)}
    </ol>
  );
}
