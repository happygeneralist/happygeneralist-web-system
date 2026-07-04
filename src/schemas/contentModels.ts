import { z } from 'astro:content'

export const hwsBaseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  status: z.enum(['rough', 'emerging', 'usable', 'tested', 'archived']).default('emerging'),
  maturity: z.enum(['seed', 'draft', 'developing', 'stable']).default('draft'),
  themes: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  origin_repo: z.string().optional(),
  origin_path: z.string().optional(),
  featured: z.boolean().default(false)
})

export const hwsNotebookSchema = hwsBaseContentSchema.extend({
  entry_type: z.enum(['note', 'observation', 'question', 'pattern', 'fragment']).default('note')
})

export const hwsIdeaSchema = hwsBaseContentSchema.extend({
  idea_type: z.enum(['concept', 'distinction', 'provocation', 'principle', 'pattern']).default('concept'),
  core_claim: z.string().optional(),
  useful_when: z.array(z.string()).default([])
})

export const hwsToolSchema = hwsBaseContentSchema.extend({
  tool_type: z.enum(['canvas', 'checklist', 'method', 'framework', 'diagnostic']).default('framework'),
  use_when: z.array(z.string()).default([]),
  helps_with: z.array(z.string()).default([]),
  inputs: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([])
})

export const hwsLabSchema = hwsBaseContentSchema.extend({
  lab_type: z.enum(['case-study', 'prototype', 'experiment', 'system', 'visual-essay']).default('experiment'),
  layout: z.enum(['standard', 'magazine', 'canvas', 'interactive']).default('standard'),
  project_status: z.enum(['concept', 'active', 'paused', 'complete', 'archived']).default('concept'),
  source_repos: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([])
})

export const hwsThemeSchema = z.object({
  title: z.string(),
  description: z.string(),
  theme_type: z.enum(['domain', 'method', 'concept', 'practice-area']).default('concept')
})
