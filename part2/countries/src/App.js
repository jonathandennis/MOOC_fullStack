//////////////////////////////////////////////////
//////   2.12 Data for countries, step1
//////////////////////////////////////////////////

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('Countries', countries)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }
  
  return (
    <div>
      <Filter searchTerm={searchTerm}
              handleFilterChange={handleFilterChange} 
      />
      <Countries countries={countries}
                 searchTerm={searchTerm} 
      />
    </div>
  );
}

export default App;

