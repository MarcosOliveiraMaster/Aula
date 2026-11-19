/* Jogos: Quiz, Memória, Forca e Flashcards */
(function () {
  const U = window.U;

  const GAME_INFO = {
    quiz: { name: "Quiz", icon: "❓", desc: "Responda às perguntas de múltipla escolha." },
    memoria: { name: "Jogo da memória", icon: "🧠", desc: "Encontre os pares: conceito ↔ explicação." },
    forca: { name: "Forca da gota", icon: "💧", desc: "Descubra a palavra antes que a água acabe." },
    flashcards: { name: "Flashcards", icon: "🃏", desc: "Vire os cartões e revise os conceitos." }
  };

  /* ---------------- QUIZ ---------------- */
  function quiz(el, topic, done) {
    const qs = U.shuffle(topic.games.quiz).slice(0, 4).map(q => {
      const opts = q.options.map((t, i) => ({ t, ok: i === q.answer }));
      return { q: q.q, opts: U.shuffle(opts) };
    });
    let i = 0, score = 0;
    function render() {
      if (i >= qs.length) {
        el.innerHTML = `<div class="game-end"><div class="big">${score === qs.length ? "🏆" : score >= qs.length / 2 ? "🎉" : "💪"}</div>
          <p>Você acertou <strong>${score} de ${qs.length}</strong>!</p>
          <button class="btn ghost" data-act="again">Jogar de novo</button></div>`;
        el.querySelector("[data-act=again]").onclick = () => { i = 0; score = 0; quiz(el, topic, done); };
        done(score, qs.length);
        return;
      }
      const cur = qs[i];
      el.innerHTML = `<div class="quiz">
        <div class="quiz-top"><span>Pergunta ${i + 1}/${qs.length}</span><span>⭐ ${score}</span></div>
        <div class="progress thin"><span style="width:${(i / qs.length) * 100}%"></span></div>
        <p class="quiz-q">${U.esc(cur.q)}</p>
        <div class="quiz-opts">${cur.opts.map((o, k) => `<button class="opt" data-k="${k}"><b>${"ABCD"[k]}</b> ${U.esc(o.t)}</button>`).join("")}</div>
        <div class="quiz-fb" aria-live="polite"></div></div>`;
      el.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        const k = +b.dataset.k;
        el.querySelectorAll(".opt").forEach((x, j) => { x.disabled = true; if (cur.opts[j].ok) x.classList.add("right"); });
        const fb = el.querySelector(".quiz-fb");
        if (cur.opts[k].ok) { score++; fb.innerHTML = `<span class="ok">✅ Correto!</span>`; U.sfx("ok"); }
        else { b.classList.add("wrong"); fb.innerHTML = `<span class="bad">❌ A resposta certa está destacada em verde.</span>`; U.sfx("bad"); }
        fb.insertAdjacentHTML("beforeend", ` <button class="btn small">${i + 1 < qs.length ? "Próxima ➜" : "Ver resultado"}</button>`);
        fb.querySelector("button").onclick = () => { i++; render(); };
      });
    }
    render();
  }

  /* ---------------- MEMÓRIA ---------------- */
  function memoria(el, topic, done) {
    const pairs = U.shuffle(topic.games.pairs).slice(0, 6);
    const cards = U.shuffle(pairs.flatMap((p, id) => [{ id, t: p[0], kind: "term" }, { id, t: p[1], kind: "def" }]));
    let open = [], found = 0, moves = 0, lock = false;
    el.innerHTML = `<div class="mem-top"><span>Jogadas: <b class="mv">0</b></span><span>Pares: <b class="fd">0</b>/${pairs.length}</span></div>
      <div class="mem-grid">${cards.map((c, k) => `<button class="mem-card ${c.kind}" data-k="${k}" aria-label="Carta virada">
        <span class="face back">?</span><span class="face front">${U.esc(c.t)}</span></button>`).join("")}</div>
      <div class="mem-msg" aria-live="polite"></div>`;
    const btns = [...el.querySelectorAll(".mem-card")];
    btns.forEach(b => b.onclick = () => {
      const k = +b.dataset.k;
      if (lock || b.classList.contains("flip") || b.classList.contains("done")) return;
      b.classList.add("flip"); b.setAttribute("aria-label", cards[k].t);
      open.push(k);
      if (open.length === 2) {
        moves++; el.querySelector(".mv").textContent = moves;
        const [a, c] = open;
        if (cards[a].id === cards[c].id && cards[a].kind !== cards[c].kind) {
          btns[a].classList.add("done"); btns[c].classList.add("done"); open = []; found++;
          el.querySelector(".fd").textContent = found; U.sfx("ok");
          if (found === pairs.length) {
            el.querySelector(".mem-msg").innerHTML = `<div class="game-end"><div class="big">🧠✨</div><p>Todos os pares em <strong>${moves}</strong> jogadas!</p><button class="btn ghost">Jogar de novo</button></div>`;
            el.querySelector(".mem-msg button").onclick = () => memoria(el, topic, done);
            done(Math.max(1, pairs.length * 2 - moves + pairs.length), pairs.length * 2);
          }
        } else {
          lock = true;
          setTimeout(() => { btns[a].classList.remove("flip"); btns[c].classList.remove("flip"); btns[a].setAttribute("aria-label", "Carta virada"); btns[c].setAttribute("aria-label", "Carta virada"); open = []; lock = false; }, 900);
        }
      }
    });
  }

  /* ---------------- FORCA ---------------- */
  function forca(el, topic, done, idx) {
    const words = topic.games.words;
    const pick = idx != null ? idx : Math.floor(Math.random() * words.length);
    const { w, hint } = words[pick];
    const target = U.norm(w);
    const MAX = 6;
    let guessed = new Set(), errors = 0, over = false;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    function isLetter(ch) { return /[a-z0-9]/.test(U.norm(ch)); }
    function solved() { return [...w].every(ch => !isLetter(ch) || guessed.has(U.norm(ch))); }
    function render() {
      const level = ((MAX - errors) / MAX) * 100;
      el.innerHTML = `<div class="forca">
        <div class="forca-visual">
          <svg viewBox="0 0 80 110" aria-label="Água restante: ${MAX - errors} de ${MAX}">
            <path d="M40 5 C40 5 8 50 8 72 a32 32 0 0 0 64 0 C72 50 40 5 40 5Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="3"/>
            <clipPath id="dropclip"><path d="M40 5 C40 5 8 50 8 72 a32 32 0 0 0 64 0 C72 50 40 5 40 5Z"/></clipPath>
            <rect clip-path="url(#dropclip)" x="0" y="${104 - level}" width="80" height="${level}" fill="#0ea5e9" style="transition:all .4s"/>
          </svg>
          <div class="lives">${"💧".repeat(MAX - errors)}${"▫️".repeat(errors)}</div>
        </div>
        <div class="forca-main">
          <p class="hint">💡 <strong>Dica:</strong> ${U.esc(hint)}</p>
          <div class="word">${[...w].map(ch => !isLetter(ch) ? `<span class="sp">${ch === " " ? "&nbsp;" : U.esc(ch)}</span>` :
            `<span class="ch ${guessed.has(U.norm(ch)) || over ? "show" : ""} ${over && !guessed.has(U.norm(ch)) ? "missed" : ""}">${guessed.has(U.norm(ch)) || over ? U.esc(ch) : ""}</span>`).join("")}</div>
          <div class="kbd">${letters.map(L => {
            const l = L.toLowerCase(); const used = guessed.has(l);
            const cls = used ? (target.includes(l) ? "hit" : "miss") : "";
            return `<button class="key ${cls}" data-l="${l}" ${used || over ? "disabled" : ""}>${L}</button>`;
          }).join("")}</div>
          <div class="forca-msg" aria-live="polite"></div>
        </div></div>`;
      el.querySelectorAll(".key").forEach(b => b.onclick = () => guess(b.dataset.l));
      if (over) {
        const win = solved();
        el.querySelector(".forca-msg").innerHTML = `<p class="${win ? "ok" : "bad"}">${win ? "🎉 Você descobriu: " : "💦 A água acabou! A palavra era: "}<strong>${U.esc(w)}</strong></p>
          <button class="btn ghost">Outra palavra</button>`;
        el.querySelector(".forca-msg button").onclick = () => forca(el, topic, done, (pick + 1) % words.length);
      }
    }
    function guess(l) {
      if (over || guessed.has(l)) return;
      guessed.add(l);
      if (!target.includes(l)) { errors++; U.sfx("bad"); } else U.sfx("ok");
      if (solved() || errors >= MAX) { over = true; done(solved() ? MAX - errors : 0, MAX); }
      render();
    }
    el.onkeydown = e => { if (/^[a-zA-Z]$/.test(e.key)) guess(e.key.toLowerCase()); };
    el.tabIndex = 0;
    render();
  }

  /* ---------------- FLASHCARDS ---------------- */
  function flashcards(el, topic, done) {
    let deck = U.shuffle([
      ...topic.games.pairs.map(p => ({ f: p[0], b: p[1] })),
      ...U.shuffle(topic.games.quiz).slice(0, 3).map(q => ({ f: q.q, b: q.options[q.answer] }))
    ]).slice(0, 8);
    const total = deck.length;
    let known = 0, reviews = 0;
    function render() {
      if (!deck.length) {
        el.innerHTML = `<div class="game-end"><div class="big">🃏✅</div><p>Você revisou os <strong>${total}</strong> cartões! (${reviews} revisões extras)</p><button class="btn ghost">Revisar de novo</button></div>`;
        el.querySelector("button").onclick = () => flashcards(el, topic, done);
        done(known, total);
        return;
      }
      const c = deck[0];
      el.innerHTML = `<div class="fc-top"><span>Faltam <b>${deck.length}</b></span><span>Já sei: <b>${known}</b>/${total}</span></div>
        <button class="flashcard" aria-label="Cartão. Toque para virar"><span class="fc-inner">
          <span class="fc-face fc-front"><small>Conceito / pergunta</small>${U.esc(c.f)}<em>toque para virar ↻</em></span>
          <span class="fc-face fc-back"><small>Resposta</small>${U.esc(c.b)}</span></span></button>
        <div class="fc-actions"><button class="btn bad-btn" data-a="again" disabled>🔁 Revisar depois</button><button class="btn ok-btn" data-a="know" disabled>✅ Já sei</button></div>`;
      const card = el.querySelector(".flashcard");
      card.onclick = () => { card.classList.toggle("flipped"); el.querySelectorAll(".fc-actions button").forEach(b => b.disabled = false); };
      el.querySelector("[data-a=know]").onclick = () => { known++; deck.shift(); U.sfx("ok"); render(); };
      el.querySelector("[data-a=again]").onclick = () => { reviews++; deck.push(deck.shift()); render(); };
    }
    render();
  }

  window.GAMES = { info: GAME_INFO, quiz, memoria, forca, flashcards };
})();
