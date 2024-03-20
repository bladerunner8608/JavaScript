'use strict'

//generate new todos
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkElement = document.createElement('input')
    const textElement = document.createElement('span')
    const buttonElement = document.createElement('button')

    // Setup todo checkbox
    checkElement.setAttribute('type','checkbox')
    checkElement.checked = todo.completed
    containerElement.appendChild(checkElement)
    checkElement.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodo(todo)
        renderTodo(todo, filters)
    })

    // Setup todo Text
    textElement.textContent = todo.text
    containerElement.appendChild(textElement)

    // Setup Container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)

    // Setup remove button
    buttonElement.textContent = 'Remove'
    buttonElement.classList.add('button', 'button--text')
    todoElement.appendChild(buttonElement)
    buttonElement.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodo(todo)
        renderTodo(todo, filters)
    })

    return todoElement
}

//get existing todos
const getSavedTodo = () => {
    const todoJSON = localStorage.getItem('todo')

    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []
    }
}

//save todos to local storage
const saveTodo = (todo) => {
    localStorage.setItem('todo', JSON.stringify(todo))
}

//remove todo by id
const removeTodo = (id) => {
    const todoIndex = todo.findIndex((id) => todo.id === id)

    if (todoIndex > -1){
        todo.splice(todoIndex, 1)
    }
}

//toggle the completed value for a given todo
const toggleTodo = (id) => {
    const item = todo.find((item) => item.id === id)

    if (todo){
        todo.completed = !todo.completed
    }
}

//render application todos based on filters
const renderTodo = (todo, filters) => {
    const todoElement = document.querySelector('#search')
    const filteredTodo = todo.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const notDone = filteredTodo.filter((item) => !item.completed)

    todoElement.innerHTML = ''
    todoElement.appendChild(generateSummaryDOM(notDone))

    if (filteredTodo.length > 0) {
        filteredTodo.forEach((todo) => {
            todoElement.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = 'No Things To Do Today'
        todoElement.appendChild(messageElement)
    }
}

//generate summary message
const generateSummaryDOM = (notDone) => {
    const newMessage = document.createElement('h2')
    const plural = notDone.length === 1 ? '' : 's'
    newMessage.classList.add('list-title')
    newMessage.textContent = `You have ${notDone.length} thing${plural} left to do`
    return newMessage
 }
