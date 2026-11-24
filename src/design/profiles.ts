import { z } from 'zod'

// Every value is implemented by a scoped data attribute in application.css.
export const parameters = {
  visual: { label: 'Visual expressiveness', values: ['restrained', 'editorial'], effect: 'Quiet heading or larger heading with an accent rule.' },
  layout: { label: 'Layout experimentation', values: ['stacked', 'split'], effect: 'Full-width work list or a list beside its contextual editor.' },
  density: { label: 'Information density', values: ['comfortable', 'compact'], effect: 'Changes row padding and section spacing, never hides information.' },
  colour: { label: 'Colour expressiveness', values: ['blue', 'teal', 'plum', 'ochre'], effect: 'Changes the accessible accent and tint palette.' },
  motion: { label: 'Motion intensity', values: ['none', 'subtle'], effect: 'Immediate changes or a 160 ms feedback entrance; reduced motion always wins.' },
  typography: { label: 'Typography', values: ['sans', 'editorial'], effect: 'System sans throughout or serif headings with sans controls.' },
  surface: { label: 'Surface treatment', values: ['plain', 'tinted'], effect: 'White workspace or a softly tinted workspace ground.' },
  components: { label: 'Component styling', values: ['square', 'soft'], effect: 'Square or gently rounded controls and status markers.' },
  interaction: { label: 'Interaction experimentation', values: ['explicit', 'live'], effect: 'Apply a status filter with a button or filter immediately on change.' },
  conformity: { label: 'Design system conformity', values: ['baseline', 'expressive'], effect: 'Baseline border and link treatment or heavier section rules and accent navigation.' }
} as const
const choice = <T extends readonly [string, ...string[]]>(values: T) => z.enum(values)
export const profileSchema = z.strictObject({
  schemaVersion: z.literal(1),
  preset: z.enum(['public-service', 'professional', 'personal', 'experimental']),
  parameters: z.strictObject({
    visual: choice(parameters.visual.values), layout: choice(parameters.layout.values),
    density: choice(parameters.density.values), colour: choice(parameters.colour.values),
    motion: choice(parameters.motion.values), typography: choice(parameters.typography.values),
    surface: choice(parameters.surface.values), components: choice(parameters.components.values),
    interaction: choice(parameters.interaction.values), conformity: choice(parameters.conformity.values)
  })
})
export type DesignProfile = z.infer<typeof profileSchema>
export type Parameter = keyof DesignProfile['parameters']
export const presetNames = { 'public-service': 'Public service', professional: 'Professional', personal: 'Personal', experimental: 'Experimental' } as const
const baseline: DesignProfile['parameters'] = { visual: 'restrained', layout: 'stacked', density: 'comfortable', colour: 'blue', motion: 'none', typography: 'sans', surface: 'plain', components: 'square', interaction: 'explicit', conformity: 'baseline' }
export const presets: Record<DesignProfile['preset'], DesignProfile> = {
  'public-service': profileSchema.parse({ schemaVersion: 1, preset: 'public-service', parameters: baseline }),
  professional: profileSchema.parse({ schemaVersion: 1, preset: 'professional', parameters: { ...baseline, layout: 'split', density: 'compact', colour: 'teal', surface: 'tinted', motion: 'subtle' } }),
  personal: profileSchema.parse({ schemaVersion: 1, preset: 'personal', parameters: { ...baseline, visual: 'editorial', colour: 'plum', typography: 'editorial', components: 'soft', surface: 'tinted' } }),
  experimental: profileSchema.parse({ schemaVersion: 1, preset: 'experimental', parameters: { ...baseline, visual: 'editorial', layout: 'split', colour: 'ochre', motion: 'subtle', typography: 'editorial', interaction: 'live', conformity: 'expressive' } })
}
export function profileAttributes(profile: DesignProfile) {
  return Object.fromEntries(Object.entries(profileSchema.parse(profile).parameters).map(([key, value]) => [`data-${key}`, value]))
}
