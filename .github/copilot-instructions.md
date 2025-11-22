**Purpose**
- **Summary:** This file orients AI coding agents to the Playwright test repository layout, conventions, and developer workflows so suggestions and code changes align with the project's patterns.

**Repository Surface**
- **Test harness:** `@playwright/test` (see `package.json` devDependencies).
- **Main config:** `playwright.config.js` — defines `testDir: './tests'`, `reporter: 'html'`, `trace: 'on-first-retry'`, `screenshot: 'on'`, and browser `projects` for `chromium`, `firefox`, `webkit`.
- **Tests:** primary tests live under `tests/` (e.g. `tests/example.spec.js`). Additional examples are in `tests-examples/` (e.g. `demo-todo-app.spec.js`).
- **Test artifacts:** `playwright-report/` contains the HTML report (`index.html`).
- **Data file:** `login.json` is imported by tests via ESM `import` with `assert { type: "json" }` — treat it as project-local test data.

**Important Project Conventions**
- **ESM modules:** `package.json` sets `"type": "module"`. All code and imports should be ESM style (use `import`/`export`).
- **Import assertions:** Tests import JSON using `import ... assert { type: "json" }` (see `tests/example.spec.js`). Maintain that style when editing tests or adding test data.
- **Playwright config expectations:** `playwright.config.js` sets shared `use` options (e.g. `headless`, `browserName`) and defines `projects`. When changing browser behavior prefer updating `projects` or per-test `use` overrides rather than only changing top-level `use`.
- **Artifacts & debugging:** Recorded traces and screenshots are enabled (`trace: 'on-first-retry'`, `screenshot: 'on'`). Keep these settings in mind when adding flakiness handling or retries.

**Developer Workflows / Commands**
- **Install deps:** run `npm install` in repository root.
- **Ensure Playwright binaries:** run `npx playwright install` (or `npx playwright install-deps` on Linux as needed).
- **Run tests:** use `npx playwright test` from repository root — tests default to `tests/` directory via `playwright.config.js`.
- **Run a single test file:** `npx playwright test tests/example.spec.js`.
- **Open test report:** open `playwright-report/index.html` after a run, or use `npx playwright show-report`.

**Patterns to Follow in Code Changes**
- **Use Playwright locators & assertions:** tests use `page.getByTestId`, `page.getByRole`, `page.getByPlaceholder` and `expect(...).toHaveText()` — prefer these over brittle selectors.
- **Test structure:** follow `test.describe`, `test.beforeEach`, `test.afterEach`, and `test.step` patterns seen in `tests-examples/demo-todo-app.spec.js`.
- **Helpers:** if you add helper functions, place them near the tests that use them or in a new `tests/helpers/` file and import via ESM. Keep helpers minimal and test-scoped.
- **Sensitive data:** `login.json` contains test URLs/credentials. Do not hardcode secrets; follow the file's existing structure and respect privacy.

**What to Look For When Editing**
- **package.json scripts:** currently empty — prefer adding `scripts` entries (e.g., `test`, `test:report`) only if asked; otherwise use `npx` commands to run tests.
- **playwright config behavior:** note `headless: false` is set (so tests open a UI). If you change this, verify CI behavior (CI is detected via `process.env.CI`).
- **Browser selection:** the config defines both a top-level `use.browserName` and per-project `projects`. Confirm intended browser behavior when modifying either.

**Example change scenarios (how to implement)**
- Add a new test file: create `tests/my.feature.spec.js` using ESM imports and `@playwright/test` patterns, run via `npx playwright test tests/my.feature.spec.js`.
- Add helper module: create `tests/helpers/myHelper.js`, export functions via `export function ...`, import with `import { ... } from '../tests/helpers/myHelper.js';`.
- Change report settings: update `playwright.config.js` `reporter` field and verify after `npx playwright test` that `playwright-report/` reflects expected output.

**Constraints & Notes for AI Agents**
- Do not assume `npm` scripts exist — use explicit `npx` Playwright commands unless `package.json` is updated first.
- Preserve ESM and import-assertion patterns when modifying tests or moving JSON data.
- Keep changes small and focused: follow existing file layout and naming conventions (e.g., `*.spec.js` under `tests/`).

**Where to Look First**
- `playwright.config.js` — confirms test dir, reporters, trace/screenshot behavior.
- `package.json` — verify dependencies and `type: "module"`.
- `tests/` and `tests-examples/` — canonical test style and helper usage.
- `login.json` — example of test data imported with assertions.

If anything here is incomplete or you'd like me to expand examples (e.g., add `npm` scripts or helper scaffolding), tell me which area to iterate on.
