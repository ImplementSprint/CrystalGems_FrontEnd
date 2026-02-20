# {tribe}-multi-frontend

Multi-system frontend monorepo using **React + Vite + TypeScript**.

## Directory Structure

```
├── .github/workflows/
│   ├── master-frontend-multi.yml   ← CI/CD pipeline (test → uat → prod)
│   └── notify.yml                  ← Shared notification workflow
├── systems/
│   ├── system-a/                   ← System A frontend app
│   │   ├── src/
│   │   ├── tests/
│   │   │   ├── ui.test.ts          ← Unit tests (Vitest)
│   │   │   ├── e2e/run-selenium.js ← E2E tests (Selenium)
│   │   │   └── load/frontend-load.js ← Load tests (k6)
│   │   ├── package.json            ← version: 1.0.0 (independent)
│   │   └── vitest.config.ts
│   └── system-b/                   ← System B frontend app
│       ├── src/
│       ├── tests/
│       │   ├── ui.test.ts
│       │   ├── e2e/run-selenium.js
│       │   └── load/frontend-load.js
│       ├── package.json            ← version: 1.0.0 (independent)
│       └── vitest.config.ts
└── README.md
```

## Getting Started

```bash
# Install dependencies for each system
cd systems/system-a && npm install
cd ../system-b && npm install

# Run dev server (per system)
cd systems/system-a && npm run dev
cd systems/system-b && npm run dev
```

## Available Scripts (per system)

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server             |
| `npm run build`   | TypeScript check + production build |
| `npm run test`    | Run unit tests with Vitest        |
| `npm run test:coverage` | Run tests with coverage     |
| `npm run test:e2e` | Run Selenium E2E tests           |
| `npm run lint`    | Run ESLint                        |

## CI/CD Pipeline

Each system has an independent pipeline triggered by branch:

- **test** branch → Unit tests → SonarCloud → Quality Gate → Deploy to Vercel (test)
- **uat** branch → Deploy → E2E + k6 load tests → QA Approval → Release
- **main** branch → Governance approval → Deploy to Production → Release

## Adding a New System

1. Copy an existing system folder (e.g. `systems/system-a`) to `systems/system-c`
2. Update `package.json` name field
3. Duplicate the job group in `master-frontend-multi.yml`, replacing all `sysA`/`system-a`/`SYSA` with the new system identifier
4. Configure the required GitHub secrets/variables for the new system
