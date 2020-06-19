//////////////////////////////////////////////////
//////   2.8: The Phonebook Step3
//////////////////////////////////////////////////

import React from 'react';

const Person = ({ person }) => {
    return (
    <li style={{ listStyleType: "none" }}>{person.name} {person.number}</li>
    )
}

export default Person;


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