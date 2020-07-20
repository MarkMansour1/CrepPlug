import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PageComponent = () => (
  <Layout>
    <SEO title="Account" />
    <div className="container pt-5">
      <div className="row">
        <div className="col-4">
          <div className="account-nav-header">
            <h2>Account</h2>
          </div>
          <div className="account-nav">
            <div className="account-link">
              <div>icon</div>
              <Link to="/account">Dashboard</Link>
            </div>
            <div className="account-link">
              <div>icon</div>
              <Link to="/account">Dashboard</Link>
            </div>
            <div className="account-link">
              <div>icon</div>
              <Link to="/account">Dashboard</Link>
            </div>
            <div className="account-link">
              <div>icon</div>
              <Link to="/account">Dashboard</Link>
            </div>
            <div className="account-link">
              <div>icon</div>
              <Link to="/account">Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <h2>Dashboard</h2>
        </div>
      </div>
    </div>
  </Layout>
)

export default PageComponent
