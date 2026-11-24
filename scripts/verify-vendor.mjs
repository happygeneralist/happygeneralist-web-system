import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
const { vendored } = JSON.parse(readFileSync(new URL('../docs/interface/provenance.json', import.meta.url), 'utf8'))
for (const [name, expected] of Object.entries(vendored.sha256)) {
  const bytes = readFileSync(new URL(`../${vendored.directory}/${name}`, import.meta.url))
  if (createHash('sha256').update(bytes).digest('hex') !== expected) throw new Error(`Vendor drift: ${name}. Review upstream and update provenance explicitly.`)
}
console.log(`Verified interface guidelines at ${vendored.revision}`)
