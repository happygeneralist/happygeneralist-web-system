# Visual explanation pattern

Status: candidate reusable web pattern  
Date: 1 October 2026  
Upstream visual semantics: `happygeneralist/design-intelligence-orchestration/methodology/visual-output-translation-standard.md`

## Purpose

Provide a web-specific implementation pattern for visual explanations that originate in a structured model or analysis.

This repository owns the **web implementation layer**:

- responsive layout;
- semantic HTML;
- accessible text equivalents;
- reusable visual components;
- progressive disclosure;
- publication behaviour.

It does not own the semantic method that decides what the model means or how evidence states are assigned.

## Translation boundary

Use:

```text
model / analysis
        ↓
content hierarchy + composition contract
        ↓
web visual explanation
```

The upstream composition contract should come from the owning project or from Design Intelligence Orchestration.

Do not rebuild the model by interpreting a screenshot.

## Candidate page anatomy

For bounded service/system explainers, a useful web composition may contain:

### Header

- title;
- subtitle;
- status / maturity line.

### Orientation / context

A narrow or secondary region for:

- what this models;
- what is known;
- what remains unknown;
- evidence metadata;
- named analytical lenses where relevant.

### Primary visual

The dominant model:

- flow;
- layered system;
- relationship map;
- comparison;
- timeline.

### Questions

Separate unresolved questions from the model itself.

### Implications

Separate service/design implications from evidence and questions.

## Responsive behaviour

Desktop can preserve spatial composition where it materially aids understanding.

On narrower screens:

- linearise reading order;
- preserve phase/section hierarchy;
- keep evidence metadata adjacent to the claim it qualifies;
- avoid horizontal overflow unless the visual genuinely requires panning/zooming;
- use disclosure or sectional stacking rather than shrinking text below a comfortable size.

## Semantic HTML

Prefer native structure before SVG-only presentation.

Use:

- headings;
- sections;
- lists;
- definition lists where useful;
- tables for true tabular data;
- CSS grid/flex for layout;
- SVG only for relationships/geometry that need it.

If SVG is used:

- provide a meaningful accessible name;
- keep important labels available as HTML where practical;
- provide a text description or structured equivalent for complex visuals.

## Epistemic metadata

Evidence state must not depend on colour alone.

Use textual state markers such as:

- V;
- E;
- I;
- A;
- ?.

Use accessible labels that expand the shorthand when needed.

Do not turn epistemic state into a decorative badge system.

## Visual language

Default GOV.UK-adjacent baseline:

- content-led;
- restrained palette;
- flat surfaces;
- strong typography;
- clear grouping;
- minimal borders;
- generous whitespace between major groups;
- compact spacing within related groups.

Avoid:

- gradients;
- heavy shadows;
- decorative icon sets;
- generic SaaS card grids;
- large rounded component styling without semantic purpose.

## Relationship to generated infographics

A generated infographic can be a composition reference, but the web implementation should normally be rebuilt as semantic HTML/CSS/SVG rather than embedded as the sole information carrier.

Preserve:

- hierarchy;
- main grouping;
- proportions where useful;
- question/implication separation;
- metadata prominence.

Do not preserve:

- inaccessible small text;
- raster-only content;
- generated wording that has not been checked;
- arbitrary pixel dimensions.

## Acceptance criteria

### Meaning

- [ ] Web view derives from a named model/composition source.
- [ ] No visual relationship is invented during implementation.
- [ ] Evidence-state semantics are preserved.
- [ ] Questions and implications remain distinguishable from evidence.

### Accessibility

- [ ] Reading order remains meaningful without the visual layout.
- [ ] Text remains readable at responsive sizes.
- [ ] Colour is not required to understand state.
- [ ] Complex SVG/image content has a text equivalent.
- [ ] Keyboard/screen-reader use is not blocked by visual composition.

### Visual consistency

- [ ] Title/context/model hierarchy matches the upstream composition.
- [ ] Primary model remains visually dominant.
- [ ] Context is secondary.
- [ ] The palette is restrained.
- [ ] Repeated object types use consistent treatment.

### Reuse

- [ ] Pattern can accept a different model without changing semantic meaning.
- [ ] Project-specific colours/content remain outside the reusable component defaults.
- [ ] Reusable component code is only added after a real project demonstrates the pattern.

## Current maturity

This is a candidate adoption pattern earned from real EHCNA infographic/Miro trials.

Do not build a large component library yet.

The next useful test is to implement one real web explainer from an existing project composition, then feed only repeated implementation lessons back into this repository.
