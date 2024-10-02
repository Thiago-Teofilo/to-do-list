import styles from './TodoList.module.css'

import { FaCheck } from 'react-icons/fa'
import { LuTrash2 } from 'react-icons/lu'

import { ITodo } from '../api/models/todo'
import ClipBoard from '../assets/Clipboard.svg'

interface ITodoListProps {
    todoList:  ITodo[];
    handleConcludeTask?: (id: string) => void;
    handleDeleteTask?: (id: string) => void;
}

export function TodoList({ todoList, handleConcludeTask = () => {}, handleDeleteTask = () => {} }: ITodoListProps) {

    const totalTask = todoList.length
    const totalCompleted = todoList.filter(item => item.isCompleted).length

    return (
        <div className={styles['to-do-list']}>
            <div className={styles.status}>
                <div className={styles['status-label']}>
                    <h2>
                        Tarefas criadas
                    </h2>
                    <span>{totalTask}</span>
                </div>
                <div className={styles['status-label']}>
                    <h2>
                        Concluídas
                    </h2>
                    <span>{totalCompleted}</span>
                </div>
            </div>
            {
                totalTask > 0 ? (
                    <ul>
                    {
                        todoList.map(task => (
                            <li key={task.id} className={task.isCompleted ? styles.completed : ''}>
                                <div className={styles.checkbox} onClick={() => handleConcludeTask(task.id)}>
                                    { task.isCompleted ? <FaCheck /> : null }
                                </div>
                                <p>{task.description}</p>
                                <button className={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>
                                    <LuTrash2 />
                                </button>
                            </li>
                        ))
                    }
                    </ul>
                ) : (
                    <div className={styles.warn}>
                        <img src={ClipBoard} alt="Lista" />
                        <h3>Você ainda não tem tarefas cadastradas</h3>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                )
            }
        </div>
    )
}