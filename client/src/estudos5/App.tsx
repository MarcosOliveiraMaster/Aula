import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Home, ListChecks } from "lucide-react";
import { NarratorBar, SpeakButton } from "@/components/Narrator";
import { stop as stopNarrator } from "@/lib/speech/narrator";
import type { Subject, SubjectId, Topic } from "./types";
import { geografia } from "./content/geografia";
import { ela } from "./content/ela";
import { historia } from "./content/historia";
import { ciencias } from "./content/ciencias";
import { Quiz } from "./ui";
import { load, save } from "./storage";

const subjects: Record<SubjectId, Subject> = {
  geo: {
    id: "geo",
    name: "Geografia",
    emoji: "🌎",
    unit: "Unidade 3 · Qualidade de vida e desenvolvimento humano",
    color: "#1f9d7a",
    soft: "#e3f5ee",
    ink: "#0f6b52",
    intro: "Saneamento básico, saúde, educação, moradia, segurança e as desigualdades sociais nas cidades.",
  },
  ela: {
    id: "ela",
    name: "E.L.A. (English)",
    emoji: "🇬🇧",
    unit: "Units 8 to 11 · Adjectives, adverbs, verbs & paragraphs",
    color: "#7a5ad6",
    soft: "#efeaff",
    ink: "#4f35a8",
    intro: "Verbs, adjectives, adverbs, persuasive language and the four types of paragraphs — explicados em português.",
  },
  hist: {
    id: "hist",
    name: "História",
    emoji: "🏛️",
    unit: "Unidade 3 · Ampliação da participação política e conquista de direitos",
    color: "#b5532a",
    soft: "#fbebe2",
    ink: "#8a3a19",
    intro: "Democracia, a Grécia Antiga e a Revolução Francesa, o passado escravagista do Brasil e os direitos da pessoa com deficiência.",
  },
  sci: {
    id: "sci",
    name: "Ciências (Science)",
    emoji: "🔬",
    unit: "U3 · Simple Machines · U4 · Weather",
    color: "#0f8fa8",
    soft: "#e3f6fa",
    ink: "#0a6577",
    intro: "Máquinas simples (alavanca, roda e eixo, polia) e o tempo (Sol, nuvens, previsão e tempo severo): em português e em inglês, com simuladores e jogos.",
  },
};

const topics: Topic[] = [...geografia, ...ela, ...historia, ...ciencias];
const ordem: SubjectId[] = ["geo", "ela", "hist", "sci"];
const nomeCurto = (id: SubjectId) => (id === "ela" ? "E.L.A." : id === "sci" ? "Ciências" : subjects[id].name);
const bySubject = (id: SubjectId) => topics.filter((t) => t.subject === id);

type Route = { subject: SubjectId | null; topicId: string | null };

// Endereços simples (#geo, #geo-saneamento, #ela-verbs): funcionam no GitHub Pages e na página publicada.
function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "").replace("/", "-");
  const corte = hash.indexOf("-");
  const subject = (corte === -1 ? hash : hash.slice(0, corte)) as SubjectId;
  if (!ordem.includes(subject)) return { subject: null, topicId: null };
  const topicId = corte === -1 ? "" : hash.slice(corte + 1);
  const valid = topics.some((t) => t.subject === subject && t.id === topicId);
  return { subject, topicId: valid ? topicId : null };
}

function go(subject: SubjectId | null, topicId?: string | null) {
  window.location.hash = subject ? `${subject}${topicId ? `-${topicId}` : ""}` : "inicio";
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash());
  const [done, setDone] = useState<string[]>(() => load("done", []));

  useEffect(() => {
    const onHash = () => {
      stopNarrator();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => save("done", done), [done]);

  const toggleDone = (id: string) => setDone((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const subject = route.subject ? subjects[route.subject] : null;
  const topic = route.topicId ? topics.find((t) => t.subject === route.subject && t.id === route.topicId) ?? null : null;

  useEffect(() => {
    document.title = topic ? `${topic.title} · Estudos do 5º ano` : subject ? `${subject.name} · Estudos do 5º ano` : "Estudos do 5º ano";
  }, [topic, subject]);

  return (
    <div className="k-app" style={subject ? ({ "--accent": subject.color, "--soft": subject.soft, "--ink-accent": subject.ink } as React.CSSProperties) : undefined}>
      <Header route={route} />
      {!subject && <Welcome done={done} />}
      {subject && (
        <div className="k-layout">
          <Sidebar subject={subject} activeId={topic?.id ?? null} done={done} />
          <main className="k-main" id="conteudo">
            {topic ? <TopicView topic={topic} subject={subject} done={done.includes(topic.id)} onToggleDone={() => toggleDone(topic.id)} /> : <SubjectHome subject={subject} done={done} />}
          </main>
        </div>
      )}
      <footer className="k-footer">
        Material de estudo do 5º ano · feito a partir dos roteiros e materiais de pesquisa da escola, com alguns complementos. Bons estudos! 📚
      </footer>
      <NarratorBar />
    </div>
  );
}

/* ------------------------------------ header ------------------------------------ */

function Header({ route }: { route: Route }) {
  return (
    <header className="k-header">
      <div className="k-header-inner">
        <button className="k-brand" onClick={() => go(null)} aria-label="Início">
          <span className="k-brand-mark" aria-hidden="true">5º</span>
          <span className="k-brand-text">
            <b>Estudos do 5º ano</b>
            <small>Revisão para as provas</small>
          </span>
        </button>
        <nav className="k-subject-tabs" aria-label="Matérias">
          <button className={!route.subject ? "on" : ""} onClick={() => go(null)} aria-label="Início">
            <Home size={16} />
            <span className="k-hide-sm">Início</span>
          </button>
          {(Object.values(subjects) as Subject[]).map((s) => (
            <button key={s.id} className={route.subject === s.id ? "on" : ""} onClick={() => go(s.id)} style={{ "--tab": s.color } as React.CSSProperties}>
              <span aria-hidden="true">{s.emoji}</span>
              <span className="k-tab-label">{nomeCurto(s.id)}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------ início ------------------------------------ */

function Welcome({ done }: { done: string[] }) {
  return (
    <main className="k-welcome">
      <section className="k-hero">
        <div className="k-hero-copy">
          <span className="k-eyebrow">Olá, estudante! 👋</span>
          <h1>Vamos estudar juntos para as provas?</h1>
          <p>
            Aqui você encontra <b>todos os assuntos</b> de <b>Geografia</b>, <b>E.L.A.</b>, <b>História</b> e <b>Ciências</b> explicados de um jeito fácil, com exemplos, curiosidades, áudio e exercícios para treinar.
          </p>
          <div className="k-hero-actions">
            <button className="k-btn big" onClick={() => go("geo", geografia[0].id)}>🌎 Começar por Geografia</button>
            <button className="k-btn big alt" onClick={() => go("ela", ela[0].id)}>🇬🇧 Começar por E.L.A.</button>
            <button className="k-btn big hist" onClick={() => go("hist", historia[0].id)}>🏛️ Começar por História</button>
            <button className="k-btn big sci" onClick={() => go("sci", ciencias[0].id)}>🔬 Começar por Ciências</button>
          </div>
        </div>
        <div className="k-hero-art" aria-hidden="true">
          <span>📚</span><span>🌎</span><span>✏️</span><span>💡</span><span>🗺️</span><span>🔤</span>
        </div>
      </section>

      <section className="k-subject-cards">
        {(Object.values(subjects) as Subject[]).map((s) => {
          const list = bySubject(s.id);
          const count = list.filter((t) => done.includes(t.id)).length;
          return (
            <article key={s.id} className="k-subject-card" style={{ "--accent": s.color, "--soft": s.soft, "--ink-accent": s.ink } as React.CSSProperties}>
              <div className="k-subject-card-head">
                <span className="k-subject-emoji" aria-hidden="true">{s.emoji}</span>
                <div>
                  <h2>{s.name}</h2>
                  <small>{s.unit}</small>
                </div>
              </div>
              <p>{s.intro}</p>
              <Progress value={count} total={list.length} />
              <ul>
                {list.map((t) => (
                  <li key={t.id}>
                    <button onClick={() => go(s.id, t.id)}>
                      <span aria-hidden="true">{t.emoji}</span>
                      <span>{t.title}</span>
                      {done.includes(t.id) ? <CheckCircle2 size={16} className="k-ok" /> : <ArrowRight size={16} />}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="k-howto">
        <h2>🧭 Como usar esta página</h2>
        <div className="k-howto-grid">
          <div><b>1. Leia</b><span>Cada assunto tem explicações curtas, com exemplos do dia a dia.</span></div>
          <div><b>2. Ouça</b><span>Toque em <em>🔊 Ouvir</em> para escutar a explicação. Em E.L.A., toque nas palavras em inglês para ouvir a pronúncia.</span></div>
          <div><b>3. Pratique</b><span>No fim de cada assunto há 20 questões de revisão, com a correção explicada.</span></div>
          <div><b>4. Marque</b><span>Quando terminar, marque “Já estudei” para acompanhar seu progresso.</span></div>
        </div>
      </section>
    </main>
  );
}

function Progress({ value, total }: { value: number; total: number }) {
  return (
    <div className="k-progress" aria-label={`${value} de ${total} assuntos estudados`}>
      <div className="k-progress-track"><i style={{ width: `${(value / total) * 100}%` }} /></div>
      <span>{value}/{total} estudados</span>
    </div>
  );
}

/* ------------------------------------ matéria ------------------------------------ */

function Sidebar({ subject, activeId, done }: { subject: Subject; activeId: string | null; done: string[] }) {
  const list = bySubject(subject.id);
  return (
    <aside className="k-sidebar" aria-label={`Assuntos de ${subject.name}`}>
      <button className={`k-side-title ${activeId ? "" : "on"}`} onClick={() => go(subject.id)}>
        <span aria-hidden="true">{subject.emoji}</span>
        <span>
          <b>{subject.name}</b>
          <small>{subject.unit}</small>
        </span>
      </button>
      <nav className="k-topic-nav">
        {list.map((t, i) => (
          <button key={t.id} className={t.id === activeId ? "on" : ""} onClick={() => go(subject.id, t.id)} aria-current={t.id === activeId ? "page" : undefined}>
            <span className="k-topic-num">{done.includes(t.id) ? <CheckCircle2 size={16} /> : i + 1}</span>
            <span className="k-topic-name">
              <span aria-hidden="true">{t.emoji} </span>
              {t.title}
            </span>
          </button>
        ))}
      </nav>
      <div className="k-side-progress">
        <Progress value={list.filter((t) => done.includes(t.id)).length} total={list.length} />
      </div>
    </aside>
  );
}

function SubjectHome({ subject, done }: { subject: Subject; done: string[] }) {
  const list = bySubject(subject.id);
  const roteiro =
    subject.id === "sci"
      ? {
          oque: ["U3 — Simple Machines: máquinas simples, alavanca, roda e eixo e polia", "U4 — Weather: energia do Sol, nuvens, previsão do tempo e tempo severo"],
          como: ["Ler o Student Book e fazer resumos curtos de cada aula", "Revisar as Cornell Notes feitas em sala", "Sublinhar as partes importantes do texto", "Anotar as dúvidas e levar para a aula", "Comparar suas respostas com as dos colegas"],
        }
      : subject.id === "hist"
      ? {
          oque: ["Democracia: ampliação da participação política", "Brasil: um passado escravagista", "Direito da Pessoa com Deficiência"],
          como: ["Definir uma rotina diária de estudos para a prova", "Ler os textos enviados", "Fazer resumos", "Tirar dúvidas com os professores"],
        }
      : subject.id === "geo"
      ? {
          oque: ["Saneamento básico, saúde e qualidade de vida", "Educação, moradia e segurança", "Desigualdades sociais: a cidade invisível e pessoas em situação de rua"],
          como: ["Definir uma rotina diária de estudos para a prova", "Ler os textos enviados", "Fazer resumos", "Tirar dúvidas com os professores"],
        }
      : {
          oque: ["U8 — Adjectives, adverbs and verbs", "U9 — Persuasive language", "U10 e U11 — Types of paragraph"],
          como: ["Estudar pelo material de pesquisa (14 para a U8; 15 para as U9–11)", "Reforçar com as lições de casa", "Ler livros sobre o tema na plataforma Kids A-Z", "Fazer a atividade de revisão (Review activity)"],
        };

  return (
    <div className="k-subject-home">
      <div className="k-topic-hero">
        <span className="k-eyebrow">{subject.unit}</span>
        <h1>{subject.emoji} {subject.name}</h1>
        <p>{subject.intro}</p>
      </div>

      <div className="k-roteiro">
        <div>
          <h2><BookOpen size={18} /> O que estudar?</h2>
          <ul className="k-list">{roteiro.oque.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h2><ListChecks size={18} /> Como estudar?</h2>
          <ul className="k-list">{roteiro.como.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>

      <h2 className="k-h2">Escolha um assunto</h2>
      <div className="k-topic-cards">
        {list.map((t, i) => (
          <button key={t.id} className="k-topic-card" onClick={() => go(subject.id, t.id)}>
            <span className="k-topic-card-emoji" aria-hidden="true">{t.emoji}</span>
            <span className="k-topic-card-num">Assunto {i + 1}{done.includes(t.id) && " · ✅ estudado"}</span>
            <b>{t.title}</b>
            <small>{t.summary}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------ assunto ------------------------------------ */

function TopicView({ topic, subject, done, onToggleDone }: { topic: Topic; subject: Subject; done: boolean; onToggleDone: () => void }) {
  const list = bySubject(subject.id);
  const index = list.findIndex((t) => t.id === topic.id);
  const prev = list[index - 1];
  const next = list[index + 1];
  const Body = useMemo(() => topic.body, [topic]);

  return (
    <article className="k-topic">
      <div className="k-mobile-topics" role="navigation" aria-label="Outros assuntos">
        {list.map((t, i) => (
          <button key={t.id} className={t.id === topic.id ? "on" : ""} onClick={() => go(subject.id, t.id)}>
            {t.emoji} {i + 1}
          </button>
        ))}
      </div>

      <header className="k-topic-hero">
        <span className="k-eyebrow">{subject.name} · Assunto {index + 1} de {list.length} · {topic.subtitle}</span>
        <h1><span aria-hidden="true">{topic.emoji}</span> {topic.title}</h1>
        <div className="k-summary">
          <div>
            <strong>Em poucas palavras</strong>
            <p>{topic.summary}</p>
          </div>
          <SpeakButton id={`resumo-${topic.id}`} text={topic.narration} title={topic.title} accent={subject.color} />
        </div>
      </header>

      <div className="k-topic-body">
        <Body />
      </div>

      {topic.quiz && <Quiz id={topic.id} questions={topic.quiz} accent={subject.color} title={`Revisão: ${topic.quiz.length} questões`} />}

      <div className="k-topic-footer">
        <button className={`k-done ${done ? "on" : ""}`} onClick={onToggleDone}>
          {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {done ? "Já estudei este assunto!" : "Marcar como estudado"}
        </button>
        <div className="k-pager">
          {prev ? (
            <button className="k-btn ghost" onClick={() => go(subject.id, prev.id)}>
              <ArrowLeft size={16} /> <span className="k-hide-sm">{prev.title}</span><span className="k-show-sm">Anterior</span>
            </button>
          ) : <span />}
          {next ? (
            <button className="k-btn" onClick={() => go(subject.id, next.id)}>
              <span className="k-hide-sm">{next.title}</span><span className="k-show-sm">Próximo</span> <ArrowRight size={16} />
            </button>
          ) : (
            <button className="k-btn" onClick={() => go(ordem[(ordem.indexOf(subject.id) + 1) % ordem.length])}>
              Ir para {nomeCurto(ordem[(ordem.indexOf(subject.id) + 1) % ordem.length])} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
