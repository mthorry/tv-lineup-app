import { fetchedShows } from './shows'

function fetchingResults() {
  return {
    type: "FETCHING_RESULTS"
  }
}


export function fetchedResults(results) {
  return {
    type: "FETCHED_RESULTS",
    payload: results
  }
}

export function clearResults() {
  return {
    type: "CLEARING_RESULTS",
  }
}


export function searchShows(search) {
  return function (dispatch) {
    dispatch(fetchingResults())
    const body = JSON.stringify(search)
    return fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedResults(json))
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
