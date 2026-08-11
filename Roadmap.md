# Toolshop SDET Master Framework — Roadmap & Daily Tracker

## Project Goal
Build a full-scale, industry-standard SDET automation framework against **Toolshop**
(Angular + Laravel API + MySQL e-commerce app — practicesoftwaretesting.com), from first principles to a
CI/CD-integrated, AI-assisted, multi-layer test suite — documented and recorded
as a teaching series for YouTube.

This is a **learning project**. The author is new to Playwright. Every phase is
built incrementally, with reasoning explained before code, matching how a real
framework evolves on the job — not dumped in as a finished product.

## Confirmed Tech Stack
- **Core:** Playwright, TypeScript (migrated from JS), Node.js — Playwright's built-in test runner only (no Mocha/Jest — would be redundant)
- **API:** Playwright `APIRequestContext` + Zod for schema validation (Toolshop's Swagger/OpenAPI as source of truth)
- **DB:** MySQL/MariaDB + `mysql2` (raw SQL client — simpler to learn/teach than an ORM; Prisma can be a later "level-up" side note)
- **BDD:** `playwright-bdd` (NOT raw cucumber-js — this converts Gherkin into real Playwright tests, keeping native parallelization/fixtures/reporting) — 2-3 showcase features
- **Data-driven:** JSON + Excel (`xlsx`) + Faker
- **Reporting:** Allure (`allure-playwright`)
- **Performance:** k6 — deliberately a SEPARATE CI job, not integrated into the Playwright runner (this is correct real-world practice, not a gap)
- **CI/CD:** GitHub Actions + Docker Compose (Toolshop Angular + Laravel API + MySQL spun up fresh per run)
- **AI layer:** Self-healing locator fallback (custom fixture/utility)
- **Test management:** No dedicated tool (TestRail/Xray) needed for a solo project — a traceability matrix doc (Phase 16) covers the same signal

## Target Application
- **App:** Practice Software Testing — Toolshop — https://github.com/testsmith-io/practice-software-testing
- **Clean version (functional flows):** https://practicesoftwaretesting.com/
- **"With bugs" version (Phase 16 bug-hunting content):** https://with-bugs.practicesoftwaretesting.com/
- **API docs:** https://api.practicesoftwaretesting.com/api/documentation
- **Self-hosted (DB/CI phases):** Docker Compose — Angular frontend + Laravel API + MySQL
- **Seeded accounts:** admin@practicesoftwaretesting.com, customer@practicesoftwaretesting.com, customer2@practicesoftwaretesting.com (password: welcome01) — used for multi-role session/security testing (Phase 5, 6)

## How Daily Sessions Work
1. Say "what's today" or give a Day number.
2. I check this tracker for the next pending day.
3. You get: objective, concept explainer, video speaker notes, step-by-step
   instructions, code (once we're in coding phases), troubleshooting notes,
   and a commit message suggestion.
4. We mark the day complete and move on.
5. **Always tell me your last completed Day number at the start of a new chat**
   so we stay in sync across sessions.

Session length target: 1–2 hours/day.

## Definition of Done (per Day)
A day is only marked `[x]` when all of these are true:
- [ ] Code written and committed (not just discussed)
- [ ] Test(s) for the day run green locally
- [ ] Commit message follows the convention below
- [ ] `PROGRESS.md` entry added for the day (planned vs actual, learnings, blockers)
- [ ] Any deferred work or discovered issue logged in `BACKLOG.md` / `ISSUES.md`, not silently dropped

## Commit Convention
Conventional Commits, scoped to the day:
```
<type>(<scope>): <summary> — Day <N>
```
Types: `feat` (new test/page object/fixture), `fix`, `refactor`, `docs`, `chore`, `test`, `ci`.
Examples:
- `feat(e2e): add browse/search flow — Day 5`
- `refactor(pom): extract BasePage — Day 9`
- `docs(readme): document POM refactor rationale — Day 14`

Keep messages honest — if a day only produced a partial result, say so (`wip(api): zod schema draft, validation pending — Day 24`). A real engineering log has uneven days; that's fine.

## Sprint Map (60-day plan, start: 2026-08-11)
10 sprints, 6 days each (1 rest day/week), each ending in a short self-review
appended to `PROGRESS.md`. 60 sessions at 6/week ≈ 10 weeks — slightly over a
strict "2 months," which is intentional: real sprints slip, and a Sprint 11
buffer week is built in rather than pretending otherwise.

| Sprint | Dates | Days | Sprint Goal |
|---|---|---|---|
| 1 | Aug 11 – Aug 17 | 1–6 | Environment + Git fluency, scaffold, strategy doc |
| 2 | Aug 18 – Aug 24 | 7–10 | Raw E2E tests, feel the pain of no structure |
| 3 | Aug 25 – Aug 31 | 11–17 | Page Object Model across the app |
| 4 | Sep 1 – Sep 7 | 18–21 | Base test, custom fixtures |
| 5 | Sep 8 – Sep 14 | 22–24 → 25–29 | Assertions/tagging, session handling, API testing begins |
| 6 | Sep 15 – Sep 21 | 30–36 | API testing complete, data-driven testing, DB validation begins |
| 7 | Sep 22 – Sep 28 | 37–43 | DB validation complete, parallel execution, BDD |
| 8 | Sep 29 – Oct 5 | 44–48 | TS migration, CI/CD begins |
| 9 | Oct 6 – Oct 12 | 49–54 | CI/CD complete, reporting, performance, AI layer |
| 10 | Oct 13 – Oct 19 | 55–60 | Polish, portfolio, traceability, course wrap |
| 11 (buffer) | Oct 20 – Oct 26 | — | Catch-up / re-record any weak sessions |

---

## Tracker

Status legend: `[ ]` Not started · `[~]` In progress · `[x]` Done

Every day's session (and video) opens with: **Goal → Objectives → Definition of Done**
before any explanation or code — see the per-day brief format in `PROGRESS.md`.

### Phase 0 — Foundations, Tooling & Planning
| Day | Topic | Status |
|---|---|---|
| 1 | Install: Node.js, VS Code, Git, GitHub repo created + cloned | [ ] |
| 2 | Git & GitHub fundamentals: branches, staging, commit conventions, remotes | [ ] |
| 3 | Explore Toolshop manually (live demo) — map every user flow | [ ] |
| 4 | Write Test Strategy & risk-based scope doc (what to automate vs not) | [ ] |
| 5 | Project scaffold: install Playwright, folder structure, README v1 | [ ] |
| 6 | `playwright.config.ts` deep dive: projects, reporters, baseURL, retries | [ ] |

### Phase 1 — First Raw End-to-End Tests (deliberately unstructured)
| Day | Topic | Status |
|---|---|---|
| 7 | First E2E test: browse/search products (plain script, hardcoded locators) | [ ] |
| 8 | Second E2E: add to cart | [ ] |
| 9 | Third E2E: checkout/order flow | [ ] |
| 10 | Retrospective: identify repetition/pain points → why we need structure | [ ] |

### Phase 2 — Page Object Model
| Day | Topic | Status |
|---|---|---|
| 11 | Intro to POM concept, Base Page | [ ] |
| 12 | Login Page object | [ ] |
| 13 | Catalog/Product Page object | [ ] |
| 14 | Cart Page object | [ ] |
| 15 | Checkout/Order Page object | [ ] |
| 16 | Refactor all Phase 1 tests to use POM | [ ] |
| 17 | Review + README update explaining the refactor | [ ] |

### Phase 3 — Base Test & Custom Fixtures
| Day | Topic | Status |
|---|---|---|
| 18 | Identify setup duplication → intro to Base Test | [ ] |
| 19 | Build custom Playwright fixtures | [ ] |
| 20 | Refactor existing tests onto fixtures | [ ] |

### Phase 4 — Assertions & Test Structure
| Day | Topic | Status |
|---|---|---|
| 21 | Custom assertion helpers | [ ] |
| 22 | Test tagging (@smoke, @regression, @critical) + describe organization | [ ] |

### Phase 5 — Session Handling
| Day | Topic | Status |
|---|---|---|
| 23 | storageState: reuse login session across tests | [ ] |
| 24 | Multi-user problem: per-role storage state files | [ ] |
| 25 | API-based login (bypass UI for setup speed) | [ ] |

### Phase 6 — API Testing
| Day | Topic | Status |
|---|---|---|
| 26 | Explore Toolshop Swagger, plan API test scope | [ ] |
| 27 | First API tests: GET endpoints + Zod schema validation | [ ] |
| 28 | POST/PUT/DELETE + auth token flows | [ ] |
| 29 | Negative/security tests: unauthorized access, token tampering, IDOR | [ ] |
| 30 | Debugging deep dive: trace viewer, UI mode, VS Code extension for API+UI | [ ] |

### Phase 7 — Data-Driven Testing
| Day | Topic | Status |
|---|---|---|
| 31 | JSON-driven test data | [ ] |
| 32 | Excel-driven test data (xlsx) | [ ] |
| 33 | Faker for dynamic/unique data generation | [ ] |

### Phase 8 — Database Validation
| Day | Topic | Status |
|---|---|---|
| 34 | Self-host Toolshop locally: Angular + Laravel API + MySQL via Docker Compose | [ ] |
| 35 | Connect test framework to MySQL (`mysql2`) | [ ] |
| 36 | First DB assertions: row-level validation after API/UI actions | [ ] |
| 37 | Referential integrity checks (orders ↔ products ↔ users) | [ ] |

### Phase 9 — Parallel Execution & Scaling
| Day | Topic | Status |
|---|---|---|
| 38 | Playwright workers/sharding basics | [ ] |
| 39 | Fixing shared-data collisions across parallel runs | [ ] |

### Phase 10 — BDD Layer
| Day | Topic | Status |
|---|---|---|
| 40 | `playwright-bdd` setup (Gherkin → native Playwright tests) | [ ] |
| 41 | Gherkin features: login + checkout flows | [ ] |

### Phase 11 — JS → TS Migration
| Day | Topic | Status |
|---|---|---|
| 42 | TS config setup | [ ] |
| 43 | Migrate Page Objects | [ ] |
| 44 | Migrate tests + fixtures | [ ] |

### Phase 12 — CI/CD
| Day | Topic | Status |
|---|---|---|
| 45 | GitHub Actions: basic pipeline (lint + smoke) | [ ] |
| 46 | Docker Compose in CI (Angular + Laravel API + MySQL fresh per run) | [ ] |
| 47 | Matrix strategy: browsers × shards | [ ] |
| 48 | Secrets & environment management in CI | [ ] |
| 49 | Scheduled nightly regression run | [ ] |

### Phase 13 — Reporting
| Day | Topic | Status |
|---|---|---|
| 50 | Allure setup + integration | [ ] |
| 51 | Publish report via CI artifact/GitHub Pages | [ ] |

### Phase 14 — Performance
| Day | Topic | Status |
|---|---|---|
| 52 | k6 basics + first load test script against Toolshop API | [ ] |

### Phase 15 — AI Layer
| Day | Topic | Status |
|---|---|---|
| 53 | Self-healing locator fallback: design & first implementation | [ ] |
| 54 | Testing/refining the self-healing logic | [ ] |

### Phase 16 — Polish & Portfolio Finalization
| Day | Topic | Status |
|---|---|---|
| 55 | Architecture diagram | [ ] |
| 56 | "Bugs found" documentation against with-bugs.practicesoftwaretesting.com, real repro reports | [ ] |
| 57 | Traceability matrix (test cases ↔ features) | [ ] |
| 58 | Code review & cleanup pass (lint, dead code, consistent naming) | [ ] |
| 59 | Full README rewrite as a tutorial/index for the course series | [ ] |
| 60 | Course wrap: retrospective across all 60 days, what's next | [ ] |

---

## Notes Log
*(Running space for decisions, gotchas, and things discovered along the way —
useful both for your memory and as authentic teaching content.)*

-

