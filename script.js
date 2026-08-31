function buildQuiz(containerId, questions, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const opts = Object.assign({
    correctMsg: '✅ Correct! • Correto!',
    wrongMsg: '❌ Try again next time • Tente novamente da próxima vez',
    scoreLabel: 'Pontuação • Score'
  }, options);
  let answered = 0;
  let correct = 0;

  const scoreEl = document.createElement('div');
  scoreEl.className = 'quiz-score';
  scoreEl.setAttribute('aria-live', 'polite');

  questions.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'question';

    const h4 = document.createElement('h4');
    const qnum = document.createElement('span');
    qnum.className = 'qnum';
    qnum.textContent = qi + 1;
    h4.appendChild(qnum);
    h4.appendChild(document.createTextNode(q.question));
    card.appendChild(h4);

    if (q.translation) {
      const tr = document.createElement('div');
      tr.className = 'translation';
      tr.textContent = q.translation;
      card.appendChild(tr);
    }

    const choicesWrap = document.createElement('div');
    choicesWrap.className = 'choices';

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.setAttribute('aria-live', 'polite');

    q.choices.forEach((choice, ci) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice';
      btn.textContent = choice;
      btn.addEventListener('click', () => {
        const buttons = choicesWrap.querySelectorAll('.choice');
        buttons.forEach(b => b.disabled = true);
        if (ci === q.answer) {
          btn.classList.add('correct');
          feedback.textContent = opts.correctMsg;
          feedback.className = 'feedback ok';
          correct++;
        } else {
          btn.classList.add('wrong');
          buttons[q.answer].classList.add('correct');
          feedback.textContent = opts.wrongMsg;
          feedback.className = 'feedback bad';
        }
        answered++;
        updateScore();
        updateGlobalProgress();
      });
      choicesWrap.appendChild(btn);
    });

    card.appendChild(choicesWrap);
    card.appendChild(feedback);
    container.appendChild(card);
  });

  container.appendChild(scoreEl);

  function updateScore() {
    scoreEl.textContent = `${opts.scoreLabel}: ${correct} / ${questions.length} (${answered}/${questions.length})`;
  }
  updateScore();
}

function updateGlobalProgress() {
  const bar = document.getElementById('progressBar');
  const text = document.getElementById('progressText');
  const answeredEl = document.getElementById('answered');
  const correctEl = document.getElementById('correctCount');
  if (!bar) return;

  const totalQuestions = document.querySelectorAll('.question').length;
  let answeredCount = 0;
  let correctCount = 0;

  document.querySelectorAll('.question').forEach(q => {
    if (q.querySelector('.choice:disabled')) {
      answeredCount++;
      if (!q.querySelector('.choice.wrong')) correctCount++;
    }
  });

  const pct = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  bar.style.width = pct + '%';
  if (text) text.textContent = pct + '%';
  if (answeredEl) answeredEl.textContent = answeredCount;
  if (correctEl) correctEl.textContent = correctCount;
}

function buildDecimalGrid(containerId, target, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const opts = Object.assign({
    label: `Pinte a grade para representar ${target.toFixed(2).replace('.', ',')} (${Math.round(target * 100)} centésimos).`
  }, options);

  const targetCells = Math.round(target * 100);

  const wrap = document.createElement('div');
  wrap.className = 'grid-exercise';

  const label = document.createElement('p');
  label.className = 'grid-label';
  label.textContent = opts.label;
  wrap.appendChild(label);

  const layout = document.createElement('div');
  layout.className = 'grid-layout';

  const grid = document.createElement('div');
  grid.className = 'decimal-grid';
  const cells = [];
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.setAttribute('aria-label', `Quadradinho ${i + 1}`);
    cell.addEventListener('click', () => {
      cell.classList.toggle('filled');
      updateCounter();
    });
    cells.push(cell);
    grid.appendChild(cell);
  }
  layout.appendChild(grid);

  const side = document.createElement('div');
  side.className = 'grid-side';

  const counter = document.createElement('div');
  counter.className = 'grid-counter';
  side.appendChild(counter);

  const controls = document.createElement('div');
  controls.className = 'grid-controls';

  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'primary';
  checkBtn.textContent = 'Conferir';

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'secondary';
  clearBtn.textContent = 'Limpar';

  controls.appendChild(checkBtn);
  controls.appendChild(clearBtn);
  side.appendChild(controls);

  const feedback = document.createElement('div');
  feedback.className = 'feedback';
  feedback.setAttribute('aria-live', 'polite');
  side.appendChild(feedback);

  layout.appendChild(side);
  wrap.appendChild(layout);
  container.appendChild(wrap);

  function filledCount() {
    return cells.filter(c => c.classList.contains('filled')).length;
  }

  function updateCounter() {
    const n = filledCount();
    const decimal = (n / 100).toFixed(2).replace('.', ',');
    counter.textContent = `${n} / 100 pintados = ${decimal}`;
  }

  checkBtn.addEventListener('click', () => {
    const n = filledCount();
    if (n === targetCells) {
      feedback.textContent = '✅ Correto! A grade representa o número certinho.';
      feedback.className = 'feedback ok';
    } else if (n < targetCells) {
      feedback.textContent = `❌ Faltam ${targetCells - n} quadradinho(s) para pintar.`;
      feedback.className = 'feedback bad';
    } else {
      feedback.textContent = `❌ Você pintou ${n - targetCells} quadradinho(s) a mais.`;
      feedback.className = 'feedback bad';
    }
  });

  clearBtn.addEventListener('click', () => {
    cells.forEach(c => c.classList.remove('filled'));
    updateCounter();
    feedback.textContent = '';
    feedback.className = 'feedback';
  });

  updateCounter();
}

function renderMatchingCore(container, pairs, options) {
  const opts = Object.assign({ doneMsg: '🎉 Todos os pares encontrados!', showScore: true, onComplete: null }, options);

  const wrap = document.createElement('div');
  wrap.className = 'matching-grid';

  const colLeft = document.createElement('div');
  colLeft.className = 'match-col';
  const colRight = document.createElement('div');
  colRight.className = 'match-col';

  const rightOrder = shuffleArray(pairs.map((p, i) => i));

  let selected = null; // { id, el, side }
  let matchedCount = 0;

  const scoreEl = document.createElement('div');
  scoreEl.className = 'quiz-score';

  function makeItem(text, id, side) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'match-item';
    btn.textContent = text;
    btn.dataset.id = id;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('matched')) return;

      if (!selected) {
        selected = { id, el: btn, side };
        btn.classList.add('selected');
        return;
      }
      if (selected.side === side) {
        selected.el.classList.remove('selected');
        if (selected.el === btn) { selected = null; return; }
        selected = { id, el: btn, side };
        btn.classList.add('selected');
        return;
      }
      // opposite column: check pair
      if (selected.id === id) {
        selected.el.classList.remove('selected');
        selected.el.classList.add('matched');
        btn.classList.add('matched');
        selected = null;
        matchedCount++;
        if (opts.showScore) updateScore();
        if (matchedCount === pairs.length) {
          if (opts.showScore) scoreEl.textContent = opts.doneMsg;
          if (opts.onComplete) opts.onComplete();
        }
      } else {
        const prevEl = selected.el;
        prevEl.classList.remove('selected');
        [prevEl, btn].forEach(el => {
          el.classList.add('wrong');
          setTimeout(() => el.classList.remove('wrong'), 350);
        });
        selected = null;
      }
    });
    return btn;
  }

  pairs.forEach((p, i) => colLeft.appendChild(makeItem(p.left, i, 'left')));
  rightOrder.forEach(i => colRight.appendChild(makeItem(pairs[i].right, i, 'right')));

  wrap.appendChild(colLeft);
  wrap.appendChild(colRight);
  container.appendChild(wrap);
  if (opts.showScore) {
    container.appendChild(scoreEl);
    updateScore();
  }

  function updateScore() {
    scoreEl.textContent = `${matchedCount} / ${pairs.length} pares encontrados`;
  }
}

function buildMatching(containerId, pairs, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  renderMatchingCore(container, pairs, options);
}

function renderOrderCore(container, tokens, correctOrder, options) {
  const opts = Object.assign({
    checkLabel: 'Check order • Conferir ordem',
    resetLabel: 'Reset • Recomeçar',
    incompleteMsg: '✏️ Order all the items first! • Ordene todos os itens primeiro!',
    onComplete: null
  }, options);

  const shuffledIdx = shuffleArray(tokens.map((_, i) => i));
  const pool = document.createElement('div');
  pool.className = 'order-pool';
  const sequence = document.createElement('div');
  sequence.className = 'order-sequence';
  for (let i = 0; i < tokens.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'order-slot';
    slot.textContent = i + 1;
    sequence.appendChild(slot);
  }

  let picked = [];
  let answered = false;

  function renderPool() {
    pool.innerHTML = '';
    shuffledIdx.forEach(idx => {
      if (picked.includes(idx)) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'order-token';
      btn.textContent = tokens[idx];
      btn.addEventListener('click', () => {
        if (answered) return;
        picked.push(idx);
        renderPool();
        renderSequence();
      });
      pool.appendChild(btn);
    });
  }

  function renderSequence() {
    const slots = sequence.querySelectorAll('.order-slot');
    slots.forEach((slot, i) => {
      if (picked[i] !== undefined) {
        slot.textContent = tokens[picked[i]];
        slot.classList.add('filled');
      } else {
        slot.textContent = i + 1;
        slot.classList.remove('filled');
      }
    });
  }

  renderPool();

  const controls = document.createElement('div');
  controls.className = 'grid-controls';
  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'primary';
  checkBtn.textContent = opts.checkLabel;
  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'secondary';
  resetBtn.textContent = opts.resetLabel;

  const note = document.createElement('div');
  note.className = 'order-note';

  checkBtn.addEventListener('click', () => {
    if (answered) return;
    if (picked.length !== tokens.length) {
      note.textContent = opts.incompleteMsg;
      note.className = 'order-note bad';
      return;
    }
    const ok = picked.every((idx, i) => idx === correctOrder[i]);
    answered = true;
    if (!ok) {
      picked = correctOrder.slice();
      renderSequence();
    }
    if (opts.onComplete) opts.onComplete(ok);
  });

  resetBtn.addEventListener('click', () => {
    if (answered) return;
    picked = [];
    renderPool();
    renderSequence();
    note.textContent = '';
    note.className = 'order-note';
  });

  controls.appendChild(checkBtn);
  controls.appendChild(resetBtn);

  container.appendChild(pool);
  container.appendChild(sequence);
  container.appendChild(controls);
  container.appendChild(note);
}

function buildOpenAnswer(containerId, items, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const opts = Object.assign({
    correctMsg: '✅ Correct! • Correto!',
    wrongMsgPrefix: '❌ Not quite. The correct answer is • A resposta correta é',
    checkLabel: 'Check • Conferir',
    placeholder: 'Type your answer... • Digite sua resposta...',
    onAnswer: null
  }, options);

  items.forEach((item, qi) => {
    const card = document.createElement('div');
    card.className = 'question';

    const h4 = document.createElement('h4');
    const qnum = document.createElement('span');
    qnum.className = 'qnum';
    qnum.textContent = qi + 1;
    h4.appendChild(qnum);
    h4.appendChild(document.createTextNode(item.question));
    card.appendChild(h4);

    if (item.translation) {
      const tr = document.createElement('div');
      tr.className = 'translation';
      tr.textContent = item.translation;
      card.appendChild(tr);
    }

    const row = document.createElement('div');
    row.className = 'open-answer-row';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'open-answer-input';
    input.placeholder = item.placeholder || opts.placeholder;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'primary';
    btn.textContent = opts.checkLabel;

    row.appendChild(input);
    row.appendChild(btn);
    card.appendChild(row);

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    card.appendChild(feedback);

    let answered = false;
    function submit() {
      if (answered) return;
      const val = input.value.trim();
      if (!val) return;
      const ok = item.check(val);
      answered = true;
      input.disabled = true;
      btn.disabled = true;
      if (ok) {
        feedback.textContent = opts.correctMsg;
        feedback.className = 'feedback ok';
        input.classList.add('correct');
      } else {
        feedback.textContent = `${opts.wrongMsgPrefix}: ${item.correctAnswerText}`;
        feedback.className = 'feedback bad';
        input.classList.add('wrong');
      }
      if (opts.onAnswer) opts.onAnswer(ok);
    }

    btn.addEventListener('click', submit);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') submit();
    });

    container.appendChild(card);
  });
}

function buildMixedRound(containerId, specs, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const opts = Object.assign({
    correctMsg: '✅ Correct! • Correto!',
    wrongMsg: '❌ Not quite. • Não foi dessa vez.',
    onAnswer: null
  }, options);

  specs.forEach((spec, qi) => {
    const card = document.createElement('div');
    card.className = 'question';

    const h4 = document.createElement('h4');
    const qnum = document.createElement('span');
    qnum.className = 'qnum';
    qnum.textContent = qi + 1;
    h4.appendChild(qnum);
    h4.appendChild(document.createTextNode(spec.question));
    card.appendChild(h4);

    if (spec.formatLabel) {
      const badge = document.createElement('span');
      badge.className = 'format-badge';
      badge.textContent = spec.formatLabel;
      card.appendChild(badge);
    }

    if (spec.translation) {
      const tr = document.createElement('div');
      tr.className = 'translation';
      tr.textContent = spec.translation;
      card.appendChild(tr);
    }

    const feedback = document.createElement('div');
    feedback.className = 'feedback';

    const body = document.createElement('div');
    body.className = 'mixed-body';

    if (spec.format === 'mc' || spec.format === 'tf') {
      const choicesWrap = document.createElement('div');
      choicesWrap.className = 'choices';
      spec.choices.forEach((choice, ci) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice';
        btn.textContent = choice;
        btn.addEventListener('click', () => {
          Array.from(choicesWrap.children).forEach(b => b.disabled = true);
          const ok = ci === spec.answer;
          btn.classList.add(ok ? 'correct' : 'wrong');
          if (!ok) choicesWrap.children[spec.answer].classList.add('correct');
          feedback.textContent = ok ? opts.correctMsg : opts.wrongMsg;
          feedback.className = 'feedback ' + (ok ? 'ok' : 'bad');
          if (opts.onAnswer) opts.onAnswer(ok);
        });
        choicesWrap.appendChild(btn);
      });
      body.appendChild(choicesWrap);
    } else if (spec.format === 'matching') {
      renderMatchingCore(body, spec.pairs, {
        showScore: false,
        onComplete: () => {
          feedback.textContent = opts.correctMsg;
          feedback.className = 'feedback ok';
          if (opts.onAnswer) opts.onAnswer(true);
        }
      });
    } else if (spec.format === 'order') {
      renderOrderCore(body, spec.tokens, spec.correctOrder, {
        onComplete: ok => {
          feedback.textContent = ok ? opts.correctMsg : opts.wrongMsg;
          feedback.className = 'feedback ' + (ok ? 'ok' : 'bad');
          if (opts.onAnswer) opts.onAnswer(ok);
        }
      });
    }

    card.appendChild(body);
    card.appendChild(feedback);
    container.appendChild(card);
  });
}

function numericAnswerCheck(expected, tolerance) {
  const tol = tolerance === undefined ? 0.01 : tolerance;
  return val => {
    const cleaned = String(val).replace(',', '.').replace(/[^0-9.\-]/g, '');
    const n = parseFloat(cleaned);
    if (isNaN(n)) return false;
    return Math.abs(n - expected) <= tol;
  };
}

function letterSequenceCheck(expectedLetters) {
  return val => {
    const parts = String(val).toUpperCase().split(',').map(s => s.trim().replace(/[^A-Z]/g, '')).filter(Boolean);
    if (parts.length !== expectedLetters.length) return false;
    return parts.every((p, i) => p === expectedLetters[i]);
  };
}

function decimalDistractors(correct, count, step, decimals) {
  const factor = Math.pow(10, decimals);
  const correctInt = Math.round(correct * factor);
  const stepInt = Math.max(1, Math.round(step * factor));
  const set = new Set([correctInt]);
  const out = [];
  let guard = 0;
  while (out.length < count && guard < 60) {
    guard++;
    const mult = randInt(1, 5);
    const delta = stepInt * mult * (Math.random() < 0.5 ? -1 : 1);
    const valInt = correctInt + delta;
    if (valInt > 0 && !set.has(valInt)) {
      set.add(valInt);
      out.push(valInt / factor);
    }
  }
  let bump = 1;
  while (out.length < count) {
    const valInt = correctInt + stepInt * (count + bump);
    if (!set.has(valInt)) { set.add(valInt); out.push(valInt / factor); }
    bump++;
  }
  return out;
}

/* ===================== Graph reading (random data each load) ===================== */

const GRAPH_COLORS = ['#7657ff', '#ff5f91', '#17a589', '#2f8fe0', '#e0a530'];

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickDistinctInts(min, max, count) {
  const pool = [];
  for (let i = min; i <= max; i++) pool.push(i);
  return shuffleArray(pool).slice(0, count);
}

function numericDistractors(correct, count, spread) {
  const set = new Set([correct]);
  const out = [];
  let guard = 0;
  while (out.length < count && guard < 60) {
    guard++;
    const delta = randInt(1, Math.max(2, spread)) * (Math.random() < 0.5 ? -1 : 1);
    const val = correct + delta;
    if (val > 0 && !set.has(val)) {
      set.add(val);
      out.push(val);
    }
  }
  let bump = spread + 1;
  while (out.length < count) {
    const val = correct + bump;
    if (!set.has(val)) { set.add(val); out.push(val); }
    bump++;
  }
  return out;
}

function makeChoiceQuestion(questionEN, translationPT, correctText, distractorTexts) {
  const choices = shuffleArray([correctText, ...distractorTexts]);
  const answer = choices.indexOf(correctText);
  return { question: questionEN, translation: translationPT, choices, answer };
}

function generateGraphData(theme) {
  const n = theme.count || 4;
  const cats = theme.keepOrder ? theme.categories.slice(0, n) : shuffleArray(theme.categories).slice(0, n);
  const values = pickDistinctInts(theme.min, theme.max, n);
  return cats.map((c, i) => ({ en: c.en, pt: c.pt, value: values[i] }));
}

function buildGraphQuestions(data, theme) {
  const maxItem = data.reduce((a, b) => (b.value > a.value ? b : a));
  const q1 = makeChoiceQuestion(
    theme.questions.max.en,
    theme.questions.max.pt,
    `${maxItem.en} • ${maxItem.pt}`,
    data.filter(d => d !== maxItem).map(d => `${d.en} • ${d.pt}`)
  );

  const [ia, ib] = shuffleArray(data.map((_, i) => i)).slice(0, 2);
  const A = data[ia].value > data[ib].value ? data[ia] : data[ib];
  const B = data[ia].value > data[ib].value ? data[ib] : data[ia];
  const diff = A.value - B.value;
  const q2 = makeChoiceQuestion(
    theme.questions.diff.en(A, B),
    theme.questions.diff.pt(A, B),
    String(diff),
    numericDistractors(diff, 3, Math.max(2, Math.round(diff * 0.5))).map(String)
  );

  const total = data.reduce((s, d) => s + d.value, 0);
  const q3 = makeChoiceQuestion(
    theme.questions.total.en,
    theme.questions.total.pt,
    String(total),
    numericDistractors(total, 3, Math.max(5, Math.round(total * 0.15))).map(String)
  );

  return shuffleArray([q1, q2, q3]);
}

function renderHBarChart(containerId, data, unitEN, unitPT) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  const max = Math.max(...data.map(d => d.value));
  const wrap = document.createElement('div');
  wrap.className = 'hbar-chart';
  data.forEach((d, i) => {
    const row = document.createElement('div');
    row.className = 'hbar-row';
    const label = document.createElement('div');
    label.className = 'hbar-label';
    label.textContent = `${d.en} • ${d.pt}`;
    const track = document.createElement('div');
    track.className = 'hbar-track';
    const fill = document.createElement('div');
    fill.className = 'hbar-fill';
    fill.style.width = `${(d.value / max) * 100}%`;
    fill.style.background = GRAPH_COLORS[i % GRAPH_COLORS.length];
    const value = document.createElement('span');
    value.className = 'hbar-value';
    value.textContent = d.value;
    fill.appendChild(value);
    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    wrap.appendChild(row);
  });
  el.appendChild(wrap);
  appendGraphCaption(el, unitEN, unitPT);
}

function renderVBarChart(containerId, data, unitEN, unitPT) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  const max = Math.max(...data.map(d => d.value));
  const wrap = document.createElement('div');
  wrap.className = 'vbar-chart';
  data.forEach((d, i) => {
    const col = document.createElement('div');
    col.className = 'vbar-col';
    const value = document.createElement('div');
    value.className = 'vbar-value';
    value.textContent = d.value;
    const bar = document.createElement('div');
    bar.className = 'vbar-bar';
    bar.style.height = `${(d.value / max) * 100}%`;
    bar.style.background = GRAPH_COLORS[i % GRAPH_COLORS.length];
    const label = document.createElement('div');
    label.className = 'vbar-label';
    label.textContent = `${d.en} • ${d.pt}`;
    col.appendChild(value);
    col.appendChild(bar);
    col.appendChild(label);
    wrap.appendChild(col);
  });
  el.appendChild(wrap);
  appendGraphCaption(el, unitEN, unitPT);
}

function renderPieChart(containerId, data, unitEN, unitPT) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = 110, cy = 110, r = 100;
  let angleStart = -90;
  const paths = [];
  data.forEach((d, i) => {
    const sliceAngle = (d.value / total) * 360;
    const angleEnd = angleStart + sliceAngle;
    const large = sliceAngle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(angleStart * Math.PI / 180);
    const y1 = cy + r * Math.sin(angleStart * Math.PI / 180);
    const x2 = cx + r * Math.cos(angleEnd * Math.PI / 180);
    const y2 = cy + r * Math.sin(angleEnd * Math.PI / 180);
    const d1 = `M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
    paths.push(`<path d="${d1}" fill="${GRAPH_COLORS[i % GRAPH_COLORS.length]}" stroke="#fff" stroke-width="2"/>`);
    angleStart = angleEnd;
  });

  const wrap = document.createElement('div');
  wrap.className = 'pie-wrap';
  wrap.innerHTML = `<svg viewBox="0 0 220 220" class="pie-svg">${paths.join('')}</svg>`;

  const legend = document.createElement('div');
  legend.className = 'pie-legend';
  data.forEach((d, i) => {
    const pct = Math.round((d.value / total) * 100);
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-swatch" style="background:${GRAPH_COLORS[i % GRAPH_COLORS.length]}"></span> ${d.en} • ${d.pt} — <b>${d.value}</b> (${pct}%)`;
    legend.appendChild(item);
  });
  wrap.appendChild(legend);
  el.appendChild(wrap);
  appendGraphCaption(el, unitEN, unitPT);
}

function renderTable(containerId, data, unitEN, unitPT) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'table-scroll';
  const table = document.createElement('table');
  table.className = 'data-table';
  table.innerHTML = `<thead><tr><th>Category • Categoria</th><th>${unitEN} • ${unitPT}</th></tr></thead>`;
  const tbody = document.createElement('tbody');
  data.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.en} • ${d.pt}</td><td>${d.value}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
  el.appendChild(wrap);
}

function renderLineChart(containerId, data, unitEN, unitPT) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  const w = 460, h = 220, pad = 34;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const span = Math.max(2, max - min);
  const yMax = max + Math.ceil(span * 0.25);
  const yMin = Math.max(0, min - Math.ceil(span * 0.25));
  const stepX = (w - pad * 2) / (data.length - 1);
  const scaleY = v => h - pad - ((v - yMin) / (yMax - yMin)) * (h - pad * 2);
  const points = data.map((d, i) => [pad + i * stepX, scaleY(d.value)]);
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  let svg = `<svg viewBox="0 0 ${w} ${h}" class="line-svg">`;
  for (let i = 0; i <= 4; i++) {
    const y = pad + (i * (h - pad * 2) / 4);
    svg += `<line x1="${pad}" y1="${y}" x2="${w - 10}" y2="${y}" stroke="#eee2cf" stroke-width="1"/>`;
  }
  svg += `<path d="${linePath}" fill="none" stroke="${GRAPH_COLORS[4]}" stroke-width="3"/>`;
  points.forEach((p, i) => {
    svg += `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${GRAPH_COLORS[4]}"/>`;
    svg += `<text x="${p[0]}" y="${p[1] - 12}" text-anchor="middle" font-size="12" font-weight="700" fill="#172033">${data[i].value}</text>`;
    svg += `<text x="${p[0]}" y="${h - 8}" text-anchor="middle" font-size="10" fill="#667085">${data[i].en}</text>`;
  });
  svg += `</svg>`;
  el.innerHTML = svg;
  appendGraphCaption(el, unitEN, unitPT);
}

function appendGraphCaption(el, unitEN, unitPT) {
  const caption = document.createElement('p');
  caption.className = 'graph-unit-caption';
  caption.textContent = `${unitEN} • ${unitPT}`;
  el.appendChild(caption);
}

function setupGraphSection(theme) {
  const data = generateGraphData(theme);
  theme.render(`${theme.id}-graph`, data, theme.unitEN, theme.unitPT);
  const questions = buildGraphQuestions(data, theme);
  buildQuiz(`${theme.id}-quiz`, questions, {
    correctMsg: '✅ Correct! • Correto!',
    wrongMsg: '❌ Try again next time • Tente novamente da próxima vez',
    scoreLabel: 'Score • Pontuação'
  });
}

function initScrollSpy() {
  const links = document.querySelectorAll('.section-nav a[href^="#"]');
  const sections = Array.from(links)
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = id => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}
