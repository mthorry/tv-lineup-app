import baseURL from '../../services/url'

export function loginUser(loginParams){
  const body = JSON.stringify(loginParams)
  return fetch(`${baseURL}/login`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
      }
    })
      .then((res) => {
        return res.json()
      }
     )
}

export function signupUser(signupParams){
  const body = JSON.stringify(signupParams)
  return fetch(`${baseURL}/signup`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
      }
    })
      .then((res) => {
        return res.json()
      }
     )
}