import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("currentUser")
    ? JSON.parse(window.localStorage.getItem("currentUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("currentUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  fetch(
    `${process.env.SITE_URL}/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then(response => response.json())
    .then(data => {
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
          navigate("/account")

          return setUser({
            token: data.token,
            username: data.user_display_name,
            email: data.user_email,
            id: data.store_id,
            shareKey: res[0].share_key,
          })
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })

  return false
}

export const handleSignup = ({ username, email, password }) => {
  fetch(`${process.env.SITE_URL}/wp-json/wp/v2/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      role: `wcfm_vendor`,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })

  return false
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
        email: res.data.login.user.id,
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
  setUser({})
  callback()
}
