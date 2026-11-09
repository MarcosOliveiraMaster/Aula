import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Check, CheckCircle2, Headphones, Lightbulb, RotateCcw, Sparkles, TriangleAlert, Volume2, X } from "lucide-react";
import { SpeakButton } from "@/components/Narrator";
import { stop as stopNarrator } from "@/lib/speech/narrator";
import type { QuizQuestion } from "./types";
import { load, save } from "./storage";

/* ------------------------------ pronúncia em inglês ------------------------------ */

function englishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => /en[-_]us/i.test(v.lang) && /natural|google|samantha|aria|jenny/i.test(v.name)) ??
    voices.find((v) => /en[-_]us/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null
  );
}

export function sayEnglish(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stopNarrator();
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  const voice = englishVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

/** Botãozinho que fala a palavra/frase em inglês. */
export function Say({ text, label }: { text: string; label?: string }) {
  return (
    <button className="k-say" onClick={() => sayEnglish(text)} aria-label={`Ouvir em inglês: ${text}`} title="Ouvir a pronúncia em inglês">
      <Volume2 size={14} />
      {label && <span>{label}</span>}
    </button>
  );
}

/* ------------------------------------ blocos ------------------------------------ */

export function Section({ emoji, title, children, narration, accent }: { emoji?: string; title: string; children: ReactNode; narration?: string; accent?: string }) {
  return (
    <section className="k-section">
      <div className="k-section-head">
        <h2>
          {emoji && <span className="k-section-emoji" aria-hidden="true">{emoji}</span>}
          {title}
        </h2>
        {narration && <SpeakButton text={narration} title={title} accent={accent} />}
      </div>
      <div className="k-section-body">{children}</div>
    </section>
  );
}

const calloutIcons = {
  dica: <Lightbulb size={18} />,
  sabia: <Sparkles size={18} />,
  atencao: <TriangleAlert size={18} />,
  lembre: <CheckCircle2 size={18} />,
};

const calloutTitles = {
  dica: "Dica",
  sabia: "Você sabia?",
  atencao: "Atenção",
  lembre: "Para lembrar",
};

export function Callout({ kind = "dica", title, children }: { kind?: keyof typeof calloutIcons; title?: string; children: ReactNode }) {
  return (
    <aside className={`k-callout k-callout-${kind}`}>
      <div className="k-callout-title">
        {calloutIcons[kind]}
        <strong>{title ?? calloutTitles[kind]}</strong>
      </div>
      <div className="k-callout-body">{children}</div>
    </aside>
  );
}

export function CardGrid({ children, min = 220 }: { children: ReactNode; min?: number }) {
  return <div className="k-card-grid" style={{ "--min": `${min}px` } as React.CSSProperties}>{children}</div>;
}

export function Card({ emoji, title, children, tone }: { emoji?: string; title: string; children: ReactNode; tone?: string }) {
  return (
    <article className="k-card" style={tone ? ({ "--tone": tone } as React.CSSProperties) : undefined}>
      {emoji && <div className="k-card-emoji" aria-hidden="true">{emoji}</div>}
      <h3>{title}</h3>
      <div className="k-card-body">{children}</div>
    </article>
  );
}

/** Uma sequência de passos ligados por setas (vira coluna no celular). */
export function Flow({ steps }: { steps: Array<{ emoji: string; text: string }> }) {
  return (
    <ol className="k-flow">
      {steps.map((step, i) => (
        <li key={i}>
          <span className="k-flow-emoji" aria-hidden="true">{step.emoji}</span>
          <span>{step.text}</span>
        </li>
      ))}
    </ol>
  );
}

export function Glossary({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="k-glossary">
      {items.map(([term, meaning]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{meaning}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Frase de exemplo em inglês com tradução e botão de ouvir. */
export function Example({ en, pt, highlight }: { en: string; pt?: string; highlight?: string[] }) {
  const parts = useMemo(() => {
    if (!highlight?.length) return [en];
    const pattern = new RegExp(`\\b(${highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi");
    return en.split(pattern);
  }, [en, highlight]);
  const marks = new Set((highlight ?? []).map((h) => h.toLowerCase()));
  return (
    <div className="k-example">
      <Say text={en} />
      <div>
        <p className="k-example-en" lang="en">
          {parts.map((part, i) => (marks.has(part.toLowerCase()) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
        </p>
        {pt && <p className="k-example-pt">{pt}</p>}
      </div>
    </div>
  );
}

/** Tabela "palavra simples → palavras mais fortes". */
export function UpgradeTable({ rows, from = "Palavra simples", to = "Palavras mais fortes" }: { rows: Array<{ basic: string; basicPt: string; strong: Array<[string, string]> }>; from?: string; to?: string }) {
  return (
    <div className="k-upgrade">
      <div className="k-upgrade-head" aria-hidden="true">
        <span>{from}</span>
        <span>{to}</span>
      </div>
      {rows.map((row) => (
        <div className="k-upgrade-row" key={row.basic}>
          <div className="k-upgrade-basic">
            <button className="k-word" onClick={() => sayEnglish(row.basic)} lang="en">
              {row.basic} <Volume2 size={12} />
            </button>
            <small>{row.basicPt}</small>
          </div>
          <div className="k-upgrade-arrow" aria-hidden="true">➜</div>
          <div className="k-upgrade-strong">
            {row.strong.map(([word, meaning]) => (
              <button key={word} className="k-word strong" onClick={() => sayEnglish(word)} title={`Ouvir: ${word}`}>
                <span lang="en">{word}</span>
                <small>{meaning}</small>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Lista de palavras em inglês clicáveis (com tradução). */
export function WordChips({ words }: { words: Array<[string, string]> }) {
  return (
    <div className="k-chips">
      {words.map(([word, meaning]) => (
        <button key={word} className="k-word" onClick={() => sayEnglish(word)} title={`Ouvir: ${word}`}>
          <span lang="en">{word}</span>
          <small>{meaning}</small>
        </button>
      ))}
    </div>
  );
}

/** Barras horizontais simples para números em porcentagem. */
export function Bars({ items, color }: { items: Array<{ label: string; value: number; note?: string }>; color: string }) {
  return (
    <div className="k-bars">
      {items.map((item) => (
        <div className="k-bar" key={item.label}>
          <div className="k-bar-label">
            <span>{item.label}</span>
            <b>{item.note ?? `${item.value}%`}</b>
          </div>
          <div className="k-bar-track">
            <i style={{ width: `${item.value}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------- quiz ------------------------------------- */

export function Quiz({ id, questions, accent, title = "Teste rápido" }: { id: string; questions: QuizQuestion[]; accent: string; title?: string }) {
  const [picked, setPicked] = useState<Record<number, number>>(() => load(`quiz:${id}`, {}));

  useEffect(() => save(`quiz:${id}`, picked), [id, picked]);
  useEffect(() => setPicked(load(`quiz:${id}`, {})), [id]);

  const answered = Object.keys(picked).length;
  const correct = questions.filter((q, i) => picked[i] === q.answer).length;
  const done = answered === questions.length;

  return (
    <section className="k-quiz" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="k-quiz-head">
        <div>
          <span className="k-eyebrow">Hora de praticar</span>
          <h2>🧠 {title}</h2>
          <p className="k-quiz-sub">{answered}/{questions.length} respondidas · escolha uma alternativa e veja a explicação na hora</p>
          <div className="k-progress-track k-quiz-track"><i style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
        </div>
        <div className="k-quiz-score" aria-live="polite">
          {correct}/{questions.length} <small>acertos</small>
        </div>
      </div>
      <ol className="k-quiz-list">
        {questions.map((question, qi) => {
          const choice = picked[qi];
          const isAnswered = choice !== undefined;
          return (
            <li key={qi} className="k-quiz-item">
              <p className="k-quiz-q">
                <span>{qi + 1}</span>
                {question.q}
              </p>
              <div className="k-quiz-options" role="group" aria-label={`Pergunta ${qi + 1}`}>
                {question.options.map((option, oi) => {
                  const state = !isAnswered ? "" : oi === question.answer ? "right" : oi === choice ? "wrong" : "dim";
                  return (
                    <button key={oi} className={`k-option ${state}`} disabled={isAnswered} onClick={() => setPicked({ ...picked, [qi]: oi })}>
                      <span className="k-option-letter">{String.fromCharCode(97 + oi)}</span>
                      <span>{option}</span>
                      {state === "right" && <Check size={16} />}
                      {state === "wrong" && <X size={16} />}
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p className={`k-feedback ${choice === question.answer ? "right" : "wrong"}`}>
                  <strong>{choice === question.answer ? "Isso aí! 🎉 " : "Quase! Veja por quê: "}</strong>
                  {question.why}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      {done && (
        <div className="k-quiz-end">
          <p>
            {correct === questions.length
              ? "Gabaritou! Você entendeu muito bem este assunto. 🌟"
              : correct >= questions.length / 2
                ? "Muito bem! Releia as explicações das que você errou e tente de novo."
                : "Tudo bem errar: é assim que a gente aprende. Releia o conteúdo com calma e tente outra vez."}
          </p>
          <button className="k-btn ghost" onClick={() => setPicked({})}>
            <RotateCcw size={15} /> Refazer
          </button>
        </div>
      )}
    </section>
  );
}

/* --------------------------- completar com banco de palavras --------------------------- */

type Blank = { before: string; after: string; answer: string };

export function FillBlanks({ id, bank, items, accent }: { id: string; bank: string[]; items: Blank[]; accent: string }) {
  const [values, setValues] = useState<string[]>(() => load(`fill:${id}`, items.map(() => "")));
  const [checked, setChecked] = useState(false);
  useEffect(() => save(`fill:${id}`, values), [id, values]);

  const used = new Set(values.filter(Boolean));
  const score = items.filter((item, i) => values[i] === item.answer).length;

  return (
    <div className="k-fill" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="k-bank" aria-label="Banco de palavras">
        <strong>Word bank:</strong>
        {bank.map((word) => (
          <span key={word} className={used.has(word) ? "used" : ""} lang="en">{word}</span>
        ))}
      </div>
      <ol className="k-fill-list">
        {items.map((item, i) => {
          const state = !checked || !values[i] ? "" : values[i] === item.answer ? "right" : "wrong";
          return (
            <li key={i} lang="en">
              {item.before}{" "}
              <select
                className={`k-select ${state}`}
                value={values[i]}
                aria-label={`Lacuna ${i + 1}`}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  setValues(next);
                }}
              >
                <option value="">______</option>
                {bank.map((word) => (
                  <option key={word} value={word}>{word}</option>
                ))}
              </select>{" "}
              {item.after}
              {state === "wrong" && <span className="k-inline-hint"> (resposta: <b>{item.answer}</b>)</span>}
            </li>
          );
        })}
      </ol>
      <div className="k-actions">
        <button className="k-btn" onClick={() => setChecked(true)}>Conferir</button>
        <button className="k-btn ghost" onClick={() => { setValues(items.map(() => "")); setChecked(false); }}>
          <RotateCcw size={15} /> Limpar
        </button>
        {checked && <span className="k-score" aria-live="polite">{score}/{items.length} corretas</span>}
      </div>
    </div>
  );
}

/* ------------------------------- classificar itens ------------------------------- */

export function Sorter({ id, buckets, items, accent }: { id: string; buckets: string[]; items: Array<{ text: string; answer: number; letter?: string }>; accent: string }) {
  const [values, setValues] = useState<Array<number | null>>(() => load(`sort:${id}`, items.map(() => null)));
  const [checked, setChecked] = useState(false);
  useEffect(() => save(`sort:${id}`, values), [id, values]);
  const score = items.filter((item, i) => values[i] === item.answer).length;

  return (
    <div className="k-sorter" style={{ "--accent": accent } as React.CSSProperties}>
      <ul>
        {items.map((item, i) => {
          const state = !checked || values[i] === null ? "" : values[i] === item.answer ? "right" : "wrong";
          return (
            <li key={i} className={state}>
              <p>
                {item.letter && <b>{item.letter}) </b>}
                {item.text}
              </p>
              <div className="k-sorter-choices" role="group">
                {buckets.map((bucket, bi) => (
                  <button key={bucket} className={values[i] === bi ? "on" : ""} onClick={() => { const next = [...values]; next[i] = bi; setValues(next); }}>
                    {bucket}
                  </button>
                ))}
              </div>
              {state === "wrong" && <small className="k-inline-hint">Resposta certa: <b>{buckets[item.answer]}</b></small>}
            </li>
          );
        })}
      </ul>
      <div className="k-actions">
        <button className="k-btn" onClick={() => setChecked(true)}>Conferir</button>
        <button className="k-btn ghost" onClick={() => { setValues(items.map(() => null)); setChecked(false); }}>
          <RotateCcw size={15} /> Limpar
        </button>
        {checked && <span className="k-score" aria-live="polite">{score}/{items.length} corretas</span>}
      </div>
    </div>
  );
}

/* ---------------------------------- diagrama de Venn ---------------------------------- */

export function Venn({ left, right, items, values }: { left: string; right: string; items: Array<{ letter?: string }>; values: Array<number | null> }) {
  const group = (bucket: number) => items.map((item, i) => (values[i] === bucket ? item.letter : null)).filter(Boolean).join("  ");
  return (
    <svg className="k-venn" viewBox="0 0 360 210" role="img" aria-label={`Diagrama de Venn: ${left} e ${right}`}>
      <circle cx="130" cy="110" r="88" className="k-venn-a" />
      <circle cx="230" cy="110" r="88" className="k-venn-b" />
      <text x="96" y="16" textAnchor="middle" className="k-venn-title">{left}</text>
      <text x="264" y="16" textAnchor="middle" className="k-venn-title">{right}</text>
      <text x="92" y="116" textAnchor="middle" className="k-venn-letters">{group(0)}</text>
      <text x="180" y="116" textAnchor="middle" className="k-venn-letters">{group(1)}</text>
      <text x="268" y="116" textAnchor="middle" className="k-venn-letters">{group(2)}</text>
      <text x="180" y="204" textAnchor="middle" className="k-venn-small">os dois</text>
    </svg>
  );
}

export function VennSorter({ id, left, right, items, accent }: { id: string; left: string; right: string; items: Array<{ text: string; answer: number; letter: string }>; accent: string }) {
  const [values, setValues] = useState<Array<number | null>>(() => load(`venn:${id}`, items.map(() => null)));
  const [checked, setChecked] = useState(false);
  useEffect(() => save(`venn:${id}`, values), [id, values]);
  const buckets = [`Só ${left}`, "Os dois", `Só ${right}`];
  const score = items.filter((item, i) => values[i] === item.answer).length;

  return (
    <div className="k-venn-wrap" style={{ "--accent": accent } as React.CSSProperties}>
      <Venn left={left} right={right} items={items} values={values} />
      <ul className="k-sorter">
        {items.map((item, i) => {
          const state = !checked || values[i] === null ? "" : values[i] === item.answer ? "right" : "wrong";
          return (
            <li key={i} className={state}>
              <p lang="en"><b>{item.letter}) </b>{item.text}</p>
              <div className="k-sorter-choices" role="group">
                {buckets.map((bucket, bi) => (
                  <button key={bucket} className={values[i] === bi ? "on" : ""} onClick={() => { const next = [...values]; next[i] = bi; setValues(next); }}>
                    {bucket}
                  </button>
                ))}
              </div>
              {state === "wrong" && <small className="k-inline-hint">Resposta certa: <b>{buckets[item.answer]}</b></small>}
            </li>
          );
        })}
      </ul>
      <div className="k-actions">
        <button className="k-btn" onClick={() => setChecked(true)}>Conferir</button>
        <button className="k-btn ghost" onClick={() => { setValues(items.map(() => null)); setChecked(false); }}>
          <RotateCcw size={15} /> Limpar
        </button>
        {checked && <span className="k-score" aria-live="polite">{score}/{items.length} corretas</span>}
      </div>
    </div>
  );
}

/* ---------------------------------- ajudante de escrita ---------------------------------- */

export function WritingHelper({ id, prompt, checks, model, accent }: { id: string; prompt: string; checks: Array<{ label: string; words: string[] }>; model?: string; accent: string }) {
  const [text, setText] = useState(() => load(`write:${id}`, ""));
  const [showModel, setShowModel] = useState(false);
  useEffect(() => save(`write:${id}`, text), [id, text]);

  const lower = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().split(/\s+/).length >= 3).length;

  return (
    <div className="k-writer" style={{ "--accent": accent } as React.CSSProperties}>
      <p className="k-writer-prompt" lang="en">{prompt}</p>
      <textarea lang="en" value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="Write your paragraph here... (fica salvo neste aparelho)" />
      <ul className="k-checklist">
        <li className={sentences >= 4 ? "ok" : ""}>
          {sentences >= 4 ? <Check size={14} /> : <span className="k-dot" />} Pelo menos 4 frases ({sentences} até agora)
        </li>
        {checks.map((check) => {
          const found = check.words.filter((w) => lower.includes(w.toLowerCase()));
          return (
            <li key={check.label} className={found.length ? "ok" : ""}>
              {found.length ? <Check size={14} /> : <span className="k-dot" />} {check.label}
              {found.length > 0 && <em lang="en"> — {found.join(", ")}</em>}
            </li>
          );
        })}
      </ul>
      {model && (
        <div className="k-model">
          <button className="k-btn ghost" onClick={() => setShowModel(!showModel)}>
            <Headphones size={15} /> {showModel ? "Esconder exemplo" : "Ver um exemplo pronto"}
          </button>
          {showModel && (
            <div className="k-model-text">
              <Say text={model} label="Ouvir" />
              <p lang="en">{model}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
