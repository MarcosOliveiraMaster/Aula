import type { Topic } from "../types";
import { questoesHistoria } from "./questoes-historia";
import { Callout, Card, CardGrid, Glossary, Section, Sorter } from "../ui";
import { DiretaRepresentativa, LeisPapelPratica, LinhaHistoria, QuaseQuatrocentos, QuemElegemos, QuemGoverna, QuemPodiaVotar, RemoveBarreiras, TresPoderes, type Evento } from "../visuais-historia";

const HIST = "#b5532a";

const eventosColonia: Evento[] = [
  { ano: "1500", emoji: "⛵", titulo: "Chegada dos portugueses", texto: "Os portugueses chegam ao território que chamariam de Brasil e o transformam em colônia de Portugal.", tom: "fato" },
  { ano: "Séc. XVI", emoji: "⛓️", titulo: "Começa a escravidão", texto: "Indígenas e, depois, milhões de africanos são escravizados para trabalhar nos engenhos de açúcar e em muitas outras atividades.", tom: "fato" },
  { ano: "Séc. XVII", emoji: "🛖", titulo: "Quilombos", texto: "Pessoas escravizadas que conseguiam fugir formavam quilombos: povoados de refúgio e de luta pela liberdade. O mais famoso foi Palmares.", tom: "luta" },
  { ano: "1798", emoji: "✊", titulo: "Conjuração Baiana", texto: "Em Salvador, negros e mestiços, livres e escravizados, lutam pela República e pelo fim da escravidão. O movimento foi duramente reprimido.", tom: "luta" },
  { ano: "1808", emoji: "👑", titulo: "Família real no Brasil", texto: "A família real portuguesa foge de Napoleão e se muda para o Brasil. Isso fortalece a ideia de independência.", tom: "fato" },
  { ano: "1822", emoji: "🇧🇷", titulo: "Independência", texto: "Em 7 de setembro, D. Pedro I proclama a Independência e se torna imperador. Termina o período colonial.", tom: "fato" },
];

const eventosImperio: Evento[] = [
  { ano: "1822", emoji: "🇧🇷", titulo: "Independência", texto: "D. Pedro I proclama a Independência do Brasil em 7 de setembro de 1822 e começa o Período Imperial.", tom: "fato" },
  { ano: "1824", emoji: "📜", titulo: "Primeira Constituição", texto: "Reconhece cidadãos brasileiros, mas o voto é só para homens livres ou libertos, nascidos no Brasil, com mais de 25 anos e renda acima de 100 mil réis.", tom: "lei" },
  { ano: "1835", emoji: "✊", titulo: "Revolta dos Malês", texto: "A maior revolta de escravizados do Brasil, em Salvador: africanos muçulmanos, escravizados e libertos. Foi duramente reprimida.", tom: "luta" },
  { ano: "1871", emoji: "👶", titulo: "Lei do Ventre Livre", texto: "Os filhos de mulheres escravizadas nasceriam livres, mas continuavam sob o controle dos senhores.", tom: "lei" },
  { ano: "1885", emoji: "👴", titulo: "Lei do Sexagenário", texto: "Libertava os escravizados com mais de 60 anos, mas poucos chegavam a essa idade.", tom: "lei" },
  { ano: "1888", emoji: "🕊️", titulo: "Lei Áurea", texto: "Fim da escravidão no Brasil, o último país da América a aboli-la. Os libertos não receberam nenhum apoio.", tom: "lei" },
  { ano: "1889", emoji: "🏛️", titulo: "Proclamação da República", texto: "Termina o Império e o Brasil se torna uma República.", tom: "fato" },
];

const eventosDeficiencia: Evento[] = [
  { ano: "Egito Antigo", emoji: "🏺", titulo: "Respeito no Egito", texto: "Havia pessoas com deficiência em vários cargos. O Papiro de Amenemope ensinava a não zombar de pessoas com deficiência visual ou física." },
  { ano: "Grécia e Roma", emoji: "🛡️", titulo: "Rejeição em Esparta e Roma", texto: "Em sociedades voltadas para a guerra, como Esparta, crianças com deficiência física eram rejeitadas e até mortas. Uma crueldade que hoje sabemos ser totalmente errada." },
  { ano: "Idade Média", emoji: "⛪", titulo: "“Castigo divino”", texto: "Na Europa, muita gente achava que a deficiência era um castigo de Deus, e que a pessoa devia conviver com ela para pagar seus pecados." },
  { ano: "Século XIX", emoji: "🎪", titulo: "Curiosidade e horror", texto: "Na Europa, pessoas com deficiência eram expostas em feiras e praças como entretenimento. Um tratamento desumano." },
  { ano: "Século XX", emoji: "🩺", titulo: "Olhar médico", texto: "A medicina passa a estudar as causas das deficiências e a buscar tratamentos para uma vida digna." },
  { ano: "Após 1945", emoji: "🕊️", titulo: "Depois da 2ª Guerra Mundial", texto: "Muitas pessoas voltaram da guerra feridas ou traumatizadas. A Europa passa a pensar em inclusão: como trazer essas pessoas de volta ao trabalho e à sociedade." },
  { ano: "1971 e 1975", emoji: "🇺🇳", titulo: "Primeiras declarações da ONU", texto: "Declarações garantem cuidado médico, proteção e igualdade, mas ainda seguem o “modelo biomédico” (a deficiência como problema da pessoa)." },
  { ano: "1994", emoji: "🏫", titulo: "Declaração de Salamanca", texto: "A ONU defende a inclusão escolar: as escolas é que devem se adaptar às necessidades dos alunos com deficiência." },
  { ano: "2006", emoji: "🤝", titulo: "Convenção sobre os Direitos da Pessoa com Deficiência", texto: "Adota o termo “pessoa com deficiência” e o modelo social: são as barreiras da sociedade que precisam ser eliminadas." },
];

const topicos: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "democracia",
    subject: "hist",
    emoji: "🗳️",
    title: "Democracia",
    subtitle: "O povo escolhe quem governa",
    summary: "Democracia é um jeito de organizar o governo em que o povo tem o direito de escolher seus líderes pelo voto.",
    narration:
      "Democracia é um jeito de organizar o governo de um país em que o povo tem o direito de escolher seus líderes. As pessoas votam para decidir quem vai governar, fazer as leis e cuidar da cidade, do estado e do país. Existem outros tipos de governo: na ditadura, uma pessoa ou um grupo pequeno manda sozinho e ninguém pode escolher; na monarquia, quem governa é um rei ou uma rainha. Há dois tipos principais de democracia: a direta, em que todos votam em todas as decisões, e a representativa, em que o povo escolhe representantes. O Brasil é uma democracia representativa. Votamos para vereadores, prefeitos, deputados, governadores, senadores e presidente. Se os representantes não fizerem um bom trabalho, podemos trocá-los nas eleições seguintes. Viver numa democracia é ter liberdade de expressão, poder votar e ser votado, respeitar as regras e conviver com as diferenças.",
    body: () => (
      <>
        <Section emoji="🤔" title="O que é democracia?" accent={HIST}
          narration="Democracia é um jeito de organizar o governo de um país em que o povo tem o direito de escolher seus líderes. A palavra vem do grego: demos quer dizer povo, e kratos quer dizer poder. Então democracia é o poder do povo.">
          <p>
            <b>Democracia</b> é um jeito de organizar o governo de um país em que <b>o povo tem o direito de escolher seus líderes</b>. As pessoas <b>votam</b> para decidir quem vai governar, fazer as leis e cuidar da cidade, do estado e do país.
          </p>
          <Callout kind="sabia" title="De onde vem a palavra?">
            “Democracia” vem do grego: <b>demos</b> = povo e <b>kratos</b> = poder. Ou seja: <b>o poder do povo</b>!
          </Callout>
        </Section>

        <Section emoji="🏛️" title="Quem manda? Os tipos de governo" accent={HIST}
          narration="Existem vários tipos de governo no mundo. Na democracia, o povo escolhe. Na ditadura, uma pessoa ou um grupo pequeno manda sozinho e ninguém pode escolher. Na monarquia, quem governa é um rei ou uma rainha. Toque nos botões para comparar.">
          <p>Existem vários tipos de governo no mundo. Toque nos botões para comparar:</p>
          <QuemGoverna />
          <h3 className="k-h3">Pratique: democracia, ditadura ou monarquia?</h3>
          <Sorter
            id="tipos-governo"
            accent={HIST}
            buckets={["Democracia", "Ditadura", "Monarquia"]}
            items={[
              { text: "O povo vota para escolher o presidente.", answer: 0 },
              { text: "Um grupo pequeno toma o poder e proíbe as eleições.", answer: 1 },
              { text: "O filho do rei herda a coroa.", answer: 2 },
              { text: "Se o governante não fizer um bom trabalho, o povo pode trocá-lo na próxima eleição.", answer: 0 },
              { text: "Ninguém pode reclamar ou dar sua opinião sobre o governo.", answer: 1 },
            ]}
          />
        </Section>

        <Section emoji="✋" title="Democracia direta x representativa" accent={HIST}
          narration="Existem dois tipos principais de democracia. Na democracia direta, todos votam em todas as decisões. Na democracia representativa, o povo escolhe pessoas para representá-lo, e elas tomam as decisões. O Brasil é uma democracia representativa, porque nem sempre é possível que todos participem diretamente de todas as decisões.">
          <DiretaRepresentativa />
          <CardGrid>
            <Card emoji="✋" title="Democracia direta" tone="#fdf0e6">
              <b>Todos</b> votam em <b>todas</b> as decisões. Era assim na Atenas antiga.
            </Card>
            <Card emoji="🧑‍💼" title="Democracia representativa" tone="#fbe6dc">
              O povo <b>escolhe representantes</b> para tomar decisões em seu nome. <b>É o caso do Brasil!</b>
            </Card>
          </CardGrid>
          <Callout kind="dica" title="Por que escolher representantes?">
            Imagine o Brasil inteiro, com mais de 200 milhões de pessoas, votando em <b>cada</b> lei! Não daria certo. Por isso escolhemos <b>pessoas de confiança</b> para nos representar.
          </Callout>
        </Section>

        <Section emoji="🗳️" title="Em quem votamos no Brasil?">
          <QuemElegemos />
          <Callout kind="atencao" title="Representante tem deveres!">
            Os representantes devem <b>ouvir a população</b>, <b>respeitar as leis</b> e trabalhar para melhorar a vida de todos. Se não fizerem um bom trabalho, <b>podemos trocá-los nas eleições seguintes</b>.
          </Callout>
        </Section>

        <Section emoji="🌈" title="Viver em democracia é…">
          <CardGrid min={170}>
            <Card emoji="💬" title="Liberdade de expressão">Poder dar sua opinião.</Card>
            <Card emoji="🗳️" title="Votar e ser votado">Escolher representantes e poder ser candidato.</Card>
            <Card emoji="📏" title="Respeitar as regras">As leis valem para todos.</Card>
            <Card emoji="🤝" title="Conviver com as diferenças">Respeitar quem pensa diferente.</Card>
          </CardGrid>
          <Callout kind="lembre" title="Criança também participa!">
            Você pode participar estudando, conhecendo seus <b>direitos e deveres</b>, votando no representante de turma e dando sua opinião com respeito. No Brasil, a partir dos <b>16 anos</b> já se pode votar!
          </Callout>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Democracia", "Governo em que o povo escolhe seus líderes pelo voto."],
              ["Ditadura", "Governo em que uma pessoa ou um grupo pequeno manda sozinho, sem eleições livres."],
              ["Monarquia", "Governo de um rei ou de uma rainha."],
              ["Democracia direta", "Todos votam em todas as decisões."],
              ["Democracia representativa", "O povo escolhe representantes para decidir por ele."],
              ["Eleição", "Momento em que as pessoas votam para escolher seus representantes."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "participacao-politica",
    subject: "hist",
    emoji: "🏺",
    title: "Ampliação da participação política",
    subtitle: "Da Grécia Antiga à Revolução Francesa",
    summary: "Ao longo da história, cada vez mais pessoas conquistaram o direito de participar da política. Foi preciso muitos séculos e muita luta.",
    narration:
      "A Grécia Antiga é conhecida como o berço da democracia, porque foi em Atenas que surgiu a ideia de que todos os cidadãos poderiam participar da política. Os cidadãos se reuniam na Ágora para fazer comércio e votar em assembleias. Mas só uma pequena parte da população era considerada cidadã: homens, maiores de 18 anos, filhos de pai e mãe atenienses. Mulheres, escravizados e estrangeiros ficavam de fora. Muitos séculos depois, em 1789, aconteceu a Revolução Francesa. O povo francês se revoltou contra os privilégios dos nobres e derrubou a monarquia absolutista. Os revolucionários defendiam uma constituição para limitar o poder dos governantes e três poderes independentes: Legislativo, Executivo e Judiciário. Eles proclamaram a Declaração dos Direitos do Homem e do Cidadão. Mas essa declaração não incluiu as mulheres, e os países europeus continuaram explorando e escravizando os povos das suas colônias.",
    body: () => (
      <>
        <Section emoji="🏺" title="Grécia Antiga: o berço da democracia" accent={HIST}
          narration="A Grécia Antiga é chamada de berço da democracia porque foi em Atenas, por volta do século sexto antes de Cristo, que surgiu pela primeira vez a ideia de que todos os cidadãos poderiam participar da política. A Ágora era uma praça pública onde os cidadãos se encontravam para fazer comércio e participar de assembleias e tribunais, votando nas decisões.">
          <p>
            A <b>Grécia Antiga</b> é conhecida como o <b>berço da democracia</b>. Foi em <b>Atenas</b>, por volta do <b>século VI a.C.</b> (há mais de 2.500 anos!), que surgiu a ideia de que <b>todos os cidadãos</b> poderiam participar da política.
          </p>
          <CardGrid>
            <Card emoji="🏛️" title="A Ágora" tone="#fdf0e6">
              Era a <b>praça pública</b> de Atenas. Ali os cidadãos faziam <b>comércio</b> e participavam de <b>assembleias</b> e <b>tribunais</b>, votando nas decisões.
            </Card>
            <Card emoji="🙋" title="Cidadão responsável" tone="#fbe6dc">
              Cada cidadão se sentia <b>responsável</b> pela vida pública, porque seu voto influenciava <b>diretamente</b> as decisões. Era uma <b>democracia direta</b>.
            </Card>
          </CardGrid>
          <Callout kind="atencao" title="Mas nem todos eram cidadãos!">
            Só uma <b>pequena parte</b> da população podia participar: <b>homens</b>, <b>maiores de 18 anos</b> e <b>filhos de pai e mãe atenienses</b>. <b>Mulheres, escravizados e estrangeiros</b> não eram cidadãos. E a cidadania podia até ser <b>perdida</b> se a pessoa cometesse infrações.
          </Callout>
        </Section>

        <Section emoji="🇫🇷" title="Revolução Francesa (1789)" accent={HIST}
          narration="Em 1789, a população francesa se revoltou contra uma estrutura que garantia privilégios aos nobres, uma pequena parte da população, enquanto camponeses e comerciantes viviam na pobreza. A revolução derrubou a monarquia absolutista. Seus líderes defendiam uma constituição para limitar o poder dos governantes e três poderes independentes, que fiscalizam uns aos outros.">
          <p>
            Muitos dos valores das democracias de hoje surgiram no <b>século XVIII</b> e foram colocados em prática na <b>França</b>, depois da revolução que <b>derrubou a monarquia absolutista</b> (quando o rei manda em tudo sozinho).
          </p>
          <CardGrid>
            <Card emoji="😠" title="Por que o povo se revoltou?" tone="#fdf0e6">
              Os <b>nobres</b>, uma pequena parte da população, tinham <b>privilégios</b>, enquanto <b>camponeses e comerciantes</b> viviam na <b>pobreza</b>.
            </Card>
            <Card emoji="🏰" title="A Tomada da Bastilha" tone="#fbe6dc">
              Em <b>14 de julho de 1789</b>, o povo de Paris invadiu a Bastilha, uma prisão que simbolizava o poder do rei. É o símbolo da Revolução.
            </Card>
            <Card emoji="📘" title="Ideias novas" tone="#fdf0e6">
              Uma <b>Constituição</b> para limitar o poder dos governantes e <b>três poderes independentes</b> que se fiscalizam.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="⚖️" title="Os três poderes">
          <TresPoderes />
        </Section>

        <Section emoji="📜" title="A Declaração dos Direitos do Homem e do Cidadão" accent={HIST}
          narration="Os revolucionários proclamaram a Declaração dos Direitos do Homem e do Cidadão, inspirada nas ideias de liberdade e igualdade. Ela reconheceu direitos inalienáveis, que não podem ser retirados por nenhum governante. Mas ela não incluiu as mulheres, que continuaram sem direito ao voto. E os países europeus continuaram explorando e escravizando os povos das suas colônias, como o Haiti, a Índia, o Congo e o Egito.">
          <p>
            Inspirada nas ideias de <b>liberdade</b> e <b>igualdade</b>, a Declaração reconheceu que os homens têm <b>direitos inalienáveis</b>: direitos que <b>nenhum governante pode tirar</b>.
          </p>
          <CardGrid>
            <Card emoji="✅" title="O que mudou" tone="#e6f6ef">Direitos que não podem ser retirados por autoridades ou governantes. Uma ideia revolucionária para a época!</Card>
            <Card emoji="❌" title="Quem ficou de fora" tone="#fdecea">
              As <b>mulheres</b> continuaram sem direito à participação política e ao voto. E os povos das <b>colônias</b> (Haiti, Índia, Congo, Egito, ilhas do Caribe e do Pacífico…) continuaram explorados e escravizados.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="📈" title="Quem podia votar em cada época?" accent={HIST}
          narration="Veja como a participação política foi aumentando com o tempo. Na Atenas antiga e na França de 1789, só alguns homens podiam participar. No Brasil de 1824, só homens livres, com mais de 25 anos e com dinheiro. Hoje, no Brasil, todos os brasileiros a partir de 16 anos podem votar.">
          <QuemPodiaVotar />
        </Section>

        <Section emoji="📖" title="Glossário">
          <Glossary
            items={[
              ["Ágora", "Praça pública onde os cidadãos atenienses se reuniam para fazer comércio e discutir a vida da cidade."],
              ["Cidadania", "Conjunto de direitos e deveres de uma pessoa que vive em sociedade."],
              ["Constituição", "Conjunto das leis mais importantes de um país, que garante os direitos essenciais."],
              ["Direito inalienável", "Direito fundamental que não pode ser negado a ninguém, nem por um governante."],
              ["Monarquia absolutista", "O rei tem poder absoluto e não responde a ninguém."],
              ["Monarquia constitucional", "O rei precisa respeitar uma Constituição e um Congresso."],
              ["Revolução", "Mudança radical na sociedade: na política, na cultura, na economia ou na ciência."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "brasil-colonia",
    subject: "hist",
    emoji: "⛓️",
    title: "Brasil: um passado escravagista — Período Colonial",
    subtitle: "1500 a 1822",
    summary: "No Brasil Colônia, o rei de Portugal mandava em tudo e pessoas negras e indígenas foram escravizadas. Mas houve muita resistência!",
    narration:
      "Em 1500, os portugueses chegaram ao território que chamariam de Brasil e o transformaram em colônia de Portugal. Portugal era uma monarquia absolutista: todos os poderes ficavam nas mãos do rei. Não existiam cidadãos brasileiros: todos eram súditos do rei. Os privilégios, como terras e cargos, iam só para portugueses cristãos. Nesse período, as leis tratavam pessoas negras como objetos, que podiam ser compradas, vendidas e agredidas. O racismo esteve na origem da sociedade brasileira, e a escravidão foi permitida por quase 400 anos. Até hoje sentimos o efeito do racismo estrutural. Mas houve muita resistência: os quilombos, povoados formados por pessoas que fugiam da escravidão, e a Conjuração Baiana, que lutava pela República e pelo fim da escravidão.",
    body: () => (
      <>
        <Section emoji="⛵" title="Uma colônia de Portugal" accent={HIST}
          narration="Em 1500, os portugueses chegaram ao território que chamariam de Brasil e o transformaram em uma colônia de Portugal. Portugal seguia a monarquia absolutista: todos os poderes estavam nas mãos do rei. Não existiam cidadãos brasileiros. Todos eram súditos do rei de Portugal.">
          <p>
            Em <b>1500</b>, os portugueses chegaram ao território que chamariam de <b>Brasil</b> e o transformaram em uma <b>colônia de Portugal</b>.
          </p>
          <CardGrid>
            <Card emoji="👑" title="Monarquia absolutista" tone="#fdf0e6">Em Portugal, <b>todos os poderes</b> estavam nas mãos do <b>rei</b>.</Card>
            <Card emoji="🙇" title="Súditos, não cidadãos" tone="#fbe6dc">Não existiam <b>cidadãos brasileiros</b>: todos eram <b>súditos</b> do rei de Portugal.</Card>
            <Card emoji="🩸" title="“Pureza de sangue”" tone="#fdf0e6">
              Terras e cargos iam só para <b>portugueses cristãos</b>. Ficavam de fora os <b>cristãos-novos</b> (judeus e muçulmanos convertidos), os <b>indígenas</b> e os <b>africanos escravizados</b>.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="🕰️" title="Linha do tempo do Período Colonial">
          <LinhaHistoria eventos={eventosColonia} />
        </Section>

        <Section emoji="⚠️" title="Pessoas tratadas como objetos" accent={HIST}
          narration="Nesse período, as leis separavam pessoas e não pessoas. Essa discriminação se baseava na raça. Pessoas negras eram consideradas objetos: podiam ser compradas, vendidas e agredidas, sem que isso fosse crime. O racismo esteve na origem da formação da sociedade brasileira e a escravidão foi permitida por lei por quase 400 anos. Até hoje sentimos os efeitos do racismo estrutural, um preconceito racial enraizado na sociedade.">
          <p>
            Nesse período, as leis separavam “pessoas” e “não pessoas”. Essa <b>discriminação</b> era baseada na <b>raça</b>: pessoas negras eram tratadas como <b>objetos</b>, que podiam ser compradas, vendidas e agredidas sem que isso fosse considerado crime.
          </p>
          <QuaseQuatrocentos />
          <Callout kind="lembre" title="O que é racismo estrutural?">
            É um <b>preconceito racial enraizado</b> na sociedade, como a raiz de uma árvore escondida embaixo da terra. Ele vem da época da escravidão e ainda aparece hoje, por exemplo, quando pessoas negras têm menos oportunidades. Combater o racismo é dever de <b>todos</b>.
          </Callout>
        </Section>

        <Section emoji="✊" title="Resistência: as lutas por liberdade" accent={HIST}
          narration="Houve muitas tentativas de mudar a sociedade no período colonial. Os quilombos eram povoados formados por pessoas escravizadas que conseguiam fugir. Eles se tornaram espaços de refúgio e de luta pela liberdade. A Conjuração Baiana foi um movimento com grande participação popular, em Salvador, que reuniu negros e mestiços, livres e escravizados. Eles queriam a República e o fim da escravidão. Esses movimentos foram duramente reprimidos e seus líderes foram perseguidos e mortos.">
          <p>As pessoas escravizadas <b>nunca aceitaram</b> a escravidão. Houve muitas tentativas de mudar a sociedade:</p>
          <CardGrid>
            <Card emoji="🛖" title="Quilombos" tone="#fdf0e6">
              Povoados formados por pessoas escravizadas que <b>conseguiam fugir</b>. Viraram espaços de <b>refúgio</b> e de <b>luta por liberdade</b>. O mais famoso foi o <b>Quilombo dos Palmares</b>, em Alagoas, liderado por <b>Zumbi</b>.
            </Card>
            <Card emoji="✊" title="Conjuração Baiana (1798)" tone="#fbe6dc">
              Movimento com <b>grande participação popular</b> em <b>Salvador</b>, reunindo <b>negros e mestiços, livres e escravizados</b>. Queriam a <b>Proclamação da República</b> e o <b>fim da escravidão</b>.
            </Card>
          </CardGrid>
          <Callout kind="atencao">Esses movimentos foram <b>duramente reprimidos</b>: seus líderes foram perseguidos e mortos.</Callout>
          <Callout kind="sabia" title="20 de novembro">
            O <b>Dia da Consciência Negra</b> é comemorado em 20 de novembro, data da morte de <b>Zumbi dos Palmares</b>, em 1695. O Quilombo dos Palmares ficava na Serra da Barriga, em <b>Alagoas</b>, o nosso estado!
          </Callout>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Colônia", "Território dominado e explorado por outro país."],
              ["Súdito", "Pessoa que obedece a um rei, sem direitos de cidadão."],
              ["Escravizado", "Pessoa forçada a trabalhar sem liberdade e sem pagamento. Dizemos “escravizado” porque ninguém nasce escravo: a escravidão foi imposta."],
              ["Quilombo", "Povoado formado por pessoas que fugiram da escravidão."],
              ["Racismo estrutural", "Preconceito racial enraizado na sociedade."],
              ["Cristãos-novos", "Judeus e muçulmanos que tinham sido convertidos ao cristianismo."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "brasil-imperio",
    subject: "hist",
    emoji: "👑",
    title: "Brasil: um passado escravagista — Período Imperial",
    subtitle: "1822 a 1889 e o fim da escravidão",
    summary: "No Império o Brasil teve sua primeira Constituição, mas poucos podiam votar. A escravidão só acabou em 1888, depois de muita luta.",
    narration:
      "Em 1808, a família real portuguesa se mudou para o Brasil, fugindo do exército de Napoleão. Em 1821, o rei Dom João sexto voltou a Portugal, mas deixou seu filho, Dom Pedro primeiro, que proclamou a Independência do Brasil em 7 de setembro de 1822 e se tornou imperador. O regime passou a ser a monarquia constitucional, com um Congresso e uma Constituição. A Constituição de 1824 foi a primeira do Brasil, mas só homens livres, maiores de 25 anos e com dinheiro podiam votar. Em 1835 aconteceu a Revolta dos Malês, a maior revolta de escravizados do Brasil. O fim da escravidão foi lento e gradual: a Lei do Ventre Livre, em 1871, a Lei do Sexagenário, em 1885, e a Lei Áurea, em 1888, que acabou com a escravidão, mas sem dar nenhum apoio às pessoas libertas. O Brasil foi o último país da América a abolir a escravidão.",
    body: () => (
      <>
        <Section emoji="🕰️" title="Linha do tempo do Período Imperial">
          <LinhaHistoria eventos={eventosImperio} />
        </Section>

        <Section emoji="🇧🇷" title="A família real e a Independência" accent={HIST}
          narration="A família real portuguesa se mudou para o Brasil em 1808, fugindo do exército de Napoleão, da França. A presença do rei no Brasil fortaleceu a vontade de independência. Em 1821, Dom João sexto voltou para Portugal, mas deixou aqui seu filho, Dom Pedro primeiro, que proclamou a Independência em 7 de setembro de 1822 e se tornou imperador.">
          <CardGrid>
            <Card emoji="🚢" title="1808: a família real chega" tone="#fdf0e6">Fugindo do exército de <b>Napoleão</b>, da França, a família real portuguesa se muda para o Brasil.</Card>
            <Card emoji="↩️" title="1821: D. João VI volta" tone="#fbe6dc">Pressionado pelos portugueses, o rei volta a Portugal, mas deixa seu filho, <b>D. Pedro I</b>.</Card>
            <Card emoji="🇧🇷" title="7 de setembro de 1822" tone="#fdf0e6">D. Pedro I proclama a <b>Independência do Brasil</b> e se torna <b>imperador</b>.</Card>
          </CardGrid>
          <Callout kind="dica" title="Monarquia absolutista x constitucional">
            Na <b>absolutista</b>, o rei manda em tudo sozinho. Na <b>constitucional</b> (a do Brasil Império), havia um <b>Congresso</b> com deputados e senadores eleitos e uma <b>Constituição</b> garantindo direitos.
          </Callout>
        </Section>

        <Section emoji="📜" title="A Constituição de 1824" accent={HIST}
          narration="A Constituição de 1824 foi a primeira Constituição brasileira. Ela reconheceu a existência de cidadãos brasileiros. Mas o voto era só para homens livres ou libertos, nascidos no Brasil, maiores de 25 anos e com renda acima de 100 mil réis. Para ser candidato a deputado ou senador, era preciso ter renda acima de 400 mil réis e ser católico, e os libertos não podiam se candidatar.">
          <p>Foi a <b>primeira Constituição</b> do Brasil e reconheceu a existência de <b>cidadãos brasileiros</b>. Mas veja quem podia participar:</p>
          <div className="k-vs">
            <div>
              <span className="k-vs-tag">PARA VOTAR 🗳️</span>
              <p>Homens <b>livres ou libertos</b>, nascidos no Brasil, <b>maiores de 25 anos</b>, com renda acima de <b>100 mil réis</b> por ano.</p>
            </div>
            <div>
              <span className="k-vs-tag">PARA SER CANDIDATO 🎤</span>
              <p>Homens <b>livres</b>, maiores de 25 anos, com renda acima de <b>400 mil réis</b> e <b>católicos</b>. Os <b>libertos não podiam</b>.</p>
            </div>
          </div>
          <Callout kind="atencao" title="Quem ficava de fora?">
            <b>Mulheres</b>, <b>pessoas escravizadas</b>, <b>pobres</b> e jovens com menos de 25 anos. Ou seja: a maioria da população!
          </Callout>
        </Section>

        <Section emoji="✊" title="Revolta dos Malês (1835)">
          <p>
            Foi a <b>maior revolta de escravizados</b> do Brasil, em <b>Salvador</b>. Centenas de <b>africanos muçulmanos</b> (os <b>malês</b>), escravizados e libertos, se revoltaram. A revolta foi <b>duramente reprimida</b>, com mortes, prisões, açoites e deportações.
          </p>
        </Section>

        <Section emoji="🕊️" title="O longo caminho até o fim da escravidão" accent={HIST}
          narration="O fim da escravidão no Brasil foi um processo longo e gradual. Ao mesmo tempo que cresciam as revoltas e a pressão de outros países, as elites que lucravam com a escravidão tentavam atrasar o fim. Por isso o Brasil foi o último país da América a abolir a escravidão. Toque nos cartões para ver o que cada lei dizia e o que aconteceu na prática.">
          <p>
            O fim da escravidão foi um processo <b>longo e gradual</b>. Enquanto cresciam as <b>revoltas</b> e a <b>pressão de outros países</b>, as <b>elites</b> que lucravam com a escravidão tentavam <b>atrasar</b> o fim. Toque nos cartões:
          </p>
          <LeisPapelPratica />
          <Callout kind="lembre" title="O Brasil foi o último!">
            O Brasil foi o <b>último país da América</b> a abolir a escravidão. E, sem apoio depois da Lei Áurea, muitas pessoas libertas foram morar em moradias improvisadas e morros. Isso se liga ao que estudamos em Geografia sobre a <b>cidade invisível</b>.
          </Callout>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Independência", "Quando um país deixa de ser colônia e passa a se governar."],
              ["Imperador", "Chefe de um império, como D. Pedro I."],
              ["Liberto", "Pessoa que foi escravizada e conseguiu a liberdade."],
              ["Abolição", "Fim da escravidão (Lei Áurea, 1888)."],
              ["Indenização", "Pagamento para “compensar” uma perda."],
              ["Malês", "Africanos muçulmanos que viviam na Bahia."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "pessoa-com-deficiencia",
    subject: "hist",
    emoji: "♿",
    title: "Direito da Pessoa com Deficiência",
    subtitle: "Do preconceito à inclusão",
    summary: "Ao longo da história, as pessoas com deficiência foram tratadas de formas muito diferentes. Hoje sabemos que é a sociedade que deve tirar as barreiras.",
    narration:
      "Ao longo da história, as pessoas com deficiência foram vistas de formas muito diferentes. No Egito Antigo, elas ocupavam vários cargos, e um documento ensinava a não zombar delas. Já em Esparta e em Roma, crianças com deficiência eram rejeitadas e até mortas. Na Idade Média, muita gente achava que a deficiência era um castigo divino. No século dezenove, pessoas com deficiência eram expostas em feiras. No século vinte, a medicina passou a estudar as deficiências. Depois da Segunda Guerra Mundial, muitas pessoas voltaram feridas, e a Europa passou a pensar em inclusão. A ONU criou declarações em 1971 e 1975, mas elas ainda seguiam o modelo biomédico, que via a deficiência como um problema da pessoa. Os movimentos sociais defenderam o modelo social: é a sociedade que precisa eliminar as barreiras. Em 1994, a Declaração de Salamanca defendeu a inclusão escolar. Em 2006, a Convenção sobre os Direitos da Pessoa com Deficiência adotou o termo pessoa com deficiência, que coloca a pessoa em primeiro lugar.",
    body: () => (
      <>
        <Section emoji="🕰️" title="Como as pessoas com deficiência foram vistas na história?" accent={HIST}
          narration="Ao longo da história, cada sociedade tratou a deficiência de um jeito, dependendo dos seus valores. Toque nos marcos da linha do tempo para conhecer cada época.">
          <p>Cada sociedade tratou a deficiência de um jeito, dependendo dos seus <b>valores</b>. Toque nos marcos para conhecer cada época:</p>
          <LinhaHistoria eventos={eventosDeficiencia} />
          <Callout kind="sabia" title="O Papiro de Amenemope">
            É um documento do <b>Egito Antigo</b> com instruções sobre como se comportar. Uma delas: <b>não zombar</b> de uma pessoa com deficiência visual ou física. Um ensinamento de mais de 3.000 anos que continua valendo!
          </Callout>
        </Section>

        <Section emoji="🌍" title="A conquista dos direitos">
          <p>
            Depois da <b>Segunda Guerra Mundial</b> (1939–1945), muitas pessoas voltaram com o corpo ferido, membros amputados ou traumatizadas. A Europa passou a pensar em <b>inclusão</b>: como trazer essas pessoas de volta ao trabalho e à sociedade?
          </p>
          <CardGrid min={200}>
            <Card emoji="🇺🇳" title="1971 — ONU" tone="#fdf0e6">Declaração dos Direitos da Pessoa com Deficiência Mental: o <b>primeiro documento internacional</b> sobre o tema (cuidado médico, proteção e igualdade).</Card>
            <Card emoji="📄" title="1975 — ONU" tone="#fbe6dc">Declaração dos Direitos das Pessoas Portadoras de Deficiência, que depois virou lei.</Card>
            <Card emoji="🏫" title="1994 — Salamanca" tone="#fdf0e6">A ONU defende a <b>inclusão escolar</b>: as escolas é que devem se adaptar aos alunos.</Card>
            <Card emoji="🤝" title="2006 — Convenção" tone="#fbe6dc">Adota o termo <b>“pessoa com deficiência”</b> e o <b>modelo social</b>.</Card>
          </CardGrid>
        </Section>

        <Section emoji="🔄" title="Modelo biomédico x modelo social" accent={HIST}
          narration="As declarações de 1971 e 1975 foram avanços, mas viam a deficiência como uma doença da pessoa, que precisava ser tratada para ela se adaptar à sociedade. Isso se chama modelo biomédico. Os movimentos sociais e as associações de pessoas com deficiência defenderam o modelo social: em vez de a pessoa se adaptar, a sociedade precisa criar condições para que todos participem. Experimente remover as barreiras da escola!">
          <p>
            Os <b>movimentos sociais</b> e as associações de pessoas com deficiência lutaram por uma nova forma de pensar. Compare os dois modelos e, no modelo social, <b>remova as barreiras</b> da escola:
          </p>
          <RemoveBarreiras />
          <Callout kind="lembre" title="A grande ideia">
            A deficiência pode ser uma condição do corpo de <b>qualquer ser humano</b>. O que transforma isso em exclusão são as <b>barreiras da sociedade</b>. Por isso, <b>toda a sociedade</b> deve se esforçar para eliminá-las.
          </Callout>
        </Section>

        <Section emoji="💬" title="Como dizer? As palavras importam" accent={HIST}
          narration="A Convenção de 2006 trocou o termo pessoas portadoras de deficiência por pessoas com deficiência, porque portar dá a ideia de algo que se pode carregar ou largar quando quiser. Também rejeitou o termo pessoas com necessidades especiais, que passava a ideia de que essas pessoas não poderiam conviver em sociedade. O termo pessoa com deficiência coloca a pessoa antes da deficiência.">
          <p>O termo correto é <b>“pessoa com deficiência”</b>, porque coloca a <b>pessoa antes</b> da deficiência.</p>
          <CardGrid>
            <Card emoji="❌" title="“Portador de deficiência”" tone="#fdecea">“Portar” é carregar algo que se pode largar quando quiser. A deficiência não é assim.</Card>
            <Card emoji="❌" title="“Pessoa com necessidades especiais”" tone="#fdecea">Passava a ideia de que essas pessoas não poderiam conviver em sociedade.</Card>
            <Card emoji="✅" title="“Pessoa com deficiência”" tone="#e6f6ef">A pessoa vem primeiro! É o termo usado desde a Convenção de 2006.</Card>
          </CardGrid>
          <h3 className="k-h3">Pratique: use ou evite?</h3>
          <Sorter
            id="termos-deficiencia"
            accent={HIST}
            buckets={["✅ Use", "❌ Evite"]}
            items={[
              { text: "Pessoa com deficiência", answer: 0 },
              { text: "Portador de deficiência", answer: 1 },
              { text: "Pessoa com necessidades especiais", answer: 1 },
              { text: "Pessoa com deficiência visual", answer: 0 },
              { text: "Fazer piada sobre a deficiência de alguém (capacitismo)", answer: 1 },
            ]}
          />
          <Callout kind="dica" title="O que é capacitismo?">
            É o <b>preconceito contra pessoas com deficiência</b>, como achar que elas são incapazes. Assim como o racismo, precisa ser combatido.
          </Callout>
        </Section>

        <Section emoji="📖" title="Glossário">
          <Glossary
            items={[
              ["Casamento consanguíneo", "Casamento entre parentes muito próximos, que aumenta a chance de herdar doenças raras."],
              ["Movimentos sociais", "Grupos de pessoas que lutam por direitos ou por uma causa social e política."],
              ["Modelo biomédico", "Vê a deficiência como doença da pessoa, que precisa se adaptar."],
              ["Modelo social", "Vê as barreiras da sociedade como o problema a ser resolvido."],
              ["Inclusão", "Garantir que todas as pessoas participem, sem ninguém ficar de fora."],
              ["Capacitismo", "Preconceito contra pessoas com deficiência."],
              ["ONU", "Organização das Nações Unidas, que reúne quase todos os países do mundo."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "revisao-historia",
    subject: "hist",
    emoji: "🧭",
    title: "Revisão geral de História",
    subtitle: "Mapa mental + simulado",
    summary: "Toda a Unidade 3 de História resumida num mapa mental, com um simulado de 20 questões para treinar para a prova.",
    narration:
      "Vamos revisar a Unidade 3 de História: ampliação da participação política e conquista de direitos. A democracia é o governo em que o povo escolhe seus líderes, e o Brasil é uma democracia representativa. A participação política foi aumentando ao longo da história: na Atenas antiga e na Revolução Francesa, muitas pessoas ficavam de fora. No Brasil, a escravidão durou quase 400 anos, e houve muita resistência, como os quilombos, a Conjuração Baiana e a Revolta dos Malês, até a Lei Áurea, em 1888. E as pessoas com deficiência conquistaram direitos com o modelo social, que diz que a sociedade deve tirar as barreiras. A ideia que liga tudo é que os direitos foram conquistados com muita luta, e que devemos continuar lutando para que ninguém fique de fora.",
    body: () => (
      <>
        <Section emoji="🧠" title="Mapa mental da Unidade 3">
          <div className="k-mindmap">
            <div className="k-mind-center">Ampliação da participação política e conquista de direitos</div>
            <div className="k-mind-branches">
              <div><b>🗳️ Democracia</b><span>povo escolhe · direta x representativa · Brasil = representativa · ditadura e monarquia</span></div>
              <div><b>🏺 Participação política</b><span>Atenas (Ágora) · Revolução Francesa (1789) · três poderes · Declaração dos Direitos</span></div>
              <div><b>⛓️ Brasil escravagista</b><span>Colônia (1500–1822) · quilombos · Conjuração Baiana · Império · Constituição de 1824 · Malês · Lei Áurea (1888)</span></div>
              <div><b>♿ Pessoa com deficiência</b><span>Egito, Esparta, Idade Média · ONU · modelo biomédico x social · Salamanca (1994) · Convenção (2006)</span></div>
            </div>
          </div>
          <Callout kind="lembre" title="A ideia que liga tudo">
            Os direitos que temos hoje <b>não caíram do céu</b>: foram conquistados com <b>muita luta</b>, e a cada época mais pessoas passaram a participar. Ainda há barreiras a derrubar, e todos podemos ajudar.
          </Callout>
        </Section>

        <Section emoji="📅" title="Como estudar para a prova">
          <CardGrid min={180}>
            <Card emoji="⏰" title="Faça uma rotina">Estude um pouquinho todo dia, no mesmo horário.</Card>
            <Card emoji="📖" title="Leia os textos">Democracia, Brasil escravagista e Direito da Pessoa com Deficiência.</Card>
            <Card emoji="✍️" title="Faça resumos">Anote as datas e o que cada uma significa.</Card>
            <Card emoji="🙋" title="Tire dúvidas">Pergunte aos professores o que não entendeu.</Card>
          </CardGrid>
        </Section>
      </>
    ),
  },
];

// No fim de cada assunto: 20 questões de revisão.
export const historia: Topic[] = topicos.map((topico) => ({ ...topico, quiz: questoesHistoria[topico.id] }));
