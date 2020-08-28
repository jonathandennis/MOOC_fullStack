
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState(null)

useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
}, [])

const notify = (message, type='error') => {
  setNotification({ type, message })
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

const handleNameChange = (event) => {
  //console.log(event.target.value)
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  //console.log(event.target.value)
  setNewNumber(event.target.value)
}
const handleFilterChange = (event) => {
  //console.log(event.target.value)
  setSearchTerm(event.target.value)
}
 
const removePersonOf = (id) => {
  const toDelete = persons.find(person => person.id === id)
  const ok = window.confirm(`Delete ${toDelete.name}?`)
  if (ok) {
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        notify(`${toDelete.name}'s number was sucessfully deleted!`, 'ok')
      }).catch(() => {
        setPersons(persons.filter(person => person.id !== id))
        notify(`${toDelete.name} had already been removed`)
      })
  }
}

const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber
  }
  const duplicateName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
  const duplicateNumber = persons.some(person => person.number.replace(/ /g, '') === newNumber.replace(/ /g, ''))
    
  if (!duplicateName) {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`${personObject.name} was sucessfully added!`, 'ok')
      })
      .catch(error => {
        notify(error.response.data.error)
      })  
  }
  else if (duplicateName && duplicateNumber) { 
    window.alert(`${newName} is already added to phonebook`)
  }
  else if (duplicateName && !duplicateNumber) {
    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const changedPerson = {...person, number: newNumber}
    const isConfirm = (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `))
      if (isConfirm) { 
        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person :response))
            notify(`${person.name}'s number was sucessfully changed!`, 'ok')
          }) 
          .catch((error) => {
            const errMessage = error.response.data.error
            if (errMessage.includes("deleted")) {
              setPersons(persons.filter(person => person.id !== changedPerson.id))
              return notify(errMessage);
            }
            notify(errMessage)
          })
      }
    } 
    setNewName('')
    setNewNumber('')  
} 

const personsToShow = searchTerm.length === 0 ?
    persons : 
    persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification notice={notification}/>
        <Filter value={searchTerm} onChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm addPerson={addPerson}
                    newName={newName}
                    newNumber={newNumber}
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange}
          />
      <h2>Numbers</h2>
        <Persons persons={personsToShow} removePerson={removePersonOf} />
    </div>
  )
}

export default App