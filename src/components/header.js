import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import {
  Hamburger,
  Wishlist,
  Account,
  Cart,
  Search,
  Cross,
  Instagram,
  Facebook,
  Twitter,
  YouTube,
} from "../components/svg"

import defaultimg from "../images/default_product.png"
import logo from "../images/logo.png"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchString: "",
      mobileOpen: false,
      searchOpen: false,
      cartProducts: [],
    }
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

  toggleMobileMenu = menu => {
    if (menu === "menu") {
      this.setState({
        mobileOpen: !this.state.mobileOpen,
        searchOpen: false,
      })
    } else if (menu === "search") {
      this.setState({
        mobileOpen: false,
        searchOpen: !this.state.searchOpen,
      })
    } else if (menu === "cart") {
      this.setState({
        mobileOpen: false,
        searchOpen: false,
      })
    }
  }

  render() {
    return (
      <>
        <div className="mobile-header">
          <div className="mobile-container">
            <div className="mobile-left">
              <div
                className="mobile-toggle"
                onClick={() => this.toggleMobileMenu("menu")}
              >
                <Hamburger size="1.5rem" />
              </div>
            </div>
            <div className="header-logo">
              <Link to="/">
                <img src={logo} alt="CrepPlug" style={{ height: "20px" }} />
              </Link>
            </div>
            <div className="mobile-right">
              <div
                className="mobile-toggle"
                onClick={() => this.toggleMobileMenu("search")}
              >
                <Search size="1.4rem" />
              </div>
              <a href={`${process.env.GATSBY_SITE_URL}/wishlist`}>
                <Wishlist size="1.5rem" />
              </a>
              <a href={`${process.env.GATSBY_SITE_URL}/cart`}>
                <Cart size="1.75rem" />
              </a>
            </div>
          </div>
        </div>
        <div className="d-md-none pt-5" />
        <div
          className={`mobile-menu ${
            this.state.mobileOpen ? "mobile-menu-open" : ""
          }`}
        >
          <Accordion>
            <Link to="/shop">Buy</Link>
            <a href={`${process.env.GATSBY_SITE_URL}/register`}>Sell</a>
            <Card>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <a href={`${process.env.GATSBY_SITE_URL}/my-account`}>
                    My Account
                  </a>
                  <a
                    href={`${process.env.GATSBY_SITE_URL}/store-manager/messages`}
                  >
                    Messages
                  </a>
                  <a href={`${process.env.GATSBY_SITE_URL}/my-account/orders`}>
                    Purchase History
                  </a>
                  <a
                    href={`${process.env.GATSBY_SITE_URL}/my-account/settings`}
                  >
                    Settings
                  </a>
                  <a
                    href={`${process.env.GATSBY_SITE_URL}/my-account/edit-account`}
                  >
                    Change Password
                  </a>
                  <a
                    href={`${process.env.GATSBY_SITE_URL}/my-account/customer-logout`}
                  >
                    Logout
                  </a>
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                My Account
              </Accordion.Toggle>
            </Card>
            <Link to="/sourcing">Sourcing</Link>
            <Link to="/cleaning">Cleaning</Link>
            <Card>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <a
                    href={`${process.env.GATSBY_SITE_URL}/product/d-crease-insert`}
                  >
                    <span style={{ whiteSpace: "nowrap" }}>
                      D-Crease Insert
                    </span>
                  </a>
                  <Link to={`/shop?search=accessories`}>
                    <span>Watches</span>
                  </Link>
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Accessories
              </Accordion.Toggle>
            </Card>
            <Card>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
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
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                The Hub
              </Accordion.Toggle>
            </Card>
            <Card>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <Link to="/how-to-sell">
                    <span>How To Sell</span>
                  </Link>
                  <Link to="/about-us">
                    <span>About Us</span>
                  </Link>
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                Contact Us
              </Accordion.Toggle>
            </Card>
            <div className="mobile-social">
              <a
                href="https://www.instagram.com/creppluguk"
                target="_blank"
                rel="noreferrer"
                aria-label="instagram"
              >
                <Instagram />
              </a>
              <a
                href="https://www.facebook.com/crepplug"
                target="_blank"
                rel="noreferrer"
                aria-label="facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://www.twitter.com/crepplug"
                target="_blank"
                rel="noreferrer"
                aria-label="twitter"
              >
                <Twitter />
              </a>
              <a
                href="https://www.youtube.com/channel/UCwhodydfRJqjGkN2d08QN_g"
                target="_blank"
                rel="noreferrer"
                aria-label="youtube"
              >
                <YouTube />
              </a>
            </div>
          </Accordion>
        </div>
        <div
          className={`mobile-search ${
            this.state.searchOpen ? "mobile-search-open" : ""
          }`}
        >
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={this.handleInputChange}
              spellCheck="false"
              className="form-control"
            />
            <button className="btn text-gray" type="submit">
              <Search size="1.25rem" />
            </button>
          </form>
        </div>
        <header>
          <div className="header-primary">
            <div className="container container-wide">
              <div className="header-left">
                <div className="header-logo">
                  <Link to="/">
                    <img src={logo} alt="CrepPlug" style={{ height: "20px" }} />
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
                <a href={`${process.env.GATSBY_SITE_URL}/register`}>Sell</a>
                <a href={`${process.env.GATSBY_SITE_URL}/wishlist`}>
                  <Wishlist size="1.25rem" />
                </a>
                <a href={`${process.env.GATSBY_SITE_URL}/cart`}>
                  <Cart size="1.5rem" />
                </a>
                <a href={`${process.env.GATSBY_SITE_URL}/my-account`}>
                  <Account size="1.5rem" />
                </a>
              </div>
            </div>
          </div>
          <div className="header-secondary">
            <div className="container container-wide">
              <div className="header-menu">
                <Link to="/sourcing">Sourcing</Link>
                <Link to="/cleaning">Cleaning</Link>
                <div className="header-dropdown">
                  <div className="header-dropdown-link">Accessories</div>
                  <div className="header-dropdown-content">
                    <a
                      href={`${process.env.GATSBY_SITE_URL}/product/d-crease-insert`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      D-Crease Insert
                    </a>
                    <Link to={`/shop?search=accessories`}>Watches</Link>
                  </div>
                </div>
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
