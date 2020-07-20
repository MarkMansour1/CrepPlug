import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  render() {
    return (
      <Layout minimal={true}>
        <SEO title="Login" />
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
            <h2 className="text-gray-dark">Login</h2>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" />
            </div>
            <Link to="/" className="text-underline">
              <small>Forgot your password?</small>
            </Link>
            <button type="submit" class="btn btn-primary w-100">
              Log In
            </button>
          </form>
        </div>
      </Layout>
    )
  }
}

export default PageComponent
