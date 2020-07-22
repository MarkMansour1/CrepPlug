import React, { useState, useEffect } from "react"

const AccountSection = () => {
  const [user, setUser] = useState(0)
  const [first, setFirst] = useState(1)
  const [last, setLast] = useState(2)

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGVzaWduc3VpdGUucHJvIiwiaWF0IjoxNTk1NDEwNjA1LCJuYmYiOjE1OTU0MTA2MDUsImV4cCI6MTU5NjAxNTQwNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.G4UVrydLcSEXY165AauqjuA8QXwl9RgCLgunoV6E0_4",
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setUser(resultData.name)
        setFirst(resultData.first_name)
        setLast(resultData.last_name)
      })
  }, [])

  return (
    <div>
      <h2>Settings</h2>
      <form>
        <div className="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={event => setUser(event.target.value)}
            value={user}
          />
        </div>
        <div className="form-row">
          <div className="col-6">
            <label for="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              onChange={event => setUser(event.target.value)}
              value={first}
            />
          </div>
          <div className="col-6">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              onChange={event => setUser(event.target.value)}
              value={last}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountSection
