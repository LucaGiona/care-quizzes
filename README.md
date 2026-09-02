# Care Quizzes

[English version](./README_EN.md)

Dieses Repository enthält verschiedene Lern- und Quizanwendungen rund um die Ausbildung zum Pflegefachmann.

Das Projekt verbindet zwei Lernbereiche:

1. pflegefachliche Inhalte lernen und wiederholen
2. die Entwicklung moderner Webanwendungen erlernen

Die einzelnen Anwendungen können unterschiedlich aufgebaut sein und verschiedene technische Ansätze verwenden. Dadurch lassen sich Architektur, Umsetzung, Codequalität und Endergebnisse miteinander vergleichen.

## Lernziele

Die Entwicklung beginnt bei grundlegenden Fragen zur Projektarchitektur und reicht über die Gestaltung der Benutzeroberfläche bis zur eigentlichen Programmlogik.

Behandelt werden unter anderem:

- Planung und Architektur einer Webanwendung
- semantische HTML-Strukturen
- Gestaltung mit CSS
- Programmierung mit JavaScript
- Verarbeitung von JSON-Daten
- Aufbau interaktiver Quizfunktionen
- Trennung von Daten, Darstellung und Programmlogik
- responsive und barrierearme Gestaltung
- Versionsverwaltung mit Git und GitHub
- Deployment einzelner Anwendungen

Je nach Projekt können auch bekannte Frameworks und Bibliotheken zum Einsatz kommen, zum Beispiel:

- Vue
- React
- weitere JavaScript-Frameworks

## Einsatz von künstlicher Intelligenz

Künstliche Intelligenz spielt bei der Entwicklung ebenfalls eine wichtige Rolle.

Untersucht und verglichen werden unter anderem:

- unterschiedliche Prompt-Techniken
- Planung von Funktionen mit KI
- Erstellung und Überarbeitung von Code
- Analyse bestehender Anwendungen
- Einsatz von KI-Agenten
- Einsatz von Tools
- Nutzung von MCP-Servern
- Vergleich verschiedener KI-Modelle
- Unterschiede im erzeugten Code
- Unterschiede bei Architektur, Bedienung und Endergebnis

Für einzelne Anwendungen können mehrere Varianten entstehen, die mit unterschiedlichen KI-Systemen oder Entwicklungsansätzen erstellt wurden.

Das Ziel ist nicht nur eine funktionierende Anwendung, sondern auch das Verständnis dafür, wie sich unterschiedliche Entscheidungen auf Struktur, Wartbarkeit und Benutzerfreundlichkeit auswirken.

## Aufbau des Repositorys

Jeder Unterordner enthält eine eigenständige Lern- oder Quizanwendung.

```text
care-quizzes/
├── .git/
├── .gitignore
├── README.md
├── README_EN.md
│
├── index.html          # Landing Page mit Übersicht aller Quizze
├── css/
├── js/                  # projects.js listet alle Quizprojekte
│
└── quizzes/
    ├── frau-f-muss-umziehen/
    │   ├── README.md
    │   ├── index.html
    │   ├── css/
    │   ├── js/
    │   └── data/
    │
    ├── hno/
    │
    └── weitere-projekte/
```

Weitere Informationen zu den einzelnen Anwendungen befinden sich im jeweiligen Projektordner.

Dort können unter anderem folgende Dateien liegen:

```text
README.md
NOTES.md
ARCHITECTURE.md
PROMPTS.md
CHANGELOG.md
```

## Projekte

### Frau F. muss umziehen

Der Ordner `quizzes/frau-f-muss-umziehen` enthält eine Lernanwendung zu verschiedenen Themen aus der Pflegeausbildung.

Behandelte Inhalte sind unter anderem:

- Auge
  - Anatomie
  - Erkrankungen
  - Augenmedikamente
  - Miosis und Mydriasis
  - Tränenwege
- Ohr
  - Anatomie
  - Erkrankungen
  - Presbyakusis
- Pflegeversicherung
- Pflegegrade
- Leistungen der Pflegeversicherung
- Kurzzeitpflege
- Entlassungsmanagement
- Überleitungsmanagement
- Wohnformen im Alter
- Sturzprophylaxe
- Umgang mit Sehbeeinträchtigungen
- Umgang mit Hörbeeinträchtigungen

Innerhalb dieses Projekts können unterschiedliche Versionen derselben Anwendung entstehen, zum Beispiel eine ChatGPT- und eine Claude-Variante.

Weitere technische und inhaltliche Informationen befinden sich in der dortigen `README.md`.

## Bedienkonvention für ChatGPT-Quizze

Für neue und bestehende ChatGPT-Quizvarianten gilt bei der Tastaturbedienung:

- Bei einer Texteingabe gibt `Enter` die Antwort ab.
- Ist das Textfeld leer, wird die Frage als falsch gewertet und die richtige Antwort mit Erklärung angezeigt.
- Nach angezeigtem Feedback wechselt ein weiteres `Enter` zur nächsten Frage.
- Bei Multiple Choice ist weiterhin zuerst eine Antwort auszuwählen.
- Der Button „Antwort prüfen“ soll bei Texteingaben weiterhin eine ausgefüllte Antwort verlangen; das Überspringen ohne Eingabe ist bewusst nur über `Enter` möglich.

Bei neuen ChatGPT-Apps ist diese Logik im Tastatur-Handler und in `checkAnswer(allowEmptyTextAnswer)` zu übernehmen.

## Deployment

Die einzelnen Quizprojekte können unabhängig voneinander veröffentlicht werden.

Jeder Quizordner kann eine eigene Einstiegdatei besitzen:

```text
index.html
```

Dadurch können einzelne Unterordner separat auf Plattformen wie Netlify bereitgestellt werden.

Beispiele:

```text
quizzes/frau-f-muss-umziehen/
quizzes/hno/
quizzes/wundmanagement-quiz/
```

## Entwicklungsstatus

Das Repository befindet sich fortlaufend in Entwicklung.

Ordnerstrukturen, Technologien und Funktionen können sich verändern, wenn neue Anforderungen hinzukommen oder andere Lösungswege getestet werden.

Das Projekt soll bewusst unterschiedliche Lernanforderungen miteinander verbinden:

- Pflegewissen
- Webentwicklung
- Softwarearchitektur
- Arbeiten mit Git
- Prompt Engineering
- KI-gestützte Entwicklung
- Vergleich unterschiedlicher technischer Lösungen
