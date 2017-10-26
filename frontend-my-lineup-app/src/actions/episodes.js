import moment from 'moment';
const token = localStorage.getItem("jwtToken")
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}


function fetchingEpisodes() {
  return {
    type: "FETCHING_EPISODES"
  }
}

function fetchedMyEpisodes(episodes) {
  return {
    type: "FETCHED_MY_EPISODES",
    payload: episodes
  }
}

function fetchedShowEpisodes(episodes) {
  return {
    type: "FETCHED_SHOW_EPISODES",
    payload: episodes
  }
}

export function addEpisode(episode) {
  return function (dispatch) {
    dispatch(fetchingEpisodes())
    return fetch("http://localhost:3000/episodes", {
        method: "POST",
        headers: headers,
        'body': episode
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedMyEpisodes(json))
        })
  }
}

export function removeEpisode(id) {
  return function (dispatch) {
    dispatch(fetchingEpisodes())
    let userId = localStorage.getItem("id")
    const body = id
    return fetch(`http://localhost:3000/${userId}/user_episodes`, {
        method: "DELETE",
        headers: headers,
        'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedMyEpisodes(json))
        })
  }
}

export function fetchMyLineup(id) {
  return function(dispatch) {
    dispatch(fetchingEpisodes())
    let userId = localStorage.getItem("id")
    fetch(`http://localhost:3000/${userId}/episodes`, {
      headers: headers
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedMyEpisodes(json))
      })
  }
}

export function fetchShowEpisodes(id) {
  return function(dispatch) {
    dispatch(fetchingEpisodes())
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(res => res.json())
      .then(json => json.reverse())
        .then(json => {
          dispatch(fetchedShowEpisodes(json))
        })
  }
}
