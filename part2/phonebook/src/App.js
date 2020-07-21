//////////////////////////////////////////////////
//////   My solution with corrections
//////////////////////////////////////////////////

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
  setNotification({type,message})
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}
const handleFilterChange = (event) => {
  console.log(event.target.value)
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
        console.log('e.r.d:', error.response.data.error)
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
        console.log("outside", changedPerson, changedPerson.id)
        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            console.log("inside", changedPerson, changedPerson.id, response)
            setPersons(persons.map(person => person.id !== changedPerson.id ? person :response))
            notify(`${person.name}'s number was sucessfully changed!`, 'ok')
          }) 
          .catch((error) => {
            const errMessage = error.response.data.error
            if (errMessage.includes("deleted")) {
              setPersons(persons.filter(person => person.id !== changedPerson.id))
              return notify(errMessage);
            }
            console.log("I shouldnt run if errmessage equals Validation failed")
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


//////////////////////////////////////////////////
//////   Suggested Solution
//////////////////////////////////////////////////
/* 
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setStringFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })

  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }  
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  

  const handleFilterStringChange = (event) => {
    setStringFilter(event.target.value)
  } 

  const deletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`Deleted ${toDelete.name}`)
        }).catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`${toDelete.name} had already been removed`, 'error')
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newName)
    if (existing) {
      const ok = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`)
      if (ok) {
        personService.update(existing.id, {
          name: existing.name,
          number:newNumber
        }).then(retunedPerson => {
          setPersons(persons.map(person => person.id !== existing.id ? person : retunedPerson))
          notifyWith(`Changed number of  ${existing.name}`)
          setNewName('')
          setNewNumber('')
        })
      }

    } else {
      personService.create({
        name: newName,
        number: newNumber   
      }).then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        notifyWith(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
        console.log(error.response.data.error)
        notifyWith(`${error.response.data.error} `, 'error')
      })
    }
  }

  const personsToShow = filterString.length === 0 ?
    persons : 
    persons.filter(p => p.name.toLowerCase().indexOf(filterString.toLowerCase()) > 0 )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      filter shown with: 
      <Filter
        value={filterString}
        onChange={handleFilterStringChange}
      />

      <h3>add a new</h3>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
        addPerson={addPerson}
      />
     
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App 
 */

//////////////////////////////////////////////////
//////   2.20: The Phonebook Step11
//////////////////////////////////////////////////
/* 
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
  const [notification, setNotification] = useState(null)

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const notify = (message, type='error') => {
    setNotification({type,message})
    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification notice={notification}/>
        <Filter searchTerm={searchTerm}
                handleFilterChange={handleFilterChange} 
        />
      <h2>add a new</h2>
        <PersonForm persons={persons}
                    setPersons={setPersons}
                    newName={newName}
                    setNewName={setNewName}
                    handleNameChange={handleNameChange} 
                    newNumber={newNumber}
                    setNewNumber={setNewNumber}
                    handleNumberChange={handleNumberChange}
                    setNotification={setNotification}
                    notify={notify}
          />
      <h2>Numbers</h2>
        <Persons persons={persons}
                 setPersons={setPersons}
                 searchTerm={searchTerm}
                 setNotification={setNotification}
                 notify={notify} 
        />
    </div>
  )
}

export default App
*/