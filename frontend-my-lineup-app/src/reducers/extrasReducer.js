function extrasReducer(state = { trending: [], popular: []}, action) {
  switch (action.type) {

    case "FETCHED_TRENDING_SHOWS":
      return Object.assign({}, state, {trending: action.payload, isFetching: false} )

    case "FETCHING_TRENDING_SHOWS":
      return Object.assign({}, state, { isFetching: true})

    default:
      return state
  }
}


export default extrasReducer