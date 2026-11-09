import type { Topic } from "../types";
import { Callout, Card, CardGrid, Example, FillBlanks, Glossary, Quiz, Section, Sorter, UpgradeTable, VennSorter, WordChips, WritingHelper } from "../ui";

const ELA = "#7a5ad6";

export const ela: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "verbs",
    subject: "ela",
    emoji: "🏃",
    title: "Verbs — action & being words",
    subtitle: "Unit 8 · Verbos",
    summary: "Verb (verbo) é a palavra que mostra uma ação, um estado ou um processo: o que o sujeito faz ou como ele está.",
    narration:
      "Vamos estudar os verbos, que em inglês se chamam verbs. Verbo é a palavra que mostra uma ação, um estado ou um processo. Ele conta o que o sujeito está fazendo ou como ele está. Existem os verbos de ação, como correr, andar e falar. Para deixar um texto mais vivo, podemos trocar verbos simples por verbos mais fortes, os powerful action verbs. Por exemplo, em vez de walk, que é andar, podemos usar creep, que é andar de mansinho, ou march, que é marchar. Também existem os verbos de ligação, os linking verbs, que não mostram ação. Eles ligam o sujeito a um estado ou sentimento, como is, are, was, seems e feels. Por último, lembre que os verbos mudam com o tempo: passado, presente e futuro.",
    body: () => (
      <>
        <Section emoji="🤔" title="What is a verb? (O que é um verbo?)" accent={ELA}
          narration="Verbo é a palavra que mostra uma ação, um estado ou um processo. Ele responde à pergunta: o que o sujeito está fazendo, ou como ele está? Na frase I like to read books every day, que quer dizer eu gosto de ler livros todos os dias, os verbos são like, gostar, e read, ler.">
          <p>
            A <b>verb</b> (verbo) é a palavra que mostra uma <b>ação</b>, um <b>estado</b> ou um <b>processo</b>. Ele conta <b>o que o sujeito está fazendo</b> ou <b>como ele está</b>.
          </p>
          <Example en="I like to read books every day." pt="Eu gosto de ler livros todos os dias." highlight={["like", "read"]} />
          <Callout kind="dica" title="Truque para achar o verbo">
            Pergunte: <b>“O que alguém faz?”</b> Se a palavra responde a essa pergunta (corre, come, lê, pula), ela é um verbo!
          </Callout>
        </Section>

        <Section emoji="💪" title="Powerful action verbs (verbos de ação mais fortes)" accent={ELA}
          narration="Os verbos de ação mostram ações físicas, coisas que o corpo faz. Em vez de usar verbos comuns, como walk, run, say e look, os bons escritores usam verbos mais fortes. Eles criam uma imagem mais clara na cabeça de quem lê. Clique em cada palavra para ouvir a pronúncia em inglês.">
          <p>
            Em vez de usar verbos comuns, use verbos <b>mais fortes</b>. Eles criam uma <b>imagem mais viva</b> na cabeça de quem lê! Toque nas palavras para ouvir a pronúncia. 🔊
          </p>
          <UpgradeTable
            from="Verbo simples"
            to="Verbos mais fortes"
            rows={[
              { basic: "walk", basicPt: "andar", strong: [["stroll", "passear tranquilo"], ["march", "marchar"], ["creep", "andar de mansinho"], ["stride", "andar a passos largos"]] },
              { basic: "run", basicPt: "correr", strong: [["sprint", "correr a toda velocidade"], ["dash", "disparar"], ["bolt", "sair em disparada"], ["scamper", "correr saltitando"]] },
              { basic: "say", basicPt: "dizer", strong: [["whisper", "sussurrar"], ["exclaim", "exclamar"], ["mutter", "resmungar"], ["bellow", "berrar"]] },
              { basic: "look", basicPt: "olhar", strong: [["peer", "espiar com atenção"], ["glance", "dar uma olhadinha"], ["gaze", "contemplar"], ["stare", "encarar"]] },
            ]}
          />
          <h3 className="k-h3">Examples</h3>
          <Example en="The cat crept through the tall grass." pt="O gato andou de mansinho pelo capim alto. (crept = passado de creep)" highlight={["crept"]} />
          <Example en={"\"Look out!\" bellowed the captain."} pt="“Cuidado!”, berrou o capitão." highlight={["bellowed"]} />
          <Example en="She glanced at the clock before leaving." pt="Ela deu uma olhadinha no relógio antes de sair." highlight={["glanced"]} />
          <Callout kind="dica">
            Compare: <i lang="en">“The cat <b>walked</b> through the grass”</i> e <i lang="en">“The cat <b>crept</b> through the grass”</i>. Na segunda, dá até para imaginar o gato andando devagarinho, escondido! 🐈
          </Callout>
        </Section>

        <Section emoji="🔗" title="Linking verbs (verbos de ligação / de estado)" accent={ELA}
          narration="Os linking verbs, ou verbos de ligação, não mostram uma ação física. Eles ligam o sujeito a um estado, a um sentimento ou a uma condição. Funcionam como um sinal de igual: na frase the dragon was fierce, o dragão era feroz, o verbo was liga o dragão à palavra feroz. Os mais comuns são as formas do verbo to be, como am, is, are, was e were, e também seems, feels e becomes.">
          <p>
            Esses verbos <b>não mostram ação</b>. Eles <b>ligam</b> o sujeito a um <b>estado, sentimento ou condição</b>. Funcionam como um sinal de <b>=</b>!
          </p>
          <div className="k-equation" lang="en">
            <span>The dragon</span>
            <b>was</b>
            <span>fierce.</span>
          </div>
          <p className="k-center-note">o dragão <b>=</b> feroz</p>
          <WordChips
            words={[
              ["am", "sou/estou (I)"],
              ["is", "é/está (he, she, it)"],
              ["are", "são/estão (you, we, they)"],
              ["was", "era/estava"],
              ["were", "eram/estavam"],
              ["be", "ser/estar"],
              ["been", "sido/estado"],
              ["seems", "parece"],
              ["feels", "sente-se"],
              ["becomes", "torna-se"],
            ]}
          />
          <Example en="The dragon was fierce and protective." pt="O dragão era feroz e protetor." highlight={["was"]} />
          <Example en="The students felt confident before the exam." pt="Os alunos se sentiam confiantes antes da prova." highlight={["felt"]} />
          <Example en="It seems quiet in the hallway today." pt="Parece silencioso no corredor hoje." highlight={["seems"]} />
        </Section>

        <Section emoji="⏳" title="Verb tenses (os tempos do verbo)" accent={ELA}
          narration="Os verbos mudam de acordo com o tempo. No passado, usamos muitas vezes a terminação e d, como played, que quer dizer jogou. No presente, usamos play, ou plays com s no final quando o sujeito é he, she ou it, ou um nome de uma pessoa só. No futuro, colocamos will antes do verbo, como will play, que quer dizer vai jogar.">
          <div className="k-tenses">
            <div><span>⬅️ Past (passado)</span><b lang="en">I played soccer yesterday.</b><small>Eu joguei futebol ontem.</small></div>
            <div><span>⏺️ Present (presente)</span><b lang="en">I play soccer every day.</b><small>Eu jogo futebol todo dia.</small></div>
            <div><span>➡️ Future (futuro)</span><b lang="en">I will play soccer tomorrow.</b><small>Eu vou jogar futebol amanhã.</small></div>
          </div>
          <Callout kind="atencao" title="A regra do “s” no presente (cai muito em exercícios!)">
            Com <b lang="en">he, she, it</b> ou o nome de <b>uma pessoa/coisa só</b>, o verbo no presente ganha <b>-s</b> (ou <b>-es</b>):
            <ul className="k-list" lang="en">
              <li>Lucas <b>does</b> his homework. · My mother <b>cooks</b> pasta. · She <b>plays</b>.</li>
              <li>The children <b>play</b> soccer. · We <b>listen</b> to the teacher. · They <b>cook</b>.</li>
            </ul>
          </Callout>
          <Callout kind="dica" title="Verbos irregulares">
            Alguns verbos não seguem a regra do <b>-ed</b> no passado: <span lang="en">creep → <b>crept</b>, run → <b>ran</b>, feel → <b>felt</b>, say → <b>said</b>, go → <b>went</b></span>. Esses é bom decorar!
          </Callout>
        </Section>

        <Section emoji="📖" title="Words to remember">
          <Glossary
            items={[
              ["Verb", "Verbo: palavra de ação, estado ou processo."],
              ["Action verb", "Verbo de ação física (run, jump, write)."],
              ["Powerful verb", "Verbo mais forte e preciso, que deixa o texto mais vivo."],
              ["Linking verb", "Verbo de ligação: liga o sujeito a um estado (is, was, seems)."],
              ["Tense", "Tempo verbal: past, present, future."],
            ]}
          />
        </Section>
      </>
    ),
    quiz: [
      {
        q: "Which word is the verb? “The dog barked loudly.”",
        options: ["dog", "barked", "loudly", "the"],
        answer: 1,
        why: "Barked (latiu) é a ação que o cachorro fez.",
      },
      {
        q: "Qual é um verbo mais forte (powerful verb) para “run”?",
        options: ["whisper", "sprint", "gaze", "stroll"],
        answer: 1,
        why: "Sprint = correr a toda velocidade. Whisper é um tipo de “say”, gaze é “look” e stroll é “walk”.",
      },
      {
        q: "“She ______ at the clock before leaving.” Qual verbo significa “dar uma olhadinha”?",
        options: ["glanced", "bellowed", "dashed", "marched"],
        answer: 0,
        why: "Glance = dar uma olhada rápida.",
      },
      {
        q: "Em “The students felt confident”, o verbo “felt” é um:",
        options: ["Action verb (ação física)", "Linking verb (verbo de ligação)", "Adjective", "Adverb"],
        answer: 1,
        why: "Felt não mostra uma ação física: liga “students” ao sentimento “confident”.",
      },
      {
        q: "Complete: “My mother ______ delicious pasta on Sundays.”",
        options: ["cook", "cooks", "cooking", "to cook"],
        answer: 1,
        why: "My mother = she. No presente, com he/she/it, o verbo ganha -s: cooks.",
      },
      {
        q: "Qual frase está no FUTURO?",
        options: ["I played soccer.", "I play soccer.", "I will play soccer.", "I am soccer."],
        answer: 2,
        why: "Will + verbo indica o futuro.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "adjectives",
    subject: "ela",
    emoji: "🎨",
    title: "Adjectives — describing words",
    subtitle: "Unit 8 · Adjetivos",
    summary: "Adjective (adjetivo) é a palavra que descreve um substantivo (pessoa, lugar ou coisa): tamanho, forma, cor ou sentimento.",
    narration:
      "Agora vamos estudar os adjetivos, que em inglês se chamam adjectives. Adjetivo é a palavra que descreve um substantivo, ou seja, uma pessoa, um lugar ou uma coisa. Ele dá detalhes sobre tamanho, forma, cor ou sentimento. Para escrever melhor, podemos trocar adjetivos simples por adjetivos mais fortes. Em vez de big, grande, podemos usar colossal, gigantic ou towering. Também existem os adjetivos sensoriais, que descrevem o que percebemos com os cinco sentidos: visão, audição, tato, paladar e olfato. Uma dica importante: em inglês, o adjetivo vem antes do substantivo, como em a big dog, e não muda no plural.",
    body: () => (
      <>
        <Section emoji="🤔" title="What is an adjective? (O que é um adjetivo?)" accent={ELA}
          narration="Adjetivo é a palavra que descreve um substantivo, que é o nome de uma pessoa, lugar ou coisa. Ele dá mais detalhes sobre tamanho, forma, cor ou sentimento. Por exemplo, em a red ball, uma bola vermelha, a palavra red é o adjetivo.">
          <p>
            An <b>adjective</b> (adjetivo) é a palavra que <b>descreve um substantivo</b> (<i lang="en">noun</i>): uma <b>pessoa, lugar ou coisa</b>. Ele dá mais detalhes sobre:
          </p>
          <CardGrid min={140}>
            <Card emoji="📏" title="Size (tamanho)"><span lang="en">big, small, tall</span></Card>
            <Card emoji="🔷" title="Shape (forma)"><span lang="en">round, square, flat</span></Card>
            <Card emoji="🌈" title="Color (cor)"><span lang="en">red, blue, golden</span></Card>
            <Card emoji="😊" title="Feeling (sentimento)"><span lang="en">happy, sad, scared</span></Card>
          </CardGrid>
          <Callout kind="atencao" title="Diferente do português!">
            <p>1. Em inglês o adjetivo vem <b>ANTES</b> do substantivo: <span lang="en"><b>a big dog</b></span> (e não <s lang="en">a dog big</s>).</p>
            <p>2. O adjetivo <b>não vai para o plural</b>: <span lang="en"><b>two big dogs</b></span> (e não <s lang="en">two bigs dogs</s>).</p>
          </Callout>
        </Section>

        <Section emoji="⬆️" title="Upgraded adjectives (adjetivos turbinados)" accent={ELA}
          narration="Em vez de usar adjetivos simples, como big, small, nice e sad, use adjetivos mais vivos e descritivos. Eles trazem os detalhes à vida! Clique em cada palavra para ouvir.">
          <p>Troque os adjetivos simples por adjetivos <b>mais vivos</b>. Eles dão vida aos detalhes! Toque para ouvir. 🔊</p>
          <UpgradeTable
            from="Adjetivo simples"
            to="Adjetivos mais fortes"
            rows={[
              { basic: "big", basicPt: "grande", strong: [["colossal", "colossal"], ["gigantic", "gigantesco"], ["towering", "altíssimo, imponente"], ["massive", "enorme e pesado"]] },
              { basic: "small", basicPt: "pequeno", strong: [["tiny", "minúsculo"], ["miniature", "em miniatura"], ["microscopic", "microscópico"], ["compact", "compacto"]] },
              { basic: "nice", basicPt: "legal, bom", strong: [["delightful", "encantador"], ["kind-hearted", "bondoso"], ["pleasant", "agradável"], ["welcoming", "acolhedor"]] },
              { basic: "sad", basicPt: "triste", strong: [["gloomy", "sombrio, melancólico"], ["heartbroken", "de coração partido"], ["miserable", "muito infeliz"], ["downcast", "abatido"]] },
            ]}
          />
          <p className="k-tip-inline">Lembre também: <span lang="en">excited → <b>thrilled</b> (empolgadíssimo)</span>, <span lang="en">big → <b>enormous</b></span>.</p>
          <h3 className="k-h3">Examples</h3>
          <Example en="The explorer reached the top of the colossal mountain." pt="O explorador chegou ao topo da montanha colossal." highlight={["colossal"]} />
          <Example en="A gloomy cloud hung over the silent town." pt="Uma nuvem sombria pairava sobre a cidade silenciosa." highlight={["gloomy", "silent"]} />
          <Example en="She wore a glittering crown made of gold." pt="Ela usava uma coroa brilhante feita de ouro." highlight={["glittering"]} />
        </Section>

        <Section emoji="👃" title="Sensory adjectives — the 5 senses" accent={ELA}
          narration="Os adjetivos sensoriais descrevem como algo parece, soa, é ao toque, tem gosto ou cheiro. Eles usam os cinco sentidos: visão, audição, tato, paladar e olfato. São muito usados nos parágrafos descritivos.">
          <p>Descrevem como algo <b>parece, soa, é ao toque, tem gosto ou cheiro</b>. São perfeitos para <b>descriptive paragraphs</b>!</p>
          <div className="k-senses">
            <div>
              <h3>👀 Sight <small>(visão)</small></h3>
              <WordChips words={[["bright", "brilhante"], ["dusty", "empoeirado"], ["shadowy", "sombrio"], ["colorful", "colorido"], ["polished", "polido, brilhando"]]} />
            </div>
            <div>
              <h3>👂 Sound <small>(audição)</small></h3>
              <WordChips words={[["deafening", "ensurdecedor"], ["silent", "silencioso"], ["squeaky", "rangente, guinchado"], ["harsh", "áspero, estridente"], ["melodic", "melodioso"]]} />
            </div>
            <div>
              <h3>✋ Touch <small>(tato)</small></h3>
              <WordChips words={[["rough", "áspero"], ["silky", "sedoso"], ["freezing", "congelante"], ["sticky", "grudento"], ["sharp", "afiado, pontudo"]]} />
            </div>
            <div>
              <h3>👅👃 Taste & Smell <small>(paladar e olfato)</small></h3>
              <WordChips words={[["bitter", "amargo"], ["sweet", "doce"], ["spicy", "apimentado"], ["rotten", "podre"], ["fragrant", "perfumado"]]} />
            </div>
          </div>
          <h3 className="k-h3">Examples</h3>
          <Example en="The floor was covered in a sticky liquid." pt="O chão estava coberto por um líquido grudento." highlight={["sticky"]} />
          <Example en="A deafening roar echoed through the cave." pt="Um rugido ensurdecedor ecoou pela caverna." highlight={["deafening"]} />
          <Example en="The kitchen filled with the fragrant smell of baked bread." pt="A cozinha se encheu do cheiro perfumado de pão assado." highlight={["fragrant", "baked"]} />
        </Section>
      </>
    ),
    quiz: [
      {
        q: "Which word is the adjective? “The tiny mouse ran away.”",
        options: ["tiny", "mouse", "ran", "away"],
        answer: 0,
        why: "Tiny (minúsculo) descreve o substantivo mouse.",
      },
      {
        q: "Qual é um adjetivo mais forte para “big”?",
        options: ["microscopic", "gloomy", "gigantic", "pleasant"],
        answer: 2,
        why: "Gigantic = gigantesco. Microscopic é o contrário!",
      },
      {
        q: "“Heartbroken” é uma versão mais forte de qual adjetivo?",
        options: ["nice", "sad", "small", "big"],
        answer: 1,
        why: "Heartbroken = de coração partido, muito triste.",
      },
      {
        q: "“A deafening roar” — o adjetivo “deafening” está ligado a qual sentido?",
        options: ["Sight (visão)", "Sound (audição)", "Touch (tato)", "Taste (paladar)"],
        answer: 1,
        why: "Deafening = ensurdecedor, um som muito alto.",
      },
      {
        q: "Qual frase está CORRETA em inglês?",
        options: ["I have a dog big.", "I have two bigs dogs.", "I have a big dog.", "I have big a dog."],
        answer: 2,
        why: "Em inglês o adjetivo vem antes do substantivo e não vai para o plural.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "adverbs",
    subject: "ela",
    emoji: "⚡",
    title: "Adverbs — modifying words",
    subtitle: "Unit 8 · Advérbios",
    summary: "Adverb (advérbio) dá mais detalhes sobre um verbo, um adjetivo ou outro advérbio: conta COMO, QUANDO, ONDE ou COM QUE FREQUÊNCIA algo acontece.",
    narration:
      "Agora vamos estudar os advérbios, os adverbs. O advérbio dá mais detalhes sobre um verbo, um adjetivo ou outro advérbio. Ele responde a perguntas como: como? quando? onde? com que frequência? Muitos advérbios em inglês terminam em l y, como quickly, que quer dizer rapidamente. É parecido com o português, em que muitos advérbios terminam em mente! Os advérbios de modo contam como a ação foi feita, como silently, silenciosamente. Os advérbios de tempo contam quando, como yesterday, ontem, e tomorrow, amanhã. Um truque importante: o adjetivo descreve um substantivo, e o advérbio descreve um verbo.",
    body: () => (
      <>
        <Section emoji="🤔" title="What is an adverb? (O que é um advérbio?)" accent={ELA}
          narration="O advérbio dá mais detalhes sobre um verbo, um adjetivo ou outro advérbio. Ele responde a quatro perguntas: como, quando, onde e com que frequência. Muitos advérbios em inglês terminam em l y, assim como em português muitos terminam em mente. Quickly é rapidamente, slowly é devagar, ou lentamente.">
          <p>
            An <b>adverb</b> (advérbio) dá mais detalhes sobre um <b>verbo</b>, um <b>adjetivo</b> ou <b>outro advérbio</b>. Ele responde a 4 perguntas:
          </p>
          <CardGrid min={150}>
            <Card emoji="🛠️" title="HOW? (Como?)"><span lang="en">quickly, softly</span></Card>
            <Card emoji="🕐" title="WHEN? (Quando?)"><span lang="en">today, now</span></Card>
            <Card emoji="📍" title="WHERE? (Onde?)"><span lang="en">here, outside</span></Card>
            <Card emoji="🔁" title="HOW OFTEN? (Com que frequência?)"><span lang="en">always, never</span></Card>
          </CardGrid>
          <Callout kind="dica" title="O segredo do “-ly”">
            Muitos advérbios terminam em <b>-ly</b>, assim como em português muitos terminam em <b>-mente</b>:
            <div className="k-ly" lang="en">
              <span>quick → quick<b>ly</b> <small>(rapida<b>mente</b>)</small></span>
              <span>careful → careful<b>ly</b> <small>(cuidadosa<b>mente</b>)</small></span>
              <span>soft → soft<b>ly</b> <small>(suave<b>mente</b>)</small></span>
            </div>
          </Callout>
        </Section>

        <Section emoji="🛠️" title="Adverbs of manner — tell us HOW" accent={ELA}
          narration="Os advérbios de modo contam como uma ação foi feita. Muitos terminam em l y: carefully, com cuidado; swiftly, velozmente; loudly, alto; eagerly, ansiosamente; silently, silenciosamente; e nervously, nervosamente.">
          <WordChips
            words={[
              ["carefully", "com cuidado"],
              ["swiftly", "velozmente"],
              ["loudly", "em voz alta"],
              ["eagerly", "ansiosamente, com vontade"],
              ["silently", "silenciosamente"],
              ["nervously", "nervosamente"],
              ["quickly", "rapidamente"],
              ["slowly", "devagar"],
            ]}
          />
          <Example en="The cat walked silently across the fence." pt="O gato andou silenciosamente pela cerca." highlight={["silently"]} />
          <Example en="She answered the teacher's question confidently." pt="Ela respondeu à pergunta da professora com confiança." highlight={["confidently"]} />
          <Example en="The students listened eagerly to the story." pt="Os alunos ouviram a história com muita vontade." highlight={["eagerly"]} />
        </Section>

        <Section emoji="🕐" title="Adverbs of time — tell us WHEN" accent={ELA}>
          <WordChips
            words={[
              ["yesterday", "ontem"],
              ["today", "hoje"],
              ["tomorrow", "amanhã"],
              ["tonight", "hoje à noite"],
              ["now", "agora"],
              ["then", "então, depois"],
              ["already", "já"],
            ]}
          />
          <Example en="The students will present their science projects tomorrow." pt="Os alunos vão apresentar seus projetos de ciências amanhã." highlight={["tomorrow"]} />
          <Example en="We finished our math rotation already." pt="Nós já terminamos nosso rodízio de matemática." highlight={["already"]} />
          <Example en="Please submit your homework folder now." pt="Por favor, entregue sua pasta de lição de casa agora." highlight={["now"]} />
        </Section>

        <Section emoji="📍" title="Bônus: WHERE e HOW OFTEN">
          <div className="k-two">
            <div>
              <h3 className="k-h3">📍 Where? (lugar)</h3>
              <WordChips words={[["here", "aqui"], ["there", "lá"], ["outside", "lá fora"], ["inside", "dentro"], ["everywhere", "em todo lugar"]]} />
              <Example en="The kids are playing outside." pt="As crianças estão brincando lá fora." highlight={["outside"]} />
            </div>
            <div>
              <h3 className="k-h3">🔁 How often? (frequência)</h3>
              <WordChips words={[["always", "sempre"], ["usually", "geralmente"], ["often", "frequentemente"], ["sometimes", "às vezes"], ["never", "nunca"]]} />
              <Example en="I always brush my teeth before bed." pt="Eu sempre escovo os dentes antes de dormir." highlight={["always"]} />
            </div>
          </div>
        </Section>

        <Section emoji="⚖️" title="Adjective or adverb? (cai na prova!)" accent={ELA}
          narration="Como saber se é adjetivo ou advérbio? O adjetivo descreve um substantivo, uma pessoa, lugar ou coisa. O advérbio descreve um verbo, uma ação. Por exemplo: Sarah is a smart student. Smart descreve a estudante, então é adjetivo. The tortoise walked slowly. Slowly descreve como a tartaruga andou, então é advérbio.">
          <div className="k-vs">
            <div>
              <span className="k-vs-tag">ADJECTIVE</span>
              <p>descreve um <b>substantivo</b> (quem? o quê?)</p>
              <b lang="en">Sarah is a <mark>smart</mark> student.</b>
              <b lang="en">The <mark>slow</mark> tortoise.</b>
            </div>
            <div>
              <span className="k-vs-tag">ADVERB</span>
              <p>descreve um <b>verbo</b> (como foi a ação?)</p>
              <b lang="en">She studies <mark>smartly</mark>.</b>
              <b lang="en">The tortoise walked <mark>slowly</mark>.</b>
            </div>
          </div>
          <Callout kind="dica">
            Se a palavra está <b>perto de uma pessoa ou coisa</b> → <b>adjective</b>. Se está contando <b>como alguém fez algo</b> → <b>adverb</b> (geralmente com <b>-ly</b>).
          </Callout>
        </Section>
      </>
    ),
    quiz: [
      {
        q: "Which word is the adverb? “The baby slept peacefully.”",
        options: ["baby", "slept", "peacefully", "the"],
        answer: 2,
        why: "Peacefully (tranquilamente) conta COMO o bebê dormiu.",
      },
      {
        q: "“We will travel tomorrow.” A palavra “tomorrow” responde a qual pergunta?",
        options: ["How? (Como?)", "When? (Quando?)", "Where? (Onde?)", "How often?"],
        answer: 1,
        why: "Tomorrow (amanhã) é um advérbio de tempo: diz QUANDO.",
      },
      {
        q: "Complete: “Sarah is a ______ student. The tortoise walked ______.”",
        options: ["slowly / smart", "smartly / slow", "slow / smartly", "smart / slowly"],
        answer: 3,
        why: "Smart descreve student (adjective). Slowly descreve walked (adverb).",
      },
      {
        q: "Qual é o advérbio formado a partir de “careful”?",
        options: ["carefuly", "carefully", "carefulness", "cared"],
        answer: 1,
        why: "careful + ly = carefully (com dois L!).",
      },
      {
        q: "Qual destas palavras é um advérbio de frequência (how often)?",
        options: ["always", "yesterday", "outside", "loudly"],
        answer: 0,
        why: "Always (sempre) diz com que frequência algo acontece.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "persuasive",
    subject: "ela",
    emoji: "📣",
    title: "Persuasive language",
    subtitle: "Unit 9 · Linguagem persuasiva",
    summary: "Persuadir é convencer. A linguagem persuasiva usa opinião, razões, fatos e palavras fortes para fazer o leitor concordar com você.",
    narration:
      "Agora vamos falar sobre linguagem persuasiva. Persuadir quer dizer convencer. Quando você quer convencer alguém, precisa dizer claramente a sua opinião e dar boas razões para ela. Também é importante saber a diferença entre fato e opinião. Fato é algo que pode ser provado. Opinião é o que alguém pensa ou sente. Os escritores usam técnicas para convencer, chamadas de persuasive devices: perguntas retóricas, adjetivos fortes, verbos como must e should, e palavras de ligação como because, therefore e for example.",
    body: () => (
      <>
        <Section emoji="🎯" title="O que é persuadir?" accent={ELA}
          narration="Persuadir é convencer alguém a concordar com você ou a fazer alguma coisa. Você já faz isso! Quando pede para os seus pais deixarem você ir a uma festa, ou para comprar um bichinho de estimação, você está usando linguagem persuasiva. Para convencer bem, você precisa de três coisas: uma opinião clara, boas razões e provas, que são os fatos e exemplos.">
          <p>
            <b>Persuade</b> = <b>convencer</b>. Você já faz isso quando pede aos seus pais para ir a uma festa ou ter um bichinho de estimação! 🐶
          </p>
          <p>Para convencer bem, você precisa de 3 ingredientes:</p>
          <CardGrid min={180}>
            <Card emoji="💡" title="1. Opinion (opinião)">Diga claramente o que você pensa: <i lang="en">“I strongly believe that…”</i></Card>
            <Card emoji="🧱" title="2. Reasons (razões)">Explique <b>por quê</b>, usando <i lang="en">because</i>.</Card>
            <Card emoji="📊" title="3. Evidence (provas)">Dê fatos e exemplos: <i lang="en">“For example…”</i></Card>
          </CardGrid>
        </Section>

        <Section emoji="🔍" title="Fact or opinion? (Fato ou opinião?)" accent={ELA}
          narration="Fato é algo que pode ser provado, verificado em um livro, numa pesquisa ou com uma medida. Por exemplo: dogs have four legs, cachorros têm quatro patas. Opinião é o que alguém pensa ou sente, e outras pessoas podem discordar. Por exemplo: dogs are the best pets, cachorros são os melhores bichos de estimação. Palavras como best, worst, beautiful, I think e I believe costumam indicar opinião.">
          <div className="k-vs">
            <div>
              <span className="k-vs-tag">FACT ✅</span>
              <p>Pode ser <b>provado</b> (num livro, numa pesquisa, medindo).</p>
              <b lang="en">Dogs have four legs.</b>
            </div>
            <div>
              <span className="k-vs-tag">OPINION 💭</span>
              <p>É o que alguém <b>pensa ou sente</b>. Outros podem discordar.</p>
              <b lang="en">Dogs are the best pets.</b>
            </div>
          </div>
          <Callout kind="dica">
            Palavras como <b lang="en">best, worst, beautiful, boring, I think, I believe, should</b> geralmente mostram uma <b>opinião</b>.
          </Callout>
          <h3 className="k-h3">Pratique: fact or opinion?</h3>
          <Sorter
            id="fact-opinion"
            accent={ELA}
            buckets={["Fact", "Opinion"]}
            items={[
              { text: "Sea turtles lay their eggs in the sand.", answer: 0 },
              { text: "Pizza is the most delicious food in the world.", answer: 1 },
              { text: "Water boils at 100 °C.", answer: 0 },
              { text: "Summer is the best season.", answer: 1 },
              { text: "Brazil is in South America.", answer: 0 },
              { text: "Homework is boring.", answer: 1 },
            ]}
          />
        </Section>

        <Section emoji="🧰" title="Persuasive devices (técnicas para convencer)" accent={ELA}
          narration="Os persuasive devices são técnicas que os escritores usam para convencer. A pergunta retórica é uma pergunta que não espera resposta, porque a resposta já parece óbvia, como: who doesn't want to be healthy? Os adjetivos fortes, como amazing e terrible, despertam emoção. Os verbos modais, como must, should e could, mostram que algo é importante ou necessário. E as palavras de sinal, como clearly, surely e without a doubt, mostram certeza.">
          <CardGrid>
            <Card emoji="❓" title="Rhetorical questions">
              Pergunta que <b>não espera resposta</b>, porque a resposta já parece óbvia.
              <Example en="Who doesn't want to be healthy and happy?" />
            </Card>
            <Card emoji="🔥" title="Strong adjectives">
              Adjetivos que despertam emoção: <span lang="en"><b>amazing, terrible, incredible, unfair</b></span>.
              <Example en="Recess is an amazing time to make friends." />
            </Card>
            <Card emoji="⚠️" title="Modal verbs">
              Mostram necessidade ou conselho: <span lang="en"><b>must</b></span> (deve, obrigatório), <span lang="en"><b>should</b></span> (deveria), <span lang="en"><b>could</b></span> (poderia).
              <Example en="We must protect our planet." />
            </Card>
            <Card emoji="✅" title="Signal words">
              Mostram certeza: <span lang="en"><b>clearly, surely, without a doubt, importantly, for these reasons</b></span>.
              <Example en="Without a doubt, reading makes us smarter." />
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="🔗" title="Linking words (palavras de ligação)">
          <p>Elas ligam a opinião às razões e deixam o texto organizado:</p>
          <WordChips
            words={[
              ["because", "porque"],
              ["therefore", "portanto"],
              ["for example", "por exemplo"],
              ["also", "também"],
              ["in addition", "além disso"],
              ["most importantly", "o mais importante"],
              ["first / second", "primeiro / segundo"],
              ["in my opinion", "na minha opinião"],
              ["I strongly believe", "eu acredito muito"],
              ["I promise", "eu prometo"],
            ]}
          />
          <Example
            en="Students should have a longer recess because playing helps them focus. For example, after running outside, kids pay more attention in class."
            pt="Os alunos deveriam ter um recreio mais longo, porque brincar os ajuda a se concentrar. Por exemplo, depois de correr lá fora, as crianças prestam mais atenção na aula."
            highlight={["should", "because", "For example"]}
          />
        </Section>
      </>
    ),
    quiz: [
      {
        q: "O que significa “persuade”?",
        options: ["Descrever", "Convencer", "Contar uma história", "Explicar fatos"],
        answer: 1,
        why: "Persuade = convencer alguém a concordar com você.",
      },
      {
        q: "Which sentence is a FACT?",
        options: ["Cats are cuter than dogs.", "The Earth goes around the Sun.", "Math is the best subject.", "Rainy days are sad."],
        answer: 1,
        why: "Pode ser provado pela ciência. As outras são opiniões.",
      },
      {
        q: "“Who doesn't love free ice cream?” é um exemplo de:",
        options: ["Rhetorical question", "Fact", "Adverb of time", "Narrative paragraph"],
        answer: 0,
        why: "É uma pergunta que não espera resposta: a resposta parece óbvia.",
      },
      {
        q: "Qual palavra liga a opinião a uma razão?",
        options: ["because", "yesterday", "gigantic", "whisper"],
        answer: 0,
        why: "Because (porque) introduz a razão.",
      },
      {
        q: "Qual modal verb mostra que algo é obrigatório/muito necessário?",
        options: ["could", "must", "might", "may"],
        answer: 1,
        why: "Must = deve (obrigação forte). Should é um conselho; could é uma possibilidade.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "paragraphs",
    subject: "ela",
    emoji: "📝",
    title: "Types of paragraphs",
    subtitle: "Units 10 & 11 · Tipos de parágrafo",
    summary: "Existem 4 tipos de parágrafo: narrativo (conta), descritivo (mostra), expositivo (explica) e persuasivo (convence).",
    narration:
      "Agora vamos conhecer os quatro tipos de parágrafo. Todo parágrafo tem a mesma estrutura, como um hambúrguer: a topic sentence, que é a frase de abertura, em cima; as supporting sentences, que são as frases de apoio, no recheio; e a concluding sentence, a frase de conclusão, embaixo. O parágrafo narrativo conta uma história em ordem cronológica, usando palavras como first, then e suddenly. O parágrafo descritivo cria uma imagem na cabeça do leitor, usando os cinco sentidos e adjetivos. O parágrafo expositivo explica um assunto com fatos, sem dar opinião. E o parágrafo persuasivo tenta convencer o leitor, com uma opinião, razões e uma chamada para ação.",
    body: () => (
      <>
        <Section emoji="🍔" title="The paragraph burger (a estrutura)" accent={ELA}
          narration="Todo parágrafo funciona como um hambúrguer. O pão de cima é a topic sentence, a frase principal, que apresenta o assunto. O recheio são as supporting sentences, as frases de apoio, que dão os detalhes, as razões ou os acontecimentos. O pão de baixo é a concluding sentence, a frase de conclusão, que fecha a ideia.">
          <div className="k-burger">
            <div className="bun top"><b>Topic sentence</b><span>Frase principal: apresenta o assunto.</span></div>
            <div className="fill a"><b>Supporting sentence</b><span>Detalhe, fato, razão ou acontecimento.</span></div>
            <div className="fill b"><b>Supporting sentence</b><span>Mais um detalhe ou razão.</span></div>
            <div className="fill c"><b>Supporting sentence</b><span>Mais um!</span></div>
            <div className="bun bottom"><b>Concluding sentence</b><span>Frase de conclusão: fecha a ideia.</span></div>
          </div>
        </Section>

        <Section emoji="🎯" title="Qual é o objetivo? Cada tipo tem uma missão">
          <CardGrid min={200}>
            <Card emoji="📖" title="Narrative" tone="#fff4dc">Missão: <b>CONTAR</b> uma história.</Card>
            <Card emoji="🎨" title="Descriptive" tone="#e6f6ef">Missão: <b>MOSTRAR</b> (pintar uma imagem com palavras).</Card>
            <Card emoji="🔬" title="Expository" tone="#eaf2ff">Missão: <b>EXPLICAR</b> e informar com fatos.</Card>
            <Card emoji="📣" title="Persuasive" tone="#fdecea">Missão: <b>CONVENCER</b> o leitor.</Card>
          </CardGrid>
          <Callout kind="sabia">
            Os exemplos abaixo vêm do livro <b lang="en">Because of Winn-Dixie</b>, de Kate DiCamillo: a história da menina <b>Opal</b>, que encontra um cachorro bagunceiro num supermercado e o adota. 🐕
          </Callout>
        </Section>

        <Section emoji="📖" title="Narrative paragraph — telling a story" accent={ELA}
          narration="O parágrafo narrativo conta uma história, real ou inventada, na ordem em que as coisas aconteceram. Isso se chama ordem cronológica. A topic sentence apresenta a ação, o personagem ou o momento inicial. As supporting sentences contam os acontecimentos passo a passo. A concluding sentence mostra o resultado, como a história terminou. Palavras de sinal: first, next, then, suddenly, immediately, meanwhile, afterwards e finally.">
          <p>Conta uma história (real ou inventada) na <b>ordem em que aconteceu</b> — a <b>ordem cronológica</b>.</p>
          <ol className="k-list numbered">
            <li><b>Topic sentence:</b> apresenta a ação, o personagem principal ou o momento inicial.</li>
            <li><b>Supporting sentences:</b> contam os acontecimentos passo a passo.</li>
            <li><b>Concluding sentence:</b> mostra o resultado, como tudo terminou.</li>
          </ol>
          <WordChips words={[["first", "primeiro"], ["next", "em seguida"], ["then", "então"], ["suddenly", "de repente"], ["immediately", "imediatamente"], ["meanwhile", "enquanto isso"], ["afterwards", "depois"], ["finally", "finalmente"]]} />
          <Example
            en="First, Opal went into the Winn-Dixie supermarket to buy a lemon and a box of macaroni and cheese. Suddenly, a big, shaggy dog came running down the aisle, knocking over fruit and causing chaos. The store manager screamed, but Opal quickly stepped in and claimed the dog as her own."
            pt="Primeiro, Opal entrou no supermercado Winn-Dixie para comprar um limão e uma caixa de macarrão com queijo. De repente, um cachorro grande e peludo veio correndo pelo corredor, derrubando frutas e causando confusão. O gerente gritou, mas Opal rapidamente interveio e disse que o cachorro era dela."
            highlight={["First", "Suddenly"]}
          />
        </Section>

        <Section emoji="🎨" title="Descriptive paragraph — creating a picture" accent={ELA}
          narration="O parágrafo descritivo cria uma imagem clara e viva de uma pessoa, lugar, objeto ou sentimento. Ele usa detalhes dos cinco sentidos e muitos adjetivos. A topic sentence apresenta o que vai ser descrito. As supporting sentences usam visão, audição, tato, cheiro e gosto para mostrar diferentes lados. A concluding sentence resume a impressão geral.">
          <p>Cria uma <b>imagem clara e viva</b> de uma pessoa, lugar, objeto ou sentimento, usando os <b>5 sentidos</b> e muitos <b>adjetivos</b>.</p>
          <ol className="k-list numbered">
            <li><b>Topic sentence:</b> apresenta o que vai ser descrito.</li>
            <li><b>Supporting sentences:</b> detalhes sensoriais (visão, som, tato, cheiro, gosto) e adjetivos.</li>
            <li><b>Concluding sentence:</b> resume a impressão ou o sentimento geral.</li>
          </ol>
          <WordChips words={[["next to", "ao lado de"], ["above", "acima"], ["beneath", "embaixo"], ["soft", "macio"], ["loud", "alto (som)"], ["fragrant", "perfumado"], ["shadowy", "sombrio"], ["bright", "brilhante"], ["rough", "áspero"]]} />
          <Example
            en="Winn-Dixie was a huge, ugly dog with thin brown fur and big, floppy ears. He had bald patches where his fur had fallen out, and his ribs showed through his skin. Despite his messy look, he had a warm, crooked smile that showed all his teeth and made his whole tail wag enthusiastically."
            pt="Winn-Dixie era um cachorro enorme e feio, de pelo marrom ralo e orelhas grandes e caídas. Tinha falhas onde o pelo tinha caído, e dava para ver as costelas. Apesar da aparência bagunçada, tinha um sorriso caloroso e torto que mostrava todos os dentes e fazia o rabo inteiro balançar com entusiasmo."
            highlight={["huge", "ugly", "thin", "brown", "floppy", "warm", "crooked"]}
          />
        </Section>

        <Section emoji="🔬" title="Expository paragraph — explaining facts" accent={ELA}
          narration="O parágrafo expositivo explica um assunto, dá instruções ou apresenta informações com fatos, de forma neutra, sem opinião pessoal. A topic sentence diz claramente qual é o assunto. As supporting sentences trazem fatos, definições, razões ou explicações passo a passo. A concluding sentence resume a informação. Palavras de sinal: because, for example, such as, in addition, as a result, another reason e therefore.">
          <p>Explica um assunto, dá instruções ou apresenta <b>informações com fatos</b>, de forma <b>neutra</b> — <b>sem opinião pessoal</b>.</p>
          <ol className="k-list numbered">
            <li><b>Topic sentence:</b> diz claramente o assunto ou o fato principal.</li>
            <li><b>Supporting sentences:</b> fatos, definições, razões ou explicações passo a passo.</li>
            <li><b>Concluding sentence:</b> resume a informação apresentada.</li>
          </ol>
          <WordChips words={[["because", "porque"], ["for example", "por exemplo"], ["such as", "como"], ["in addition", "além disso"], ["as a result", "como resultado"], ["another reason", "outra razão"], ["therefore", "portanto"]]} />
          <Example
            en="Littmus Lozenges are special candies created by Amanda Wilkinson's great-grandfather after the Civil War. The candy combines a sweet strawberry flavor with a secret ingredient: sadness. When people taste the lozenge, it tastes sweet at first, but it leaves a bittersweet feeling that reminds them of their own past sorrows."
            pt="As balas Littmus são doces especiais criados pelo bisavô de Amanda Wilkinson depois da Guerra Civil. A bala mistura um sabor doce de morango com um ingrediente secreto: a tristeza. Quando as pessoas provam, ela é doce no começo, mas deixa um sentimento agridoce que faz lembrar as próprias tristezas do passado."
          />
        </Section>

        <Section emoji="📣" title="Persuasive paragraph — convincing the reader" accent={ELA}
          narration="O parágrafo persuasivo tenta convencer o leitor a concordar com um ponto de vista. A topic sentence diz a sua opinião com clareza. As supporting sentences dão duas ou três razões fortes, com fatos, verbos modais e técnicas de persuasão. A concluding sentence repete a opinião e diz ao leitor o que pensar ou fazer, o que chamamos de chamada para ação, ou call to action.">
          <p>Tenta <b>convencer</b> o leitor a concordar com um ponto de vista, usando razões, palavras fortes e provas.</p>
          <ol className="k-list numbered">
            <li><b>Topic sentence (opinion/claim):</b> diz sua opinião com clareza.</li>
            <li><b>Supporting sentences (arguments & evidence):</b> 2 ou 3 razões fortes, com fatos, <i lang="en">modal verbs</i> e técnicas persuasivas.</li>
            <li><b>Concluding sentence (call to action):</b> repete a opinião e diz ao leitor o que pensar ou fazer.</li>
          </ol>
          <WordChips words={[["clearly", "claramente"], ["surely", "com certeza"], ["must", "deve"], ["should", "deveria"], ["without a doubt", "sem dúvida"], ["importantly", "o mais importante"], ["for these reasons", "por essas razões"]]} />
          <Example
            en="Preacher should definitely let Opal keep Winn-Dixie. First, the poor dog is completely homeless and needs a loving family to take care of him. Second, Winn-Dixie brings immense joy to Opal and helps her make new friends. Therefore, allowing Winn-Dixie to stay will bring happiness to their entire home."
            pt="O Pregador (pai da Opal) deveria, com certeza, deixar Opal ficar com o Winn-Dixie. Primeiro, o pobre cachorro não tem casa e precisa de uma família amorosa. Segundo, Winn-Dixie traz uma alegria enorme para Opal e a ajuda a fazer novos amigos. Portanto, deixar o Winn-Dixie ficar vai trazer felicidade para toda a casa."
            highlight={["should definitely", "First", "Second", "Therefore"]}
          />
        </Section>

        <Section emoji="🧭" title="Como descobrir o tipo de parágrafo?">
          <div className="k-table-wrap">
            <table className="k-table">
              <thead>
                <tr><th>Pergunte-se…</th><th>Se sim, é…</th></tr>
              </thead>
              <tbody>
                <tr><td>Conta acontecimentos em ordem (first, then, suddenly)?</td><td>📖 <b>Narrative</b></td></tr>
                <tr><td>Faz você “ver”, “ouvir” ou “sentir” algo com muitos adjetivos?</td><td>🎨 <b>Descriptive</b></td></tr>
                <tr><td>Ensina fatos, sem a opinião do autor?</td><td>🔬 <b>Expository</b></td></tr>
                <tr><td>Tem opinião, razões e quer que você concorde (should, must)?</td><td>📣 <b>Persuasive</b></td></tr>
              </tbody>
            </table>
          </div>
        </Section>
      </>
    ),
    quiz: [
      {
        q: "“The giant sea turtle has a hard, dark green shell covered in rough spots.” Que tipo de parágrafo começa assim?",
        options: ["Narrative", "Descriptive", "Expository", "Persuasive"],
        answer: 1,
        why: "Usa muitos adjetivos e detalhes sensoriais (hard, dark green, rough) para criar uma imagem.",
      },
      {
        q: "“Sea turtles are marine reptiles that live in oceans around the world.” Que tipo de parágrafo é este?",
        options: ["Narrative", "Descriptive", "Expository", "Persuasive"],
        answer: 2,
        why: "Apresenta fatos, de forma neutra, sem opinião.",
      },
      {
        q: "Qual tipo de parágrafo termina com um “call to action” (chamada para ação)?",
        options: ["Narrative", "Descriptive", "Expository", "Persuasive"],
        answer: 3,
        why: "O persuasivo termina dizendo ao leitor o que pensar ou fazer.",
      },
      {
        q: "Quais palavras de sinal são típicas do parágrafo NARRATIVO?",
        options: ["first, then, suddenly, finally", "must, should, clearly", "soft, bright, rough", "such as, for example, therefore"],
        answer: 0,
        why: "São palavras de tempo que organizam a história em ordem cronológica.",
      },
      {
        q: "No “paragraph burger”, qual parte apresenta o assunto?",
        options: ["Concluding sentence", "Supporting sentence", "Topic sentence", "Call to action"],
        answer: 2,
        why: "A topic sentence é o “pão de cima”: apresenta o assunto.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "review-activity",
    subject: "ela",
    emoji: "✅",
    title: "Review activity (atividade de revisão)",
    subtitle: "Os 8 exercícios, com correção",
    summary: "A atividade de revisão do roteiro em versão interativa: responda, confira e veja a explicação de cada resposta.",
    narration:
      "Esta é a atividade de revisão de E L A. Ela tem oito exercícios sobre verbos, adjetivos, advérbios e tipos de parágrafo. Faça cada exercício com calma, clique em conferir e leia a explicação. Nos exercícios de escrita, use a lista de verificação para conferir se o seu parágrafo tem tudo o que precisa. Lembre-se de levar a atividade de papel para a escola, para a correção em sala.",
    body: () => (
      <>
        <Callout kind="lembre" title="Como estudar">
          Use este material de pesquisa (<b>Material 14</b> para a Unit 8 e <b>Material 15</b> para as Units 9–11), faça as lições de casa e leia livros sobre o tema na plataforma <b>Kids A-Z</b>.
        </Callout>

        <Quiz
          id="ela-review-mc"
          accent={ELA}
          title="Questões 1, 3 e 4 (múltipla escolha)"
          questions={[
            {
              q: "1) Every day after school, Lucas ___ his homework before playing video games. / The children ___ soccer in the park every Saturday morning. / My mother ___ delicious pasta for dinner on Sundays. / We ___ to the teacher when she explains the lesson.",
              options: ["plays | cook | listens | does", "does | play | cooks | listen", "cooks | listen | plays | does", "listens | does | cook | play"],
              answer: 1,
              why: "Lucas does (fazer lição), the children play (jogar futebol), my mother cooks (cozinhar), we listen (ouvir). Lucas e my mother = he/she → verbo com -s/-es; children e we → sem -s.",
            },
            {
              q: "3) Sarah is a ___ student who always gets good grades. / The tortoise walked ___ across the grass.",
              options: ["slowly | smart", "smartly | slow", "slow | smartly", "smart | slowly"],
              answer: 3,
              why: "Smart descreve o substantivo student → adjective. Slowly descreve o verbo walked → adverb.",
            },
            {
              q: "4) Paragraph 1: “The giant sea turtle has a hard, dark green shell covered in rough spots. Its strong, paddle-like flippers move gracefully…” Paragraph 2: “Sea turtles are marine reptiles that live in oceans around the world. Female sea turtles travel thousands of miles…”",
              options: ["1. Expository | 2. Descriptive", "1. Descriptive | 2. Expository", "1. Persuasive | 2. Expository", "1. Descriptive | 2. Persuasive"],
              answer: 1,
              why: "O 1 pinta uma imagem com adjetivos (hard, dark green, rough) → Descriptive. O 2 informa fatos sem opinião → Expository.",
            },
          ]}
        />

        <Section emoji="6️⃣" title="Questão 6 — complete com as palavras">
          <p>Lembre: <b>adjective</b> descreve um substantivo; <b>adverb</b> descreve como a ação foi feita.</p>
          <FillBlanks
            id="ela-q6"
            accent={ELA}
            bank={["delicious", "playful", "quickly", "slowly"]}
            items={[
              { before: "A) The", after: "dog barked loudly at the mailman.", answer: "playful" },
              { before: "B) Maria solved the math problem", after: ".", answer: "quickly" },
              { before: "C) We ate a", after: "lunch before going back to class.", answer: "delicious" },
              { before: "D) The turtle walked", after: "across the road.", answer: "slowly" },
            ]}
          />
        </Section>

        <Section emoji="7️⃣" title="Questão 7 — Smartphones (word bank)">
          <p>Dica: veja se a lacuna precisa de um <b>adjetivo</b> (useful, distracting), um <b>advérbio</b> (carefully, constantly) ou um <b>verbo</b> (use, check, watch, play).</p>
          <FillBlanks
            id="ela-q7"
            accent={ELA}
            bank={["use", "check", "watch", "play", "useful", "distracting", "carefully", "constantly"]}
            items={[
              { before: "Smartphones are very", after: "tools that help us communicate.", answer: "useful" },
              { before: "Many students", after: "their phones to look up information for school.", answer: "use" },
              { before: "However, using a phone during class can be", after: ".", answer: "distracting" },
              { before: "When students", after: "their notifications while the teacher is speaking, they lose focus.", answer: "check" },
              { before: "It is important to use technology", after: ".", answer: "carefully" },
              { before: "Playing games", after: "without taking breaks can hurt your eyes.", answer: "constantly" },
              { before: "During break time, students can", after: "videos…", answer: "watch" },
              { before: "…or", after: "games together responsibly.", answer: "play" },
            ]}
          />
        </Section>

        <Section emoji="8️⃣" title="Questão 8 — Venn diagram: Narrative x Persuasive">
          <p>Para cada frase, escolha se ela vale <b>só para o narrativo</b>, <b>para os dois</b> ou <b>só para o persuasivo</b>. O diagrama vai se preenchendo!</p>
          <VennSorter
            id="ela-q8"
            accent={ELA}
            left="Narrative"
            right="Persuasive"
            items={[
              { letter: "A", text: "Tells a story with characters, a setting, and a plot.", answer: 0 },
              { letter: "B", text: "Tries to convince the reader to agree with an opinion.", answer: 2 },
              { letter: "C", text: "Uses full sentences, clear paragraphs, and proper punctuation.", answer: 1 },
              { letter: "D", text: "Includes a problem and a solution for the main character.", answer: 0 },
              { letter: "E", text: "Uses convincing phrases like “In my opinion” or “I strongly believe”.", answer: 2 },
              { letter: "F", text: "Uses transition words to organize ideas logically (first, then, because).", answer: 1 },
            ]}
          />
        </Section>

        <Section emoji="2️⃣" title="Questão 2 — Persuasive paragraph (escrita)">
          <Callout kind="dica" title="Receita do parágrafo persuasivo">
            <b>1.</b> Opinião: <i lang="en">“I strongly believe I should go on a trip with my friends.”</i> <b>2.</b> Duas ou três razões com <i lang="en">because, also, most importantly</i>. <b>3.</b> Uma promessa educada: <i lang="en">“I promise…”</i> <b>4.</b> Conclusão pedindo a permissão.
          </Callout>
          <WritingHelper
            id="ela-q2"
            accent={ELA}
            prompt="Imagine you want to go on a trip with your best friends! Write a persuasive paragraph to convince your parents to let you go."
            checks={[
              { label: "Tem uma opinião clara", words: ["i strongly believe", "i think", "in my opinion", "should", "i believe"] },
              { label: "Usa “because” para dar razões", words: ["because"] },
              { label: "Usa palavras de ligação (also, most importantly, first…)", words: ["also", "most importantly", "first", "second", "in addition", "therefore"] },
              { label: "Linguagem educada / promessa", words: ["i promise", "please"] },
            ]}
            model="I strongly believe that you should let me go on a trip with my best friends. First, it is a great chance to learn how to be responsible, because I will take care of my things and follow the rules. Also, the trip is safe, since an adult will be with us the whole time. Most importantly, spending time with my friends makes me happy and helps our friendship grow stronger. I promise I will call you every night and help with the chores when I come back. For these reasons, please say yes!"
          />
        </Section>

        <Section emoji="5️⃣" title="Questão 5 — Descriptive paragraph (escrita)">
          <p>
            Descreva uma vez em que você fez amizade com alguém <b>diferente de você</b> (idade, origem ou interesses) — ou um personagem que se torna amigo da Opal. Use <b>detalhes sensoriais</b> e <b>adjetivos vivos</b>.
          </p>
          <WritingHelper
            id="ela-q5"
            accent={ELA}
            prompt="The Power of Making Different Friends — describe a friend who is different from you."
            checks={[
              { label: "Usa adjetivos (cores, tamanhos, sentimentos…)", words: ["kind", "friendly", "tall", "gentle", "warm", "bright", "soft", "colorful", "wide", "shady", "happy", "funny", "quiet", "old", "young"] },
              { label: "Usa algum sentido além da visão (som, cheiro, tato, gosto)", words: ["sound", "smell", "soft", "loud", "sweet", "warm", "rough", "quiet", "taste", "clink", "laugh", "voice"] },
              { label: "Tem uma conclusão (what you learned)", words: ["learned", "realized", "finally", "even though", "in the end"] },
            ]}
            model="When Opal first met Gloria Dump, she noticed the older woman's gentle, wrinkled hands and her wide, friendly smile. Gloria sat under the tall, shady trees in her lush green backyard, where colorful glass bottles clinked softly in the warm breeze. Even though Gloria was much older and could not see well, she listened to Opal with deep kindness, offering her peanut butter sandwiches and wise advice. Opal learned that even if someone looks or lives differently than you, they can become one of your closest, most special friends."
          />
        </Section>
      </>
    ),
  },
];
