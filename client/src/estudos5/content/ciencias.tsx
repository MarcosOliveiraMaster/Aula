import type { ReactNode } from "react";
import type { Topic } from "../types";
import { questoesCiencias } from "./questoes-ciencias";
import cruzadinhas from "./cruzadinhas.json";
import { Callout, Card, CardGrid, FillBlanks, Glossary, Quiz, Say, Section, Sorter, WordChips, sayEnglish } from "../ui";
import { Cruzadinha, Forca, JogoMemoria, LabirintoTempestades, LigarPontos } from "../jogos";
import { CacaMaquinas, SejaMeteorologista, SimAlavanca, SimClimaSevero, SimFerramentasTempo, SimNuvem, SimPolia, SimRampa, SimRodaEixo, SimSol, SimTiposNuvem } from "../simuladores-ciencias";

const SCI = "#0f8fa8";

/** Bloco em inglês: cada parágrafo com botão de ouvir. */
function InEnglish({ paragrafos, children }: { paragrafos: string[]; children?: ReactNode }) {
  return (
    <Section emoji="🇬🇧" title="Now in English! (Agora em inglês)">
      <p className="k-vis-help">Você já entendeu em português. Agora leia (e ouça) a mesma explicação em inglês:</p>
      <div className="k-english">
        {paragrafos.map((p) => (
          <div key={p.slice(0, 30)} className="k-english-p">
            <Say text={p} />
            <p lang="en">{p}</p>
          </div>
        ))}
        <button className="k-btn ghost" onClick={() => sayEnglish(paragrafos.join(" "))}>🔊 Listen to everything</button>
      </div>
      {children}
    </Section>
  );
}

function PalavrasChave({ palavras, children }: { palavras: Array<[string, string]>; children?: ReactNode }) {
  return (
    <Section emoji="🔑" title="Key words (palavras-chave para memorizar)">
      <p className="k-vis-help">Toque em cada palavra para ouvir a pronúncia. Repita em voz alta!</p>
      <WordChips words={palavras} />
      {children}
    </Section>
  );
}

const topicos: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "maquinas-simples",
    subject: "sci",
    emoji: "⚙️",
    title: "Máquinas simples · Simple machines",
    subtitle: "U3 · Simple Machines",
    summary: "Máquinas simples são ferramentas com poucas ou nenhuma parte móvel que facilitam o trabalho: nos ajudam a mover, levantar, cortar ou prender coisas com menos esforço.",
    narration:
      "Máquinas simples são ferramentas com poucas partes, ou nenhuma parte móvel, que deixam o trabalho mais fácil. Em Ciências, trabalho é usar uma força para mover um objeto. As máquinas simples não fazem o trabalho por nós, mas mudam o tamanho ou a direção da força, para precisarmos de menos esforço. São seis: a alavanca, a roda e eixo, a polia, o plano inclinado, a cunha e o parafuso. Elas estão em todo lugar: na tesoura, na bicicleta, no escorregador, na tampa do pote e no machado.",
    body: () => (
      <>
        <Section emoji="🤔" title="O que são máquinas simples?" accent={SCI}
          narration="Máquinas simples são ferramentas com poucas partes, ou nenhuma parte móvel, que facilitam o trabalho. Em Ciências, trabalho é quando usamos uma força para mover um objeto. A máquina não faz o trabalho sozinha: ela muda o tamanho ou a direção da força, e assim precisamos de menos esforço.">
          <p>
            <b>Máquinas simples</b> são ferramentas com <b>poucas partes</b> (ou nenhuma parte que se mexe) que deixam o <b>trabalho mais fácil</b>.
          </p>
          <Callout kind="lembre" title="O que é “trabalho” em Ciências?">
            É quando usamos uma <b>força</b> (empurrar ou puxar) para <b>mover</b> um objeto. Se você empurra uma parede e ela não se mexe, em Ciências <b>não houve trabalho</b>!
          </Callout>
          <p>
            A máquina simples <b>não faz o trabalho por nós</b>. Ela ajuda de três jeitos: <b>diminui a força</b> que precisamos fazer, <b>muda a direção</b> da força (puxar para baixo em vez de levantar) ou <b>aumenta a distância/velocidade</b> do movimento.
          </p>
        </Section>

        <Section emoji="🧰" title="As 6 máquinas simples">
          <CardGrid min={170}>
            <Card emoji="🎢" title="Alavanca" tone="#e3f6fa">Barra que gira em um ponto de apoio. Ex.: gangorra, tesoura.</Card>
            <Card emoji="🚲" title="Roda e eixo" tone="#e3f6fa">Roda grande presa a um eixo. Ex.: maçaneta, volante.</Card>
            <Card emoji="🏗️" title="Polia" tone="#e3f6fa">Roda com uma corda. Ex.: mastro da bandeira, poço.</Card>
            <Card emoji="🛝" title="Plano inclinado" tone="#e3f6fa">Uma rampa. Ex.: escorregador, rampa de caminhão.</Card>
            <Card emoji="🪓" title="Cunha" tone="#e3f6fa">Dois planos inclinados juntos, com ponta afiada. Ex.: machado, faca.</Card>
            <Card emoji="🔩" title="Parafuso" tone="#e3f6fa">Um plano inclinado enrolado. Ex.: parafuso, tampa de pote.</Card>
          </CardGrid>
        </Section>

        <Section emoji="🛝" title="Simulador: a rampa (plano inclinado)" accent={SCI}
          narration="Vamos testar o plano inclinado. Mude a inclinação da rampa e empurre a caixa. Repare que, quanto mais deitada a rampa, menos força você precisa fazer, mas o caminho fica mais longo.">
          <SimRampa />
        </Section>

        <Section emoji="🔎" title="Máquinas simples ao nosso redor">
          <CacaMaquinas />
        </Section>

        <InEnglish
          paragrafos={[
            "Simple machines are tools with few or no moving parts. They make work easier.",
            "In science, work happens when a force moves an object. Simple machines do not do the work for us. They change the size or the direction of the force, so we need less effort.",
            "There are six simple machines: the lever, the wheel and axle, the pulley, the inclined plane, the wedge and the screw.",
            "An inclined plane is a ramp. A wedge is two inclined planes together, like an axe. A screw is an inclined plane wrapped around a pole, like a jar lid.",
          ]}
        />

        <PalavrasChave palavras={[["simple machine", "máquina simples"], ["work", "trabalho"], ["force", "força"], ["effort", "esforço"], ["load", "carga"], ["lever", "alavanca"], ["wheel and axle", "roda e eixo"], ["pulley", "polia"], ["inclined plane", "plano inclinado"], ["ramp", "rampa"], ["wedge", "cunha"], ["screw", "parafuso"]]}>
          <JogoMemoria titulo="Memória das máquinas" pares={[["lever", "alavanca"], ["pulley", "polia"], ["wedge", "cunha"], ["screw", "parafuso"], ["ramp", "rampa"], ["wheel", "roda"]]} />
        </PalavrasChave>

        <Section emoji="🔗" title="Ligue o objeto à máquina simples">
          <LigarPontos
            titulo="Which simple machine?"
            esquerda={["🪓 An axe", "🛝 A ramp to a truck", "🫙 A bottle cap", "🎢 A seesaw"]}
            direita={["Lever", "Screw", "Wedge", "Inclined plane"]}
            certo={[2, 3, 1, 0]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "alavanca",
    subject: "sci",
    emoji: "🎢",
    title: "Alavanca · Lever",
    subtitle: "U3 · Lever",
    summary: "A alavanca é uma barra que gira em torno de um ponto de apoio, o fulcro. Dependendo do que fica no meio, ela é de 1ª, 2ª ou 3ª classe.",
    narration:
      "A alavanca é uma barra rígida que gira em torno de um ponto de apoio chamado fulcro. Ela tem três partes: o fulcro, a carga, que é o objeto que queremos mover, e o esforço, que é a força que fazemos. Existem três classes de alavanca. Na primeira classe, o fulcro fica no meio, como na gangorra e na tesoura. Na segunda classe, a carga fica no meio, como no carrinho de mão e no quebra-nozes. Na terceira classe, o esforço fica no meio, como na vassoura e na vara de pescar. Um truque para lembrar: F, C, E. Fulcro no meio é primeira, carga no meio é segunda, esforço no meio é terceira.",
    body: () => (
      <>
        <Section emoji="🎢" title="O que é uma alavanca?" accent={SCI}
          narration="A alavanca é uma barra rígida que gira em torno de um ponto de apoio, chamado fulcro. Ela tem três partes: o fulcro, a carga e o esforço.">
          <p>A <b>alavanca</b> é uma <b>barra rígida</b> que gira em torno de um <b>ponto de apoio</b>. Ela tem 3 partes:</p>
          <CardGrid min={170}>
            <Card emoji="🔺" title="Fulcro (fulcrum)" tone="#efeaff">O <b>ponto de apoio</b>, onde a barra gira.</Card>
            <Card emoji="📦" title="Carga (load)" tone="#fff4dc">O <b>objeto</b> que queremos mover ou levantar.</Card>
            <Card emoji="💪" title="Esforço (effort)" tone="#fdecea">A <b>força</b> que fazemos para mover a carga.</Card>
          </CardGrid>
        </Section>

        <Section emoji="🔢" title="As três classes de alavanca" accent={SCI}
          narration="Existem três classes de alavanca, e o que muda é o que fica no meio. Na primeira classe, o fulcro fica no meio. Na segunda, a carga fica no meio. Na terceira, o esforço fica no meio.">
          <div className="k-table-wrap">
            <table className="k-table">
              <thead><tr><th>Classe</th><th>O que fica no MEIO?</th><th>Exemplos</th></tr></thead>
              <tbody>
                <tr><td><b>1ª classe</b><br /><small lang="en">First class</small></td><td>🔺 <b>Fulcro</b> (entre o esforço e a carga)</td><td>Gangorra, tesoura, alicate, pé de cabra</td></tr>
                <tr><td><b>2ª classe</b><br /><small lang="en">Second class</small></td><td>📦 <b>Carga</b></td><td>Carrinho de mão, quebra-nozes, abridor de garrafa</td></tr>
                <tr><td><b>3ª classe</b><br /><small lang="en">Third class</small></td><td>💪 <b>Esforço</b></td><td>Vassoura, vara de pescar, pinça, taco</td></tr>
              </tbody>
            </table>
          </div>
          <Callout kind="dica" title="Truque para decorar: F – C – E (1, 2, 3)">
            <b>F</b>ulcro no meio = <b>1ª</b> · <b>C</b>arga no meio = <b>2ª</b> · <b>E</b>sforço no meio = <b>3ª</b>. Em inglês: <b lang="en">F – L – E</b> (<i lang="en">Fulcrum, Load, Effort</i>).
          </Callout>
        </Section>

        <Section emoji="🧪" title="Simulador de alavanca">
          <SimAlavanca />
        </Section>

        <Section emoji="✅" title="Pratique: qual é a classe?">
          <Sorter
            id="classes-alavanca"
            accent={SCI}
            buckets={["1ª classe", "2ª classe", "3ª classe"]}
            items={[
              { text: "✂️ Tesoura (fulcro no meio)", answer: 0 },
              { text: "🎣 Vara de pescar (a mão faz força no meio)", answer: 2 },
              { text: "🌰 Quebra-nozes (a noz fica no meio)", answer: 1 },
              { text: "🎢 Gangorra", answer: 0 },
              { text: "🧹 Vassoura", answer: 2 },
              { text: "🛒 Carrinho de mão (a carga fica no meio)", answer: 1 },
            ]}
          />
        </Section>

        <InEnglish
          paragrafos={[
            "A lever is a stiff bar that turns on a point called the fulcrum.",
            "A lever has three parts: the fulcrum, the load and the effort. The load is the object we want to move. The effort is the force we use.",
            "In a first class lever, the fulcrum is in the middle, between the effort and the load. Examples: a seesaw and a pair of scissors.",
            "In a second class lever, the load is in the middle. Examples: a wheelbarrow and a nutcracker.",
            "In a third class lever, the effort is in the middle. Examples: a broom and a fishing rod.",
          ]}
        />

        <PalavrasChave palavras={[["lever", "alavanca"], ["fulcrum", "fulcro, ponto de apoio"], ["load", "carga"], ["effort", "esforço"], ["first class", "primeira classe"], ["second class", "segunda classe"], ["third class", "terceira classe"], ["seesaw", "gangorra"], ["scissors", "tesoura"], ["wheelbarrow", "carrinho de mão"], ["nutcracker", "quebra-nozes"], ["broom", "vassoura"], ["fishing rod", "vara de pescar"]]}>
          <Forca titulo="Forca da alavanca" palavras={[
            { palavra: "FULCRUM", dica: "Ponto de apoio da alavanca", pt: "fulcro" },
            { palavra: "LEVER", dica: "Barra que gira num ponto de apoio", pt: "alavanca" },
            { palavra: "LOAD", dica: "O objeto que queremos levantar", pt: "carga" },
            { palavra: "EFFORT", dica: "A força que fazemos", pt: "esforço" },
            { palavra: "SEESAW", dica: "Brinquedo do parquinho (1ª classe)", pt: "gangorra" },
            { palavra: "BROOM", dica: "Usada para varrer (3ª classe)", pt: "vassoura" },
            { palavra: "WHEELBARROW", dica: "Carrinho para levar terra (2ª classe)", pt: "carrinho de mão" },
          ]} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "roda-eixo",
    subject: "sci",
    emoji: "🚲",
    title: "Roda e eixo · Wheel and axle",
    subtitle: "U3 · Wheel and Axle",
    summary: "A roda e eixo é uma roda grande presa a uma barra menor, o eixo. Os dois giram juntos, e girar a roda grande exige menos força para mover cargas.",
    narration:
      "A roda e eixo é uma máquina simples formada por uma roda grande presa a um eixo, que é uma barra ou cilindro menor. Os dois giram juntos. Quando giramos a roda grande, o eixo pequeno gira com mais força, por isso precisamos de menos esforço. Quanto maior a roda em relação ao eixo, mais fácil fica. Também funciona ao contrário: quando a força está no eixo, como na bicicleta e no carro, a roda grande gira mais longe e mais rápido. Exemplos: maçaneta, volante, chave de fenda, torneira, catavento e bicicleta.",
    body: () => (
      <>
        <Section emoji="🚲" title="O que é a roda e eixo?" accent={SCI}
          narration="A roda e eixo é uma roda grande presa a um eixo menor. Os dois giram juntos. Girando a roda grande, fazemos menos força para mover a carga.">
          <p>
            A <b>roda e eixo</b> é uma <b>roda grande</b> presa a uma <b>barra menor</b>, chamada <b>eixo</b>. Os dois <b>giram juntos</b>.
          </p>
          <CardGrid>
            <Card emoji="⭕" title="Girando a roda (grande)" tone="#e3f6fa">
              Você faz <b>pouca força</b> na roda grande e o eixo gira com <b>muita força</b>. Ex.: <b>maçaneta</b>, <b>volante</b>, <b>chave de fenda</b>, <b>torneira</b>.
            </Card>
            <Card emoji="⚫" title="Girando o eixo (pequeno)" tone="#fff4dc">
              A força no eixo faz a roda grande ir <b>mais longe e mais rápido</b>. Ex.: <b>bicicleta</b>, <b>carro</b>, <b>ventilador</b>.
            </Card>
          </CardGrid>
          <Callout kind="dica" title="Experimente!">
            Tente abrir uma porta girando só o “pino” da maçaneta, sem a parte redonda. É muito mais difícil! A parte grande (a roda) facilita o trabalho.
          </Callout>
        </Section>

        <Section emoji="🧪" title="Simulador: roda e eixo levantando um balde">
          <SimRodaEixo />
        </Section>

        <Section emoji="🔗" title="Ligue: onde está a roda e eixo?">
          <LigarPontos
            titulo="Roda e eixo no dia a dia"
            esquerda={["🚪 Maçaneta", "🚗 Volante", "🪛 Chave de fenda", "🚰 Torneira"]}
            direita={["Faucet", "Doorknob", "Screwdriver", "Steering wheel"]}
            certo={[1, 3, 2, 0]}
          />
        </Section>

        <InEnglish
          paragrafos={[
            "A wheel and axle is a simple machine made of a large wheel attached to a smaller rod called the axle. They turn together.",
            "When you turn the big wheel, the small axle turns with more force. So you need less effort to move a load.",
            "The bigger the wheel compared to the axle, the easier the work.",
            "Examples: a doorknob, a steering wheel, a screwdriver, a faucet and a bicycle.",
          ]}
        />

        <PalavrasChave palavras={[["wheel", "roda"], ["axle", "eixo"], ["turn", "girar"], ["doorknob", "maçaneta"], ["steering wheel", "volante"], ["screwdriver", "chave de fenda"], ["faucet", "torneira"], ["bicycle", "bicicleta"]]}>
          <JogoMemoria titulo="Memória da roda e eixo" pares={[["wheel", "roda"], ["axle", "eixo"], ["doorknob", "maçaneta"], ["faucet", "torneira"], ["steering wheel", "volante"], ["screwdriver", "chave de fenda"]]} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "polia",
    subject: "sci",
    emoji: "🏗️",
    title: "Polia · Pulley",
    subtitle: "U3 · Pulley",
    summary: "A polia é uma roda com um sulco por onde passa uma corda. Ela pode mudar a direção da força (polia fixa) ou diminuir a força necessária (polia móvel).",
    narration:
      "A polia é uma roda com um sulco, uma canaleta, por onde passa uma corda. Existem três tipos. A polia fixa fica presa no lugar e não se move. Ela muda a direção da força: puxamos a corda para baixo e a carga sobe. A força continua a mesma, mas puxar para baixo é mais fácil. A polia móvel sobe junto com a carga. Duas partes da corda seguram o peso, então fazemos metade da força. As polias combinadas, ou sistema de polias, juntam polias fixas e móveis, e quanto mais partes da corda seguram a carga, menos força fazemos. Mas atenção: com menos força, precisamos puxar mais corda.",
    body: () => (
      <>
        <Section emoji="🏗️" title="O que é uma polia?" accent={SCI}
          narration="A polia é uma roda com uma canaleta por onde passa uma corda. Ela ajuda a levantar coisas pesadas.">
          <p>A <b>polia</b> é uma <b>roda com um sulco</b> (uma canaleta) por onde passa uma <b>corda</b>. Ela ajuda a <b>levantar</b> coisas pesadas.</p>
          <CardGrid min={190}>
            <Card emoji="📌" title="Polia fixa (fixed pulley)" tone="#e3f6fa">
              Fica <b>presa no lugar</b>. <b>Muda a direção da força</b>: você puxa para <b>baixo</b> e a carga <b>sobe</b>. Ex.: mastro da bandeira, poço, cortina.
            </Card>
            <Card emoji="🔼" title="Polia móvel (movable pulley)" tone="#e6f6ef">
              <b>Sobe junto</b> com a carga. Duas partes da corda seguram o peso: você faz <b>metade da força</b>.
            </Card>
            <Card emoji="🔗" title="Polias combinadas (compound)" tone="#fff4dc">
              Juntam polias fixas e móveis. <b>Muito menos força</b>! Ex.: guindastes e elevadores.
            </Card>
          </CardGrid>
          <Callout kind="atencao" title="Sempre tem uma troca!">
            Quanto <b>menos força</b> a polia exige, <b>mais corda</b> você precisa puxar.
          </Callout>
        </Section>

        <Section emoji="🧪" title="Simulador de polias">
          <SimPolia />
        </Section>

        <Section emoji="🌳" title="O desafio da Maya">
          <p lang="en">
            Maya wants to move a heavy wooden crate up to her treehouse. Pulling it straight up with a single rope is too hard. Her brother suggests attaching a <b>wheel to the branch</b>, threading the rope through it and <b>pulling down</b> instead of lifting up.
          </p>
          <Quiz
            id="maya-polia"
            accent={SCI}
            title="How does this simple machine help Maya?"
            questions={[
              {
                q: "How does using this simple machine help Maya lift the heavy crate?",
                options: ["It decreases the actual weight of the crate.", "It changes the direction of the force needed, making it easier to pull.", "It eliminates gravity completely.", "It moves the crate automatically without effort."],
                answer: 1,
                why: "É uma polia fixa: o peso continua o mesmo, mas ela muda a direção da força. Puxar para baixo é mais fácil, porque podemos usar o peso do nosso corpo.",
              },
            ]}
          />
        </Section>

        <Section emoji="✅" title="True or False? (Verdadeiro ou falso?)">
          <Sorter
            id="polias-vf"
            accent={SCI}
            buckets={["True ✔", "False ✘"]}
            items={[
              { text: "A fixed pulley stays in one place and does not move.", answer: 0 },
              { text: "Pulling down on a fixed pulley rope makes the heavy object go up.", answer: 0 },
              { text: "A movable pulley helps you lift things with less effort.", answer: 0 },
              { text: "A fixed pulley makes the load lighter.", answer: 1 },
              { text: "With more pulleys, you pull less rope.", answer: 1 },
            ]}
          />
        </Section>

        <InEnglish
          paragrafos={[
            "A pulley is a wheel with a groove that holds a rope. It helps us lift heavy loads.",
            "A fixed pulley stays in one place. It changes the direction of the force: you pull down and the load goes up.",
            "A movable pulley moves up with the load. Two parts of the rope hold the weight, so you need half the effort.",
            "A compound pulley uses fixed and movable pulleys together. You need even less effort, but you must pull more rope.",
          ]}
        />

        <PalavrasChave palavras={[["pulley", "polia"], ["rope", "corda"], ["groove", "sulco, canaleta"], ["fixed pulley", "polia fixa"], ["movable pulley", "polia móvel"], ["compound pulley", "polias combinadas"], ["lift", "levantar"], ["pull", "puxar"], ["direction", "direção"], ["crate", "caixote"]]}>
          <Forca titulo="Forca das polias" palavras={[
            { palavra: "PULLEY", dica: "Roda com uma corda", pt: "polia" },
            { palavra: "ROPE", dica: "Passa pelo sulco da polia", pt: "corda" },
            { palavra: "FIXED", dica: "A polia que fica presa no lugar", pt: "fixa" },
            { palavra: "MOVABLE", dica: "A polia que sobe junto com a carga", pt: "móvel" },
            { palavra: "LIFT", dica: "Levantar", pt: "levantar" },
            { palavra: "DIRECTION", dica: "A polia fixa muda a ___ da força", pt: "direção" },
          ]} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "energia-sol",
    subject: "sci",
    emoji: "☀️",
    title: "Energia do Sol · Energy from the Sun",
    subtitle: "U4 · Weather",
    summary: "O Sol aquece a Terra. Esse calor movimenta o ar e a água e cria o tempo (sol, chuva, vento) que sentimos todos os dias.",
    narration:
      "O Sol é uma estrela que envia luz e calor para a Terra. Essa energia aquece o solo, a água e o ar. A Terra é cercada por uma camada de gases chamada atmosfera, que guarda parte desse calor. O aquecimento não é igual em todo lugar: a terra esquenta e esfria mais rápido do que a água, e os lugares onde os raios do Sol chegam mais diretos, como perto do Equador, são mais quentes. Quando o ar esquenta, ele sobe, e o ar frio desce para o lugar dele, formando o vento. É assim que o Sol cria o tempo: as condições do céu e do ar em um dia, como sol, chuva ou vento. Medimos a temperatura, que é o quanto algo está quente ou frio, em graus, usando o termômetro.",
    body: () => (
      <>
        <Section emoji="☀️" title="O Sol aquece a Terra" accent={SCI}
          narration="O Sol é uma estrela que manda luz e calor para a Terra. Essa energia aquece o solo, a água e o ar. A Terra é cercada pela atmosfera, uma camada de gases que guarda parte desse calor.">
          <p>O <b>Sol</b> é uma estrela que envia <b>luz e calor</b> para a Terra. Essa energia aquece o <b>solo</b>, a <b>água</b> e o <b>ar</b>.</p>
          <p>A Terra é cercada por uma camada de gases chamada <b>atmosfera</b>. Ela funciona como um cobertor: deixa a luz entrar e <b>guarda parte do calor</b>.</p>
          <SimSol />
        </Section>

        <Section emoji="🌍" title="Por que uns lugares são mais quentes?">
          <CardGrid min={190}>
            <Card emoji="🎯" title="Raios diretos" tone="#fff4dc">Perto do <b>Equador</b> (como no Brasil), os raios chegam <b>retos</b> e esquentam mais. Nos <b>polos</b>, chegam <b>inclinados</b> e esquentam pouco.</Card>
            <Card emoji="🏜️" title="Terra x água" tone="#e3f6fa">A <b>terra</b> esquenta e esfria <b>rápido</b>. A <b>água</b> esquenta e esfria <b>devagar</b>.</Card>
            <Card emoji="🌬️" title="O vento nasce do Sol!" tone="#e6f6ef">O <b>ar quente sobe</b> e o <b>ar frio desce</b> para ocupar o lugar. Esse movimento do ar é o <b>vento</b>.</Card>
          </CardGrid>
        </Section>

        <Section emoji="🌦️" title="Tempo, temperatura e termômetro" accent={SCI}
          narration="Tempo é como estão o céu e o ar em um dia: se está ensolarado, chuvoso ou com vento. Temperatura é o quanto algo está quente ou frio, e é medida em graus. Para medir a temperatura do ar usamos o termômetro.">
          <Glossary items={[
            ["Tempo (weather)", "Como estão o céu e o ar em um dia: ensolarado, chuvoso, com vento…"],
            ["Temperatura (temperature)", "O quanto algo está quente ou frio. Medimos em graus (°C)."],
            ["Termômetro (thermometer)", "Instrumento que mede a temperatura."],
            ["Atmosfera (atmosphere)", "Camada de gases que envolve a Terra."],
            ["Energia térmica (thermal energy)", "A energia do calor."],
          ]} />
          <Callout kind="sabia" title="Tempo é diferente de clima!">
            <b>Tempo</b> é o que acontece <b>hoje</b> (vai chover à tarde?). <b>Clima</b> é como o tempo costuma ser em um lugar ao longo de <b>muitos anos</b> (Maceió tem clima quente).
          </Callout>
        </Section>

        <Section emoji="✏️" title="Complete (Word box)">
          <FillBlanks
            id="sci-q3"
            accent={SCI}
            bank={["atmosphere", "thermometer", "weather", "temperature"]}
            items={[
              { before: "a) The Earth is surrounded by a layer of gases called the", after: ".", answer: "atmosphere" },
              { before: "b) To check how warm or cold the air is outside, you can read a", after: ".", answer: "thermometer" },
              { before: "c) The daily conditions of the sky and air (sunny, rainy, windy) describe the", after: ".", answer: "weather" },
              { before: "d) When we measure thermal energy in degrees, we are measuring", after: ".", answer: "temperature" },
            ]}
          />
        </Section>

        <InEnglish
          paragrafos={[
            "The Sun is a star. It sends light and heat to Earth. This energy warms the land, the water and the air.",
            "The Earth is surrounded by a layer of gases called the atmosphere. It keeps some of the heat, like a blanket.",
            "Land heats up and cools down faster than water. Places near the equator get more direct sunlight, so they are hotter.",
            "Warm air rises and cool air moves in to take its place. This moving air is wind.",
            "Weather is the condition of the sky and the air on a certain day. Temperature tells how hot or cold something is. We measure it with a thermometer.",
          ]}
        />

        <PalavrasChave palavras={[["Sun", "Sol"], ["energy", "energia"], ["heat", "calor"], ["light", "luz"], ["atmosphere", "atmosfera"], ["weather", "tempo"], ["temperature", "temperatura"], ["thermometer", "termômetro"], ["degrees", "graus"], ["wind", "vento"], ["warm", "morno, quente"], ["cold", "frio"]]}>
          <JogoMemoria titulo="Memória do Sol e do tempo" pares={[["Sun", "Sol"], ["heat", "calor"], ["atmosphere", "atmosfera"], ["weather", "tempo"], ["temperature", "temperatura"], ["thermometer", "termômetro"]]} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "nuvens",
    subject: "sci",
    emoji: "☁️",
    title: "Nuvens · Clouds",
    subtitle: "U4 · Clouds",
    summary: "Nuvens são formadas por gotinhas de água ou cristais de gelo. Os três tipos principais são cirrus (altas e finas), cumulus (fofas) e stratus (baixas e cinzentas).",
    narration:
      "As nuvens se formam quando o Sol aquece a água, que evapora e sobe como vapor. Lá no alto o ar é frio, e o vapor esfria e se transforma em gotinhas de água ou cristais de gelo. Bilhões dessas gotinhas juntas formam uma nuvem. Isso se chama condensação. Existem três tipos principais de nuvens. As cirrus são altas, finas e parecem penas. Elas são feitas de cristais de gelo. As cumulus são brancas e fofas, parecem bolas de algodão, e aparecem em dias bonitos. As stratus são baixas, cinzentas e cobrem o céu como um cobertor, e podem trazer garoa. Quando uma cumulus cresce muito e fica escura, vira uma cumulonimbus, a nuvem das tempestades.",
    body: () => (
      <>
        <Section emoji="💧" title="Como as nuvens se formam?" accent={SCI}
          narration="O Sol aquece a água, que evapora e sobe como vapor. Lá no alto o ar é frio, e o vapor vira gotinhas de água ou cristais de gelo. Juntas, elas formam a nuvem. Esse processo faz parte do ciclo da água.">
          <p>As nuvens fazem parte do <b>ciclo da água</b>. Toque em cada etapa:</p>
          <SimNuvem />
        </Section>

        <Section emoji="☁️" title="Os três tipos principais de nuvem" accent={SCI}
          narration="Existem três tipos principais de nuvens. Cirrus: altas, finas, parecem penas e são feitas de cristais de gelo. Cumulus: brancas e fofas como algodão. Stratus: baixas e cinzentas, cobrem o céu como um cobertor.">
          <SimTiposNuvem />
          <Callout kind="dica" title="Truque para decorar">
            <b>Cirrus</b> = <b>C</b>abelo (fininho, lá no alto) · <b>Cumulus</b> = <b>C</b>ouve-flor / algodão (fofinho) · <b>Stratus</b> = <b>S</b>obre tudo, como um lençol (cobre o céu).
          </Callout>
          <Callout kind="sabia" title="E a cumulonimbus?">
            Quando uma <b>cumulus</b> cresce muito, fica alta e escura, ela vira uma <b>cumulonimbus</b>: a nuvem das <b>tempestades</b>, com raios e trovões. “Nimbus” quer dizer nuvem de chuva.
          </Callout>
        </Section>

        <Section emoji="✅" title="Identify the cloud (Identifique a nuvem)">
          <Sorter
            id="tipos-nuvem"
            accent={SCI}
            buckets={["Cirrus", "Cumulus", "Stratus"]}
            items={[
              { text: "Blankets of gray, low-hanging clouds that cover the entire sky like a dull curtain.", answer: 2 },
              { text: "Bright white, puffy clouds that look like giant cotton balls.", answer: 1 },
              { text: "High, wispy, feather-like clouds made of ice crystals.", answer: 0 },
              { text: "Nuvens que parecem fios de cabelo bem lá no alto.", answer: 0 },
              { text: "Nuvens que podem trazer garoa e cobrem todo o céu.", answer: 2 },
            ]}
          />
        </Section>

        <InEnglish
          paragrafos={[
            "Clouds form when the Sun heats water. The water evaporates and rises as water vapor.",
            "High in the sky, the air is cold. The water vapor cools down and condenses into tiny water droplets or ice crystals. Together, they form a cloud.",
            "Cirrus clouds are high, thin and wispy. They are made of ice crystals and look like feathers.",
            "Cumulus clouds are white and puffy, like cotton balls. They usually mean nice weather.",
            "Stratus clouds are low and gray. They cover the sky like a blanket and can bring drizzle.",
          ]}
        />

        <PalavrasChave palavras={[["cloud", "nuvem"], ["cirrus", "nuvem alta e fina"], ["cumulus", "nuvem fofa"], ["stratus", "nuvem baixa e cinza"], ["water vapor", "vapor de água"], ["evaporation", "evaporação"], ["condensation", "condensação"], ["precipitation", "precipitação"], ["droplets", "gotinhas"], ["ice crystals", "cristais de gelo"], ["wispy", "fino, fiapo"], ["puffy", "fofo"]]}>
          <Cruzadinha titulo="Cruzadinha das nuvens e do Sol" dados={cruzadinhas.nuvens} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "previsao-tempo",
    subject: "sci",
    emoji: "📡",
    title: "Previsão do tempo · Predict the weather",
    subtitle: "U4 · Predict the Weather",
    summary: "Meteorologistas usam tecnologia — termômetros, balões, radares, satélites e computadores — para observar o tempo e prever como ele vai ficar.",
    narration:
      "Os meteorologistas são os cientistas que estudam o tempo. Eles usam muitas ferramentas para fazer a previsão do tempo. O termômetro mede a temperatura. O anemômetro mede a velocidade do vento. O pluviômetro mede quanta chuva caiu. O barômetro mede a pressão do ar: quando ela cai, pode vir chuva. O balão meteorológico é um balão de hélio que sobe bem alto levando instrumentos para medir a temperatura e o vento lá em cima. O radar meteorológico mostra um mapa colorido de onde está chovendo ou caindo granizo agora. O satélite meteorológico fica no espaço e tira fotos das nuvens e das tempestades vistas de cima da Terra. Computadores juntam todos esses dados para prever o tempo.",
    body: () => (
      <>
        <Section emoji="🧑‍🔬" title="Quem prevê o tempo?" accent={SCI}
          narration="Os meteorologistas são os cientistas que estudam o tempo. Eles coletam dados com várias ferramentas e usam computadores para prever o tempo dos próximos dias.">
          <p>
            Os <b>meteorologistas</b> são os cientistas que estudam o tempo. Eles <b>coletam dados</b> com várias ferramentas e usam <b>computadores</b> para <b>prever</b> como o tempo vai ficar. A tecnologia deixou a previsão muito mais precisa e ajuda a <b>avisar as pessoas</b> antes de tempestades.
          </p>
        </Section>

        <Section emoji="🛠️" title="As ferramentas do meteorologista">
          <p>Toque em cada ferramenta para ver como ela funciona:</p>
          <SimFerramentasTempo />
        </Section>

        <Section emoji="🔗" title="Match the situation to the weather tool">
          <LigarPontos
            titulo="Weather tools"
            esquerda={["🎈 Carries tools high up into the sky to measure temperature", "🗺️ Shows a colored map of rain and hail falling now", "🌍 Takes pictures of clouds and storms from space"]}
            direita={["Weather Satellite", "Weather Balloon", "Weather Radar"]}
            certo={[1, 2, 0]}
          />
        </Section>

        <Section emoji="🔮" title="Agora é sua vez de prever!">
          <SejaMeteorologista />
        </Section>

        <InEnglish
          paragrafos={[
            "Meteorologists are scientists who study the weather. They collect data and use computers to predict the weather.",
            "A thermometer measures temperature. An anemometer measures wind speed. A rain gauge measures how much rain fell. A barometer measures air pressure.",
            "A weather balloon carries tools high up into the sky to measure temperature and wind.",
            "A weather radar shows a colored map of where rain or hail is falling right now.",
            "A weather satellite is in space. It takes pictures of clouds and storms from above Earth.",
          ]}
        />

        <PalavrasChave palavras={[["meteorologist", "meteorologista"], ["predict", "prever"], ["forecast", "previsão do tempo"], ["data", "dados"], ["weather balloon", "balão meteorológico"], ["weather radar", "radar meteorológico"], ["weather satellite", "satélite meteorológico"], ["anemometer", "anemômetro"], ["rain gauge", "pluviômetro"], ["barometer", "barômetro"], ["air pressure", "pressão do ar"]]}>
          <JogoMemoria titulo="Memória das ferramentas" pares={[["forecast", "previsão"], ["radar", "radar"], ["satellite", "satélite"], ["balloon", "balão"], ["rain gauge", "pluviômetro"], ["anemometer", "anemômetro"]]} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "clima-severo",
    subject: "sci",
    emoji: "🌪️",
    title: "Tempo severo · Severe weather",
    subtitle: "U4 · Severe Weather",
    summary: "Tempo severo é o tempo perigoso: tempestades, furacões, tornados, nevascas, secas e enchentes. Conhecer seus efeitos ajuda a nos proteger.",
    narration:
      "Tempo severo é o tempo perigoso, que pode causar estragos e colocar pessoas em risco. A tempestade traz chuva forte, raios e trovões. O furacão é uma tempestade gigante que gira e se forma sobre o mar quente. O tornado é uma coluna de ar que gira muito rápido e toca o chão, saindo de uma nuvem escura. A nevasca é uma grande tempestade de inverno, com neve, vento forte e muito frio. A seca é um longo período sem chuva, em que a terra fica rachada e as plantas morrem. A enchente acontece quando chove muito e a água transborda. Os meteorologistas avisam as pessoas antes, e é importante seguir as orientações de segurança.",
    body: () => (
      <>
        <Section emoji="⚠️" title="O que é tempo severo?" accent={SCI}
          narration="Tempo severo é o tempo perigoso, que pode causar estragos e colocar as pessoas em risco. Toque em cada tipo para ver o que é, quais os efeitos e como se proteger.">
          <p><b>Tempo severo</b> é o tempo <b>perigoso</b>, que pode causar estragos e colocar pessoas em risco. Toque em cada um:</p>
          <SimClimaSevero />
        </Section>

        <Section emoji="📰" title="Weather News Report!">
          <Sorter
            id="noticias-tempo"
            accent={SCI}
            buckets={["Hurricane", "Tornado", "Drought", "Blizzard"]}
            items={[
              { text: "“A dark, spinning cloud touches the ground and pulls up objects!”", answer: 1 },
              { text: "“It has not rained for months! The ground is dry and plants are dying.”", answer: 2 },
              { text: "“A big winter storm brings strong winds, freezing cold and heavy snow.”", answer: 3 },
              { text: "“A giant spinning storm formed over the warm ocean and is reaching the coast.”", answer: 0 },
            ]}
          />
        </Section>

        <Section emoji="🛟" title="Segurança em primeiro lugar">
          <CardGrid min={190}>
            <Card emoji="📻" title="Fique informado" tone="#e3f6fa">Acompanhe os <b>alertas</b> da Defesa Civil e da previsão do tempo.</Card>
            <Card emoji="🎒" title="Kit de emergência" tone="#fff4dc">Água, comida, lanterna, pilhas, remédios e documentos.</Card>
            <Card emoji="🏠" title="Lugar seguro" tone="#e6f6ef">Saiba para onde ir: um cômodo sem janelas, um lugar alto (enchente) ou um abrigo.</Card>
          </CardGrid>
        </Section>

        <InEnglish
          paragrafos={[
            "Severe weather is dangerous weather. It can cause damage and put people at risk.",
            "A thunderstorm brings heavy rain, lightning and thunder. A hurricane is a giant spinning storm that forms over warm ocean water.",
            "A tornado is a column of air that spins very fast. It comes down from a dark cloud and touches the ground.",
            "A blizzard is a big winter storm with strong winds, freezing cold and heavy snow. A drought is a long time with no rain.",
            "Meteorologists warn people before severe weather. Always follow the safety rules.",
          ]}
        />

        <PalavrasChave palavras={[["severe weather", "tempo severo"], ["thunderstorm", "tempestade"], ["lightning", "relâmpago, raio"], ["thunder", "trovão"], ["hurricane", "furacão"], ["tornado", "tornado"], ["blizzard", "nevasca"], ["drought", "seca"], ["flood", "enchente"], ["warning", "alerta"], ["safety", "segurança"]]}>
          <Forca titulo="Forca do tempo severo" palavras={[
            { palavra: "TORNADO", dica: "Nuvem que gira e toca o chão", pt: "tornado" },
            { palavra: "HURRICANE", dica: "Tempestade gigante que nasce no mar quente", pt: "furacão" },
            { palavra: "BLIZZARD", dica: "Tempestade de neve", pt: "nevasca" },
            { palavra: "DROUGHT", dica: "Meses sem chuva", pt: "seca" },
            { palavra: "FLOOD", dica: "Quando a água transborda", pt: "enchente" },
            { palavra: "THUNDER", dica: "O barulho da tempestade", pt: "trovão" },
            { palavra: "LIGHTNING", dica: "A luz da tempestade", pt: "relâmpago" },
          ]} />
        </PalavrasChave>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "review-science",
    subject: "sci",
    emoji: "📝",
    title: "Review Activity (atividade de revisão)",
    subtitle: "Os 8 exercícios do roteiro",
    summary: "A atividade de revisão do roteiro de Science em versão interativa: responda, confira e veja a explicação.",
    narration:
      "Esta é a atividade de revisão de Science. São oito exercícios sobre máquinas simples e sobre o tempo. Faça cada um com calma, clique em conferir e leia a explicação. Lembre-se de levar a atividade de papel para a escola, para a correção em sala.",
    body: () => (
      <>
        <Callout kind="lembre" title="Como estudar">
          Leia o <b>Student Book</b> e faça resumos curtos de cada aula, revise as <b>Cornell Notes</b>, sublinhe as partes importantes, anote suas dúvidas para levar à aula e compare suas respostas com as dos colegas.
        </Callout>

        <Section emoji="1️⃣" title="Connect each tool to the simple machine">
          <LigarPontos
            esquerda={["a) An axe used to split wood", "b) A ramp to push a heavy box into a truck", "c) A bottle cap that twists down", "d) A seesaw that pivots in the middle"]}
            direita={["Inclined plane", "Screw", "Wedge", "Lever"]}
            certo={[2, 0, 1, 3]}
          />
        </Section>

        <Section emoji="2️⃣" title="Maya and the treehouse">
          <Quiz
            id="sci-rev-2"
            accent={SCI}
            title="How does the simple machine help Maya?"
            questions={[{
              q: "Maya threads a rope through a wheel attached to a branch and pulls down to lift a heavy crate. How does this help?",
              options: ["It decreases the actual weight of the crate.", "It changes the direction of the force needed, making it easier to pull.", "It eliminates gravity completely.", "It moves the crate automatically without effort."],
              answer: 1,
              why: "É uma polia fixa: ela muda a direção da força (puxar para baixo é mais fácil), mas o peso continua o mesmo.",
            }]}
          />
        </Section>

        <Section emoji="3️⃣" title="Fill in the blanks (Word box)">
          <FillBlanks
            id="sci-rev-3"
            accent={SCI}
            bank={["Weather", "Thermometer", "Atmosphere", "Temperature"]}
            items={[
              { before: "a) The Earth is surrounded by a layer of gases called the", after: ".", answer: "Atmosphere" },
              { before: "b) To check how warm or cold the air is outside, you can read a", after: ".", answer: "Thermometer" },
              { before: "c) The daily conditions of the sky and air describe the", after: ".", answer: "Weather" },
              { before: "d) When we measure thermal energy in degrees, we are measuring", after: ".", answer: "Temperature" },
            ]}
          />
        </Section>

        <Section emoji="4️⃣" title="Identify the cloud type">
          <Sorter
            id="sci-rev-4"
            accent={SCI}
            buckets={["Cirrus", "Cumulus", "Stratus"]}
            items={[
              { letter: "a", text: "Blankets of gray, low-hanging clouds that cover the entire sky like a dull curtain.", answer: 2 },
              { letter: "b", text: "Bright white, puffy clouds that look like giant cotton balls scattered across a clear sky.", answer: 1 },
              { letter: "c", text: "High, wispy, feather-like clouds made of ice crystals floating far up in the atmosphere.", answer: 0 },
            ]}
          />
        </Section>

        <Section emoji="5️⃣" title="First, second or third class lever?">
          <Sorter
            id="sci-rev-5"
            accent={SCI}
            buckets={["First class", "Second class", "Third class"]}
            items={[
              { letter: "a", text: "A pair of scissors has its fulcrum in the middle between the handle and the blades.", answer: 0 },
              { letter: "b", text: "A fishing rod or a broom: your hand applies force in the middle.", answer: 2 },
              { letter: "c", text: "A nutcracker places the heavy nut in the center with the pivot at the end.", answer: 1 },
              { letter: "d", text: "The fulcrum is always positioned right between the effort and the load.", answer: 0 },
            ]}
          />
        </Section>

        <Section emoji="6️⃣" title="Pulleys: True or False">
          <Sorter
            id="sci-rev-6"
            accent={SCI}
            buckets={["T (True)", "F (False)"]}
            items={[
              { letter: "a", text: "A fixed pulley stays in one place and does not move.", answer: 0 },
              { letter: "b", text: "Pulling down on a fixed pulley rope makes the heavy object go up.", answer: 0 },
              { letter: "c", text: "A movable pulley helps you lift things with less effort.", answer: 0 },
            ]}
          />
        </Section>

        <Section emoji="7️⃣" title="Weather News Report!">
          <Sorter
            id="sci-rev-7"
            accent={SCI}
            buckets={["Hurricane", "Tornado", "Drought", "Blizzard"]}
            items={[
              { letter: "a", text: "“A dark, spinning cloud touches the ground and pulls up objects!”", answer: 1 },
              { letter: "b", text: "“It has not rained for months! The ground is dry and plants are dying.”", answer: 2 },
              { letter: "c", text: "“A big winter storm brings strong winds, freezing cold, and heavy snow.”", answer: 3 },
            ]}
          />
        </Section>

        <Section emoji="8️⃣" title="Match each situation to the weather tool">
          <LigarPontos
            esquerda={["a) A big helium balloon carrying tools high up to measure temperature", "b) Shows a colored map of rain and hail falling in the city right now", "c) A tool in space that takes pictures of clouds and storms"]}
            direita={["Weather Radar", "Weather Satellite", "Weather Balloon"]}
            certo={[2, 0, 1]}
          />
        </Section>
      </>
    ),
  },

  /* ------------------------------------------------------------------ */
  {
    id: "arcade",
    subject: "sci",
    emoji: "🎮",
    title: "Arcade de revisão · Review games",
    subtitle: "Labirinto, cruzadinhas, memória e forca",
    summary: "Hora de jogar! Fuja das tempestades no labirinto, complete as palavras cruzadas e treine as palavras em inglês com memória e forca.",
    narration:
      "Bem-vindo ao arcade de revisão de Science! No labirinto, você precisa fugir das tempestades e sair pela porta que tem a resposta certa. São quatro rodadas. Depois, complete as palavras cruzadas em inglês, jogue a memória e a forca, e termine com o simulado de trinta questões.",
    body: () => (
      <>
        <Section emoji="🌩️" title="Labirinto: fuja das tempestades! (4 rodadas)" accent={SCI}
          narration="Leia a pergunta. Fuja das tempestades e saia pela porta que tem a resposta certa. Você tem três vidas e são quatro rodadas.">
          <LabirintoTempestades
            rodadas={[
              { pergunta: "A seesaw is an example of which simple machine? (Uma gangorra é qual máquina simples?)", opcoes: ["Lever", "Pulley", "Screw", "Wedge", "Wheel and axle"], certa: 0 },
              { pergunta: "Qual nuvem é alta, fina e feita de cristais de gelo?", opcoes: ["Cumulus", "Stratus", "Cirrus", "Nevoeiro", "Cumulonimbus"], certa: 2 },
              { pergunta: "Which tool takes pictures of clouds and storms from space?", opcoes: ["Weather radar", "Thermometer", "Weather balloon", "Weather satellite", "Rain gauge"], certa: 3 },
              { pergunta: "A polia fixa ajuda porque…", opcoes: ["diminui o peso da carga", "elimina a gravidade", "move a carga sozinha", "deixa a corda mais curta", "muda a direção da força"], certa: 4 },
            ]}
          />
        </Section>

        <Section emoji="✏️" title="Palavras cruzadas: máquinas simples">
          <Cruzadinha titulo="Simple machines crossword" dados={cruzadinhas.maquinas} />
        </Section>

        <Section emoji="✏️" title="Palavras cruzadas: o tempo">
          <Cruzadinha titulo="Weather crossword" dados={cruzadinhas.tempo} />
        </Section>

        <Section emoji="🃏" title="Memória: tudo de Science">
          <JogoMemoria titulo="Grande memória de Science" pares={[["lever", "alavanca"], ["pulley", "polia"], ["axle", "eixo"], ["fulcrum", "fulcro"], ["cloud", "nuvem"], ["drought", "seca"], ["blizzard", "nevasca"], ["forecast", "previsão"]]} />
        </Section>

        <Section emoji="🪢" title="Forca: tudo de Science">
          <Forca titulo="Forca de Science" palavras={[
            { palavra: "PULLEY", dica: "Polia", pt: "polia" },
            { palavra: "WEDGE", dica: "Cunha (como o machado)", pt: "cunha" },
            { palavra: "SCREW", dica: "Parafuso", pt: "parafuso" },
            { palavra: "ATMOSPHERE", dica: "Camada de gases em volta da Terra", pt: "atmosfera" },
            { palavra: "CUMULUS", dica: "Nuvem fofa como algodão", pt: "cumulus" },
            { palavra: "STRATUS", dica: "Nuvem baixa e cinzenta", pt: "stratus" },
            { palavra: "SATELLITE", dica: "Tira fotos das nuvens do espaço", pt: "satélite" },
            { palavra: "THERMOMETER", dica: "Mede a temperatura", pt: "termômetro" },
          ]} />
        </Section>
      </>
    ),
  },
];

// No fim de cada assunto: 30 questões (português e inglês).
export const ciencias: Topic[] = topicos.map((topico) => ({ ...topico, quiz: questoesCiencias[topico.id] }));
