import React from "react"
import { type ListOfTodos } from "../types"
import { Todo } from "./Todo"
import { useState } from "react"

interface Props {
    todos: ListOfTodos
    onRemoveTodo: (id:string) => void
    handleCompleted: (id:string, completed: boolean) => void
    setTitle: (id:string,title:string) => void
}
export const Todos: React.FC<Props> = ({todos, onRemoveTodo, handleCompleted,setTitle}) =>
{
    const [isEditing, setIsEditing] = useState('')
    
    return(
        <ul className="todo-list">
            {
                todos.map(todo => (
                    <li key={todo.id}
                        onDoubleClick={() => { setIsEditing(todo.id) }}
                        className={`
                         ${todo.completed ? 'completed' : ''}
                         ${isEditing === todo.id ? 'editing' : ''}
                        `}>
                        <Todo 
                            key={todo.id}
                            id={todo.id} 
                            title={todo.title}
                             completed={todo.completed}
                             onRemoveTodo={onRemoveTodo}
                             handleCompleted={handleCompleted}
                             setTitle={setTitle}
                             isEditing={isEditing}
                             setIsEditing={setIsEditing}
                             />
                    </li>
                ))
            }
        </ul>
    )
}