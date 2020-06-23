//////////////////////////////////////////////////
//////   2.10: The Phonebook Step5
//////////////////////////////////////////////////


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