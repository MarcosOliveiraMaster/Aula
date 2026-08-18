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

  container.parentElement.appendChild(scoreEl);

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
