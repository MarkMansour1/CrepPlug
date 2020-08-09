import React from "react"
import { Link } from "gatsby"
import { handleSignup, isLoggedIn } from "../services/auth"

import Layout from "../components/layout-minimal"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  state = {
    username: ``,
    email: ``,
    password: ``,
    repeat: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleSignup(this.state)
  }

  render() {
    return (
      <Layout>
        <SEO title="Sign Up" />
        <div className="layout-minimal-links">
          <Link to="/login" activeClassName="active-link">
            LOGIN
          </Link>
          <Link to="/signup" activeClassName="active-link">
            SIGNUP
          </Link>
        </div>
        <div className="layout-minimal">
          <form
            method="post"
            onSubmit={event => {
              this.handleSubmit(event)
            }}
          >
            <h2 className="text-gray-dark">Sign Up</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={this.handleUpdate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleUpdate}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="size">Shoe Size</label>
              <input
                type="number"
                className="form-control"
                id="size"
                name="size"
                onChange={this.handleUpdate}
              />
            </div> */}
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
            {/* <div className="form-group">
              <label htmlFor="repeat">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="repeat"
                name="repeat"
                onChange={this.handleUpdate}
              />
            </div> */}
            <small>
              By creating an account you agree to our{" "}
              <Link to="/" className="text-underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/" className="text-underline">
                Privacy Policy
              </Link>
              .
            </small>
            <button type="submit" className="btn btn-primary w-100">
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
}

export default PageComponent
