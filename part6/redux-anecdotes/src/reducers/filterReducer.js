const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.data
      case 'SET_LIST': {
            //console.log('action.data in SET_FILTER: ', action.data)
            const anecdotesToShow = state.filter(a => a.content.toLowerCase().includes(action.data.value.toLowerCase()))
              return anecdotesToShow
          }

      default:
        return state
    }
  }

  export const setSearchTerm = (value) => {
    console.log('filter value: ', value)
      return {
          type: 'SET_FILTER',
          data: {value}
      }
  }

  export default filterReducer