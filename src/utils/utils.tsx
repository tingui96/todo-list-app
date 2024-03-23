import { TODO_FILTERS } from "../consts"
import { FilterValue,ListOfTodos,todoState } from "../types"

export const filterSelected = () => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterValue | null
    if (filter === null) return TODO_FILTERS.ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : TODO_FILTERS.ALL
  }

export const filteredTodos = (todos:ListOfTodos,filterSelected:FilterValue) => {
    return todos.filter(todo => {
  if (filterSelected === TODO_FILTERS.ACTIVE) {
    return !todo.completed
  }

  if (filterSelected === TODO_FILTERS.COMPLETED) {
    return todo.completed
  }

  return true
  })
}

export const completedTodolistCount = (todos:ListOfTodos) => {
    return (todos.filter((todo) => todo.completed)).length
}
  
export const completedTodo = (state:todoState,id:string,completed:boolean) => {
     const newTodo = state.todos.map(todo => {
        if(todo.id === id)
        {
          return {
            ... todo,completed
          }
        }
        return todo
      })
    return newTodo
} 