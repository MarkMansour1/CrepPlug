import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  render() {
    return (
      <Layout minimal={true}>
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
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" />
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
              <label for="size">Shoe Size</label>
              <input type="number" class="form-control" id="size" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" />
            </div>
            <div class="form-group">
              <label for="password">Confirm Password</label>
              <input type="password" class="form-control" id="password" />
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
              <button type="submit" class="btn btn-primary w-100">
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
