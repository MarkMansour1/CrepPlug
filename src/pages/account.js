import React from "react"
import { Link, navigate } from "gatsby"
import { Router } from "@reach/router"
import { isLoggedIn, getUser } from "../services/auth"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AccountNav from "../components/account/account-nav"
import AddProduct from "../components/account/add-product"
import Products from "../components/account/products"
import Orders from "../components/account/orders"
import OrderDetails from "../components/account/order-details"
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
        <div className="account-header">
          <div className="profile-picture">{user.username[0]}</div>
          <div className="welcome-text">
            <span>{user.username}</span>
            10 products | 3 reviews
          </div>
          <div style={{ flexGrow: 1 }} />
          <Link to="/account/add-product" className="btn btn-light">
            Add Product
            <svg
              width="1rem"
              height="1rem"
              viewBox="0 0 16 16"
              className="bi bi-plus-square ml-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
              />
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
            </svg>
          </Link>
          <div className="btn btn-light">
            Notifications
            <svg
              width="1rem"
              height="1rem"
              viewBox="0 0 16 16"
              class="bi bi-bell ml-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
              <path
                fill-rule="evenodd"
                d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
              />
            </svg>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row" style={{ position: "relative" }}>
          <div className="col-3" style={{ position: "sticky", top: "0" }}>
            <AccountNav user={user} />
          </div>
          <div className="col-9 account-wrapper">
            <Router>
              <Products path="account" />
              <Orders path="account/orders" />
              <Settings path="account/settings" />
              <AddProduct path="account/add-product" />
              <OrderDetails path="account/order/*" />
            </Router>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageComponent
