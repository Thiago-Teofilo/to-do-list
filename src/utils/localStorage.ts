export function getTodoListSaved() {
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
        return JSON.parse(savedTodoList)
    }
    return []
}