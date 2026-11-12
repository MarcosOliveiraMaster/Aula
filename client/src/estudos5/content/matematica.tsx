import type { ReactNode } from "react";
import type { Topic } from "../types";
import { Callout, Say, Section, WordChips, sayEnglish } from "../ui";
import { Frac, Passos, QuizAleatorio } from "../mat/util";
import { Grade100, ImproperToMixed, LigarDecimais, LigarMistos, MonteMisto, NumberLine, Pizzas, SortFractions, TwoEquivalent, quizDecimaisEN, quizDecimaisPT, quizMistosEN, quizMistosPT } from "../mat/fracoes";
import { AreaDecimal, AreaUnits, CompareShapes, FiguraNaMalha, FormigaPerimetro, LarguraQueFalta, MatchPerimeters, MissingWidth, MonteRetangulo, OrderByArea, PinteNaMalha, TraceThePerimeter, quizAreaEN, quizAreaPT, quizMalhaEN, quizMalhaPT, quizPerimetroEN, quizPerimetroPT } from "../mat/medidas";
import { AgrupeFatores, ConstrutorFib, FatorQueFalta, FindTheMistake, MatchProducts, OrderFib, ProximoFib, ZeroPattern, quizFibEN, quizFibPT, quizMultEN, quizMultPT } from "../mat/padroes";
import { BuildSpinner, MonteOSaco, PredictAndDraw, RoletaChances, quizProbEN, quizProbPT } from "../mat/probabilidade";
import { ProvaMath } from "../mat/prova";

const MAT = "#d9661f";

/** Monta um assunto no formato combinado: PT (explicação, 2 interativas, quiz) → EN (explicação, palavras-chave, 2 interativas, quiz). */
function Bloco({ pt, interativasPT, quizPT, en, palavras, interativasEN, quizEN }: {
  pt: ReactNode; interativasPT: ReactNode; quizPT: ReactNode; en: string[]; palavras: Array<[string, string]>; interativasEN: ReactNode; quizEN: ReactNode;
}) {
  return (
    <>
      <div className="k-lang-band pt">🇧🇷 Em português</div>
      {pt}
      <Section emoji="🧩" title="Pratique: atividades interativas">{interativasPT}</Section>
      {quizPT}
      <div className="k-lang-band en">🇬🇧 In English</div>
      <Section emoji="🇬🇧" title="Now in English!">
        <div className="k-english">
          {en.map((p) => (
            <div key={p.slice(0, 30)} className="k-english-p"><Say text={p} /><p lang="en">{p}</p></div>
          ))}
          <button className="k-btn ghost" onClick={() => sayEnglish(en.join(" "))}>🔊 Listen to everything</button>
        </div>
      </Section>
      <Section emoji="🔑" title="Key words (palavras-chave)">
        <WordChips words={palavras} />
      </Section>
      <Section emoji="🧩" title="Practice: interactive activities">{interativasEN}</Section>
      {quizEN}
    </>
  );
}

const topicos: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "fracoes-mistos",
    subject: "mat",
    emoji: "🍕",
    title: "Frações e números mistos · Fractions and mixed numbers",
    subtitle: "U8 · págs. 262–263",
    summary: "Um número misto tem uma parte inteira e uma fração (2 7/8). Ele pode ser escrito como fração imprópria, com o numerador maior que o denominador (23/8).",
    narration: "Um número misto tem uma parte inteira e uma fração, como dois inteiros e sete oitavos. Para escrever como fração imprópria, multiplicamos os inteiros pelo denominador e somamos o numerador. Dois vezes oito, dezesseis, mais sete, vinte e três. Então dois inteiros e sete oitavos é igual a vinte e três oitavos.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="🍕" title="Número misto e fração imprópria" accent={MAT}
            narration="Um número misto tem uma parte inteira e uma fração. Uma fração imprópria tem o numerador maior que o denominador. Para transformar o número misto em fração imprópria: inteiros vezes denominador, mais o numerador.">
            <p>Um <b>número misto</b> tem uma <b>parte inteira</b> e uma <b>fração</b>. Exemplo: <b><Frac inteiro={2} n={7} d={8} /> pizzas</b> = 2 pizzas inteiras e mais 7 fatias de uma pizza cortada em 8.</p>
            <Pizzas total={23} d={8} />
            <p>Uma <b>fração imprópria</b> tem o <b>numerador maior que o denominador</b>. Contando todas as fatias: <b><Frac n={23} d={8} /></b>.</p>
            <Callout kind="dica" title="Como transformar">
              <Passos itens={[<>Multiplique os inteiros pelo denominador: 2 × 8 = 16 fatias.</>, <>Some o numerador: 16 + 7 = 23.</>, <>Mantenha o denominador: <b><Frac inteiro={2} n={7} d={8} /> = <Frac n={23} d={8} /></b>.</>]} />
            </Callout>
            <Callout kind="lembre" title="E ao contrário?">
              <Frac n={17} d={4} />: divida 17 ÷ 4 = 4, sobra 1 → <b><Frac inteiro={4} n={1} d={4} /></b>.
            </Callout>
          </Section>
        }
        interativasPT={<><MonteMisto lang="pt" /><LigarMistos lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: números mistos" lang="pt" gerar={quizMistosPT} />}
        en={[
          "A mixed number has a whole number and a fraction, like 2 and 7 eighths pizzas.",
          "An improper fraction has a numerator greater than the denominator, like 23 eighths.",
          "To change a mixed number into an improper fraction, multiply the whole number by the denominator, then add the numerator. Keep the same denominator.",
        ]}
        palavras={[["fraction", "fração"], ["mixed number", "número misto"], ["improper fraction", "fração imprópria"], ["proper fraction", "fração própria"], ["numerator", "numerador"], ["denominator", "denominador"], ["whole", "inteiro"], ["equivalent", "equivalente"]]}
        interativasEN={<><ImproperToMixed lang="en" /><SortFractions lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: mixed numbers" lang="en" gerar={quizMistosEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "fracoes-decimais",
    subject: "mat",
    emoji: "🔟",
    title: "Frações e decimais · Fractions and decimals",
    subtitle: "U8 · págs. 270–271",
    summary: "Frações com denominador 10 e 100 podem ser escritas como decimais: 4/10 = 0,4 e 25/100 = 0,25.",
    narration: "Frações com denominador dez e cem viram decimais. Uma casa depois da vírgula são os décimos: quatro décimos é zero vírgula quatro. Duas casas são os centésimos: vinte e cinco centésimos é zero vírgula vinte e cinco. Um decimal pode ter várias frações equivalentes: zero vírgula quatro é quatro décimos e também quarenta centésimos.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="🔟" title="Décimos e centésimos" accent={MAT}
            narration="Uma casa depois da vírgula são os décimos. Duas casas depois da vírgula são os centésimos.">
            <div className="k-vs">
              <div><span className="k-vs-tag">DÉCIMOS (÷10)</span><p>1 casa depois da vírgula</p><b>0,4 = <Frac n={4} d={10} /></b><b>1,6 = <Frac n={16} d={10} /></b></div>
              <div><span className="k-vs-tag">CENTÉSIMOS (÷100)</span><p>2 casas depois da vírgula</p><b>0,25 = <Frac n={25} d={100} /></b><b>0,75 = <Frac n={75} d={100} /></b></div>
            </div>
            <Callout kind="dica" title="Duas frações equivalentes">
              <Passos itens={[
                <>0,4 = <Frac n={4} d={10} />. Multiplique em cima e embaixo por 10: <Frac n={40} d={100} />. Então <b>0,4 = 4/10 = 40/100</b>.</>,
                <>0,25 = <Frac n={25} d={100} />. Divida em cima e embaixo por 25: <Frac n={1} d={4} />. Então <b>0,25 = 25/100 = 1/4</b>.</>,
              ]} />
            </Callout>
          </Section>
        }
        interativasPT={<><Grade100 lang="pt" /><LigarDecimais lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: frações e decimais" lang="pt" gerar={quizDecimaisPT} />}
        en={[
          "Fractions with a denominator of 10 or 100 can be written as decimals.",
          "One digit after the decimal point shows tenths: 4 tenths is 0.4.",
          "Two digits after the decimal point show hundredths: 25 hundredths is 0.25.",
          "Equivalent fractions have the same value: 0.4 = 4/10 = 40/100.",
        ]}
        palavras={[["decimal", "decimal"], ["decimal point", "vírgula (ponto) decimal"], ["tenths", "décimos"], ["hundredths", "centésimos"], ["equivalent fractions", "frações equivalentes"], ["denominator", "denominador"]]}
        interativasEN={<><NumberLine lang="en" /><TwoEquivalent lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: fractions and decimals" lang="en" gerar={quizDecimaisEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "malha",
    subject: "mat",
    emoji: "🟦",
    title: "Perímetro e área na malha · Grids",
    subtitle: "U9 · págs. 319–320",
    summary: "Na malha quadriculada, o perímetro é o número de lados de quadradinho no contorno e a área é o número de quadradinhos de dentro.",
    narration: "Na malha quadriculada, o perímetro é a medida do contorno: contamos os ladinhos de quadradinho em volta da figura. A área é o espaço de dentro: contamos os quadradinhos.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="🟦" title="Contando na malha" accent={MAT}
            narration="O perímetro é o contorno. A área é o espaço de dentro.">
            <div className="k-vs">
              <div><span className="k-vs-tag">PERÍMETRO</span><p>O <b>contorno</b> da figura. Conte cada <b>ladinho</b> de quadradinho em volta.</p></div>
              <div><span className="k-vs-tag">ÁREA</span><p>O <b>espaço de dentro</b>. Conte os <b>quadradinhos</b>.</p></div>
            </div>
            <Callout kind="dica" title="Para não se perder">Comece num canto e ande pelo contorno, marcando cada ladinho até voltar ao começo.</Callout>
          </Section>
        }
        interativasPT={<><PinteNaMalha lang="pt" /><FiguraNaMalha lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: perímetro e área na malha" lang="pt" gerar={quizMalhaPT} />}
        en={[
          "On grid paper, the perimeter is the distance around a shape. Count the unit sides around the outline.",
          "The area is the space inside a shape. Count the square units inside.",
        ]}
        palavras={[["perimeter", "perímetro"], ["area", "área"], ["grid paper", "papel quadriculado"], ["square unit", "unidade quadrada"], ["outline", "contorno"], ["shape", "figura"]]}
        interativasEN={<><TraceThePerimeter lang="en" /><CompareShapes lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: perimeter and area on a grid" lang="en" gerar={quizMalhaEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "perimetro",
    subject: "mat",
    emoji: "📏",
    title: "Perímetro de polígonos · Perimeter",
    subtitle: "U9 · págs. 323–324",
    summary: "O perímetro de um polígono é a soma de todos os lados. No retângulo: comprimento + largura + comprimento + largura.",
    narration: "O perímetro de um polígono é a soma das medidas de todos os lados. No retângulo, os lados opostos são iguais. Se sabemos o perímetro e o comprimento, tiramos os dois comprimentos do perímetro e dividimos o resto por dois para achar a largura.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="📏" title="Somando os lados" accent={MAT}
            narration="O perímetro é a soma de todos os lados.">
            <p><b>Perímetro</b> = soma de <b>todos os lados</b> do polígono.</p>
            <p>No <b>retângulo</b>, os lados opostos são iguais: perímetro = comprimento + largura + comprimento + largura.</p>
            <Callout kind="dica" title="Achando a largura (como na questão do parquinho)">
              <Passos itens={[<>Comprimento 60 m, perímetro 180 m.</>, <>Tire os dois comprimentos: 180 − 60 − 60 = 60.</>, <>Sobram as duas larguras: 60 ÷ 2 = <b>30 m</b>.</>]} />
            </Callout>
          </Section>
        }
        interativasPT={<><FormigaPerimetro lang="pt" /><LarguraQueFalta lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: perímetro" lang="pt" gerar={quizPerimetroPT} />}
        en={[
          "The perimeter of a polygon is the sum of the lengths of all its sides.",
          "In a rectangle, opposite sides are equal: perimeter = length + width + length + width.",
          "If you know the perimeter and the length, subtract the two lengths and divide what is left by 2 to find the width.",
        ]}
        palavras={[["polygon", "polígono"], ["side", "lado"], ["length", "comprimento"], ["width", "largura"], ["rectangle", "retângulo"], ["square", "quadrado"], ["measure", "medir"]]}
        interativasEN={<><MatchPerimeters lang="en" /><MissingWidth lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: perimeter" lang="en" gerar={quizPerimetroEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "area-retangulo",
    subject: "mat",
    emoji: "▭",
    title: "Área do retângulo · Area of a rectangle",
    subtitle: "U9 · págs. 331–332",
    summary: "A regra da área do retângulo é: área = comprimento × largura. A resposta é em unidades quadradas (km², m², dm²).",
    narration: "A área do retângulo é o comprimento vezes a largura. A resposta é sempre em unidades quadradas, como metros quadrados. Com números decimais, multiplicamos sem a vírgula e depois colocamos as casas decimais de volta.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="▭" title="A regra da área" accent={MAT}
            narration="Área do retângulo é comprimento vezes largura.">
            <p>Em vez de contar quadradinho por quadradinho, usamos a <b>regra</b>: <b>área = comprimento × largura</b>.</p>
            <p>A resposta é em <b>unidades quadradas</b>: km², m², dm², cm².</p>
            <Callout kind="dica" title="Com decimais (como na prova)">
              <Passos itens={[<>5,5 km × 4,0 km → faça 55 × 4 = 220.</>, <>Havia 1 casa decimal: 220 → 22,0.</>, <>Área = <b>22 km²</b>.</>]} />
            </Callout>
          </Section>
        }
        interativasPT={<><MonteRetangulo lang="pt" /><AreaDecimal lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: área do retângulo" lang="pt" gerar={quizAreaPT} />}
        en={[
          "The rule for the area of a rectangle is: area equals length times width.",
          "Area is measured in square units, like square metres or square kilometres.",
          "With decimals, multiply without the decimal point, then put the decimal places back.",
        ]}
        palavras={[["area", "área"], ["length", "comprimento"], ["width", "largura"], ["rule", "regra"], ["square metre (m²)", "metro quadrado"], ["square kilometre (km²)", "quilômetro quadrado"], ["multiply", "multiplicar"]]}
        interativasEN={<><OrderByArea lang="en" /><AreaUnits lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: area of a rectangle" lang="en" gerar={quizAreaEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "padroes-multiplicacao",
    subject: "mat",
    emoji: "✖️",
    title: "Padrões na multiplicação · Patterns in multiplication",
    subtitle: "U10 · págs. 350–351",
    summary: "Padrões ajudam a multiplicar: achar o fator que falta (□ × 50 = 1250) e agrupar números que formam 10, 100 ou 1000 (2 × 16 × 5 = 16 × 10).",
    narration: "Para achar o fator que falta, pensamos na divisão: se algo vezes cinquenta é mil duzentos e cinquenta, dividimos mil duzentos e cinquenta por cinquenta. Para multiplicar três números, podemos mudar a ordem e juntar primeiro os que formam dez, cem ou mil. Por exemplo, dois vezes dezesseis vezes cinco: dois vezes cinco é dez, e dez vezes dezesseis é cento e sessenta.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="✖️" title="Duas estratégias" accent={MAT}
            narration="Fator que falta e agrupar para formar dez, cem ou mil.">
            <div className="k-vs">
              <div><span className="k-vs-tag">FATOR QUE FALTA</span><p>□ × 50 = 1250</p><p>Pense na divisão: 1250 ÷ 50. Tire um zero: 125 ÷ 5 = <b>25</b>.</p></div>
              <div><span className="k-vs-tag">AGRUPAR</span><p>2 × 16 × 5</p><p>Junte 2 × 5 = 10. Depois 10 × 16 = <b>160</b>.</p></div>
            </div>
            <Callout kind="dica" title="Pares amigos">2 × 5 = 10 · 2 × 50 = 100 · 4 × 25 = 100 · 5 × 20 = 100 · 2 × 500 = 1000. A ordem dos fatores não muda o resultado!</Callout>
          </Section>
        }
        interativasPT={<><FatorQueFalta lang="pt" /><AgrupeFatores lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: padrões na multiplicação" lang="pt" gerar={quizMultPT} />}
        en={[
          "To find a missing factor, think of division: if something times 50 is 1250, then it is 1250 divided by 50, which is 25.",
          "When you multiply three numbers, you can change the order. Multiply the friendly pair first: 2 times 5 is 10, then 10 times 16 is 160.",
        ]}
        palavras={[["factor", "fator"], ["missing factor", "fator que falta"], ["product", "produto (resultado)"], ["multiply", "multiplicar"], ["pattern", "padrão"], ["strategy", "estratégia"]]}
        interativasEN={<><MatchProducts lang="en" /><ZeroPattern lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: patterns in multiplication" lang="en" gerar={quizMultEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "fibonacci",
    subject: "mat",
    emoji: "🐚",
    title: "Sequência de Fibonacci · Fibonacci sequence",
    subtitle: "U10 · pág. 362",
    summary: "Na sequência de Fibonacci, cada número é a soma dos dois anteriores: 1, 1, 2, 3, 5, 8, 13…",
    narration: "Na sequência de Fibonacci, cada número é a soma dos dois números anteriores. Começa com um, um. Um mais um é dois. Um mais dois é três. Dois mais três é cinco. E assim por diante.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="🐚" title="Some os dois anteriores" accent={MAT}
            narration="Cada número é a soma dos dois anteriores.">
            <p>Na <b>sequência de Fibonacci</b>, cada número é a <b>soma dos dois anteriores</b>:</p>
            <p className="k-big k-center-note">1, 1, 2, 3, 5, 8, 13, 21, 34…</p>
            <Passos itens={[<>1 + 1 = 2</>, <>1 + 2 = 3</>, <>2 + 3 = 5</>, <>3 + 5 = 8</>]} />
          </Section>
        }
        interativasPT={<><ProximoFib lang="pt" /><ConstrutorFib lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: Fibonacci" lang="pt" gerar={quizFibPT} />}
        en={[
          "In the Fibonacci sequence, each number is the sum of the two numbers before it.",
          "It starts 1, 1, 2, 3, 5, 8, 13, 21, 34, and it keeps going.",
        ]}
        palavras={[["sequence", "sequência"], ["sum", "soma"], ["add", "somar"], ["next", "próximo"], ["before", "antes"], ["number pattern", "padrão numérico"]]}
        interativasEN={<><OrderFib lang="en" /><FindTheMistake lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: Fibonacci" lang="en" gerar={quizFibEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "probabilidade",
    subject: "mat",
    emoji: "🎲",
    title: "Probabilidade · Probability",
    subtitle: "U11 · págs. 380–381",
    summary: "Usamos as palavras impossível, pouco provável, provável e certo para dizer a chance de algo acontecer.",
    narration: "Para falar da chance de algo acontecer, usamos quatro palavras. Impossível: não pode acontecer. Pouco provável: pode acontecer, mas tem pouca chance. Provável: tem muita chance. Certo: vai acontecer com certeza. Num saco com fichas, se mais da metade é vermelha, tirar vermelha é provável.",
    body: () => (
      <Bloco
        pt={
          <Section emoji="🎲" title="As palavras da probabilidade" accent={MAT}
            narration="Impossível, pouco provável, provável e certo.">
            <div className="k-prob-scale">
              <div><b>Impossível</b><small>não pode acontecer</small></div>
              <div><b>Pouco provável</b><small>pouca chance</small></div>
              <div><b>Provável</b><small>muita chance</small></div>
              <div><b>Certo</b><small>vai acontecer</small></div>
            </div>
            <Callout kind="dica" title="No saco de fichas">
              Nenhuma ficha daquela cor → <b>impossível</b>. Poucas (menos da metade) → <b>pouco provável</b>. Mais da metade → <b>provável</b>. Todas → <b>certo</b>.
            </Callout>
          </Section>
        }
        interativasPT={<><MonteOSaco lang="pt" /><RoletaChances lang="pt" /></>}
        quizPT={<QuizAleatorio titulo="Quiz: probabilidade" lang="pt" gerar={quizProbPT} />}
        en={[
          "We use the language of probability to describe how likely an event is.",
          "Impossible means it cannot happen. Unlikely means it has a small chance. Likely means it has a good chance. Certain means it will happen.",
          "In a bag of counters, if more than half are red, picking red is likely. If there are no black counters, picking black is impossible.",
        ]}
        palavras={[["probability", "probabilidade"], ["impossible", "impossível"], ["unlikely", "pouco provável"], ["likely", "provável"], ["certain", "certo"], ["outcome", "resultado"], ["counter", "ficha"], ["spinner", "roleta"]]}
        interativasEN={<><BuildSpinner lang="en" /><PredictAndDraw lang="en" /></>}
        quizEN={<QuizAleatorio titulo="Quiz: probability" lang="en" gerar={quizProbEN} />}
      />
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "prova",
    subject: "mat",
    emoji: "📝",
    title: "Review Activity · igual à prova",
    subtitle: "As 9 questões com números novos",
    summary: "As mesmas 9 questões da Review Activity do PDF, com valores diferentes a cada vez que a página carrega. Resolva, digite e confira.",
    narration: "Esta é a lista igual à prova: as nove questões da atividade de revisão de Math, com números novos a cada vez. Resolva no caderno, digite as respostas e confira. Se errar, veja a resolução e gere uma nova prova para treinar de novo.",
    body: () => <ProvaMath />,
  },
];

export const matematica: Topic[] = topicos;
