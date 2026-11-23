// Geografia 02 · Nacionalismo e Conflitos Geopolíticos (Ensino Médio).
// Todo o conteúdo segue estritamente o guia de estudos enviado (guia-estudos-nacionalismo-geopolitica.md).
import type { ReactNode } from "react";
import { Callout, Card, CardGrid, Glossary, Quiz, Section, Sorter } from "../estudos5/ui";
import { LinhaHistoria, type Evento } from "../estudos5/visuais-historia";
import { Forca, JogoMemoria } from "../estudos5/jogos";
import { SpeakButton } from "@/components/Narrator";

export const COR = "#2f5d8a";

export type Modulo = { id: string; numero: string; emoji: string; titulo: string; resumo: string; corpo: () => ReactNode };

function Simplificada({ texto, fala }: { texto: ReactNode; fala: string }) {
  return (
    <section className="g2-simples">
      <div className="g2-simples-head">
        <b>📌 Descrição simplificada</b>
        <SpeakButton text={fala} title="Descrição simplificada" accent={COR} />
      </div>
      <p>{texto}</p>
    </section>
  );
}

function Completa() {
  return <div className="g2-faixa">📚 Descrição completa e aprofundada</div>;
}

/* ============================== Módulo 1 ============================== */

const modulo1: Modulo = {
  id: "m1",
  numero: "Módulo 1",
  emoji: "🏳️",
  titulo: "Teoria, origens e vertentes do nacionalismo",
  resumo: "O que é nacionalismo, quando surgiu, seus três tipos, as “comunidades imaginadas” de Benedict Anderson e a diferença entre patriotismo, nacionalismo e ufanismo.",
  corpo: () => (
    <>
      <Simplificada
        fala="O nacionalismo é uma forma de pensar e organizar a sociedade na qual as pessoas sentem que pertencem a uma mesma nação, compartilhando história, língua, cultura, símbolos, como bandeira e hino, e um território governado por um Estado soberano. Nascido na modernidade, no século dezenove, o nacionalismo funciona como um chiclete social que une indivíduos diferentes em torno de uma mesma identidade. Ele pode ter impactos positivos, como a preservação cultural e as lutas de libertação, ou negativos, como a xenofobia, o preconceito e as guerras de conquista."
        texto={<>O <b>nacionalismo</b> é uma forma de pensar e organizar a sociedade na qual as pessoas sentem que pertencem a uma mesma <b>nação</b>, compartilhando história, língua, cultura, símbolos (como bandeira e hino) e um território governado por um <b>Estado soberano</b>. Nascido na modernidade (século XIX), o nacionalismo funciona como um “chiclete social” que une indivíduos diferentes em torno de uma mesma identidade, podendo ter impactos <b>positivos</b> (como a preservação cultural e lutas de libertação) ou <b>negativos</b> (como a xenofobia, o preconceito e guerras de conquista).</>}
      />
      <Completa />

      <Section emoji="🕰️" title="1. Etimologia e contexto histórico de emergência" accent={COR}
        narration="A palavra nacionalismo deriva do latim natos e gen, associada às ideias de nascer, criar e descendência. Embora o sentimento de pertencimento a um grupo seja antigo, o nacionalismo moderno é uma condição típica do século dezenove. Ele emergiu durante o avanço da Segunda Revolução Industrial, quando as potências europeias precisavam delimitar fronteiras, unificar mercados internos e justificar a expansão territorial e a consolidação dos Estados Nacionais.">
        <p>A palavra nacionalismo deriva do latim <i>natos</i> e <i>gen</i>, associada às ideias de <b>nascer</b>, <b>criar</b> e <b>descendência</b>. Conforme as análises do sociólogo João Gabriel (canal Brasil Escola), embora o sentimento de pertencimento a um grupo seja antigo, o nacionalismo moderno é uma condição típica do <b>século XIX</b>.</p>
        <p>Ele emergiu durante o avanço da <b>Segunda Revolução Industrial</b>, momento em que as potências europeias precisavam:</p>
        <CardGrid min={180}>
          <Card emoji="🗺️" title="Delimitar fronteiras" tone="#eaf1f8">Definir os limites de seus territórios.</Card>
          <Card emoji="🏭" title="Unificar mercados internos" tone="#eaf1f8">Integrar a economia dentro do país.</Card>
          <Card emoji="📜" title="Justificar a expansão" tone="#eaf1f8">Criar justificativas ideológicas para a expansão territorial e a consolidação dos Estados-Nacionais.</Card>
        </CardGrid>
        <Callout kind="lembre" title="Boyd Shafer (historiador norte-americano)">
          <i>“O nacionalismo não é um conceito claro e fixo, mas uma combinação variável de crenças e de condições diferentes”</i>. Isso explica como ele pode ser usado tanto para <b>unificar um povo</b> quanto para <b>desencadear conflitos violentos</b>.
        </Callout>
      </Section>

      <Section emoji="🧩" title="2. Tipologias fundamentais do nacionalismo" accent={COR}
        narration="A sociologia divide o nacionalismo em três modelos principais. O nacionalismo revanchista surge quando um povo sofre uma derrota militar e desenvolve ressentimento contra o vencedor, como a França após a Guerra Franco-Prussiana de 1870 e a perda da Alsácia-Lorena. O nacionalismo agressivo ou eugênico é pautado pela ideia de supremacia racial ou cultural, como a Alemanha Nazista. E o nacionalismo de independência, ou autodeterminação, surge como resistência de povos dominados, como o Pan-eslavismo e a descolonização na África e na América.">
        <div className="k-table-wrap">
          <table className="k-table g2-table">
            <thead><tr><th>Tipologia</th><th>Causa geradora e mecanismo</th><th>Exemplo histórico</th></tr></thead>
            <tbody>
              <tr><td><b>Revanchista</b></td><td>Surge quando um povo sofre uma derrota militar e desenvolve um sentimento coletivo de revanche e ressentimento contra o vencedor.</td><td>A <b>Guerra Franco-Prussiana (1870)</b>: a derrota da França e a perda da <b>Alsácia-Lorena</b> alimentaram o revanchismo francês até a Primeira Guerra Mundial.</td></tr>
              <tr><td><b>Agressivo ou Eugênico</b></td><td>Pautado pela ideia de supremacia racial ou cultural, busca a dominação, a exclusão e o extermínio do “outro”.</td><td>A <b>Alemanha Nazista sob Adolf Hitler</b>, que usou teses eugenistas para promover a violência estatal e o genocídio de minorias.</td></tr>
              <tr><td><b>De Independência / Autodeterminação</b></td><td>Surge como mecanismo de defesa e resistência de povos dominados por potências coloniais ou imperiais.</td><td>O <b>Pan-eslavismo</b> e os processos de <b>descolonização na África e na América</b>.</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="k-h3">Pratique: qual é o tipo de nacionalismo?</h3>
        <Sorter
          id="g2-tipologias"
          accent={COR}
          buckets={["Revanchista", "Agressivo / Eugênico", "Independência"]}
          items={[
            { text: "A França perde a Alsácia-Lorena na Guerra Franco-Prussiana (1870).", answer: 0 },
            { text: "A Alemanha Nazista usa teses eugenistas para promover o genocídio de minorias.", answer: 1 },
            { text: "Processos de descolonização na África e na América.", answer: 2 },
            { text: "Sentimento coletivo de ressentimento após uma derrota militar.", answer: 0 },
            { text: "Ideia de supremacia racial ou cultural que busca a exclusão do “outro”.", answer: 1 },
            { text: "O movimento Pan-eslavismo.", answer: 2 },
          ]}
        />
      </Section>

      <Section emoji="💭" title="3. Benedict Anderson e as “comunidades imaginadas”" accent={COR}
        narration="Para Benedict Anderson, as nações são comunidades políticas imaginadas, com três atributos. Imaginada: os membros de uma nação jamais conhecerão a maioria de seus compatriotas, mas na mente de cada um vive a imagem de sua comunhão. Limitada: possui fronteiras territoriais finitas. Soberana: nasceu na época em que o Iluminismo e a Revolução Francesa destruíram a legitimidade dos reinos de direito divino.">
        <p>O historiador e cientista político <b>Benedict Anderson</b> desenvolveu a tese de que as nações são <b>comunidades políticas imaginadas</b>, com três atributos:</p>
        <CardGrid min={190}>
          <Card emoji="🧠" title="Imaginada" tone="#eaf1f8">Os membros de uma nação, mesmo a menor delas, jamais conhecerão a maioria de seus compatriotas, mas na mente de cada um vive a imagem de sua comunhão.</Card>
          <Card emoji="🧱" title="Limitada" tone="#eaf1f8">Possui fronteiras territoriais finitas, além das quais existem outras nações soberanas.</Card>
          <Card emoji="👑" title="Soberana" tone="#eaf1f8">Nascida na época em que o Iluminismo e a Revolução Francesa destruíram a legitimidade dos reinos de direito divino.</Card>
        </CardGrid>
        <Callout kind="atencao" title="Ponto de atenção para o ENEM">
          A “comunidade imaginada” cria a ilusão de uma <b>unidade de classe e de interesses</b>, camuflando desigualdades sociais profundas em prol de uma suposta identidade nacional homogênea.
        </Callout>
      </Section>

      <Section emoji="⚖️" title="4. O nacionalismo no espectro político: a “Terceira Posição”" accent={COR}
        narration="O nacionalismo não se reduz à esquerda ou à direita tradicional. Ele frequentemente se posiciona além dessa dicotomia, presente no Trabalhismo, no Integralismo e na Falange. Na economia, defende o protecionismo para fortalecer a indústria nacional. Atenção à diferença: patriotismo é afeto e orgulho pela pátria; nacionalismo é a ideologia política de defesa da soberania; ufanismo é a crença exagerada de que a própria nação é superior a todas as outras.">
        <p>Diferente do que muitos pressupõem, o nacionalismo não se reduz à esquerda ou à direita tradicional (canal Alberto Cafeeiro):</p>
        <ul className="k-list">
          <li><b>Terceira Posição:</b> o nacionalismo frequentemente se posiciona além da dicotomia política convencional, presente em vertentes como o <b>Trabalhismo</b>, o <b>Integralismo</b> e a <b>Falange</b>.</li>
          <li><b>Economia e protecionismo:</b> defende o <b>protecionismo econômico</b> para fortalecer a <b>indústria nacional</b>, combater monopólios multinacionais e incentivar a iniciativa privada local por meio de incentivos fiscais.</li>
        </ul>
        <CardGrid min={190}>
          <Card emoji="❤️" title="Patriotismo" tone="#fdf0e6">Afeto, respeito e orgulho pelas tradições e símbolos da pátria (atitude de foro íntimo).</Card>
          <Card emoji="🏛️" title="Nacionalismo" tone="#eaf1f8">Ideologia política estruturada sobre a defesa da soberania e dos interesses estratégicos do Estado-Nação.</Card>
          <Card emoji="📣" title="Ufanismo" tone="#fdecea">Crença exagerada de que a própria nação é absolutamente superior a todas as outras.</Card>
        </CardGrid>
        <h3 className="k-h3">Pratique: patriotismo, nacionalismo ou ufanismo?</h3>
        <Sorter
          id="g2-conceitos"
          accent={COR}
          buckets={["Patriotismo", "Nacionalismo", "Ufanismo"]}
          items={[
            { text: "Afeto, respeito e orgulho pelas tradições e símbolos da pátria.", answer: 0 },
            { text: "Ideologia política de defesa da soberania e dos interesses estratégicos do Estado-Nação.", answer: 1 },
            { text: "Crença exagerada de que a própria nação é absolutamente superior a todas as outras.", answer: 2 },
            { text: "Defesa do protecionismo econômico para fortalecer a indústria nacional.", answer: 1 },
          ]}
        />
      </Section>
    </>
  ),
};

/* ============================== Módulo 2 ============================== */

const eventosBrasil: Evento[] = [
  { ano: "1870", emoji: "📖", titulo: "A Geração de 1870", texto: "Após a Guerra do Paraguai, intelectuais influenciados pelo Positivismo e pelo racionalismo francês (Joaquim Nabuco, Rui Barbosa, Benjamim Constant, Lauro Sodré) contestam as velhas elites imperiais (“Saquaremas”)." },
  { ano: "1889", emoji: "🏛️", titulo: "Queda do Império", texto: "Proclamação da República. Aristides Lobo nota que ela ocorreu com o “povo assistindo bestializado”: nasce a ideia de Brasil Legal × Brasil Real." },
  { ano: "1902", emoji: "📕", titulo: "“Os Sertões”", texto: "Euclides da Cunha retrata a Guerra de Canudos e consagra o sertanejo e o caboclo como a reserva moral da nação." },
  { ano: "1905", emoji: "🏢", titulo: "Centro Nacionalista", texto: "(1905–1907) Foco na nacionalização dos imigrantes e no combate ao cosmopolitismo desnacionalizante." },
  { ano: "1910", emoji: "🗳️", titulo: "Liga Nacionalista", texto: "Liderada por Rui Barbosa e Olavo Bilac, defendia o voto secreto e a educação cívica." },
  { ano: "1916", emoji: "🎖️", titulo: "LDN e Revista do Brasil", texto: "Liga de Defesa Nacional (Olavo Bilac, Pedro Lessa, Miguel Calmon): serviço militar obrigatório. Revista do Brasil (Júlio de Mesquita e Monteiro Lobato). Pastoral de 1916 de Dom Sebastião Leme." },
  { ano: "1919", emoji: "📢", titulo: "Propaganda Nativista", texto: "Emancipação econômica, nacionalização da imprensa e do comércio, Conselho de Notáveis e transferência da capital para Goiás." },
  { ano: "1921", emoji: "✝️", titulo: "Revista “A Ordem”", texto: "Um dos instrumentos da reação católica de Jackson de Figueiredo." },
  { ano: "1922", emoji: "🎨", titulo: "Semana de Arte Moderna", texto: "Ruptura com o academicismo europeu da Belle Époque. No mesmo ano, surge o Centro Dom Vital." },
  { ano: "1930", emoji: "⚔️", titulo: "Revolução de 1930", texto: "Marco final do período de construção do nacionalismo brasileiro estudado (1870–1930)." },
];

const modulo2: Modulo = {
  id: "m2",
  numero: "Módulo 2",
  emoji: "🇧🇷",
  titulo: "A história do nacionalismo brasileiro (1870–1930)",
  resumo: "Brasil Legal × Brasil Real, “Os Sertões”, as Ligas Nacionalistas, a imprensa nativista, o Modernismo de 1922 e a reação católica.",
  corpo: () => (
    <>
      <Simplificada
        fala="No Brasil, o nacionalismo foi construído entre a Queda do Império, em 1889, e a Revolução de 1930, por intelectuais, militares e artistas que buscavam responder à pergunta: quem é o verdadeiro brasileiro? Esse processo dividiu o país entre o Brasil Legal, as leis e elites das capitais que copiavam a Europa, e o Brasil Real, o povo do interior, o sertanejo e o caboclo. Movimentos como as Ligas Nacionalistas, o Modernismo de 1922 e a Reação Católica tentaram criar uma identidade genuinamente nacional."
        texto={<>No Brasil, o nacionalismo foi construído entre a <b>Queda do Império (1889)</b> e a <b>Revolução de 1930</b> por intelectuais, militares e artistas que buscavam responder à pergunta: <i>quem é o verdadeiro brasileiro?</i> Esse processo dividiu o país entre o <b>“Brasil Legal”</b> (as leis e elites das capitais que copiavam a Europa) e o <b>“Brasil Real”</b> (o povo do interior, o sertanejo e o caboclo). Movimentos como as Ligas Nacionalistas, o Modernismo de 1922 e a Reação Católica tentaram criar uma identidade genuinamente nacional.</>}
      />
      <Completa />
      <p className="g2-fonte">Conforme a análise histórica do canal <i>O Saquarema (Thiago Araujo)</i>.</p>

      <Section emoji="🕰️" title="Linha do tempo: 1870 a 1930">
        <LinhaHistoria eventos={eventosBrasil} />
      </Section>

      <Section emoji="⚖️" title="1. A Geração de 1870 e os “Dois Brasis”" accent={COR}
        narration="Após a Guerra do Paraguai, uma nova elite de intelectuais influenciados pelo Positivismo passou a contestar as velhas elites imperiais. Aristides Lobo notou que a República foi proclamada com o povo assistindo bestializado. Criou-se a percepção de um abismo entre o Brasil Legal, das instituições copiadas da Europa, e o Brasil Real, da população analfabeta e desamparada do interior.">
        <p>Após a Guerra do Paraguai, uma nova elite de intelectuais formados sob a influência do <b>Positivismo</b> e do racionalismo francês (Joaquim Nabuco, Rui Barbosa, Benjamim Constant e Lauro Sodré) passou a contestar as velhas elites conservadoras imperiais (“Saquaremas”).</p>
        <p>Aristides Lobo notou que a proclamação da República ocorreu com o <b>“povo assistindo bestializado”</b>. Surgiu a percepção de um abismo entre os <b>dois Brasis</b>:</p>
        <div className="k-table-wrap">
          <table className="k-table g2-table">
            <thead><tr><th>Dimensão</th><th>Brasil Legal (Litoral)</th><th>Brasil Real (Sertão / Interior)</th></tr></thead>
            <tbody>
              <tr><td><b>Composição social</b></td><td>Elite letrada, bacharéis e políticos.</td><td>Caboclos, sertanejos e população rural.</td></tr>
              <tr><td><b>Matriz cultural</b></td><td>Cosmopolitismo, imitação de modelos europeus.</td><td>Tradição nativista, folclore e resiliência.</td></tr>
              <tr><td><b>Diagnóstico histórico</b></td><td>Instituições artificiais desligadas do povo.</td><td>Reserva moral e energia coletiva da nação.</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="k-h3">Pratique: Brasil Legal ou Brasil Real?</h3>
        <Sorter
          id="g2-dois-brasis"
          accent={COR}
          buckets={["Brasil Legal", "Brasil Real"]}
          items={[
            { text: "Elite letrada, bacharéis e políticos.", answer: 0 },
            { text: "Caboclos, sertanejos e população rural.", answer: 1 },
            { text: "Imitação de modelos europeus (cosmopolitismo).", answer: 0 },
            { text: "Reserva moral e energia coletiva da nação.", answer: 1 },
            { text: "Instituições artificiais desligadas do povo.", answer: 0 },
            { text: "Tradição nativista, folclore e resiliência.", answer: 1 },
          ]}
        />
      </Section>

      <Section emoji="🌵" title="2. Euclides da Cunha e a redescoberta do sertão" accent={COR}
        narration="A publicação de Os Sertões, em 1902, por Euclides da Cunha, provocou um choque de realidade. Ao retratar a Guerra de Canudos, a obra mostrou a miséria do interior, mas consagrou o sertanejo e o caboclo como a reserva moral da nação, um tipo forte, resiliente e autêntico.">
        <p>A obra <b>“Os Sertões” (1902)</b>, de Euclides da Cunha, provocou um choque de realidade na intelectualidade litorânea. Ao retratar a <b>Guerra de Canudos</b>, evidenciou a miséria do interior, mas consagrou o sertanejo e o caboclo como a <b>reserva moral da nação</b>: um tipo forte, resiliente e autêntico, que preservava a verdadeira brasilidade, em contraste com a elite cosmopolita do litoral.</p>
        <Callout kind="lembre">“O sertanejo é, antes de tudo, um forte.” (Euclides da Cunha)</Callout>
      </Section>

      <Section emoji="🎖️" title="3. As Ligas Nacionalistas e o civismo militar (1905–1916)">
        <CardGrid min={210}>
          <Card emoji="🏢" title="Centro Nacionalista (1905–1907)" tone="#eaf1f8">Nacionalização dos imigrantes e combate ao cosmopolitismo desnacionalizante.</Card>
          <Card emoji="🗳️" title="Liga Nacionalista (1910)" tone="#eaf1f8">Liderada por Rui Barbosa e Olavo Bilac: voto secreto e educação cívica.</Card>
          <Card emoji="🎖️" title="Liga de Defesa Nacional – LDN (1916)" tone="#eaf1f8">Olavo Bilac, Pedro Lessa e Miguel Calmon: <b>serviço militar obrigatório</b> como nivelamento social e educação patriótica (“o povo é o exército do povo”). Formulou os <i>Mandamentos do Patriota Brasileiro</i>.</Card>
        </CardGrid>
      </Section>

      <Section emoji="📰" title="4. A imprensa nativista e a valorização do homem nacional">
        <CardGrid min={210}>
          <Card emoji="🧐" title="Alberto Torres" tone="#fdf0e6">Criticou a “ilusão litorânea” e defendeu um diagnóstico do Brasil feito sob medida por intérpretes técnicos estatais.</Card>
          <Card emoji="📗" title="Revista do Brasil (1916)" tone="#fdf0e6">Júlio de Mesquita e Monteiro Lobato combateram as teses eugenistas: o povo brasileiro não era decadente, mas <b>enfermo e abandonado pelo Estado</b>, simbolizado no <b>Jeca Tatu</b>.</Card>
          <Card emoji="📢" title="Propaganda Nativista (1919)" tone="#fdf0e6">Emancipação econômica, nacionalização da imprensa e do comércio, Conselho de Notáveis e transferência da capital para Goiás.</Card>
        </CardGrid>
      </Section>

      <Section emoji="🎨" title="5. O Modernismo e a mística nativista (1922–1930)">
        <p>A <b>Semana de Arte Moderna de 1922</b> buscou romper com o academicismo europeu da Belle Époque.</p>
        <Card emoji="🦙" title="Verde-Amarelismo e Movimento da Anta" tone="#e6f6ef">Liderados por Menotti Del Picchia, Plínio Salgado e Cassiano Ricardo: rejeitavam o cosmopolitismo e viam no <b>Tupi</b> a mitologia dinâmica que fecundou o sangue do bandeirante mestiço, formando a síntese da brasilidade.</Card>
      </Section>

      <Section emoji="✝️" title="6. A reação católica e espiritualista">
        <p>Em resposta à laicização estatal da República positivista:</p>
        <CardGrid min={220}>
          <Card emoji="📘" title="Farias Brito" tone="#f1eefc">Filósofo que criticou o <b>liberalismo</b> (foco só no interesse material individual) e o <b>marxismo</b> (reduz o homem à economia). Pregou a elevação moral e espiritual como base da justiça social.</Card>
          <Card emoji="⛪" title="Dom Sebastião Leme e Jackson de Figueiredo" tone="#f1eefc">Pastoral de 1916, Revista <i>A Ordem</i> (1921) e Centro Dom Vital (1922): um nacionalismo católico antiliberal e anticomunista, com o Catolicismo como pilar da identidade brasileira.</Card>
        </CardGrid>
      </Section>
    </>
  ),
};

/* ============================== Módulo 3 ============================== */

const eventosUcrania: Evento[] = [
  { ano: "Séc. IX–XIII", emoji: "🏰", titulo: "Kyivan Rus", texto: "O povo Rus funda a Kyivan Rus, com capital em Kiev. É nesse Estado medieval que Vladimir Putin fundamenta a tese de que russos e ucranianos formam “um só povo”." },
  { ano: "1947", emoji: "🇺🇸", titulo: "Doutrina Truman e Plano Marshall", texto: "Lógica dos EUA para conter a expansão do comunismo soviético na Europa." },
  { ano: "1949", emoji: "🛡️", titulo: "Criação da OTAN", texto: "Os EUA criam a Organização do Tratado do Atlântico Norte para conter a União Soviética." },
  { ano: "1955", emoji: "☭", titulo: "Pacto de Varsóvia", texto: "A resposta militar da União Soviética à OTAN." },
  { ano: "1991", emoji: "🧱", titulo: "Fim da URSS", texto: "A Ucrânia se torna independente. Apesar de garantias iniciais, a OTAN incorpora ex-membros do bloco socialista e se aproxima das fronteiras russas." },
  { ano: "2004–2010", emoji: "🔥", titulo: "Yanukovych e o gás", texto: "Eleição conturbada de Viktor Yanukovych e retaliações russas com cortes no fornecimento de gás natural em 2006 e 2009." },
  { ano: "2014", emoji: "📍", titulo: "Anexação da Crimeia", texto: "A Rússia anexa a Península da Crimeia e apoia separatistas em Donetsk e Luhansk." },
  { ano: "2022", emoji: "⚠️", titulo: "Invasão em grande escala", texto: "A iminência da adesão da Ucrânia à OTAN leva à invasão russa, com crise humanitária global e severas sanções econômicas." },
];

const modulo3: Modulo = {
  id: "m3",
  numero: "Módulo 3",
  emoji: "🌍",
  titulo: "Tensões e conflitos geopolíticos globais",
  resumo: "EUA × China, a guerra entre Rússia e Ucrânia e a OTAN, e o Oriente Médio: religião, território, petróleo, Israel × Palestina e outros focos.",
  corpo: () => (
    <>
      <Simplificada
        fala="A geopolítica estuda como a geografia, o território e os recursos naturais, como petróleo e água, influenciam a política e as guerras entre os países. Atualmente, o mundo vive grande instabilidade devido à disputa por hegemonia entre Estados Unidos e China, aos desdobramentos da guerra entre Rússia e Ucrânia e aos conflitos históricos no Oriente Médio, uma região rica em petróleo, mas marcada por disputas territoriais e religiosas."
        texto={<>A <b>geopolítica</b> estuda como a geografia, o território e os recursos naturais (como petróleo e água) influenciam a política e as guerras entre os países. Atualmente, o mundo vive grande instabilidade devido à disputa por hegemonia entre <b>Estados Unidos e China</b>, aos desdobramentos da <b>guerra entre Rússia e Ucrânia</b> e aos conflitos históricos no <b>Oriente Médio</b>, uma região rica em petróleo, mas marcada por disputas territoriais e religiosas.</>}
      />
      <Completa />
      <p className="g2-fonte">Conforme os canais <i>O Mundo Actual</i>, <i>geo ilustrada</i> e <i>Toda Matéria</i>.</p>

      <Section emoji="🆚" title="1. A nova bipolaridade: EUA × China" accent={COR}
        narration="O cenário internacional é marcado por uma disputa pelo poder global. Os Estados Unidos são a superpotência consolidada, que busca preservar sua hegemonia militar e financeira. A China é uma potência em rápida ascensão, que desafia a liderança americana com avanço tecnológico, investimentos globais em infraestrutura e expansão militar no Mar da China Meridional. A disputa aparece numa intensa guerra comercial, com tarifas alfandegárias.">
        <div className="k-vs">
          <div><span className="k-vs-tag">🇺🇸 EUA</span><p>Superpotência consolidada que busca preservar sua <b>hegemonia militar e financeira</b> mundial.</p></div>
          <div><span className="k-vs-tag">🇨🇳 CHINA</span><p>Potência em rápida ascensão: <b>avanço tecnológico</b>, investimentos globais em infraestrutura e expansão militar no <b>Mar da China Meridional</b>.</p></div>
        </div>
        <Callout kind="dica" title="Guerra comercial">A disputa se manifesta em uma intensa <b>guerra comercial</b> (tarifas alfandegárias), com reflexos na economia global.</Callout>
      </Section>

      <Section emoji="🛡️" title="2. Ucrânia × Rússia: origens e a geopolítica da OTAN" accent={COR}
        narration="Toque nos marcos da linha do tempo para acompanhar as raízes e os desdobramentos da guerra entre Rússia e Ucrânia, desde a Kyivan Rus até a invasão de 2022.">
        <LinhaHistoria eventos={eventosUcrania} />
      </Section>

      <Section emoji="🔥" title="3. Oriente Médio: o caldeirão geopolítico" accent={COR}
        narration="O canal Toda Matéria sintetiza quatro fatores para a instabilidade no Oriente Médio. Religião: berço do Judaísmo, do Cristianismo e do Islamismo, que reivindicam locais sagrados em Jerusalém, além da rivalidade entre sunitas e xiitas. Território: fronteiras artificiais desenhadas por potências europeias. Petróleo: cerca de sessenta por cento das reservas mundiais. E história e posição estratégica: passagem entre Europa, Ásia e África.">
        <p>Os <b>quatro fatores</b> que explicam a instabilidade permanente na região:</p>
        <CardGrid min={200}>
          <Card emoji="🕌" title="1. Religião" tone="#fdf0e6">Berço do <b>Judaísmo, Cristianismo e Islamismo</b>, que reivindicam locais sagrados em <b>Jerusalém</b>. E a rivalidade no Islã entre <b>Sunitas</b> (Arábia Saudita) e <b>Xiitas</b> (Irã).</Card>
          <Card emoji="📏" title="2. Território" tone="#fdf0e6">Fronteiras artificiais desenhadas por potências europeias após as Guerras Mundiais, ignorando divisões étnicas e tribais.</Card>
          <Card emoji="🛢️" title="3. Petróleo" tone="#fdf0e6">A região concentra cerca de <b>60% das reservas mundiais de petróleo</b>.</Card>
          <Card emoji="🧭" title="4. Posição estratégica" tone="#fdf0e6">Ponto de passagem entre <b>Europa, Ásia e África</b>.</Card>
        </CardGrid>
      </Section>

      <Section emoji="🗺️" title="O conflito Israel × Palestina">
        <CardGrid min={210}>
          <Card emoji="📜" title="1947 · Plano de Partilha" tone="#eaf1f8">Com o fortalecimento do Movimento Sionista e o holocausto na Europa, a ONU aprova o Plano de Partilha da Palestina (57% do território para o Estado Judeu e o restante para os Árabes).</Card>
          <Card emoji="🏳️" title="1948 · Fundação de Israel e Nakba" tone="#eaf1f8">Os países árabes rejeitam o plano e declaram guerra. Israel vence, expande seu território e provoca o deslocamento forçado de centenas de milhares de palestinos: a <b>Nakba</b> (“Catástrofe”).</Card>
          <Card emoji="📍" title="Faixa de Gaza" tone="#eaf1f8">Sob controle do grupo <b>Hamas</b> desde 2007, sob rigoroso bloqueio militar.</Card>
          <Card emoji="📍" title="Cisjordânia" tone="#eaf1f8">Sob controle da Autoridade Palestina, marcada pela expansão de assentamentos israelenses considerados ilegais pela ONU.</Card>
        </CardGrid>
      </Section>

      <Section emoji="🔎" title="Outros focos críticos no Oriente Médio">
        <CardGrid min={210}>
          <Card emoji="🇮🇶" title="Guerra do Iraque (2003)" tone="#fdecea">Invasão americana sob a alegação não comprovada de armas de destruição em massa: derrubada de Saddam Hussein e caos institucional que deu origem ao <b>Estado Islâmico (ISIS)</b>.</Card>
          <Card emoji="🇸🇾" title="Guerra Civil na Síria (2011)" tone="#fdecea">Iniciada na Primavera Árabe contra Bashar al-Assad, tornou-se uma guerra por procuração envolvendo Rússia, Irã, EUA e Turquia.</Card>
          <Card emoji="⚠️" title="Tensão atual (2026)" tone="#fdecea">O ataque militar conjunto de EUA e Israel contra o Irã em 2026 representou o maior envolvimento militar na região desde 2003, elevando o risco de instabilidade global.</Card>
        </CardGrid>
        <h3 className="k-h3">Pratique: em qual tensão geopolítica isto aparece?</h3>
        <Sorter
          id="g2-tensoes"
          accent={COR}
          buckets={["EUA × China", "Rússia × Ucrânia", "Oriente Médio"]}
          items={[
            { text: "Expansão militar no Mar da China Meridional.", answer: 0 },
            { text: "Anexação da Península da Crimeia (2014).", answer: 1 },
            { text: "Cerca de 60% das reservas mundiais de petróleo.", answer: 2 },
            { text: "Guerra comercial com tarifas alfandegárias.", answer: 0 },
            { text: "Kyivan Rus e a tese de “um só povo”.", answer: 1 },
            { text: "Rivalidade entre Sunitas (Arábia Saudita) e Xiitas (Irã).", answer: 2 },
            { text: "Expansão da OTAN rumo ao Leste.", answer: 1 },
            { text: "Plano de Partilha da Palestina (1947).", answer: 2 },
          ]}
        />
      </Section>
    </>
  ),
};

/* ============================== Jogos ============================== */

const quizENEM = [
  { q: "(Conceito de Nacionalismo) O sociólogo João Gabriel (Brasil Escola) destaca que o nacionalismo moderno emergiu a partir do século XIX impulsionado por qual processo econômico e geopolítico?", options: ["Pela expansão feudal e pelas Cruzadas Medievais.", "Pela Segunda Revolução Industrial e pela necessidade de consolidação dos Estados-Nacionais.", "Pelo surgimento da União Europeia e pela queda do Muro de Berlim.", "Pela colonização mercantilista da América Latina no século XVI."], answer: 1, why: "O nacionalismo moderno consolida-se no século XIX com a Segunda Revolução Industrial e a afirmação dos Estados-Nacionais." },
  { q: "(Tipologias) A derrota da França na Guerra Franco-Prussiana (1870) e a consequente perda da Alsácia-Lorena exemplificam qual tipo de nacionalismo?", options: ["Nacionalismo de Autodeterminação.", "Nacionalismo Eugênico.", "Nacionalismo Revanchista.", "Nacionalismo Ufanista Pasmo."], answer: 2, why: "A perda territorial da Alsácia-Lorena gerou um sentimento de desforra (revanchismo) que marcou a geopolítica francesa." },
  { q: "(Teoria Sociológica) Por que o cientista político Benedict Anderson classifica as nações como “comunidades imaginadas”?", options: ["Porque são territórios virtuais criados exclusivamente na internet.", "Porque seus membros jamais conhecerão a maioria dos compatriotas, mas compartilham na mente a imagem de uma comunhão soberana.", "Porque o conceito de nação é uma invenção sem qualquer impacto na vida real.", "Porque são comunidades indígenas que não possuem governo centralizado."], answer: 1, why: "Anderson demonstra que a imagem de comunhão é mental e abstrata (“imaginada”), conectando milhões de estranhos." },
  { q: "(História do Brasil) No contexto pós-1889, a expressão “Brasil Legal vs. Brasil Real” refletia a divisão entre:", options: ["O governo monárquico de Dom Pedro II e o imperador da Alemanha.", "As leis teóricas da elite litorânea cosmopolita e a realidade empobrecida do povo sertanejo/interiorano.", "O exército brasileiro e os imigrantes italianos de São Paulo.", "A Igreja Católica ultramontana e os fazendeiros de café de Minas Gerais."], answer: 1, why: "A contradição entre a elite litorânea (Brasil Legal) e o sertão esquecido (Brasil Real) marcou o debate republicano inicial." },
  { q: "(História do Brasil) Em “Os Sertões” (1902), Euclides da Cunha identificou o sertanejo como:", options: ["Um tipo biológico inferior que impedia o progresso nacional.", "A reserva moral da nação, forte e resiliente frente à brutalidade do meio.", "Um cidadão perfeitamente integrado às leis cosmopolitas da capital.", "Um agente a serviço do imperialismo europeu."], answer: 1, why: "Euclides da Cunha consagrou a frase “o sertanejo é, antes de tudo, um forte”, vendo nele a essência da brasilidade." },
  { q: "(Civismo Brasileiro) A Liga de Defesa Nacional (LDN), criada em 1916 por Olavo Bilac, defendia como principal pilar de educação cívica e nivelamento social:", options: ["A abolição do exército e a criação de guardas municipais.", "O serviço militar obrigatório e o culto aos símbolos patrióticos.", "A privatização de todas as indústrias estatais.", "O ensino obrigatório do idioma francês nas escolas."], answer: 1, why: "Olavo Bilac e a LDN viam no quartel uma “escola de cidadania” e nivelamento social por meio do serviço militar." },
  { q: "(Geopolítica Contemporânea) Qual evento histórico do século IX é citado pelo presidente russo Vladimir Putin para fundamentar o discurso de que russos e ucranianos são “povo irmão”?", options: ["A assinatura do Pacto de Varsóvia.", "A fundação da Kyivan Rus pelo povo Rus.", "A criação da OTAN em Washington.", "A Revolução Bolchevique de 1917."], answer: 1, why: "A Kyivan Rus (século IX a XIII) é a origem medieval compartilhada de onde deriva o argumento histórico russo." },
  { q: "(Geopolítica Contemporânea) A criação da OTAN (1949) e do Pacto de Varsóvia (1955) ocorreu em qual contexto histórico?", options: ["Durante a Primeira Guerra Mundial.", "No auge da Guerra Fria e da bipolaridade entre EUA e URSS.", "Logo após a Guerra do Golfo em 2003.", "Durante a Primavera Árabe de 2011."], answer: 1, why: "A OTAN e o Pacto de Varsóvia foram os dois braços militares da bipolaridade ideológica da Guerra Fria." },
  { q: "(Oriente Médio) Quais são os quatro pilares fundamentais para compreender a constante efervescência de conflitos no Oriente Médio?", options: ["Clima temperado, turismo, tecnologia e pesca.", "Religião, Território, Petróleo e Posição Estratégica/História.", "Ouro, carvão mineral, energia eólica e agricultura irrigada.", "Canal de Suez, exportação de grãos, biodiversidade e marinha de guerra."], answer: 1, why: "A combinação de locais sagrados multirreligiosos, escassez de água/disputa territorial, 60% do petróleo mundial e rota entre 3 continentes explica a região." },
  { q: "(Oriente Médio) O termo palestino Nakba (“Catástrofe”) refere-se a qual acontecimento histórico de 1948?", options: ["À invasão americana ao Iraque para deposição de Saddam Hussein.", "Ao deslocamento forçado de centenas de milhares de palestinos após a vitória de Israel na guerra que se seguiu à sua declaração de independência.", "À assinatura dos acordos de paz da Primavera Árabe.", "À anexação da Península da Crimeia pela Rússia."], answer: 1, why: "A Nakba (1948) marca a perda de terras e a fuga/expulsão de palestinos com a criação do Estado de Israel." },
];

const jogos: Modulo = {
  id: "jogos",
  numero: "Módulo 4",
  emoji: "🎮",
  titulo: "Central de jogos didáticos",
  resumo: "Quiz de fixação estilo ENEM (10 questões com gabarito comentado), jogo da forca com 5 desafios e jogo da memória com 10 pares.",
  corpo: () => (
    <>
      <Quiz id="g2-quiz-enem" accent={COR} title="Jogo 1: Quiz de fixação (estilo ENEM)" questions={quizENEM} />

      <Section emoji="🔤" title="Jogo 2: Jogo da forca didático (desafios conceituais)">
        <Forca
          titulo="Descubra o termo oculto"
          falar={false}
          palavras={[
            { palavra: "COMUNIDADE IMAGINADA", dica: "Conceito de Benedict Anderson para definir a nação como uma construção mental que une cidadãos que não se conhecem.", pt: "a nação como construção mental (Benedict Anderson)." },
            { palavra: "KYIVAN RUS", dica: "Estado medieval do século IX fundado pelo povo Rus em Kiev, citado pela Rússia como origem ancestral comum.", pt: "Estado eslavo medieval com capital em Kiev." },
            { palavra: "JECA TATU", dica: "Personagem de Monteiro Lobato que simbolizava o brasileiro do interior abandonado pelo Estado, doente de amarelão.", pt: "símbolo do caipira desamparado pelo Estado." },
            { palavra: "OTAN", dica: "Aliança militar ocidental criada em 1949 pelos EUA cuja expansão rumo ao Leste provocou fortes tensões com a Rússia.", pt: "Organização do Tratado do Atlântico Norte." },
            { palavra: "NAKBA", dica: "Palavra em árabe que significa “Catástrofe”, usada pelos palestinos para nomear a perda de territórios e deslocamento em 1948.", pt: "“Catástrofe” palestina de 1948." },
          ]}
        />
      </Section>

      <Section emoji="🃏" title="Jogo 3: Jogo da memória conceitual (cartões pareados)">
        <JogoMemoria
          titulo="Conceito ↔ definição"
          falar={false}
          longo
          rotulos={["🅰️ Conceito", "🅱️ Definição"]}
          ajuda="Encontre os pares: cada conceito (carta A) com sua definição e aplicação geopolítica (carta B)."
          pares={[
            ["Alsácia-Lorena", "Região disputada que alimentou o Nacionalismo Revanchista entre França e Alemanha após 1870."],
            ["Brasil Real", "O povo do interior, o sertanejo e o caboclo, em contraste com a elite litorânea."],
            ["Liga de Defesa Nacional", "Entidade cívica de 1916 fundada por Olavo Bilac para promover o serviço militar e o patriotismo."],
            ["Movimento da Anta", "Vertente ufanista do Modernismo que via no Tupi a mitologia e a ancestralidade do brasileiro."],
            ["Farias Brito", "Filósofo que criticou o materialismo do liberalismo e do marxismo, inspirando a reação católica."],
            ["Doutrina Truman", "Política dos EUA de 1947 destinada a conter a expansão do comunismo soviético na Europa."],
            ["Mar da China Meridional", "Área de forte presença militar americana e reivindicação territorial da China em expansão."],
            ["Anexação da Crimeia", "Evento de 2014 em que a Rússia tomou a península ao sul da Ucrânia."],
            ["Faixa de Gaza", "Território palestino governado pelo grupo Hamas desde 2007 sob severo bloqueio israelense."],
            ["Sunitas vs. Xiitas", "Divisão religiosa do Islã refletida na rivalidade entre Arábia Saudita e Irã."],
          ]}
        />
      </Section>
    </>
  ),
};

/* ============================== Glossário ============================== */

const glossario: Modulo = {
  id: "glossario",
  numero: "Módulo 5",
  emoji: "📖",
  titulo: "Glossário de conceitos-chave",
  resumo: "Revisão rápida dos 10 conceitos mais importantes, com a definição direta e o contexto de aplicação no ENEM.",
  corpo: () => (
    <Section emoji="📖" title="Glossário ilustrado (revisão rápida)">
      <Glossary
        items={[
          ["Nacionalismo", "Ideologia política de afirmação da soberania de uma nação. ENEM: emergência no século XIX; pode ser revanchista, agressivo ou de libertação."],
          ["Comunidade Imaginada", "Tese de Benedict Anderson sobre a natureza da nação. ENEM: conceito abstrato que cria sentimento de pertencimento eliminando diferenças de classe."],
          ["Brasil Legal vs. Real", "Dualidade da sociologia política brasileira pós-1889. ENEM: divisão entre instituições cosmopolitas importadas e o povo humilde do interior."],
          ["Jeca Tatu", "Símbolo literário do caipira criado por Monteiro Lobato. ENEM: representa o brasileiro não como “inferior”, mas como desamparado pelo Estado."],
          ["Positivismo", "Doutrina filosófica racionalista que guiou a Geração de 1870. ENEM: influenciou a Proclamação da República e a busca por um Estado técnico e laico."],
          ["OTAN", "Aliança de defesa coletiva militar liderada pelos EUA (1949). ENEM: ponto central de atrito com a Rússia devido à expansão para o Leste Europeu."],
          ["Kyivan Rus", "Estado eslavo medieval com capital em Kiev (séculos IX–XIII). ENEM: base do argumento de Putin sobre a “unidade ancestral” entre Rússia e Ucrânia."],
          ["Nakba", "“Catástrofe” palestina ocorrida com a criação de Israel (1948). ENEM: deslocamento de centenas de milhares de palestinos; marco do conflito no Oriente Médio."],
          ["Sunitas e Xiitas", "Duas principais vertentes teológicas e políticas do Islamismo. ENEM: disputa de hegemonia regional entre Arábia Saudita (sunita) e Irã (xiita)."],
          ["Guerra Comercial", "Disputa econômica por tarifas entre potências rivais. ENEM: marcou a disputa pela liderança tecnológica e global entre EUA e China."],
        ]}
      />
    </Section>
  ),
};

export const MODULOS: Modulo[] = [modulo1, modulo2, modulo3, jogos, glossario];
