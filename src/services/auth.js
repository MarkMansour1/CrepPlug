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
    `https://designsuite.pro/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then(response => response.json())
    .then(data => {
      navigate("/account")
      return setUser({
        token: data.token,
        username: data.user_display_name,
        email: data.user_email,
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
