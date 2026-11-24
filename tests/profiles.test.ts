import { test } from 'node:test'
import assert from 'node:assert/strict'
import { profileSchema, presets, parameters, profileAttributes } from '../src/design/profiles'

test('presets validate, remain distinct and contain every supported decision', () => {
  assert.equal(new Set(Object.values(presets).map(p => JSON.stringify(p.parameters))).size, 4)
  for (const profile of Object.values(presets)) {
    assert.deepEqual(profileSchema.parse(JSON.parse(JSON.stringify(profile))), profile)
    assert.equal(Object.keys(profileAttributes(profile)).length, 10)
    assert.deepEqual(Object.keys(profile.parameters), Object.keys(parameters))
  }
})
test('rejects unknown decisions, versions and silently ignored parameters', () => {
  for (const value of [
    { ...presets.professional, schemaVersion: 2 },
    { ...presets.professional, parameters: { ...presets.professional.parameters, motion: 'intense' } },
    { ...presets.professional, parameters: { ...presets.professional.parameters, unsafe: true } },
    { ...presets.professional, script: 'alert(1)' }
  ]) assert.equal(profileSchema.safeParse(value).success, false)
})
