import { Link, navigate } from "gatsby"
import React from "react"

import { Logo, Wishlist, Account, Cart, Search } from "../components/svg"
import { isLoggedIn, logout } from "../services/auth"

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
    navigate(`/shop?search=${this.state.searchString}`)
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
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={this.handleInputChange}
                      spellCheck="false"
                    />
                    <button className="btn text-gray" type="submit">
                      <Search size="1.25rem" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="header-right">
                <Link to="/shop">Buy</Link>
                <Link to={isLoggedIn() ? "/account/add-product" : "/login"}>
                  Sell
                </Link>
                {isLoggedIn() ? (
                  <>
                    <Link to="/wishlist">
                      <Wishlist size="1.25rem" />
                    </Link>
                    <div className="header-dropdown">
                      <Link to="/account">
                        <Account size="1.5rem" />
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
                        <a
                          onClick={event => {
                            event.preventDefault()
                            logout(() => navigate(`/login`))
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                  </>
                )}
                <Link to="/cart">
                  <Cart size="1.5rem" />
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
