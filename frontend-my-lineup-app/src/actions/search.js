import baseURL from '../services/url'

export function fetchingResults() {
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
    const token = localStorage.getItem("jwtToken")
    const body = JSON.stringify({search: search})
    return fetch(`${baseURL}/search`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedResults(json))
        })
  }

}

