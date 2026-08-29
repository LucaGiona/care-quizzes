# Prompt-Vorlage: Niere-Quiz generieren

Diesen Block kopieren, die Platzhalter (`<...>`) ausfüllen und einer KI (z. B. Claude) übergeben.

---

## Kontext

Ich baue ein Lernquiz für die Pflegeausbildung im Ordner `quizzes/niere/`
des Projekts "Care Quizzes" (statisches HTML/CSS/JavaScript, keine
Frameworks/Build-Tools). Das Grundgerüst (`index.html`, `css/style.css`,
`js/app.js`) existiert bereits. Ich brauche jetzt **Fragedaten als JSON**
nach einem festen Schema, die ich in `js/app.js` einbinde.

## Aufgabe

Erstelle Fragen zum Thema **Niere** für die Pflegefachausbildung, basierend
auf folgendem Lehrmaterial/Quellentext:

```text
<Lehrtext, Skript oder PDF-Auszug hier einfügen>
```

## Umfang

- Anzahl Fragen: `<z. B. 20>`
- Themenschwerpunkte: `<z. B. Anatomie, Physiologie/Filtration, Erkrankungen
  (Niereninsuffizienz, Dialyse), Pflegemaßnahmen, Laborwerte>`
- Zielniveau: `<z. B. Pflegefachmann/-frau, 2. Ausbildungsjahr>`
- Sprache: Deutsch

## Format (zwingend einhalten)

Gib die Fragen als **valides JSON-Array** aus, jedes Element nach genau
einem der folgenden drei Typen. Kein zusätzlicher Text, keine Kommentare,
kein Markdown-Codefence außer dem JSON selbst.

### Typ 1 – Multiple-Choice-Frage

```json
{
  "id": 1,
  "bereich": "niere",
  "thema": "<z. B. anatomie | physiologie | erkrankungen | pflege>",
  "kategorie": "<engere Unterkategorie, z. B. filtration>",
  "typ": "multiple-choice",
  "frage": "Frage hier eintragen",
  "antworten": ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
  "richtigeAntwort": "Antwort A",
  "erklaerung": "Kurze Erklärung, warum die Antwort richtig ist.",
  "quelleSeite": null
}
```

### Typ 2 – Textfrage (freie Eingabe)

```json
{
  "id": 2,
  "bereich": "niere",
  "thema": "<thema>",
  "kategorie": "<kategorie>",
  "typ": "text",
  "frage": "Textfrage hier eintragen",
  "akzeptierteAntworten": ["Richtige Antwort", "Alternative Schreibweise"],
  "erklaerung": "Kurze Erklärung zur richtigen Antwort.",
  "quelleSeite": null
}
```

### Typ 3 – Fachbegriff (Begriffs-Zuordnung)

```json
{
  "id": 3,
  "kategorie": "<z. B. anatomie>",
  "de": "Deutscher Begriff",
  "fachbegriff": "Lateinischer/medizinischer Fachbegriff",
  "alternativen": ["Alternative Schreibweise"],
  "erklaerung": "Kurze fachliche Erklärung zum Begriff."
}
```

## Regeln

1. `id` fortlaufend über das gesamte Array, keine Duplikate.
2. `bereich` bei Typ 1 und 2 immer `"niere"`.
3. Bei Multiple-Choice: genau 4 Antworten, `richtigeAntwort` muss exakt
   einem Eintrag in `antworten` entsprechen.
4. `erklaerung` immer ausfüllen (kein Platzhaltertext), 1–2 Sätze,
   fachlich korrekt.
5. `quelleSeite` auf `null` lassen, falls keine Seitenzahl aus dem
   Quellentext bekannt ist — sonst Seitenzahl als Zahl eintragen.
6. Fachbegriffe (Typ 3) nur eindeutige Begriffe, keine Wiederholungen.
7. Keine erfundenen medizinischen Fakten — nur Inhalte, die im
   bereitgestellten Quellentext stehen oder allgemein anerkanntes
   Grundlagenwissen der Pflegeausbildung sind.
8. Ausgabe ausschließlich als JSON-Array, UTF-8, keine Kommentare.

## Referenz-Vorlagen im Projekt

- `templates/json/quizfrage.template.json`
- `templates/json/bereichsfrage.template.json`
- `templates/json/fachbegriff.template.json`
- Beispiel mit echten Daten:
  `quizzes/frau-f-muss-umziehen/pflege-lernquiz-claude/data/auge.json`

---

**Nach Erhalt der JSON-Antwort:** Datei unter
`quizzes/niere/data/<thema>.json` speichern (z. B. `data/anatomie.json`)
und in `quizzes/niere/js/app.js` einbinden.
