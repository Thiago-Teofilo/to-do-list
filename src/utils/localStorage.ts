export function getToDoListSaved() {
    const savedToDoList = localStorage.getItem('toDoList');
    if (savedToDoList) {
        return JSON.parse(savedToDoList)
    }
    return []
}