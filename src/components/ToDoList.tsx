import styles from './ToDoList.module.css'

import { FaCheck } from 'react-icons/fa'
import { LuTrash2 } from 'react-icons/lu'

import { IToDo } from '../api/models/to-do'
import ClipBoard from '../assets/Clipboard.svg'

interface IToDoListProps {
    toDoList:  IToDo[];
    handleConcludeToDo?: (id: number) => void;
    handleDeleteToDo?: (id: number) => void;
}

export function ToDoList({ toDoList, handleConcludeToDo = () => {}, handleDeleteToDo = () => {} }: IToDoListProps) {

    const totalTodo = toDoList.length
    const totalCompleted = toDoList.filter(item => item.isCompleted).length

    return (
        <div className={styles['to-do-list']}>
            <div className={styles.status}>
                <div className={styles['status-label']}>
                    <h2>
                        Tarefas criadas
                    </h2>
                    <span>{totalTodo}</span>
                </div>
                <div className={styles['status-label']}>
                    <h2>
                        Concluídas
                    </h2>
                    <span>{totalCompleted}</span>
                </div>
            </div>
            {
                totalTodo > 0 ? (
                    <ul>
                    {
                        toDoList.map(item => (
                            <li key={item.id} className={item.isCompleted ? styles.completed : ''}>
                                <div className={styles.checkbox} onClick={() => handleConcludeToDo(item.id)}>
                                    { item.isCompleted ? <FaCheck /> : null }
                                </div>
                                <p>{item.description}</p>
                                <button className={styles.deleteButton} onClick={() => handleDeleteToDo(item.id)}>
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