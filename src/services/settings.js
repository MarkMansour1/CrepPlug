import { setUser } from "./auth"

export async function updateUserDetails(user, firstName, lastName, email) {
  const response = fetch(
    `${process.env.SITE_URL}/wp-json/wp/v2/users/${user.id}?first_name=${firstName}&last_name=${lastName}&email=${email}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
    .then(res => res.json())
    .then(res => {
      if (res.email) {
        user.email = res.email
        setUser(user)
      }

      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export async function updateUserPassword(user, current, password, confirm) {
  if (password.length < 8) {
    return "badpassword"
  } else if (password !== confirm) {
    return "nomatch"
  }

  const response = fetch(
    `${process.env.SITE_URL}/wp-json/jwt-auth/v1/token/?username=${user.email}&password=${current}`,
    { method: "POST" }
  )
    .then(res => res.json())
    .then(res => {
      fetch(
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
    })
    .catch(err => {
      console.log(err)
    })

  return response
}
