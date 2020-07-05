//////////////////////////////////////////////////
//////   2.19: The Phonebook Step11
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

  const setErrorMessage = message => setNotification({ type: 'error', message })


  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notification}
         />
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
                    setErrorMessage={setErrorMessage}
                    setNotification={setNotification} 
          />
      <h2>Numbers</h2>
        <Persons 
              persons={persons}
              setPersons={setPersons}
              searchTerm={searchTerm}
              setNotification={setNotification} 
        />
    </div>
  )
}

export default App


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