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

    const idName = personsToShow.filter(person => person.id === id)
    console.log('idName:', idName)
    const isConfirm = (window.confirm(`Delete ${ idName[0].name }?`))
        if (isConfirm) {
            personService
            .remove(id)
            .then(() => {
              setPersons(personsToShow.filter(person => person.id !== id))
              notify(`${idName[0].name}'s number was sucessfully deleted!`, 'ok')
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
        setNewName('')
        setNewNumber('')
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
        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person :response))
            notify(`${person.name}'s number was sucessfully changed!`, 'ok')
            setNewName('')
            setNewNumber('')
          })  
          .catch(error => {
            console.log('e.r.d:', error.response.data.error)
            notify(error.response.data.error)
          })
          // .catch(error => {
          //   console.log('catch error:', error)
          //   notify(`${person.name} was already deleted from server`)
          //   setPersons(persons.filter(person => person.id !== changedPerson.id))
          // })
      }
    }   
} 
  
  const personsToShow = !searchTerm
            ? persons
            : persons.filter(person => 
                person.name.toLowerCase().includes(searchTerm.toLowerCase())
            )

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification notice={notification}/>
        <Filter searchTerm={searchTerm}
                handleFilterChange={handleFilterChange} 
        />
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
//////////////////////////////////////////////////
//////   2.18: The Phonebook Step10
//////////////////////////////////////////////////
/* 
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

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


  return (
    <div>
      <h2>Phonebook</h2>
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
          />
      <h2>Numbers</h2>
      <Persons 
            persons={persons}
            setPersons={setPersons}
            searchTerm={searchTerm} 
      />
    </div>
  )
}

export default App

 */
//////////////////////////////////////////////////
//////   2.17: The Phonebook Step9
//////////////////////////////////////////////////

/* 
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

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


  return (
    <div>
      <h2>Phonebook</h2>
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
          />
      <h2>Numbers</h2>
      <Persons 
            persons={persons}
            setPersons={setPersons}
            searchTerm={searchTerm} 
      />
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.16: The Phonebook Step8
//////////////////////////////////////////////////
/* 
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
          />
      <h2>Numbers</h2>
        <Person persons={persons}
                 searchTerm={searchTerm} 
        />
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.15: The Phonebook Step7
//////////////////////////////////////////////////
/* 
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
          />
      <h2>Numbers</h2>
        <Persons persons={persons}
                 searchTerm={searchTerm} 
        />
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.11: The Phonebook Step6
//////////////////////////////////////////////////
/* 
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
          />
      <h2>Numbers</h2>
        <Persons persons={persons}
                 searchTerm={searchTerm} 
        />
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.10: The Phonebook Step5
//////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  
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

  return (
    <div>
      <h2>Phonebook</h2>
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
          />
      <h2>Numbers</h2>
        <Persons persons={persons}
                 searchTerm={searchTerm} 
        />
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.9: The Phonebook Step4
//////////////////////////////////////////////////
/* 
import React, { useState } from 'react'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons)
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

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
  
  const results = !searchTerm
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
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

  return (
    <div>
      <h2>Phonebook</h2>
        <p>filter shown with <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleFilterChange} 
                          />
        </p>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      <ul style={{ padding: 0 }}>
        {results.map(person => (
          <li key={person.id} style={{ listStyleType: "none" }}>{person.name} {person.number}</li>
        )
        )}
      </ul>
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.8: The Phonebook Step3
//////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

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

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
                    onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ padding: 0 }}>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
*/

//////////////////////////////////////////////////
//////   2.7: The Phonebook Step2
//////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
    persons.some(person => person.name === newName) ?
    window.alert(`${newName} is already added to phonebook`) :
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ padding: 0 }}>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
 */

//////////////////////////////////////////////////
//////   2.6: The Phonebook Step1
//////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
import Person from './components/Person'


const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ padding: 0 }}>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App 
*/