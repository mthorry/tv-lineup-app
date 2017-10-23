export function loginUser(loginParams){
  const body = JSON.stringify(loginParams)
  return fetch("http://localhost:3000/login", {
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
  return fetch("http://localhost:3000/signup", {
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