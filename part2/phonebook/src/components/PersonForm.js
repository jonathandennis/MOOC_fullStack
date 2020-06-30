//////////////////////////////////////////////////
//////   2.16: The Phonebook Step8
//////////////////////////////////////////////////

import React from 'react'
import personService from '../services/persons'


const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      persons.some(person => person.name.toLowerCase() === newName.toLowerCase()) ?
      window.alert(`${newName} is already added to phonebook`) :
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }                

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange} 
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm


//////////////////////////////////////////////////
//////   2.15: The Phonebook Step7
//////////////////////////////////////////////////
/* 
import React from 'react'

import axios from 'axios'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      persons.some(person => person.name.toLowerCase() === newName.toLowerCase()) ?
      window.alert(`${newName} is already added to phonebook`) :
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
           setNewName('')
           setNewNumber('')
        })                
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange} 
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
*/
//////////////////////////////////////////////////
//////   2.10: The Phonebook Step5
//////////////////////////////////////////////////

/* 
import React from 'react'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }
        persons.some(person => person.name === newName) ?
        window.alert(`${newName} is already added to phonebook`) :
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange} 
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm 
*/