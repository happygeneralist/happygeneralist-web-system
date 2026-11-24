import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { profileSchema, presets, parameters } from '../src/design/profiles'
import { readFile } from 'node:fs/promises'

test('complete a representative task, recover, compare and export', async ({ page }) => {
  await page.goto('/playground/')
  const preview = page.locator('#primary-preview')
  await page.getByLabel('Status', { exact: true }).selectOption('Planned')
  await expect(preview.locator('tbody tr:visible')).toHaveCount(4)
  await page.getByRole('button', { name: 'Apply filter' }).click()
  await expect(preview.locator('tbody tr:visible')).toHaveCount(1)
  await page.getByRole('button', { name: 'Simplify the request form', exact: true }).click()
  await expect(page.getByLabel('Next step')).toBeFocused()
  const original = await page.getByLabel('Next step').inputValue()
  await page.getByLabel('Next step').fill('  ')
  await page.getByRole('button', { name: 'Save note', exact: true }).click()
  await expect(page.getByLabel('Next step')).toHaveAttribute('aria-invalid', 'true')
  await page.locator('.context-editor').first().screenshot({ path: 'docs/interface/evidence/validation.png' })
  await page.getByLabel('Next step').fill('Test the shorter form with the example task.')
  await page.getByRole('button', { name: 'Save note', exact: true }).click()
  await expect(page.locator('#save-message')).toContainText('Note saved')
  await page.getByRole('button', { name: 'Undo save' }).click()
  await expect(page.getByLabel('Next step')).toHaveValue(original)
  await page.getByRole('button', { name: 'Clear', exact: true }).click()
  await preview.getByRole('checkbox').nth(0).check(); await preview.getByRole('checkbox').nth(1).check()
  await expect(page.locator('#comparison')).toContainText('70%')
  await expect(preview.locator('[data-chart=W01]')).toHaveAttribute('data-selected', 'true')
  await preview.getByRole('checkbox').nth(2).click()
  await expect(preview.getByRole('checkbox').nth(2)).not.toBeChecked()
  for (const state of ['empty', 'loading', 'error']) {
    await page.getByLabel('Workspace data').selectOption(state)
    await expect(preview.locator('tbody tr:visible')).toHaveCount(0)
    await expect(page.locator('#note-form button[type=submit]')).toBeDisabled()
    await expect(preview.locator('.context-editor')).toBeHidden()
    await expect(page.locator('#progress')).toBeHidden()
    await preview.screenshot({ path: `docs/interface/evidence/state-${state}.png` })
  }
  await page.getByRole('button', { name: 'Retry example data' }).click()
  await expect(preview.locator('tbody tr:visible')).toHaveCount(4)
  await page.getByLabel('Design profile', { exact: true }).selectOption('experimental')
  await page.getByLabel('Status', { exact: true }).selectOption('Ready')
  await expect(preview.locator('tbody tr:visible')).toHaveCount(1)
  const downloaded = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export profile' }).click()
  const download = await downloaded
  const exported = profileSchema.parse(JSON.parse(await readFile((await download.path())!, 'utf8')))
  expect(exported).toEqual(presets.experimental)
})

test('each parameter changes its rendered decision independently', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/playground/')
  await page.getByText('Adjust the 10 design parameters', { exact: true }).click()
  const app = page.locator('#primary-preview .hws-app')
  const probes: Record<string, { selector: string; property: string }> = {
    visual: { selector: '.workspace-heading', property: 'border-left-width' },
    layout: { selector: '.workspace-grid', property: 'grid-template-columns' },
    density: { selector: 'tbody td', property: 'padding-top' },
    colour: { selector: 'button', property: 'border-top-color' },
    motion: { selector: '#list-message', property: 'animation-duration' },
    typography: { selector: 'h2', property: 'font-family' },
    surface: { selector: ':scope', property: 'background-color' },
    components: { selector: 'button', property: 'border-radius' },
    interaction: { selector: '#apply-filter', property: 'display' },
    conformity: { selector: '.section-heading', property: 'border-top-width' }
  }
  for (const [key, spec] of Object.entries(parameters)) {
    const probe = probes[key]
    const element = probe.selector === ':scope' ? app : app.locator(probe.selector).first()
    const before = await element.evaluate((el, property) => getComputedStyle(el).getPropertyValue(property), probe.property)
    await page.locator(`#param-${key}`).selectOption(spec.values[1])
    await expect(app).toHaveAttribute(`data-${key}`, spec.values[1])
    const after = await element.evaluate((el, property) => getComputedStyle(el).getPropertyValue(property), probe.property)
    expect(after, `${key} must have a rendered effect`).not.toEqual(before)
    await page.getByRole('button', { name: 'Reset preset' }).click()
  }
})

test('keyboard flow, disclosure, unsaved recovery and reduced motion', async ({ page }) => {
  await page.goto('/playground/')
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter'); await page.keyboard.press('Tab')
  const input = page.getByLabel('Next step')
  await page.getByRole('button', { name: 'Make the first step clearer', exact: true }).focus()
  await page.keyboard.press('Enter'); await expect(input).toBeFocused()
  await input.fill('Unsaved edit')
  page.once('dialog', dialog => dialog.dismiss())
  await page.getByRole('button', { name: 'Simplify the request form', exact: true }).click()
  await expect(input).toHaveValue('Unsaved edit')
  await input.fill('A keyboard edit')
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter')
  await expect(page.locator('#save-message')).toContainText('Note saved')
  const disclosure = page.locator('#workspace-guide summary'); await disclosure.focus(); await page.keyboard.press('Enter')
  await expect(page.locator('#workspace-guide')).toHaveAttribute('open', '')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByLabel('Design profile', { exact: true }).selectOption('experimental')
  await expect(page.locator('#primary-preview .hws-app')).toHaveCSS('--app-duration', '0ms')
})

for (const width of [1440, 768, 390]) {
  test(`rendered acceptance at ${width}px across every preset`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 }); await page.goto('/playground/')
    for (const preset of Object.keys(presets)) {
      await page.getByLabel('Design profile', { exact: true }).selectOption(preset)
      await page.getByLabel('Reference profile').selectOption(preset)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      expect(axe.violations).toEqual([])
      if (width !== 768) await page.locator('#primary-preview').screenshot({ path: `docs/interface/evidence/${preset}-${width}.png` })
    }
    await page.screenshot({ path: `docs/interface/evidence/playground-${width}.png`, fullPage: true })
  })
}

test('publishing routes remain available', async ({ page }) => {
  for (const route of ['/', '/examples/standard-page/', '/examples/lab-page/', '/docs/content-model/']) {
    const response = await page.goto(route); expect(response?.status()).toBe(200)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('.hws-app')).toHaveCount(0)
  }
})


test('preview containers reflow independently and expanded controls stay accessible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/playground/')
  await page.getByText('Adjust the 10 design parameters', { exact: true }).click()
  await page.getByLabel('Design profile', { exact: true }).selectOption('professional')
  for (const width of ['mobile', 'tablet', 'full']) {
    await page.getByLabel('Preview width').selectOption(width)
    const columns = await page.locator('#primary-preview .workspace-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)
    expect(columns).toBe(width === 'full' ? 2 : 1)
  }
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
  expect(axe.violations).toEqual([])
  await page.locator('.parameter-panel').screenshot({ path: 'docs/interface/evidence/parameters.png' })
})
