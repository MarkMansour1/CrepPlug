import { Link, navigate } from "gatsby"
import React from "react"

import logo from "../images/logo.png"

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
    if (this.props.minimal === true) {
      return (
        <header className="header-dark">
          <div className="container container-wide">
            <div className="minimal-header">
              <div className="header-logo">
                <Link to="/">
                  <img src={logo} alt="CrepPlug Logo" />
                </Link>
              </div>
              <div className="header-back">
                <Link to="/">Go Back</Link>
              </div>
            </div>
          </div>
        </header>
      )
    } else {
      return (
        <>
          <header className="header-dark">
            <div className="header-primary">
              <div className="container container-wide">
                <div className="header-left">
                  <div className="header-logo">
                    <Link to="/">
                      <img src={logo} alt="CrepPlug Logo" />
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
                          class="bi bi-search"
                          fill="#aaa"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
                <div className="header-right">
                  <Link to="/">Buy</Link>
                  <Link to="/">Sell</Link>
                  <Link to="/wishlist">
                    <svg
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 16 16"
                      class="bi bi-heart"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                      />
                    </svg>
                  </Link>
                  <Link to="/account">
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 16 16"
                      class="bi bi-person"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                      />
                    </svg>
                  </Link>
                  <Link to="/cart">
                    <svg
                      width="1.4rem"
                      height="1.4rem"
                      viewBox="0 0 16 16"
                      class="bi bi-bag"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
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
                <div class="header-menu">
                  <Link to="/sourcing">Sourcing</Link>
                  <Link to="/">Services</Link>
                  <Link to="/">Accessories</Link>
                  <Link to="/">The Hub</Link>
                  <Link to="/contact">Contact Us</Link>
                </div>
              </div>
            </div>
          </header>
        </>
      )
    }
  }
}

export default Header
