function showReducer(state = { isFetching: false, myShows: [], myLineup: [], showEpisodes: [], onTonight: [], premieres: []}, action) {
  switch (action.type) {

    case "REMOVE_SHOW":
      return Object.assign({}, state, {myShows: state.myShows.filter((show) => show.id !== action.payload)})

    case "FETCHED_SHOWS":
      return Object.assign({}, state, {myShows: action.payload, isFetching: false} )

    case "FETCHED_PREMIERES":
      return Object.assign({}, state, {premieres: action.payload, isFetching: false} )

    case "FETCHED_MY_EPISODES":
      return Object.assign({}, state, {myLineup: action.payload, isFetching: false} )

    case "FETCHED_SHOW_EPISODES":
      return Object.assign({}, state, {showEpisodes: action.payload, isFetching: false} )

    case "FETCHED_ON_TONIGHT":
      return Object.assign({}, state, {onTonight: action.payload, isFetching: false} )

    case "FETCHING_SHOWS":
      return Object.assign({}, state, { isFetching: true})

    default:
      return state
  }
}


export default showReducer