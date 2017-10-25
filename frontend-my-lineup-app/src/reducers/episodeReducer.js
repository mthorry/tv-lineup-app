function episodeReducer(state = { isFetching: false, myLineup: [], showEpisodes: []}, action) {
  switch (action.type) {

    case "FETCHING_EPISODES":
      return Object.assign({}, state, { isFetching: true})

    case "FETCHED_MY_EPISODES":
      return Object.assign({}, state, {myLineup: action.payload, isFetching: false} )

    case "FETCHED_SHOW_EPISODES":
      return Object.assign({}, state, {showEpisodes: action.payload, isFetching: false} )

    default:
      return state
  }
}


export default episodeReducer