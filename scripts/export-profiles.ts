import { readFileSync, writeFileSync } from 'node:fs'
import { z } from 'zod'
import { profileSchema, presets, parameters } from '../src/design/profiles'
const files: Record<string, unknown> = {
  ...Object.fromEntries(Object.entries(presets).map(([name, profile]) => [`${name}.json`, profile])),
  'schema.json': z.toJSONSchema(profileSchema),
  'decisions.json': parameters
}
for (const [name, value] of Object.entries(files)) {
  const path = `design-profiles/${name}`
  const text = JSON.stringify(value, null, 2) + '\n'
  if (process.argv.includes('--check')) {
    if (readFileSync(path, 'utf8') !== text) throw new Error(`${path} is stale. Run npm run profile:generate.`)
  } else writeFileSync(path, text)
}
console.log(process.argv.includes('--check') ? 'Profile artefacts match the source contract.' : 'Profile artefacts generated.')
