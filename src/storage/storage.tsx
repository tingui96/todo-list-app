import { ListOfTodos } from "../types"
export const SaveTodosStorage = (todos: ListOfTodos) =>
  {
    localStorage.setItem('todos',JSON.stringify(todos))
    return true
  }
export const GetTodosStorage = ():ListOfTodos => {
    const storage = localStorage.getItem('todos')
    const todos = JSON.parse(storage ? storage : '[]')
    return todos
  }