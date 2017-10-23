import moment from 'moment';
const token = localStorage.getItem("jwtToken")
const userId = localStorage.getItem("id")

function fetchingTrendingShows() {
  return {
    type: "FETCHING_TRENDING_SHOWS"
  }
}

export function fetchedTrendingShows(shows) {
  return {
    type: "FETCHED_TRENDING_SHOWS",
    payload: shows
  }
}

export function fetchTrendingShows() {
  return function (dispatch) {
    const body = JSON.stringify("trending")
    dispatch(fetchingTrendingShows())
    return fetch("http://localhost:3000/trending", {
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
          dispatch(fetchedTrendingShows(json))
        })
  }
}