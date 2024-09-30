import styles from './Header.module.css'

import { IoMdAddCircleOutline } from 'react-icons/io';

import Logo from '../assets/Logo.svg'
import { ChangeEvent, FormEvent, useState } from 'react';

interface IHeaderProps {
    handleAddTask?: (description: string) => void
}

export function Header({ handleAddTask = () => {} }: IHeaderProps) {
    const [newTaskDescription, setNewTaskDescription] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        handleAddTask(newTaskDescription)
        setNewTaskDescription("")
    }

    function handleNewTaskDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskDescription(event.target.value)
    }

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img className={styles.logo} src={Logo} draggable="false" />
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Adicione uma nova tarefa" 
                        type="text" 
                        name="newTask" 
                        id="newTask"
                        value={newTaskDescription}
                        onChange={handleNewTaskDescriptionChange} 
                        required
                    />
                    <button type="submit">Criar <IoMdAddCircleOutline /></button>
                </form>
            </div>
        </header>
    )
}