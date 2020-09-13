import { setUser } from "./auth"

export async function updateUserDetails(user, firstName, lastName) {
  const response = fetch(
    `${process.env.SITE_URL}/wp-json/wp/v2/users/${user.id}?first_name=${firstName}&last_name=${lastName}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export async function updateUserEmail(user, email) {
  const response = fetch(
    `${process.env.SITE_URL}/wp-json/wp/v2/users/${user.id}?email=${email}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export async function checkUserPassword(user, password) {
  const response = fetch(
    `${process.env.SITE_URL}/wp-json/jwt-auth/v1/token/?username=${user.username}&password=${password}`,
    { method: "POST" }
  )
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export async function updateUserPassword(user, password) {
  const response = fetch(
    `${process.env.SITE_URL}/wp-json/wp/v2/users/${user.id}?password=${password}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}
