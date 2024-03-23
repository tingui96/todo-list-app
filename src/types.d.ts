import type { TODO_FILTERS } from './consts'

export interface Todo {
    id: string
    title: string
    completed: boolean
}
export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

export interface todoState {
    todos: ListOfTodos
    sync: boolean
    filterSelected: FilterValue
    completedCount: number
    handleClearCompleted: () => void
    handleCompleted: (id:string,completed:boolean) => void
    handleFilterChange: (filter: FilterValue) => void
    handleRemove: (id:string) => void
    handleSave: (title: string) => void
    handleUpdateTitle: (id: string, title: string) => void
  }