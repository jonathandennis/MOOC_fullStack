//////////////////////////////////////////////////
//////   2.14 Data for countries, step3
//////////////////////////////////////////////////

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

import axios from 'axios'

//const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // REACT_APP_API_KEY=efa31c574742709832e5ace09ac4e45b npm start
  // REACT_APP_API_KEY=a10e9256887a3ebab1c2c1e4606ffae7 npm start

  useEffect(() => {
    console.log('country effect')
    axios.get('http://restcountries.eu/rest/v2/all').then((response) => {
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
      <Filter searchTerm={searchTerm} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App

//////////////////////////////////////////////////
//////   2.12 Data for countries, step1
//////////////////////////////////////////////////

/* 
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

*/
