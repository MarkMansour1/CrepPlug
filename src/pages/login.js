import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  render() {
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
          <form>
            <h2 className="text-gray-dark">Log In</h2>
            <div class="form-group">
              <label for="email">Username or Email address</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" />
            </div>
            <Link to="/" className="text-underline">
              <small>Forgot your password?</small>
            </Link>
            <Link to="/account">
              <button type="submit" class="btn btn-primary w-100">
                Log In
              </button>
            </Link>
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
