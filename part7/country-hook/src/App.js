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
  console.log('name in useCountry: ', name)

  useEffect(() => {
    if (name) {
    console.log('country effect')
    axios
      .get(`http://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data[0])
        console.log('response.data[0]: ', response.data[0])
        console.log('render', response.data.length, 'country')
      })
      .catch(error => {
        if (error.response.status === 404)
        setCountry('none')
      })
  }}, [name])
  console.log('country in useEffect: ', country)
  
  return country
}

const Country = ({ country }) => {
  console.log('country in Country: ', country)
  console.log('!country', !country)
  if (!country) {
    return null
  } else if (country === 'none') {
    console.log('!country.found: ', !country.found)
    return (
      <div>
        not found...
      </div>
    )
  } return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  console.log('nameInput: ', nameInput)

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