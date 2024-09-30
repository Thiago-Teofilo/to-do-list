import styles from './Header.module.css'

import { IoMdAddCircleOutline } from 'react-icons/io';

import Logo from '../assets/Logo.svg'
import { ChangeEvent, FormEvent, useState } from 'react';

interface IHeaderProps {
    handleAddToDo?: (description: string) => void
}

export function Header({ handleAddToDo = () => {} }: IHeaderProps) {
    const [newToDoDescription, setNewToDoDescription] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        handleAddToDo(newToDoDescription)
        setNewToDoDescription("")
    }

    function handleNewToDoDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setNewToDoDescription(event.target.value)
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
                        value={newToDoDescription}
                        onChange={handleNewToDoDescriptionChange} 
                        required
                    />
                    <button type="submit">Criar <IoMdAddCircleOutline /></button>
                </form>
            </div>
        </header>
    )
}