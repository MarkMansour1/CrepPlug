import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout-minimal"
import SEO from "../components/seo"

class PageComponent extends React.Component {
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
          <form>
            <h2 className="text-gray-dark">Sign Up</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="size">Shoe Size</label>
              <input type="number" className="form-control" id="size" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
              />
            </div>
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
            <Link to="/account">
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </Link>
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
