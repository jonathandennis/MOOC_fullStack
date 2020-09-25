const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data


    default:
      return state
  }
}

export const setSearchTerm = (value) => {
  // console.log('filter value: ', value)
  return {
    type: 'SET_FILTER',
    data: {value}
  }
}

export default filterReducer