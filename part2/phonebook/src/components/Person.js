import React from 'react';

const Person = ({ person }) => {
    return (
        <li style={{ listStyleType: "none" }}>{person.name}</li>
    )
}

export default Person;