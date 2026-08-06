# Care Quizzes

[Deutsche Version](./README.md)

This repository contains different learning and quiz applications related to nursing education and training.

The project combines two main learning areas:

1. learning and reviewing nursing-related content
2. learning how to develop modern web applications

The individual applications may use different architectures and technical approaches. This makes it possible to compare structure, implementation, code quality, usability and final results.

## Learning objectives

Development starts with basic questions about project architecture and continues through user-interface design and application logic.

Topics include:

- planning and architecture of web applications
- semantic HTML structures
- styling with CSS
- programming with JavaScript
- processing JSON data
- building interactive quiz functions
- separating data, presentation and application logic
- responsive and accessible design
- version control with Git and GitHub
- deploying individual applications

Depending on the project, established frameworks and libraries may also be used, for example:

- Vue
- React
- other JavaScript frameworks

## Use of artificial intelligence

Artificial intelligence also plays an important role in the development process.

The project explores and compares:

- different prompting techniques
- planning features with AI
- generating and revising code
- analysing existing applications
- working with AI agents
- using development tools
- using MCP servers
- comparing different AI models
- differences in generated code
- differences in architecture, usability and final results

Several versions of the same application may be created using different AI systems or development approaches.

The goal is not only to build a working application, but also to understand how different technical decisions affect structure, maintainability and usability.

## Repository structure

Each subfolder contains an independent learning or quiz application.

```text
care-quizzes/
├── .git/
├── .gitignore
├── README.md
├── README_EN.md
│
├── frau-f-muss-umziehen/
│   ├── README.md
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── data/
│
├── herz-quiz/
│   └── planned
│
└── additional-projects/
```

Further information about each application can be found in the corresponding project folder.

Possible documentation files include:

```text
README.md
NOTES.md
ARCHITECTURE.md
PROMPTS.md
CHANGELOG.md
```

## Projects

### Frau F. muss umziehen

The `frau-f-muss-umziehen` folder contains a learning application covering different topics from nursing education.

Topics include:

- the eye
  - anatomy
  - diseases
  - eye medication
  - miosis and mydriasis
  - tear drainage system
- the ear
  - anatomy
  - diseases
  - presbycusis
- long-term care insurance
- care grades
- benefits provided by long-term care insurance
- short-term care
- discharge management
- transition management
- housing options for older adults
- fall prevention
- supporting people with visual impairments
- supporting people with hearing impairments

Different versions of the same application may be developed within this project, for example a ChatGPT version and a Claude version.

Further technical and content-related information can be found in the local `README.md`.

## Deployment

The individual quiz projects can be deployed independently.

Each quiz folder may contain its own entry file:

```text
index.html
```

This allows separate subfolders to be deployed individually on platforms such as Netlify.

Examples:

```text
frau-f-muss-umziehen/
herz-quiz/
wundmanagement-quiz/
```

## Development status

This repository is under continuous development.

Folder structures, technologies and features may change as new requirements are added or alternative solutions are tested.

The project deliberately combines different learning requirements:

- nursing knowledge
- web development
- software architecture
- working with Git
- prompt engineering
- AI-assisted development
- comparing different technical solutions
