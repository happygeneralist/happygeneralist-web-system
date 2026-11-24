# Application interface MVP decisions

## Discovery

The starting repository had three Astro publishing layouts, three small content components, root CSS tokens, Zod-based content models, Markdown examples, a build workflow and copy-based adoption guidance. It had no application behaviour, project design-profile contract, browser tests, interface-specific skills or rendered acceptance gate. The remote main branch also contained an existing [two-expression proposal](../interface-expressions.md) and [visual-explanation pattern](../visual-explanation.md), which were integrated before final acceptance. The MVP implements a bounded example of that application/workspace expression; it does not supersede the proposal, promote a consuming application's implementation wholesale or alter upstream visual semantics. Existing GOV.UK Frontend is a dependency, but the custom publishing components do not initialise its JavaScript.

Read-only inspection of the adjacent infrastructure's boundary and operating documents confirmed that orchestration, portable agent routing and protected methods already have owners. This repository owns interface implementation foundations only. It consumes project needs and constraints without importing protected methods, private rubrics, prompts or domain evidence. No adjacent repository was modified. No GESE definition was located in the inspected repository or adjacent operating guidance: this MVP uses small reversible increments, observable behaviour and explicit acceptance rather than inventing a GESE expansion or claiming formal compliance.

## Decisions

1. **Keep Astro and native controls.** The work needs a table, forms, disclosure, CSS layout and small event handlers. No richer rendering framework is justified. Existing publishing CSS and layout APIs remain unchanged.
2. **Scope application expression.** `application.css` is opt-in beneath `.hws-app`. Existing colour names informed the application palette; additional tokens are local so expression cannot silently restyle publishing. The default shell uses the public-service profile.
3. **Use categorical, strict profiles.** `src/design/profiles.ts` is authoritative. Presets, schema, export validation and data attributes share one contract. Unknown fields, unsupported choices and schema versions fail validation. All ten axes have explicit CSS or behaviour consequences, verified against computed styles or task behaviour. Accessibility is outside the set of configurable axes.
4. **Keep the component set small.** `HwsApplicationShell` supplies masthead, navigation and a workspace slot. `HwsWorkspace` is the synthetic reference composition demonstrating data, contextual forms, comparison, disclosure, feedback, progress and recovery. It is a worked pattern rather than a universal dashboard or table abstraction.
5. **Separate expression from behaviour.** Profiles map to data attributes and CSS tokens. Event handlers use semantic controls and stable identifiers; visual selectors never determine save, validation or undo logic. The explicit/live filter axis changes timing without changing the underlying task.
6. **Use native progress meters with text.** Every count includes numerator and denominator. Comparison uses proportions and labels, not misleading equal raw scales. Activity counts are explicitly not outcomes. No canvas, chart library or image is needed.
7. **Use local memory for the demonstration.** No server, authentication, persistence or external data. Unsaved note changes require a discard decision when opening another item. A successful save supports one undo, including when another item is active. Reload resets the example.
8. **Preserve copy-based adoption.** Exported `hws.design-profile.json`, a validator and a documented AGENTS.md contract make the work usable without premature packaging or a new orchestration layer.

## Existing build repair

The initial manifest requested `@astrojs/mdx@^4.4.0`, which the registry could not resolve; Astro 6 requires MDX 5. The legacy `src/content/config.ts` also prevented Astro 6 from starting. Move to `src/content.config.ts` with explicit glob loaders; preserve collection names, content and schemas. The existing schema now imports Zod from `astro/zod`, removing a deprecated import. Lock dependencies for reproducible installation. Astro's [v6 migration guidance](https://docs.astro.build/en/guides/upgrade-to/v6/) documents the collection change.

## Limits and next questions

- This is an MVP reference, not a packaged application SDK. Workspace identifiers assume one interactive instance; the comparison is explicitly read-only.
- Profile parameters can be independently varied. Presets are starting points, not claims that one visual language fits every service. An expressive public-service variation still needs task and accessibility acceptance.
- Width simulation uses CSS containers and cannot simulate a mobile browser, touch hardware or zoom. Actual viewport tests accompany it.
- Comparison uses the same synthetic dataset and a read-only composition. It does not synchronise edited notes, filters or transient state with the working preview.
- State controls deliberately hold loading/error/empty states for inspection. There is no fabricated network delay and no real backend retry.
- The example has four items. Sorting, pagination, large dataset performance, multi-user conflict resolution and persistence should be introduced only when a consuming project needs them.
- Screen-reader and real-device user evaluation are still required for production. Axe and keyboard/browser checks cover a useful subset of accessibility.
- Dependency audit on 24 November reports four inherited findings (Astro critical, sharp high, MDX moderate and esbuild low). The fixed Astro 7 line requires Node >=22.23.4; this environment has 22.22.2. No framework/runtime major migration is bundled into the interface MVP. Development is loopback-only; the example is static, uses trusted synthetic data, and has no image endpoints, raw user HTML or server auth. This limits exposure but does not remove the findings. Resolve and re-audit before a production release; see the [Astro v7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/).
- Evaluate the MVP before adapting Financial Command. No consuming application has been changed.
