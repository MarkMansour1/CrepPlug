import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AccountNav from "../components/account/nav"
import AddProduct from "../components/account/add-product"
import Products from "../components/account/products"
import Orders from "../components/account/orders"
import Settings from "../components/account/settings"

const PageComponent = () => {
  return (
    <Layout>
      <SEO title="Account" />
      <div className="container container-wide pt-5">
        <div className="row" style={{ position: "relative" }}>
          <div className="col-4" style={{ position: "sticky", top: "0" }}>
            <AccountNav />
          </div>
          <div className="col-8">
            <Router>
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
