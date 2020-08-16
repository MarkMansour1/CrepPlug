import React, { useState, useEffect } from "react"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [username, setUsername] = useState("loading...")
  const [first, setFirst] = useState("loading...")
  const [last, setLast] = useState("loading...")
  const [email, setEmail] = useState("loading...")
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wp/v2/users/me`, {
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
    <div className="account-settings">
      <h2 className="d-flex align-items-center justify-content-between">
        Settings
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-layout-text-window-reverse"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
          ></path>
        </svg>
      </h2>
      <form>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-4 col-form-label">
            Username
          </label>
          <div className="col-sm-8">
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
        <div className="form-group row">
          <label htmlFor="firstname" className="col-sm-4 col-form-label">
            First Name
          </label>
          <div className="col-sm-8">
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
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-4 col-form-label">
            Last Name
          </label>
          <div className="col-sm-8">
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
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-4 col-form-label">
            Email Address
          </label>
          <div className="col-sm-8">
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
        <div className="form-group row">
          <div className="col-sm-8 offset-sm-4">
            <button type="submit" className="btn btn-secondary w-100">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountSection
