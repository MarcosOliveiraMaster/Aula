// Roteiros de áudio: o que o narrador fala vai além do texto da tela,
// acrescentando o contexto, o "porquê" e dicas para o estudante.

type AnyRecord = Record<string, any>;

const join = (...parts: Array<string | undefined | null | false>) =>
  parts
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) => {
      const text = part.trim();
      return /[.!?:]$/.test(text) ? text : `${text}.`;
    })
    .join(" ");

const variablesText = (variables?: Record<string, string>) => {
  if (!variables) return "";
  const entries = Object.entries(variables);
  if (!entries.length) return "";
  return `Nessa fórmula, ${entries.map(([letter, meaning]) => `${letter.replace(/,\s*\.\.\./, "")} quer dizer ${meaning}`).join("; ")}`;
};

const unitHint = (label: string) => {
  const topic = label.toLowerCase();
  if (/área|losango|trapézio|paralelogramo|metade do círculo/.test(topic)) return "Lembre: resposta de área vem com unidade ao quadrado, como centímetros quadrados ou metros quadrados";
  if (/perímetro|quadrado|retângulo|lados|comprimento/.test(topic)) return "Lembre: a resposta é um comprimento, em centímetros ou metros";
  if (/ângulo|triângulo|polígono/.test(topic)) return "Lembre: ângulos são medidos em graus";
  return "";
};

export function ideaNarration(block: AnyRecord) {
  return join(
    `Bloco ${block.id}: ${block.titulo}`,
    block.audio_ideia ?? block.ideia_central,
    block.relembrar && `E uma lembrança dos anos iniciais: ${block.relembrar}`,
    block.conexao_com_o_mundo && `Onde isso aparece no dia a dia? ${block.conexao_com_o_mundo}`,
  );
}

export function worldNarration(block: AnyRecord) {
  return join(
    `Onde ${block.titulo.toLowerCase()} aparece na vida real? ${block.conexao_com_o_mundo}`,
    "Da próxima vez que você vir uma dessas coisas, tente imaginar a conta que existe por trás dela. Quando a imagem faz sentido, a fórmula deixa de ser um truque e vira uma ferramenta",
  );
}

export function rememberNarration(block: AnyRecord) {
  return join(
    "Vamos relembrar o que você já aprendeu nos anos iniciais",
    block.relembrar,
    "Viu só? Você não está começando do zero. O que vamos estudar agora é só um passo a mais em cima do que você já sabe",
  );
}

export function warmupIntroNarration(block: AnyRecord) {
  const questions: string[] = block.sondagem_inicial ?? [];
  return join(
    "Antes de começar, vamos aquecer o cérebro. Estas perguntas não são prova: servem só para você perceber o que já sabe",
    ...questions.map((question, index) => `Pergunta ${index + 1}: ${question}`),
    "Pense um pouquinho em cada uma. Se não souber, tudo bem: é justamente isso que vamos descobrir juntos neste bloco",
  );
}

export function warmupNarration(question: string, index: number) {
  return join(
    `Pergunta de aquecimento número ${index + 1}`,
    question,
    "Pause o áudio e pense por alguns segundos. Você pode responder em voz alta ou anotar no caderno. Não existe resposta errada aqui: o importante é começar a pensar no assunto",
  );
}

export function detailNarration(detail: string) {
  return join(
    `Observe isto: ${detail}`,
    "Tente lembrar de uma situação parecida na sua casa ou na escola. Ligar a Matemática com coisas que você conhece ajuda muito a guardar a ideia",
  );
}

export function formulaNarration(formula: AnyRecord) {
  const label = formula.figura ?? "Fórmula";
  const expression = formula.formula ?? formula.expressao ?? "";
  return join(
    `${label}. A fórmula se escreve assim: ${expression}`,
    variablesText(formula.variaveis),
    formula.audio ?? (formula.de_onde_vem && `De onde ela vem? ${formula.de_onde_vem}`),
    unitHint(label),
  );
}

export function formulaOriginNarration(formula: AnyRecord) {
  return join(
    `De onde vem a fórmula ${formula.figura ? `do ${formula.figura.toLowerCase()}` : ""}?`,
    formula.de_onde_vem,
    "Entender de onde a fórmula vem é melhor do que decorar: se um dia você esquecer, dá para montar ela de novo com esse raciocínio",
  );
}

export function contrastNarration(block: AnyRecord) {
  const diff = block.diferenca_perimetro_x_area ?? {};
  return join(
    "Vamos comparar perímetro e área, porque é muito comum confundir os dois",
    diff.perimetro && `Perímetro é o contorno: ${diff.perimetro}`,
    diff.area && `Área é o espaço de dentro: ${diff.area}`,
    diff.exemplo_revelador,
    "Um truque para não esquecer: se dá para passar o dedo em volta, é perímetro; se dá para pintar por dentro, é área",
  );
}

export function insightNarration(block: AnyRecord) {
  return join(
    "Agora, uma curiosidade importante",
    block.insight_importante,
    "Por quê? Porque na área o raio é multiplicado por ele mesmo. Dobrando o raio, a conta fica 2 vezes 2, ou seja, 4 vezes maior",
  );
}

export function methodNarration(step: AnyRecord) {
  return step.audio ?? join(step.nome, step.pergunta_guia);
}

const stepIntro = ["Passo 1, entender o pedido", "Passo 2, separar os dados", "Passo 3, escolher a fórmula", "Passo 4, substituir", "Passo 5, resolver linha por linha", "Passo 6, conferir"];

export function exampleStepNarration(example: AnyRecord, steps: string[], index: number, coaching: string) {
  const lines = (steps[index] ?? "").split("\n").filter(Boolean);
  const readLines = lines.length > 1 ? lines.map((line, i) => (i === 0 ? `Primeiro: ${line}` : i === lines.length - 1 ? `Por fim: ${line}` : `Depois: ${line}`)) : lines;
  return join(
    index === 0 && `Vamos resolver juntos este exemplo. O problema diz: ${example.enunciado}`,
    index === 0 && example.comentario_didatico && `Uma dica antes de começar: ${example.comentario_didatico}`,
    stepIntro[index],
    ...readLines,
    `Por que este passo importa? ${coaching}`,
    index === 5 && example.resposta && `Então a resposta final é: ${example.resposta}`,
    index < 5 && "Quando estiver pronto, clique em próximo passo",
  );
}

export function storyNarration(story: AnyRecord) {
  const lines: string[] = story.resolucao ?? [];
  return join(
    `Vamos ver uma situação do dia a dia. ${story.enunciado}`,
    "Acompanhe a resolução, uma linha de cada vez",
    ...lines.map((line, index) => `${index === 0 ? "Começamos com" : "Depois"}: ${line}`),
    `Resposta: ${story.resposta}`,
    "Repare como a resposta tem número e unidade. Uma resposta só com o número fica incompleta",
  );
}

export function practiceNarration(exercise: AnyRecord) {
  return join(
    "Sua vez! Vamos ler a questão juntos",
    exercise.enunciado,
    "Antes de escrever, use o método: o que a questão está pedindo? Quais números ela deu? Qual fórmula liga uma coisa à outra?",
    "Faça a conta no caderno, escreva a resposta no campo e clique em conferir. Se travar, pode pedir uma dica: ela aparece aos pouquinhos, sem entregar tudo de uma vez",
  );
}

export function feedbackNarration(correct: boolean, hints: string[], hintLevel: number, expected: string) {
  if (correct) {
    return join(
      "Muito bem, você acertou!",
      "Agora um desafio extra: tente explicar em voz alta qual foi a primeira coisa que você fez para resolver. Quem consegue explicar, aprendeu de verdade",
    );
  }
  const shown = hints.slice(0, hintLevel);
  return join(
    "Ainda não foi desta vez, e está tudo bem. O erro é uma pista que mostra onde olhar",
    ...shown.map((hint, index) => `Dica ${index + 1}: ${hint}`),
    hintLevel >= hints.length && expected && `Veja a resolução completa: ${expected}`,
    hintLevel >= hints.length ? "Compare com o que você fez e descubra em qual passo a conta escorregou" : "Tente de novo com essa dica. Se precisar, peça a próxima",
  );
}

export function errorNarration(error: string) {
  return join(
    "Atenção, esta é uma armadilha comum",
    error,
    "Para escapar dela, use o passo 6 do método: confira a unidade e veja se o resultado faz sentido antes de dar a resposta",
  );
}

export function closingNarration(block: AnyRecord) {
  return join(
    "Para fechar o bloco, vamos usar a técnica de ensinar de volta",
    block.fechamento,
    "Explique em voz alta, como se estivesse ensinando um colega. Se você conseguir explicar sem olhar, é sinal de que aprendeu. Depois, marque o bloco como concluído",
  );
}

export function videoNarration(video: AnyRecord) {
  return join(
    `Vídeo de apoio: ${video.titulo}`,
    video.quando_usar,
    "Enquanto assiste, pause quando quiser e anote as fórmulas no caderno. Depois, volte aqui para praticar",
  );
}

const simuladoTips: Record<string, string> = {
  Perímetro: "Lembre: perímetro é o contorno, então some todos os lados",
  Área: "Lembre: área é o espaço de dentro e a resposta tem unidade ao quadrado",
  Círculo: "Lembre: a área do círculo é pi vezes raio vezes raio",
  Circunferência: "Lembre: a volta é 2 vezes pi vezes o raio",
  Equação: "Lembre da balança: faça a mesma coisa dos dois lados até o xis ficar sozinho",
  Polígonos: "Lembre: a soma dos ângulos é o número de lados menos 2, vezes 180",
  Ângulos: "Lembre: os três ângulos de um triângulo somam 180 graus",
  Pitágoras: "Lembre: multiplique cada cateto por ele mesmo, some e descubra qual número vezes ele mesmo dá o resultado",
};

export function simuladoNarration(question: AnyRecord, index: number, total: number) {
  const tip = Object.entries(simuladoTips).find(([topic]) => (question.tema ?? "").includes(topic))?.[1];
  return join(
    `Questão ${index + 1} de ${total}, sobre ${question.tema}`,
    question.enunciado,
    tip,
    "Resolva no caderno com calma, escreva a resposta e clique em conferir",
  );
}

export function simuladoFeedbackNarration(correct: boolean, resolution: string) {
  return join(
    correct ? "Acertou! Muito bem" : "Quase! Use isso como pista",
    `Veja a resolução: ${resolution}`,
    correct ? "Quando estiver pronto, vá para a próxima questão" : "Compare com o seu caderno e encontre o passo em que a conta mudou de caminho",
  );
}
