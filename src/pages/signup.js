import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { handleLogin, handleSignup, isLoggedIn } from "../services/auth"

const PageComponent = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setRepeat] = useState("")

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  if (isLoggedIn()) {
    navigate(`/account`)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setResponse(null)
    setLoading(true)

    // TODO add password validation
    if (password !== confirm) {
      setResponse({
        success: false,
        message: "Passwords don't match.",
      })
      setLoading(false)
    } else {
      handleSignup(username, email, password).then(res => {
        if (res && res.id) {
          setResponse({
            success: true,
            message: `Sign up successful. Welcome, ${username}`,
          })
        } else {
          if (
            res.message ===
            "Username already exists, please enter another username"
          ) {
            setResponse({
              success: false,
              message:
                "Username already exists, please enter another username.",
            })
          } else if (
            res.message === "Email already exists, please try 'Reset Password'"
          ) {
            setResponse({
              success: false,
              message: "Email already exists, please enter another email.",
            })
          } else {
            setResponse({
              success: false,
              message: "We couldn't sign you up. Please try again.",
            })
          }
        }

        setLoading(false)
      })
    }
  }

  return (
    <Layout>
      <SEO title="Sign Up" />
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
          <h2>Sign Up</h2>
          {response && (
            <div
              className={`mb-3 text-${response.success ? "success" : "danger"}`}
            >
              {response.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={event => setEmail(event.target.value)}
              value={email}
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
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm"
              name="confirm"
              onChange={event => setRepeat(event.target.value)}
              value={confirm}
              disabled={loading}
              required
            />
          </div>
          <small>
            By creating an account you agree to our{" "}
            <a
              href="/terms-of-service"
              className="text-underline"
              target="_blank"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              className="text-underline"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </small>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            Sign Up
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-underline">
              Log in here.
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default PageComponent
