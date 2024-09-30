import { useEffect, useState } from 'react'
import { IToDo } from './api/models/to-do'
import './App.css'
import { Header } from './components/Header'
import { ToDoList } from './components/ToDoList'
import { getToDoListSaved } from './utils/localStorage'

function App() {

  const [toDoList, setToDoList] = useState<IToDo[]>(getToDoListSaved())

  useEffect(() => {
      setToDoList(getToDoListSaved());
  }, []);

  useEffect(() => {
      localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  function handleAddToDo(description: string) {
    setToDoList((state) => [...state, {
      id: state.length,
      description,
      isCompleted: false
    }])
  }

  function handleConcludeToDo(id: number) {
      const updatedTodoList = toDoList.map(todo => {
          if (todo.id === id) {
              todo.isCompleted = !todo.isCompleted
          }

          return todo
      })

      setToDoList(updatedTodoList)
  }

  function handleDeleteToDo(id: number) {
      setToDoList(toDoList.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <Header handleAddToDo={handleAddToDo} />
      <div className='content'>
        <ToDoList toDoList={toDoList} handleConcludeToDo={handleConcludeToDo} handleDeleteToDo={handleDeleteToDo} />
      </div>
    </div>
  )
}

export default App
