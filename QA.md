# Initial verification

- Offline tests: task identity and expected candidates, report validation, success denominator with errors, quote-presence semantics.
- Live Jev decision batch: 20 calls, 18 raw matches. Task 06 lacks live loading-state evidence and is explicitly flagged as ambiguous. Task 18 selected the wrong Hungarian label. Published report includes both failures.
- Keyword baseline: 14/20. No claim that it is a competitive agent baseline.
- Live skill comparison: two variants across three labelled cases, six calls.
- Live claim check: contradictory illustrative claim correctly returned `contradicted`.
- Browser course: all 20 task flows completed through Codex's supported computer-use browser tools. Includes delayed control, dialog close, disabled control, selects, checkbox, text and no-action stop. This was scripted verification, not a measured autonomous-agent benchmark.
- Browser UI: measured sample loading, quote rejection and quote presence, skill config download, 375px viewport, both themes.
- No Android/iOS device lab was used. Narrow browser viewport is not proof of device compatibility.

## Reproduce browser verification

Build, start and open http://127.0.0.1:4188/ in the host's supported browser tools. Start a fresh course. Follow each goal and inspect the status after each action. For task 06 wait for the actual Open report control. For task 11 confirm Export archive is disabled. Finish with No suitable action on task 20. Export the browser run. Use task 03 to test an incorrect Publish selection before Save draft and confirm both attempts appear in its step trace.

For release QA, run the CLI smoke check then use the browser checklist against the actual production app. Do not submit real contact forms. Record failures as failures. Imported reports are untrusted plain text and never rendered as HTML.
