import { type Todo as TodoType} from '../types'
import { useState, useRef, useEffect } from 'react'

interface Props extends TodoType {
    onRemoveTodo: (id: string) => void
    handleCompleted: (id: string, completed:boolean) => void
    setTitle: (id: string, title: string ) => void
    isEditing: string
    setIsEditing: (completed: string) => void
}
export const Todo: React.FC<Props> = ({
    id, title, completed, isEditing,
    onRemoveTodo,
     handleCompleted,
     setTitle,
     setIsEditing
    }) => {
        const [editedTitle, setEditedTitle] = useState(title)
        const inputEditTitle = useRef<HTMLInputElement>(null)

        const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            if (e.key === 'Enter') {
              setEditedTitle(editedTitle.trim())
        
              if (editedTitle !== title) {
                setTitle(id, editedTitle)
              }
        
              if (editedTitle === '') onRemoveTodo(id)
        
              setIsEditing('')
            }
        
            if (e.key === 'Escape') {
              setEditedTitle(title)
              setIsEditing('')
            }
        }
        useEffect(() => {
            inputEditTitle.current?.focus()
        }, [isEditing])
    return(
        <>
        <div className='view'>
            <input
            className='toggle'
            checked={completed}
             type="checkbox"
             onChange={(e) => {handleCompleted(id,e.target.checked)}}
             />
             <label>{title}</label>
             <button className='destroy' onClick={() => {onRemoveTodo(id)}}/>
        </div>
         <input
         className='edit'
         value={editedTitle}
         onChange={(e) => { setEditedTitle(e.target.value) }}
         onKeyDown={handleKeyDown}
         onBlur={() => { setIsEditing('') }}
         ref={inputEditTitle}
       />
    </>
    )
}