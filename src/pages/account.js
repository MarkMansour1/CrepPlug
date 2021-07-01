import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { Router } from "@reach/router"
import { isLoggedIn, getUser, isBrowser } from "../services/auth"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Dashboard from "../components/account/dashboard"
import AccountNav from "../components/account/account-nav"
import Products from "../components/account/products"
import Transactions from "../components/account/transactions"
import OrderDetails from "../components/account/order-details"
import Messages from "../components/account/messages"
import MessageDetails from "../components/account/message-details"
import Settings from "../components/account/settings"
import Reviews from "../components/account/reviews"

const PageComponent = () => {
  if (isBrowser()) {
    if (isLoggedIn()) {
      var user = getUser()
    } else {
      const url = typeof window !== "undefined" ? window.location.search : ""
      navigate("/login")
      return null
    }
  }

  return (
    <Layout>
      <SEO title="Account" />
      <div className="container pt-5">
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <AccountNav user={user} />
          </div>
          <div className="col-12 col-md-9 account-wrapper">
            <Router>
              {/* <Dashboard path="/account" /> */}
              <Products path="account" />
              <Messages path="account/messages" />
              <MessageDetails path="account/message/*" />
              <Transactions path="account/transactions" />
              <OrderDetails path="account/order/*" />
              <Settings path="account/settings" />
              {/* <Reviews path="account/reviews" /> */}
            </Router>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageComponent
