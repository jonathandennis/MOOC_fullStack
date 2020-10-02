import React, { useState, useEffect } from 'react'


import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
    console.log('country effect')
    axios
      .get(`http://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        console.log('promise fulfilled')
        setCountry({ country: response.data[0], found: true })
      })
      .catch(error => {
        if (error.response.status === 404)
        setCountry({found: false})
      })
  }}, [name])
  
  return country
}

const Country = ({ country }) => {

  if (!country) {
    return null
  } else if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )} 
    return (
      <div>
        <h3>{country.country.name} </h3>
        <div>capital {country.country.capital} </div>
        <div>population {country.country.population}</div> 
        <img src={country.country.flag} height='100' alt={`flag of ${country.country.name}`}/>  
      </div>
    )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App