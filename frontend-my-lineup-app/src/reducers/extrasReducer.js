function extrasReducer(state = { trending: [], ratings: [], watching: [], isFetching: false}, action) {
  switch (action.type) {

    case "FETCHED_TRENDING_SHOWS":
      return Object.assign({}, state, {trending: action.payload, isFetching: false} )

    case "FETCHED_WATCHING_SHOWS":
      return Object.assign({}, state, {watching: action.payload, isFetching: false} )

    case "FETCHING_TRENDING_SHOWS":
      return Object.assign({}, state, { isFetching: true})

    case "FETCHED_USER_SHOWS":
      return Object.assign({}, state, { ratings: action.payload, isFetching: false})

    default:
      return state
  }
}


export default extrasReducer