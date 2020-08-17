import React, { useState, useEffect } from "react"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import { getUser } from "../../services/auth"
import { Settings } from "../svg"

const AccountSection = () => {
  // Settings
  const [username, setUsername] = useState("loading...")
  const [first, setFirst] = useState("loading...")
  const [last, setLast] = useState("loading...")
  const [email, setEmail] = useState("loading...")

  // Change password
  const [password, setPassword] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

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
      <h2 className="title">
        Settings
        <Settings />
      </h2>
      <Tabs justify defaultActiveKey="settings" transition={false}>
        <Tab eventKey="settings" title="Account Details">
          <form className="pt-4">
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
        </Tab>
        <Tab eventKey="password" title="Change Password">
          <form className="pt-4">
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-4 col-form-label">
                Current Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="newpassword" className="col-sm-4 col-form-label">
                New Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="newpassword"
                  name="newpassword"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="confirmpassword"
                className="col-sm-4 col-form-label"
              >
                Confirm New Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  name="confirmpassword"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-8 offset-sm-4">
                <button type="submit" className="btn btn-secondary w-100">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </Tab>
        <Tab eventKey="payment" title="Payment">
          <div className="text-center pt-3">
            <h3>Connect your paypal</h3>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AccountSection
