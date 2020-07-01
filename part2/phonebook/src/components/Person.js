//////////////////////////////////////////////////
//////   2.17: The Phonebook Step9
//////////////////////////////////////////////////

import React from 'react'

const Person = ({ person, removePerson }) => {
    

    return (
            <li style={{ listStyleType: "none" }}>
                {person.name} {person.number}   <button onClick={removePerson}> delete </button>
            </li>
    )
}

export default Person


//////////////////////////////////////////////////
//////   2.10: The Phonebook Step5
//////////////////////////////////////////////////
/* 
import React from 'react'

const Person = ({ persons, searchTerm }) => {
    
    const results = !searchTerm
        ? persons
        : persons.filter(person => 
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <ul style={{ padding: 0 }}>
            {results.map(person => (
            <li key={person.id} style={{ listStyleType: "none" }}>{person.name} {person.number}</li>
            )
            )}
      </ul>
    )
}

export default Person
*/

//////////////////////////////////////////////////
//////   2.9: The Phonebook Step4
//////////////////////////////////////////////////

// Due to issues I was having getting the search function to work I decided to reintroduce this component back into the app component for this exercise as it was not needed/required here.

//////////////////////////////////////////////////
//////   2.8: The Phonebook Step3
//////////////////////////////////////////////////
/* 
import React from 'react';

const Person = ({ person }) => {
    return (
    <li style={{ listStyleType: "none" }}>{person.name} {person.number}</li>
    )
}

export default Person;
*/

//////////////////////////////////////////////////
//////   2.6: The Phonebook Step1
//////////////////////////////////////////////////

/* import React from 'react';

const Person = ({ person }) => {
    return (
        <li style={{ listStyleType: "none" }}>{person.name}</li>
    )
}

export default Person; 
*/