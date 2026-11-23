/* Aplicação: navegação, progresso, exercícios da revisão e sorteio dos jogos */
(function () {
  /* ---------------- Utilidades ---------------- */
  const U = window.U = {
    esc: s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
    norm: s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(),
    shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    sfx(kind) {
      if (!state.sound) return;
      try {
        const ctx = U._ctx || (U._ctx = new (window.AudioContext || window.webkitAudioContext)());
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = kind === "ok" ? 660 : 200; o.type = kind === "ok" ? "sine" : "square";
        g.gain.setValueAtTime(0.08, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.25);
      } catch (e) { /* sem áudio */ }
    }
  };

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  const state = { sound: store.get("geo6-sound", true) };
  let progress = store.get("geo6-progress", {});

  const TOPICS = window.TOPICS, MODULES = window.MODULES;
  const byId = id => TOPICS.find(t => t.id === id);
  const modOf = t => MODULES.find(m => m.id === t.module);

  function tp(id) { return progress[id] || (progress[id] = { ex: {}, games: {} }); }
  function save() { store.set("geo6-progress", progress); updateGlobal(); }
  function topicPct(t) {
    const p = progress[t.id]; if (!p) return 0;
    const total = t.exercises.length + 2;
    const doneEx = t.exercises.filter((e, i) => p.ex[i]).length;
    const doneG = Math.min(2, Object.keys(p.games || {}).length);
    return Math.round(((doneEx + doneG) / total) * 100);
  }
  function overallPct() { return Math.round(TOPICS.reduce((s, t) => s + topicPct(t), 0) / TOPICS.length); }
  function updateGlobal() {
    const el = document.getElementById("global-progress");
    if (el) { const p = overallPct(); el.querySelector("span").style.width = p + "%"; el.title = `Progresso geral: ${p}%`; document.getElementById("global-pct").textContent = p + "%"; }
  }

  /* ---------------- Sorteio dos jogos ---------------- */
  const GAME_KEYS = ["quiz", "memoria", "forca", "flashcards"];
  const COMBOS = [];
  GAME_KEYS.forEach((a, i) => GAME_KEYS.slice(i + 1).forEach(b => COMBOS.push([a, b])));
  const sameCombo = (x, y) => x && y && x[0] === y[0] && x[1] === y[1];

  function buildPlan() {
    const plan = {}; let prev = null;
    const uses = Object.fromEntries(GAME_KEYS.map(k => [k, 0]));
    TOPICS.forEach(t => {
      // evita repetir o par anterior e equilibra o uso de cada jogo
      const options = U.shuffle(COMBOS.filter(c => !sameCombo(c, prev)));
      const cost = c => uses[c[0]] + uses[c[1]];
      const min = Math.min(...options.map(cost));
      const pool = options.filter(c => cost(c) <= min + 2);
      const c = U.shuffle(pool[Math.floor(Math.random() * pool.length)]);
      uses[c[0]]++; uses[c[1]]++;
      plan[t.id] = c;
      prev =COMBOS.find(x => x.includes(c[0]) && x.includes(c[1]));
    });
    return plan;
  }
  let plan;
  try { plan = JSON.parse(sessionStorage.getItem("geo6-plan")); } catch (e) { plan = null; }
  if (!plan || TOPICS.some(t => !plan[t.id])) { plan = buildPlan(); savePlan(); }
  function savePlan() { try { sessionStorage.setItem("geo6-plan", JSON.stringify(plan)); } catch (e) { /* ignore */ } }
  function reroll(id) {
    const cur = plan[id];
    const options = COMBOS.filter(c => !(c.includes(cur[0]) && c.includes(cur[1])));
    plan[id] = U.shuffle(options[Math.floor(Math.random() * options.length)]);
    savePlan();
  }

  /* ---------------- Exercícios ---------------- */
  function feedback(box, ok, html) {
    box.className = "ex-fb " + (ok === true ? "fb-ok" : ok === false ? "fb-bad" : "fb-info");
    box.innerHTML = html;
  }
  function gabarito(ex) {
    const txt = ex.answer || "";
    return `<div class="gab"><strong>📘 Gabarito:</strong> ${U.esc(ex.key || "").trim() ? `<b>${U.esc(ex.key)}</b>. ` : ""}${U.esc(txt).replace(/\n/g, "<br>")}${ex.explain ? `<p class="explain">💬 ${U.esc(ex.explain)}</p>` : ""}</div>`;
  }

  function renderExercise(t, ex, idx) {
    const wrap = document.createElement("div");
    wrap.className = "exercise";
    const p = tp(t.id);
    const solved = !!p.ex[idx];
    wrap.innerHTML = `<div class="ex-head"><span class="qtag">${/^\d/.test(ex.q) ? "Questão " : ""}${U.esc(ex.q)}</span>${solved ? `<span class="done-tag">✔ feita</span>` : ""}</div>
      <p class="ex-prompt">${U.esc(ex.prompt)}</p><div class="ex-body"></div>
      <div class="ex-actions"></div><div class="ex-fb" aria-live="polite"></div>`;
    const body = wrap.querySelector(".ex-body"), act = wrap.querySelector(".ex-actions"), fb = wrap.querySelector(".ex-fb");
    const mark = () => { p.ex[idx] = true; save(); const h = wrap.querySelector(".ex-head"); if (!h.querySelector(".done-tag")) h.insertAdjacentHTML("beforeend", `<span class="done-tag">✔ feita</span>`); };
    const btn = (label, cls, fn) => { const b = document.createElement("button"); b.className = "btn " + (cls || ""); b.textContent = label; b.onclick = fn; act.appendChild(b); return b; };

    if (ex.type === "assoc" || ex.type === "vf") {
      const keys = ex.type === "vf" ? ["V", "F"] : Object.keys(ex.options);
      if (ex.type === "assoc") body.innerHTML = `<div class="legend-keys">${keys.map(k => `<span><b>${k}</b> ${U.esc(ex.options[k])}</span>`).join("")}</div>`;
      const sel = ex.items.map(() => null);
      body.insertAdjacentHTML("beforeend", ex.items.map((it, i) => `<div class="row" data-i="${i}">
        <div class="seg">${keys.map(k => `<button class="seg-b" data-k="${k}" aria-label="${ex.type === "vf" ? (k === "V" ? "Verdadeiro" : "Falso") : U.esc(ex.options[k])}">${k}</button>`).join("")}</div>
        <p>${U.esc(it.text)}</p><div class="fix"></div></div>`).join(""));
      body.querySelectorAll(".row").forEach(r => r.querySelectorAll(".seg-b").forEach(b => b.onclick = () => {
        sel[+r.dataset.i] = b.dataset.k;
        r.querySelectorAll(".seg-b").forEach(x => x.classList.toggle("on", x === b));
        r.classList.remove("r-ok", "r-bad");
      }));
      btn("Verificar", "", () => {
        if (sel.some(s => !s)) return feedback(fb, null, "Responda todos os itens antes de verificar. 😉");
        let hits = 0;
        body.querySelectorAll(".row").forEach((r, i) => {
          const ok = sel[i] === ex.items[i].answer; if (ok) hits++;
          r.classList.toggle("r-ok", ok); r.classList.toggle("r-bad", !ok);
          const it = ex.items[i];
          r.querySelector(".fix").innerHTML = it.fix ? `<span>✏️ <strong>Correção:</strong> ${U.esc(it.fix)}</span>` : (!ok ? `<span>Resposta: <b>${it.answer}</b></span>` : "");
        });
        const all = hits === ex.items.length; U.sfx(all ? "ok" : "bad");
        feedback(fb, all, `${all ? "🎉 Tudo certo!" : `Você acertou ${hits} de ${ex.items.length}.`} ${gabarito(ex)}`);
        mark();
      });
    }

    else if (ex.type === "mc") {
      let choice = null;
      body.innerHTML = `<div class="mc">${ex.options.map((o, i) => `<button class="mc-opt" data-i="${i}"><b>${ex.letters ? "abcd"[i] + ")" : "( )"}</b> ${U.esc(o)}</button>`).join("")}</div>`;
      body.querySelectorAll(".mc-opt").forEach(b => b.onclick = () => { choice = +b.dataset.i; body.querySelectorAll(".mc-opt").forEach(x => x.classList.toggle("on", x === b)); });
      btn("Verificar", "", () => {
        if (choice == null) return feedback(fb, null, "Escolha uma alternativa. 😉");
        body.querySelectorAll(".mc-opt").forEach((x, i) => { x.classList.toggle("right", i === ex.answer); x.classList.toggle("wrong", i === choice && i !== ex.answer); });
        const ok = choice === ex.answer; U.sfx(ok ? "ok" : "bad");
        feedback(fb, ok, `${ok ? "🎉 Correto!" : "Ainda não. A correta está em verde."} ${gabarito({ answer: (ex.letters ? "Alternativa " + "ABCD"[ex.answer] + ": " : "") + ex.options[ex.answer], explain: ex.explain })}`);
        mark();
      });
    }

    else if (ex.type === "short") {
      body.innerHTML = `<input class="inp" type="text" placeholder="Digite sua resposta…" aria-label="Sua resposta">`;
      const inp = body.querySelector("input");
      const check = () => {
        const v = U.norm(inp.value.trim());
        if (!v) return feedback(fb, null, "Escreva sua resposta primeiro. ✍️");
        const ok = ex.accept.every(g => g.some(a => v.includes(a)));
        U.sfx(ok ? "ok" : "bad");
        feedback(fb, ok, `${ok ? "🎉 Isso mesmo!" : "Quase! Compare com o gabarito:"} ${gabarito(ex)}`);
        mark();
      };
      inp.onkeydown = e => { if (e.key === "Enter") check(); };
      btn("Verificar", "", check);
      btn("Ver resposta", "ghost", () => { feedback(fb, null, gabarito(ex)); mark(); });
    }

    else if (ex.type === "open") {
      body.innerHTML = `<textarea class="inp" rows="3" placeholder="Escreva com suas palavras…" aria-label="Sua resposta"></textarea>
        <p class="hint-small">💡 Escreva sua resposta e toque em "Verificar": vamos procurar as ideias principais no seu texto.</p>`;
      const ta = body.querySelector("textarea");
      btn("Verificar minhas ideias", "", () => {
        const v = U.norm(ta.value);
        if (v.trim().length < 3) return feedback(fb, null, "Escreva sua resposta primeiro. ✍️");
        const hits = ex.keywords.filter(g => g.some(k => v.includes(k)));
        const need = ex.minHits || Math.max(1, Math.ceil(ex.keywords.length * 0.6));
        const ok = hits.length >= need; U.sfx(ok ? "ok" : "bad");
        const miss = ex.keywords.filter(g => !hits.includes(g)).map(g => g[0]);
        feedback(fb, ok, `${ok ? "🎉 Ótimo! Sua resposta tem as ideias principais." : `Você citou ${hits.length} ideia(s)-chave. Tente incluir também: <em>${miss.slice(0, 3).map(U.esc).join(", ")}</em>…`} ${gabarito(ex)}`);
        mark();
      });
      btn("Ver resposta", "ghost", () => { feedback(fb, null, gabarito(ex)); mark(); });
    }

    else if (ex.type === "diagram") {
      const placed = {}; let picked = null;
      const chips = U.shuffle([...ex.slots.map(s => s.answer), ...(ex.distractors || [])]);
      body.innerHTML = `<div class="diagram">${window.SCENES.diagram(ex.diagram)}</div>
        <div class="chips">${chips.map(c => `<button class="chip" data-c="${U.esc(c)}">${U.esc(c)}</button>`).join("")}</div>
        <div class="slots">${ex.slots.map(s => `<button class="slot" data-n="${s.n}"><b>${s.n}</b><span>toque aqui</span></button>`).join("")}</div>`;
      const refresh = () => {
        body.querySelectorAll(".chip").forEach(c => { c.classList.toggle("picked", c.dataset.c === picked); c.classList.toggle("used", Object.values(placed).includes(c.dataset.c)); });
        body.querySelectorAll(".slot").forEach(s => { const v = placed[s.dataset.n]; s.querySelector("span").textContent = v || (picked ? "colocar aqui" : "toque aqui"); s.classList.toggle("filled", !!v); s.classList.remove("s-ok", "s-bad"); });
      };
      body.querySelectorAll(".chip").forEach(c => c.onclick = () => { picked = picked === c.dataset.c ? null : c.dataset.c; refresh(); });
      body.querySelectorAll(".slot").forEach(s => s.onclick = () => {
        const n = s.dataset.n;
        if (picked) { Object.keys(placed).forEach(k => { if (placed[k] === picked) delete placed[k]; }); placed[n] = picked; picked = null; }
        else if (placed[n]) { delete placed[n]; }
        refresh();
      });
      btn("Verificar", "", () => {
        if (Object.keys(placed).length < ex.slots.length) return feedback(fb, null, "Preencha todos os números. Toque em um rótulo e depois no número. 😉");
        let hits = 0;
        body.querySelectorAll(".slot").forEach(s => { const slot = ex.slots.find(x => String(x.n) === s.dataset.n); const ok = placed[s.dataset.n] === slot.answer; if (ok) hits++; s.classList.add(ok ? "s-ok" : "s-bad"); });
        const all = hits === ex.slots.length; U.sfx(all ? "ok" : "bad");
        feedback(fb, all, `${all ? "🎉 Imagem completa!" : `Você acertou ${hits} de ${ex.slots.length}.`} ${gabarito({ answer: ex.slots.map(s => `${s.n} – ${s.answer}`).join(" · "), explain: ex.explain })}`);
        mark();
      });
      btn("Mostrar resposta", "ghost", () => {
        ex.slots.forEach(s => placed[s.n] = s.answer); picked = null; refresh();
        feedback(fb, null, gabarito({ answer: ex.slots.map(s => `${s.n} – ${s.answer}`).join(" · "), explain: ex.explain })); mark();
      });
    }

    else if (ex.type === "order") {
      const seq = [];
      const pool = U.shuffle(ex.items);
      const draw = () => {
        body.innerHTML = `<div class="chips">${pool.map(c => `<button class="chip ${seq.includes(c) ? "used" : ""}" data-c="${U.esc(c)}" ${seq.includes(c) ? "disabled" : ""}>${U.esc(c)}</button>`).join("")}</div>
          <ol class="order-list">${ex.items.map((_, i) => `<li class="${seq[i] ? "filled" : ""}">${seq[i] ? U.esc(seq[i]) : "…"}</li>`).join("")}</ol>`;
        body.querySelectorAll(".chip").forEach(c => c.onclick = () => { seq.push(c.dataset.c); draw(); });
      };
      draw();
      btn("Verificar", "", () => {
        if (seq.length < ex.items.length) return feedback(fb, null, "Coloque todas as etapas na sequência. 😉");
        const ok = seq.every((s, i) => s === ex.items[i]); U.sfx(ok ? "ok" : "bad");
        body.querySelectorAll(".order-list li").forEach((li, i) => li.classList.add(seq[i] === ex.items[i] ? "s-ok" : "s-bad"));
        feedback(fb, ok, `${ok ? "🎉 Sequência perfeita!" : "Algumas etapas estão fora de ordem."} ${gabarito({ answer: ex.items.join(" → "), explain: ex.explain })}`);
        mark();
      });
      btn("Recomeçar", "ghost", () => { seq.length = 0; draw(); fb.className = "ex-fb"; fb.innerHTML = ""; });
    }

    else if (ex.type === "match") {
      const rights = U.shuffle([...ex.pairs.map(p => p[1]), ...(ex.extra || [])]);
      body.innerHTML = ex.pairs.map((p, i) => `<div class="match-row"><span>${U.esc(p[0])}</span>
        <select class="inp" data-i="${i}" aria-label="Produto para ${U.esc(p[0])}"><option value="">Escolha um produto…</option>${rights.map(r => `<option>${U.esc(r)}</option>`).join("")}</select></div>`).join("");
      btn("Verificar", "", () => {
        const sels = [...body.querySelectorAll("select")];
        if (sels.some(s => !s.value)) return feedback(fb, null, "Escolha um produto para cada hidrovia. 😉");
        let hits = 0;
        sels.forEach((s, i) => { const ok = s.value === ex.pairs[i][1]; if (ok) hits++; s.classList.toggle("s-ok", ok); s.classList.toggle("s-bad", !ok); });
        const all = hits === ex.pairs.length; U.sfx(all ? "ok" : "bad");
        feedback(fb, all, `${all ? "🎉 Certo!" : `Você acertou ${hits} de ${ex.pairs.length}.`} ${gabarito(ex)}`);
        mark();
      });
    }
    return wrap;
  }

  /* ---------------- Cenas animadas ---------------- */
  function scenePlayer(t) {
    const el = document.createElement("div");
    el.className = "scene-player";
    let i = 0, timer = null, playing = true;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    function show() {
      const s = t.scenes[i];
      el.innerHTML = `<div class="stage">${s.svg ? window.SCENES.get(s.svg) : `<div class="art anim-${s.anim || "pop"}">${s.art}</div>`}</div>
        <p class="caption"><b>Cena ${i + 1}/${t.scenes.length}</b> ${U.esc(s.caption)}</p>
        <div class="scene-ctrl">
          <button class="icon-btn" data-a="prev" aria-label="Cena anterior">⏮</button>
          <button class="icon-btn" data-a="play" aria-label="${playing ? "Pausar" : "Reproduzir"}">${playing ? "⏸" : "▶️"}</button>
          <button class="icon-btn" data-a="next" aria-label="Próxima cena">⏭</button>
          <span class="dots">${t.scenes.map((_, k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</span>
        </div>`;
      el.querySelector("[data-a=prev]").onclick = () => go(-1);
      el.querySelector("[data-a=next]").onclick = () => go(1);
      el.querySelector("[data-a=play]").onclick = () => { playing = !playing; schedule(); show(); };
    }
    function go(d) { i = (i + d + t.scenes.length) % t.scenes.length; show(); schedule(); }
    function schedule() { clearTimeout(timer); if (playing && !reduce) timer = setTimeout(() => { if (document.body.contains(el)) go(1); }, 7000); }
    if (reduce) playing = false;
    show(); schedule();
    return el;
  }

  /* ---------------- Telas ---------------- */
  const app = () => document.getElementById("app");

  function homeView() {
    const pct = overallPct();
    app().innerHTML = `
      <section class="hero">
        <div><p class="eyebrow">Revisão de Geografia · 6º ano · 3º trimestre</p>
          <h1>Trilha da Água 💧</h1>
          <p>Cada questão da lista de revisão vira uma parada desta trilha: você lê a explicação, assiste às cenas animadas, responde às questões com o gabarito comentado e, no final de cada seção, joga <strong>2 jogos sorteados</strong>.</p>
          <div class="hero-actions"><a class="btn" href="#/topico/${firstUnfinished().id}">${pct ? "Continuar trilha ➜" : "Começar a trilha ➜"}</a>
          <a class="btn ghost" href="#/questoes">Ver lista de questões</a></div></div>
        <div class="ring" style="--p:${pct}"><span>${pct}%<small>concluído</small></span></div>
      </section>
      <section class="games-strip">${GAME_KEYS.map(k => `<div><span>${window.GAMES.info[k].icon}</span><b>${window.GAMES.info[k].name}</b><small>${window.GAMES.info[k].desc}</small></div>`).join("")}</section>
      ${MODULES.map(m => `<section class="module" style="--mc:${m.color}">
        <h2><span>${m.icon}</span> Módulo ${m.id} · ${U.esc(m.title)}</h2><p class="muted">${U.esc(m.intro)}</p>
        <div class="topic-grid">${TOPICS.filter(t => t.module === m.id).map(t => { const p = topicPct(t); return `
          <a class="topic-card" href="#/topico/${t.id}">
            <span class="tid">${t.id}</span><h3>${U.esc(t.title)}</h3><small>${U.esc(t.refs)}</small>
            <div class="progress thin"><span style="width:${p}%"></span></div>
            <span class="tgames">${plan[t.id].map(g => window.GAMES.info[g].icon).join(" ")} ${p === 100 ? "· ✅" : ""}</span></a>`; }).join("")}</div></section>`).join("")}`;
  }

  function firstUnfinished() { return TOPICS.find(t => topicPct(t) < 100) || TOPICS[0]; }

  function questionsView() {
    app().innerHTML = `<section class="page-head"><a href="#/" class="back">← Início</a><h1>📝 Lista de revisão</h1>
      <p class="muted">As 14 questões do PDF, na ordem original. Toque em um item para ir direto à explicação e ao gabarito.</p></section>
      <div class="qlist">${window.QUESTION_MAP.map(q => `<div class="qitem"><div class="qnum">${q.n}</div><div><h3>${U.esc(q.title)}</h3>
        <div class="qparts">${q.parts.map(([lab, tid]) => { const t = byId(tid); return `<a href="#/topico/${tid}" title="${U.esc(t.title)}">${U.esc(lab)} <small>→ ${tid} ${U.esc(t.title)}</small></a>`; }).join("")}</div></div></div>`).join("")}</div>`;
  }

  function topicView(id) {
    const t = byId(id); if (!t) return homeView();
    const m = modOf(t), idx = TOPICS.indexOf(t), prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
    tp(t.id).seen = true; save();
    app().innerHTML = `
      <section class="page-head" style="--mc:${m.color}">
        <a href="#/" class="back">← Início</a>
        <p class="eyebrow">${m.icon} Módulo ${m.id} · ${U.esc(m.title)}</p>
        <h1><span class="tid big">${t.id}</span> ${U.esc(t.title)}</h1>
        <p class="refs">📄 ${U.esc(t.refs)} da revisão</p>
        <div class="concepts">${t.concepts.map(c => `<span>${U.esc(c)}</span>`).join("")}</div>
        <nav class="steps-nav"><a href="#s-explica">📖 Explicação</a><a href="#s-anima">🎬 Animação</a><a href="#s-questoes">✏️ Questões</a><a href="#s-jogos">🎮 Jogos</a></nav>
      </section>
      <section id="s-explica" class="panel"><div class="panel-h"><h2>📖 Entenda</h2><button class="btn small ghost" id="tts">🔊 Ouvir</button></div><div class="theory">${t.theory}</div></section>
      <section id="s-anima" class="panel"><h2>🎬 Veja em animação</h2><div id="scenes"></div></section>
      <section id="s-questoes" class="panel"><h2>✏️ Questões da revisão</h2><p class="muted">Responda, verifique e confira o gabarito comentado.</p><div id="exs"></div></section>
      <section id="s-jogos" class="panel games-panel"><div class="panel-h"><h2>🎮 Hora de jogar!</h2><button class="btn small ghost" id="reroll">🎲 Sortear outros jogos</button></div>
        <p class="muted">Dois jogos foram sorteados para esta seção — eles mudam de uma seção para outra.</p><div id="games"></div></section>
      <nav class="pager">${prev ? `<a class="btn ghost" href="#/topico/${prev.id}">← ${prev.id} ${U.esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a class="btn" href="#/topico/${next.id}">${next.id} ${U.esc(next.title)} →</a>` : `<a class="btn" href="#/final">Concluir trilha 🏁</a>`}</nav>`;

    document.getElementById("scenes").appendChild(scenePlayer(t));
    const exs = document.getElementById("exs");
    t.exercises.forEach((ex, i) => exs.appendChild(renderExercise(t, ex, i)));
    renderGames(t);
    document.getElementById("reroll").onclick = () => { reroll(t.id); renderGames(t); };
    const tts = document.getElementById("tts");
    if (!("speechSynthesis" in window)) tts.hidden = true;
    tts.onclick = () => {
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); tts.textContent = "🔊 Ouvir"; return; }
      const u = new SpeechSynthesisUtterance(document.querySelector(".theory").innerText);
      u.lang = "pt-BR"; u.rate = 0.95; u.onend = () => tts.textContent = "🔊 Ouvir";
      speechSynthesis.speak(u); tts.textContent = "⏹ Parar";
    };
    document.querySelectorAll(".steps-nav a").forEach(a => a.onclick = e => { e.preventDefault(); document.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: "smooth" }); });
  }

  function renderGames(t) {
    const box = document.getElementById("games");
    box.innerHTML = "";
    plan[t.id].forEach((g, n) => {
      const info = window.GAMES.info[g];
      const done = tp(t.id).games[g];
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `<div class="game-h"><span class="gi">${info.icon}</span><div><h3>Jogo ${n + 1}: ${info.name} ${done ? `<span class="done-tag">✔ concluído</span>` : ""}</h3><small>${info.desc}</small></div></div><div class="game-body"></div>`;
      box.appendChild(card);
      window.GAMES[g](card.querySelector(".game-body"), t, () => {
        const p = tp(t.id); if (!p.games[g]) { p.games[g] = true; save(); const h = card.querySelector("h3"); if (!h.querySelector(".done-tag")) h.insertAdjacentHTML("beforeend", ` <span class="done-tag">✔ concluído</span>`); }
      });
    });
  }

  function finalView() {
    const pct = overallPct();
    app().innerHTML = `<section class="hero final"><div><h1>🏁 Fim da trilha!</h1>
      <p>Você percorreu as ${TOPICS.length} seções da revisão. Progresso geral: <strong>${pct}%</strong>.</p>
      <p>${pct === 100 ? "Parabéns! Você respondeu tudo e jogou todos os jogos. 🏆" : "Volte às seções que ainda não estão completas para fechar 100%."}</p>
      <div class="hero-actions"><a class="btn" href="#/">Voltar ao início</a><a class="btn ghost" href="#/questoes">Lista de questões</a>
      <button class="btn ghost" id="reset">Recomeçar do zero</button></div></div><div class="ring" style="--p:${pct}"><span>${pct}%</span></div></section>
      <section class="panel"><h2>Seções pendentes</h2><div class="topic-grid">${TOPICS.filter(t => topicPct(t) < 100).map(t => `<a class="topic-card" href="#/topico/${t.id}"><span class="tid">${t.id}</span><h3>${U.esc(t.title)}</h3><small>${topicPct(t)}%</small></a>`).join("") || "<p>Nenhuma! 🎉</p>"}</div></section>`;
    document.getElementById("reset").onclick = () => { if (confirm("Apagar todo o progresso salvo neste aparelho?")) { progress = {}; save(); try { sessionStorage.removeItem("geo6-plan"); } catch (e) { /* ignore */ } plan = buildPlan(); savePlan(); homeView(); location.hash = "#/"; } };
  }

  function route() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    const h = location.hash.replace(/^#\/?/, "");
    const [page, arg] = h.split("/");
    if (page === "topico") topicView(arg);
    else if (page === "questoes") questionsView();
    else if (page === "final") finalView();
    else homeView();
    window.scrollTo(0, 0);
    updateGlobal();
  }

  /* ---------------- Inicialização ---------------- */
  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", () => {
    const sb = document.getElementById("sound");
    const paint = () => { sb.textContent = state.sound ? "🔔" : "🔕"; sb.setAttribute("aria-label", state.sound ? "Desligar sons" : "Ligar sons"); };
    sb.onclick = () => { state.sound = !state.sound; store.set("geo6-sound", state.sound); paint(); };
    paint();
    route();
  });
})();
