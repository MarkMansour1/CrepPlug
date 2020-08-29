import React, { useState, useEffect } from "react"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import { Settings } from "../svg"

import { getUser } from "../../services/auth"
import { updateUserDetails, updateUserPassword } from "../../services/settings"

const AccountSection = () => {
  const user = getUser()

  // Settings
  const [username, setUsername] = useState("loading...")
  const [first, setFirst] = useState("loading...")
  const [last, setLast] = useState("loading...")
  const [email, setEmail] = useState("loading...")
  const [settingResponse, setSettingResponse] = useState(null)

  // Change password
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordResponse, setPasswordResponse] = useState(null)

  const errorMessages = [
    "Error. Changes not successful.",
    "Please use a valid email address.",
    "Email address already in use.",
    "New password must be at least 8 characters in length.",
    "Passwords don't match.",
    "Incorrect password.",
  ]

  useEffect(() => {
    // Add paypal connect button to site
    const script = document.createElement("script")
    script.src = (function (d, s, id) {
      var js,
        ref = d.getElementsByTagName(s)[0]
      if (!d.getElementById(id)) {
        js = d.createElement(s)
        js.id = id
        js.async = true
        js.src =
          "https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js"
        ref.parentNode.insertBefore(js, ref)
      }
    })(document, "script", "paypal-js")
    script.async = true
    document.body.appendChild(script)

    // Get user details from wordpress
    fetch(`${process.env.SITE_URL}/wp-json/wp/v2/users/${user.id}`, {
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
      .catch(err => {
        console.log(err)
      })
  }, [])

  const updateDetails = e => {
    e.preventDefault()

    updateUserDetails(user, first, last, email).then(res => {
      if (res) {
        if (res.data && res.data.status && res.data.status === 400) {
          if (res.code === "rest_user_invalid_email") {
            // Email already in use
            setSettingResponse(2)
          } else if (res.code === "rest_invalid_param") {
            // Invalid email
            setSettingResponse(1)
          } else {
            // Error
            setSettingResponse(0)
          }
        } else {
          // Success
          setSettingResponse(-1)
        }
      } else {
        // Other error
        setSettingResponse(0)
      }
    })
  }

  const updatePassword = e => {
    e.preventDefault()

    updateUserPassword(user, password, newPassword, confirmPassword).then(
      res => {
        if (res) {
          if (res === "badpassword") {
            // New password isnt strong enough
            setPasswordResponse(3)
          } else if (res === "nomatch") {
            // Passwords don't match
            setPasswordResponse(4)
          } else {
            if (res.data && res.data.status == 403) {
              // Wrong current password
              setPasswordResponse(5)
            } else {
              // Success
              setPasswordResponse(-1)
            }
          }
        } else {
          // Other error
          setPasswordResponse(0)
        }
      }
    )
  }

  return (
    <div className="account-settings">
      <h2 className="title">
        Settings
        <Settings />
      </h2>
      <Tabs justify defaultActiveKey="settings" transition={false}>
        <Tab eventKey="settings" title="Account Details">
          <div className="pt-4">
            {settingResponse && (
              <div
                className={`alert alert-${
                  settingResponse === -1 ? "success" : "danger"
                }`}
              >
                {settingResponse === -1
                  ? " Changes saved successfully."
                  : errorMessages[settingResponse]}
              </div>
            )}

            <form onSubmit={updateDetails}>
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
        </Tab>
        <Tab eventKey="password" title="Change Password">
          <div className="pt-4">
            {passwordResponse === 1 && (
              <div className="alert alert-success">
                Password changed successfully.
              </div>
            )}
            {passwordResponse === 2 && (
              <div className="alert alert-danger">
                New password must be at least 8 characters in length.
              </div>
            )}
            {passwordResponse === 3 && (
              <div className="alert alert-danger">Passwords don't match.</div>
            )}
            {passwordResponse === 3 && (
              <div className="alert alert-danger">Incorrect password.</div>
            )}
            {passwordResponse === 5 && (
              <div className="alert alert-danger">
                Error. Changes not successful.
              </div>
            )}
            <form onSubmit={updatePassword}>
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
                <label
                  htmlFor="newpassword"
                  className="col-sm-4 col-form-label"
                >
                  New Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    id="newpassword"
                    name="newpassword"
                    onChange={event => setNewPassword(event.target.value)}
                    value={newPassword}
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
                    onChange={event => setConfirmPassword(event.target.value)}
                    value={confirmPassword}
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
          </div>
        </Tab>
        <Tab eventKey="payment" title="Payment">
          <div className="text-center pt-3">
            <h3>Connect your paypal</h3>
            <a
              href="https://www.sandbox.paypal.com/us/merchantsignup/partner/onboardingentry?token=NDVjN2Q4OGEtNDQxNS00NjNiLWEwZjItYmMwNTdhMDdmNWJmMFhuRFMranpyV2NHWnJOSVNLS1d5MThLVmVzR1R1c0VZSElzYks1Mk1rbz12Mg=="
              className="btn btn-primary"
            >
              Connect your PayPal
            </a>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AccountSection
