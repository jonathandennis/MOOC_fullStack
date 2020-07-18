//////////////////////////////////////////////////
//////   My solution with corrections
//////////////////////////////////////////////////

import React from 'react'

const Persons = ({ persons, removePerson }) => {
    

    return(
      persons.map(person=>
        <p key={person.id} style={{ padding: 0, margin: 3 }}>
          {person.name} {person.number}     <button onClick={() => removePerson(person.id)}>delete</button>
        </p>
    )
  )
}

export default Persons


//////////////////////////////////////////////////
//////   suggested solution
//////////////////////////////////////////////////
/* 
import React from 'react'

const Persons = ({ persons, deletePerson }) => {
  return (
    persons.map(person=>
      <p key={person.id}>
        {person.name} {person.number} 
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </p>
    )
  )
}

export default Persons

 */
//////////////////////////////////////////////////
//////   2.20: The Phonebook Step11
//////////////////////////////////////////////////
/* 
import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, searchTerm, notify }) => {

    const results = !searchTerm
            ? persons
            : persons.filter(person => 
                person.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
    
    const removePersonOf = (id) => {

        const idName = results.filter(person => person.id === id)
        console.log('idName:', idName)
        const isConfirm = (window.confirm(`Delete ${ idName[0].name }?`))
            if (isConfirm) {
                personService
                .remove(id)
                .then(() => {
                  setPersons(results.filter(person => person.id !== id))
                  notify(`${idName[0].name}'s number was sucessfully deleted!`, 'ok')
            })
      }
    }

    return(
        <ul style={{ padding: 0 }}>
      {results.map((person, i) =>
        <Person 
          key={i}
          person={person}
          removePerson={() => removePersonOf(person.id)}
        />
      )}
      </ul>
    )
}

export default Persons
 */

//////////////////////////////////////////////////
//////   2.18: The Phonebook Step10
//////////////////////////////////////////////////
/* 
import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, searchTerm }) => {

    const results = !searchTerm
            ? persons
            : persons.filter(person => 
                person.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
    
    const removePersonOf = (id) => {

        const idName = results.filter(person => person.id === id)
        console.log('idName:', idName)
        const isConfirm = (window.confirm(`Delete ${ idName[0].name }?`))
            if (isConfirm) {
                personService
                .remove(id)
                .then(() => {
                    setPersons(results.filter(person => person.id !== id))
            })
        //console.log('don\'t delete me!!!')
      }
    }

    return(
        <ul style={{ padding: 0 }}>
      {results.map((person, i) =>
        <Person 
          key={i}
          person={person}
          removePerson={() => removePersonOf(person.id)}
        />
      )}
      </ul>
    )
}

export default Persons
 */

//////////////////////////////////////////////////
//////   2.17: The Phonebook Step9
//////////////////////////////////////////////////
/* 
import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, searchTerm }) => {

    const results = !searchTerm
            ? persons
            : persons.filter(person => 
                person.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
    
    const removePersonOf = (id) => {

        let idName = results.filter(person => person.id === id)
        console.log('idName:', idName)
        window.confirm(`Delete ${ idName[0].name }?`)?
            
            personService
            .remove(id)
            .then(() => {
                setPersons(results.filter(person => person.id !== id))
            }):
            setPersons(persons)
            //console.log('don\'t delete me!!!')

      }

    return(
        <ul style={{ padding: 0 }}>
      {results.map((person, i) =>
        <Person 
          key={i}
          person={person}
          removePerson={() => removePersonOf(person.id)}
        />
      )}
      </ul>
    )
}

export default Persons
*/

