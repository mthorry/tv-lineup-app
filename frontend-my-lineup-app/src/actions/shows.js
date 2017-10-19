import { fetchingResults } from './search'

function fetchingShows() {
  return {
    type: "FETCHING_SHOWS"
  }
}

export function fetchedShows(shows) {
  return {
    type: "FETCHED_SHOWS",
    payload: shows
  }
}

export function fetchedEpisodes(episodes) {
  return {
    type: "FETCHED_MY_EPISODES",
    payload: episodes
  }
}

export function fetchedShowEpisodes(episodes) {
  return {
    type: "FETCHED_SHOW_EPISODES",
    payload: episodes
  }
}

export function sortedEpisodes(episodes) {
  return {
    type: "SORTED_SHOW_EPISODES",
    payload: episodes
  }
}

export function sortEpisodes(episodes) {
  return function (dispatch) {
    dispatch(fetchingShows())
    let eps = episodes.reverse()
    dispatch(sortedEpisodes(eps))
 }
}

export function fetchShows(id) {
  return function(dispatch) {
    dispatch(fetchingShows())
    fetch(`http://localhost:3000/${id}/shows`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedShows(json))
      })
  }
}

export function removeShow(id) {
  return function (dispatch) {
    dispatch(fetchingShows())
    const body = JSON.stringify(id)
    return fetch("http://localhost:3000/shows", {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedShows(json))
        })
  }
}

export function addEpisode(episode) {
  return function (dispatch) {
    dispatch(fetchingShows())
    const body = episode
    return fetch("http://localhost:3000/episodes", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedEpisodes(json))
        })
  }
}

export function removeEpisode(id) {
  return function (dispatch) {
    dispatch(fetchingShows())
    const body = id
    return fetch("http://localhost:3000/episodes", {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedEpisodes(json))
        })
  }
}

export function fetchMyLineup(id) {
  return function(dispatch) {
    dispatch(fetchingShows())
    fetch(`http://localhost:3000/${id}/episodes`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedEpisodes(json))
      })
  }
}

export function fetchShowEpisodes(id) {
  return function(dispatch) {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(res => res.json())
      .then(json => json.reverse())
        .then(json => {
          dispatch(fetchedShowEpisodes(json))
        })
  }
}

export function addSuggestedShow(id) {
  return function (dispatch) {
    const body = JSON.stringify(id)
    return fetch("http://localhost:3000/suggested", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(addShow(json))
        })
  }

}

export function addShow(show) {
  return function (dispatch) {
    dispatch(fetchingResults())
    const body = JSON.stringify(show)
    return fetch("http://localhost:3000/shows", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedShows(json))
        })
  }

}
