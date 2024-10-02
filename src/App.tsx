import { useEffect, useState } from 'react'
import { ITodo } from './api/models/todo'
import './App.css'
import { Header } from './components/Header'
import { TodoList } from './components/TodoList'
import { getTodoListSaved } from './utils/localStorage'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todoList, setTodoList] = useState<ITodo[]>(getTodoListSaved())

  useEffect(() => {
      setTodoList(getTodoListSaved());
  }, []);

  useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  function handleAddTask(description: string) {
    setTodoList((state) => [...state, {
      id: uuidv4(),
      description,
      isCompleted: false
    }])
  }

  function handleConcludeTask(id: string) {
      const updatedTodoList = todoList.map(task => {
          if (task.id === id) {
              task.isCompleted = !task.isCompleted
          }

          return task
      })

      setTodoList(updatedTodoList)
  }

  function handleDeleteToDo(id: string) {
      setTodoList(todoList.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <Header handleAddTask={handleAddTask} />
      <div className='content'>
        <TodoList todoList={todoList} handleConcludeTask={handleConcludeTask} handleDeleteTask={handleDeleteToDo} />
      </div>
    </div>
  )
}

export default App
