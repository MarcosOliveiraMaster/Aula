/* =========================================================================
   Conteúdo da Trilha — Revisão de Geografia 6º Ano (3º Trimestre, cumulativa)
   Cada tópico traz: explicação, cenas animadas, questões da revisão (com
   gabarito) e um banco de conteúdo para os jogos (quiz, memória, forca,
   flashcards).
   ========================================================================= */

window.MODULES = [
  { id: 1, title: "Hidrosfera, oceanos e mares", icon: "🌊", color: "#0ea5e9",
    intro: "A estrutura da hidrosfera, os tipos de mares, os movimentos das águas e os cinco oceanos." },
  { id: 2, title: "Ciclo da água e rios", icon: "🏞️", color: "#10b981",
    intro: "O ciclo hidrológico, os regimes dos rios, as partes de um rio, os tipos de foz e a bacia hidrográfica." },
  { id: 3, title: "Água doce e sustentabilidade", icon: "💧", color: "#6366f1",
    intro: "Aquíferos, distribuição desigual da água, usos, estresse hídrico e impactos humanos." },
  { id: 4, title: "Hidrelétricas e hidrovias", icon: "⚡", color: "#f59e0b",
    intro: "Como uma usina gera energia, os impactos das barragens, eclusas, portos e a energia no Brasil." },
  { id: 5, title: "Bacias e hidrovias do Brasil", icon: "🗺️", color: "#ef4444",
    intro: "As 12 regiões hidrográficas, as grandes bacias brasileiras e as principais hidrovias." }
];

window.TOPICS = [
  /* ======================= MÓDULO 1 ======================= */
  {
    id: "1.1", module: 1, title: "Classificação dos mares", refs: "Questão 1.a",
    concepts: ["Mar aberto", "Mar fechado", "Mar interior", "Estreito", "Salinidade"],
    theory: `
      <p>Cerca de <strong>97,5%</strong> da água da Terra é <strong>salgada</strong>. Os <strong>mares</strong> são porções menores e menos profundas dos oceanos, localizadas perto dos continentes. Eles são classificados pelo <em>grau de ligação</em> com o oceano:</p>
      <div class="cards3">
        <div class="mini-card c-blue"><span class="big">🌊</span><h4>Mar aberto</h4><p>Tem ligação <strong>direta e ampla</strong> com o oceano. Ex.: Mar do Caribe (Antilhas).</p></div>
        <div class="mini-card c-purple"><span class="big">🌉</span><h4>Mar interior</h4><p>Liga-se ao oceano só por <strong>estreitos ou canais</strong>. Ex.: Mar Mediterrâneo (Estreito de Gibraltar).</p></div>
        <div class="mini-card c-red"><span class="big">🔒</span><h4>Mar fechado</h4><p><strong>Não tem comunicação</strong> com o oceano; parece um grande lago salgado. Ex.: Mar Morto, Mar de Aral.</p></div>
      </div>
      <p class="tip">💡 <strong>Dica para lembrar:</strong> Aberto = porta escancarada; Interior = porta estreita; Fechado = porta trancada.</p>`,
    scenes: [
      { art: "🗺️", anim: "zoom", caption: "Um mapa-múndi se abre. Vamos dar zoom na Europa e no Mar Mediterrâneo." },
      { art: "🌊➡️🌉➡️🏝️", anim: "flow", caption: "O Estreito de Gibraltar é uma passagem estreita: por isso o Mediterrâneo é um MAR INTERIOR." },
      { art: "🔒 🌉 🌊", anim: "pop", caption: "Cadeado = Mar fechado (Mar Morto) · Ponte = Mar interior (Mediterrâneo) · Onda livre = Mar aberto (Caribe)." }
    ],
    exercises: [
      { type: "assoc", q: "1.a", prompt: "Associe os tipos de mares às suas características.",
        options: { A: "Mar fechado", B: "Mar aberto", C: "Mar interior" },
        items: [
          { text: "Apresenta ligação direta e ampla com os oceanos.", answer: "B" },
          { text: "Não possui comunicação com os oceanos, como ocorre com o Mar Morto.", answer: "A" },
          { text: "Está ligado ao oceano por meio de estreitos ou canais, como o Mar Mediterrâneo.", answer: "C" }
        ],
        key: "B – A – C",
        explain: "Mar aberto tem ligação ampla (B); o Mar Morto é fechado, sem saída (A); o Mediterrâneo é interior, ligado ao Atlântico pelo Estreito de Gibraltar (C)." }
    ],
    games: {
      quiz: [
        { q: "O Mar Mediterrâneo se liga ao Oceano Atlântico pelo:", options: ["Estreito de Gibraltar", "Canal do Panamá", "Estreito de Bering", "Rio Nilo"], answer: 0 },
        { q: "O Mar Morto é um exemplo de mar:", options: ["Fechado", "Aberto", "Interior", "Oceânico"], answer: 0 },
        { q: "Um mar com ligação direta e ampla com o oceano é chamado de:", options: ["Mar aberto", "Mar fechado", "Mar interior", "Lago salgado"], answer: 0 },
        { q: "Em relação aos oceanos, os mares são:", options: ["Menores e menos profundos, perto dos continentes", "Maiores e mais profundos", "Sempre de água doce", "Formados só por geleiras"], answer: 0 },
        { q: "Qual porcentagem aproximada da água da Terra é salgada?", options: ["97,5%", "2,5%", "50%", "70%"], answer: 0 }
      ],
      pairs: [
        ["Mar aberto", "Ligação ampla com o oceano"],
        ["Mar fechado", "Sem comunicação com o oceano"],
        ["Mar interior", "Ligado por estreitos ou canais"],
        ["Mar Morto", "Exemplo de mar fechado"],
        ["Mediterrâneo", "Exemplo de mar interior"],
        ["Mar do Caribe", "Exemplo de mar aberto"]
      ],
      words: [
        { w: "MEDITERRÂNEO", hint: "Mar interior ligado ao Atlântico pelo Estreito de Gibraltar." },
        { w: "GIBRALTAR", hint: "Estreito que liga o Mar Mediterrâneo ao Oceano Atlântico." },
        { w: "MAR MORTO", hint: "Exemplo clássico de mar fechado." },
        { w: "HIDROSFERA", hint: "Conjunto de todas as águas do planeta." }
      ]
    }
  },
  {
    id: "1.2", module: 1, title: "Movimentos das águas oceânicas", refs: "Questão 1.b",
    concepts: ["Ondas", "Marés", "Correntes marítimas", "Gravidade", "Ventos"],
    theory: `
      <p>As águas dos oceanos estão sempre em movimento, impulsionadas por forças da atmosfera e dos astros:</p>
      <div class="cards3">
        <div class="mini-card c-blue"><span class="big">💨🌊</span><h4>Ondas</h4><p>Movimentos da <strong>superfície</strong> do mar provocados principalmente pelos <strong>ventos</strong>.</p></div>
        <div class="mini-card c-purple"><span class="big">🌙</span><h4>Marés</h4><p>Subida e descida <strong>periódica</strong> do nível do mar (maré alta e baixa), causadas pela <strong>atração gravitacional da Lua e do Sol</strong>.</p></div>
        <div class="mini-card c-red"><span class="big">🔄</span><h4>Correntes marítimas</h4><p>Grandes <strong>massas de água</strong> que se deslocam como "rios dentro do mar", podendo ser <strong>quentes</strong> ou <strong>frias</strong>. Ajudam a regular o clima.</p></div>
      </div>
      <p class="tip">💡 <strong>Ondas → vento. Marés → Lua e Sol. Correntes → massas de água quentes ou frias.</strong></p>`,
    scenes: [
      { svg: "waves", caption: "O vento sopra sobre o mar e forma ONDAS na superfície." },
      { svg: "tide", caption: "A Lua atrai a água: o nível do mar sobe e desce — são as MARÉS." },
      { art: "🔴⤴️  🔵⤵️", anim: "flow", caption: "Correntes: a do Brasil (quente, vermelha) e a das Malvinas (fria, azul) circulam no Atlântico Sul." }
    ],
    exercises: [
      { type: "assoc", q: "1.b", prompt: "Relacione os movimentos das águas oceânicas às suas características.",
        options: { "1": "Ondas", "2": "Marés", "3": "Correntes marítimas" },
        items: [
          { text: "Movimentos periódicos de subida e descida do nível do mar, provocados principalmente pela atração gravitacional da Lua e do Sol.", answer: "2" },
          { text: "Grandes massas de água que se deslocam pelos oceanos, podendo ser quentes ou frias.", answer: "3" },
          { text: "Movimentos da superfície do mar provocados principalmente pela ação dos ventos.", answer: "1" }
        ],
        key: "2 – 3 – 1",
        explain: "Subida e descida pela Lua e Sol = marés (2); massas de água quentes ou frias = correntes (3); superfície movida pelo vento = ondas (1)." }
    ],
    games: {
      quiz: [
        { q: "O principal fator que forma as ondas é:", options: ["O vento", "A Lua", "O Sol", "Os rios"], answer: 0 },
        { q: "As marés são causadas principalmente pela:", options: ["Atração gravitacional da Lua e do Sol", "Ação dos ventos", "Chuva", "Rotação dos peixes"], answer: 0 },
        { q: "Grandes massas de água que se deslocam e podem ser quentes ou frias são:", options: ["Correntes marítimas", "Ondas", "Marés", "Estreitos"], answer: 0 },
        { q: "As correntes marítimas são importantes porque:", options: ["Ajudam a regular o clima do planeta", "Formam os desertos", "Criam os mares fechados", "Secam os rios"], answer: 0 }
      ],
      pairs: [
        ["Ondas", "Causadas pelo vento"],
        ["Marés", "Causadas pela Lua e pelo Sol"],
        ["Correntes", "Massas de água quentes ou frias"],
        ["Maré alta", "Nível do mar sobe"],
        ["Maré baixa", "Nível do mar desce"],
        ["Corrente quente", "Vem da zona equatorial"]
      ],
      words: [
        { w: "MARÉS", hint: "Subida e descida do nível do mar causada pela Lua e pelo Sol." },
        { w: "ONDAS", hint: "Movimentos da superfície do mar provocados pelo vento." },
        { w: "CORRENTES", hint: "Grandes massas de água que se deslocam pelos oceanos." },
        { w: "GRAVIDADE", hint: "Força de atração da Lua que provoca as marés." }
      ]
    }
  },
  {
    id: "1.3", module: 1, title: "Os oceanos e suas características", refs: "Questão 3 (itens 1 a 3) e Questão 6",
    concepts: ["Pacífico", "Atlântico", "Índico", "Glacial Ártico", "Glacial Antártico", "Salinidade", "Geleiras"],
    theory: `
      <p>A Terra tem <strong>cinco oceanos</strong> interligados:</p>
      <table class="tbl">
        <tr><th>Oceano</th><th>Onde fica / destaque</th></tr>
        <tr><td>🟦 <strong>Pacífico</strong></td><td>Entre a <strong>Ásia, a Austrália e a América</strong>. É o <strong>maior e mais profundo</strong> (Fossa das Marianas, ~11.000 m).</td></tr>
        <tr><td>🟦 <strong>Atlântico</strong></td><td>Entre as Américas, a Europa e a África. Ótimas condições de <strong>navegação</strong> e muito importante para o comércio.</td></tr>
        <tr><td>🟦 <strong>Índico</strong></td><td>Entre a <strong>Ásia, a África, a Oceania e a Antártida</strong>.</td></tr>
        <tr><td>🧊 <strong>Glacial Antártico</strong></td><td>Ao redor da Antártida. Cerca de <strong>20,3 milhões de km²</strong> — <strong>maior</strong> que o Ártico.</td></tr>
        <tr><td>🧊 <strong>Glacial Ártico</strong></td><td>Ao redor do <strong>Círculo Polar Ártico</strong> (Polo Norte). Cerca de <strong>13 milhões de km²</strong>.</td></tr>
      </table>
      <p><strong>Por que o mar é salgado?</strong> Os rios desgastam as rochas e levam substâncias como o <strong>sódio</strong> e o <strong>cloro</strong> até os oceanos. A água evapora, mas o sal fica — e vai se acumulando há milhões de anos.</p>
      <p><strong>Geleiras e neves eternas:</strong> as <strong>geleiras</strong> ficam nas <strong>regiões polares</strong>; as <strong>neves eternas</strong> ficam no alto de <strong>grandes altitudes</strong> (montanhas).</p>`,
    scenes: [
      { art: "🌏", anim: "spin", caption: "O globo gira: o Pacífico ocupa quase um hemisfério inteiro e chega a ~11.000 m de profundidade." },
      { svg: "glacial", caption: "Comparando: Glacial Antártico (20,3 milhões km²) é MAIOR que o Glacial Ártico (13 milhões km²)." },
      { art: "⛰️ ➡️ 🏞️ ➡️ 🌊 🧂", anim: "flow", caption: "Os rios levam sódio (Na) e cloro (Cl) das rochas até o mar. A água evapora e o sal fica." }
    ],
    exercises: [
      { type: "vf", q: "3 (itens 1 a 3)", prompt: "Classifique as afirmativas em verdadeiras (V) ou falsas (F).",
        items: [
          { text: "O oceano Pacífico é o maior e mais profundo dos cinco oceanos da Terra.", answer: "V" },
          { text: "As geleiras são encontradas nas regiões polares, enquanto as neves eternas estão presentes nas áreas de grandes altitudes.", answer: "V" },
          { text: "A água dos mares apresenta grande quantidade de sal porque os rios transportam substâncias, como o sódio e o cloro, provenientes das rochas, que se acumulam nos oceanos.", answer: "V" }
        ],
        key: "V – V – V",
        explain: "As três afirmativas estão corretas. (Os itens 4 a 7 da Questão 3 estão nos tópicos 3.1, 3.2 e 2.1.)" },
      { type: "vf", q: "6", prompt: "Sobre as características dos oceanos, marque V para verdadeiro e F para falso.",
        items: [
          { text: "O Oceano Pacífico está localizado entre a Ásia, a Austrália e a América.", answer: "V" },
          { text: "O Oceano Índico está localizado entre a Europa, a América e a África.", answer: "F", fix: "O Oceano Índico está localizado entre a Oceania, a Ásia, a África e a Antártida." },
          { text: "O Oceano Atlântico apresenta boas condições para a navegação e é importante para os fluxos econômicos.", answer: "V" },
          { text: "O Oceano Glacial Antártico é menor que o Oceano Glacial Ártico.", answer: "F", fix: "O Glacial Antártico (~20,3 milhões de km²) é MAIOR que o Glacial Ártico (~13 milhões de km²)." },
          { text: "O Oceano Glacial Ártico está localizado ao redor do Círculo Polar Ártico.", answer: "V" }
        ],
        key: "V – F – V – F – V",
        explain: "Atenção às armadilhas: a localização do Índico estava errada (Europa e América são banhadas pelo Atlântico) e o Antártico é o maior dos glaciais." }
    ],
    games: {
      quiz: [
        { q: "Qual é o maior e mais profundo oceano da Terra?", options: ["Pacífico", "Atlântico", "Índico", "Glacial Ártico"], answer: 0 },
        { q: "O Oceano Índico fica entre:", options: ["Ásia, África, Oceania e Antártida", "Europa, América e África", "América e Europa apenas", "Ásia e América"], answer: 0 },
        { q: "Qual oceano glacial é o maior?", options: ["Glacial Antártico", "Glacial Ártico", "São do mesmo tamanho", "Nenhum dos dois"], answer: 0 },
        { q: "O mar é salgado porque:", options: ["Os rios levam sais das rochas que se acumulam no oceano", "A chuva é salgada", "Os peixes produzem sal", "As geleiras derretem sal"], answer: 0 },
        { q: "As neves eternas são encontradas:", options: ["Em áreas de grandes altitudes", "No fundo do mar", "Nos desertos quentes", "Nas planícies litorâneas"], answer: 0 }
      ],
      pairs: [
        ["Pacífico", "Maior e mais profundo"],
        ["Atlântico", "Navegação e comércio"],
        ["Índico", "Ásia, África, Oceania e Antártida"],
        ["Glacial Antártico", "≈ 20,3 milhões de km²"],
        ["Glacial Ártico", "≈ 13 milhões de km²"],
        ["Sódio e cloro", "Sais levados pelos rios"]
      ],
      words: [
        { w: "PACÍFICO", hint: "O maior e mais profundo oceano." },
        { w: "ATLÂNTICO", hint: "Oceano entre as Américas, a Europa e a África, muito usado para navegação." },
        { w: "ANTÁRTICO", hint: "Oceano glacial maior, com cerca de 20,3 milhões de km²." },
        { w: "GELEIRAS", hint: "Grandes massas de gelo das regiões polares." }
      ]
    }
  },

  /* ======================= MÓDULO 2 ======================= */
  {
    id: "2.1", module: 2, title: "O ciclo da água", refs: "Questão 3 (item 7)",
    concepts: ["Evaporação", "Transpiração", "Condensação", "Precipitação", "Infiltração", "Escoamento"],
    theory: `
      <p>O <strong>ciclo da água</strong> (ciclo hidrológico) é a circulação contínua da água entre a superfície e a atmosfera, movida pela <strong>energia do Sol</strong> e pela <strong>gravidade</strong>.</p>
      <ol class="steps">
        <li><strong>☀️ Evaporação</strong> — o calor do Sol transforma a água de rios, lagos e oceanos em vapor.</li>
        <li><strong>🌳 Transpiração</strong> — as plantas também liberam vapor de água.</li>
        <li><strong>☁️ Condensação</strong> — o vapor sobe, esfria e forma as nuvens.</li>
        <li><strong>🌧️ Precipitação</strong> — a água volta à superfície como chuva, neve ou granizo.</li>
        <li><strong>⬇️ Infiltração</strong> — parte da água penetra no solo e abastece os aquíferos.</li>
        <li><strong>➡️ Escoamento</strong> — outra parte corre pela superfície até os rios e mares.</li>
      </ol>
      <p class="warn">⚠️ <strong>Pegadinha da revisão:</strong> dizer que evaporação, condensação e infiltração são as <em>únicas</em> etapas é <strong>FALSO</strong> — a precipitação, a transpiração e o escoamento também fazem parte do ciclo.</p>`,
    scenes: [
      { svg: "cycle", caption: "O Sol aquece lagos e florestas: o vapor sobe (evaporação e transpiração), forma nuvens (condensação) e cai como chuva (precipitação)." },
      { art: "🌧️ ➡️ 🟫⬇️💧  ➡️🏞️", anim: "flow", caption: "No solo, parte da água infiltra até o aquífero; outra parte escoa até o rio." }
    ],
    exercises: [
      { type: "vf", q: "3 (item 7)", prompt: "Classifique a afirmativa em verdadeira (V) ou falsa (F).",
        items: [
          { text: "A evaporação, a condensação e a infiltração são as únicas etapas do ciclo da água.", answer: "F", fix: "A evaporação, a condensação, a precipitação e a infiltração são ALGUMAS das etapas do ciclo da água (há também transpiração e escoamento)." }
        ],
        key: "F",
        explain: "A palavra \"únicas\" torna a frase falsa: faltam a precipitação, a transpiração e o escoamento." },
      { type: "order", q: "Desafio extra", prompt: "Coloque as etapas do ciclo da água na ordem correta (toque para escolher a próxima).",
        items: ["Evaporação", "Condensação", "Precipitação", "Infiltração / Escoamento"],
        explain: "A água evapora, condensa formando nuvens, precipita como chuva e então infiltra no solo ou escoa até os rios — e o ciclo recomeça." }
    ],
    games: {
      quiz: [
        { q: "A formação das nuvens acontece na etapa de:", options: ["Condensação", "Evaporação", "Infiltração", "Escoamento"], answer: 0 },
        { q: "Chuva, neve e granizo são formas de:", options: ["Precipitação", "Evaporação", "Transpiração", "Condensação"], answer: 0 },
        { q: "Quando a água penetra no solo e abastece os aquíferos, ocorre:", options: ["Infiltração", "Escoamento", "Evaporação", "Condensação"], answer: 0 },
        { q: "O que move o ciclo da água?", options: ["A energia do Sol e a gravidade", "Os ventos apenas", "A Lua", "Os vulcões"], answer: 0 },
        { q: "As plantas liberam vapor de água pela:", options: ["Transpiração", "Precipitação", "Infiltração", "Escoamento"], answer: 0 }
      ],
      pairs: [
        ["Evaporação", "Água vira vapor com o calor do Sol"],
        ["Transpiração", "Plantas liberam vapor"],
        ["Condensação", "Vapor esfria e forma nuvens"],
        ["Precipitação", "Chuva, neve ou granizo"],
        ["Infiltração", "Água penetra no solo"],
        ["Escoamento", "Água corre pela superfície"]
      ],
      words: [
        { w: "EVAPORAÇÃO", hint: "Etapa em que a água vira vapor pelo calor do Sol." },
        { w: "CONDENSAÇÃO", hint: "O vapor esfria e forma as nuvens." },
        { w: "PRECIPITAÇÃO", hint: "Chuva, neve ou granizo caindo das nuvens." },
        { w: "INFILTRAÇÃO", hint: "A água penetra no solo." }
      ]
    }
  },
  {
    id: "2.2", module: 2, title: "Regimes dos rios", refs: "Questão 1.c",
    concepts: ["Regime pluvial", "Regime nival", "Regime misto", "Vazão"],
    theory: `
      <p>O <strong>regime</strong> de um rio é a forma como ele é <strong>abastecido</strong> de água — e isso faz o volume (vazão) variar ao longo do ano.</p>
      <div class="cards3">
        <div class="mini-card c-blue"><span class="big">🌧️</span><h4>Pluvial</h4><p>Abastecido principalmente pelas <strong>chuvas</strong>. É o regime da maioria dos rios brasileiros.</p></div>
        <div class="mini-card c-purple"><span class="big">🏔️❄️</span><h4>Nival</h4><p>Abastecido pelo <strong>derretimento da neve ou do gelo</strong> das montanhas.</p></div>
        <div class="mini-card c-red"><span class="big">🌧️+❄️</span><h4>Misto</h4><p>Recebe água <strong>das chuvas e do degelo</strong>. Ex.: Rio Amazonas (nasce nos Andes e recebe chuvas na floresta).</p></div>
      </div>
      <p class="tip">💡 <strong>Pluvial</strong> lembra "pluviômetro" (mede chuva). <strong>Nival</strong> lembra "neve".</p>`,
    scenes: [
      { art: "🌧️🌧️ ➡️ 🏞️⬆️", anim: "rain", caption: "Pluvial: as nuvens despejam chuva e o nível do rio sobe." },
      { art: "☀️ 🏔️ 💧💧 ➡️ 🏞️", anim: "flow", caption: "Nival: o sol derrete a neve da montanha e os filetes de água formam o rio." },
      { art: "🏔️❄️ + 🌧️🌳 = 🏞️ Amazonas", anim: "pop", caption: "Misto: o Amazonas recebe o degelo dos Andes e as chuvas da floresta." }
    ],
    exercises: [
      { type: "assoc", q: "1.c", prompt: "Relacione os regimes dos rios às suas características.",
        options: { "1": "Regime pluvial", "2": "Regime nival", "3": "Regime misto" },
        items: [
          { text: "O rio recebe água tanto das chuvas quanto do derretimento da neve ou do gelo.", answer: "3" },
          { text: "O abastecimento do rio ocorre principalmente pelas chuvas.", answer: "1" },
          { text: "O rio é abastecido pelo derretimento da neve ou do gelo.", answer: "2" }
        ],
        key: "3 – 1 – 2",
        explain: "Chuva + degelo = misto (3); chuva = pluvial (1); neve/gelo = nival (2)." }
    ],
    games: {
      quiz: [
        { q: "Um rio abastecido principalmente pelas chuvas tem regime:", options: ["Pluvial", "Nival", "Misto", "Glacial"], answer: 0 },
        { q: "O regime nival é o de rios abastecidos por:", options: ["Derretimento da neve ou do gelo", "Chuvas", "Água do mar", "Aquíferos apenas"], answer: 0 },
        { q: "Por que o Rio Amazonas é de regime misto?", options: ["Recebe degelo dos Andes e chuvas da floresta", "Só recebe chuvas", "Só recebe neve", "Recebe água do mar"], answer: 0 },
        { q: "Qual é o regime predominante nos rios brasileiros?", options: ["Pluvial", "Nival", "Glacial", "Marinho"], answer: 0 }
      ],
      pairs: [
        ["Pluvial", "Água das chuvas"],
        ["Nival", "Derretimento de neve ou gelo"],
        ["Misto", "Chuvas + degelo"],
        ["Rio Amazonas", "Exemplo de regime misto"],
        ["Vazão", "Volume de água do rio"],
        ["Andes", "Onde o Amazonas nasce"]
      ],
      words: [
        { w: "PLUVIAL", hint: "Regime de rio abastecido pelas chuvas." },
        { w: "NIVAL", hint: "Regime de rio abastecido pelo derretimento da neve." },
        { w: "MISTO", hint: "Regime que combina chuva e degelo." },
        { w: "AMAZONAS", hint: "Grande rio brasileiro de regime misto." }
      ]
    }
  },
  {
    id: "2.3", module: 2, title: "Partes de um rio: montante e jusante", refs: "Questão 2 (imagem) e 2.a",
    concepts: ["Nascente", "Curso superior", "Curso médio", "Meandro", "Curso inferior", "Foz", "Montante", "Jusante"],
    theory: `
      <p>Um rio é dividido em três partes ao longo do seu caminho:</p>
      <ul class="steps">
        <li><strong>⛰️ Curso superior</strong> — onde fica a <strong>nascente</strong> (ou cabeceira), nas áreas mais altas. Águas rápidas, com muita força.</li>
        <li><strong>〰️ Curso médio</strong> — relevo mais suave; o rio faz curvas chamadas <strong>meandros</strong>.</li>
        <li><strong>🌊 Curso inferior</strong> — trecho final, perto do mar; a água fica lenta e deposita sedimentos até a <strong>foz</strong>.</li>
      </ul>
      <div class="cards2">
        <div class="mini-card c-blue"><span class="big">⬆️⛰️</span><h4>Montante</h4><p>Qualquer ponto do rio mais <strong>próximo da nascente</strong> (subindo o rio, contra a correnteza).</p></div>
        <div class="mini-card c-green"><span class="big">⬇️🌊</span><h4>Jusante</h4><p>Qualquer ponto mais <strong>próximo da foz</strong>, seguindo o <strong>sentido da correnteza</strong>.</p></div>
      </div>
      <p class="tip">💡 Se uma fábrica polui o rio, quem mora <strong>a jusante</strong> (rio abaixo) é afetado, porque a correnteza leva a poluição.</p>`,
    scenes: [
      { svg: "riverProfile", caption: "Da montanha ao mar: nascente (curso superior), meandros (curso médio) e foz (curso inferior)." },
      { art: "⛰️ ⬅️ MONTANTE   🚤   JUSANTE ➡️ 🌊", anim: "boat", caption: "Do barco: subindo o rio é MONTANTE; descendo, no sentido da correnteza, é JUSANTE." }
    ],
    exercises: [
      { type: "diagram", q: "2", prompt: "Complete a imagem: toque em um rótulo e depois no número correspondente.",
        diagram: "river",
        slots: [
          { n: 1, answer: "Nascente ou cabeceira" },
          { n: 2, answer: "Meandro" },
          { n: 3, answer: "Foz em delta" },
          { n: 4, answer: "Curso superior" },
          { n: 5, answer: "Curso médio" },
          { n: 6, answer: "Curso inferior" }
        ],
        distractors: ["Afluente", "Divisor de águas"],
        explain: "Nascente no alto da montanha (curso superior), meandro nas curvas da planície (curso médio) e foz em delta, com ilhas, no mar (curso inferior)." },
      { type: "open", q: "2.a", prompt: "Explique o que são montante e jusante, considerando o sentido do curso de um rio.",
        keywords: [["nascente", "cabeceira"], ["foz"], ["correnteza", "sentido", "descendo", "rio abaixo"]],
        answer: "Montante é qualquer ponto do rio que esteja mais próximo da nascente. Jusante é qualquer ponto que esteja mais próximo da foz, seguindo o sentido da correnteza." }
    ],
    games: {
      quiz: [
        { q: "Montante é a direção:", options: ["Da nascente", "Da foz", "Do mar", "Do meandro"], answer: 0 },
        { q: "Jusante é a direção:", options: ["Da foz, no sentido da correnteza", "Da nascente", "Contra a correnteza", "Do topo da montanha"], answer: 0 },
        { q: "As curvas que o rio forma no curso médio chamam-se:", options: ["Meandros", "Deltas", "Estuários", "Divisores"], answer: 0 },
        { q: "A nascente de um rio fica no:", options: ["Curso superior", "Curso médio", "Curso inferior", "Mar"], answer: 0 },
        { q: "Uma usina polui o rio. Quem será afetado?", options: ["Quem mora a jusante", "Quem mora a montante", "Ninguém", "Só quem está na nascente"], answer: 0 }
      ],
      pairs: [
        ["Nascente", "Onde o rio começa"],
        ["Foz", "Onde o rio deságua"],
        ["Meandro", "Curva do rio"],
        ["Montante", "Em direção à nascente"],
        ["Jusante", "Em direção à foz"],
        ["Curso superior", "Parte alta, águas rápidas"]
      ],
      words: [
        { w: "MONTANTE", hint: "Direção da nascente, subindo o rio." },
        { w: "JUSANTE", hint: "Direção da foz, no sentido da correnteza." },
        { w: "MEANDRO", hint: "Curva sinuosa do rio no curso médio." },
        { w: "NASCENTE", hint: "Local onde o rio começa (cabeceira)." }
      ]
    }
  },
  {
    id: "2.4", module: 2, title: "Tipos de foz: estuário e delta", refs: "Questão 2.b",
    concepts: ["Foz em estuário", "Foz em delta", "Canal de escoamento", "Ilhas fluviais", "Sedimentos"],
    theory: `
      <p>A <strong>foz</strong> é o lugar onde o rio deságua (no mar, em um lago ou em outro rio). Há dois tipos principais:</p>
      <div class="cards2">
        <div class="mini-card c-blue"><span class="big">🔻</span><h4>Foz em estuário</h4><p>O rio deságua por <strong>um único canal</strong> largo, sem ilhas. Ex.: Rio São Francisco.</p></div>
        <div class="mini-card c-green"><span class="big">🌿🔱</span><h4>Foz em delta</h4><p>O rio se divide em <strong>vários canais</strong>, separados por <strong>ilhas fluviais</strong> formadas pelo acúmulo de sedimentos. Ex.: Delta do Parnaíba, Delta do Nilo.</p></div>
      </div>
      <p class="tip">💡 O Rio Amazonas tem foz <strong>mista</strong> (estuário e delta). <br>Estuário = <strong>1 canal</strong> · Delta = <strong>vários canais + ilhas</strong>.</p>`,
    scenes: [
      { svg: "estuary", caption: "Estuário: o rio chega ao mar por um único canal largo e limpo." },
      { svg: "delta", caption: "Delta: perto do mar, o rio se abre em leque com vários braços e ilhas de sedimentos." }
    ],
    exercises: [
      { type: "open", q: "2.b", prompt: "Quais são os dois principais tipos de foz de um rio? Explique como cada um deles se caracteriza.",
        keywords: [["estuario"], ["delta"], ["unico canal", "um canal", "um so canal", "so canal"], ["varios canais", "mais de um canal", "canais"], ["ilha"]],
        answer: "• Foz em estuário: ocorre quando o rio deságua por um único canal de escoamento.\n• Foz em delta: ocorre quando o rio apresenta mais de um canal de escoamento, separados por áreas de terra chamadas ilhas fluviais." }
    ],
    games: {
      quiz: [
        { q: "Uma foz com um único canal de escoamento é do tipo:", options: ["Estuário", "Delta", "Meandro", "Nascente"], answer: 0 },
        { q: "O que caracteriza uma foz em delta?", options: ["Vários canais separados por ilhas fluviais", "Um único canal largo", "Uma cachoeira", "Ausência de água"], answer: 0 },
        { q: "As ilhas de um delta se formam pelo acúmulo de:", options: ["Sedimentos", "Gelo", "Sal", "Corais"], answer: 0 },
        { q: "Um exemplo de foz em delta no Brasil é o do rio:", options: ["Parnaíba", "São Francisco", "Tietê", "Paraná"], answer: 0 }
      ],
      pairs: [
        ["Estuário", "Um único canal"],
        ["Delta", "Vários canais e ilhas"],
        ["Ilhas fluviais", "Terras entre os canais"],
        ["Foz", "Onde o rio deságua"],
        ["Sedimentos", "Formam as ilhas do delta"],
        ["Rio Amazonas", "Foz mista"]
      ],
      words: [
        { w: "ESTUÁRIO", hint: "Foz com um único canal de escoamento." },
        { w: "DELTA", hint: "Foz com vários canais e ilhas." },
        { w: "SEDIMENTOS", hint: "Materiais que se acumulam e formam ilhas na foz." },
        { w: "PARNAÍBA", hint: "Rio brasileiro famoso pela foz em delta." }
      ]
    }
  },
  {
    id: "2.5", module: 2, title: "Rios de planalto e rios de planície", refs: "Questão 2.c",
    concepts: ["Rio de planalto", "Rio de planície", "Hidrelétrica", "Navegação", "Declive"],
    theory: `
      <p>O <strong>relevo</strong> por onde o rio passa muda o jeito da água e como podemos usá-la:</p>
      <table class="tbl">
        <tr><th></th><th>⛰️ Rio de planalto</th><th>🏞️ Rio de planície</th></tr>
        <tr><td>Relevo</td><td>Acidentado, com declives, quedas e cachoeiras</td><td>Plano, com poucos desníveis</td></tr>
        <tr><td>Água</td><td><strong>Veloz</strong> e com muita força</td><td><strong>Calma</strong> e lenta</td></tr>
        <tr><td>Uso principal</td><td>⚡ <strong>Geração de energia</strong> (hidrelétricas)</td><td>🚢 <strong>Navegação</strong></td></tr>
      </table>
      <p class="tip">💡 <strong>Planalto → rápido → energia.</strong> &nbsp; <strong>Planície → calmo → navegação.</strong></p>`,
    scenes: [
      { art: "⛰️💦 ➡️ ⚙️ ➡️ ⚡", anim: "spin2", caption: "Planalto: a cachoeira em declive gira a turbina da usina." },
      { art: "🏞️ 🚢 ～～～", anim: "boat", caption: "Planície: um grande barco desliza tranquilo em um rio calmo e plano." }
    ],
    exercises: [
      { type: "open", q: "2.c", prompt: "Diferencie os rios de planalto dos rios de planície, considerando suas características e suas principais utilizações.",
        keywords: [["veloz", "rapid", "forte", "forca", "velocidade"], ["declive", "queda", "cachoeira", "desnivel"], ["energia", "hidreletric"], ["calm", "lent", "tranquil"], ["navega"]],
        answer: "Os rios de planalto apresentam águas mais velozes, devido aos declives e às quedas, favorecendo a geração de energia. Os rios de planície apresentam águas mais calmas e poucos desníveis, favorecendo a navegação." }
    ],
    games: {
      quiz: [
        { q: "Rios de planalto são mais usados para:", options: ["Gerar energia elétrica", "Navegação de grandes barcos", "Formar mares", "Formar geleiras"], answer: 0 },
        { q: "Rios de planície favorecem:", options: ["A navegação", "A geração de energia", "As cachoeiras", "As corredeiras"], answer: 0 },
        { q: "Por que rios de planalto dificultam a navegação?", options: ["Têm quedas, cachoeiras e águas rápidas", "Têm águas paradas", "São muito largos", "São salgados"], answer: 0 },
        { q: "As águas de um rio de planície são:", options: ["Calmas e lentas", "Rápidas e fortes", "Congeladas", "Salgadas"], answer: 0 }
      ],
      pairs: [
        ["Rio de planalto", "Águas velozes"],
        ["Rio de planície", "Águas calmas"],
        ["Hidrelétrica", "Aproveita rios de planalto"],
        ["Navegação", "Aproveita rios de planície"],
        ["Cachoeira", "Queda d'água"],
        ["Declive", "Terreno inclinado"]
      ],
      words: [
        { w: "PLANALTO", hint: "Relevo de rios com quedas, bons para energia." },
        { w: "PLANÍCIE", hint: "Relevo plano com rios calmos, bons para navegar." },
        { w: "NAVEGAÇÃO", hint: "Principal uso dos rios de planície." },
        { w: "CACHOEIRA", hint: "Queda d'água comum em rios de planalto." }
      ]
    }
  },
  {
    id: "2.6", module: 2, title: "Bacia hidrográfica", refs: "Questão 11 (a, b e c)",
    concepts: ["Bacia hidrográfica", "Rede hidrográfica", "Divisores de água", "Afluente", "Subafluente", "Rio principal"],
    theory: `
      <p>Uma <strong>bacia hidrográfica</strong> é o conjunto de terras de uma área <strong>drenada por um rio principal e seus afluentes</strong>, considerando também suas características naturais (relevo, vegetação, clima) e sociais (cidades, agricultura).</p>
      <div class="cards2">
        <div class="mini-card c-blue"><span class="big">🌿💧</span><h4>Rede hidrográfica</h4><p>Formada pelos <strong>cursos d'água</strong>: o <strong>rio principal</strong>, seus <strong>afluentes</strong> e <strong>subafluentes</strong>.</p></div>
        <div class="mini-card c-red"><span class="big">⛰️〰️</span><h4>Divisores de água</h4><p>Áreas de <strong>relevo mais elevado</strong> (serras, morros) que <strong>delimitam a bacia</strong> e direcionam a água da chuva para o rio principal.</p></div>
      </div>
      <p><strong>Afluente</strong> = rio que deságua no rio principal. <strong>Subafluente</strong> = rio que deságua em um afluente.</p>`,
    scenes: [
      { svg: "basin", caption: "A linha vermelha tracejada no alto dos morros são os divisores de água: o limite da bacia." },
      { art: "🌧️ ⛰️ ↙️ Bacia A | Bacia B ↘️", anim: "rain", caption: "A chuva que cai de um lado do divisor vai para uma bacia; a do outro lado, para a bacia vizinha." },
      { art: "〰️ ➡️ 〰️〰️ ➡️ 🟦 Rio principal", anim: "flow", caption: "Subafluentes deságuam nos afluentes, que deságuam no rio principal: essa é a rede hidrográfica." }
    ],
    exercises: [
      { type: "diagram", q: "11.a", prompt: "Complete a imagem com as partes de uma bacia hidrográfica.",
        diagram: "basin",
        slots: [
          { n: 1, answer: "Nascente" },
          { n: 2, answer: "Afluente" },
          { n: 3, answer: "Rio principal" },
          { n: 4, answer: "Foz" },
          { n: 5, answer: "Divisores de água" }
        ],
        distractors: ["Meandro", "Jusante"],
        explain: "A nascente fica no alto; os afluentes chegam ao rio principal, que termina na foz. A linha que contorna a bacia pelos pontos mais altos são os divisores de água." },
      { type: "open", q: "11.b", prompt: "Explique o que é uma bacia hidrográfica.",
        keywords: [["terra", "area", "regiao", "conjunto"], ["drenad", "drena"], ["rio principal"], ["afluente"]],
        answer: "Bacia hidrográfica é o conjunto de terras de uma área drenada por um rio principal e seus afluentes, considerando também suas características naturais e sociais." },
      { type: "open", q: "11.c", prompt: "Qual é a diferença entre rede hidrográfica e divisores de água?",
        keywords: [["rio principal"], ["afluente"], ["subafluente"], ["relevo", "elevad", "alto", "serra", "morro"], ["delimit", "limite", "separ"]],
        answer: "A rede hidrográfica é formada pelo rio principal, seus afluentes e subafluentes. Os divisores de água são áreas de relevo mais elevado que delimitam a bacia e direcionam a água para o rio principal." }
    ],
    games: {
      quiz: [
        { q: "Bacia hidrográfica é:", options: ["A área drenada por um rio principal e seus afluentes", "Um lago artificial", "Um tipo de foz", "Um mar fechado"], answer: 0 },
        { q: "Os divisores de água são:", options: ["Áreas de relevo elevado que delimitam a bacia", "Rios que deságuam no mar", "Barragens", "Ilhas fluviais"], answer: 0 },
        { q: "A rede hidrográfica é formada por:", options: ["Rio principal, afluentes e subafluentes", "Apenas o rio principal", "Montanhas e serras", "Oceanos"], answer: 0 },
        { q: "Um rio que deságua em um afluente é um:", options: ["Subafluente", "Rio principal", "Divisor", "Estuário"], answer: 0 },
        { q: "A chuva que cai sobre um divisor de águas:", options: ["Escorre para uma bacia ou para a vizinha, dependendo do lado", "Fica parada no topo", "Vai sempre para o mar direto", "Evapora na hora"], answer: 0 }
      ],
      pairs: [
        ["Bacia hidrográfica", "Área drenada por um rio e afluentes"],
        ["Rede hidrográfica", "Rio principal + afluentes + subafluentes"],
        ["Divisores de água", "Relevo alto que limita a bacia"],
        ["Afluente", "Deságua no rio principal"],
        ["Subafluente", "Deságua em um afluente"],
        ["Rio principal", "Recebe os afluentes"]
      ],
      words: [
        { w: "AFLUENTE", hint: "Rio que deságua no rio principal." },
        { w: "BACIA", hint: "Área drenada por um rio principal e seus afluentes." },
        { w: "DIVISORES", hint: "Relevo elevado que separa uma bacia da outra (… de água)." },
        { w: "SUBAFLUENTE", hint: "Rio que deságua em um afluente." }
      ]
    }
  },

  /* ======================= MÓDULO 3 ======================= */
  {
    id: "3.1", module: 3, title: "Aquíferos: Guarani e Alter do Chão", refs: "Questão 3 (itens 4 e 5)",
    concepts: ["Aquífero", "Rochas permeáveis e porosas", "Infiltração", "Aquífero Guarani", "Alter do Chão"],
    theory: `
      <p>Os <strong>aquíferos</strong> são <strong>reservatórios subterrâneos</strong> de água. Eles se formam quando a água da chuva <strong>infiltra</strong> e ocupa os espaços (poros e fissuras) das <strong>rochas permeáveis e porosas</strong>, como o arenito — como uma esponja.</p>
      <div class="cards2">
        <div class="mini-card c-blue"><span class="big">🇧🇷🇦🇷🇵🇾🇺🇾</span><h4>Aquífero Guarani</h4><p>É <strong>internacional</strong>: fica no <strong>Brasil, Argentina, Paraguai e Uruguai</strong>.</p></div>
        <div class="mini-card c-green"><span class="big">🇧🇷🌳</span><h4>Aquífero Alter do Chão</h4><p>Fica <strong>exclusivamente no Brasil</strong>, na Região Amazônica. É considerado um dos maiores do mundo em volume de água.</p></div>
      </div>
      <p class="warn">⚠️ <strong>Pegadinha da revisão:</strong> a afirmativa trocou os aquíferos de lugar. Guarani = 4 países; Alter do Chão = só Brasil.</p>`,
    scenes: [
      { svg: "aquifer", caption: "Corte do solo: a água atravessa a terra, fica guardada no arenito poroso e para na rocha impermeável." },
      { art: "🗺️ 🔵 Guarani: 🇧🇷🇦🇷🇵🇾🇺🇾   🟢 Alter do Chão: 🇧🇷", anim: "pop", caption: "Guarani se estende por 4 países; Alter do Chão está só no norte do Brasil." }
    ],
    exercises: [
      { type: "vf", q: "3 (itens 4 e 5)", prompt: "Classifique as afirmativas em verdadeiras (V) ou falsas (F).",
        items: [
          { text: "Os aquíferos são reservatórios subterrâneos de água formados quando a água infiltrada ocupa os espaços existentes nas rochas permeáveis e porosas.", answer: "V" },
          { text: "O Aquífero Guarani está localizado exclusivamente no território brasileiro, enquanto o Aquífero Alter do Chão se estende por Brasil, Argentina, Paraguai e Uruguai.", answer: "F", fix: "O Aquífero Guarani está localizado no Brasil, Argentina, Paraguai e Uruguai, enquanto o Aquífero Alter do Chão está localizado exclusivamente no território brasileiro." }
        ],
        key: "V – F",
        explain: "A definição de aquífero está correta. A segunda frase inverteu os aquíferos." }
    ],
    games: {
      quiz: [
        { q: "Aquíferos são:", options: ["Reservatórios subterrâneos de água", "Rios voadores", "Lagos salgados", "Geleiras polares"], answer: 0 },
        { q: "O Aquífero Guarani está em quais países?", options: ["Brasil, Argentina, Paraguai e Uruguai", "Somente no Brasil", "Brasil e Chile", "Peru e Bolívia"], answer: 0 },
        { q: "O Aquífero Alter do Chão fica:", options: ["Exclusivamente no Brasil (Amazônia)", "Na Argentina", "Em quatro países", "No Uruguai"], answer: 0 },
        { q: "A água se acumula nos aquíferos em rochas:", options: ["Permeáveis e porosas", "Impermeáveis", "Vulcânicas quentes", "Feitas de sal"], answer: 0 }
      ],
      pairs: [
        ["Aquífero", "Reservatório subterrâneo"],
        ["Guarani", "Brasil, Argentina, Paraguai e Uruguai"],
        ["Alter do Chão", "Só no Brasil (Amazônia)"],
        ["Arenito", "Rocha porosa, como esponja"],
        ["Infiltração", "Abastece os aquíferos"],
        ["Rocha impermeável", "Não deixa a água passar"]
      ],
      words: [
        { w: "AQUÍFERO", hint: "Reservatório de água debaixo da terra." },
        { w: "GUARANI", hint: "Aquífero que se estende por quatro países." },
        { w: "POROSAS", hint: "Rochas com espaços que guardam água (permeáveis e …)." },
        { w: "ALTER DO CHÃO", hint: "Aquífero localizado só no Brasil, na Amazônia." }
      ]
    }
  },
  {
    id: "3.2", module: 3, title: "Distribuição da água no planeta", refs: "Questão 3 (item 6), 4.c e 5.a",
    concepts: ["97,5% salgada", "2,5% doce", "Geleiras", "Águas subterrâneas", "América 39,6%"],
    theory: `
      <p>A água está distribuída de forma <strong>muito desigual</strong>:</p>
      <ul class="steps">
        <li><strong>97,5%</strong> é <strong>salgada</strong> (oceanos e mares).</li>
        <li>Só <strong>2,5%</strong> é <strong>doce</strong> — e a maior parte dela está <strong>congelada nas geleiras</strong> ou <strong>debaixo da terra</strong> (águas subterrâneas).</li>
        <li>Apenas uma parte bem pequena está em <strong>rios e lagos</strong>, fácil de usar.</li>
      </ul>
      <p>Entre os continentes, a <strong>América</strong> concentra a maior parte das águas doces superficiais: cerca de <strong>39,6%</strong>.</p>
      <div class="bars" aria-label="Distribuição da água">
        <div class="bar"><span style="width:97.5%" class="b-salt">Salgada 97,5%</span></div>
        <div class="bar"><span style="width:12%" class="b-fresh">Doce 2,5%</span></div>
      </div>
      <p class="warn">⚠️ <strong>Pegadinhas:</strong> a maior parte da água <strong>NÃO</strong> é doce; e não é a Oceania que tem mais água superficial — é a <strong>América</strong>.</p>`,
    scenes: [
      { svg: "gallon", caption: "Um galão com toda a água do mundo: 97,5% é salgada; só uma 'tampinha' (2,5%) é doce." },
      { art: "🧊🧊  🟫💧  🏞️·", anim: "pop", caption: "Da tampinha de água doce: a maior parte vira gelo, outra fica no subsolo e só uma gotinha está nos rios." },
      { art: "🌎✨ 39,6%", anim: "zoom", caption: "A América brilha: 39,6% da água doce superficial do mundo." }
    ],
    exercises: [
      { type: "vf", q: "3 (item 6)", prompt: "Classifique a afirmativa em verdadeira (V) ou falsa (F).",
        items: [
          { text: "A maior parte da água existente no planeta é doce e está disponível nos rios e lagos para o consumo humano.", answer: "F", fix: "A maior parte da água existente no planeta é salgada (97,5%). Apenas 2,5% é doce, e grande parte está armazenada nas geleiras e nas águas subterrâneas." }
        ],
        key: "F",
        explain: "Só 2,5% da água é doce, e a maior parte dela não está em rios e lagos." },
      { type: "mc", q: "4.c", prompt: "Assinale a alternativa correta sobre a distribuição da água no planeta e entre os continentes.",
        options: [
          "Aproximadamente 97,5% da água existente no planeta é doce e apenas 2,5% é salgada.",
          "A América concentra a maior porcentagem das águas superficiais do planeta, com aproximadamente 39,6%.",
          "A Oceania apresenta a maior porcentagem de águas superficiais entre os continentes, com 31,8%.",
          "A África concentra aproximadamente 15% das águas superficiais do planeta, enquanto a Europa possui 9,7%."
        ],
        answer: 1,
        explain: "A América concentra aproximadamente 39,6% das águas doces superficiais do planeta. A primeira alternativa inverte doce e salgada." },
      { type: "short", q: "5.a", prompt: "Qual continente concentra a maior porcentagem das águas superficiais do planeta?",
        accept: [["america"]],
        answer: "América, com aproximadamente 39,6% das águas doces superficiais do planeta." }
    ],
    games: {
      quiz: [
        { q: "Qual porcentagem da água do planeta é doce?", options: ["2,5%", "97,5%", "50%", "39,6%"], answer: 0 },
        { q: "Onde está a maior parte da água doce?", options: ["Nas geleiras e no subsolo", "Nos rios", "Nos lagos", "Nas nuvens"], answer: 0 },
        { q: "Qual continente tem mais água doce superficial?", options: ["América", "Oceania", "África", "Europa"], answer: 0 },
        { q: "A América concentra cerca de quanto da água doce superficial?", options: ["39,6%", "9,7%", "15%", "97,5%"], answer: 0 }
      ],
      pairs: [
        ["97,5%", "Água salgada"],
        ["2,5%", "Água doce"],
        ["39,6%", "Água superficial da América"],
        ["Geleiras", "Guardam grande parte da água doce"],
        ["Subsolo", "Águas subterrâneas"],
        ["Rios e lagos", "Pequena parte da água doce"]
      ],
      words: [
        { w: "AMÉRICA", hint: "Continente com 39,6% da água doce superficial." },
        { w: "SALGADA", hint: "Tipo de água que forma 97,5% do planeta." },
        { w: "GELEIRAS", hint: "Onde está congelada grande parte da água doce." },
        { w: "SUBTERRÂNEA", hint: "Água guardada debaixo da terra." }
      ]
    }
  },
  {
    id: "3.3", module: 3, title: "Usos da água e estresse hídrico", refs: "Questões 4.a, 4.b e 5.b",
    concepts: ["Agricultura (~70%)", "Indústria", "Consumo doméstico", "Navegação", "Energia", "Estresse hídrico"],
    theory: `
      <p>A sociedade usa a água para: <strong>🌾 agricultura</strong> (irrigação), <strong>🏭 indústria</strong>, <strong>🚿 consumo doméstico</strong>, <strong>🚢 navegação</strong> e <strong>⚡ geração de energia</strong>.</p>
      <p>A atividade que <strong>mais consome água doce</strong> no mundo é a <strong>agricultura</strong>: cerca de <strong>70%</strong> do consumo, por causa da irrigação das plantações.</p>
      <div class="pie-wrap"><div class="pie"></div>
        <ul class="legend"><li><i style="background:#16a34a"></i> Agricultura ~70%</li><li><i style="background:#f59e0b"></i> Indústria ~20%</li><li><i style="background:#0ea5e9"></i> Doméstico ~10%</li></ul></div>
      <p><strong>Estresse hídrico</strong> acontece quando a <strong>demanda</strong> (procura) por água é <strong>maior do que a quantidade disponível</strong> ou maior do que a natureza consegue repor.</p>`,
    scenes: [
      { art: "🌾🌾🌾🌾🌾🌾🌾 🏭🏭 🚿", anim: "pop", caption: "Agricultura ~70%, indústria ~20% e consumo doméstico ~10%." },
      { art: "👥🌾 ⚖️ 💧", anim: "tilt", caption: "De um lado, muita gente e plantações (demanda alta); do outro, um reservatório secando. Alerta: ESTRESSE HÍDRICO!" }
    ],
    exercises: [
      { type: "open", q: "4.a", prompt: "Quais são os principais usos da água pela sociedade? Cite pelo menos duas atividades.",
        keywords: [["agricultura", "irrigacao", "lavoura"], ["industria"], ["domestic", "casa", "beber", "banho", "higiene"], ["navega", "transporte"], ["energia", "hidreletric"]],
        minHits: 2,
        answer: "Agricultura, indústria, consumo doméstico, navegação e geração de energia. (Bastava citar pelo menos duas atividades.)" },
      { type: "open", q: "4.b", prompt: "O que é estresse hídrico?",
        keywords: [["demanda", "procura", "consumo", "uso"], ["maior"], ["disponivel", "disponibilidade", "repor", "oferta", "existe"]],
        answer: "O estresse hídrico ocorre quando a demanda por água é maior do que a quantidade disponível ou que a natureza consegue repor." },
      { type: "short", q: "5.b", prompt: "Qual atividade humana é responsável pelo maior consumo de água doce no mundo?",
        accept: [["agricultura", "agropecuaria", "irrigacao"]],
        answer: "Agricultura, responsável por aproximadamente 70% do consumo mundial de água doce." }
    ],
    games: {
      quiz: [
        { q: "Qual atividade mais consome água doce no mundo?", options: ["Agricultura", "Indústria", "Consumo doméstico", "Navegação"], answer: 0 },
        { q: "A agricultura consome cerca de quanto da água doce?", options: ["70%", "10%", "20%", "97,5%"], answer: 0 },
        { q: "Estresse hídrico acontece quando:", options: ["A demanda por água é maior que a disponível", "Chove demais", "O rio transborda", "A água é salgada"], answer: 0 },
        { q: "Qual destes NÃO é um uso da água pela sociedade?", options: ["Formar montanhas", "Irrigação", "Indústria", "Geração de energia"], answer: 0 }
      ],
      pairs: [
        ["Agricultura", "≈ 70% do consumo"],
        ["Indústria", "≈ 20% do consumo"],
        ["Consumo doméstico", "≈ 10% do consumo"],
        ["Estresse hídrico", "Demanda maior que a oferta"],
        ["Irrigação", "Água para as lavouras"],
        ["Hidrelétrica", "Uso da água para energia"]
      ],
      words: [
        { w: "AGRICULTURA", hint: "Atividade que mais consome água doce (~70%)." },
        { w: "IRRIGAÇÃO", hint: "Técnica de levar água às plantações." },
        { w: "ESTRESSE HÍDRICO", hint: "Quando a demanda por água supera a disponível." },
        { w: "INDÚSTRIA", hint: "Setor que usa cerca de 20% da água doce." }
      ]
    }
  },
  {
    id: "3.4", module: 3, title: "Impactos humanos na água", refs: "Questão 5.c",
    concepts: ["Mata ciliar", "Assoreamento", "Poluição", "Agrotóxicos", "Uso excessivo", "Desperdício"],
    theory: `
      <p>Algumas atividades humanas pioram a quantidade e a qualidade da água doce:</p>
      <ul class="steps">
        <li><strong>🪓 Desmatamento das matas ciliares</strong> (vegetação das margens dos rios): o solo fica exposto, a chuva leva terra para o rio e ele fica raso — é o <strong>assoreamento</strong>.</li>
        <li><strong>🏭 Poluição</strong> por resíduos industriais, esgoto e <strong>produtos tóxicos da agricultura</strong> (agrotóxicos e fertilizantes), que podem chegar aos aquíferos.</li>
        <li><strong>⛽ Uso exagerado e descontrolado das águas subterrâneas</strong> (poços sem controle).</li>
        <li><strong>🚰 Desperdício</strong> de água, inclusive por vazamentos.</li>
      </ul>
      <p class="tip">🌱 <strong>Soluções:</strong> reflorestar as margens, tratar o esgoto, usar menos agrotóxicos e economizar água.</p>`,
    scenes: [
      { art: "🚜🌳➡️🪵  🌧️ ➡️ 🟤🏞️", anim: "flow", caption: "Sem a mata ciliar, a chuva arrasta terra para o rio, que fica raso e barrento: assoreamento." },
      { art: "🚁☠️🌾 ➡️ 🌧️ ➡️ 💧⬇️", anim: "rain", caption: "Agrotóxicos pulverizados na lavoura são levados pela chuva até o lençol freático." },
      { art: "🌱🌳🌳 + 🏭♻️💧", anim: "pop", caption: "Soluções: recuperar a mata ciliar e tratar o esgoto." }
    ],
    exercises: [
      { type: "open", q: "5.c", prompt: "Cite dois problemas provocados pelas atividades humanas que podem agravar a disponibilidade de água doce.",
        keywords: [["desmat", "mata ciliar", "margens"], ["polui", "residuo", "esgoto", "toxic", "agrotox", "lixo", "contamin"], ["subterrane", "poco", "uso exagerado", "descontrol"], ["desperdic", "vazamento"]],
        minHits: 2,
        answer: "Exemplos:\n• Desmatamento das matas às margens dos rios.\n• Poluição da água por resíduos industriais e produtos tóxicos utilizados na agricultura.\n• Uso exagerado e descontrolado das águas subterrâneas.\n• Desperdício de água." }
    ],
    games: {
      quiz: [
        { q: "A vegetação das margens dos rios se chama:", options: ["Mata ciliar", "Mata atlântica", "Cerrado", "Caatinga"], answer: 0 },
        { q: "Quando o rio fica raso porque recebe muita terra, ocorre:", options: ["Assoreamento", "Evaporação", "Precipitação", "Maré alta"], answer: 0 },
        { q: "Qual atitude ajuda a preservar a água?", options: ["Tratar o esgoto", "Desmatar as margens", "Usar mais agrotóxicos", "Abrir poços sem controle"], answer: 0 },
        { q: "Agrotóxicos podem contaminar:", options: ["O solo, os rios e os aquíferos", "Apenas o ar", "Somente o mar", "Nada"], answer: 0 }
      ],
      pairs: [
        ["Mata ciliar", "Vegetação das margens"],
        ["Assoreamento", "Rio raso por excesso de terra"],
        ["Agrotóxicos", "Contaminam solo e aquíferos"],
        ["Desperdício", "Uso de água sem necessidade"],
        ["Esgoto tratado", "Solução contra a poluição"],
        ["Poço sem controle", "Uso exagerado da água subterrânea"]
      ],
      words: [
        { w: "ASSOREAMENTO", hint: "Rio fica raso pelo acúmulo de terra." },
        { w: "MATA CILIAR", hint: "Vegetação que protege as margens dos rios." },
        { w: "POLUIÇÃO", hint: "Contaminação por resíduos industriais e esgoto." },
        { w: "DESPERDÍCIO", hint: "Gastar água sem necessidade." }
      ]
    }
  },

  /* ======================= MÓDULO 4 ======================= */
  {
    id: "4.1", module: 4, title: "Como funciona uma usina hidrelétrica", refs: "Questão 7 (a e b)",
    concepts: ["Rio de planalto", "Barragem", "Reservatório", "Turbina", "Gerador", "Energia elétrica"],
    theory: `
      <p><strong>Por que rios de planalto?</strong> Porque têm <strong>declives e quedas</strong> ao longo do curso, deixando a água <strong>mais veloz</strong> — e água rápida e forte move as turbinas.</p>
      <ol class="steps">
        <li><strong>🧱 Barragem</strong> — represa o rio e forma um grande <strong>lago artificial</strong> (reservatório).</li>
        <li><strong>⬇️ Tubulações</strong> — a água desce com muita força.</li>
        <li><strong>⚙️ Turbinas</strong> — a força da água faz as pás girarem.</li>
        <li><strong>🔌 Gerador</strong> — transforma o giro em <strong>energia elétrica</strong>.</li>
        <li><strong>🏙️ Linhas de transmissão</strong> — levam a energia às cidades.</li>
      </ol>
      <p class="tip">💡 Barragem → Reservatório → Tubulação → Turbina → Gerador → Energia!</p>`,
    scenes: [
      { svg: "dam", caption: "A barragem segura a água. A comporta abre, a água desce pelo tubo e gira a turbina; o gerador produz eletricidade." },
      { art: "⚡ ➡️ 🗼🗼 ➡️ 🌃", anim: "flow", caption: "Fios de alta tensão levam a energia até a cidade à noite." }
    ],
    exercises: [
      { type: "open", q: "7.a", prompt: "Por que os rios de planalto apresentam condições favoráveis à geração de energia hidrelétrica?",
        keywords: [["declive", "queda", "desnivel", "cachoeira"], ["veloz", "rapid", "velocidade", "forca", "forte"]],
        answer: "Porque os rios de planalto apresentam declives e quedas ao longo de seu curso, fazendo com que suas águas sejam mais velozes, o que favorece a geração de energia hidrelétrica." },
      { type: "open", q: "7.b", prompt: "Explique como a força da água é utilizada para gerar energia elétrica em uma usina hidrelétrica.",
        keywords: [["represa", "barragem", "barragens"], ["lago", "reservatorio"], ["turbina"], ["gerador", "energia eletrica", "eletricidade"]],
        answer: "A água fica represada em grandes lagos artificiais, formados pelas barragens. Sua força é direcionada para movimentar as turbinas da usina, permitindo a geração de energia elétrica." },
      { type: "order", q: "Desafio extra", prompt: "Monte o caminho da água dentro da usina (toque na ordem certa).",
        items: ["Barragem forma o reservatório", "Água desce pela tubulação", "Turbina gira", "Gerador produz eletricidade", "Linhas levam energia à cidade"],
        explain: "A energia da água em queda vira movimento (turbina) e o movimento vira eletricidade (gerador)." }
    ],
    games: {
      quiz: [
        { q: "Qual estrutura represa o rio e forma o lago artificial?", options: ["Barragem", "Eclusa", "Turbina", "Porto"], answer: 0 },
        { q: "O que a força da água movimenta na usina?", options: ["As turbinas", "Os barcos", "As eclusas", "As nuvens"], answer: 0 },
        { q: "Quem transforma o giro da turbina em energia elétrica?", options: ["O gerador", "O reservatório", "A comporta", "A barragem"], answer: 0 },
        { q: "Rios de planalto favorecem hidrelétricas porque:", options: ["Têm declives e águas velozes", "São calmos e planos", "São salgados", "Não têm água"], answer: 0 }
      ],
      pairs: [
        ["Barragem", "Represa o rio"],
        ["Reservatório", "Lago artificial"],
        ["Turbina", "Gira com a força da água"],
        ["Gerador", "Produz energia elétrica"],
        ["Planalto", "Declives e águas velozes"],
        ["Transmissão", "Leva energia às cidades"]
      ],
      words: [
        { w: "TURBINA", hint: "Peça que gira com a força da água na usina." },
        { w: "BARRAGEM", hint: "Estrutura que represa o rio." },
        { w: "GERADOR", hint: "Transforma o movimento em energia elétrica." },
        { w: "RESERVATÓRIO", hint: "Lago artificial formado pela barragem." }
      ]
    }
  },
  {
    id: "4.2", module: 4, title: "Impactos das grandes barragens", refs: "Questão 8",
    concepts: ["Alagamento", "Perda de biodiversidade", "Deslocamento de populações", "Ribeirinhos", "Metano"],
    theory: `
      <p>A água é uma fonte <strong>renovável</strong>, mas as grandes barragens causam <strong>impactos</strong>:</p>
      <div class="cards2">
        <div class="mini-card c-green"><span class="big">🌳🐾</span><h4>Ambientais</h4><p><strong>Retirada e alagamento da vegetação</strong>, <strong>desaparecimento de espécies</strong> da fauna e da flora, bloqueio da migração dos peixes (piracema) e liberação de gás metano pela vegetação que apodrece no lago.</p></div>
        <div class="mini-card c-red"><span class="big">🏠🛶</span><h4>Sociais</h4><p><strong>Deslocamento de populações locais</strong> — ribeirinhos, indígenas e quilombolas perdem suas terras e seu modo de vida.</p></div>
      </div>
      <p class="tip">💡 Na Questão 8, a alternativa correta é a única que fala de <strong>perdas</strong>. As outras falam em "aumento", "preservação" e "recuperação" — o contrário do que acontece.</p>`,
    scenes: [
      { art: "🏡🌳🏞️  |  🧱🌊", anim: "pop", caption: "Antes e depois: de um lado, a aldeia ribeirinha com floresta; do outro, a barragem." },
      { art: "🌊⬆️🌳🏠  🦌💨 🛶", anim: "rise", caption: "A água sobe e cobre árvores e casas. Animais fogem e moradores saem de barco." },
      { art: "🫧🫧 CH₄ ⬆️", anim: "rise", caption: "A vegetação apodrece no fundo do lago e libera bolhas de gás metano." }
    ],
    exercises: [
      { type: "mc", q: "8", prompt: "Assinale a alternativa que apresenta alguns dos impactos ambientais e sociais das usinas hidrelétricas.",
        options: [
          "Aumento da vegetação nativa e preservação de todas as espécies que vivem na região.",
          "Retirada da vegetação, desaparecimento de espécies da fauna e da flora e deslocamento de populações locais.",
          "Recuperação dos ambientes naturais e redução das áreas alagadas pela construção de barragens.",
          "Preservação das comunidades ribeirinhas e recuperação da vegetação nas áreas inundadas."
        ],
        letters: true, answer: 1,
        explain: "Alternativa B. As barragens alagam áreas, destroem habitats e obrigam populações a sair de suas terras." }
    ],
    games: {
      quiz: [
        { q: "Um impacto SOCIAL das grandes barragens é:", options: ["Deslocamento de populações locais", "Aumento da vegetação", "Mais peixes migrando", "Recuperação das florestas"], answer: 0 },
        { q: "Um impacto AMBIENTAL das barragens é:", options: ["Desaparecimento de espécies da fauna e flora", "Criação de florestas", "Redução das áreas alagadas", "Mais neve"], answer: 0 },
        { q: "A vegetação que apodrece no fundo do lago libera:", options: ["Gás metano", "Oxigênio puro", "Sal", "Areia"], answer: 0 },
        { q: "Quem costuma ser deslocado pela construção de barragens?", options: ["Ribeirinhos, indígenas e quilombolas", "Moradores de grandes capitais", "Ninguém", "Turistas"], answer: 0 }
      ],
      pairs: [
        ["Alagamento", "Água cobre florestas e casas"],
        ["Ribeirinhos", "Moram às margens dos rios"],
        ["Metano", "Gás da vegetação apodrecida"],
        ["Piracema", "Migração dos peixes"],
        ["Fonte renovável", "Água"],
        ["Deslocamento", "Populações perdem suas terras"]
      ],
      words: [
        { w: "RIBEIRINHOS", hint: "Pessoas que vivem às margens dos rios." },
        { w: "METANO", hint: "Gás liberado pela vegetação que apodrece no lago." },
        { w: "ALAGAMENTO", hint: "Quando a água cobre uma área de terra." },
        { w: "BIODIVERSIDADE", hint: "Variedade de seres vivos que se perde com as barragens." }
      ]
    }
  },
  {
    id: "4.3", module: 4, title: "Transporte fluvial, eclusas e portos", refs: "Questão 9 (a e b)",
    concepts: ["Rio de planície", "Hidrovia", "Eclusa", "Porto fluvial", "Menos combustível"],
    theory: `
      <p>Os <strong>rios de planície</strong> têm <strong>águas calmas</strong> e poucos desníveis, por isso são os melhores para a <strong>navegação</strong>.</p>
      <p><strong>Vantagens do transporte fluvial</strong> em relação ao rodoviário e ao ferroviário: <strong>consome menos combustível</strong>, transporta <strong>grandes volumes de carga</strong> e <strong>emite menos dióxido de carbono (CO₂)</strong>.</p>
      <div class="cards2">
        <div class="mini-card c-blue"><span class="big">🛗🚢</span><h4>Eclusas</h4><p>Funcionam como <strong>"elevadores de barcos"</strong>: permitem a passagem de embarcações por <strong>desníveis</strong> nos rios (barragens, cachoeiras).</p></div>
        <div class="mini-card c-green"><span class="big">🏗️🚛🚆</span><h4>Portos fluviais</h4><p>Permitem a <strong>transferência de mercadorias</strong> entre diferentes meios de transporte (barco, caminhão, trem).</p></div>
      </div>`,
    scenes: [
      { svg: "lock", caption: "Eclusa: o barco entra na câmara, as portas fecham, a câmara enche, o barco sobe e segue viagem." },
      { art: "🚆🌽 ➡️ 🏗️ ➡️ 🚢", anim: "flow", caption: "No porto, guindastes passam a soja do trem para a barcaça." }
    ],
    exercises: [
      { type: "open", q: "9.a", prompt: "Por que os rios de planície são mais adequados à navegação? Cite uma vantagem do transporte fluvial em relação ao rodoviário e ao ferroviário.",
        keywords: [["calm", "lent", "tranquil", "plan"], ["combustivel", "volume", "carga", "co2", "dioxido", "carbono", "polui", "barato", "custo"]],
        answer: "Porque os rios de planície possuem águas mais calmas, favorecendo a navegação. Uma vantagem do transporte fluvial é consumir menos combustível, transportar grandes volumes de cargas ou emitir menos dióxido de carbono em comparação ao transporte rodoviário e ferroviário." },
      { type: "mc", q: "9.b", prompt: "Assinale a alternativa que explica corretamente a função das eclusas e dos portos fluviais.",
        options: [
          "As eclusas armazenam mercadorias, enquanto os portos fluviais controlam a velocidade das águas.",
          "As eclusas impedem a passagem de embarcações em rios de planície, enquanto os portos fluviais são utilizados para produzir energia elétrica.",
          "As eclusas permitem a passagem de embarcações por desníveis nos cursos de água, enquanto os portos fluviais permitem a transferência de mercadorias entre diferentes meios de transporte.",
          "As eclusas retiram a vegetação das margens dos rios, enquanto os portos fluviais controlam o volume de água dos reservatórios."
        ],
        answer: 2,
        explain: "Eclusa = elevador de barcos para vencer desníveis. Porto = troca de mercadorias entre barco, caminhão e trem." }
    ],
    games: {
      quiz: [
        { q: "As eclusas servem para:", options: ["Permitir que barcos passem por desníveis", "Gerar energia", "Armazenar mercadorias", "Retirar vegetação"], answer: 0 },
        { q: "Os portos fluviais permitem:", options: ["Transferir mercadorias entre meios de transporte", "Produzir energia", "Controlar marés", "Formar deltas"], answer: 0 },
        { q: "Uma vantagem do transporte fluvial é:", options: ["Consumir menos combustível", "Ser o mais rápido de todos", "Funcionar em qualquer rio de planalto", "Não precisar de barcos"], answer: 0 },
        { q: "Os rios mais adequados à navegação são os de:", options: ["Planície", "Planalto", "Montanha", "Cachoeira"], answer: 0 }
      ],
      pairs: [
        ["Eclusa", "Elevador de barcos"],
        ["Porto fluvial", "Troca de cargas entre transportes"],
        ["Hidrovia", "Caminho de navegação no rio"],
        ["Rio de planície", "Bom para navegar"],
        ["Vantagem", "Menos combustível e CO₂"],
        ["Barcaça", "Leva grandes volumes de carga"]
      ],
      words: [
        { w: "ECLUSA", hint: "Funciona como um elevador de barcos." },
        { w: "HIDROVIA", hint: "Rota de navegação em rios." },
        { w: "PORTO", hint: "Local de transferência de mercadorias entre transportes." },
        { w: "BARCAÇA", hint: "Embarcação que leva grandes cargas nos rios." }
      ]
    }
  },
  {
    id: "4.4", module: 4, title: "Energia hidrelétrica no Brasil", refs: "Questão 10 (a e b)",
    concepts: ["Sudeste e Sul", "Itaipu", "Potencial da Amazônia", "Rios volumosos", "SIN"],
    theory: `
      <div class="cards2">
        <div class="mini-card c-red"><span class="big">🏭⚡</span><h4>Maior produção: Sudeste e Sul</h4><p>Concentram as usinas que <strong>mais produzem</strong> hoje (ex.: Itaipu, Furnas), perto dos grandes centros urbanos e industriais.</p></div>
        <div class="mini-card c-green"><span class="big">🌳🏞️</span><h4>Maior potencial: Amazônia</h4><p>Tem <strong>grande quantidade de rios volumosos</strong>, por isso tem o <strong>maior potencial natural</strong>. Mas há desafios ambientais e a distância dos consumidores.</p></div>
      </div>
      <p>O <strong>Sistema Interligado Nacional (SIN)</strong> conecta as usinas por linhas de transmissão, levando, por exemplo, a energia de Belo Monte e Tucuruí até o Sudeste.</p>
      <p class="tip">💡 <strong>Produção</strong> = o que já existe (Sudeste e Sul). <strong>Potencial</strong> = o que a natureza oferece (Norte/Amazônia).</p>`,
    scenes: [
      { art: "🗺️ 🔴 Sudeste + Sul", anim: "zoom", caption: "Sudeste e Sul brilham em vermelho: maior produção instalada (Itaipu, Furnas)." },
      { art: "🗺️ 🟢 Amazônia 🏞️🏞️🏞️", anim: "pop", caption: "O Norte brilha em verde: rios volumosos e o maior potencial natural." },
      { art: "⚡ Belo Monte ➡️🗼🗼🗼➡️ 🏙️ São Paulo", anim: "flow", caption: "Linhas do SIN levam a energia da Amazônia até as indústrias do Sudeste." }
    ],
    exercises: [
      { type: "short", q: "10.a", prompt: "Quais regiões brasileiras apresentam maior produção de energia por meio de usinas hidrelétricas?",
        accept: [["sudeste"], ["sul"]],
        answer: "Sudeste e Sul." },
      { type: "open", q: "10.b", prompt: "Por que a região amazônica se destaca quanto ao potencial natural para a geração de energia hidrelétrica?",
        keywords: [["rio", "rios"], ["volumos", "caudalos", "muita agua", "grande quantidade", "grandes"]],
        answer: "Porque a região amazônica possui grande quantidade de rios volumosos, o que garante elevado potencial natural para a produção de energia hidrelétrica." }
    ],
    games: {
      quiz: [
        { q: "Quais regiões têm a maior produção hidrelétrica do Brasil?", options: ["Sudeste e Sul", "Norte e Nordeste", "Centro-Oeste", "Só o Nordeste"], answer: 0 },
        { q: "Por que a Amazônia tem grande potencial hidrelétrico?", options: ["Tem muitos rios volumosos", "Tem muitas geleiras", "Tem poucos rios", "É uma região desértica"], answer: 0 },
        { q: "Itaipu é uma usina que fica na:", options: ["Região Sul (fronteira com o Paraguai)", "Região Norte", "Região Nordeste", "Ilha do Bananal"], answer: 0 },
        { q: "O SIN serve para:", options: ["Interligar usinas e levar energia pelo país", "Medir as marés", "Construir eclusas", "Proteger aquíferos"], answer: 0 }
      ],
      pairs: [
        ["Sudeste e Sul", "Maior produção instalada"],
        ["Amazônia", "Maior potencial natural"],
        ["Itaipu", "Usina na fronteira com o Paraguai"],
        ["Belo Monte", "Usina no Rio Xingu (PA)"],
        ["SIN", "Sistema Interligado Nacional"],
        ["Rios volumosos", "Garantem potencial hidrelétrico"]
      ],
      words: [
        { w: "SUDESTE", hint: "Região (junto com o Sul) de maior produção hidrelétrica." },
        { w: "AMAZÔNIA", hint: "Região com o maior potencial natural de energia hidrelétrica." },
        { w: "ITAIPU", hint: "Grande usina binacional do Rio Paraná." },
        { w: "POTENCIAL", hint: "Capacidade natural ainda não aproveitada." }
      ]
    }
  },

  /* ======================= MÓDULO 5 ======================= */
  {
    id: "5.1", module: 5, title: "Regiões hidrográficas e o CNRH", refs: "Questão 12 (a e b)",
    concepts: ["CNRH", "ANA", "12 regiões hidrográficas", "Gestão da água"],
    theory: `
      <p>O <strong>Conselho Nacional de Recursos Hídricos (CNRH)</strong> é o órgão responsável pela <strong>gestão e pelo planejamento</strong> dos recursos hídricos no Brasil, trabalhando junto com a ANA (Agência Nacional de Águas e Saneamento Básico).</p>
      <p>Para organizar essa gestão, o Brasil foi dividido em <strong>12 regiões hidrográficas</strong>:</p>
      <div class="chips-list">
        <span>Amazônica</span><span>Tocantins-Araguaia</span><span>São Francisco</span><span>Paraná</span><span>Paraguai</span><span>Uruguai</span><span>Parnaíba</span><span>Atlântico Nordeste Ocidental</span><span>Atlântico Nordeste Oriental</span><span>Atlântico Leste</span><span>Atlântico Sudeste</span><span>Atlântico Sul</span>
      </div>`,
    scenes: [
      { art: "🗺️ 🧩×12", anim: "pop", caption: "O mapa do Brasil se divide como um quebra-cabeça de 12 peças: as regiões hidrográficas." },
      { art: "🏛️ CNRH 💧", anim: "zoom", caption: "O CNRH planeja e organiza o uso sustentável da água no país." }
    ],
    exercises: [
      { type: "short", q: "12.a", prompt: "Qual órgão é responsável pela gestão e pelo planejamento dos recursos hídricos no Brasil?",
        accept: [["cnrh", "conselho nacional de recursos hidricos"]],
        answer: "O Conselho Nacional de Recursos Hídricos (CNRH)." },
      { type: "short", q: "12.b", prompt: "Em quantas regiões hidrográficas o país foi dividido?",
        accept: [["12", "doze"]],
        answer: "O Brasil foi dividido em 12 regiões hidrográficas." }
    ],
    games: {
      quiz: [
        { q: "Qual órgão faz a gestão dos recursos hídricos no Brasil?", options: ["CNRH", "IBGE", "INPE", "SUS"], answer: 0 },
        { q: "Em quantas regiões hidrográficas o Brasil é dividido?", options: ["12", "5", "8", "27"], answer: 0 },
        { q: "Qual destas é uma região hidrográfica brasileira?", options: ["Tocantins-Araguaia", "Mediterrâneo", "Pacífico Norte", "Andes"], answer: 0 },
        { q: "O que significa a sigla CNRH?", options: ["Conselho Nacional de Recursos Hídricos", "Centro Nacional de Rios e Hidrovias", "Comissão de Navegação e Rios Hídricos", "Conselho de Hidrelétricas"], answer: 0 }
      ],
      pairs: [
        ["CNRH", "Conselho Nacional de Recursos Hídricos"],
        ["12", "Número de regiões hidrográficas"],
        ["ANA", "Agência Nacional de Águas"],
        ["Amazônica", "Uma das 12 regiões"],
        ["Atlântico Sul", "Outra das 12 regiões"],
        ["Gestão", "Planejar o uso da água"]
      ],
      words: [
        { w: "CONSELHO", hint: "Primeira palavra do nome do CNRH." },
        { w: "DOZE", hint: "Número de regiões hidrográficas do Brasil (por extenso)." },
        { w: "RECURSOS HÍDRICOS", hint: "As águas disponíveis para uso, geridas pelo CNRH." },
        { w: "GESTÃO", hint: "Planejar e organizar o uso da água." }
      ]
    }
  },
  {
    id: "5.2", module: 5, title: "Bacias Amazônica e Tocantins-Araguaia", refs: "Questão 12.c",
    concepts: ["Maior bacia do mundo", "Bacia internacional", "Tocantins-Araguaia", "Usina de Tucuruí", "Ilha do Bananal"],
    theory: `
      <div class="cards2">
        <div class="mini-card c-green"><span class="big">🌳🌎</span><h4>Bacia Amazônica</h4><p>É a <strong>maior bacia hidrográfica do mundo</strong>. É <strong>internacional</strong>: abrange terras brasileiras e de outros países da América do Sul (como Peru, Bolívia, Colômbia, Equador e Venezuela).</p></div>
        <div class="mini-card c-blue"><span class="big">⚡🏝️</span><h4>Bacia Tocantins-Araguaia</h4><p>É a maior bacia <strong>totalmente brasileira</strong>. Destaca-se pela <strong>Usina Hidrelétrica de Tucuruí</strong> (PA) e pela Ilha do Bananal, a maior ilha fluvial do mundo.</p></div>
      </div>
      <p class="warn">⚠️ <strong>Pegadinhas da 12.c:</strong> a Amazônica NÃO está só no Brasil; o rio principal dela é o <strong>Amazonas</strong> (não o Tocantins); e nenhuma das duas fica só no Nordeste.</p>`,
    scenes: [
      { art: "🗺️🌳 ➡️ 🇵🇪🇧🇴🇨🇴🇪🇨🇻🇪", anim: "zoom", caption: "A sombra da Bacia Amazônica ultrapassa as fronteiras do Brasil até os Andes." },
      { art: "〰️ Tocantins + 〰️ Araguaia ➡️ ⚡ Tucuruí", anim: "flow", caption: "Os rios Tocantins e Araguaia correm pelo centro-norte do Brasil até a Usina de Tucuruí." }
    ],
    exercises: [
      { type: "mc", q: "12.c", prompt: "Assinale a alternativa correta sobre as bacias Amazônica e Tocantins-Araguaia.",
        options: [
          "A Bacia Amazônica está totalmente localizada no Brasil, enquanto a Bacia Tocantins-Araguaia abrange cinco países sul-americanos.",
          "A Bacia Amazônica tem como principal rio o Tocantins, enquanto a Bacia Tocantins-Araguaia tem como principal rio o Amazonas.",
          "As duas bacias estão localizadas exclusivamente na região Nordeste e são utilizadas principalmente para a navegação marítima.",
          "A Bacia Amazônica é a maior bacia hidrográfica do mundo e abrange terras brasileiras e de outros cinco países. A Bacia Tocantins-Araguaia destaca-se pela presença da usina hidrelétrica de Tucuruí."
        ],
        answer: 3,
        explain: "A Amazônica é a maior do mundo e internacional; a Tocantins-Araguaia se destaca pela Usina de Tucuruí." }
    ],
    games: {
      quiz: [
        { q: "Qual é a maior bacia hidrográfica do mundo?", options: ["Amazônica", "Tocantins-Araguaia", "São Francisco", "Platina"], answer: 0 },
        { q: "A Bacia Tocantins-Araguaia destaca-se pela usina de:", options: ["Tucuruí", "Itaipu", "Xingó", "Furnas"], answer: 0 },
        { q: "A Bacia Amazônica é:", options: ["Internacional (Brasil e outros países)", "Só do Nordeste", "Só do Brasil", "Uma bacia marítima"], answer: 0 },
        { q: "A maior ilha fluvial do mundo, na bacia Tocantins-Araguaia, é a:", options: ["Ilha do Bananal", "Ilha de Marajó", "Ilha Grande", "Fernando de Noronha"], answer: 0 }
      ],
      pairs: [
        ["Bacia Amazônica", "Maior bacia do mundo"],
        ["Tocantins-Araguaia", "Maior bacia 100% brasileira"],
        ["Tucuruí", "Usina no Pará"],
        ["Ilha do Bananal", "Maior ilha fluvial"],
        ["Rio Amazonas", "Rio principal da Bacia Amazônica"],
        ["Internacional", "Abrange vários países"]
      ],
      words: [
        { w: "TUCURUÍ", hint: "Usina hidrelétrica da bacia Tocantins-Araguaia." },
        { w: "TOCANTINS", hint: "Rio que dá nome, com o Araguaia, a uma grande bacia." },
        { w: "BANANAL", hint: "Ilha do …, a maior ilha fluvial do mundo." },
        { w: "AMAZÔNICA", hint: "A maior bacia hidrográfica do mundo." }
      ]
    }
  },
  {
    id: "5.3", module: 5, title: "Rio São Francisco e o Semiárido", refs: "Questão 13.a",
    concepts: ["Velho Chico", "Rio perene", "Semiárido", "Irrigação", "Juazeiro-Petrolina"],
    theory: `
      <p>O <strong>Rio São Francisco</strong> ("Velho Chico") nasce na <strong>Serra da Canastra (MG)</strong> e deságua no Atlântico, entre Sergipe e Alagoas. É chamado de <strong>rio da integração nacional</strong> porque liga o Sudeste ao Nordeste.</p>
      <p>Ele é um <strong>rio perene</strong> (não seca) que atravessa o <strong>Semiárido</strong>. Por isso:</p>
      <ul class="steps">
        <li>💧 <strong>Garante água para a população</strong>, inclusive nos períodos de seca.</li>
        <li>🌾 Permite a <strong>agricultura e a pecuária</strong> — com destaque para a <strong>fruticultura irrigada</strong> de Juazeiro (BA) e Petrolina (PE), que exporta uva e manga.</li>
        <li>⚡ Gera energia (usinas de Sobradinho, Paulo Afonso e Xingó) e permite a navegação.</li>
      </ul>`,
    scenes: [
      { art: "⛰️ MG ➡️ 〰️〰️ 🌵🌵 ➡️ 🌊", anim: "flow", caption: "O rio sai de Minas Gerais e atravessa a caatinga seca sem secar." },
      { art: "🏞️ ➡️ 🚿 ➡️ 🍇🥭🍇", anim: "pop", caption: "Canais de irrigação levam água a parreiras de uva no meio do semiárido." }
    ],
    exercises: [
      { type: "open", q: "13.a", prompt: "Explique a importância do rio São Francisco para a população e as atividades econômicas das regiões que ele atravessa.",
        keywords: [["abasteci", "agua para", "populacao", "beber", "consumo"], ["agricultura", "irrigac", "fruticultura", "plantac", "lavoura"], ["pecuaria", "gado", "criacao"], ["seca", "semiarido", "perene"]],
        answer: "O rio São Francisco garante o abastecimento de água para a população e para as atividades de agricultura e pecuária, inclusive durante os períodos de seca." }
    ],
    games: {
      quiz: [
        { q: "Por que o São Francisco é tão importante para o Semiárido?", options: ["É perene e fornece água mesmo na seca", "Só tem água no verão", "É um rio salgado", "Não atravessa o Nordeste"], answer: 0 },
        { q: "Onde nasce o Rio São Francisco?", options: ["Serra da Canastra (MG)", "Cordilheira dos Andes", "Amazônia", "Pantanal"], answer: 0 },
        { q: "O polo de fruticultura irrigada do São Francisco fica em:", options: ["Juazeiro e Petrolina", "Manaus e Belém", "Porto Alegre", "Cuiabá"], answer: 0 },
        { q: "Um rio perene é aquele que:", options: ["Nunca seca", "Seca todo ano", "Só aparece na chuva", "Corre debaixo da terra"], answer: 0 }
      ],
      pairs: [
        ["Velho Chico", "Apelido do São Francisco"],
        ["Rio perene", "Nunca seca"],
        ["Semiárido", "Região seca do Nordeste"],
        ["Juazeiro-Petrolina", "Polo de fruticultura irrigada"],
        ["Serra da Canastra", "Nascente do São Francisco"],
        ["Integração nacional", "Liga Sudeste e Nordeste"]
      ],
      words: [
        { w: "PERENE", hint: "Tipo de rio que nunca seca." },
        { w: "SEMIÁRIDO", hint: "Região seca atravessada pelo São Francisco." },
        { w: "PETROLINA", hint: "Cidade de PE famosa pela fruticultura irrigada." },
        { w: "SÃO FRANCISCO", hint: "O rio da integração nacional." }
      ]
    }
  },
  {
    id: "5.4", module: 5, title: "Bacia Platina e hidrovias brasileiras", refs: "Questões 13.b e 14 (a a d)",
    concepts: ["Bacia Platina", "Itaipu", "Solimões-Amazonas", "Rio Madeira", "Tietê-Paraná", "Paraguai"],
    theory: `
      <p>A <strong>Bacia Platina</strong> (rios Paraná, Paraguai e Uruguai) favorece a <strong>geração de energia hidrelétrica</strong> (Usina de Itaipu), a <strong>irrigação agrícola</strong> e o <strong>transporte fluvial</strong>.</p>
      <table class="tbl">
        <tr><th>Hidrovia</th><th>Destaque / cargas</th></tr>
        <tr><td>🟦 <strong>Solimões-Amazonas</strong></td><td><strong>Principal</strong> hidrovia do Brasil em volume de mercadorias e distância.</td></tr>
        <tr><td>🟦 <strong>Rio Madeira</strong></td><td><strong>Soja e milho</strong> para exportação: de <strong>Porto Velho (RO) até o rio Amazonas</strong>.</td></tr>
        <tr><td>🟧 <strong>Tietê-Paraná</strong></td><td>Milho, soja, areia e cana-de-açúcar.</td></tr>
        <tr><td>🟧 <strong>Paraguai</strong></td><td>Minério de ferro, manganês e produtos agrícolas.</td></tr>
      </table>
      <p><strong>Por que as hidrovias são tão importantes no Norte?</strong> Porque a região tem uma <strong>extensa rede de grandes rios de planície</strong> e <strong>poucos outros meios de transporte</strong> (estradas e ferrovias são escassas).</p>`,
    scenes: [
      { art: "🗺️ 🔵 Solimões-Amazonas · Madeira  🟠 Tietê-Paraná · Paraguai", anim: "pop", caption: "As hidrovias acendem: azul no Norte, laranja no Centro-Sul, com barcaças de grãos e minérios." },
      { art: "🇧🇷 ⚡ Itaipu ⚡ 🇵🇾", anim: "zoom", caption: "A Usina de Itaipu, na fronteira Brasil-Paraguai, fecha a trilha com muita energia!" }
    ],
    exercises: [
      { type: "open", q: "13.b", prompt: "Cite duas atividades econômicas favorecidas pelas águas da Bacia Platina.",
        keywords: [["irrigac", "agricultura"], ["transporte", "navega", "hidrovia"], ["energia", "hidreletric", "itaipu"]],
        minHits: 2,
        answer: "Irrigação agrícola, transporte fluvial e geração de energia hidrelétrica." },
      { type: "short", q: "14.a", prompt: "Qual é a principal hidrovia brasileira em volume de mercadorias transportadas e distância percorrida?",
        accept: [["solimoes"], ["amazonas"]],
        answer: "Solimões-Amazonas." },
      { type: "short", q: "14.b", prompt: "Qual hidrovia se destaca pelo transporte de soja e milho destinados à exportação, tendo como principal trajeto o percurso de Porto Velho (RO) até o rio Amazonas?",
        accept: [["madeira"]],
        answer: "Rio Madeira." },
      { type: "open", q: "14.c", prompt: "Por que o transporte hidroviário é tão importante para a Região Norte do Brasil?",
        keywords: [["rede", "rios", "extensa"], ["planicie", "grandes rios"], ["escassez", "poucos", "falta", "pouca", "estrada", "rodovia"]],
        answer: "Porque a Região Norte possui uma extensa rede hidrográfica, com grandes rios de planície, além de apresentar escassez de outros meios de transporte. Por isso, o transporte hidroviário é importante para o deslocamento de pessoas e mercadorias." },
      { type: "match", q: "14.d", prompt: "Cite duas outras hidrovias e um produto de cada: ligue cada hidrovia a um produto que ela transporta.",
        pairs: [["Hidrovia do Paraguai", "Minério de ferro e manganês"], ["Hidrovia Tietê-Paraná", "Cana-de-açúcar e areia"]],
        extra: ["Petróleo do pré-sal", "Peixes ornamentais"],
        answer: "Exemplos:\n• Paraguai: minério de ferro, manganês e produtos agrícolas.\n• Tietê-Paraná: milho, soja, areia e cana-de-açúcar." }
    ],
    games: {
      quiz: [
        { q: "Principal hidrovia do Brasil em volume e distância:", options: ["Solimões-Amazonas", "Tietê-Paraná", "Paraguai", "São Francisco"], answer: 0 },
        { q: "A hidrovia de Porto Velho (RO) até o Amazonas, com soja e milho, é a do:", options: ["Rio Madeira", "Rio Tietê", "Rio Paraguai", "Rio Uruguai"], answer: 0 },
        { q: "A hidrovia do Paraguai transporta principalmente:", options: ["Minério de ferro e manganês", "Petróleo", "Peixes", "Carros"], answer: 0 },
        { q: "Uma atividade favorecida pela Bacia Platina é:", options: ["Geração de energia (Itaipu)", "Mineração de gelo", "Pesca de baleias", "Turismo em geleiras"], answer: 0 },
        { q: "No Norte, as hidrovias são essenciais porque:", options: ["Há grandes rios de planície e poucas estradas", "Não há rios", "Os rios são de planalto", "Há muitas ferrovias"], answer: 0 }
      ],
      pairs: [
        ["Solimões-Amazonas", "Principal hidrovia do país"],
        ["Rio Madeira", "Soja e milho de Porto Velho"],
        ["Tietê-Paraná", "Cana, areia, soja e milho"],
        ["Paraguai", "Minério de ferro e manganês"],
        ["Itaipu", "Energia da Bacia Platina"],
        ["Bacia Platina", "Paraná, Paraguai e Uruguai"]
      ],
      words: [
        { w: "MADEIRA", hint: "Hidrovia que leva soja de Porto Velho até o Amazonas." },
        { w: "SOLIMÕES", hint: "Forma, com o Amazonas, a principal hidrovia do Brasil." },
        { w: "PLATINA", hint: "Bacia formada pelos rios Paraná, Paraguai e Uruguai." },
        { w: "MANGANÊS", hint: "Minério transportado pela hidrovia do Paraguai." }
      ]
    }
  }
];

/* Lista de questões da revisão na ordem do PDF → tópicos */
window.QUESTION_MAP = [
  { n: 1, title: "Hidrosfera: mares, movimentos e regimes", parts: [["1.a", "1.1"], ["1.b", "1.2"], ["1.c", "2.2"]] },
  { n: 2, title: "Partes de um rio, foz e tipos de rios", parts: [["Imagem", "2.3"], ["2.a", "2.3"], ["2.b", "2.4"], ["2.c", "2.5"]] },
  { n: 3, title: "Verdadeiro ou falso (7 afirmativas)", parts: [["Itens 1–3", "1.3"], ["Itens 4–5", "3.1"], ["Item 6", "3.2"], ["Item 7", "2.1"]] },
  { n: 4, title: "Usos e distribuição da água", parts: [["4.a", "3.3"], ["4.b", "3.3"], ["4.c", "3.2"]] },
  { n: 5, title: "Água doce: continente, consumo e problemas", parts: [["5.a", "3.2"], ["5.b", "3.3"], ["5.c", "3.4"]] },
  { n: 6, title: "Características dos oceanos (V ou F)", parts: [["6", "1.3"]] },
  { n: 7, title: "Rios de planalto e usinas", parts: [["7.a", "4.1"], ["7.b", "4.1"]] },
  { n: 8, title: "Impactos das hidrelétricas", parts: [["8", "4.2"]] },
  { n: 9, title: "Transporte fluvial, eclusas e portos", parts: [["9.a", "4.3"], ["9.b", "4.3"]] },
  { n: 10, title: "Energia hidrelétrica nas regiões", parts: [["10.a", "4.4"], ["10.b", "4.4"]] },
  { n: 11, title: "Bacia hidrográfica", parts: [["Imagem", "2.6"], ["11.b", "2.6"], ["11.c", "2.6"]] },
  { n: 12, title: "CNRH, regiões e bacias", parts: [["12.a", "5.1"], ["12.b", "5.1"], ["12.c", "5.2"]] },
  { n: 13, title: "São Francisco e Bacia Platina", parts: [["13.a", "5.3"], ["13.b", "5.4"]] },
  { n: 14, title: "Hidrovias brasileiras", parts: [["14.a", "5.4"], ["14.b", "5.4"], ["14.c", "5.4"], ["14.d", "5.4"]] }
];
