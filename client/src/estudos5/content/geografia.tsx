import type { Topic } from "../types";
import { questoesGeografia } from "./questoes-geografia";
import { Bars, Callout, Card, CardGrid, Flow, Glossary, Section } from "../ui";

const GEO = "#1f9d7a";

const topicos: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "saneamento",
    subject: "geo",
    emoji: "💧",
    title: "Saneamento básico, saúde e qualidade de vida",
    subtitle: "Água limpa, esgoto, lixo e saúde",
    summary: "Saneamento básico é o conjunto de serviços que cuida da água, do esgoto e do lixo para que as pessoas vivam com saúde.",
    narration:
      "Saneamento básico é um conjunto de serviços que existe para proteger a nossa saúde. Ele tem quatro partes: água potável, que é a água limpa e tratada que podemos beber; coleta e tratamento do esgoto, que leva embora a água suja do banheiro e da cozinha; coleta e destino certo do lixo; e o controle de bichos que transmitem doenças, como o mosquito da dengue e os ratos. Quando falta saneamento, aparecem doenças como diarreia, cólera e hepatite A. A Organização Mundial da Saúde diz que, todo ano, mais de 1,7 milhão de pessoas morrem por causa de água contaminada e saneamento ruim. Por isso, o governo precisa investir em saneamento para todos, e cada um de nós também pode ajudar: economizando água, lavando as mãos e jogando o lixo no lugar certo.",
    body: () => (
      <>
        <Section emoji="🤔" title="O que é saneamento básico?" accent={GEO}
          narration="Imagine a sua casa. Você abre a torneira e sai água limpa. Você dá descarga e a água suja vai embora. O caminhão passa e leva o lixo. Tudo isso parece mágica, mas não é. É o saneamento básico funcionando. Saneamento básico é um conjunto de serviços e ações que têm um objetivo: garantir a saúde e a qualidade de vida das pessoas.">
          <p>
            Imagine a sua casa: você abre a torneira e sai <b>água limpa</b>. Você dá a descarga e a <b>água suja vai embora</b>. O caminhão passa e <b>leva o lixo</b>. Parece mágica, mas não é: é o <b>saneamento básico</b> funcionando!
          </p>
          <p>
            <b>Saneamento básico</b> é um conjunto de <b>serviços e ações</b> que têm um grande objetivo: <b>garantir a saúde e a qualidade de vida</b> da população.
          </p>
          <Callout kind="lembre">
            <b>Qualidade de vida</b> é ter o que a gente precisa para viver bem: saúde, casa, comida, escola, segurança, lazer e um ambiente limpo.
          </Callout>
        </Section>

        <Section emoji="🧱" title="As 4 partes do saneamento básico">
          <CardGrid>
            <Card emoji="🚰" title="1. Água potável" tone="#e6f4fb">
              É a água <b>tratada</b>, limpa e segura para beber, cozinhar e tomar banho. A palavra <i>potável</i> quer dizer “que pode ser bebida”.
            </Card>
            <Card emoji="🚽" title="2. Esgoto coletado e tratado" tone="#f1eefc">
              O esgoto é a água suja que sai do vaso sanitário, da pia e do chuveiro. Ele precisa ir por canos até uma <b>estação de tratamento</b>, e não correr pela rua ou para os rios.
            </Card>
            <Card emoji="🗑️" title="3. Coleta do lixo" tone="#fff4dc">
              O lixo (os <b>resíduos sólidos</b>) precisa ser recolhido e levado para um lugar adequado, como um <b>aterro sanitário</b> ou a <b>reciclagem</b>.
            </Card>
            <Card emoji="🦟" title="4. Controle de vetores e higiene" tone="#fdecea">
              <b>Vetores</b> são bichos que espalham doenças, como o mosquito <i>Aedes aegypti</i> (dengue), ratos e baratas. Também faz parte cuidar da <b>higiene</b> das pessoas e do ambiente.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="🔄" title="A viagem da água até a sua casa (e de volta)"
          narration="Vamos acompanhar a viagem da água. Primeiro, a água é retirada de um rio ou de uma represa. Depois, ela vai para uma estação de tratamento, onde é limpa. Em seguida, viaja por canos até as casas. Depois de usada, ela vira esgoto e vai por outros canos até uma estação de tratamento de esgoto. Lá ela é limpa de novo e só então pode voltar para a natureza.">
          <Flow
            steps={[
              { emoji: "🏞️", text: "A água é retirada de um rio ou represa" },
              { emoji: "🏭", text: "Vai para a estação de tratamento e fica limpinha" },
              { emoji: "🏠", text: "Chega pelos canos na sua casa" },
              { emoji: "🚿", text: "Depois de usada, vira esgoto" },
              { emoji: "♻️", text: "O esgoto é tratado e a água volta limpa para a natureza" },
            ]}
          />
          <Callout kind="sabia">
            Uma parte importante desse caminho não aparece: os canos ficam <b>embaixo da terra</b>! Por isso, às vezes a gente nem percebe quando um bairro <b>não tem</b> rede de esgoto.
          </Callout>
        </Section>

        <Section emoji="🤒" title="Por que a falta de saneamento deixa as pessoas doentes?" accent={GEO}
          narration="Quando não há saneamento, o esgoto corre a céu aberto e o lixo se acumula. Isso suja o solo, os rios e a água que as pessoas usam. Aí aparecem doenças como diarreia, cólera e hepatite A. Segundo a Organização Mundial da Saúde, mais de 1,7 milhão de pessoas morrem por ano por causa de água contaminada e saneamento inadequado.">
          <p>Veja o que acontece, passo a passo, quando um lugar <b>não tem</b> saneamento:</p>
          <Flow
            steps={[
              { emoji: "🕳️", text: "O esgoto corre a céu aberto e o lixo se acumula" },
              { emoji: "🌊", text: "Isso suja o solo, os rios e a água" },
              { emoji: "🦠", text: "Micróbios e bichos que transmitem doenças se multiplicam" },
              { emoji: "🤢", text: "As pessoas ficam doentes" },
            ]}
          />
          <CardGrid min={180}>
            <Card emoji="💩" title="Diarreia">Muito comum quando a água ou a comida estão contaminadas.</Card>
            <Card emoji="🦠" title="Cólera">Doença grave transmitida por água suja.</Card>
            <Card emoji="🟡" title="Hepatite A">Ataca o fígado; passa pela água e por alimentos contaminados.</Card>
          </CardGrid>
          <Callout kind="atencao" title="Um número que assusta">
            Segundo a <b>OMS (Organização Mundial da Saúde)</b>, todo ano <b>mais de 1,7 milhão de pessoas morrem</b> por doenças ligadas à água contaminada e ao saneamento inadequado.
          </Callout>
          <p>
            A falta de água também pode causar <b>conflitos e brigas</b> entre pessoas e regiões que disputam a mesma água. E o lixo acumulado na rua estraga a <b>qualidade do ar e da água</b>.
          </p>
        </Section>

        <Section emoji="🗑️" title="Lixão x aterro sanitário">
          <CardGrid>
            <Card emoji="❌" title="Lixão" tone="#fdecea">
              O lixo fica jogado <b>a céu aberto</b>, sem cuidado nenhum. Ele atrai bichos, solta mau cheiro e o “caldo” do lixo (o <i>chorume</i>) contamina o solo e a água. É proibido!
            </Card>
            <Card emoji="✅" title="Aterro sanitário" tone="#e6f6ef">
              É um terreno <b>preparado</b>: o chão recebe uma camada que protege o solo, o lixo é coberto com terra e o chorume é tratado. É o lugar certo para o lixo que não pode ser reciclado.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="⚖️" title="Saneamento e qualidade de vida">
          <p>Saneamento não é só sobre doença. Quando falta saneamento:</p>
          <ul className="k-list">
            <li>As pessoas ficam <b>excluídas</b>, vivendo em condições piores do que as outras;</li>
            <li>O <b>desenvolvimento humano</b> e o bem-estar das pessoas ficam prejudicados;</li>
            <li>O governo <b>gasta mais dinheiro com saúde</b> (hospitais, remédios), porque mais gente fica doente.</li>
          </ul>
          <Callout kind="sabia" title="E no Brasil?">
            Ainda há muita gente sem saneamento no nosso país: dezenas de milhões de brasileiros não recebem água tratada e quase metade da população não tem o esgoto coletado. Uma lei de 2020 (o <b>Marco Legal do Saneamento</b>) estabeleceu a meta de levar água tratada para <b>99%</b> da população e coleta e tratamento de esgoto para <b>90%</b> até <b>2033</b>.
          </Callout>
        </Section>

        <Section emoji="🙌" title="Quem deve cuidar disso?">
          <CardGrid>
            <Card emoji="🏛️" title="Os governos">
              Precisam criar <b>políticas públicas</b> (planos e ações do governo) para que <b>todas</b> as pessoas tenham água, esgoto e coleta de lixo. Isso se chama <b>acesso universal</b>.
            </Card>
            <Card emoji="👥" title="A sociedade">
              As pessoas devem <b>participar</b> e <b>acompanhar</b> o que o governo faz (isso é <b>transparência</b>), para que as necessidades de cada comunidade sejam atendidas.
            </Card>
            <Card emoji="🧒" title="Você também!">
              Feche a torneira ao escovar os dentes, lave as mãos, não jogue lixo na rua, separe o reciclável e não deixe água parada (para não criar mosquito).
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Saneamento básico", "Conjunto de serviços de água, esgoto, lixo e controle de vetores que protege a saúde."],
              ["Água potável", "Água tratada, própria para beber."],
              ["Esgoto", "Água suja que sai das casas, escolas e empresas."],
              ["Resíduos sólidos", "Nome “técnico” do lixo."],
              ["Vetores", "Animais que transmitem doenças (mosquitos, ratos, baratas)."],
              ["Políticas públicas", "Planos e ações do governo para resolver problemas da população."],
              ["OMS", "Organização Mundial da Saúde."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "educacao-moradia-seguranca",
    subject: "geo",
    emoji: "🏠",
    title: "Educação, moradia e segurança",
    subtitle: "Os três pilares do bem-estar",
    summary: "Educação, moradia e segurança são três coisas que todo mundo precisa para viver bem — e uma ajuda (ou atrapalha) a outra.",
    narration:
      "Educação, moradia e segurança são três elementos fundamentais para o desenvolvimento humano e para o bem-estar das pessoas. A educação desenvolve habilidades, abre portas para o trabalho e ensina sobre cidadania e direitos. A moradia adequada protege a saúde e a segurança da família. A segurança tem vários tipos: a segurança pública, que é responsabilidade do Estado; a segurança alimentar, que é ter comida saudável todos os dias; e a segurança no trabalho, que evita acidentes. Esses três elementos estão ligados: uma boa educação ajuda a conseguir um emprego melhor, que ajuda a ter uma casa melhor, que ajuda a criança a aprender melhor na escola. Por isso, o governo precisa cuidar dos três juntos, e cada pessoa precisa fazer a sua parte, com respeito e solidariedade.",
    body: () => (
      <>
        <Section emoji="🪑" title="Um banquinho de três pernas" accent={GEO}
          narration="Pense num banquinho de três pernas. Se uma perna quebrar, o banquinho cai. A qualidade de vida funciona parecido: ela se apoia em três pernas importantes, que são a educação, a moradia e a segurança. Cada uma tem um papel, e elas estão ligadas entre si.">
          <p>
            Pense num <b>banquinho de três pernas</b>. Se uma perna quebrar, o banquinho cai! A qualidade de vida funciona de um jeito parecido: ela se apoia em <b>três pernas</b> muito importantes.
          </p>
          <CardGrid min={190}>
            <Card emoji="📚" title="Educação" tone="#eaf2ff">Aprender para crescer e ter oportunidades.</Card>
            <Card emoji="🏡" title="Moradia" tone="#fff4dc">Ter uma casa digna e segura.</Card>
            <Card emoji="🛡️" title="Segurança" tone="#e6f6ef">Viver protegido e sem medo.</Card>
          </CardGrid>
          <p>
            Esses três elementos são <b>fundamentais</b> para o <b>desenvolvimento humano</b> (as pessoas crescerem com saúde, conhecimento e oportunidades) e para formar <b>comunidades saudáveis</b>.
          </p>
        </Section>

        <Section emoji="📚" title="Educação">
          <p>A educação é um dos <b>pilares</b> da formação de uma pessoa. Ela serve para:</p>
          <ul className="k-list">
            <li>Desenvolver <b>habilidades</b> (ler, calcular, pensar, conviver) necessárias para a vida em sociedade;</li>
            <li><b>Abrir portas</b> para bons trabalhos no futuro e ajudar o país a se desenvolver;</li>
            <li>Ensinar sobre <b>cidadania</b> (nossos direitos e deveres), <b>inclusão</b> (ninguém fica de fora) e <b>respeito aos direitos humanos</b>.</li>
          </ul>
        </Section>

        <Section emoji="🏡" title="Moradia">
          <p>
            Uma <b>moradia adequada</b> é uma casa segura, que não fica em área de risco (como encostas que podem deslizar), com água tratada, esgoto, luz e espaço suficiente para a família.
          </p>
          <p>
            Quando falta moradia, ou ela é <b>precária</b> (frágil, improvisada), as pessoas vivem em condições <b>insalubres</b> — ou seja, que fazem mal à saúde — e perigosas.
          </p>
          <Callout kind="lembre">Ter uma casa adequada ajuda a <b>diminuir a pobreza</b> e a <b>exclusão social</b>.</Callout>
        </Section>

        <Section emoji="🛡️" title="Segurança: são três tipos!">
          <CardGrid>
            <Card emoji="👮" title="Segurança pública">
              É a proteção das pessoas e da ordem na sociedade. É uma <b>responsabilidade do Estado</b> (governo), por meio da polícia, dos bombeiros e da Justiça, por exemplo.
            </Card>
            <Card emoji="🥗" title="Segurança alimentar">
              É ter acesso a <b>alimentos saudáveis e nutritivos</b>, em quantidade suficiente, todos os dias.
            </Card>
            <Card emoji="⛑️" title="Segurança no trabalho">
              São os cuidados para <b>evitar acidentes e doenças</b> no trabalho, como usar capacete, luvas e equipamentos de proteção.
            </Card>
          </CardGrid>
          <p>Quando falta segurança, as pessoas sentem <b>medo</b>, e a convivência entre os vizinhos fica mais difícil.</p>
        </Section>

        <Section emoji="🔗" title="Tudo está ligado!" accent={GEO}
          narration="Educação, moradia e segurança estão ligadas, como os elos de uma corrente. Uma educação de qualidade ajuda a conseguir empregos melhores. Com um emprego melhor, a família ganha mais e pode ter uma moradia adequada e segura. Morando bem, com saúde e segurança, a criança consegue aprender melhor na escola. O contrário também acontece: sem moradia adequada, a saúde e a segurança pioram, e isso atrapalha o desempenho na escola.">
          <p>Veja como uma coisa puxa a outra, como um ciclo:</p>
          <Flow
            steps={[
              { emoji: "📚", text: "Educação de qualidade" },
              { emoji: "💼", text: "Empregos melhores" },
              { emoji: "💰", text: "Mais renda para a família" },
              { emoji: "🏡", text: "Moradia adequada e segura" },
              { emoji: "😊", text: "Mais saúde e tranquilidade para aprender na escola" },
            ]}
          />
          <Callout kind="atencao" title="O caminho contrário também existe">
            Sem uma moradia adequada, a <b>saúde</b> e a <b>segurança</b> pioram — e isso pode atrapalhar o <b>desempenho na escola</b> e a capacidade de aprender.
          </Callout>
        </Section>

        <Section emoji="🧩" title="Como garantir esses direitos?">
          <ul className="k-list">
            <li><b>Políticas públicas integradas</b>: o governo precisa cuidar dos três ao mesmo tempo, porque eles estão conectados;</li>
            <li>Investir em <b>escolas de qualidade</b> que promovam inclusão;</li>
            <li>Ter <b>programas de habitação</b> para que todos tenham uma casa adequada;</li>
            <li>Cada pessoa ter <b>consciência crítica</b> do seu papel, com <b>convivência pacífica</b> e <b>solidariedade</b>.</li>
          </ul>
          <Callout kind="sabia">
            A <b>Constituição Federal do Brasil</b> (a lei mais importante do país) diz que educação, saúde, alimentação, trabalho, <b>moradia</b>, lazer e <b>segurança</b> são <b>direitos sociais</b> de todas as pessoas.
          </Callout>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Desenvolvimento humano", "Quando as pessoas têm saúde, educação e oportunidades para viver bem."],
              ["Cidadania", "Conhecer e exercer nossos direitos e deveres."],
              ["Inclusão social", "Fazer com que ninguém fique de fora."],
              ["Precário", "Frágil, improvisado, em más condições."],
              ["Insalubre", "Que faz mal à saúde."],
              ["Estado", "O governo e suas instituições."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "cidade-invisivel",
    subject: "geo",
    emoji: "🏙️",
    title: "Desigualdades sociais: a cidade invisível",
    subtitle: "Os problemas que muita gente não vê",
    summary: "A “cidade invisível” são as desigualdades das grandes cidades que muitas pessoas — e até as autoridades — não enxergam.",
    narration:
      "Cidade invisível é um nome para as desigualdades sociais das grandes cidades, que muitas vezes passam despercebidas pela maioria das pessoas. Uma dessas desigualdades é a segregação socioespacial, quando grupos de pessoas ficam separados em partes diferentes da cidade. Outra é a falta de acesso a serviços básicos, como saúde, educação, transporte e lazer, que costuma ser maior nos bairros mais pobres. A cidade invisível pode passar despercebida até pelas autoridades e pela própria população. No Brasil, as favelas começaram a se formar no fim do século dezenove, depois da abolição da escravatura e da Guerra de Canudos, quando muitas pessoas negras, sem nenhum apoio, tiveram que morar em casas improvisadas e em morros. Para combater a cidade invisível, precisamos de políticas públicas inclusivas, de uma cidade acessível para todos e de conscientização.",
    body: () => (
      <>
        <Section emoji="👀" title="Por que “invisível”?" accent={GEO}
          narration="Por que essa cidade é chamada de invisível? Ela não é invisível de verdade, como num truque de mágica. Ela é invisível porque muita gente passa por ela todos os dias e não percebe os problemas que existem lá. Cidade invisível é um conceito que se refere às desigualdades sociais presentes nas grandes cidades, que muitas vezes a maioria das pessoas não enxerga, mas que afetam muito a vida de muita gente.">
          <p>
            A cidade invisível não some como num truque de mágica! Ela é “invisível” porque <b>muita gente passa por ela e não percebe</b> os problemas que existem ali.
          </p>
          <p>
            <b>Cidade invisível</b> é um conceito (uma ideia) que se refere às <b>desigualdades sociais</b> das grandes cidades: diferenças enormes entre a vida de uns e de outros, que a maioria não enxerga, mas que <b>afetam muito</b> a vida de muitas pessoas.
          </p>
          <Callout kind="lembre">
            <b>Desigualdade social</b> é quando algumas pessoas têm muito acesso a direitos e oportunidades (escola boa, saúde, transporte, lazer) e outras têm pouco ou nenhum.
          </Callout>
        </Section>

        <Section emoji="🧱" title="Segregação socioespacial">
          <p>
            Que palavra grande! Vamos quebrar em pedaços: <b>sócio</b> = sociedade, pessoas; <b>espacial</b> = espaço, lugar. Então <b>segregação socioespacial</b> é quando <b>grupos de pessoas ficam separados em partes diferentes da cidade</b>, e alguns grupos ficam excluídos de certas áreas.
          </p>
          <CardGrid>
            <Card emoji="🏰" title="Separação voluntária" tone="#eaf2ff">
              Quando o próprio grupo escolhe se separar (<b>se autoexclui</b>). Exemplo: pessoas que vivem em condomínios fechados, com muros altos, e quase não convivem com o resto da cidade.
            </Card>
            <Card emoji="🚧" title="Separação imposta" tone="#fdecea">
              Quando existem <b>barreiras físicas ou sociais</b> que impedem certos grupos de chegar a algumas áreas. Exemplo: falta de ônibus, preços muito altos, muros, preconceito.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="🚌" title="Falta de serviços básicos">
          <p>Nas áreas mais pobres da cidade, costuma ser mais difícil ter acesso a:</p>
          <CardGrid min={150}>
            <Card emoji="🏥" title="Saúde">Postos e hospitais longe ou lotados.</Card>
            <Card emoji="🏫" title="Educação">Menos escolas e vagas.</Card>
            <Card emoji="🚌" title="Transporte">Poucos ônibus e viagens longas.</Card>
            <Card emoji="⚽" title="Lazer">Poucas praças, parques e quadras.</Card>
          </CardGrid>
          <p>
            Isso faz a desigualdade <b>continuar de geração em geração</b> (o texto chama isso de <b>perpetuar</b> a desigualdade).
          </p>
        </Section>

        <Section emoji="🙈" title="Invisível para quem?">
          <CardGrid>
            <Card emoji="🏛️" title="Para as autoridades">
              Muitas vezes o governo nem sabe que existem certas comunidades em <b>pobreza extrema</b>. Elas ficam <b>à margem</b> (de fora) das políticas públicas e dos programas sociais.
            </Card>
            <Card emoji="👥" title="Para a população">
              Muitas pessoas vivem numa “<b>realidade paralela</b>”, como dentro de uma bolha, sem perceber os problemas que afetam a vida dos outros.
            </Card>
          </CardGrid>
        </Section>

        <Section emoji="📜" title="Como as favelas surgiram no Brasil" accent={GEO}
          narration="O processo de favelização começou no final do século dezenove, depois da abolição da escravatura, em 1888, e da Guerra de Canudos. Muitas pessoas negras que tinham sido escravizadas foram libertadas sem nenhum apoio: sem casa, sem terra, sem emprego e sem escola. Elas foram separadas da população branca e precisaram morar em casas improvisadas, em morros e em áreas de risco para sobreviver. Até hoje essa desigualdade continua, não só no espaço, mas também na educação, na renda, na saúde e na segurança.">
          <Flow
            steps={[
              { emoji: "⛓️", text: "1888: fim da escravidão (abolição), mas sem nenhum apoio às pessoas libertadas" },
              { emoji: "⚔️", text: "1896–1897: Guerra de Canudos, na Bahia" },
              { emoji: "⛰️", text: "Sem casa nem emprego, muitas pessoas negras foram morar em morros e moradias improvisadas" },
              { emoji: "🏘️", text: "Começa o processo de “favelização”" },
            ]}
          />
          <Callout kind="sabia" title="De onde vem a palavra “favela”?">
            Soldados que voltaram da Guerra de Canudos se instalaram num morro do Rio de Janeiro e o apelidaram de <b>Morro da Favela</b>, por causa de uma planta chamada <i>favela</i>, comum na região de Canudos. Com o tempo, o nome passou a ser usado para comunidades parecidas.
          </Callout>
          <p>
            Ainda hoje essa desigualdade permanece: não só no <b>espaço</b> (onde se mora), mas também na <b>educação</b>, no <b>dinheiro</b>, na <b>saúde</b>, na <b>segurança</b> e na questão de <b>raça</b>.
          </p>
        </Section>

        <Section emoji="📈" title="As favelas aumentaram muito">
          <p>Segundo o <b>IBGE</b> (o instituto que faz as pesquisas sobre o Brasil), o número de <b>aglomerados subnormais</b> (favelas, palafitas e outras moradias precárias) <b>dobrou</b>:</p>
          <div className="k-compare">
            <div>
              <span className="k-compare-year">2010</span>
              <div className="k-compare-bar" style={{ width: "48%" }} />
              <p><b>6.329</b> favelas em <b>323</b> municípios</p>
            </div>
            <div>
              <span className="k-compare-year">2019</span>
              <div className="k-compare-bar" style={{ width: "100%" }} />
              <p><b>13.151</b> favelas em <b>743</b> cidades</p>
            </div>
          </div>
          <Callout kind="dica" title="Respeito acima de tudo">
            Favelas e comunidades não são só lugares de problemas: são também lugares de <b>trabalho, cultura, música, esporte e famílias</b>. O problema é a <b>falta de direitos</b>, não as pessoas que moram lá.
          </Callout>
        </Section>

        <Section emoji="🛠️" title="Como combater a cidade invisível?">
          <ul className="k-list">
            <li><b>Políticas públicas inclusivas</b>, que garantam serviços básicos e <b>oportunidades iguais</b> para todos;</li>
            <li>Uma <b>cidade acessível</b>: transporte público de qualidade, calçadas boas, adaptações para <b>pessoas com deficiência</b> e áreas de lazer para todos;</li>
            <li><b>Integrar</b> quem vive em periferias, comunidades e nas ruas: acesso a educação, saúde, <b>habitação popular</b> (casas a preço acessível), <b>microcrédito</b> (pequenos empréstimos para começar um negócio) e <b>capacitação profissional</b> (cursos para aprender uma profissão);</li>
            <li><b>Conscientização</b>: todo mundo precisa enxergar o problema para lutar por uma cidade <b>mais justa e igualitária</b>.</li>
          </ul>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Desigualdade social", "Diferença grande de direitos e oportunidades entre grupos de pessoas."],
              ["Segregação socioespacial", "Separação de grupos sociais em áreas diferentes da cidade."],
              ["Periferia", "Bairros afastados do centro da cidade."],
              ["Marginalizado", "Quem foi deixado “à margem”, de fora, da sociedade."],
              ["Aglomerado subnormal", "Nome usado pelo IBGE para favelas e moradias precárias."],
              ["Palafita", "Casa construída sobre estacas, em cima da água ou de áreas alagadas."],
              ["Abolição da escravatura", "Fim da escravidão no Brasil, em 1888 (Lei Áurea)."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "situacao-de-rua",
    subject: "geo",
    emoji: "🤝",
    title: "Desigualdades sociais: pessoas em situação de rua",
    subtitle: "Entender, respeitar e ajudar",
    summary: "Pessoas em situação de rua perderam sua casa por motivos diferentes e enfrentam muitos desafios. Todos podem ajudar a garantir sua dignidade.",
    narration:
      "Pessoas em situação de rua são pessoas que, por motivos diferentes, perderam suas casas e vivem nas ruas, muitas vezes em condições muito difíceis. Em 2022, estimava-se que havia 281 mil, 472 pessoas em situação de rua no Brasil. A maioria é de homens, adultos entre 18 e 59 anos, e 68 por cento são pessoas negras. As causas são várias: problemas e violência na família, falta de emprego e de moradia, problemas de saúde mental ou dependência de álcool e drogas. Nas ruas, elas enfrentam falta de abrigo, comida, água, roupas limpas e higiene, além de doenças e violência. Para mudar isso, são necessárias políticas públicas de moradia, saúde, educação e trabalho, redes de apoio, e também o fim do preconceito. Toda a sociedade pode ajudar, com respeito, doações e campanhas.",
    body: () => (
      <>
        <Section emoji="💬" title="Por que dizemos “em situação de rua”?" accent={GEO}
          narration="Por que dizemos pessoas em situação de rua? A palavra situação mostra que é um momento da vida, algo que pode mudar. Antes de tudo, são pessoas, com nome, história e sentimentos, que por diferentes motivos perderam suas casas e vivem nas ruas, muitas vezes em condições precárias e de muita vulnerabilidade.">
          <p>
            A palavra <b>situação</b> mostra que é um <b>momento da vida</b>, algo que <b>pode mudar</b>. Antes de tudo, são <b>pessoas</b>, com nome, história e sentimentos.
          </p>
          <p>
            São indivíduos que, por <b>diferentes motivos</b>, perderam suas casas e vivem nas ruas, muitas vezes em condições <b>precárias</b> e de extrema <b>vulnerabilidade</b> (quando alguém está desprotegido e pode ser facilmente prejudicado).
          </p>
        </Section>

        <Section emoji="📊" title="Quem são as pessoas em situação de rua no Brasil?">
          <div className="k-bignum">
            <strong>281.472</strong>
            <span>pessoas em situação de rua no Brasil (estimativa de 2022)</span>
          </div>
          <Bars
            color={GEO}
            items={[
              { label: "São do sexo masculino", value: 87 },
              { label: "Têm entre 18 e 59 anos (adultos)", value: 87 },
              { label: "São negras (pretas e pardas)", value: 68 },
              { label: "Não terminaram o ensino fundamental", value: 47 },
            ]}
          />
          <Callout kind="dica" title="O que esses números mostram?">
            Repare que a maioria das pessoas em situação de rua é <b>negra</b> e muitas <b>não puderam terminar a escola</b>. Isso se liga ao que vimos sobre a <b>cidade invisível</b>: as desigualdades vêm de longe e se acumulam.
          </Callout>
        </Section>

        <Section emoji="❓" title="Por que alguém vai morar na rua?">
          <p>As causas são <b>várias</b> e, muitas vezes, se misturam:</p>
          <CardGrid min={200}>
            <Card emoji="🏚️" title="Problemas em casa">Brigas, violência ou abandono por parte da família.</Card>
            <Card emoji="💼" title="Falta de emprego e moradia">Sem trabalho, a pessoa não consegue pagar um lugar para morar.</Card>
            <Card emoji="🧠" title="Saúde mental">Doenças que afetam os pensamentos e as emoções e precisam de tratamento.</Card>
            <Card emoji="💊" title="Dependência química">Quando a pessoa fica dependente de álcool ou de outras drogas.</Card>
          </CardGrid>
        </Section>

        <Section emoji="🌧️" title="Os desafios de todo dia">
          <p>Viver na rua é muito difícil. Essas pessoas enfrentam:</p>
          <CardGrid min={140}>
            <Card emoji="🛏️" title="Falta de abrigo">Onde dormir e se proteger da chuva e do frio.</Card>
            <Card emoji="🍞" title="Fome">Falta de comida e de água potável.</Card>
            <Card emoji="🧼" title="Higiene">Sem banho e roupas limpas.</Card>
            <Card emoji="🤕" title="Doenças e violência">Ficam mais expostas a agressões e doenças.</Card>
          </CardGrid>
        </Section>

        <Section emoji="🧩" title="Como enfrentar esse problema?" accent={GEO}
          narration="Para enfrentar esse problema, é preciso cuidar dele de forma integral e multidisciplinar. Integral quer dizer cuidar da pessoa por inteiro. Multidisciplinar quer dizer que várias áreas trabalham juntas: saúde, assistência social, educação e trabalho. Também é importante combater o preconceito, ouvir as pessoas em situação de rua e deixá-las participar das decisões sobre suas vidas.">
          <p>
            O texto diz que é preciso agir de forma <b>integral</b> (cuidar da pessoa por inteiro) e <b>multidisciplinar</b> (várias áreas trabalhando juntas). Por exemplo:
          </p>
          <ul className="k-list">
            <li><b>Políticas públicas</b> que garantam moradia, saúde, educação e trabalho para todos;</li>
            <li><b>Redes de apoio social</b> e programas de <b>tratamento</b> para quem tem dependência química ou problemas de saúde mental;</li>
            <li><b>Combater os estereótipos e o preconceito</b> (ideias erradas como “estão na rua porque querem”);</li>
            <li><b>Ouvir</b> as pessoas em situação de rua e deixá-las <b>participar das decisões</b> sobre suas vidas, garantindo <b>autonomia</b> e <b>dignidade</b>.</li>
          </ul>
          <Callout kind="sabia">
            Muitas cidades têm o <b>Centro POP</b>, um lugar público onde pessoas em situação de rua podem tomar banho, lavar roupa, se alimentar, tirar documentos e receber ajuda para recomeçar.
          </Callout>
        </Section>

        <Section emoji="❤️" title="Quem pode ajudar? Todo mundo!">
          <CardGrid>
            <Card emoji="🏛️" title="Governo">Cria políticas públicas e serviços de assistência social.</Card>
            <Card emoji="🤲" title="ONGs, igrejas e instituições">Oferecem apoio, comida, abrigo e ajudam a cobrar políticas públicas.</Card>
            <Card emoji="📣" title="Sociedade">Faz <b>mobilização social</b>: campanhas de doação de alimentos, roupas e outros itens e ações de conscientização.</Card>
            <Card emoji="🧒" title="Você">
              Trate todas as pessoas com <b>respeito</b>, participe de campanhas de doação com sua família ou escola e converse sobre o tema. Sempre com um adulto por perto!
            </Card>
          </CardGrid>
          <Callout kind="lembre">
            Em resumo: cabe a <b>todos</b> apoiar ações que promovam a <b>dignidade</b> e os <b>direitos humanos</b> de quem está marginalizado, em busca de uma sociedade <b>mais justa e igualitária</b>.
          </Callout>
        </Section>

        <Section emoji="📖" title="Palavras importantes">
          <Glossary
            items={[
              ["Vulnerabilidade", "Estar desprotegido, correndo mais riscos."],
              ["Estereótipo", "Ideia pronta e geralmente errada sobre um grupo de pessoas."],
              ["Dignidade", "O valor e o respeito que toda pessoa merece."],
              ["Autonomia", "Poder tomar as próprias decisões."],
              ["Multidisciplinar", "Que envolve várias áreas trabalhando juntas."],
              ["ONG", "Organização Não Governamental: grupo da sociedade que trabalha por uma causa."],
            ]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "revisao-geografia",
    subject: "geo",
    emoji: "🗺️",
    title: "Revisão geral de Geografia",
    subtitle: "Mapa mental + simulado",
    summary: "Tudo o que você estudou na Unidade 3, resumido em um mapa mental, com um simulado para treinar para a prova.",
    narration:
      "Vamos revisar a Unidade 3: Qualidade de vida e desenvolvimento humano. Primeiro, o saneamento básico: água potável, esgoto, lixo e controle de vetores, que protegem a saúde. Depois, educação, moradia e segurança, os três pilares do bem-estar, que estão ligados entre si. Em seguida, a cidade invisível: as desigualdades sociais que muita gente não vê, como a segregação socioespacial e a falta de serviços nas áreas mais pobres. E, por fim, as pessoas em situação de rua, que precisam de políticas públicas, apoio e respeito. A ideia que liga tudo é esta: todas as pessoas têm direito a uma vida digna, e o governo e a sociedade precisam trabalhar juntos para isso.",
    body: () => (
      <>
        <Section emoji="🧠" title="Mapa mental da Unidade 3">
          <div className="k-mindmap">
            <div className="k-mind-center">Qualidade de vida e desenvolvimento humano</div>
            <div className="k-mind-branches">
              <div><b>💧 Saneamento</b><span>água potável · esgoto · lixo · vetores → saúde</span></div>
              <div><b>🏠 Educação, moradia, segurança</b><span>três pilares interligados · segurança pública, alimentar e no trabalho</span></div>
              <div><b>🏙️ Cidade invisível</b><span>desigualdade · segregação socioespacial · favelização · falta de serviços</span></div>
              <div><b>🤝 Situação de rua</b><span>281.472 pessoas (2022) · causas · desafios · políticas e respeito</span></div>
            </div>
          </div>
          <Callout kind="lembre" title="A ideia que liga tudo">
            Todas as pessoas têm <b>direito a uma vida digna</b>. Para isso, são necessárias <b>políticas públicas</b> do governo <b>e</b> a <b>participação de toda a sociedade</b>.
          </Callout>
        </Section>

        <Section emoji="📅" title="Como estudar para a prova">
          <CardGrid min={180}>
            <Card emoji="⏰" title="Faça uma rotina">Estude um pouquinho todo dia, no mesmo horário. Por exemplo: 1 assunto por dia.</Card>
            <Card emoji="📖" title="Leia os textos">Leia cada explicação com calma. Use o botão “Ouvir” se quiser.</Card>
            <Card emoji="✍️" title="Faça resumos">Escreva no caderno as palavras importantes e o que elas significam.</Card>
            <Card emoji="🙋" title="Tire dúvidas">Anote o que não entendeu e pergunte aos professores.</Card>
          </CardGrid>
        </Section>
      </>
    ),
  },
];

// No fim de cada assunto: 20 questões de revisão.
export const geografia: Topic[] = topicos.map((topico) => ({ ...topico, quiz: questoesGeografia[topico.id] }));
