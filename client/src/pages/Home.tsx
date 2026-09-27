import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  ExternalLink,
  Grid2X2,
  HelpCircle,
  Lightbulb,
  LockKeyhole,
  Menu,
  Play,
  RotateCcw,
  Ruler,
  Shapes,
  Sparkles,
  Target,
  Triangle,
  Variable,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import aulaData from "../data/aula.json";

type AnyRecord = Record<string, any>;
type Block = AnyRecord & { id: number; titulo: string; prioridade: string };
type Screen = "overview" | "block" | "simulado";

type BlockMeta = {
  icon: LucideIcon;
  number: string;
  short: string;
  accent: string;
  soft: string;
  ink: string;
  label: string;
};

const aula = aulaData as AnyRecord;
const blocks = aula.blocos_de_conteudo as Block[];

const blockMeta: Record<number, BlockMeta> = {
  1: { icon: Ruler, number: "01", short: "Contorno", accent: "#f06d55", soft: "#fff0eb", ink: "#9f392b", label: "Perímetro" },
  2: { icon: Grid2X2, number: "02", short: "Superfície", accent: "#e0a11a", soft: "#fff7dd", ink: "#956b00", label: "Área" },
  3: { icon: CircleDot, number: "03", short: "Bordas & pizza", accent: "#27a58a", soft: "#e4f7f1", ink: "#12745f", label: "Círculo" },
  4: { icon: Variable, number: "04", short: "Descobrir x", accent: "#7e6bd6", soft: "#efecff", ink: "#5141a6", label: "Equações" },
  5: { icon: Shapes, number: "05", short: "Ângulos", accent: "#df7b32", soft: "#fff0e2", ink: "#994912", label: "Polígonos" },
  6: { icon: Triangle, number: "06", short: "Triângulo 90°", accent: "#3c82ca", soft: "#e7f2ff", ink: "#205c99", label: "Pitágoras" },
};

const normalise = (value: string) => value.toLowerCase().replace(/,/g, ".").replace(/\s/g, "");
const getNumericTokens = (value: string) => value.match(/\d+(?:[.,]\d+)?/g)?.map((token) => Number(token.replace(",", "."))) ?? [];
const isAnswerCorrect = (answer: string, expected: string) => {
  const typed = normalise(answer);
  if (!typed) return false;
  const numbers = getNumericTokens(expected);
  const typedNumbers = getNumericTokens(answer);
  if (typedNumbers.length === 0) return typed.includes(normalise(expected));
  return typedNumbers.some((token) => numbers.some((n) => Math.abs(token - n) < 0.001));
};

const toList = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap((item) => typeof item === "string" ? [item] : toList(item));
  if (typeof value === "string") return [value];
  if (typeof value === "object") return Object.entries(value).map(([key, val]) => `${key}: ${String(val)}`);
  return [String(value)];
};

const getConceptDetails = (block: Block) => {
  const candidates = [block.analogias, block.vocabulario, block.nomes_dos_poligonos, block.vocabulario_de_traducao, block.operacoes_inversas];
  for (const candidate of candidates) {
    const list = toList(candidate);
    if (list.length) return list.slice(0, 3);
  }
  return ["Observe o que a questão está pedindo.", "Separe os dados antes de escolher a fórmula.", "Confira sempre a unidade do resultado."];
};

const getExampleSteps = (example: AnyRecord) => [
  example.passo_1_pedido || "Leia o enunciado e identifique exatamente o que precisa ser descoberto.",
  (example.passo_2_dados || ["Separe os números e as unidades do enunciado."]).join("\n"),
  example.passo_3_formula || "Escolha a fórmula que conecta os dados ao que a questão pede.",
  example.passo_4_substituicao || "Troque cada letra pelo número correspondente.",
  (example.passo_5_resolucao || ["Resolva a conta linha por linha."]).join("\n"),
  example.passo_6_conferencia || "Confira o resultado e a unidade.",
];

const coachingNotes = [
  "Aqui você transforma o texto em uma pergunta matemática. Nomear o pedido evita começar pela fórmula errada.",
  "Separar dados é como organizar as peças antes de montar: escreva cada número, o que ele representa e sua unidade.",
  "A fórmula é uma ponte entre os dados e o pedido. Antes de substituir, diga em voz alta o que cada letra significa.",
  "Substitua uma letra por vez. Não pule esta linha: ela deixa o raciocínio visível e facilita encontrar um erro.",
  "Resolva com calma, uma operação por linha. Se aparecer uma equação, mantenha a igualdade equilibrada nos dois lados.",
  "Uma resposta matemática precisa de sentido: confira a unidade, o tamanho do resultado e, se for equação, teste o valor encontrado.",
];

const youtubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1` : null;
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="brand-mark" aria-hidden="true">
        <span>∑</span>
        <i />
      </div>
      {!compact && <div className="leading-none"><div className="brand-name">númera</div><div className="brand-subtitle">estudo que encaixa</div></div>}
    </div>
  );
}

function SpeakButton({ text, accent = "#f06d55", compact = false }: { text: string; accent?: string; compact?: boolean }) {
  const [speaking, setSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/→/g, " para ").replace(/×/g, " vezes ").replace(/÷/g, " dividido por "));
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1.02;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <button className={`speak-button ${compact ? "compact" : ""} ${speaking ? "speaking" : ""}`} style={{ "--speak-accent": accent } as React.CSSProperties} onClick={toggleSpeech} aria-label={speaking ? "Parar explicação" : "Ouvir explicação"} title={speaking ? "Parar explicação" : "Ouvir explicação"}>
      {speaking ? <VolumeX size={compact ? 13 : 15} /> : <Volume2 size={compact ? 13 : 15} />}
      {!compact && <span>{speaking ? "Parar" : "Ouvir"}</span>}
    </button>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-label={`${value}% concluído`} role="img">
        <circle cx="32" cy="32" r={radius} stroke="#eadfd0" strokeWidth="5" fill="none" />
        <circle cx="32" cy="32" r={radius} stroke="#f06d55" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (circumference * value) / 100} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink">{value}%</span>
    </div>
  );
}

function VideoLesson({ block, accent }: { block: Block; accent: string }) {
  const video = block.video_de_apoio;
  if (!video) return null;
  const embedUrl = youtubeEmbedUrl(video.link);
  return (
    <section className="video-lesson" style={{ "--video-accent": accent } as React.CSSProperties}>
      <div className="video-copy">
        <div className="eyebrow" style={{ color: accent }}><Play size={14} fill="currentColor" /> assista e revise</div>
        <h2>Veja a ideia em movimento.</h2>
        <div className="explain-row"><p>{video.quando_usar || video.observacao_para_a_ia || "Assista antes da prática se quiser uma explicação visual, ou depois para reforçar o que acabou de estudar."}</p><SpeakButton text={`${video.titulo}. ${video.quando_usar || video.observacao_para_a_ia || "Assista antes da prática para reforçar o conteúdo."}`} accent={accent} /></div>
        <div className="video-source"><span>vídeo recomendado</span><strong>{video.titulo}</strong></div>
        <a className="video-link" href={video.link} target="_blank" rel="noreferrer">Abrir no YouTube <ExternalLink size={14} /></a>
      </div>
      {embedUrl ? (
        <div className="video-frame"><iframe src={embedUrl} title={video.titulo} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
      ) : (
        <a className="video-search-card" href={video.link} target="_blank" rel="noreferrer"><Play size={28} fill="currentColor" /><span>O briefing trouxe uma busca do YouTube para este tema.<strong>Clique para escolher o vídeo do canal indicado.</strong></span><ExternalLink size={16} /></a>
      )}
    </section>
  );
}

function MethodSteps() {
  const steps = aula.metodo_de_resolucao_padrao?.passos ?? [];
  return (
    <section id="metodo" className="method-panel paper-grid">
      <div className="method-intro">
        <div className="eyebrow light"><Sparkles size={14} /> método de resolução</div>
        <h2>Não precisa ser rápida.<br /><em>Precisa ser organizada.</em></h2>
        <p>{aula.metodo_de_resolucao_padrao?.descricao}</p>
        <div className="method-quote">“{aula.metodo_de_resolucao_padrao?.frase_para_repetir}”</div>
      </div>
      <div className="method-list">
        {steps.map((step: AnyRecord, index: number) => (
          <div className="method-item" key={step.numero}>
            <div className="method-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="method-copy"><strong>{step.nome}</strong><p>{step.pergunta_guia}</p><SpeakButton text={`${step.nome}. ${step.pergunta_guia}`} accent="#f06d55" /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StepExample({ example, accent }: { example: AnyRecord; accent: string }) {
  const steps = getExampleSteps(example);
  const [current, setCurrent] = useState(0);
  const labels = ["entender", "dados", "fórmula", "substituir", "resolver", "conferir"];
  return (
    <article className="example-card">
      <div className="example-topline">
        <span className="eyebrow" style={{ color: accent }}><Target size={14} /> exemplo {example.nivel}</span>
        <span className="step-count">{current + 1} / 6</span>
      </div>
      <h4>{example.enunciado}</h4>
      {example.comentario_didatico && <div className="teacher-note"><Lightbulb size={15} /><span>{example.comentario_didatico}</span></div>}
      <div className="step-tabs" role="tablist" aria-label="Passos da resolução">
        {labels.map((label, index) => (
          <button key={label} className={current === index ? "active" : current > index ? "done" : ""} onClick={() => setCurrent(index)} role="tab" aria-selected={current === index}>
            <span>{index + 1}</span><b>{label}</b>
          </button>
        ))}
      </div>
      <div className="step-content" style={{ borderLeftColor: accent }}>
        <div className="step-label-row"><div className="step-label" style={{ color: accent }}>passo {current + 1} · {labels[current]}</div><SpeakButton text={`${steps[current]}. ${coachingNotes[current]}`} accent={accent} /></div>
        <p className="whitespace-pre-line">{steps[current]}</p>
        <div className="step-coach"><Lightbulb size={15} /><span><b>Por que este passo importa:</b> {coachingNotes[current]}</span></div>
      </div>
      <div className="step-footer">
        <button className="icon-button" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} aria-label="Passo anterior"><ChevronLeft size={17} /></button>
        <div className="step-dots">{steps.map((_: string, i: number) => <i key={i} className={i === current ? "active" : i < current ? "done" : ""} />)}</div>
        {current < 5 ? <button className="next-step" style={{ background: accent }} onClick={() => setCurrent(current + 1)}>Próximo passo <ChevronRight size={16} /></button> : <div className="answer-ribbon" style={{ color: accent, background: `${accent}12` }}><CheckCircle2 size={16} /> {example.resposta || "Resposta conferida"}</div>}
      </div>
    </article>
  );
}

function PracticeCard({ exercise, keyId, accent, state, onChange, onHint }: { exercise: AnyRecord; keyId: string; accent: string; state: AnyRecord; onChange: (value: string) => void; onHint: () => void }) {
  const hints = exercise.dicas_graduais ?? [];
  const expected = exercise.gabarito_para_o_tutor ?? "";
  return (
    <article className="practice-card">
      <div className="practice-index" style={{ background: `${accent}16`, color: accent }}>Q</div>
      <div className="practice-main">
        <div className="practice-question-row"><div className="practice-question">{exercise.enunciado}</div><SpeakButton text={exercise.enunciado} accent={accent} compact /></div>
        <div className="answer-row">
          <input aria-label="Sua resposta" value={state.answer ?? ""} onChange={(event) => onChange(event.target.value)} placeholder="Escreva sua resposta…" onKeyDown={(event) => { if (event.key === "Enter") onHint(); }} />
          <button className="check-button" style={{ background: accent }} onClick={onHint}>{state.checked ? "Tentar de novo" : "Conferir"} <ArrowRight size={16} /></button>
        </div>
        {state.checked && (
          <div className={`practice-feedback ${state.correct ? "correct" : "needs-work"}`}>
            {state.correct ? <CheckCircle2 size={18} /> : <HelpCircle size={18} />}
            <div>
              <strong>{state.correct ? "Boa! Você organizou o raciocínio." : "Ainda não bateu — e tudo bem."}</strong>
              <div className="explain-row"><p>{state.correct ? "Agora tente explicar qual foi a primeira decisão que você tomou." : "Use uma dica por vez. O erro é uma pista de onde olhar."}</p><SpeakButton text={state.correct ? "Agora tente explicar qual foi a primeira decisão que você tomou." : "Use uma dica por vez. O erro é uma pista de onde olhar."} accent={accent} compact /></div>
              {!state.correct && state.hintLevel > 0 && <div className="hint-stack">{hints.slice(0, state.hintLevel).map((hint: string, index: number) => <div key={hint}><span>Dica {index + 1}</span>{hint}</div>)}</div>}
              {!state.correct && state.hintLevel >= hints.length && <div className="full-resolution"><span>Resolução completa</span>{expected}</div>}
            </div>
          </div>
        )}
        {!state.correct && state.checked && state.hintLevel < hints.length && <button className="hint-link" onClick={onHint}><Lightbulb size={15} /> Revelar próxima dica ({state.hintLevel + 1}/{hints.length})</button>}
      </div>
    </article>
  );
}

function BlockHeader({ block, onBack }: { block: Block; onBack: () => void }) {
  const meta = blockMeta[block.id];
  const Icon = meta.icon;
  return (
    <div className="block-header" style={{ "--accent": meta.accent, "--soft": meta.soft } as React.CSSProperties}>
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> voltar para a trilha</button>
      <div className="block-title-row">
        <div className="block-symbol"><Icon size={34} strokeWidth={1.5} /></div>
        <div>
          <div className="eyebrow" style={{ color: meta.accent }}>bloco {meta.number} <span className="eyebrow-dot">·</span> {block.prioridade}</div>
          <h1>{block.titulo}</h1>
          <p className="block-lede">{block.ideia_central}</p>
        </div>
      </div>
      <div className="block-quick-facts">
        <span><BookOpen size={15} /> {block.formulas ? `${block.formulas.length} fórmulas para dominar` : "ideia + prática"}</span>
        <span><Clock3 size={15} /> 20–30 min neste bloco</span>
        {block.video_de_apoio?.link && <a href={block.video_de_apoio.link} target="_blank" rel="noreferrer"><Play size={14} fill="currentColor" /> vídeo de apoio <ExternalLink size={12} /></a>}
      </div>
    </div>
  );
}

function BlockView({ block, onBack, completed, onComplete, practiceStates, updatePractice }: { block: Block; onBack: () => void; completed: boolean; onComplete: () => void; practiceStates: AnyRecord; updatePractice: (key: string, value: AnyRecord) => void }) {
  const meta = blockMeta[block.id];
  const details = getConceptDetails(block);
  const formulas = (block.formulas ?? (block.formula ? (typeof block.formula === "object" ? [{ figura: "Teorema de Pitágoras", ...block.formula }] : [block.formula]) : [])) as AnyRecord[];
  const examples = (block.exemplos_resolvidos ?? []) as AnyRecord[];
  const practice = (block.agora_e_com_voce ?? []) as AnyRecord[];
  return (
    <>
      <BlockHeader block={block} onBack={onBack} />
      <main className="block-content">
        <section className="concept-grid">
          <div className="concept-card main-concept">
            <div className="section-kicker"><span style={{ background: meta.accent }}>01</span> ideia central</div>
            <h2>Antes da fórmula,<br /><em>enxergue a ideia.</em></h2>
            <div className="explain-row"><p>{block.ideia_central}</p><SpeakButton text={block.ideia_central} accent={meta.accent} /></div>
            <div className="concept-rule" style={{ background: meta.accent }} />
            <div className="explain-row"><p className="small-note">{block.conexao_com_o_mundo || "Conecte a conta a uma situação que você já conhece. Quando a imagem faz sentido, a fórmula deixa de ser um truque."}</p><SpeakButton text={block.conexao_com_o_mundo || "Conecte a conta a uma situação que você já conhece. Quando a imagem faz sentido, a fórmula deixa de ser um truque."} accent={meta.accent} compact /></div>
          </div>
          <div className="concept-card sondagem-card">
            <div className="section-kicker"><span style={{ background: meta.accent }}>02</span> aqueça o raciocínio</div>
            <h3>Você já percebeu isso?</h3>
            <div className="explain-row"><p className="muted">Responda mentalmente ou anote. Não é prova: é o ponto de partida.</p><SpeakButton text="Responda mentalmente ou anote. Não é prova: é o ponto de partida." accent={meta.accent} compact /></div>
            <div className="diagnostic-list">
              {(block.sondagem_inicial ?? []).map((question: string, index: number) => <div className="diagnostic-item" key={question}><span style={{ color: meta.accent }}>0{index + 1}</span><p>{question}</p><SpeakButton text={question} accent={meta.accent} compact /><button aria-label="Marcar pergunta como refletida"><Check size={15} /></button></div>)}
            </div>
          </div>
          <div className="concept-card image-concept" style={{ background: meta.soft }}>
            <div className="orbit-shape" style={{ borderColor: meta.accent }} />
            <div className="concept-number" style={{ color: meta.accent }}>03</div>
            <h3>O que observar</h3>
            <ul>{details.map((detail) => <li key={detail}><span style={{ color: meta.accent }}>+</span><span className="detail-copy">{detail}</span><SpeakButton text={detail} accent={meta.accent} compact /></li>)}</ul>
          </div>
        </section>

        <VideoLesson block={block} accent={meta.accent} />

        {formulas.length > 0 && <section className="section-block" id="formulas">
          <div className="section-heading"><div><div className="eyebrow" style={{ color: meta.accent }}>ferramentas</div><h2>Fórmulas que fazem sentido</h2></div><p>Não decore no automático. Leia o que cada letra está dizendo.</p></div>
          <div className="formula-grid">{formulas.map((formula: AnyRecord, index: number) => {
            const expression = typeof formula === "string" ? formula : (formula.formula ?? formula.expressao ?? formula.em_palavras ?? "");
            const explanation = formula.regra_pratica || (formula.para_achar_a_hipotenusa ? `Hipotenusa: ${formula.para_achar_a_hipotenusa} · cateto: ${formula.para_achar_um_cateto}` : formula.de_onde_vem);
            return <article className="formula-card" key={`${formula.figura}-${index}`}><div className="formula-label" style={{ color: meta.accent }}>{formula.figura ?? `Relação ${index + 1}`}</div><div className="formula-display-row"><div className="formula-display">{expression}</div><SpeakButton text={`${formula.figura ?? "Fórmula"}. ${expression}. ${explanation || "Use esta relação conectando cada letra ao dado correspondente."}`} accent={meta.accent} /></div>{typeof formula === "object" && formula.variaveis && <div className="variable-list">{Object.entries(formula.variaveis).map(([key, value]) => <span key={key}><b>{key}</b> {String(value)}</span>)}</div>}{explanation && <div className="formula-origin-row"><p className="formula-origin">{explanation}</p><SpeakButton text={explanation} accent={meta.accent} compact /></div>}</article>;
          })}</div>
        </section>}

        {block.diferenca_perimetro_x_area && <section className="contrast-strip"><div className="contrast-icon"><Grid2X2 size={21} /></div><div className="explain-row"><div><strong>Perímetro × área</strong><p>{typeof block.diferenca_perimetro_x_area === "string" ? block.diferenca_perimetro_x_area : toList(block.diferenca_perimetro_x_area).join(" · ")}</p></div><SpeakButton text={`Perímetro e área. ${typeof block.diferenca_perimetro_x_area === "string" ? block.diferenca_perimetro_x_area : toList(block.diferenca_perimetro_x_area).join(". ")}`} accent="#a97b13" compact /></div></section>}
        {block.insight_importante && <section className="insight-strip" style={{ borderColor: meta.accent }}><Lightbulb size={20} style={{ color: meta.accent }} /><div className="explain-row"><div><strong>Insight importante</strong><p>{block.insight_importante}</p></div><SpeakButton text={`Insight importante. ${block.insight_importante}`} accent={meta.accent} compact /></div></section>}

        <section className="section-block examples-section">
          <div className="section-heading"><div><div className="eyebrow" style={{ color: meta.accent }}>laboratório de resolução</div><h2>Veja o raciocínio, passo a passo</h2></div><p>Clique nos passos. Uma linha por vez, sem pular a conferência.</p></div>
          <div className="examples-list">{examples.slice(0, 4).map((example: AnyRecord, index: number) => <StepExample key={`${example.enunciado}-${index}`} example={example} accent={meta.accent} />)}</div>
          {block.situacao_problema_resolvida && <div className="story-problem" style={{ borderTopColor: meta.accent }}><div className="story-tag" style={{ color: meta.accent }}>situação do cotidiano</div><div className="explain-row"><h3>{block.situacao_problema_resolvida.enunciado}</h3><SpeakButton text={block.situacao_problema_resolvida.enunciado} accent={meta.accent} /></div><div className="story-steps">{(block.situacao_problema_resolvida.resolucao ?? []).map((line: string, index: number) => <div key={line}><span style={{ background: meta.accent }}>{index + 1}</span><span className="story-line-copy">{line}</span><SpeakButton text={line} accent={meta.accent} compact /></div>)}</div><div className="story-answer" style={{ background: `${meta.accent}12`, color: meta.ink }}><CheckCircle2 size={17} /> {block.situacao_problema_resolvida.resposta}<SpeakButton text={block.situacao_problema_resolvida.resposta} accent={meta.accent} compact /></div></div>}
        </section>

        <section className="practice-section" style={{ background: meta.soft }}>
          <div className="section-heading practice-heading"><div><div className="eyebrow" style={{ color: meta.accent }}><Sparkles size={14} /> agora é com você</div><h2>Seu turno de pensar</h2></div><p>A resposta só aparece depois da sua tentativa. Se travar, peça uma dica.</p></div>
          <div className="practice-list">{practice.map((exercise: AnyRecord, index: number) => { const key = `${block.id}-${index}`; return <PracticeCard key={key} exercise={exercise} keyId={key} accent={meta.accent} state={practiceStates[key] ?? { answer: "", hintLevel: 0, checked: false, correct: false }} onChange={(value) => updatePractice(key, { ...(practiceStates[key] ?? {}), answer: value, checked: false, correct: false })} onHint={() => { const old = practiceStates[key] ?? { answer: "", hintLevel: 0 }; const correct = isAnswerCorrect(old.answer ?? "", exercise.gabarito_para_o_tutor ?? ""); updatePractice(key, { ...old, checked: true, correct, hintLevel: correct ? old.hintLevel ?? 0 : Math.min((old.hintLevel ?? 0) + 1, (exercise.dicas_graduais ?? []).length) }); }} />; })}</div>
        </section>

        <section className="closing-grid">
          <div className="errors-card"><div className="eyebrow coral"><X size={14} /> atenção às armadilhas</div><h3>Erros também ensinam.</h3><ul>{(block.erros_comuns ?? []).slice(0, 4).map((error: string) => <li key={error}><span>×</span><span className="error-copy">{error}</span><SpeakButton text={error} accent="#f06d55" compact /></li>)}</ul></div>
          <div className="closing-card"><div className="eyebrow" style={{ color: meta.accent }}>ensine de volta</div><h3>Explique com suas palavras.</h3><div className="explain-row"><p>{block.fechamento || "Agora conte o que você aprendeu, como se estivesse explicando para alguém da sua turma."}</p><SpeakButton text={block.fechamento || "Agora conte o que você aprendeu, como se estivesse explicando para alguém da sua turma."} accent={meta.accent} compact /></div><button className="outline-action" onClick={onComplete}>{completed ? <><Check size={16} /> bloco concluído</> : <>Marcar bloco como concluído <ArrowRight size={16} /></>}</button></div>
        </section>
      </main>
    </>
  );
}

function Overview({ completed, onOpenBlock, onOpenSimulado }: { completed: Set<number>; onOpenBlock: (id: number) => void; onOpenSimulado: () => void }) {
  const progress = Math.round((completed.size / blocks.length) * 100);
  return (
    <>
      <section className="hero-shell">
        <div className="hero-copy">
          <div className="eyebrow coral"><span className="live-dot" /> trilha personalizada · 9º ano</div>
          <h1>Matemática que<br /><em>faz sentido.</em></h1>
          <p>Uma revisão visual e sem pressa para você entender geometria, equações e Pitágoras — com exemplos reais, prática guiada e o raciocínio inteiro à vista.</p>
          <div className="hero-actions"><button className="primary-action" onClick={() => onOpenBlock(completed.size < blocks.length ? Math.min(completed.size + 1, blocks.length) : 1)}>Continuar estudando <ArrowRight size={18} /></button><button className="text-action" onClick={onOpenSimulado}><Target size={17} /> ir para o simulado</button></div>
          <div className="hero-meta"><span><CheckCircle2 size={15} /> sem decorar no automático</span><span><Clock3 size={15} /> 6 blocos curtos</span></div>
        </div>
        <div className="hero-visual" aria-label="Ilustração de formas geométricas e uma equação">
          <div className="visual-sticker sticker-top">um passo<br /><b>de cada vez</b></div>
          <div className="visual-board">
            <div className="grid-lines" />
            <div className="equation equation-one">2(x + 3) = 18</div>
            <div className="shape-square" />
            <div className="shape-triangle" />
            <div className="shape-circle" />
            <div className="visual-caption"><span>∑</span> pensar · testar · conferir</div>
          </div>
          <div className="visual-sticker sticker-bottom">π · a² + b² = c²</div>
        </div>
      </section>

      <section className="progress-banner">
        <div className="progress-copy"><div className="eyebrow">seu mapa de hoje</div><h2>Você não está começando do zero.</h2><p>Escolha um bloco, siga os passos e construa confiança com cada acerto.</p></div>
        <div className="progress-meter"><ProgressRing value={progress} /><div><strong>{completed.size} de {blocks.length} blocos</strong><span>{progress === 0 ? "primeiro passo esperando por você" : progress === 100 ? "trilha completa — mandou muito bem" : "já caminhados nesta trilha"}</span></div></div>
      </section>

      <section className="overview-section" id="trilha">
        <div className="section-heading"><div><div className="eyebrow coral">a trilha</div><h2>Seis ideias que se conectam</h2></div><p>Comece pela base ou vá direto para o tema que quer revisar.</p></div>
        <div className="block-grid">{blocks.map((block, index) => { const meta = blockMeta[block.id]; const Icon = meta.icon; const done = completed.has(block.id); return <button className={`block-card ${done ? "completed" : ""}`} key={block.id} onClick={() => onOpenBlock(block.id)} style={{ "--accent": meta.accent, "--soft": meta.soft } as React.CSSProperties}><div className="block-card-top"><span className="block-num" style={{ color: meta.accent }}>{meta.number}</span><div className="block-card-icon" style={{ color: meta.accent, background: meta.soft }}><Icon size={20} /></div>{done && <CheckCircle2 className="block-done" size={18} style={{ color: meta.accent }} />}</div><div className="block-card-copy"><div className="block-card-label" style={{ color: meta.accent }}>{meta.label}</div><h3>{block.titulo.replace(/ de Figuras Planas| e Polígonos| do 1º Grau/, "")}</h3><p>{block.ideia_central}</p></div><div className="block-card-footer"><span>{block.exemplos_resolvidos?.length ?? 0} exemplos guiados</span><span className="go-icon"><ArrowUpRight size={17} /></span></div></button>; })}</div>
      </section>

      <MethodSteps />

      <section className="final-cta"><div><div className="eyebrow light"><Target size={14} /> fechamento</div><h2>Quer descobrir o que já sabe?</h2><p>Dez questões misturando todos os temas — sem pegadinha, com resolução depois da tentativa.</p></div><button className="light-action" onClick={onOpenSimulado}>Abrir mini simulado <ArrowRight size={17} /></button></section>
    </>
  );
}

function Simulado({ onBack }: { onBack: () => void }) {
  const questions = (aula.mini_simulado_final?.questoes ?? []) as AnyRecord[];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const question = questions[index];
  const answer = answers[index] ?? "";
  const isCorrect = checked[index] && isAnswerCorrect(answer, question?.gabarito_para_o_tutor ?? "");
  const score = Object.entries(checked).filter(([key, value]) => value && isAnswerCorrect(answers[Number(key)] ?? "", questions[Number(key)]?.gabarito_para_o_tutor ?? "")).length;
  return (
    <main className="simulado-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> voltar para a trilha</button>
      <div className="simulado-intro"><div className="eyebrow coral"><Target size={14} /> mini simulado final</div><h1>Agora, misture<br /><em>tudo o que aprendeu.</em></h1><p>Uma questão por vez. Leia, separe os dados, tente e só então confira. O objetivo é enxergar o caminho — não correr.</p></div>
      <div className="simulado-layout"><aside className="simulado-sidebar"><div className="simulado-score"><span>pontuação</span><strong>{score}<small>/{questions.length}</small></strong><div className="score-bar"><i style={{ width: `${(score / questions.length) * 100}%` }} /></div><p>{score === 0 ? "cada tentativa conta" : score < 6 ? "seu raciocínio está ganhando forma" : "você está conectando as ideias"}</p></div><div className="question-nav"><span>questões</span>{questions.map((q: AnyRecord, i: number) => <button key={q.n} className={`${i === index ? "current" : ""} ${checked[i] ? "answered" : ""}`} onClick={() => setIndex(i)}><b>{String(q.n).padStart(2, "0")}</b><span>{q.tema}</span>{checked[i] && <Check size={14} />}</button>)}</div></aside><section className="simulado-card"><div className="simulado-card-top"><span className="question-tag" style={{ color: blockMeta[(index % 6) + 1].accent, background: `${blockMeta[(index % 6) + 1].accent}13` }}>{question?.tema}</span><span>{index + 1} / {questions.length}</span></div><div className="big-question-number">{String(question?.n).padStart(2, "0")}</div><h2>{question?.enunciado}</h2><div className="sim-answer"><label htmlFor="sim-answer">Sua resposta</label><div><input id="sim-answer" value={answer} onChange={(event) => { setAnswers({ ...answers, [index]: event.target.value }); setChecked({ ...checked, [index]: false }); }} placeholder="pense e escreva aqui…" /><button className="primary-action" onClick={() => setChecked({ ...checked, [index]: true })}>Conferir <ArrowRight size={17} /></button></div></div>{checked[index] && <div className={`sim-feedback ${isCorrect ? "correct" : "wrong"}`}><div className="feedback-icon">{isCorrect ? <CheckCircle2 size={24} /> : <Lightbulb size={24} />}</div><div><strong>{isCorrect ? "Acertou — e o caminho importa." : "Quase. Use isso como pista."}</strong><p>{isCorrect ? "Muito bem. Você identificou a relação certa." : "Releia os dados, escolha a fórmula e faça uma linha por vez."}</p><div className="sim-resolution"><span>resolução para conferir depois da tentativa</span>{question?.gabarito_para_o_tutor}</div></div></div>}<div className="simulado-footer"><button className="icon-button" disabled={index === 0} onClick={() => setIndex(index - 1)}><ChevronLeft size={18} /> anterior</button><div className="sim-dots">{questions.map((_: AnyRecord, i: number) => <i key={i} className={i === index ? "active" : checked[i] ? "done" : ""} />)}</div>{index < questions.length - 1 ? <button className="next-step" onClick={() => setIndex(index + 1)}>próxima <ChevronRight size={17} /></button> : <button className="next-step" onClick={() => setIndex(0)}><RotateCcw size={16} /> revisar</button>}</div></section></div>
    </main>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("overview");
  const [activeBlockId, setActiveBlockId] = useState(1);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [practiceStates, setPracticeStates] = useState<AnyRecord>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("numera-progress") ?? "[]");
      if (Array.isArray(saved)) setCompleted(new Set(saved));
    } catch { /* storage indisponível: a trilha continua funcionando */ }
  }, []);

  const activeBlock = useMemo(() => blocks.find((block) => block.id === activeBlockId) ?? blocks[0], [activeBlockId]);
  const openBlock = (id: number) => { setActiveBlockId(id); setScreen("block"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openOverview = () => { setScreen("overview"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openSimulado = () => { setScreen("simulado"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const completeBlock = () => {
    const next = new Set(completed);
    if (next.has(activeBlockId)) next.delete(activeBlockId); else next.add(activeBlockId);
    setCompleted(next);
    localStorage.setItem("numera-progress", JSON.stringify(Array.from(next)));
  };
  const updatePractice = (key: string, value: AnyRecord) => setPracticeStates((current) => ({ ...current, [key]: value }));

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner"><button className="brand-button" onClick={openOverview} aria-label="Voltar para o início"><BrandMark /></button><nav className={`main-nav ${menuOpen ? "open" : ""}`}><button className={screen === "overview" ? "active" : ""} onClick={openOverview}>Trilha</button><button onClick={() => { setScreen("overview"); setMenuOpen(false); setTimeout(() => document.getElementById("metodo")?.scrollIntoView({ behavior: "smooth" }), 50); }}>Método dos 6 passos</button><button className={screen === "simulado" ? "active" : ""} onClick={openSimulado}>Mini simulado</button></nav><div className="header-right"><span className="header-progress"><span className="progress-dot" /> {completed.size}/6 concluídos</span><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></div>
      </header>
      {screen === "overview" && <Overview completed={completed} onOpenBlock={openBlock} onOpenSimulado={openSimulado} />}
      {screen === "block" && <BlockView block={activeBlock} onBack={openOverview} completed={completed.has(activeBlock.id)} onComplete={completeBlock} practiceStates={practiceStates} updatePractice={updatePractice} />}
      {screen === "simulado" && <Simulado onBack={openOverview} />}
      <footer className="site-footer"><BrandMark compact /><span>feito para estudar com calma · 9º ano</span><span className="footer-rule">não precisa ser rápida. precisa ser organizada.</span></footer>
    </div>
  );
}
