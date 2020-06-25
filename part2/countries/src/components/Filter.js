//////////////////////////////////////////////////
//////   2.12 Data for countries, step1
//////////////////////////////////////////////////

import React from 'react'

const Filter = ({ searchTerm, handleFilterChange }) => {
    return (
        <p>find countries <input type="text"
                                 placeholder="Search"
                                 value={searchTerm}
                                 onChange={handleFilterChange} 
                            />
        </p>
    )
}

export default Filter