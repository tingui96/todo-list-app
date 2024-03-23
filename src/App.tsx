import {Todos} from "./components/Todos"
import { useTodo } from "./hooks/useTodos"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
const App = () => {
  const { todos,
    handleCompleted,
    handleRemove,
    handleClearCompleted,
    handleFilterChange,
    handleUpdateTitle,
    handleSave,
    activeCount,
    completedCount,
    filterSelected
  } = useTodo()
  
  return (
    <div className="todoapp">
      <Header saveTodo={handleSave} />
      <Todos
          onRemoveTodo={handleRemove}
          handleCompleted={handleCompleted}
          setTitle={handleUpdateTitle}
          todos={todos}
        />
      <Footer
          handleFilterChange={handleFilterChange}
          completedCount={completedCount}
          activeCount={activeCount}
          filterSelected={filterSelected}
          onClearCompleted={handleClearCompleted}
        />
    </div>
  )
}

export default App
