import moment from 'moment';
const token = localStorage.getItem("jwtToken")
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}

function fetchingShows() {
  return {
    type: "FETCHING_EXTRA_SHOWS"
  }
}

export function fetchedTrendingShows(shows) {
  return {
    type: "FETCHED_TRENDING_SHOWS",
    payload: shows
  }
}

export function fetchedWatchingShows(shows) {
  return {
    type: "FETCHED_WATCHING_SHOWS",
    payload: shows
  }
}

export function fetchedUserShows(userShows) {
  return {
    type: "FETCHED_USER_SHOWS",
    payload: userShows
  }
}

export function fetchTrendingShows() {
  return function (dispatch) {
    const body = JSON.stringify("trending")
    dispatch(fetchingShows())
    return fetch("http://localhost:3000/trending", {
        method: "POST",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedTrendingShows(json))
        })
  }
}

export function fetchWatchingShows(period) {
  return function (dispatch) {
    dispatch(fetchingShows())
    return fetch("http://localhost:3000/watching", {
        method: "POST",
        headers: headers,
        'body': period
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedWatchingShows(json))
        })
  }
}

export function rateShow(info) {
  return function (dispatch) {
    let userId = localStorage.getItem("id")
    dispatch(fetchingShows())
    return fetch(`http://localhost:3000/${userId}/ratings`, {
        method: "POST",
        headers: headers,
        'body': info
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedUserShows(json))
        })
  }
}

export function fetchUserShows() {
  return function (dispatch) {
    let userId = localStorage.getItem("id")
    dispatch(fetchingShows())
    return fetch(`http://localhost:3000/${userId}/ratings`, {
        headers: headers
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedUserShows(json))
        })
  }
}