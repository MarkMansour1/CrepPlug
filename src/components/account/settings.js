import React, { useState, useEffect } from "react"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import Loader from "../loader"
import { Settings } from "../svg"

import { getUser } from "../../services/auth"
import {
  updateUserDetails,
  updateUserEmail,
  checkUserPassword,
  updateUserPassword,
} from "../../services/settings"

const AccountSection = () => {
  const user = getUser()
  const [loading, setLoading] = useState(true)

  // Settings
  const [username, setUsername] = useState("")
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [settingResponse, setSettingResponse] = useState(null)

  // Change email
  const [email, setEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [emailResponse, setEmailResponse] = useState(null)

  // Change password
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordResponse, setPasswordResponse] = useState(null)

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
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const updateDetails = e => {
    e.preventDefault()
    setSettingResponse(null)
    setLoading(true)

    updateUserDetails(user, first, last, email).then(res => {
      if (
        res &&
        res.hasOwnProperty("first_name") &&
        res.hasOwnProperty("last_name")
      ) {
        setSettingResponse({
          success: true,
          message: "Changes saved successfully.",
        })
      } else {
        setSettingResponse(
          { success: false },
          { message: "Error. Changes not successful." }
        )
      }

      setLoading(false)
    })
  }

  const updateEmail = e => {
    e.preventDefault()
    setEmailResponse(null)
    setLoading(true)

    if (newEmail !== confirmEmail) {
      setEmailResponse({ error: true, message: "Email addresses don't match." })
      setLoading(false)
    } else {
      updateUserEmail(user, newEmail).then(res => {
        if (res) {
          if (res.email) {
            setEmailResponse({
              success: true,
              message: "Email changed successfully.",
            })
            setEmail(newEmail)
            setNewEmail("")
            setConfirmEmail("")
          } else {
            if (res.code && res.code === "rest_user_invalid_email") {
              setEmailResponse({
                success: false,
                message: "Email already in use.",
              })
            } else if (res.code && res.code === "rest_invalid_param") {
              setEmailResponse({
                success: false,
                message: "Please use a valid email address.",
              })
            } else {
              setEmailResponse({
                success: false,
                message: "Error. Changes not successful.",
              })
            }
          }
        } else {
          setEmailResponse({
            success: false,
            message: "Error. Changes not successful.",
          })
        }

        setLoading(false)
      })
    }
  }

  const updatePassword = e => {
    e.preventDefault()
    setPasswordResponse(null)
    setLoading(true)

    checkUserPassword(user, password).then(res => {
      if (res.token) {
        // TODO add proper password checks
        if (newPassword.length < 8) {
          setPasswordResponse({
            success: false,
            message: "Passwords must be at least 8 characters long.",
          })
        } else if (newPassword !== confirmPassword) {
          setPasswordResponse({
            success: false,
            message: "Passwords don't match.",
          })
        } else {
          // If new password is valid, update it
          updateUserPassword(user, newPassword).then(res => {
            if (res && res.id) {
              setPasswordResponse({
                success: true,
                message: "Your password has been changed successfully.",
              })
              setPassword("")
              setNewPassword("")
              setConfirmPassword("")
            } else {
              setPasswordResponse({
                success: false,
                message: "Error. Changes not successful.",
              })
            }
          })
        }
      } else {
        setPasswordResponse({
          success: false,
          message: "The password you entered is incorrect. Please try again.",
        })
      }

      setLoading(false)
    })
  }

  return (
    <div className="account-settings">
      <h2 className="title">
        Settings
        <Settings />
      </h2>
      <Tabs justify defaultActiveKey="settings">
        <Tab eventKey="settings" title="Account Details">
          <div className="pt-4">
            {settingResponse && (
              <div
                className={`alert alert-${
                  settingResponse.success ? "success" : "danger"
                }`}
              >
                {settingResponse.message}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-8 offset-sm-4">
                  <button
                    type="submit"
                    className="btn btn-secondary w-100"
                    disabled={loading}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Tab>
        <Tab eventKey="email" title="Change Email">
          <div className="pt-4">
            {emailResponse && (
              <div
                className={`alert alert-${
                  emailResponse.success ? "success" : "danger"
                }`}
              >
                {emailResponse.message}
              </div>
            )}
            <form onSubmit={updateEmail}>
              <div className="form-group row">
                <label
                  htmlFor="currentEmail"
                  className="col-sm-4 col-form-label"
                >
                  Current Email
                </label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    id="currentEmail"
                    name="currentEmail"
                    value={email}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="newemail" className="col-sm-4 col-form-label">
                  New Email
                </label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    id="newemail"
                    name="newemail"
                    onChange={event => setNewEmail(event.target.value)}
                    value={newEmail}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="confirmemail"
                  className="col-sm-4 col-form-label"
                >
                  Confirm Email
                </label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    id="confirmemail"
                    name="confirmemail"
                    onChange={event => setConfirmEmail(event.target.value)}
                    value={confirmEmail}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-8 offset-sm-4">
                  <button
                    type="submit"
                    className="btn btn-secondary w-100"
                    disabled={loading}
                  >
                    Change Email
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Tab>
        <Tab eventKey="password" title="Change Password">
          <div className="pt-4">
            {passwordResponse && (
              <div
                className={`alert alert-${
                  passwordResponse.success ? "success" : "danger"
                }`}
              >
                {passwordResponse.message}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-8 offset-sm-4">
                  <button
                    type="submit"
                    className="btn btn-secondary w-100"
                    disabled={loading}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AccountSection
