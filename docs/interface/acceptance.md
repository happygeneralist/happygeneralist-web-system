# MVP rendered interface acceptance

Reviewed 24 November 2026 on branch `codex/application-interface-mvp`, against the source and screenshots committed in this pull request. Initial local publishing revision: `53f6704`; remote main guidance at `a75afba` was subsequently integrated. This is an agent implementation review for MVP evaluation, not user-research validation or production accessibility certification.

## Result

The application interface MVP is ready for human evaluation. Four distinct profiles, ten independently effective parameters, a functioning playground, profile export and a working synthetic workspace are implemented. Existing publishing pages build and remain available. No consuming application or adjacent repository was changed.

Production release is not accepted by this record: inherited dependency audit findings and real-device/assistive-technology evaluation remain outstanding, as documented in [architecture.md](architecture.md).

## Executed checks

| Check | Result |
| --- | --- |
| `npm test` | 2 tests pass: valid/distinct profiles, strict rejection of unsupported fields, values and schema versions. |
| `npm run profile:validate` | Root project declaration validates. |
| `npm run profile:check` | Presets, JSON Schema and machine-readable decisions match the TypeScript source. |
| `npm run skills:verify` | Pinned third-party guideline text and licence hashes match provenance. |
| `npm run build` | Astro checks and builds 5 static routes, including existing standard/Lab/content-model pages and validated content collections. Also run by the browser gateway. |
| `npm run test:interface` | 8 tests pass against the built static site in Chromium; final integrated run passes including server build/startup. |
| Preset viewport checks | All four presets at 1440 × 1000, 768 × 1000 and 390 × 1000; no page-level horizontal overflow. |
| Accessibility scans | No axe violations for selected WCAG A/AA tags in 12 preset/viewport combinations and the expanded parameter controls. |
| Tasks and state transitions | Explicit and live filtering, contextual edit focus, field validation, save/undo, unsaved edit cancellation, two-item comparison, third-item rejection, linked visual selection, unavailable states, retry and validated JSON download pass. |
| Keyboard/reduced motion | Skip link, item activation, editor focus, keyboard save, native disclosure and reduced-motion override pass. |
| Responsive container control | Mobile/tablet previews stack a split workspace; available desktop width restores the split. |
| `git diff --check` | Pass. |

Runtime: Node 22.22.2, Astro 6.4.8, MDX 5.0.6, Playwright 1.65.1, axe Playwright 4.14.0. Exact dependency versions and integrity hashes are in package-lock.json. Browser installed through the pinned Playwright package. CI runs the same profile/provenance checks and built-site gateway and retains its evidence as an artefact.

## Rendered critique and refinements

Actual screenshots were inspected, including desktop profile treatments, mobile layouts, the complete playground, expanded parameter controls, validation and recovery states. The interface uses navigation, ruled sections, a native table and a contextual editor rather than a grid of generic dashboard cards. Presets produce meaningful differences in typography, layout, density, colour and control treatment while retaining task labels and data.

The review led to these refinements:

- Corrected the status control's label association after the representative task test exposed it.
- Added visible mobile table-scrolling guidance and moved comparison/edit instructions outside the scrolling region so they remain readable.
- Limited the editor form's measure on wide stacked layouts.
- Replaced the workspace's editorial slogan with a task-specific heading, aligning with the existing application-expression proposal.
- Hid unavailable contextual/progress content, replaced stale item counts and put Retry beside the error message.
- Kept the comparison reference explicitly read-only and removed its misleading navigation links.
- Retained visible focus, non-colour status labels and text equivalents for progress. Activity is explicitly distinguished from service outcomes.

Horizontal table scrolling is intentional on narrow screens: the region is labelled and keyboard-focusable, while the surrounding page reflows. This deserves user evaluation in the first consuming application, particularly if the dataset or task changes. The broader tablet and full-page screenshots provide context; they are not generated concept images.

## Existing ten-heuristic review

This mapping applies the review convention already proposed in `docs/interface-expressions.md`.

| Heuristic | Observed MVP behaviour and boundary |
| --- | --- |
| Visibility of system status | Item count, active item, save feedback, selection count and explicit unavailable-state messages. |
| Match with the real world | Work items, owners, statuses, next steps and completed/planned steps use plain task terminology. Synthetic data and activity/outcome distinctions are visible. |
| User control and freedom | Clear filters, cancel unsaved-edit discard, undo the last save and retry unavailable data. Reload resets the local demonstration. |
| Consistency and standards | Native forms, links, table, disclosure and meters; stable labels and the same data across presets. |
| Error prevention | Enforced two-item comparison, note length limit, unsaved-edit protection and disabled/hidden editing when data is unavailable. |
| Recognition rather than recall | Visible status choices, item names/owners, persistent context and labels beside controls. |
| Flexibility and efficiency | Keyboard operation, compact density, split editor and opt-in live filtering. No undiscoverable custom shortcuts. |
| Aesthetic and minimalist design | Task-focused workspace header, ruled sections and contextual form. Playground configuration is separate from the application task. |
| Error recognition and recovery | Specific field error linked to input, focus on the invalid field, clear retry and successful-save undo. |
| Help and documentation | Inline note hint, disclosure explaining local-save scope, visible mobile scrolling guidance and adoption/running documentation. |

These are implementation observations, not empirical proof of usability. Test the first consuming project's real task and users before promoting further patterns.

## Screenshot index

These PNGs were captured from the implemented application by Playwright. Viewport widths are in filenames; workspace crops are narrower than the viewport because of page margins.

| Profile | Desktop | Mobile |
| --- | --- | --- |
| Public service | [1440 px](evidence/public-service-1440.png) | [390 px](evidence/public-service-390.png) |
| Professional | [1440 px](evidence/professional-1440.png) | [390 px](evidence/professional-390.png) |
| Personal | [1440 px](evidence/personal-1440.png) | [390 px](evidence/personal-390.png) |
| Experimental | [1440 px](evidence/experimental-1440.png) | [390 px](evidence/experimental-390.png) |

Full playground: [desktop](evidence/playground-1440.png), [tablet](evidence/playground-768.png), [mobile](evidence/playground-390.png). Additional states: [parameters](evidence/parameters.png), [field validation](evidence/validation.png), [empty](evidence/state-empty.png), [loading](evidence/state-loading.png), [error with recovery](evidence/state-error.png).

See [local running instructions](gateway.md) and [the consuming-project contract](agent-integration.md). The next meaningful step is human playground evaluation before adapting Financial Command.
