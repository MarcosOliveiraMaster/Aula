import type { ReactNode } from "react";

export type SubjectId = "geo" | "ela";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Topic = {
  id: string;
  subject: SubjectId;
  emoji: string;
  title: string;
  subtitle: string;
  /** Uma frase curta: "em poucas palavras". */
  summary: string;
  /** Texto em português lido pelo narrador (botão "Ouvir"). */
  narration: string;
  body: () => ReactNode;
  quiz?: QuizQuestion[];
};

export type Subject = {
  id: SubjectId;
  name: string;
  emoji: string;
  unit: string;
  color: string;
  soft: string;
  ink: string;
  intro: string;
};
