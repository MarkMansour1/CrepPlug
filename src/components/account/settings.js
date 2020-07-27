import React, { useState, useEffect } from "react"

const AccountSection = () => {
  const [user, setUser] = useState("")
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: ` "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGVzaWduc3VpdGUucHJvIiwiaWF0IjoxNTk1NDEwNjA1LCJuYmYiOjE1OTU0MTA2MDUsImV4cCI6MTU5NjAxNTQwNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.G4UVrydLcSEXY165AauqjuA8QXwl9RgCLgunoV6E0_4"`,
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setUser(resultData.name)
        setFirst(resultData.first_name)
        setLast(resultData.last_name)
        setEmail(resultData.email)
      })
  }, [])

  return (
    <div>
      <form>
        <div class="form-group row">
          <label htmlFor="username" className="col-sm-3 col-form-label">
            Username
          </label>
          <div class="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={event => setUser(event.target.value)}
              value={user}
            />
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="firstname" className="col-sm-3 col-form-label">
            First Name
          </label>
          <div class="col-sm-8">
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
          <div class="col-sm-8">
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
          <div class="col-sm-8">
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
        <button type="submit" class="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default AccountSection
