//////////////////////////////////////////////////
//////   2.13 Data for countries, step2
//////////////////////////////////////////////////


import React from 'react'

const Countries = ({ countries, searchTerm, setSearchTerm }) => {
    
    const countriesToShow = !searchTerm
        ? countries
        :countries.filter(country => 
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (countriesToShow.length === 1) {
            //console.log('countriesToShow[0]:', countriesToShow[0])
            return (
                <div>
                    <h1>{countriesToShow[0].name}</h1>
                    <p>capital {countriesToShow[0].capital}</p>
                    <p>population {countriesToShow[0].population}</p>
                    <h3>languages</h3>
                    <ul>
                        {countriesToShow[0].languages.map(language => (
                            <li key={language.name}>{language.name}</li>
                        ))} 
                    </ul>
                    <img width="100" height="100" src={countriesToShow[0].flag} alt={countriesToShow[0].name}/> 
                </div>
            )
        }

        if (countriesToShow.length > 1 && countriesToShow.length < 10) {
            
            return (
                <div>
                    <ul style={{ padding: 0 }}>
                        {countriesToShow.map(country => (
                            <li onClick={() => setSearchTerm(country.name)} key={country.numericCode} style={{ listStyleType: "none" }} >{country.name} <button type="submit">show</button></li>
                        )
                        )}
                    </ul>
                </div>
            )
        }

        if (searchTerm === '') {
            return ('')
        }
     
        return (
            <p>Too many matches, specify another filter</p>
        )
}

export default Countries


//////////////////////////////////////////////////
//////   2.12 Data for countries, step1
//////////////////////////////////////////////////
/* 
import React from 'react'

const Countries = ({ countries, searchTerm }) => {
    
    const countriesToShow = !searchTerm
        ? countries
        :countries.filter(country => 
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        console.log('countries to show:', countriesToShow)

        if (countriesToShow.length === 1) {
            console.log('countriesToShow[0]:', countriesToShow[0])
            return (
                <div>
                    <h1>{countriesToShow[0].name}</h1>
                    <p>capital {countriesToShow[0].capital}</p>
                    <p>population {countriesToShow[0].population}</p>
                    <h3>languages</h3>
                    <ul>
                        {countriesToShow[0].languages.map(language => (
                            <li key={language.name}>{language.name}</li>
                        ))} 
                    </ul>
                    <img width="100" height="100" src={countriesToShow[0].flag} alt={countriesToShow[0].name}/> 
                </div>
            )
        }

        if (countriesToShow.length > 1 && countriesToShow.length < 10) {
            return (
                <ul style={{ padding: 0 }}>
                    {countriesToShow.map(country => (
                    <li key={country.numericCode} style={{ listStyleType: "none" }}>{country.name}</li>
                    )
                    )}
                </ul>
            )
        }

        if (searchTerm === '') {
            return ('')
        }
     
        return (
            <p>Too many matches, specify another filter</p>
        )
}

export default Countries

*/