# Khonproof

[Open the lab ↗](https://khonproof.vercel.app/)

Fast is nice. Did it work?

A small test lab I built while trying Jev alongside coding agents. Five tools share a simple report format. No accounts, analytics or API keys in the website.

## The five tools

- **Agent Bench:** import, compare and export measured JSON reports. Includes an actual 20-case Jev action-selection run and a keyword baseline. These are small authored cases, not a general model ranking or a browser-speed benchmark.
- **Browser course:** 20 interactive sandbox tasks. Delayed controls, dialogs, similar labels, disabled actions, language changes and one hostile page instruction. Exports completion, elapsed time and attempts. The operator is deliberately unlabelled.
- **Skill Lab:** edit two instruction variants and labelled cases, download a config, run a bounded Jev A/B comparison locally, then import results. This is instruction testing, not execution of arbitrary coding skills.
- **Release Check:** a fixed-URL HTTP/HTML smoke runner plus a browser QA checklist. Status 200 does not prove a UI works.
- **Claim Check:** check that a quote exists locally, then optionally use Jev locally to judge support, contradiction or missing evidence. No auto-posting and no claim of guaranteed truth.

## Run

Node 22 or newer, no runtime dependencies.

```sh
npm test
npm run build
npm start
```

Open http://127.0.0.1:4188/.

```sh
npm run bench                       # no model, keyword baseline
node --env-file=.env scripts/bench.mjs --live
node --env-file=.env scripts/skills.mjs examples/skills.json
node --env-file=.env scripts/claims.mjs examples/claim.json
npm run release
```

Copy `.env.example` to `.env` and add your own TypeSafe key locally. Never upload it. Live tests use paid API tokens. The benchmark defaults to 20 calls, with `REPETITIONS=3` capped at 60. Skill comparisons cap at 20 calls. No retries or background model loop. Reports stay in ignored `reports/` until you intentionally share them.

## Read the results carefully

The first raw decision run was Jev 18/20 versus a keyword baseline at 14/20. After excluding the same ambiguous waiting case from both methods, the scored results are 18/19 and 13/19. One missed task uses Hungarian labels. The other asks to wait for results without a live loading-state observation, so its result is ambiguous. Treat that case as a fixture limitation, not proof of a model failure. No prompt tuning or hidden reruns were used to improve the published score.

Cases 01–12 are tagged development, 13–20 held-out. This initial public set is now visible, so it should not remain your holdout after tuning. Use fresh tasks, repeated runs and independent success checks for stronger conclusions. Median and p95 exclude API-error timings, but errors remain in the success denominator. Token counts are API usage, not measured Codex subscription savings. The keyword baseline measures near-zero runtime rounded to milliseconds.

The browser course is a sandbox. Its retry button simulates recovery, its “light theme” task tests selecting an action, and text inputs check exact values. It does not modify real accounts or send messages. Browser timing includes operator pauses. Navigating away mid-task does not magically turn it into a success.

## Privacy and deployment

The site processes imports and drafts in your browser. Only the theme preference is stored locally. Downloaded reports may contain your own text, so review before sharing. Optional CLI Jev calls send the supplied text to TypeSafe. Use public or specifically authorized material.

Vercel builds the static `dist/` directory. Local `.env` and reports are excluded. GitHub Actions runs offline tests and the static build. MIT licensed.

A scheduled GitHub Actions smoke check runs daily at 06:30 UTC without model calls. Reports are kept as workflow artifacts for 14 days. The report bundled with the website is a dated snapshot, not a live status service.
