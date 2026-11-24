import type { Afirmacao, Enigma, FatoDatado } from "../jogos-historia";

// Dados dos jogos de História (Unidade 3). Tudo baseado no conteúdo dos assuntos.

export const fatosHistoria: FatoDatado[] = [
  { ano: -508, rotulo: "Séc. VI a.C.", emoji: "🏺", texto: "Surge a democracia em Atenas" },
  { ano: 1500, emoji: "⛵", texto: "Os portugueses chegam ao território que chamariam de Brasil" },
  { ano: 1695, emoji: "🛖", texto: "Morre Zumbi dos Palmares (20 de novembro)" },
  { ano: 1789, emoji: "🇫🇷", texto: "Começa a Revolução Francesa" },
  { ano: 1798, emoji: "✊", texto: "Conjuração Baiana, em Salvador" },
  { ano: 1808, emoji: "👑", texto: "A família real portuguesa chega ao Brasil" },
  { ano: 1822, emoji: "🇧🇷", texto: "Independência do Brasil" },
  { ano: 1824, emoji: "📜", texto: "Primeira Constituição do Brasil" },
  { ano: 1835, emoji: "✊", texto: "Revolta dos Malês" },
  { ano: 1871, emoji: "👶", texto: "Lei do Ventre Livre" },
  { ano: 1885, emoji: "👴", texto: "Lei do Sexagenário" },
  { ano: 1888, emoji: "🕊️", texto: "Lei Áurea: fim da escravidão" },
  { ano: 1889, emoji: "🏛️", texto: "Proclamação da República" },
  { ano: 1945, emoji: "🕊️", texto: "Fim da Segunda Guerra Mundial" },
  { ano: 1971, emoji: "🇺🇳", texto: "Primeira declaração da ONU sobre pessoas com deficiência" },
  { ano: 1994, emoji: "🏫", texto: "Declaração de Salamanca (inclusão escolar)" },
  { ano: 2006, emoji: "🤝", texto: "Convenção sobre os Direitos da Pessoa com Deficiência" },
];

export const fatosColonia = fatosHistoria.filter((f) => f.ano >= 1500 && f.ano <= 1822);
export const fatosImperio = fatosHistoria.filter((f) => f.ano >= 1822 && f.ano <= 1889);

export const afirmacoesHistoria: Afirmacao[] = [
  { texto: "Democracia significa “poder do povo”.", verdade: true, porque: "Demos = povo; kratos = poder." },
  { texto: "Na ditadura, o povo escolhe livremente quem governa.", verdade: false, porque: "Na ditadura não há eleições livres." },
  { texto: "O Brasil é uma democracia representativa.", verdade: true, porque: "Votamos para escolher representantes." },
  { texto: "No Brasil, votamos para escolher o rei.", verdade: false, porque: "O Brasil é uma república: não tem rei." },
  { texto: "O prefeito governa a cidade.", verdade: true, porque: "No município elegemos prefeito e vereadores." },
  { texto: "O governador governa o país inteiro.", verdade: false, porque: "Quem governa o país é o presidente. O governador cuida do estado." },
  { texto: "No Brasil, é possível votar a partir dos 16 anos.", verdade: true, porque: "O voto é permitido a partir dos 16 anos." },
  { texto: "A democracia surgiu em Atenas, na Grécia Antiga.", verdade: true, porque: "Por volta do século VI a.C." },
  { texto: "Em Atenas, mulheres e estrangeiros eram cidadãos.", verdade: false, porque: "Só homens adultos, filhos de pai e mãe atenienses." },
  { texto: "A Ágora era a praça pública de Atenas.", verdade: true, porque: "Lá aconteciam comércio, assembleias e tribunais." },
  { texto: "A Revolução Francesa começou em 1789.", verdade: true, porque: "Ela derrubou a monarquia absolutista." },
  { texto: "O poder Judiciário é quem faz as leis.", verdade: false, porque: "Quem faz as leis é o Legislativo. O Judiciário julga." },
  { texto: "A Declaração dos Direitos do Homem e do Cidadão deu direito de voto às mulheres.", verdade: false, porque: "As mulheres ficaram de fora dos direitos políticos." },
  { texto: "Um direito inalienável não pode ser retirado de ninguém.", verdade: true, porque: "Inalienável = não pode ser tirado." },
  { texto: "O Brasil foi colônia de Portugal.", verdade: true, porque: "De 1500 até a Independência, em 1822." },
  { texto: "No Brasil Colônia, as pessoas eram cidadãs brasileiras.", verdade: false, porque: "Eram súditas do rei de Portugal." },
  { texto: "A escravidão durou quase 400 anos no Brasil.", verdade: true, porque: "Da época colonial até 1888." },
  { texto: "Palmares foi o quilombo mais famoso.", verdade: true, porque: "Ficava em Alagoas e foi liderado por Zumbi." },
  { texto: "A Conjuração Baiana aconteceu em São Paulo.", verdade: false, porque: "Aconteceu em Salvador, na Bahia." },
  { texto: "O Dia da Consciência Negra é 20 de novembro.", verdade: true, porque: "É a data da morte de Zumbi dos Palmares." },
  { texto: "A família real veio para o Brasil fugindo de Napoleão.", verdade: true, porque: "Em 1808, o exército francês avançava pela Europa." },
  { texto: "D. João VI proclamou a Independência do Brasil.", verdade: false, porque: "Foi D. Pedro I, em 7 de setembro de 1822." },
  { texto: "Pela Constituição de 1824, todas as pessoas podiam votar.", verdade: false, porque: "Só homens livres ou libertos, maiores de 25 anos e com renda." },
  { texto: "A Revolta dos Malês foi a maior revolta de escravizados do Brasil.", verdade: true, porque: "Aconteceu em Salvador, em 1835." },
  { texto: "A Lei do Ventre Livre libertava os maiores de 60 anos.", verdade: false, porque: "Essa era a Lei do Sexagenário. A do Ventre Livre tratava dos recém-nascidos." },
  { texto: "A Lei Áurea, de 1888, acabou com a escravidão no Brasil.", verdade: true, porque: "Mas os libertos não receberam nenhum apoio." },
  { texto: "O Brasil foi o primeiro país da América a abolir a escravidão.", verdade: false, porque: "Foi o último!" },
  { texto: "Depois da Lei Áurea, os libertos ganharam terras e trabalho.", verdade: false, porque: "Não receberam nenhum tipo de apoio." },
  { texto: "Racismo estrutural é um preconceito enraizado na sociedade.", verdade: true, porque: "Ele vem da escravidão e ainda produz efeitos hoje." },
  { texto: "No Egito Antigo, havia pessoas com deficiência em vários cargos.", verdade: true, porque: "E o Papiro de Amenemope ensinava a não zombar delas." },
  { texto: "Na Idade Média, muitos achavam que a deficiência era um castigo divino.", verdade: true, porque: "Era uma ideia errada e cheia de preconceito." },
  { texto: "O termo correto hoje é “portador de deficiência”.", verdade: false, porque: "O termo correto é “pessoa com deficiência”." },
  { texto: "No modelo social, a sociedade deve remover as barreiras.", verdade: true, porque: "São as barreiras que excluem as pessoas." },
  { texto: "No modelo biomédico, a pessoa com deficiência é que precisa se adaptar.", verdade: true, porque: "Por isso os movimentos sociais lutaram por um novo modelo." },
  { texto: "A Declaração de Salamanca defende a inclusão escolar.", verdade: true, porque: "As escolas devem se adaptar aos alunos." },
  { texto: "Capacitismo é o preconceito contra pessoas com deficiência.", verdade: true, porque: "Assim como o racismo, precisa ser combatido." },
  { texto: "Colocar uma rampa na escola é um exemplo de remover uma barreira.", verdade: true, porque: "A rampa permite que todos entrem." },
  { texto: "A Convenção sobre os Direitos da Pessoa com Deficiência é de 1500.", verdade: false, porque: "Ela é de 2006." },
];

export const enigmasHistoria: Enigma[] = [
  { resposta: "Zumbi dos Palmares", emoji: "🛖", pistas: ["Fui um líder da resistência contra a escravidão.", "Liderei o quilombo mais famoso do Brasil, em Alagoas.", "O Dia da Consciência Negra, 20 de novembro, me homenageia."], explicacao: "Zumbi liderou o Quilombo dos Palmares, na Serra da Barriga." },
  { resposta: "D. Pedro I", emoji: "🇧🇷", pistas: ["Sou filho de um rei de Portugal.", "Meu pai voltou para Portugal em 1821, mas eu fiquei no Brasil.", "Em 7 de setembro de 1822, proclamei a Independência e virei imperador."], explicacao: "D. Pedro I foi o primeiro imperador do Brasil." },
  { resposta: "D. João VI", emoji: "👑", pistas: ["Sou rei de Portugal.", "Fugi do exército de Napoleão.", "Cheguei ao Brasil com a família real em 1808."], explicacao: "D. João VI voltou a Portugal em 1821 e deixou o filho, D. Pedro I." },
  { resposta: "Napoleão", emoji: "⚔️", pistas: ["Fui um líder francês.", "Meu exército conquistava países da Europa.", "Por medo de mim, a família real portuguesa fugiu para o Brasil."], explicacao: "Napoleão Bonaparte comandava o exército da França." },
  { resposta: "Ágora", emoji: "🏺", pistas: ["Sou um lugar, não uma pessoa.", "Ficava em Atenas, na Grécia Antiga.", "Sou a praça pública onde os cidadãos faziam comércio e discutiam a vida da cidade."], explicacao: "Na Ágora também aconteciam assembleias e tribunais." },
  { resposta: "Lei Áurea", emoji: "🕊️", pistas: ["Sou uma lei.", "Fui assinada em 1888.", "Acabei com a escravidão no Brasil, mas não dei nenhum apoio aos libertos."], explicacao: "Com ela, o Brasil foi o último país da América a abolir a escravidão." },
  { resposta: "Lei do Ventre Livre", emoji: "👶", pistas: ["Sou uma lei de 1871.", "Falo sobre bebês.", "Os filhos de mulheres escravizadas nasceriam livres, mas continuavam sob o controle dos senhores."], explicacao: "Ela fez parte do caminho lento e gradual até a abolição." },
  { resposta: "Lei do Sexagenário", emoji: "👴", pistas: ["Sou uma lei de 1885.", "Meu nome tem a ver com o número 60.", "Libertava escravizados com mais de 60 anos, mas poucos chegavam a essa idade."], explicacao: "Por isso ela teve pouco efeito." },
  { resposta: "Constituição de 1824", emoji: "📜", pistas: ["Sou um documento muito importante.", "Fui a primeira do Brasil.", "Reconheci cidadãos brasileiros, mas só homens livres ou libertos, com mais de 25 anos e renda, podiam votar."], explicacao: "Mulheres, escravizados e pobres ficaram de fora." },
  { resposta: "Revolta dos Malês", emoji: "✊", pistas: ["Sou uma revolta.", "Aconteci em Salvador, em 1835.", "Fui feita por africanos muçulmanos, escravizados e libertos."], explicacao: "Foi a maior revolta de escravizados do Brasil." },
  { resposta: "Conjuração Baiana", emoji: "📣", pistas: ["Sou um movimento de 1798.", "Tive ampla participação de negros e mestiços, livres e escravizados.", "Lutei pela República e pelo fim da escravidão, em Salvador."], explicacao: "O movimento foi duramente reprimido." },
  { resposta: "Revolução Francesa", emoji: "🇫🇷", pistas: ["Comecei em 1789.", "Derrubei a monarquia absolutista.", "Defendi os três poderes e proclamei a Declaração dos Direitos do Homem e do Cidadão."], explicacao: "Mas as mulheres e os povos das colônias ficaram de fora." },
  { resposta: "Declaração de Salamanca", emoji: "🏫", pistas: ["Sou um documento de 1994.", "Tenho o nome de uma cidade da Espanha.", "Defendo que as escolas se adaptem aos alunos com deficiência."], explicacao: "Ela defende a inclusão escolar." },
  { resposta: "ONU", emoji: "🇺🇳", pistas: ["Sou uma organização, não uma pessoa.", "Reúno quase todos os países do mundo.", "Fiz declarações sobre os direitos das pessoas com deficiência em 1971 e 1975."], explicacao: "ONU = Organização das Nações Unidas." },
  { resposta: "Papiro de Amenemope", emoji: "🏺", pistas: ["Tenho mais de 3.000 anos.", "Sou um documento do Egito Antigo.", "Ensino a não zombar de pessoas com deficiência visual ou física."], explicacao: "Um ensinamento antigo que continua valendo!" },
  { resposta: "Poder Legislativo", emoji: "⚖️", pistas: ["Sou um dos três poderes.", "Sou formado por deputados, senadores e vereadores.", "Minha função é fazer as leis."], explicacao: "O Executivo governa e o Judiciário julga." },
];

export const palavrasCaca = ["DEMOCRACIA", "ATENAS", "QUILOMBO", "ZUMBI", "MALÊS", "ÁUREA", "IMPÉRIO", "COLÔNIA", "INCLUSÃO", "VOTO"];

export const palavrasForca = [
  { palavra: "Democracia", dica: "Governo em que o povo escolhe seus líderes", pt: "“poder do povo”." },
  { palavra: "Ágora", dica: "Praça pública da Atenas antiga", pt: "lá os cidadãos debatiam a vida da cidade." },
  { palavra: "Quilombo", dica: "Povoado de quem fugiu da escravidão", pt: "espaço de refúgio e de luta pela liberdade." },
  { palavra: "Palmares", dica: "O quilombo mais famoso", pt: "ficava em Alagoas e foi liderado por Zumbi." },
  { palavra: "Constituição", dica: "Conjunto das leis mais importantes de um país", pt: "a primeira do Brasil é de 1824." },
  { palavra: "Independência", dica: "O que D. Pedro I proclamou em 1822", pt: "o Brasil deixou de ser colônia." },
  { palavra: "Abolição", dica: "Fim da escravidão", pt: "aconteceu com a Lei Áurea, em 1888." },
  { palavra: "Inclusão", dica: "Garantir que ninguém fique de fora", pt: "é a ideia do modelo social." },
  { palavra: "Monarquia", dica: "Governo de um rei ou de uma rainha", pt: "o poder passa de pai ou mãe para filho ou filha." },
  { palavra: "Cidadão", dica: "Pessoa que tem direitos políticos", pt: "em Atenas, só alguns homens eram cidadãos." },
  { palavra: "Capacitismo", dica: "Preconceito contra pessoas com deficiência", pt: "precisa ser combatido, como o racismo." },
  { palavra: "Liberto", dica: "Pessoa que foi escravizada e conseguiu a liberdade", pt: "podia votar em 1824, mas não ser candidato." },
];
