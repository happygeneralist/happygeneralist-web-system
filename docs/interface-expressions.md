# Two interface expressions — proposal v0.1

Status: **proposed**. Origin: Civic Engine Lab Increment 1 visual review, 8 October 2026.
This is a design and contribution contract, **not a new component library, framework migration, or instruction to rewrite the existing website**.

## Purpose

The Happygeneralist web system provides one semantic, accessible design foundation with two context-specific ways of expressing it:

1. **Web/content expression** — reading, teaching, research, articles, public-facing pages, accessible service content, and publication.
2. **Application/workspace expression** — inspecting, modelling, comparing, editing, reviewing, testing, and collaborating across persistent project information.

Neither expression is intended to imitate GOV.UK branding. Both retain a recognisable shared design language. The application expression is not a 'dark mode' or 'more colourful' version of the website; its main difference is **organisation of space, density, navigation and interaction**.

## Shared foundation: consistent regardless of implementation framework

- **Semantic tokens:** text, muted text, surfaces, borders, link, focus, selection, success, warning, error, and information state. Colour indicates state and action, never decorative object identity or unsupported evidence strength.
- **Accessibility:** semantic HTML, keyboard navigation, visible focus, readable contrast, meaningful status messaging, reduced-motion support, error recovery and WCAG-oriented implementation.
- **Content conventions:** plain British English, sentence-case labels, progressive disclosure, meaningful source/provenance/uncertainty semantics, no fabricated certainty.
- **Spacing and typography scales:** shared conceptual scales with documented application-specific density decisions. Do not force website proportions into an operational interface.
- **Heuristic baseline:** all ten Nielsen usability heuristics, with clear evidence of relevant task-based review.
- **Reusable semantics over shared markup:** Astro components and React components may implement the same design rule without sharing implementation code.

The existing `src/styles/system.css`, `docs/principles.md`, and accessible GOV.UK-adjacent conventions are the starting point. Do not change those tokens speculatively to style one project.

## Web/content expression

Optimise for reading, comprehension, publishing and task completion:
- Linear page flow and clear content hierarchy.
- Generous reading measure, legible headings and more spacious vertical rhythm.
- Familiar service/content patterns for explanation, guidance and forms.
- Navigation and component behaviour follow content rather than a persistent application work state.

Current implementation: Astro, markdown/MDX and web-system components. Examples include Happygeneralist site pages, Labs and generated service-page previews.

## Application/workspace expression

Optimise for ongoing task context, spatial and relational understanding, control and review:
- Compact persistent project header/toolbar rather than a large editorial page heading on every view.
- Stable navigation and context panels; content area prioritises the working artefact.
- Task-appropriate density: avoid oversized banners, fields and permanent explainer text, but never trade away legibility or hit targets.
- Panels, selected state, draft/save status, undo, review and preview controls behave consistently.
- Embedded public-facing pages can retain the **web expression** within an application preview frame.
- Processing feedback communicates real operations, their implications and next human action without simulating model thought.
- Sparse layout should be intentionally used: model canvas has adequate fit, pan/zoom or intelligent centring, rather than leaving a stretched empty panel.

Current experimental implementation: Civic Engine Lab React + Vite. Its tokens and components are *candidate applications*, not reusable web-system standards by default.

## First real-world test: Civic Engine Lab

The current Increment 1 UI successfully uses a dark navigation rail, restrained blue selection accent, neutral work surface and semantic review warnings. The user wants to push it **modestly towards a professional web application** without novelty or decorative colour.

Specific review observations:
- Large global project header unnecessarily competes with the work area.
- An 'Increment 1' notice repeats on all views despite being development process, not user context.
- Model graph consumes only part of an overly tall panel; whitespace is not used intentionally.
- Inspector is legible but can be more compact and better aligned with the working view.
- Preserve clear synthetic/provisional and source-revision status; improve placement, do not remove the meaningful status.

These are candidate product adjustments to test, not a new design-system spec or a requirement to change web content patterns.

## Adoption and change rule

1. Explore application-specific choices and document them in the implementing project's design decisions.
2. Test with the real project UI, screenshots, keyboard interaction, status messaging and all ten heuristics.
3. Promote only patterns with demonstrated reuse value back to this repository through an explicitly reviewed PR.
4. If a new token is truly cross-expression, define it semantically once. If it is density/layout specific, give it an application-expression alias or variant rather than changing every webpage.
5. Never move protected methodology, sensitive client data or private model intelligence into this public repository.

## Next decision

After the Civic Engine Lab visual refinement, decide which specific application tokens (density, shell dimensions, inspector/panel conventions) should graduate into the common system. **Do not create a React component package or migrate Astro components until concrete reuse requires it.**
