//////////////////////////////////////////////////
//////   My solution with corrections
//////////////////////////////////////////////////

import React from 'react'

const PersonForm = (props) => {
      
    
    return (
        <form onSubmit={props.addPerson}>
        <div>
          name: <input 
                  value={props.newName}
                  onChange={props.handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange} 
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
//////   suggested solution
//////////////////////////////////////////////////
/* 
import React from 'react'

const PersonForm = (props) => {

  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: 
        <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number:
        <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}          
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
//////   2.20: The Phonebook Step11
//////////////////////////////////////////////////
/* 
import React from 'react'
import personService from '../services/persons'


const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, notify, handleNameChange, handleNumberChange }) => {

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
            notify(`${personObject.name} was sucessfully added!`, 'ok')
            setPersons(persons.concat(returnedPerson))
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
                notify(`${person.name}'s number was sucessfully changed!`, 'ok')
                setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))})   
              .catch(error => {
                console.log('catch error:', error)
                notify(`${person.name} was already deleted from server`)
                setPersons(persons.filter(person => person.id !== changedPerson.id))
              })
          }
        } 
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

//////////////////////////////////////////////////
//////   2.18: The Phonebook Step10
//////////////////////////////////////////////////
/* 
import React from 'react'
import personService from '../services/persons'


const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      const duplicateName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
      const duplicateNumber = persons.some(person => person.number.replace(/ /g, '') === newNumber.replace(/ /g, ''))
      console.log('duplicateName:', duplicateName)

      if (!duplicateName) {
        personService
          .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          })
      }
      else if (duplicateName && duplicateNumber) { 
        window.alert(`${newName} is already added to phonebook`)
      }
      else if (duplicateName && !duplicateNumber) {
        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = {...person, number: newNumber}
        console.log('person in else/if:', person)
        console.log('changedPerson in else/if:', changedPerson)
        const isConfirm = (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `))
          if (isConfirm) { 
                personService
                .update(changedPerson.id, changedPerson)
                .then(response => {
                  setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))})       
          }
        } 
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

//////////////////////////////////////////////////
//////   2.17: The Phonebook Step9
//////////////////////////////////////////////////
/* 
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
 */

//////////////////////////////////////////////////
//////   2.16: The Phonebook Step8
//////////////////////////////////////////////////
/* 
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
*/

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