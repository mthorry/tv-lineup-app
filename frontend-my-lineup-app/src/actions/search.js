const token = localStorage.getItem("jwtToken")
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}


function fetchingResults() {
  return {
    type: "FETCHING_RESULTS"
  }
}


function fetchedResults(results) {
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
    const body = JSON.stringify({search: search})
    return fetch("http://localhost:3000/search", {
        method: "POST",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedResults(json))
        })
  }

}

