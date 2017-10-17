function showReducer(state = { isFetching: false, myShows: [], myEpisodes: [], showEpisodes: []}, action) {
  switch (action.type) {

    case "REMOVE_SHOW":
      return Object.assign({}, state, {myShows: state.myShows.filter((show) => show.id !== action.payload)})

    case "FETCHED_SHOWS":
      return Object.assign({}, state, {myShows: action.payload, isFetching: false} )

    case "FETCHED_MY_EPISODES":
      return Object.assign({}, state, {myEpisodes: action.payload, isFetching: false} )

    case "FETCHED_SHOW_EPISODES":
      return Object.assign({}, state, {showEpisodes: action.payload, isFetching: false} )

    case "SORTED_SHOW_EPISODES":
      return Object.assign({}, state, {showEpisodes: action.payload, isFetching: false} )

    case "FETCHING_SHOWS":
      return Object.assign({}, state, { isFetching: true})

    default:
      return state
  }
}


export default showReducer