import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AccountNav from "../components/account/nav"
import Products from "../components/account/products"

const PageComponent = () => (
  <Layout>
    <SEO title="Account" />
    <div className="container container-wide pt-5">
      <div className="row">
        <div className="col-4">
          <AccountNav />
        </div>
        <div className="col-8">
          <Router>
            <Products path="account/products" />
          </Router>
        </div>
      </div>
    </div>
  </Layout>
)

export default PageComponent
