import { readFileSync } from 'node:fs'
import { profileSchema } from '../src/design/profiles'
const path = process.argv[2] || 'hws.design-profile.json'
try {
  const profile = profileSchema.parse(JSON.parse(readFileSync(path, 'utf8')))
  console.log(`Valid design profile v${profile.schemaVersion}: ${profile.preset}`)
} catch (error) {
  console.error(`Invalid profile at ${path}:`, error instanceof Error ? error.message : error)
  process.exitCode = 1
}
