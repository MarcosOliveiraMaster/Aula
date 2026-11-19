# Trilha da Água 💧 — Revisão de Geografia 6º ano

Área de estudos interativa para a **Revisão de Geografia do 6º ano (3º trimestre, cumulativa)**.
Cada questão da lista de revisão é visitada, explicada e respondida em uma trilha com 21 seções, organizadas em 5 módulos:

1. Hidrosfera, oceanos e mares
2. Ciclo da água e rios
3. Água doce e sustentabilidade
4. Hidrelétricas e hidrovias
5. Bacias e hidrovias do Brasil

## O que cada seção tem

- **📖 Explicação**: o conteúdo teórico, com dicas e "pegadinhas" da prova (com botão 🔊 para ouvir).
- **🎬 Animação**: cenas animadas baseadas no roteiro de motion graphics (ciclo da água, eclusa, usina, delta/estuário, aquífero…).
- **✏️ Questões da revisão**: as questões do PDF, interativas (associação, V/F, múltipla escolha, resposta curta, resposta aberta com verificação de ideias-chave, completar imagem), sempre com o **gabarito comentado**.
- **🎮 Jogos**: ao final de cada seção, **2 jogos sorteados** entre **Quiz, Memória, Forca e Flashcards**. A combinação muda de uma seção para a outra (nunca repete o par da seção anterior) e pode ser sorteada de novo com o botão 🎲.

O progresso fica salvo no navegador (`localStorage`).

## Como rodar

É um site estático (HTML, CSS e JavaScript puro, sem build):

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`. O workflow `.github/workflows/deploy-pages.yml` publica no GitHub Pages a cada push na `main`.

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Página única da aplicação |
| `css/style.css` | Estilos, animações e tema claro/escuro |
| `js/data.js` | Conteúdo: explicações, questões, gabarito e banco dos jogos |
| `js/scenes.js` | Ilustrações SVG animadas e diagramas das questões 2 e 11 |
| `js/app.js` | Navegação, progresso, exercícios e sorteio dos jogos |
| `js/games.js` | Quiz, Memória, Forca e Flashcards |

Para editar o conteúdo, basta alterar `js/data.js`.
