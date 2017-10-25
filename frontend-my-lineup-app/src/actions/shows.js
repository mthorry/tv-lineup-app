import moment from 'moment';
const token = localStorage.getItem("jwtToken")
const userId = localStorage.getItem("id")


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
export function fetchedPremieres(premieres) {
  return {
    type: "FETCHED_PREMIERES",
    payload: premieres
  }
}

export function fetchedOnTonight(shows) {
  return {
    type: "FETCHED_ON_TONIGHT",
    payload: shows
  }
}

export function fetchShows(id) {
  return function(dispatch) {
    dispatch(fetchingShows())
    fetch(`http://localhost:3000/${userId}/shows`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedShows(json))
      })
  }
}

export function removeShow(id) {
  return function (dispatch) {
    const body = JSON.stringify(id)
    dispatch(fetchingShows())
    return fetch(`http://localhost:3000/${userId}/user_shows`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(addShow(json))
        })
  }
}

export function fetchPremieres() {
  return function (dispatch) {
    let d = moment(new Date()).startOf('week').format("YYYY-MM-DD")
    const body = JSON.stringify({date: d})
    return fetch("http://localhost:3000/premieres", {
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
          dispatch(fetchedPremieres(json))
        })
  }
}

export function addShow(show) {
  return function (dispatch) {
    dispatch(fetchingShows())
    const body = JSON.stringify(show)
    return fetch("http://localhost:3000/shows", {
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
          dispatch(fetchedShows(json))
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

