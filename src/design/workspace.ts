export type WorkStatus = 'Planned' | 'In progress' | 'Ready'
export interface WorkItem { id: string; title: string; owner: string; status: WorkStatus; completed: number; total: number; note: string }
export const workItems: WorkItem[] = [
  { id: 'W01', title: 'Make the first step clearer', owner: 'Alex', status: 'In progress', completed: 7, total: 10, note: 'Test the revised introduction with the example task.' },
  { id: 'W02', title: 'Simplify the request form', owner: 'Morgan', status: 'Planned', completed: 2, total: 8, note: 'Review the order of questions before prototyping.' },
  { id: 'W03', title: 'Explain what happens next', owner: 'Sam', status: 'Ready', completed: 6, total: 6, note: 'The synthetic review is complete.' },
  { id: 'W04', title: 'Improve the progress view', owner: 'Alex', status: 'In progress', completed: 4, total: 9, note: 'Keep the text equivalent alongside the chart.' }
]
