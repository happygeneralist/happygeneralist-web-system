# Interface acceptance gateway

An interface change is accepted only when representative tasks work, automated checks pass and a reviewer has inspected the actual rendered result. A generated concept image or passing build is not implementation evidence.

## Local commands

Use Node >=22.12 (tested here on 22.22.2):

```sh
npm ci
npx playwright install chromium
npm test
npm run skills:verify
npm run profile:validate
npm run profile:check
npm run build
npm run test:interface
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:4321/playground/`. Stop the local server with Ctrl+C. The browser test runner builds and starts its own loopback preview server. Stop any server on port 4321 before running it. Screenshots are written to `docs/interface/evidence/`; HTML/trace diagnostics go to ignored `playwright-report/` and `test-results/`. Only refresh reviewed screenshots alongside the code they represent.

Apply the existing [interface-expression proposal](../interface-expressions.md), including all ten usability heuristics. The MVP's explicit mapping is in [acceptance.md](acceptance.md).

## Acceptance tasks

| Area | Evidence required |
| --- | --- |
| User tasks | Filter planned work, open an item, edit its next step, save, undo, select two items and compare progress. Export a valid profile. |
| Interaction model | Explicit filtering waits for Apply; live filtering responds immediately. Unsaved edits can be kept by cancelling a discard. Reject a third selection with useful feedback. |
| Hierarchy and typography | Distinguish page tools, workspace navigation, work list, contextual editor and progress. Labels and metadata remain legible; avoid a wall of interchangeable cards. |
| Density | Compare comfortable/compact rows with the same content. Compact spacing preserves actionable targets and information. |
| Responsive | Inspect 1440, 768 and 390 px viewports; check no page-level horizontal overflow. A labelled, keyboard-focusable data-table region may scroll horizontally with a visible hint. Test container-width controls separately from real viewports. |
| Keyboard | Reach skip link; navigate controls; activate an item; focus moves to its editor; save with keyboard; undo restores focus; disclosure works without pointer. No traps. |
| Accessibility | Run axe for WCAG 2 A/AA, 2.1 AA and 2.2 AA; inspect visible focus, labels, announcements, non-colour status cues and reduced motion. Automated results are not a conformance claim. |
| States and recovery | Empty/loading/error suppress unavailable rows, editing and progress; meaningful guidance remains. Error offers Retry. Invalid note is associated with the field. Saved note supports undo. |
| Profile fidelity | Every parameter changes a computed style or observable interaction independently. All four presets receive desktop/mobile screenshots and viewport/accessibility checks. |
| Existing publishing | Build collections and all existing routes; verify standard/Lab/content-model pages remain available without application styling. |

## Review record

Record date, source revision, commands and outcome, viewport sizes, screenshots inspected, findings and fixes, unresolved issues and acceptance scope. Use [acceptance.md](acceptance.md) for this MVP. Test output is supporting evidence, not a substitute for this judgement. A consuming production release must additionally resolve applicable dependency findings and run real-device and assistive-technology review appropriate to its users.
