import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, logout } from "../../services/auth"

import {
  AddProduct,
  Products,
  Orders,
  Messages,
  Settings,
  Reviews,
  Logout,
} from "../svg"

class AccountNav extends React.Component {
  render() {
    const user = getUser()

    return (
      <>
        <div className="profile-picture">{user.username[0]}</div>
        <div className="welcome-text">
          <span>{user.username}</span>
          {user.email}
          {/* 10 products | 3 reviews */}
        </div>
        <div className="account-nav">
          <Link activeClassName="active" to="/account/add-product">
            <AddProduct />
            <div>Dashboard</div>
          </Link>
          <Link activeClassName="active" to="/account">
            <Products />
            <div>Products</div>
          </Link>
          <Link activeClassName="active" to="/account/messages">
            <Messages />
            <div>Messages</div>
          </Link>
          <Link activeClassName="active" to="/account/orders">
            <Orders />
            <div>Orders</div>
          </Link>
          <Link activeClassName="active" to="/account/settings">
            <Settings />
            <div>Settings</div>
          </Link>
          <Link activeClassName="active" to="/account/reviews">
            <Reviews />
            <div>Reviews</div>
          </Link>
          <a
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/login`))
            }}
            style={{ cursor: "pointer" }}
          >
            <Logout />
            <div>Logout</div>
          </a>
        </div>
      </>
    )
  }
}

export default AccountNav
