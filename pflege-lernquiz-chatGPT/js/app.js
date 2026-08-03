const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const topicButtons = document.querySelectorAll(".topic-button");
const categorySelect = document.querySelector("#category-select");
const modeSelect = document.querySelector("#mode-select");
const amountSelect = document.querySelector("#amount-select");

const startButton = document.querySelector("#start-button");
const checkButton = document.querySelector("#check-button");
const nextButton = document.querySelector("#next-button");
const quitButton = document.querySelector("#quit-button");
const restartButton = document.querySelector("#restart-button");

const scoreElement = document.querySelector("#score");
const progressElement = document.querySelector("#progress");
const progressBar = document.querySelector("#progress-bar");
const categoryLabel = document.querySelector("#category-label");
const questionTypeElement = document.querySelector("#question-type");
const questionElement = document.querySelector("#question");
const answerArea = document.querySelector("#answer-area");
const feedbackElement = document.querySelector("#feedback");
const resultText = document.querySelector("#result-text");

const GROUP_LABELS = {
  anatomie: "Anatomie",
  erkrankung: "Erkrankungen",
  pflegeversicherung: "Pflegeversicherung",
  pflegegrade: "Pflegegrade",
  leistungen: "Leistungen",
  entlassungsmanagement: "Entlassungsmanagement"
};

const TOPIC_LABELS = {
  auge: "Auge",
  ohr: "Ohr",
  sinnesorgane: "Auge & Ohr",
  pflege: "Pflegeversicherung",
  alle: "Alle Themen"
};

let allQuestions = [];
let quizQuestions = [];
let selectedTopic = "auge";
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

async function loadQuizData() {
  try {
    const [eyeResponse, earResponse, careResponse] = await Promise.all([
      fetch("./data/auge.json"),
      fetch("./data/ohr.json"),
      fetch("./data/pflegeversicherung.json")
    ]);

    if (!eyeResponse.ok || !earResponse.ok || !careResponse.ok) {
      throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
    }

    const [eyeTerms, earTerms, careQuestions] = await Promise.all([
      eyeResponse.json(),
      earResponse.json(),
      careResponse.json()
    ]);

    allQuestions = [
      ...normalizeTerms(eyeTerms, "auge"),
      ...normalizeTerms(earTerms, "ohr"),
      ...normalizeCareQuestions(careQuestions)
    ];

    startButton.disabled = false;
    startButton.textContent = "Quiz starten";
  } catch (error) {
    startButton.disabled = true;
    startButton.textContent = "Quizdaten fehlen";

    startScreen.insertAdjacentHTML(
      "beforeend",
      `<p class="feedback wrong">
        ${escapeHtml(error.message)}<br>
        Starte das Projekt über einen lokalen Server, zum Beispiel mit Live Server.
      </p>`
    );

    console.error(error);
  }
}

function normalizeTerms(terms, subject) {
  return terms.map((term) => ({
    uid: `${subject}-${term.id}`,
    subject,
    group: term.kategorie,
    subcategory: term.kategorie,
    sourceKind: "term",
    originalMode: null,
    de: term.de,
    fachbegriff: term.fachbegriff,
    alternatives: term.alternativen ?? [],
    question: "",
    correctAnswer: term.fachbegriff,
    acceptedAnswers: [
      term.fachbegriff,
      ...(term.alternativen ?? [])
    ],
    predefinedOptions: [],
    explanation: term.erklaerung,
    sourcePage: null
  }));
}

function normalizeCareQuestions(questions) {
  return questions.map((question) => {
    const acceptedAnswers =
      question.akzeptierteAntworten ??
      (question.richtigeAntwort ? [question.richtigeAntwort] : []);

    return {
      uid: `pflege-${question.id}`,
      subject: "pflege",
      group: question.thema,
      subcategory: question.kategorie,
      sourceKind: "knowledge",
      originalMode: question.typ,
      question: question.frage,
      correctAnswer:
        question.richtigeAntwort ??
        acceptedAnswers[0] ??
        "",
      acceptedAnswers,
      predefinedOptions: question.antworten ?? [],
      explanation: question.erklaerung,
      sourcePage: question.quelleSeite ?? null
    };
  });
}

function selectTopic(topic) {
  selectedTopic = topic;

  topicButtons.forEach((button) => {
    const isActive = button.dataset.topic === topic;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateCategoryOptions();
}

function updateCategoryOptions() {
  const eyeAndEarGroups = ["anatomie", "erkrankung"];
  const careGroups = [
    "pflegeversicherung",
    "pflegegrade",
    "leistungen",
    "entlassungsmanagement"
  ];

  let groups = eyeAndEarGroups;

  if (selectedTopic === "pflege") {
    groups = careGroups;
  }

  if (selectedTopic === "alle") {
    groups = [...eyeAndEarGroups, ...careGroups];
  }

  categorySelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "alle";
  allOption.textContent = "Alle Bereiche";
  categorySelect.append(allOption);

  groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = GROUP_LABELS[group];
    categorySelect.append(option);
  });
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] =
      [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

function normalizeAnswer(answer) {
  return String(answer)
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?]/g, "")
    .replace(/\s+/g, " ");
}

function getQuestionMode(question, selectedMode) {
  if (selectedMode !== "gemischt") {
    return selectedMode;
  }

  if (question.originalMode) {
    return question.originalMode;
  }

  return Math.random() < 0.5 ? "multiple-choice" : "text";
}

function getFilteredQuestions() {
  const selectedGroup = categorySelect.value;

  return allQuestions.filter((question) => {
    const matchesTopic =
      selectedTopic === "alle" ||
      (selectedTopic === "sinnesorgane" &&
        (question.subject === "auge" || question.subject === "ohr")) ||
      question.subject === selectedTopic;

    const matchesGroup =
      selectedGroup === "alle" ||
      question.group === selectedGroup;

    return matchesTopic && matchesGroup;
  });
}

function createQuizQuestion(question, mode, availableQuestions) {
  const quizQuestion = {
    ...question,
    mode
  };

  if (question.sourceKind === "term") {
    const answerDirection =
      Math.random() < 0.5 ? "fachbegriff" : "deutsch";

    quizQuestion.answerDirection = answerDirection;

    if (answerDirection === "fachbegriff") {
      quizQuestion.question =
        `Wie lautet der Fachbegriff für „${question.de}“?`;
      quizQuestion.correctAnswer = question.fachbegriff;
      quizQuestion.acceptedAnswers = [
        question.fachbegriff,
        ...question.alternatives
      ];
    } else {
      quizQuestion.question = `Was bedeutet „${question.fachbegriff}“?`;
      quizQuestion.correctAnswer = question.de;
      quizQuestion.acceptedAnswers = [question.de];
    }
  }

  quizQuestion.options =
    mode === "multiple-choice"
      ? createAnswerOptions(quizQuestion, availableQuestions)
      : [];

  return quizQuestion;
}

function createAnswerOptions(correctQuestion, availableQuestions) {
  if (correctQuestion.predefinedOptions.length >= 4) {
    return shuffleArray([...correctQuestion.predefinedOptions]);
  }

  const isTermQuestion = correctQuestion.sourceKind === "term";
  const answerField =
    correctQuestion.answerDirection === "deutsch"
      ? "de"
      : "fachbegriff";
  const eligibleQuestions = isTermQuestion
    ? availableQuestions.filter((question) => {
        return question.sourceKind === "term";
      })
    : availableQuestions;

  const sameSubjectAndGroup = eligibleQuestions.filter((question) => {
    return (
      question.subject === correctQuestion.subject &&
      question.group === correctQuestion.group &&
      question.uid !== correctQuestion.uid
    );
  });

  const sameGroup = eligibleQuestions.filter((question) => {
    return (
      question.group === correctQuestion.group &&
      question.uid !== correctQuestion.uid
    );
  });

  const sameSubject = eligibleQuestions.filter((question) => {
    return (
      question.subject === correctQuestion.subject &&
      question.uid !== correctQuestion.uid
    );
  });

  const fallback = eligibleQuestions.filter((question) => {
    return question.uid !== correctQuestion.uid;
  });

  const answerPool = [
    ...shuffleArray(sameSubjectAndGroup),
    ...shuffleArray(sameSubject),
    ...shuffleArray(sameGroup),
    ...shuffleArray(fallback)
  ];

  const wrongAnswers = answerPool
    .map((question) => {
      return isTermQuestion
        ? question[answerField]
        : question.correctAnswer;
    })
    .filter(Boolean)
    .filter((answer) => {
      return normalizeAnswer(answer) !==
        normalizeAnswer(correctQuestion.correctAnswer);
    })
    .filter((answer, index, array) => {
      return array.findIndex((item) => {
        return normalizeAnswer(item) === normalizeAnswer(answer);
      }) === index;
    })
    .slice(0, 3);

  return shuffleArray([
    correctQuestion.correctAnswer,
    ...wrongAnswers
  ]);
}

function startQuiz() {
  const selectedMode = modeSelect.value;
  const selectedAmount = Number(amountSelect.value);
  const filteredQuestions = getFilteredQuestions();

  if (filteredQuestions.length === 0) {
    feedbackElement.className = "feedback wrong";
    feedbackElement.textContent = "Für diese Auswahl sind keine Fragen vorhanden.";
    return;
  }

  const selectedQuestions = shuffleArray(filteredQuestions)
    .slice(0, Math.min(selectedAmount, filteredQuestions.length));

  quizQuestions = selectedQuestions.map((question) => {
    const mode = getQuestionMode(question, selectedMode);

    return createQuizQuestion(
      question,
      mode,
      question.sourceKind === "term"
        ? allQuestions
        : filteredQuestions
    );
  });

  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;

  startScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;

  showQuestion();
}

function showQuestion() {
  const question = quizQuestions[currentQuestionIndex];

  answerChecked = false;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  checkButton.hidden = false;
  nextButton.hidden = true;

  categoryLabel.textContent = createBadgeLabel(question);

  progressElement.textContent =
    `Frage ${currentQuestionIndex + 1} von ${quizQuestions.length}`;

  progressBar.style.width =
    `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

  questionElement.textContent = question.question;

  if (question.mode === "multiple-choice") {
    questionTypeElement.textContent = "Wähle die richtige Antwort.";
    renderMultipleChoice(question);
  } else {
    questionTypeElement.textContent = "Schreibe die richtige Antwort aus.";
    renderTextInput();
  }
}

function createBadgeLabel(question) {
  if (question.subject === "pflege") {
    const group = GROUP_LABELS[question.group] ?? question.group;
    return `Pflege · ${group}`;
  }

  const topic = question.subject === "auge" ? "Auge" : "Ohr";
  const group = GROUP_LABELS[question.group] ?? question.group;

  return `${topic} · ${group}`;
}

function renderMultipleChoice(question) {
  answerArea.innerHTML = "";

  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.id = `answer-${index}`;

    const text = document.createElement("span");
    text.textContent = option;

    label.append(input, text);
    answerArea.append(label);
  });
}

function renderTextInput() {
  answerArea.innerHTML = `
    <input
      class="text-answer"
      id="text-answer"
      type="text"
      placeholder="Antwort eingeben"
      autocomplete="off"
    >
  `;

  document.querySelector("#text-answer").focus();
}

function getUserAnswer(question) {
  if (question.mode === "multiple-choice") {
    const selected = document.querySelector(
      'input[name="answer"]:checked'
    );

    return selected ? selected.value : "";
  }

  return document.querySelector("#text-answer").value;
}

function isCorrectAnswer(userAnswer, question) {
  const acceptedAnswers =
    question.acceptedAnswers.length > 0
      ? question.acceptedAnswers
      : [question.correctAnswer];

  return acceptedAnswers.some((answer) => {
    return normalizeAnswer(answer) === normalizeAnswer(userAnswer);
  });
}

function checkAnswer() {
  if (answerChecked) {
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  const userAnswer = getUserAnswer(question);

  if (!userAnswer.trim()) {
    feedbackElement.className = "feedback wrong";
    feedbackElement.textContent =
      question.mode === "multiple-choice"
        ? "Wähle zuerst eine Antwort aus."
        : "Gib zuerst eine Antwort ein.";
    return;
  }

  answerChecked = true;
  const correct = isCorrectAnswer(userAnswer, question);

  if (correct) {
    score++;
    scoreElement.textContent = score;
    feedbackElement.className = "feedback correct";
    feedbackElement.innerHTML =
      `<strong>Richtig.</strong> ${escapeHtml(question.explanation)}`;
  } else {
    feedbackElement.className = "feedback wrong";
    feedbackElement.innerHTML =
      `<strong>Falsch.</strong> Richtig ist: ` +
      `<strong>${escapeHtml(question.correctAnswer)}</strong>. ` +
      `${escapeHtml(question.explanation)}`;
  }

  disableInputs();

  checkButton.hidden = true;
  nextButton.hidden = false;
  nextButton.textContent =
    currentQuestionIndex === quizQuestions.length - 1
      ? "Ergebnis anzeigen"
      : "Nächste Frage";
}

function disableInputs() {
  answerArea.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
    return;
  }

  showResult();
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const percentage = Math.round(
    (score / quizQuestions.length) * 100
  );

  resultText.textContent =
    `${TOPIC_LABELS[selectedTopic]}: Du hast ${score} von ` +
    `${quizQuestions.length} Fragen richtig beantwortet (${percentage} %).`;
}

function resetToStart() {
  quizScreen.hidden = true;
  resultScreen.hidden = true;
  startScreen.hidden = false;

  score = 0;
  scoreElement.textContent = score;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectTopic(button.dataset.topic);
  });
});

startButton.addEventListener("click", startQuiz);
checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
quitButton.addEventListener("click", resetToStart);
restartButton.addEventListener("click", resetToStart);

document.addEventListener("keydown", (event) => {
  if (quizScreen.hidden) {
    return;
  }

  if (event.key === "Enter") {
    if (!nextButton.hidden) {
      nextQuestion();
    } else {
      checkAnswer();
    }
  }
});

updateCategoryOptions();
loadQuizData();
