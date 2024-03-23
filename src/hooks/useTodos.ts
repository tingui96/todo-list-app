import { create } from "zustand";
import { type FilterValue, type ListOfTodos, todoState } from "../types";
import { useShallow } from "zustand/react/shallow";
import { GetTodosStorage,SaveTodosStorage } from "../storage/storage";
import { filterSelected, filteredTodos, completedTodo,completedTodolistCount } from "../utils/utils";  
  
const todolist: ListOfTodos = GetTodosStorage()

const TodoStore = create<todoState>((set) => ({
    todos:todolist,
    sync: true,
    filterSelected : filterSelected(),
    completedCount: (todolist.filter((todo) => todo.completed)).length,
    handleCompleted: (id:string,completed:boolean) => {
      set((state) => ({
        ...state,
        todos: completedTodo(state,id,completed),
      }))
      set((state) => ({
        ...state,
        sync: SaveTodosStorage(state.todos),
        completedCount: completedTodolistCount(state.todos)
      }))
    },
    handleRemove: (id:string) => {
        set((state) => ({
          ...state,
          todos: state.todos.filter(todo => todo.id !== id)
        }))
        set((state) => ({
          ...state,
          sync: SaveTodosStorage(state.todos),
          completedCount: completedTodolistCount(state.todos)
        }))
    },
    handleSave: (title:string) => {
      const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false
      }
    set((state) => ({
        ...state,
        todos: [...state.todos, newTodo]
      }))
      set((state) => ({
        ...state,
        sync: SaveTodosStorage(state.todos)
      }))
    },
    handleClearCompleted: () => {
      set((state) => ({
          ...state,
          todos: state.todos.filter((todo) => !todo.completed)
      }))
      set((state) => ({
        ...state,
        sync: SaveTodosStorage(state.todos)
      }))
    },
    handleFilterChange: (filter:FilterValue) => {
      const params = new URLSearchParams(window.location.search)
      params.set('filter', filter)
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
      set((state) => ({
        ...state,
          filterSelected: filter
      }))
      
    },
    handleUpdateTitle: (id:string,title:string) => {
      set((state) => ({
        ...state,
        todos: state.todos.map((todo) => {
          if(todo.id === id)
          return {
            ...todo,
            title
          }
         return todo 
        })
      }))
      set((state) => ({
        ...state,
        sync: SaveTodosStorage(state.todos)
      }))
    }}))

export function useTodo() {
  return TodoStore(
    useShallow((state) => 
      ({
          activeCount: (state.todos.length - state.completedCount),
          completedCount:state.completedCount,
          todos: filteredTodos(state.todos,state.filterSelected),
          handleCompleted: state.handleCompleted,
          handleRemove: state.handleRemove,
          handleSave: state.handleSave,
          handleClearCompleted: state.handleClearCompleted,
          handleFilterChange: state.handleFilterChange,
          handleUpdateTitle: state.handleUpdateTitle,
          filterSelected : state.filterSelected
      }))
    )
}