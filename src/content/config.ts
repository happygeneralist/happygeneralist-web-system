import { defineCollection } from 'astro:content'
import {
  hwsIdeaSchema,
  hwsLabSchema,
  hwsNotebookSchema,
  hwsThemeSchema,
  hwsToolSchema
} from '../schemas/contentModels'

const notebook = defineCollection({ type: 'content', schema: hwsNotebookSchema })
const ideas = defineCollection({ type: 'content', schema: hwsIdeaSchema })
const tools = defineCollection({ type: 'content', schema: hwsToolSchema })
const labs = defineCollection({ type: 'content', schema: hwsLabSchema })
const themes = defineCollection({ type: 'content', schema: hwsThemeSchema })

export const collections = {
  notebook,
  ideas,
  tools,
  labs,
  themes
}
