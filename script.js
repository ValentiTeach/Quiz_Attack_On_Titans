document.addEventListener('DOMContentLoaded', () => {
 
    /* ═══════════════════════════════════════
       ПИТАННЯ КВІЗУ (кіно)
    ═══════════════════════════════════════ */
    const questions = [
        {
            question: "Хто був головним героєм аніме?",
            answers: ["Ерен Йегер", "Бертольд Гувер", "Леві Аккерман", "Мікаса Аккерман"],
            correct: 0
        },
        {
            question: "Хто був жінкою титаном?",
            answers: ["Мікаса Аккерман", "Енні Леонхарт", "Саша Браус", "Ханджі Зое"],
            correct: 1
        },
        {
            question: "Як себе називала група титанів яка думала що вони будуть свободні?",
            answers: ["Воїни", "Герої", "Безсмертні", "Визволені"],
            correct: 0
        },
        {
            question: "Ким був колосальним титаном?",
            answers: ["Король Фріц", "Хелос", "Бертольд Гувер", "Леві Аккерман"],
            correct: 2
        },
        {
            question: "Скільки  великих стін було які захищало людство?",
            answers: ["3", "5", "1", "2"],
            correct: 0
        },
        {
            question: "Як називалися ці 3 стіни?",
            answers: ["Стіна марії,Стіна Роза,Стіна Шіна", "Стіна Діви,Стіна Віри,Стіна Спасіння", "Стіна Марії,Стіна Віри,Світова стіна"],
            correct: 0
        },
        {
            question: "На якому острові відбувалося аніме?",
            answers: ["Острів:Віри", "Острів:Титанів", "Острів:Камо", "Острів:Парадиз"],
            correct: 3
        },
        {
            question: "Скільки часу живе людина після того, як получить силу титана?",
            answers: ["20 років", "15 років", "Він стане безсмертним", "13 років"],
            correct: 3
        },
        {
            question: "Що батько Ерен Йегера ховав від свого сина?",
            answers: ["Укол щоб получити силу титана", "Книжку яка розказувала про титанів", "Книжку яка розказувала про трансформацію в титана"],
            correct: 0
        },
        {
            question: "Чому ніхто не хотів ставати у команду розвідки?",
            answers: ["Тому що було дуже важко навчитися", "Тому що не хотіли за стіни", "Тому що мало хто повертався живим", "Тому що мало платили"],
            correct: 2
        }
    ];
 
    /* ═══════════════════════════════════════
       ЕЛЕМЕНТИ DOM
    ═══════════════════════════════════════ */
    const startScreen    = document.getElementById('start-screen');
    const quizScreen     = document.getElementById('quiz-screen');
    const resultScreen   = document.getElementById('result-screen');
    const startBtn       = document.getElementById('start-btn');
    const restartBtn     = document.getElementById('restart-btn');
    const questionText   = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const timerEl        = document.getElementById('timer');
    const timerBar       = document.getElementById('timer-bar');
    const scoreEl        = document.getElementById('score-display');
    const qCounter       = document.getElementById('q-counter');
    const resultRank     = document.getElementById('result-rank');
    const resultScore    = document.getElementById('result-score');
    const resultTextEl   = document.getElementById('result-text');
    const resultEmblem   = document.getElementById('result-emblem');
 
    let questionIndex = 0;
    let score = 0;
    let timeLeft = 15;
    let interval = null;
 
    /* ─── helpers ─── */
    const show = el => el.classList.remove('hide');
    const hide = el => el.classList.add('hide');
 
    /* ═══════════════════════════════════════
       ТАЙМЕР
    ═══════════════════════════════════════ */
    function startTimer() {
        clearInterval(interval);
        timeLeft = 15;
        updateTimerUI();
 
        interval = setInterval(() => {
            timeLeft--;
            updateTimerUI();
 
            if (timeLeft <= 0) {
                clearInterval(interval);
                disableAnswers();
                highlightCorrect();
                setTimeout(nextQuestion, 1200);
            }
        }, 1000);
    }
 
    function updateTimerUI() {
        timerEl.textContent = timeLeft;
        timerBar.style.width = (timeLeft / 15 * 100) + '%';
 
        const danger = timeLeft <= 5;
        timerEl.classList.toggle('danger', danger);
        timerBar.classList.toggle('danger', danger);
    }
 
    /* ═══════════════════════════════════════
       ПОКАЗ ПИТАННЯ
    ═══════════════════════════════════════ */
    function showQuestion(q) {
        const num = String(questionIndex + 1).padStart(2, '0');
        const total = String(questions.length).padStart(2, '0');
        qCounter.textContent = `${num} / ${total}`;
        questionText.textContent = q.question;
 
        answersContainer.innerHTML = '';
        q.answers.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = ans;
            btn.addEventListener('click', () => checkAnswer(btn, i));
            answersContainer.appendChild(btn);
        });
 
        startTimer();
    }
 
    /* ═══════════════════════════════════════
       ПЕРЕВІРКА ВІДПОВІДІ
    ═══════════════════════════════════════ */
    function checkAnswer(btn, i) {
        clearInterval(interval);
        disableAnswers();
 
        const correct = questions[questionIndex].correct;
        if (i === correct) {
            score++;
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
            highlightCorrect();
        }
 
        scoreEl.textContent = score;
        setTimeout(nextQuestion, 1300);
    }
 
    function highlightCorrect() {
        const btns = answersContainer.querySelectorAll('.answer-btn');
        btns[questions[questionIndex].correct].classList.add('correct');
    }
 
    function disableAnswers() {
        answersContainer.querySelectorAll('.answer-btn')
            .forEach(b => b.disabled = true);
    }
 
    /* ═══════════════════════════════════════
       НАСТУПНЕ ПИТАННЯ
    ═══════════════════════════════════════ */
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }
 
    /* ═══════════════════════════════════════
       РЕЗУЛЬТАТ
    ═══════════════════════════════════════ */
    const ranks = [
        { min: 10,   max: 10,  rank: 'S - rank',         emblem: '🪖', msg: 'Легендарно.' },
        { min: 7,   max: 9,  rank: 'A - rank',             emblem: '🛡️', msg: 'Майже,але дуже добре.' },
        { min: 4,   max: 6,  rank: 'C+ - rank',    emblem: '⚖️', msg: 'Середній результат.' },
        { min: 2,   max: 3,  rank: 'D = rank',   emblem: '🦅', msg: 'Нижче середнього.' },
        { min: 0,   max: 0,  rank: 'F - rank',         emblem: '⚔️', msg: 'Найгірший результат.' }
    ];
 
    function showResult() {
        clearInterval(interval);
        hide(quizScreen);
        show(resultScreen);
 
        const r = ranks.find(r => score >= r.min && score <= r.max) || ranks[0];
        resultEmblem.textContent = r.emblem;
        resultRank.textContent = r.rank;
        resultScore.textContent = `${score} / ${questions.length}`;
        resultTextEl.textContent = r.msg;
    }
 
    /* ═══════════════════════════════════════
       СТАРТ / РЕСТАРТ
    ═══════════════════════════════════════ */
    function startGame() {
        questionIndex = 0;
        score = 0;
        scoreEl.textContent = '0';
        timerBar.style.width = '100%';
        timerBar.classList.remove('danger');
        timerEl.classList.remove('danger');
 
        hide(startScreen);
        hide(resultScreen);
        show(quizScreen);
 
        showQuestion(questions[questionIndex]);
    }
 
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
