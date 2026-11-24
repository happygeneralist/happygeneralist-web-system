import { parameters, presets, profileSchema, profileAttributes, presetNames, type DesignProfile, type Parameter } from '../design/profiles'
import { workItems } from '../design/workspace'

const get = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T
const select = (id: string) => get<HTMLSelectElement>(id)
const primary = document.querySelector<HTMLElement>('#primary-preview .hws-app')!
const reference = document.querySelector<HTMLElement>('#reference-preview .hws-app')!
let current = structuredClone(presets['public-service'])
function apply(target: HTMLElement, profile: DesignProfile) {
  for (const [key, value] of Object.entries(profileAttributes(profile))) target.setAttribute(key, value)
}
function sync() {
  current = profileSchema.parse(current)
  apply(primary, current)
  for (const key of Object.keys(parameters) as Parameter[]) select(`param-${key}`).value = current.parameters[key]
  get('profile-message').textContent = `${presetNames[current.preset]}${JSON.stringify(current) === JSON.stringify(presets[current.preset]) ? '' : ' · customised'}. Preview updated.`
}
select('profile').addEventListener('change', () => {
  current = structuredClone(presets[select('profile').value as DesignProfile['preset']]); sync(); renderRows()
})
get('reset-profile').addEventListener('click', () => { current = structuredClone(presets[current.preset]); sync(); renderRows() })
for (const key of Object.keys(parameters) as Parameter[]) select(`param-${key}`).addEventListener('change', () => {
  current = profileSchema.parse({ ...current, parameters: { ...current.parameters, [key]: select(`param-${key}`).value } }); sync(); renderRows()
})
select('compare-profile').addEventListener('change', () => apply(reference, presets[select('compare-profile').value as DesignProfile['preset']]))
select('preview-width').addEventListener('change', () => { get('primary-preview').dataset.width = select('preview-width').value })
get('export-profile').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(profileSchema.parse(current), null, 2) + '\n'], { type: 'application/json' }))
  const link = document.createElement('a'); link.href = url; link.download = 'hws.design-profile.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000)
  get('profile-message').textContent = 'Validated profile exported as hws.design-profile.json.'
})

const items = structuredClone(workItems)
let activeId = items[0].id
let appliedStatus = 'All statuses'
let previous: { id: string; note: string } | undefined
const selected = new Set<string>()
function announce(message: string) { get('list-message').textContent = message }
function renderRows() {
  const state = select('data-state').value
  const filter = current.parameters.interaction === 'live' ? select('status-filter').value : appliedStatus
  let count = 0
  primary.querySelectorAll<HTMLTableRowElement>('tr[data-id]').forEach(row => {
    const item = items.find(item => item.id === row.dataset.id)!
    row.hidden = state !== 'ready' || (filter !== 'All statuses' && item.status !== filter)
    if (!row.hidden) count++
    row.setAttribute('aria-current', String(item.id === activeId))
  })
  const ready = state === 'ready'
  get<HTMLButtonElement>('retry-data').hidden = state !== 'error'
  get('work-rows').setAttribute('aria-busy', String(state === 'loading'))
  get('state-message').textContent = ({ ready: '', empty: 'No work yet. Choose Ready to restore the example work.', loading: 'Loading example work… Choose Ready to complete the demonstration.', error: 'Example work could not be loaded. Retry to restore the synthetic data.' })[state] || ''
  get('note-form').querySelectorAll<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>('input, button, textarea').forEach(el => { el.disabled = !ready })
  get<HTMLButtonElement>('undo-note').disabled = !ready || !previous
  primary.querySelectorAll<HTMLInputElement>('input[name=compare]').forEach(el => { el.disabled = !ready })
  // Progress and comparison must not imply available data in loading/error/empty states.
  get('progress').hidden = !ready
  get('comparison').hidden = !ready
  get('work-count').textContent = ready ? `${count} items · example cycle` : 'Data unavailable'
  primary.querySelector<HTMLElement>('.context-editor')!.hidden = !ready
  announce(ready ? `${count} ${count === 1 ? 'item' : 'items'} shown.${count === 0 ? ' Clear the filter to see all work.' : ''}` : get('state-message').textContent || '')
}
get('filter-form').addEventListener('submit', event => { event.preventDefault(); appliedStatus = select('status-filter').value; renderRows() })
select('status-filter').addEventListener('change', () => { if (current.parameters.interaction === 'live') renderRows() })
get('clear-filter').addEventListener('click', () => { appliedStatus = 'All statuses'; select('status-filter').value = appliedStatus; renderRows() })
select('data-state').addEventListener('change', renderRows)
get('retry-data').addEventListener('click', () => { select('data-state').value = 'ready'; renderRows(); select('data-state').focus() })
const note = get<HTMLTextAreaElement>('work-note')
function clearError() { get('note-error').hidden = true; note.removeAttribute('aria-invalid') }
primary.querySelectorAll<HTMLButtonElement>('[data-open]').forEach(button => button.addEventListener('click', () => {
  if (note.value !== items.find(item => item.id === activeId)!.note && !window.confirm('Discard the unsaved note and open another item?')) return
  activeId = button.dataset.open!
  const item = items.find(item => item.id === activeId)!
  get('editor-title').textContent = item.title; note.value = item.note; clearError(); get('save-message').textContent = ''; renderRows(); note.focus()
}))
note.addEventListener('input', clearError)
get('note-form').addEventListener('submit', event => {
  event.preventDefault()
  if (!note.value.trim() || note.value.length > 240) {
    get('note-error').textContent = 'Enter a next step between 1 and 240 characters.'; get('note-error').hidden = false; note.setAttribute('aria-invalid', 'true'); note.focus(); return
  }
  const item = items.find(item => item.id === activeId)!
  previous = { id: item.id, note: item.note }; item.note = note.value.trim(); note.value = item.note
  get<HTMLButtonElement>('undo-note').disabled = false; get('save-message').textContent = 'Note saved for this session. You can undo this save.'
})
get('undo-note').addEventListener('click', () => {
  if (!previous) return
  const item = items.find(item => item.id === previous!.id)!; item.note = previous.note
  if (activeId === item.id) note.value = item.note
  previous = undefined; clearError(); get<HTMLButtonElement>('undo-note').disabled = true
  get('save-message').textContent = `Save undone for ${item.title}.`; note.focus()
})
primary.querySelectorAll<HTMLInputElement>('input[name=compare]').forEach(input => input.addEventListener('change', () => {
  if (input.checked && selected.size === 2) { input.checked = false; announce('Choose at most two items. Deselect an item first.'); return }
  input.checked ? selected.add(input.value) : selected.delete(input.value)
  primary.querySelectorAll<HTMLElement>('[data-chart]').forEach(row => { row.dataset.selected = String(selected.has(row.dataset.chart!)) })
  const box = get('comparison'); box.replaceChildren()
  const heading = document.createElement('h4'); heading.textContent = 'Compare work'; box.append(heading)
  if (selected.size !== 2) { const p = document.createElement('p'); p.textContent = `${selected.size} of 2 selected. Select two items to compare their progress.`; box.append(p); return }
  for (const id of selected) { const item = items.find(item => item.id === id)!; const p = document.createElement('p'); p.textContent = `${item.title}: ${item.completed} of ${item.total} steps (${Math.round(item.completed / item.total * 100)}%). ${item.status}.`; box.append(p) }
}))
sync(); apply(reference, presets.professional); renderRows()
