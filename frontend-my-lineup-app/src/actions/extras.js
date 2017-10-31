import moment from 'moment'
import baseURL from '../services/url'
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
    dispatch(fetchingTrendingShows())
    return fetch(`${baseURL}/trending`, {
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

export function fetchWatchingShows(period) {
  return function (dispatch) {
    dispatch(fetchingTrendingShows())
    return fetch(`${baseURL}/watching`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
    dispatch(fetchingTrendingShows())
    return fetch(`${baseURL}/${userId}/ratings`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
    dispatch(fetchingTrendingShows())
    return fetch(`${baseURL}/${userId}/ratings`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedUserShows(json))
        })
  }
}