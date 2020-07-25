import React from "react"
import { Link, navigate } from "gatsby"
import { Router } from "@reach/router"
import { isLoggedIn, getUser } from "../services/auth"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AccountNav from "../components/account/account-nav"
import Dashboard from "../components/account/dashboard"
import AddProduct from "../components/account/add-product"
import Products from "../components/account/products"
import Orders from "../components/account/orders"
import Settings from "../components/account/settings"

const PageComponent = () => {
  if (isLoggedIn()) {
    var user = getUser()
  } else {
    navigate("/login")
    return null
  }

  return (
    <Layout>
      <SEO title="Account" />
      <div className="container pt-5">
        <div className="row" style={{ position: "relative" }}>
          <div className="col-4" style={{ position: "sticky", top: "0" }}>
            <AccountNav user={user} />
          </div>
          <div className="col-8">
            <Router>
              <Dashboard path="account" />
              <Products path="account/products" />
              <Orders path="account/orders" />
              <Settings path="account/settings" />
              <AddProduct path="account/add-product" />
            </Router>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageComponent
