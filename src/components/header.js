import { Link, navigate } from "gatsby"
import React from "react"

import Logo from "./logo"

import { isLoggedIn } from "../services/auth"

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    searchString: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    this.setState({
      searchString: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const searchString = this.state.searchString
    navigate("/shop", {
      state: { searchString },
    })
  }

  handleSubmitProducts = event => {
    event.preventDefault()
    const searchString = this.state.searchString
    this.props.parentMethod(searchString)
  }

  render() {
    return (
      <>
        <header className="header-dark">
          <div className="header-primary">
            <div className="container container-wide">
              <div className="header-left">
                <div className="header-logo">
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
                <div className="header-search">
                  <form
                    onSubmit={
                      this.props.productsPage == "true"
                        ? this.handleSubmitProducts
                        : this.handleSubmit
                    }
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={this.handleInputChange}
                      spellCheck="false"
                    />
                    <button className="btn" type="submit">
                      <svg
                        width="1.25rem"
                        height="1.25rem"
                        viewBox="0 0 16 16"
                        className="bi bi-search"
                        fill="#aaa"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              <div className="header-right">
                <Link to="/shop">Buy</Link>
                <Link to={isLoggedIn() ? "/account/add-product" : "/login"}>
                  Sell
                </Link>
                <Link to="/wishlist">
                  <svg
                    width="1.25rem"
                    height="1.25rem"
                    viewBox="0 0 16 16"
                    className="bi bi-heart"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                  </svg>
                </Link>
                <div className="header-dropdown">
                  <Link to={isLoggedIn() ? "/account" : "/login"}>
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 16 16"
                      className="bi bi-person"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                      />
                    </svg>
                  </Link>
                  <div className="header-dropdown-content">
                    <Link to="/account">
                      <span>My Account</span>
                    </Link>
                    <Link to="/account/messages">
                      <span>Messages</span>
                    </Link>
                    <Link to="/account/orders">
                      <span>Purchase History</span>
                    </Link>
                    <Link to="/account/settings">
                      <span>Settings</span>
                    </Link>
                    <Link to="/account/settings">
                      <span>Change Password</span>
                    </Link>
                    <Link to="/account">
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
                <Link to="/cart">
                  <svg
                    width="1.4rem"
                    height="1.4rem"
                    viewBox="0 0 16 16"
                    className="bi bi-bag"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"
                    />
                    <path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="header-secondary">
            <div className="container container-wide">
              <div className="header-menu">
                <Link to="/sourcing">Sourcing</Link>
                <Link to="/">Services</Link>
                <Link to="/">Accessories</Link>
                <div className="header-dropdown">
                  <div className="header-dropdown-link">The Hub</div>
                  <div className="header-dropdown-content">
                    <Link to="/merch">
                      <span>Merch</span>
                    </Link>
                    <Link to="/collections">
                      <span>Collections</span>
                    </Link>
                    <Link to="/blog">
                      <span>Blog</span>
                    </Link>
                    <Link to="/youtube">
                      <span>YouTube</span>
                    </Link>
                  </div>
                </div>
                <div className="header-dropdown">
                  <Link to="/contact-us">Contact Us</Link>
                  <div className="header-dropdown-content">
                    <Link to="/how-to-sell">
                      <span>How To Sell</span>
                    </Link>
                    <Link to="/about-us">
                      <span>About Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default Header

export const MinimalHeader = () => (
  <header className="header-dark">
    <div className="container container-wide">
      <div className="minimal-header">
        <div className="header-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="header-back">
          <Link to="/">Go Back</Link>
        </div>
      </div>
    </div>
  </header>
)
