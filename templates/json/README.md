# JSON-Templates

Vorlagen für neue Quizdaten-Dateien. Vor dem Anlegen einer neuen `data/*.json`-Datei das passende Template kopieren und Platzhalter ersetzen.

## Welches Template wann?

- `fachbegriff.template.json` – Vokabelkarten (z. B. Fachbegriff ↔ Deutsch), wie `auge.json`/`ohr.json`.
- `quizfrage.template.json` – normale Wissensfragen (`multiple-choice` oder `text`), wie `pflegeversicherung.json`/`sturzprophylaxe.json`.
- `bereichsfrage.template.json` – Wissensfragen, die zusätzlich einem Bereich zugeordnet werden (`bereich: "auge" | "ohr" | "pflege"`), damit sie in mehreren Quiz-Kontexten auftauchen können, wie `goldene_regeln.json`/`lernzusammenfassung_zusatz.json`.

**Wichtig bei `bereich`:** Die App verwirft Fragen mit einem unbekannten `bereich`-Wert stillschweigend (nur `console.warn` in der Konsole, kein Fehler). Erlaubte Werte hängen von der ladenden Datei/Funktion ab (siehe `normalizeQuestionsByArea`/`normalizeGoldenRuleQuestions`/`normalizeSummaryQuestions` in `js/app.js` bzw. `js/data.js`).

## Schreibkonventionen

- **`id`**: fortlaufende Ganzzahl, eindeutig innerhalb der Datei (nicht global). Kein String, keine Lücken nötig.
- **`kategorie`, `thema`, `bereich`**: snake_case, ausschließlich Kleinbuchstaben (z. B. `umgang_hoerbeeintraechtigung`, `betreutes_wohnen`).
- **`typ`**: kebab-case (`multiple-choice`, `text`) – bewusst anders als die snake_case-Felder oben, nicht versehentlich angleichen.
- **`alternativen`**: immer ein Array, auch wenn leer (`[]`), nie `null` oder weggelassen.
- **`quelleSeite`**: Ganzzahl, wenn bekannt, sonst `null` (nicht weglassen, nicht leerer String).
- Bei `multiple-choice`: genau 4 Einträge in `antworten`, `richtigeAntwort` muss wortgleich in `antworten` enthalten sein.
