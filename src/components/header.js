import { Link, navigate } from "gatsby"
import React from "react"

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
    if (this.props.minimal === true) {
      return (
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
    } else {
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
                  <Link to="/shop">Buy</Link>
                  <Link to="/">Sell</Link>
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
                        fill-rule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                      />
                    </svg>
                  </Link>
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
                      className="bi bi-bag"
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
                <div className="header-menu">
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

const Logo = () => (
  <svg
    id="logo"
    data-name="logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 917.57 130.09"
  >
    <path
      d="M0,56.05C1.62,50.7,2.74,45.13,4.93,40,15.35,15.72,34.57,3.29,60.24.07c6.42-.8,7.3.45,6.4,6.9C59.42,8.64,52.14,9.64,45.35,12a55.8,55.8,0,0,0-37,56.81,57.08,57.08,0,0,0,46.17,52.08c31.89,6,62.87-17,66.52-49.32.35-3.12,1.55-5.87,5.12-5.36,3.3.48,3.61,3.32,3.31,6.25-3.05,29.54-26.89,52.93-56.22,56.89C37.93,134.13,5.48,108.72.79,75.25c-.06-.42-.52-.79-.79-1.18Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M224.35,65.6c12.9,15.72,16.28,35.12,24,52.73-8.23,1.92-8.51,1.66-11.26-5.31-4.27-10.8-8.54-21.61-13.16-32.26-3.89-9-10.46-13.41-20.82-12.87-12.75.66-25.55.16-38.74.16v50.7h-8V4.19c1.32-.34,2.87-1.09,4.42-1.08,19,.18,38-.21,56.93.94,16.4,1,25.39,9.41,28.09,23.54,3,15.66-3.15,28.23-17.4,35.67C227.25,63.87,226.13,64.57,224.35,65.6Zm-59.52-6.81c17.11,0,33.61.67,50-.21,12.89-.7,19.41-6.43,21.65-16.42.71-3.19.51-6.62.52-9.94,0-9.62-3.95-15.3-13.2-18.13a44.67,44.67,0,0,0-12.18-2C197.82,11.84,184,12,170.15,12h-5.32Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M908.54,71.09H877.82V63.41h39c.27,12.35.62,24.76.77,37.17.06,5.16-.18,10.34-.55,15.49-.08,1.18-1.24,2.28-1.91,3.42-1-.88-2.55-1.57-2.94-2.68-1.27-3.57-2.13-7.29-3.38-11.79-2,1.61-3.57,2.72-5,4-21.23,19.09-62.64,15.87-79.3-5-11.72-14.69-15.7-31.68-14-50.1,1.12-11.94,4.57-23.2,12.08-32.79C834.39,6.09,850.4.76,868.9,1.53c10.47.44,20.31,3,29.11,9a37,37,0,0,1,15.93,22.7c-6.9,1.83-7.23,1.69-10.34-4.26-5.11-9.76-13.78-14.72-24-17.14C861.06,7.44,844.11,10,830.79,25,820.68,36.29,819,50.32,819.45,64.72a57.87,57.87,0,0,0,7.36,27.17c9.81,17.26,27.88,22.53,46.3,20.79A46.81,46.81,0,0,0,904.82,96.6a16.6,16.6,0,0,0,3.56-8.72C909,82.61,908.54,77.24,908.54,71.09Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M283.47,63v48.1h74.29v7.61H275.15V4.13h79.18v7.33H283.92V54.17h66c.49,3.14.88,5.71,1.37,8.86Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M504.31,119.16h-7.52c-1.88-38.21-2.49-76.42-.5-115,1.58-.39,3.16-1.14,4.72-1.1,17.93.53,36,.2,53.77,2.07,19.29,2,29.56,17.88,25.92,37.08-3.32,17.52-13.1,26.36-32,27.73-12.43.9-24.94.76-37.41,1.06-2.15,0-4.3,0-7,0Zm.08-57.38c16.68,1.8,33.09,2.07,49.34-.86,12.49-2.26,19.2-11.83,18.77-25-.44-13.66-6.41-21-19.48-22.9a179.28,179.28,0,0,0-22.8-1.76c-8.57-.16-17.15.41-25.83.67Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M392.84,119l-8.37.44v-5.27c0-34.84.07-69.69-.09-104.53,0-4.59.75-6.23,6-6,16.78.82,33.6.69,50.39,1.34,19.27.74,29.71,13.64,28.68,33.06-1.06,20-14,30.52-32.16,32-7.28.59-14.61.76-21.92.92s-14.61,0-22.52,0Zm.14-55.2c16.79-1,33.23-1.26,49.5-3.05,10.58-1.17,16.67-8.32,18.13-19.09,1.9-14-2.82-27.06-19.75-28.88-4.29-.46-8.57-1.26-12.86-1.33-11.6-.19-23.19-.06-35-.06Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M697.54,4.42c8.35-1.76,8.56-1.59,8.58,6,0,20.84-.13,41.69.24,62.53A103.5,103.5,0,0,0,709,92.63c2.38,11.15,9.64,17.93,20.89,19.09a112,112,0,0,0,24.42-.17c13.3-1.6,20.17-9,21.64-23.87,1.39-14,1.73-28.21,2.08-42.33.33-13.63.07-27.28.07-41.21h7.65a24.56,24.56,0,0,1,.5,3.64c0,24.18.34,48.37-.33,72.53-.21,7.44-2.37,15.13-5.15,22.11-3.63,9.14-11.08,14.81-20.9,16.81-12,2.45-24.07,3.2-36.05-.08-14.2-3.88-23.26-14-24.64-28.63-1.12-11.91-1.37-23.92-1.54-35.89C697.36,38,697.54,21.32,697.54,4.42Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M606.24,118.87V3.94L614,3.31V110.93h59.26v7.94Z"
      transform="translate(0 0.14)"
    />
    <path
      d="M93.49,77.26c4,1.57,2.22,3.91,1,6.09-9.33,17.14-33.7,22.51-50.36,11.1A35.55,35.55,0,0,1,61.91,29.59c2.36-.13,4.79.93,7.18,1.44l0,2.09A43.07,43.07,0,0,1,63,34.59c-14.39,1.29-24.89,9.87-28.38,23.35-3.14,12.14,2.49,26.35,12.9,32.62,12.55,7.55,26.92,6.46,36.82-3C87.56,84.43,90.31,80.85,93.49,77.26Z"
      transform="translate(0 0.14)"
    />
  </svg>
)
