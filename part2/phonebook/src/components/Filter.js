//////////////////////////////////////////////////
//////   My solution with corrections
//////////////////////////////////////////////////

import React from 'react'

const Filter = (props) => {
    
    return (
        <p>filter shown with <input type="text"
                                    placeholder="Search"
                                    value={props.searchTerm}
                                    onChange={props.handleFilterChange} 
                                    />
        </p>
    )
}

export default Filter 


//////////////////////////////////////////////////
//////   suggested solution
//////////////////////////////////////////////////
/* 
import React from 'react'

const Filter = (props) => {

    return (
      <input
      value={props.value}
      onChange={props.onChange}
      />
    )
}

export default Filter
 */
//////////////////////////////////////////////////
//////   2.10: The Phonebook Step5
//////////////////////////////////////////////////
/* 
import React from 'react'

const Filter = ({ searchTerm, handleFilterChange }) => {
    
    return (
        <p>filter shown with <input type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleFilterChange} 
                                    />
        </p>
    )
}

export default Filter 
*/