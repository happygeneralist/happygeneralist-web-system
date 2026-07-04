# Happygeneralist web system

A reusable visual, semantic and publishing system for Happygeneralist web projects.

This repository provides shared foundations for building clear, accessible, GOV.UK-adjacent static websites with Astro.

It includes reusable layouts, content models, semantic patterns, visual explanation components, Lab display patterns and publishing conventions.

The aim is not to replace GOV.UK Frontend or create a decorative design system. The aim is to create a practical web foundation for turning complex thinking into clear, usable and explorable public artefacts.

## What this is

```text
Visual system
  reusable layouts, typography, spacing, cards and Lab display patterns

Semantic system
  content models, page types, metadata conventions and knowledge relationships

Publishing system
  Astro conventions, Markdown/MDX structures, accessibility defaults and build patterns
```

## What this is not

This is not a fork of GOV.UK Frontend.

This is not the Happygeneralist website content repo.

This is not a private thinking vault.

This is not a finished package yet. The MVP is a reference/starter system that can later become a template or package.

## Intended consumers

- `happygeneralist-site`
- Civic and public-interest Labs
- Astro-based experiments
- Future Happygeneralist web projects

## Design posture

Standard pages should be clear, accessible, content-led and GOV.UK/x-gov adjacent.

Lab pages may support richer visual explanation, large-screen layouts and modular thinking environments, while remaining semantically clear and accessible.

## MVP contents

- Astro-compatible component patterns
- Shared content model examples
- Standard page layout conventions
- Lab layout conventions
- Semantic metadata conventions
- Accessibility and GOV.UK-adjacent guidance
- Example pages and starter content

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
