//////////////////////////////////////////////////
//////   2.12-2.14 Data for countries, step1-3
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