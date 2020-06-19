//////////////////////////////////////////////////
//////   2.8: The Phonebook Step3
//////////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-1234567',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  }
]


ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
);


//////////////////////////////////////////////////
//////   2.7: The Phonebook Step2
//////////////////////////////////////////////////

/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
  {
    id: 1,
    name: 'Arto Hellas'
  },
  {
    id: 2,
    name: 'Ada Lovelace'
  },
]

//console.log(persons.includes('Ada Lovelace'))

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
);
 */

//////////////////////////////////////////////////
//////   2.6: The Phonebook Step1
//////////////////////////////////////////////////

/* 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
  {
    id: 1,
    name: 'Arto Hellas'
  },
  {
    id: 2,
    name: 'Ada Lovelace'
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
); 
*/