import React, { useState, useEffect } from "react"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [username, setUsername] = useState("loading...")
  const [first, setFirst] = useState("loading...")
  const [last, setLast] = useState("loading...")
  const [email, setEmail] = useState("loading...")
  const user = getUser()

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setUsername(resultData.name)
        setFirst(resultData.first_name)
        setLast(resultData.last_name)
        setEmail(resultData.user_email)
      })
  }, [])

  return (
    <div>
      <form>
        <div class="form-group row">
          <label htmlFor="username" className="col-sm-3 col-form-label">
            Username
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={event => setUsername(event.target.value)}
              value={username}
              disabled
            />
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="firstname" className="col-sm-3 col-form-label">
            First Name
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              onChange={event => setFirst(event.target.value)}
              value={first}
            />
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="lastname" className="col-sm-3 col-form-label">
            Last Name
          </label>
          <div class="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              onChange={event => setLast(event.target.value)}
              value={last}
            />
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="email" className="col-sm-3 col-form-label">
            Email Address
          </label>
          <div class="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" class="btn btn-dark">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountSection
