import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { handleLogin, isLoggedIn } from "../services/auth"

const PageComponent = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  if (isLoggedIn()) {
    navigate(`/account`)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setResponse(null)
    setLoading(true)

    handleLogin(username, password).then(res => {
      if (res && res.token) {
        setResponse({
          success: true,
          message: `Login successful. Welcome back, ${res.user_display_name}`,
        })
      } else {
        if (res.code === "[jwt_auth] invalid_username") {
          setResponse({
            success: false,
            message: "Username or email not found. Please try again.",
          })
        } else if (res.code === "[jwt_auth] incorrect_password") {
          setResponse({
            success: false,
            message: "The password you entered is incorrect. Please try again.",
          })
        } else {
          setResponse({
            success: false,
            message: "We couldn't log you in. Please try again.",
          })
        }
      }

      setLoading(false)
    })
  }

  return (
    <Layout>
      <SEO title="Login" />
      <div className="layout-minimal">
        <div className="layout-minimal-links">
          <Link to="/login" activeClassName="active-link">
            LOGIN
          </Link>
          <Link to="/signup" activeClassName="active-link">
            SIGNUP
          </Link>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <h2>Log In</h2>
          {response && (
            <div
              className={`mb-3 text-${response.success ? "success" : "danger"}`}
            >
              {response.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username or Email address</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={event => setUsername(event.target.value)}
              value={username}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={event => setPassword(event.target.value)}
              value={password}
              disabled={loading}
              required
            />
          </div>
          <Link to="/" className="text-underline">
            <small>Forgot your password?</small>
          </Link>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            Log In
          </button>
          <p className="mt-4">
            New to CrepPlug?{" "}
            <Link to="/signup" className="text-underline">
              Sign up here
            </Link>
            .
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default PageComponent
