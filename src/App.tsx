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

  function handleAddTask(description: string) {
    setToDoList((state) => [...state, {
      id: state.length,
      description,
      isCompleted: false
    }])
  }

  function handleConcludeTask(id: number) {
      const updatedTodoList = toDoList.map(task => {
          if (task.id === id) {
              task.isCompleted = !task.isCompleted
          }

          return task
      })

      setToDoList(updatedTodoList)
  }

  function handleDeleteToDo(id: number) {
      setToDoList(toDoList.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <Header handleAddTask={handleAddTask} />
      <div className='content'>
        <ToDoList toDoList={toDoList} handleConcludeTask={handleConcludeTask} handleDeleteTask={handleDeleteToDo} />
      </div>
    </div>
  )
}

export default App
