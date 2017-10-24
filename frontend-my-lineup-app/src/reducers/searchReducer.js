function searchReducer(state = { results: [], isFetching: false}, action) {
  switch (action.type) {

    case "FETCHED_RESULTS":
      return Object.assign({}, state, {results: action.payload, isFetching: false} )

    case "FETCHING_RESULTS":
      return Object.assign({}, state, { isFetching: true})

    case "CLEARING_RESULTS":
      return Object.assign({}, state, { results: []})

    default:
      return state
  }
}


export default searchReducer