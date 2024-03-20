//mdn resource for html
//DOM - Document Object Model

//import uuidv4 from "./uuidv4"

'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    savedNotes(notes)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})



// const now = moment()
// now.subtract(1,'week').subtract(20,'days')
// console.log(now.format('MMMM Do, YYYY'))
// console.log(now.fromNow())

// const nowTimeStamp = now.valueOf()
// console.log(moment(nowTimeStamp).toString())

// const dateOfBirth = moment()
// dateOfBirth.year(1986).month(2).date(2)
// console.log(dateOfBirth.format('MMM D, YYYY'))

//CRUD - Create, Read, Update, Delete

//CREATE
//localStorage.setItem('location','Arizona')

//READ
//console.log(localStorage.getItem('location'))

//UPDATE
//localStorage.setItem - update value in Key, Value pair

//DELETE
//localStorage.removeItem('location')

//localStorage.clear()

//MDN Add event listener
//MDN input

// //query and remove
// // const p = document.querySelector('p')
// // p.remove()

// //query all and remove
// const ps = document.querySelectorAll('p')

// ps.forEach(function (p){
//     p.textContent = '******'
//     //console.log(p.textContent)
//     //p.remove()
// })

// // Add a new element

// const newParagraph = document.createElement('p')
// newParagraph.textContent = 'This is a new element from JavaScript.'
// document.querySelector('body').appendChild(newParagraph)
