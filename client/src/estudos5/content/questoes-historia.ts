import type { QuizQuestion } from "../types";

// 20 questões de revisão por assunto de História.

const banco: Record<string, QuizQuestion[]> = {
  democracia: [
    { q: "O que é democracia?", options: ["Um governo em que o rei manda em tudo", "Um jeito de organizar o governo em que o povo escolhe seus líderes", "Um governo sem leis", "Um tipo de festa"], answer: 1, why: "Na democracia, o povo tem o direito de escolher seus líderes pelo voto." },
    { q: "A palavra “democracia” vem do grego e significa:", options: ["poder do rei", "poder do exército", "poder do povo", "poder dos ricos"], answer: 2, why: "Demos = povo; kratos = poder." },
    { q: "Em qual tipo de governo uma pessoa ou um grupo pequeno manda sozinho e ninguém pode escolher?", options: ["Ditadura", "Democracia", "Democracia representativa", "Democracia direta"], answer: 0, why: "Na ditadura não há eleições livres." },
    { q: "Em qual tipo de governo quem governa é um rei ou uma rainha?", options: ["Ditadura", "Democracia", "República", "Monarquia"], answer: 3, why: "Monarquia é o governo de um rei ou de uma rainha." },
    { q: "Na democracia DIRETA:", options: ["o povo escolhe representantes", "todos votam em todas as decisões", "só o rei vota", "ninguém vota"], answer: 1, why: "Na direta, cada pessoa vota em cada decisão." },
    { q: "Na democracia REPRESENTATIVA:", options: ["o povo escolhe pessoas para representá-lo e decidir em seu nome", "todos votam em todas as leis", "um rei decide tudo", "não existem eleições"], answer: 0, why: "Escolhemos representantes de confiança." },
    { q: "O Brasil é um exemplo de:", options: ["monarquia absolutista", "ditadura", "democracia representativa", "democracia direta"], answer: 2, why: "No Brasil, votamos para escolher representantes." },
    { q: "Por que a democracia representativa é importante?", options: ["Porque o rei gosta assim", "Porque nem sempre é possível que todos participem diretamente de todas as decisões", "Porque é proibido votar", "Porque só os ricos decidem"], answer: 1, why: "Seria impossível milhões de pessoas votarem em cada decisão." },
    { q: "Qual destes cargos é escolhido pelo voto no Brasil?", options: ["Rei", "Imperador", "Ditador", "Prefeito"], answer: 3, why: "Votamos para vereador, prefeito, deputado, governador, senador e presidente." },
    { q: "Quem cuida da cidade (município)?", options: ["Prefeito e vereadores", "Presidente e senadores", "Governador e deputados estaduais", "O rei"], answer: 0, why: "No município, elegemos prefeito e vereadores." },
    { q: "Quem governa o estado?", options: ["O prefeito", "O vereador", "O governador", "O senador"], answer: 2, why: "O governador é o chefe do estado." },
    { q: "Quem governa o país inteiro?", options: ["O vereador", "O presidente da República", "O governador", "O prefeito"], answer: 1, why: "O presidente é eleito por todo o Brasil." },
    { q: "Se um representante não fizer um bom trabalho, o que o povo pode fazer?", options: ["Nada", "Trocá-lo nas eleições seguintes", "Chamar o rei", "Fechar o país"], answer: 1, why: "Na democracia, podemos escolher outra pessoa na próxima eleição." },
    { q: "Qual é um dever dos representantes eleitos?", options: ["Ouvir a população e respeitar as leis", "Mandar sem ouvir ninguém", "Proibir as eleições", "Ficar para sempre no cargo"], answer: 0, why: "Eles devem ouvir o povo e respeitar as leis." },
    { q: "Qual destas coisas faz parte de viver em uma democracia?", options: ["Proibir opiniões diferentes", "Liberdade de expressão, votar e ser votado", "Só uma pessoa decidir", "Não ter regras"], answer: 1, why: "Liberdade de expressão, votar e ser votado são marcas da democracia." },
    { q: "Viver em democracia também significa:", options: ["fazer o que quiser sem regras", "não respeitar quem pensa diferente", "respeitar as regras e conviver com as diferenças", "nunca votar"], answer: 2, why: "Democracia exige respeito às regras e às diferenças." },
    { q: "Como uma criança pode participar da democracia?", options: ["Não pode participar de jeito nenhum", "Estudando, conhecendo seus direitos e deveres e dando sua opinião com respeito", "Votando para presidente aos 8 anos", "Brigando com os colegas"], answer: 1, why: "O texto diz que é importante participar, mesmo sendo criança." },
    { q: "Escolher o representante da turma por votação é um exemplo de:", options: ["monarquia", "ditadura", "escravidão", "democracia"], answer: 3, why: "Os alunos escolhem pelo voto: é democracia." },
    { q: "“O filho do rei herdou o trono.” Isso acontece em qual tipo de governo?", options: ["Democracia representativa", "Monarquia", "Democracia direta", "Eleição"], answer: 1, why: "Na monarquia, o poder passa de pai ou mãe para filho ou filha." },
    { q: "A partir de que idade os brasileiros podem votar?", options: ["10 anos", "16 anos", "30 anos", "50 anos"], answer: 1, why: "No Brasil, o voto é permitido a partir dos 16 anos." },
  ],

  "participacao-politica": [
    { q: "Por que a Grécia Antiga é chamada de “berço da democracia”?", options: ["Porque lá nasceram os reis", "Porque em Atenas surgiu a ideia de que todos os cidadãos poderiam participar da política", "Porque lá não havia leis", "Porque lá todos eram escravizados"], answer: 1, why: "Atenas desenvolveu pela primeira vez a participação dos cidadãos." },
    { q: "Em que cidade da Grécia surgiu a democracia?", options: ["Esparta", "Roma", "Atenas", "Paris"], answer: 2, why: "Foi em Atenas, por volta do século VI a.C." },
    { q: "O que era a Ágora?", options: ["Uma praça pública onde os cidadãos faziam comércio e discutiam a vida da cidade", "Um castelo do rei", "Uma prisão", "Um navio"], answer: 0, why: "Na Ágora aconteciam comércio, assembleias e tribunais." },
    { q: "Quem era considerado cidadão em Atenas?", options: ["Todas as pessoas", "Mulheres e estrangeiros", "Escravizados", "Homens, maiores de 18 anos, filhos de pai e mãe atenienses"], answer: 3, why: "Só uma pequena parcela da população era cidadã." },
    { q: "Quem NÃO era cidadão em Atenas?", options: ["Mulheres, escravizados e estrangeiros", "Homens atenienses adultos", "Filhos de atenienses", "Ninguém ficava de fora"], answer: 0, why: "Esses grupos não podiam participar da política." },
    { q: "Em Atenas, a cidadania:", options: ["nunca podia ser perdida", "podia ser perdida em caso de infrações", "era vendida", "era dada a todos os estrangeiros"], answer: 1, why: "O texto diz que a cidadania não era um direito inalienável em Atenas." },
    { q: "Em que ano começou a Revolução Francesa?", options: ["1500", "1822", "1789", "1888"], answer: 2, why: "A Revolução Francesa começou em 1789." },
    { q: "Por que o povo francês se revoltou?", options: ["Porque todos eram ricos", "Porque os nobres tinham privilégios enquanto camponeses e comerciantes viviam na pobreza", "Porque queriam um rei mais forte", "Porque não gostavam de festas"], answer: 1, why: "A desigualdade entre nobres e o resto da população causou a revolta." },
    { q: "O que a Revolução Francesa derrubou?", options: ["A democracia", "A república", "A monarquia absolutista", "A escola"], answer: 2, why: "A revolução derrubou o governo em que o rei tinha poder absoluto." },
    { q: "O que é monarquia absolutista?", options: ["Quando o rei exerce poder absoluto e não responde a ninguém", "Quando o povo escolhe o rei", "Quando não existe rei", "Quando o rei obedece ao Congresso"], answer: 0, why: "No absolutismo, o rei manda em tudo sozinho." },
    { q: "Quais são os três poderes defendidos pelos revolucionários?", options: ["Rei, nobres e padres", "Polícia, exército e bombeiros", "Legislativo, Executivo e Judiciário", "Escola, hospital e igreja"], answer: 2, why: "Três poderes independentes que fiscalizam uns aos outros." },
    { q: "Qual poder FAZ as leis?", options: ["Executivo", "Judiciário", "Legislativo", "Militar"], answer: 2, why: "O Legislativo (deputados, senadores, vereadores) faz as leis." },
    { q: "Qual poder JULGA se as leis estão sendo cumpridas?", options: ["Judiciário", "Legislativo", "Executivo", "Real"], answer: 0, why: "O Judiciário é formado por juízes e tribunais." },
    { q: "Por que os três poderes devem fiscalizar uns aos outros?", options: ["Para brigarem", "Para que ninguém mande sozinho e haja um bom governo", "Para acabar com as leis", "Para ajudar o rei"], answer: 1, why: "A fiscalização garante uma boa governança." },
    { q: "O que é uma Constituição?", options: ["Um livro de receitas", "O conjunto das leis mais importantes de um país", "Uma moeda", "Um tipo de rei"], answer: 1, why: "A Constituição limita o poder dos governantes e garante direitos." },
    { q: "Qual documento os revolucionários franceses proclamaram?", options: ["Lei Áurea", "Declaração de Salamanca", "Constituição de 1824", "Declaração dos Direitos do Homem e do Cidadão"], answer: 3, why: "Ela se inspirava em liberdade e igualdade." },
    { q: "O que é um direito inalienável?", options: ["Um direito que pode ser vendido", "Um direito que só os reis têm", "Um direito fundamental que ninguém pode retirar, nem um governante", "Um direito que vale só um dia"], answer: 2, why: "Inalienável = não pode ser tirado." },
    { q: "Quem ficou de fora dos direitos políticos na Declaração francesa?", options: ["As mulheres", "Os homens franceses", "Os revolucionários", "Os deputados"], answer: 0, why: "As mulheres continuaram sem direito ao voto." },
    { q: "Depois das declarações de liberdade, o que os países europeus continuaram fazendo com suas colônias?", options: ["Deram independência a todas", "Continuaram explorando e escravizando seus povos", "Pararam de comerciar", "Deram direito de voto a todos"], answer: 1, why: "Haiti, Índia, Congo, Egito e outros continuaram explorados." },
    { q: "O que significa “ampliação da participação política”?", options: ["Menos pessoas votando", "Cada vez mais pessoas conquistando o direito de participar da política", "Acabar com as eleições", "Só os reis participando"], answer: 1, why: "Ao longo da história, mais grupos conquistaram o direito de participar." },
  ],

  "brasil-colonia": [
    { q: "O que aconteceu em 1500?", options: ["A Independência do Brasil", "A chegada dos portugueses ao território que chamariam de Brasil", "A Lei Áurea", "A Revolução Francesa"], answer: 1, why: "Os portugueses chegaram e transformaram o Brasil em colônia." },
    { q: "O Período Colonial do Brasil vai de:", options: ["1500 a 1822", "1822 a 1889", "1888 a 2026", "1789 a 1800"], answer: 0, why: "Começa com a chegada dos portugueses e termina com a Independência." },
    { q: "O que é uma colônia?", options: ["Um país independente", "Um território dominado e explorado por outro país", "Uma cidade grande", "Uma escola"], answer: 1, why: "O Brasil era uma colônia de Portugal." },
    { q: "Qual era o regime político de Portugal nessa época?", options: ["Democracia", "República", "Monarquia absolutista", "Monarquia constitucional"], answer: 2, why: "Todos os poderes estavam nas mãos do rei." },
    { q: "No Brasil Colônia, as pessoas eram consideradas:", options: ["cidadãs brasileiras", "súditas do rei de Portugal", "eleitoras", "deputadas"], answer: 1, why: "Não existiam cidadãos brasileiros, só súditos do rei." },
    { q: "Qual critério era usado para dar terras e cargos na colônia?", options: ["Quem tirasse a melhor nota", "Sorteio", "A “pureza de sangue”: só portugueses cristãos", "Votação"], answer: 2, why: "Era um critério discriminatório." },
    { q: "Quem eram os “cristãos-novos”?", options: ["Judeus e muçulmanos convertidos ao cristianismo", "Padres recém-chegados", "Crianças batizadas", "Indígenas"], answer: 0, why: "Eles eram excluídos dos privilégios." },
    { q: "Como as leis da época tratavam as pessoas negras?", options: ["Como cidadãs", "Como objetos que podiam ser comprados e vendidos", "Como nobres", "Como governantes"], answer: 1, why: "A discriminação era baseada na raça." },
    { q: "Por quanto tempo a escravidão foi legal no Brasil?", options: ["10 anos", "50 anos", "Quase 400 anos", "Mil anos"], answer: 2, why: "Da época colonial até 1888." },
    { q: "O que é racismo estrutural?", options: ["Um tipo de construção", "Um preconceito racial enraizado na sociedade", "Uma lei de 1888", "Uma revolta"], answer: 1, why: "Vem da escravidão e ainda produz efeitos hoje." },
    { q: "O que eram os quilombos?", options: ["Fazendas de açúcar", "Povoados formados por pessoas escravizadas que conseguiam fugir", "Palácios do rei", "Navios"], answer: 1, why: "Eram espaços de refúgio e de luta pela liberdade." },
    { q: "O quilombo mais famoso foi:", options: ["Palmares", "Bastilha", "Ágora", "Ipiranga"], answer: 0, why: "O Quilombo dos Palmares, liderado por Zumbi, ficava em Alagoas." },
    { q: "Em qual estado ficava o Quilombo dos Palmares?", options: ["São Paulo", "Rio de Janeiro", "Alagoas", "Rio Grande do Sul"], answer: 2, why: "Ficava na Serra da Barriga, em Alagoas." },
    { q: "O Dia da Consciência Negra (20 de novembro) homenageia:", options: ["D. Pedro I", "Zumbi dos Palmares", "Napoleão", "D. João VI"], answer: 1, why: "É a data da morte de Zumbi dos Palmares." },
    { q: "Onde aconteceu a Conjuração Baiana?", options: ["Paris", "Lisboa", "São Paulo", "Salvador"], answer: 3, why: "Aconteceu em Salvador, na Bahia." },
    { q: "Quem participou da Conjuração Baiana?", options: ["Só nobres portugueses", "Negros e mestiços, livres e escravizados", "Só o rei", "Soldados franceses"], answer: 1, why: "Foi um movimento com ampla participação popular." },
    { q: "O que a Conjuração Baiana queria?", options: ["Fortalecer o rei", "A Proclamação da República e o fim da escravidão", "Mais escravidão", "Voltar a ser colônia"], answer: 1, why: "Essas eram suas principais reivindicações." },
    { q: "O que aconteceu com os movimentos de resistência no período colonial?", options: ["Foram duramente reprimidos e seus líderes perseguidos e mortos", "Ganharam prêmios", "Foram ignorados", "Viraram leis imediatamente"], answer: 0, why: "A repressão foi violenta." },
    { q: "Por que dizemos “pessoa escravizada” e não “escravo”?", options: ["Porque é mais curto", "Porque ninguém nasce escravo: a escravidão foi imposta à pessoa", "Porque é uma palavra em inglês", "Não há diferença"], answer: 1, why: "A expressão mostra que a escravidão foi uma violência imposta." },
    { q: "O Período Colonial terminou com:", options: ["a Lei Áurea", "a Revolução Francesa", "a Independência do Brasil, em 1822", "a chegada dos portugueses"], answer: 2, why: "Com a Independência, começa o Período Imperial." },
  ],

  "brasil-imperio": [
    { q: "Por que a família real portuguesa veio para o Brasil em 1808?", options: ["Para passar férias", "Fugindo do exército de Napoleão, da França", "Para acabar com a escravidão", "Para fazer uma eleição"], answer: 1, why: "Napoleão estava conquistando a Europa." },
    { q: "Quem proclamou a Independência do Brasil?", options: ["D. João VI", "Zumbi", "D. Pedro I", "Napoleão"], answer: 2, why: "D. Pedro I proclamou a Independência e virou imperador." },
    { q: "Em que data foi proclamada a Independência do Brasil?", options: ["7 de setembro de 1822", "13 de maio de 1888", "14 de julho de 1789", "20 de novembro de 1695"], answer: 0, why: "Comemoramos o 7 de Setembro." },
    { q: "Qual foi o regime político adotado no Brasil Império?", options: ["Monarquia absolutista", "Ditadura", "Democracia direta", "Monarquia constitucional"], answer: 3, why: "Havia um Congresso e uma Constituição." },
    { q: "Qual é a diferença entre a monarquia constitucional e a absolutista?", options: ["Não há diferença", "Na constitucional há um Congresso eleito e uma Constituição que garante direitos", "Na constitucional não há rei", "Na absolutista o povo vota"], answer: 1, why: "Na absolutista, o rei manda em tudo sozinho." },
    { q: "Qual foi a primeira Constituição do Brasil?", options: ["A de 1824", "A de 1500", "A de 1888", "A de 2006"], answer: 0, why: "A Constituição de 1824 reconheceu cidadãos brasileiros." },
    { q: "Segundo a Constituição de 1824, quem podia votar?", options: ["Todas as pessoas", "Mulheres e crianças", "Homens livres ou libertos, nascidos no Brasil, maiores de 25 anos e com renda acima de 100 mil réis", "Só os escravizados"], answer: 2, why: "O voto era muito restrito." },
    { q: "Para ser candidato a deputado ou senador em 1824, era preciso:", options: ["ter mais de 10 anos", "ser mulher", "ser homem livre, maior de 25 anos, com renda acima de 400 mil réis e católico", "ser estrangeiro"], answer: 2, why: "Os libertos não podiam se candidatar." },
    { q: "Quem NÃO podia votar no Brasil Império?", options: ["Homens ricos nascidos no Brasil", "Mulheres e pessoas escravizadas", "Homens livres com mais de 25 anos", "Homens libertos com renda"], answer: 1, why: "A maioria da população ficava de fora." },
    { q: "O que foi a Revolta dos Malês?", options: ["Uma festa", "A maior revolta de escravizados do Brasil, em Salvador, em 1835", "Uma guerra na França", "Uma lei"], answer: 1, why: "Africanos muçulmanos, escravizados e libertos, se revoltaram." },
    { q: "Quem eram os malês?", options: ["Reis portugueses", "Soldados de Napoleão", "Africanos muçulmanos que viviam na Bahia", "Deputados"], answer: 2, why: "Malês eram africanos de religião muçulmana." },
    { q: "Por que o fim da escravidão no Brasil foi lento e gradual?", options: ["Porque ninguém queria a liberdade", "Porque as elites que lucravam com a escravidão tentavam atrasar o fim", "Porque os outros países pediam mais escravidão", "Porque não havia revoltas"], answer: 1, why: "As elites resistiram mesmo com revoltas e pressão internacional." },
    { q: "O que dizia a Lei do Ventre Livre (1871)?", options: ["Libertava os maiores de 60 anos", "Libertava os filhos de mulheres escravizadas nascidos a partir da lei", "Acabava com a escravidão", "Criava a República"], answer: 1, why: "Mas a liberdade das crianças era limitada." },
    { q: "Na prática, o que acontecia com as crianças da Lei do Ventre Livre?", options: ["Ganhavam terras", "Ficavam com os senhores de suas mães até os 8 anos e podiam trabalhar até os 21", "Iam para a escola", "Viravam deputadas"], answer: 1, why: "Os senhores podiam mantê-las trabalhando para “compensar” custos." },
    { q: "O que dizia a Lei do Sexagenário (1885)?", options: ["Libertava escravizados com mais de 60 anos", "Libertava todas as crianças", "Criava escolas", "Proibia o voto"], answer: 0, why: "Sexagenário = pessoa com mais de 60 anos." },
    { q: "Por que a Lei do Sexagenário teve pouco efeito?", options: ["Porque havia muitos idosos ricos", "Porque poucos escravizados chegavam aos 60 anos por causa da vida tão dura", "Porque foi cancelada no mesmo dia", "Porque ninguém soube dela"], answer: 1, why: "E os libertos ainda tinham que trabalhar para “indenizar” os senhores." },
    { q: "Em que ano foi assinada a Lei Áurea?", options: ["1822", "1871", "1888", "1500"], answer: 2, why: "A Lei Áurea, de 1888, acabou com a escravidão." },
    { q: "O que a Lei Áurea NÃO garantiu aos libertos?", options: ["A liberdade", "Terras, trabalho ou qualquer tipo de apoio", "O fim da escravidão", "O direito de não serem vendidos"], answer: 1, why: "Os libertos ficaram sem nenhum apoio." },
    { q: "O Brasil foi:", options: ["o primeiro país do mundo a abolir a escravidão", "o último país da América a abolir a escravidão", "um país que nunca teve escravidão", "o primeiro da América a abolir"], answer: 1, why: "O Brasil foi o último da América." },
    { q: "Qual é a ordem certa das leis?", options: ["Lei Áurea → Sexagenário → Ventre Livre", "Ventre Livre (1871) → Sexagenário (1885) → Lei Áurea (1888)", "Sexagenário → Lei Áurea → Ventre Livre", "Todas no mesmo ano"], answer: 1, why: "1871, 1885 e 1888." },
  ],

  "pessoa-com-deficiencia": [
    { q: "Como as pessoas com deficiência eram vistas no Egito Antigo?", options: ["Eram todas expulsas", "Ocupavam diferentes cargos, e havia ensinamentos para não zombar delas", "Eram proibidas de trabalhar", "Não existiam"], answer: 1, why: "Papiros mostram pessoas com deficiência em vários cargos." },
    { q: "O que ensinava o Papiro de Amenemope?", options: ["A fazer pirâmides", "A não caçoar de uma pessoa com deficiência visual ou física", "A votar", "A guerrear"], answer: 1, why: "Era um documento com instruções morais." },
    { q: "Em Esparta, sociedade voltada para a guerra, como eram tratadas as crianças com deficiência física?", options: ["Eram rejeitadas e até mortas", "Viravam reis", "Recebiam prêmios", "Iam para a escola"], answer: 0, why: "Uma crueldade que hoje sabemos ser totalmente errada." },
    { q: "Na Idade Média, muitos europeus achavam que a deficiência era:", options: ["um presente", "um castigo divino", "uma doença contagiosa", "uma profissão"], answer: 1, why: "Achavam que a pessoa devia “pagar seus pecados”." },
    { q: "No século XIX, na Europa, como as pessoas olhavam para os corpos com deficiência?", options: ["Com respeito e inclusão", "Como entretenimento e horror, expondo-os em feiras", "Com indiferença total", "Como heróis"], answer: 1, why: "Era um tratamento desumano." },
    { q: "No século XX, as pessoas com deficiência passaram a ser vistas com um olhar:", options: ["mágico", "médico, buscando causas e tratamentos", "militar", "religioso apenas"], answer: 1, why: "A medicina passou a estudar as deficiências." },
    { q: "Qual acontecimento levou a Europa a pensar na inclusão das pessoas com deficiência?", options: ["A Revolução Francesa", "A Segunda Guerra Mundial", "A chegada dos portugueses ao Brasil", "A Lei Áurea"], answer: 1, why: "Muitas pessoas voltaram da guerra feridas e traumatizadas." },
    { q: "Qual foi o primeiro documento internacional sobre os direitos da pessoa com deficiência?", options: ["Declaração dos Direitos da Pessoa com Deficiência Mental (ONU, 1971)", "Lei Áurea", "Constituição de 1824", "Papiro de Amenemope"], answer: 0, why: "Garantia cuidado médico, proteção e igualdade." },
    { q: "O que é a ONU?", options: ["Um time de futebol", "A Organização das Nações Unidas, que reúne quase todos os países", "Um hospital", "Uma escola"], answer: 1, why: "A ONU criou várias declarações de direitos." },
    { q: "O que é o “modelo biomédico” da deficiência?", options: ["A ideia de que a sociedade deve tirar as barreiras", "A ideia de que a deficiência é uma doença da pessoa, que precisa se adaptar à sociedade", "Um tipo de remédio", "Uma lei de 2006"], answer: 1, why: "Era a visão das declarações de 1971 e 1975." },
    { q: "O que é o “modelo social” da deficiência?", options: ["A pessoa deve se adaptar sozinha", "A sociedade deve criar condições e eliminar barreiras para que todos participem", "Ignorar as pessoas com deficiência", "Um modelo de roupa"], answer: 1, why: "É a visão defendida pelos movimentos sociais." },
    { q: "Quem defendeu o modelo social?", options: ["Os reis", "Os movimentos sociais e as associações de pessoas com deficiência", "Os soldados de Esparta", "Ninguém"], answer: 1, why: "Movimentos sociais são grupos que lutam por direitos." },
    { q: "Qual era o principal objetivo da Declaração de Salamanca (1994)?", options: ["Acabar com as escolas", "Garantir a inclusão escolar das pessoas com deficiência", "Criar um exército", "Proibir o voto"], answer: 1, why: "As escolas devem se adaptar às necessidades dos alunos." },
    { q: "Qual termo a Convenção de 2006 adotou?", options: ["Portador de deficiência", "Pessoa com necessidades especiais", "Pessoa com deficiência", "Inválido"], answer: 2, why: "Ele coloca a pessoa antes da deficiência." },
    { q: "Por que o termo “portador de deficiência” foi abandonado?", options: ["Porque é muito longo", "Porque “portar” dá ideia de algo que se pode carregar ou largar quando quiser", "Porque é em inglês", "Porque é bonito demais"], answer: 1, why: "A deficiência não é algo que se escolhe carregar." },
    { q: "Por que o termo “pessoa com necessidades especiais” foi rejeitado?", options: ["Porque passava a ideia de que essas pessoas não poderiam conviver em sociedade", "Porque é muito curto", "Porque é um termo médico", "Porque é engraçado"], answer: 0, why: "A Convenção de 2006 rejeitou esse termo." },
    { q: "Segundo a Convenção de 2006, o que transforma uma condição do corpo em deficiência?", options: ["A idade", "As barreiras que encontramos na sociedade", "A altura", "A roupa"], answer: 1, why: "Por isso a sociedade deve eliminar as barreiras." },
    { q: "Qual destes é um exemplo de REMOVER uma barreira?", options: ["Construir só escadas", "Colocar rampa, elevador e intérprete de Libras", "Fazer piadas", "Fechar a porta"], answer: 1, why: "Acessibilidade permite que todos participem." },
    { q: "O que é capacitismo?", options: ["Uma capacidade especial", "O preconceito contra pessoas com deficiência", "Uma lei de 1888", "Um esporte"], answer: 1, why: "Como o racismo, o capacitismo precisa ser combatido." },
    { q: "O que é “casamento consanguíneo”?", options: ["Casamento entre parentes muito próximos", "Casamento na igreja", "Casamento entre reis de países diferentes", "Uma festa egípcia"], answer: 0, why: "No Egito Antigo era comum e aumentava a chance de deficiências congênitas." },
  ],

  "revisao-historia": [
    { q: "Qual é o tema da Unidade 3 de História?", options: ["Ampliação da participação política e conquista de direitos", "Os dinossauros", "O sistema solar", "As grandes navegações"], answer: 0, why: "A unidade fala de democracia, escravidão e direitos." },
    { q: "Em uma democracia representativa:", options: ["o rei decide tudo", "o povo escolhe representantes", "ninguém vota", "todos votam em tudo"], answer: 1, why: "É o caso do Brasil." },
    { q: "Qual destes NÃO é um cargo eleito no Brasil?", options: ["Vereador", "Senador", "Rei", "Governador"], answer: 2, why: "O Brasil não tem rei desde 1889." },
    { q: "A Ágora era:", options: ["a praça pública de Atenas", "um quilombo", "uma lei", "um rei"], answer: 0, why: "Lá os cidadãos faziam comércio e votavam." },
    { q: "Em Atenas, mulheres, escravizados e estrangeiros:", options: ["eram os únicos cidadãos", "não eram considerados cidadãos", "governavam a cidade", "podiam ser reis"], answer: 1, why: "Só homens atenienses adultos eram cidadãos." },
    { q: "A Revolução Francesa (1789) derrubou:", options: ["a democracia", "a monarquia absolutista", "a república", "os quilombos"], answer: 1, why: "E defendeu Constituição e três poderes." },
    { q: "Os três poderes são:", options: ["Rei, rainha e príncipe", "Legislativo, Executivo e Judiciário", "Céu, terra e mar", "Polícia, juiz e prefeito"], answer: 1, why: "Cada um tem sua função e fiscaliza os outros." },
    { q: "Quem ficou de fora da Declaração dos Direitos do Homem e do Cidadão?", options: ["Os homens franceses", "As mulheres e os povos das colônias", "Os revolucionários", "Os deputados"], answer: 1, why: "Eles continuaram sem direitos políticos." },
    { q: "No Brasil Colônia, as pessoas eram:", options: ["cidadãs", "súditas do rei de Portugal", "eleitoras", "senadoras"], answer: 1, why: "Não existiam cidadãos brasileiros." },
    { q: "Os quilombos eram:", options: ["prisões", "povoados de pessoas que fugiram da escravidão", "palácios", "escolas"], answer: 1, why: "Espaços de refúgio e luta por liberdade." },
    { q: "A Conjuração Baiana lutava por:", options: ["mais poder para o rei", "República e fim da escravidão", "voltar a ser colônia", "acabar com as escolas"], answer: 1, why: "Reunia negros e mestiços, livres e escravizados." },
    { q: "A Independência do Brasil foi em:", options: ["1500", "1888", "1822", "1789"], answer: 2, why: "Em 7 de setembro de 1822." },
    { q: "Na Constituição de 1824, o voto era:", options: ["para todos", "só para homens livres, maiores de 25 anos e com renda", "só para mulheres", "proibido"], answer: 1, why: "A maioria da população ficava de fora." },
    { q: "A maior revolta de escravizados do Brasil foi:", options: ["a Revolução Francesa", "a Revolta dos Malês (1835)", "a Independência", "a Tomada da Bastilha"], answer: 1, why: "Aconteceu em Salvador." },
    { q: "A Lei Áurea (1888):", options: ["libertou só as crianças", "acabou com a escravidão, mas sem dar apoio aos libertos", "criou a escravidão", "deu terras aos libertos"], answer: 1, why: "Os libertos ficaram sem terra, trabalho ou assistência." },
    { q: "O racismo estrutural é:", options: ["um preconceito racial enraizado na sociedade", "um prédio antigo", "uma lei da Constituição", "uma revolta"], answer: 0, why: "Tem origem na escravidão e ainda produz efeitos." },
    { q: "No modelo social da deficiência:", options: ["a pessoa precisa se adaptar sozinha", "a sociedade deve eliminar as barreiras", "a deficiência é um castigo", "nada muda"], answer: 1, why: "É a visão da Convenção de 2006." },
    { q: "O termo correto, segundo a Convenção de 2006, é:", options: ["portador de deficiência", "pessoa com deficiência", "pessoa com necessidades especiais", "inválido"], answer: 1, why: "A pessoa vem antes da deficiência." },
    { q: "A Declaração de Salamanca (1994) defende:", options: ["a inclusão escolar", "o fim das escolas", "a monarquia", "a escravidão"], answer: 0, why: "As escolas devem se adaptar aos alunos com deficiência." },
    { q: "Qual é a ideia que liga todos os assuntos da unidade?", options: ["Os direitos sempre existiram para todos", "Os direitos foram conquistados com muita luta, e cada vez mais pessoas passaram a participar", "Só os reis têm direitos", "Ninguém precisa lutar por direitos"], answer: 1, why: "A participação política e os direitos foram ampliados ao longo da história." },
  ],
};

// Espalha a alternativa certa entre a, b, c e d (troca de lugar com a alternativa da posição sorteada).
function balancear(lista: QuizQuestion[]): QuizQuestion[] {
  return lista.map((q, i) => {
    const alvo = (i * 3 + 2) % q.options.length;
    if (alvo === q.answer) return q;
    const options = [...q.options];
    [options[alvo], options[q.answer]] = [options[q.answer], options[alvo]];
    return { ...q, options, answer: alvo };
  });
}

export const questoesHistoria: Record<string, QuizQuestion[]> = Object.fromEntries(
  Object.entries(banco).map(([id, lista]) => [id, balancear(lista)]),
);
