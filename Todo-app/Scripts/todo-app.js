'use strict'

let todo = getSavedTodo()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodo(todo, filters)


document.querySelector('#search-todos').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodo(todo, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.newTodo.value.trim()
    e.preventDefault()

    if(text.length > 0) {
        todo.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveTodo(todo)
        renderTodo(todo, filters)
        e.target.elements.newTodo.value = ''
    }

})

document.querySelector('#completed-todos').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodo(todo,filters)
})
