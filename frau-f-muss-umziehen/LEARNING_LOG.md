# Learning Log – Frau F. muss umziehen

*[English version](LEARNING_LOG_EN.md)*

In dieser Datei wird die Entwicklung des Projekts dokumentiert: Ziel, verwendete KI/Werkzeuge, Prompt, Ergebnis, Schwierigkeiten, Lösung, Erkenntnisse.

Vollständige Prompts liegen zusätzlich im Ordner `prompts/`. Die Vorlage für neue Einträge liegt in `templates/entry-template.md`.

---

## Projektübersicht

**Projektname:** Frau F. muss umziehen
**Übergeordnetes Repository:** `care-quizzes`

### Ziel des Projekts

Das Projekt verbindet zwei Lernbereiche: Pflegewissen lernen und wiederholen (durch Spaß) sowie die Entwicklung einer Webanwendung erlernen. Die Anwendung wird als Quiz umgesetzt und kann unterschiedliche technische Varianten enthalten.

### Pflegefachliche Themen

- Auge (Anatomie, Erkrankungen, Augenmedikamente, Miosis/Mydriasis, Tränenwege)
- Ohr (Anatomie, Erkrankungen, Presbyakusis)
- Pflegeversicherung, Pflegegrade, Leistungen der Pflegeversicherung
- Kurzzeitpflege, Entlassungsmanagement, Überleitungsmanagement
- Wohnformen im Alter, Sturzprophylaxe
- Umgang mit Seh- und Hörbeeinträchtigungen

### Technische Themen

HTML, CSS, JavaScript, JSON, Git/GitHub, Projektarchitektur, responsives Webdesign, Deployment, Prompt Engineering, KI-gestützte Entwicklung, Vergleich verschiedener KI-Systeme.

---

# Entwicklungsprotokoll

## 1. Grundaufbau des Quiz

**Ziel:** Browserbasierte Lernanwendung mit HTML, CSS, JavaScript und JSON. Vier Antwortmöglichkeiten, genau eine richtig; Fachbegriffe als Multiple Choice oder Texteingabe; mehrere Pflegethemen; Punkte/Fortschritt; Erklärung nach jeder Antwort.

**KI/Werkzeuge:** ChatGPT, Claude · VS Code, Live Server, Git, GitHub

**Prompt (sinngemäß):**
```text
Erstelle ein Quiz mit HTML, CSS und JavaScript. Zu jeder Frage vier
Antworten, eine richtig. Bei Fachbegriffen zusätzlich Texteingabe.
Quizdaten aus JSON-Dateien laden. Themen zunächst Auge und Ohr.
```
Vollständig: `prompts/001-grundaufbau-quiz.md`

**Ergebnis:** `index.html`, `css/style.css`, `js/app.js`, `data/auge.json`, `data/ohr.json` (weitere JSON-Dateien folgten später).

**Architektur:** HTML = Struktur, CSS = Gestaltung, JavaScript = Logik, JSON = Fragen/Lerninhalte.

**Schwierigkeiten → Lösung:**
- JSON ließ sich beim direkten Öffnen der HTML-Datei nicht per `fetch()` laden → Start über Live Server.
- Unklar, was als Fachbegriff vs. vollständige Frage gespeichert wird → getrennte JSON-Strukturen für Begriffe (Auge/Ohr) und vollständige Pflegefragen.
- Falsche MC-Antworten mussten sinnvoll erzeugt werden.

**Erkenntnisse:** `fetch()` braucht lokal meist einen Webserver; JSON trennt Daten und Logik gut; Fachbegriffe brauchen eine andere Datenstruktur als ausformulierte Fragen. Anatomische Begriffe eignen sich gut als Vokabelquiz; Pflegeversicherung/Entlassungsmanagement eher als vollständige Fragen; Erklärungen nach Antworten verbessern den Lerneffekt.

**Status:** Grundstruktur, Auge, Ohr, Multiple Choice und Texteingabe stehen. Offen: vollständige manuelle Prüfung aller Fragen.

---

## 2. Gemischte Fragerichtung für Fachbegriffe

**Ziel:** Fachbegriffe aus `auge.json`/`ohr.json` sollen automatisch gemischt in beide Richtungen abgefragt werden (Deutsch → Fachbegriff, z.B. Netzhaut → Retina; und Fachbegriff → Deutsch, z.B. Retina → Netzhaut), ohne zusätzliche Auswahl im HTML.

**KI:** Codex in VS Code, Claude direkt in VS Code

**Prompt (Kurzfassung):**
```text
Passe die bestehende Quiz-App so an, dass Fachbegriffe aus auge.json
und ohr.json zufällig in beide Richtungen abgefragt werden. Bei
Deutsch→Fachbegriff müssen die Antworten Fachbegriffe sein, bei
Fachbegriff→Deutsch deutsche Begriffe. Pflegeversicherungsfragen
dürfen nicht verändert werden.
```
Vollständig: `prompts/002-gemischte-fragerichtung.md`

**Erwartete Änderung:** `js/app.js`, evtl. neue Eigenschaft `answerDirection: "fachbegriff" | "deutsch"`.

**Anforderungen:** Richtung wird pro Runde neu bestimmt, beide Richtungen kommen vor, richtige Antwort erscheint nur einmal, falsche Antworten passen zum Antworttyp, Alternativschreibweisen werden bei Texteingabe akzeptiert, Pflegeversicherungsfragen bleiben unverändert.

**Ergebnis-Checkliste (nach Test ausfüllen):**
- [ ] Deutsch → Fachbegriff funktioniert
- [ ] Fachbegriff → Deutsch funktioniert
- [ ] MC und Texteingabe funktionieren in beiden Richtungen
- [ ] Alternativbegriffe werden akzeptiert
- [ ] Pflegeversicherungsfragen funktionieren weiterhin

**Reflexion:** noch offen – nach dem Test ergänzen (was funktionierte, was musste korrigiert werden, was habe ich gelernt).

---

## 3. Erweiterung der Quizdaten

**Ziel:** Vorhandene JSON-Dateien mit der Lernzusammenfassung abgleichen und fehlende Inhalte als neue Fragen ergänzen.

**KI:** ChatGPT - claude

**Verwendete Dateien:** `lernzusammenfassung.pdf`, `auge.json`, `ohr.json`, `pflegeversicherung.json`, `goldene_regeln.json`, `sturzprophylaxe.json`

**Geprüft u.a.:** Presbyakusis, Augenanatomie, Einbringen von Augenmedikamenten, Bindehautsack/Tränenwege, Miosis/Mydriasis, Katarakt/Glaukom, Kurzzeitpflege, Pflegebedürftigkeit, Wohnformen im Alter.

**Ergebnis:** Gut abgedeckt waren Anatomie (Auge/Ohr), Grundlagen zu Katarakt/Glaukom, Pflegegrade, Kurzzeitpflege, Leistungen der Pflegeversicherung. Nur teilweise/nicht abgedeckt: Presbyakusis-Details, Technik beim Einbringen von Augenmedikamenten, Bindehautsack/Tränenabfluss, Miosis/Mydriasis, ausführlicher Katarakt/Glaukom-Vergleich, Wohnformen im Alter, Details zur Pflegebedürftigkeit.

**Architekturentscheidung:** Bestehende Begriffssammlungen unverändert gelassen; neue ergänzende Datei `data/lernzusammenfassung_zusatz.json` mit Fragen zu Presbyakusis, Augenmedikamenten, Tränenwegen, Pupillenreaktionen, Katarakt/Glaukom, Kurzzeitpflege, Pflegebedürftigkeit, Wohnformen im Alter.

**Schwierigkeiten → Lösung:** Bestehende JSON-Dateien nutzen unterschiedliche Strukturen (Fachbegriffe vs. vollständige Fragen); neue Fragen dürfen nichts doppeln → neue Datei im Format vollständiger Quizfragen, bestehende Begriffsdaten unverändert, Unterscheidung über eigene Felder für Thema/Kategorie.

**Nächste Schritte:** neue JSON-Datei in `app.js` laden, Themenfilter ergänzen, im Browser testen, fachlich prüfen, Duplikate prüfen.

---



## 4. Vergleich verschiedener KI-Systeme

**Ziel:** Unterschiedliche KI-Systeme (ChatGPT, Codex, Claude, ggf. weitere) für vergleichbare Entwicklungsaufgaben einsetzen.

**Kriterien:** Verständnis des Prompts, Qualität der Architektur, Qualität/Verständlichkeit des Codes, Anzahl nötiger Korrekturen, Umgang mit bestehenden Dateien, Fehleranfälligkeit, Benutzerfreundlichkeit des Ergebnisses.

**Beobachtungen:** noch offen (ChatGPT / Codex / Claude).

**Fazit:** noch offen.

---

*Vorlage für neue Einträge: siehe `templates/entry-template.md`.*
