# Agent and consuming-project contract

The application system extends the existing copy-based usage convention. Project needs and constraints remain authoritative; this contract supplies interface decisions and acceptance evidence. It neither owns orchestration nor imports protected design methods.

## Adopt in an Astro repository

1. Evaluate `/playground/`, select a preset and adjust only decisions that help the intended users complete their tasks. Export the profile.
2. Copy `src/design/profiles.ts`, `src/styles/application.css`, `src/components/application/HwsApplicationShell.astro` and the existing base layout/system CSS if needed. Keep their relative directory structure. Copy the exported file to `hws.design-profile.json` at the project root. The shell loads and validates this file by default; a `profile` prop permits a validated local override. The schema uses Zod 4, already a dependency here.
3. Copy `scripts/validate-profile.ts` and run `node --import tsx scripts/validate-profile.ts hws.design-profile.json` with `tsx` as a development dependency. Alternatively validate the JSON against `design-profiles/schema.json` with your existing validator. Strict unknown-field rejection is intentional. Keep the schema, presets and machine-readable `design-profiles/decisions.json` at the same system revision. The decisions file explains each allowed value's visible consequence. After changing the source contract here, run `npm run profile:generate`; CI checks for drift with `npm run profile:check`.
4. Use the shell's slot for your task-specific content. Inspect `HwsWorkspace.astro`, `workspace.ts` and `playground.ts` as a worked interaction example. The workspace/controller pair is a synthetic demonstration, not an independently initialising generic widget: copy both and adapt identifiers and data together if reusing the entire example. Implement actual domain behaviour in the consuming project.
5. Copy the pinned guideline reference, licence, provenance and verification script if using that review capability. Do not install every evaluated skill. Keep the source commit of the web system in your project's dependency/adoption notes.
6. Adapt the browser tests to your real user tasks and data boundaries. Run them against actual rendered pages and capture screenshots. Record visual review separately from test success.

Example composition:

```astro
---
import HwsApplicationShell from '../components/application/HwsApplicationShell.astro'
---
<HwsApplicationShell title="Project workspace">
  <h1>Your task-specific workspace</h1>
  <!-- Native forms, data and task behaviour owned by this project. -->
</HwsApplicationShell>
```

The shell accepts `name`, `context` and `navItems` props; navigation items are links with `href` and `label`. Supply real destinations in your composition. It does not promise authentication, routing, persistent storage or backend operations.

## Add to the consuming project's AGENTS.md

```md
## Application interfaces

Read hws.design-profile.json and validate against the adopted Happygeneralist
profile schema before interface changes. Read the adopted interface conventions.
Project requirements and accessibility take precedence over third-party guidance.

1. State the user, representative tasks, terminology and conceptual model.
2. Load the project profile and constraints; explain any necessary override.
3. Establish navigation, information hierarchy and interaction/state transitions.
4. Reuse existing foundations; use semantic HTML and lightweight behaviour.
5. Inspect the actual rendered interface at desktop and mobile sizes. Use the
   pinned interface guidelines as a subordinate critique reference.
6. Refine, test tasks and keyboard access, inspect states and responsive layouts,
   and record screenshots plus an interface acceptance decision.

Never relax accessibility, usability, semantics or truthful data representation
through a profile. Do not treat compilation, generated imagery or automated
accessibility checks alone as design acceptance. Keep domain/private evidence
in its owning repository. Do not add orchestration or global skill installations
as a side effect of interface implementation.
```

## Overrides and invariant constraints

Parameters are independent. `preset` records the starting point; the full `parameters` object is the effective configuration, even after customisation. Missing parameters are rejected instead of silently assuming a style. No profile may override focus visibility, semantic control names, text alternatives, error association, keyboard operation, reduced-motion preference, contrast, reflow or meaningful recovery. Experimental interaction currently means live filtering only; it never authorises novel hidden gestures or inaccessible controls.

No private repository is required to consume this contract. Existing orchestration may call it as an implementation/verification step; no new agent coordinator is introduced.
