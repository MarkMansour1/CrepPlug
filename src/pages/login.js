import React from "react"
import { Link, navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/account`)
    }

    return (
      <Layout minimal={true}>
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
          <form
            method="post"
            onSubmit={event => {
              this.handleSubmit(event)
            }}
          >
            <h2 className="text-gray-dark">Log In</h2>
            <div className="form-group">
              <label htmlFor="username">Username or Email address</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={this.handleUpdate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleUpdate}
              />
            </div>
            <Link to="/" className="text-underline">
              <small>Forgot your password?</small>
            </Link>
            <button type="submit" className="btn btn-primary w-100">
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
}

export default PageComponent
