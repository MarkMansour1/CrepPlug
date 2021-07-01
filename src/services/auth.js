import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () => {
  if (isBrowser() && window.localStorage.getItem("currentUser")) {
    let user = JSON.parse(window.localStorage.getItem("currentUser"))

    if (new Date() > Date.parse(user.expiration)) {
      user = {}
    }

    return user
  } else {
    return {}
  }
}

export const setUser = user =>
  window.localStorage.setItem("currentUser", JSON.stringify(user))

export async function handleLogin(username, password) {
  // Set expiration one week from now
  var today = new Date()
  var expirationDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  )

  // Login to wordpress in the background
  typeof window !== "undefined" &&
    window.open(
      `${process.env.SITE_URL}/?tuser=${username}&tpass=${password}`,
      "_blank",
      "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none"
    )

  const response = fetch(
    `${process.env.SITE_URL}/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then(response => response.json())
    .then(data => {
      setUser({
        token: data.token,
        username: data.user_display_name,
        id: data.store_id,
        expiration: expirationDate,
      })

      fetch(
        `${process.env.SITE_URL}/wp-json/wc/v3/wishlist/get_by_user/${data.store_id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
        .then(res => res.json())
        .then(res => {
          return setUser({
            token: data.token,
            username: data.user_display_name,
            id: data.store_id,
            shareKey: res[0].share_key,
            expiration: expirationDate,
          })
        })
        .catch(err => {
          console.log(err)
        })

      return data
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export async function handleSignup(username, email, password) {
  const response = fetch(
    `${process.env.SITE_URL}/wp-json/wp/v2/users/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: `wcfm_vendor`,
      }),
    }
  )
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export const handleLoginGraphql = ({ username, password }) => {
  fetch(`${process.env.SITE_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation LoginUser {
        login(input: {
          clientMutationId: "uniqueId",
          username: "${username}",
          password: "${password}"
        }) {
          authToken
            user {
              id
              name
            }
          }
        }`,
    }),
  })
    .then(res => res.json())
    .then(res => {
      navigate("/account")
      return setUser({
        token: res.data.login.authToken,
        username: res.data.login.user.name,
      })
    })
    .catch(err => {
      console.log(err)
    })

  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  // Logout of wordpress in the background
  typeof window !== "undefined" &&
    window.open(
      `${process.env.SITE_URL}/?tlogout=true`,
      "_blank",
      "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none"
    )

  setUser({})
  callback()
}
