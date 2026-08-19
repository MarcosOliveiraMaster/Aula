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

function buildMatching(containerId, pairs, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const opts = Object.assign({ doneMsg: '🎉 Todos os pares encontrados!' }, options);

  const wrap = document.createElement('div');
  wrap.className = 'matching-grid';

  const colLeft = document.createElement('div');
  colLeft.className = 'match-col';
  const colRight = document.createElement('div');
  colRight.className = 'match-col';

  const rightOrder = pairs.map((p, i) => i);
  for (let i = rightOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rightOrder[i], rightOrder[j]] = [rightOrder[j], rightOrder[i]];
  }

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
        updateScore();
        if (matchedCount === pairs.length) {
          scoreEl.textContent = opts.doneMsg;
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
  container.appendChild(scoreEl);

  function updateScore() {
    scoreEl.textContent = `${matchedCount} / ${pairs.length} pares encontrados`;
  }
  updateScore();
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
