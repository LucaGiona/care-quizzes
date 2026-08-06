# Learning Log – Mrs. F. Has to Move

*[Deutsche Version](LEARNING_LOG.md)*

This file documents the progress of the project: goal, AI/tools used, prompt, outcome, difficulties, solution, and lessons learned.

Full prompts are additionally stored in the `prompts/` folder. The template for new entries is in `templates/entry-template_EN.md`.

---

## Project Overview

**Project name:** Mrs. F. Has to Move
**Parent repository:** `care-quizzes`

### Project goal

The project combines two learning areas: learning and reviewing care-nursing knowledge (through play) and learning to build a web application. The application is implemented as a quiz and may contain different technical variants.

### Nursing/care topics

- Eye (anatomy, diseases, eye medication, miosis/mydriasis, tear ducts)
- Ear (anatomy, diseases, presbycusis)
- Long-term care insurance, care levels, long-term care insurance benefits
- Short-term care, discharge management, transitional care management
- Living arrangements in old age, fall prevention
- Dealing with visual and hearing impairments

### Technical topics

HTML, CSS, JavaScript, JSON, Git/GitHub, project architecture, responsive web design, deployment, prompt engineering, AI-assisted development, comparison of different AI systems.

---

# Development Log

## 1. Basic Quiz Setup

**Goal:** Browser-based learning app with HTML, CSS, JavaScript, and JSON. Four answer options, exactly one correct; terms as multiple choice or free text; multiple care topics; score/progress; explanation after each answer.

**AI/Tools:** ChatGPT, Claude · VS Code, Live Server, Git, GitHub

**Prompt (paraphrased):**
```text
Build a quiz with HTML, CSS, and JavaScript. Each question shows four
answers, one correct. For technical terms, also allow free-text input.
Load quiz data from JSON files. Topics initially: eye and ear.
```
Full version: `prompts/001-basic-quiz-setup.md`

**Result:** `index.html`, `css/style.css`, `js/app.js`, `data/auge.json`, `data/ohr.json` (more JSON files were added later).

**Architecture:** HTML = structure, CSS = styling, JavaScript = logic, JSON = questions/content.

**Difficulties → Solution:**
- JSON couldn't be loaded reliably via `fetch()` when opening the HTML file directly → started the app with Live Server instead.
- Unclear which data should be stored as terms vs. full questions → separate JSON structures for terms (eye/ear) and full care-nursing questions.
- Wrong multiple-choice answers had to be generated sensibly.

**Lessons learned:** `fetch()` usually needs a local web server during development; JSON is good for separating data from logic; terms need a different data structure than fully phrased questions. Anatomical terms work well as vocabulary quizzes; long-term care insurance/discharge management work better as fully phrased questions; explanations after answers improve learning.

**Status:** Basic structure, eye, ear, multiple choice, and free-text input are in place. Open: full manual review of all questions.

---

## 2. Mixed Question Direction for Technical Terms

**Goal:** Terms from `auge.json`/`ohr.json` should automatically be quizzed in both directions (German → term, e.g. Netzhaut → Retina; and term → German, e.g. Retina → Netzhaut), without an extra selector in the HTML.

**AI:** Codex in VS Code, Claude directly in VS Code

**Prompt (short version):**
```text
Adjust the existing quiz app so that terms from auge.json and ohr.json
are randomly quizzed in both directions. For German→term, the answer
options must be terms; for term→German, the answer options must be
German words. Long-term care insurance questions must not be changed.
```
Full version: `prompts/002-mixed-question-direction.md`

**Expected change:** `js/app.js`, possibly a new internal property `answerDirection: "term" | "german"`.

**Requirements:** Direction is chosen anew for each round, both directions occur, the correct answer appears only once, wrong answers match the expected answer type, alternative spellings are accepted for free-text input, long-term care insurance questions remain unchanged.

**Result checklist (fill in after testing):**
- [ ] German → term works
- [ ] Term → German works
- [ ] Multiple choice and free text work in both directions
- [ ] Alternative terms are accepted
- [ ] Long-term care insurance questions still work

**Reflection:** still open – fill in after testing (what worked, what needed correcting, what I learned).

---

## 3. Expanding the Quiz Data

**Goal:** Compare existing JSON files with the study summary and add missing content as new quiz questions.

**AI:** ChatGPT

**Files used:** `lernzusammenfassung.pdf`, `auge.json`, `ohr.json`, `pflegeversicherung.json`, `goldene_regeln.json`, `sturzprophylaxe.json`

**Checked, among others:** presbycusis, eye anatomy, administering eye medication, conjunctival sac/tear ducts, miosis/mydriasis, cataract/glaucoma, short-term care, need for care, living arrangements in old age.

**Result:** Well covered already: eye/ear anatomy, basics of cataract/glaucoma, care levels, short-term care, long-term care insurance benefits. Only partially/not covered: presbycusis details, technique for administering eye medication, conjunctival sac/tear drainage, miosis/mydriasis, detailed cataract/glaucoma comparison, living arrangements in old age, details on need for care.

**Architecture decision:** Existing term collections were left unchanged; a new supplementary file `data/lernzusammenfassung_zusatz.json` was created with questions on presbycusis, eye medication, tear ducts, pupil reactions, cataract/glaucoma, short-term care, need for care, living arrangements in old age.

**Difficulties → Solution:** Existing JSON files use different structures (terms vs. full questions); new questions must not duplicate existing content → new file in the format of full quiz questions, existing term data unchanged, topic/category distinguished via dedicated fields.

**Next steps:** load the new JSON file in `app.js`, add a topic filter, test in the browser, review content accuracy, check for duplicates.

---

## 4. Restructuring into a Collection Repository

**Goal:** Manage several standalone quiz projects together in the `care-quizzes` repository.

**Structure:**
```text
care-quizzes/
├── .git/  .gitignore  README.md  README_EN.md
├── .github/pull_request_template.md
├── frau-f-muss-umziehen/
│   ├── README.md  LEARNING_LOG.md  prompts/  index.html  css/
│   ├── pflege-lernquiz-chatGPT/
│   └── pflege-lernquiz-claude/
├── herz-quiz/  (later)
└── weitere-quizprojekte/
```

`care-quizzes` is the Git root folder, the GitHub repository, and the collection folder. Each quiz subfolder can have its own `index.html` and be deployed separately (e.g. on Netlify).

**Lessons learned:** `.git` belongs only in the root folder; the `.gitignore` there applies to all subfolders; individual quiz projects don't need their own Git repo; a central `index.html` in the root folder isn't required for now.

**Status:** Repo renamed, remote updated, first quiz placed in its folder, root-level `.gitignore` in place. Open: main README (DE/EN), pull request template, additional quiz projects.

---

## 5. Comparing Different AI Systems

**Goal:** Use different AI systems (ChatGPT, Codex, Claude, possibly others) for comparable development tasks.

**Criteria:** understanding of the prompt, quality of architecture, code quality/readability, number of corrections needed, handling of existing files, error-proneness, usability of the result.

**Observations:** still open (ChatGPT / Codex / Claude).

**Conclusion:** still open.

---

*Template for new entries: see `templates/entry-template_EN.md`.*
