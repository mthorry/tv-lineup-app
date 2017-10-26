import moment from 'moment';
const token = localStorage.getItem("jwtToken")
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}

function fetchingShows() {
  return {
    type: "FETCHING_SHOWS"
  }
}

function fetchedShows(shows) {
  return {
    type: "FETCHED_SHOWS",
    payload: shows
  }
}
function fetchedPremieres(premieres) {
  return {
    type: "FETCHED_PREMIERES",
    payload: premieres
  }
}

function fetchedOnTonight(shows) {
  return {
    type: "FETCHED_ON_TONIGHT",
    payload: shows
  }
}

export function fetchShows(id) {
  return function(dispatch) {
  let userId = localStorage.getItem("id")
    dispatch(fetchingShows())
    fetch(`http://localhost:3000/${userId}/shows`, {
      headers: headers
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedShows(json))
      })
  }
}

export function addShow(show) {
  return function (dispatch) {
    dispatch(fetchingShows())
    const body = JSON.stringify(show)
    return fetch("http://localhost:3000/shows", {
        method: "POST",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedShows(json))
        })
  }
}

export function removeShow(id) {
  return function (dispatch) {
    const body = JSON.stringify(id)
    dispatch(fetchingShows())
    let userId = localStorage.getItem("id")
    return fetch(`http://localhost:3000/${userId}/user_shows`, {
        method: "DELETE",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedShows(json))
        })
  }
}

export function addSuggestedShow(id) {
  return function (dispatch) {
    dispatch(fetchingShows())
    const body = JSON.stringify(id)
    return fetch("http://localhost:3000/suggested", {
        method: "POST",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(addShow(json))
        })
  }
}

export function fetchOnTonight() {
  return function(dispatch) {
    dispatch(fetchingShows())
    fetch("http://api.tvmaze.com/schedule")
      .then(res => res.json())
      .then(json => json.reverse())
        .then(json => {
          dispatch(fetchedOnTonight(json))
        })
  }
}

export function fetchPremieres() {
  return function (dispatch) {
    let d = moment(new Date()).startOf('week').format("YYYY-MM-DD")
    const body = JSON.stringify({date: d})
    return fetch("http://localhost:3000/premieres", {
        method: "POST",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedPremieres(json))
        })
  }
}

