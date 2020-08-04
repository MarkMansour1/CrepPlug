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
          <Link to="/account/messages" className="btn btn-light">
            Inbox
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-envelope ml-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
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
          <div className="col-9 pl-5 pt-3">
            <Router>
              <Products path="account" />
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
