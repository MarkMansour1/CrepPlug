import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import {
  Logo,
  LogoSmall,
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

import { getUser, isLoggedIn, logout } from "../services/auth"
import {
  getCartProducts,
  removeCartProduct,
  changeCartQuantity,
} from "../services/cart"

import defaultimg from "../images/default_product.png"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchString: "",
      mobileOpen: false,
      searchOpen: false,
      cartOpen: false,
      cartProducts: [],
    }
  }

  componentDidMount() {
    this.setState({ cartProducts: getCartProducts() })
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
        cartOpen: false,
      })
    } else if (menu === "search") {
      this.setState({
        mobileOpen: false,
        searchOpen: !this.state.searchOpen,
        cartOpen: false,
      })
    } else if (menu === "cart") {
      this.setState({
        mobileOpen: false,
        searchOpen: false,
        cartOpen: !this.state.cartOpen,
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
                <Logo />
              </Link>
            </div>
            <div className="mobile-right">
              <div
                className="mobile-toggle"
                onClick={() => this.toggleMobileMenu("search")}
              >
                <Search size="1.4rem" />
              </div>
              <Link to="/wishlist">
                <Wishlist size="1.5rem" />
              </Link>
              <Link to="/cart">
                <Cart size="1.75rem" />
              </Link>
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
            <Link to="/sell">Sell</Link>
            <Card>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Link to="/account">
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/account/products">
                    <span>Products</span>
                  </Link>
                  <Link to="/account/messages">
                    <span>Messages</span>
                  </Link>
                  <Link to="/account/transactions">
                    <span>Transactions</span>
                  </Link>
                  <Link to="/account/settings">
                    <span>Settings</span>
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
                  <a href="https://markm105.sg-host.com/product/d-crease-insert/">
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
        <CartMenu
          open={this.state.cartOpen}
          close={() => this.toggleMobileMenu("cart")}
        />
        <header>
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
                <Link to={isLoggedIn() ? "/sell" : "/login"}>Sell</Link>
                <Link to="/wishlist">
                  <Wishlist size="1.25rem" />
                </Link>
                {isLoggedIn() ? (
                  <div className="header-dropdown">
                    <Link to="/account">
                      <Account size="1.5rem" />
                    </Link>
                    <div className="header-dropdown-content">
                      <Link to="/account">
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/account/products">
                        <span>Products</span>
                      </Link>
                      <Link to="/account/messages">
                        <span>Messages</span>
                      </Link>
                      <Link to="/account/transactions">
                        <span>Transactions</span>
                      </Link>
                      <Link to="/account/settings">
                        <span>Settings</span>
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
                ) : (
                  <Link to="/login">
                    <Account size="1.5rem" />
                  </Link>
                )}
                {/* <div
                  className="cart-toggle header-toggle"
                  onClick={this.toggleCartMenu}
                >
                  <Cart size="1.5rem" />
                </div> */}
                {/* TODO remove target=blank */}
                <a href="http://markm105.sg-host.com/cart" target="_blank">
                  <Cart size="1.5rem" />
                  {/* {getCartProducts().length > 0 && (
                    <span
                      className="badge badge-light"
                      style={{ position: "absolute", top: "25%", right: "8px" }}
                    >
                      {getCartProducts().length}
                    </span>
                  )} */}
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
                      href="https://markm105.sg-host.com/product/d-crease-insert/"
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

const CartMenu = props => {
  const { open, close } = props
  const [data, setData] = useState(getCartProducts())
  const [dcreaseSize, setDcreaseSize] = useState(null)
  const user = getUser()

  const handleRemove = productId => {
    var products = removeCartProduct(user, productId)
    setData(products)
  }

  const getTotals = () => {
    let subtotal = 0
    let shipping = 0
    let total = 0

    for (let product in data) {
      let price = data[product].price.substring(1)
      subtotal += parseFloat(price) * data[product].quantity
      shipping += 3.99
    }

    total = subtotal + shipping

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    }
  }

  const addSuggested = e => {
    e.preventDefault()

    console.log(e.target.value)
  }

  return (
    <div className={`cart-menu ${open ? "cart-menu-open" : ""}`}>
      <div className="cart-container">
        <div className="cart-title">
          <h3 className="title">
            Your Cart
            <button className="btn btn-light" onClick={close}>
              <Cross size="2rem" />
            </button>
          </h3>
        </div>
        <div className="cart-items">
          {data &&
            data.map((product, index) => (
              <div className="cart-item" key={index}>
                <Link to={`/product/${product.slug}`}>
                  <div className="img-container">
                    {product.image && product.image.sourceUrl ? (
                      <img src={product.image.sourceUrl} alt={product.name} />
                    ) : (
                      <img src={defaultimg} alt="" />
                    )}
                  </div>
                </Link>
                <div>
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  <div>{product.price}</div>
                  <div className="product-quantity">
                    <div
                      onClick={() => {
                        let products = changeCartQuantity(
                          user,
                          product.productId,
                          false
                        )
                        setData(products)
                      }}
                      className="btn btn-sm"
                    >
                      -
                    </div>
                    <div className="quantity">{product.quantity}</div>
                    <div
                      onClick={() => {
                        let products = changeCartQuantity(
                          user,
                          product.productId,
                          true
                        )
                        setData(products)
                      }}
                      className="btn btn-sm"
                    >
                      +
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(product.productId)}
                    className="btn btn-sm"
                  >
                    <Cross size="2em" /> Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="cart-actions">
          <Link to="/cart" className="btn btn-primary btn-block">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
