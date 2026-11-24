import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import {
  hwsIdeaSchema,
  hwsLabSchema,
  hwsNotebookSchema,
  hwsThemeSchema,
  hwsToolSchema
} from './schemas/contentModels'

const notebook = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notebook' }), schema: hwsNotebookSchema })
const ideas = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ideas' }), schema: hwsIdeaSchema })
const tools = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }), schema: hwsToolSchema })
const labs = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/labs' }), schema: hwsLabSchema })
const themes = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/themes' }), schema: hwsThemeSchema })

export const collections = {
  notebook,
  ideas,
  tools,
  labs,
  themes
}
