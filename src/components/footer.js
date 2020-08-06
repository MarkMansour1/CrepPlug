import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import Logo from "./logo"

import fees from "../images/fees.png"
import protection from "../images/protection.png"
import listings from "../images/listings.png"

const Boxes = () => (
  <div className="container container-wide">
    <div className="row box-links">
      <div className="col-12 col-md-4">
        <Link to="/shop">
          <img src={listings} alt="" />
          <div>
            Thousands of designer listings
            <span>Shop the Feed →</span>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4">
        <Link to="/buyer-protection">
          <img src={protection} alt="" />
          <div>
            Buyer & Seller Protection
            <span>View Protection →</span>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4">
        <Link to="/account/add-product">
          <img src={fees} alt="" />
          <div>
            We've got the lowest fees around
            <span>Start Selling →</span>
          </div>
        </Link>
      </div>
    </div>
  </div>
)

const BackgroundSection = () => (
  <StaticQuery
    query={graphql`
      query {
        background: file(relativePath: { eq: "footer.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      const imageData = data.background.childImageSharp.fluid
      return (
        <BackgroundImage Tag="div" fluid={imageData}>
          <footer id="footer" className="footer text-center text-xl-left">
            <div className="container container-wide">
              <div className="feedrow">
                <Link to="/shop" className="btn btn-secondary btn-lg">
                  Shop the Feed
                </Link>
              </div>
              <div className="row footerrow">
                <div className="col-12 col-sm-6 col-xl-3 text-center">
                  <Logo />
                  <div className="social-links">
                    <a
                      href="https://www.instagram.com/creppluguk"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/crepplug"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 25.832031 46 A 1.0001 1.0001 0 0 0 26.158203 46 L 31.832031 46 A 1.0001 1.0001 0 0 0 32.158203 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 33 44 L 33 30 L 36.820312 30 L 38.220703 23 L 33 23 L 33 21 C 33 20.442508 33.05305 20.398929 33.240234 20.277344 C 33.427419 20.155758 34.005822 20 35 20 L 38 20 L 38 14.369141 L 37.429688 14.097656 C 37.429688 14.097656 35.132647 13 32 13 C 29.75 13 27.901588 13.896453 26.71875 15.375 C 25.535912 16.853547 25 18.833333 25 21 L 25 23 L 22 23 L 22 30 L 25 30 L 25 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 32 15 C 34.079062 15 35.38736 15.458455 36 15.701172 L 36 18 L 35 18 C 33.849178 18 32.926956 18.0952 32.150391 18.599609 C 31.373826 19.104024 31 20.061492 31 21 L 31 25 L 35.779297 25 L 35.179688 28 L 31 28 L 31 44 L 27 44 L 27 28 L 24 28 L 24 25 L 27 25 L 27 21 C 27 19.166667 27.464088 17.646453 28.28125 16.625 C 29.098412 15.603547 30.25 15 32 15 z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.twitter.com/crepplug"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 L 3 37 C 3 42.511334 7.4886661 47 13 47 L 37 47 C 42.511334 47 47 42.511334 47 37 L 47 13 C 47 7.4877747 42.5112 3 37 3 L 13 3 z M 13 5 L 37 5 C 41.4308 5 45 8.5682253 45 13 L 45 37 C 45 41.430666 41.430666 45 37 45 L 13 45 C 8.5693339 45 5 41.430666 5 37 L 5 13 C 5 8.5693339 8.5693339 5 13 5 z M 30.693359 14 C 27.091529 14 24.154297 16.948616 24.154297 20.554688 C 24.154297 20.580727 24.163763 20.604869 24.164062 20.630859 C 20.349743 20.122249 16.974667 18.23507 14.65625 15.384766 A 1.0001 1.0001 0 0 0 13.015625 15.513672 C 12.452873 16.483446 12.132813 17.613292 12.132812 18.808594 C 12.132812 19.873527 12.428299 20.864828 12.880859 21.757812 A 1.0001 1.0001 0 0 0 12.087891 22.736328 L 12.087891 22.806641 C 12.087891 24.745243 12.991845 26.424523 14.333984 27.626953 A 1.0001 1.0001 0 0 0 14.074219 28.654297 C 14.632569 30.395685 15.932862 31.76104 17.564453 32.529297 C 16.260001 33.141373 14.863558 33.580078 13.322266 33.580078 C 12.911468 33.580078 12.51214 33.558679 12.121094 33.511719 A 1.0001 1.0001 0 0 0 11.458984 35.345703 C 14.062745 37.022387 17.166369 38 20.490234 38 C 25.861602 38 30.10596 35.738351 32.943359 32.511719 C 35.780758 29.285087 37.253906 25.121421 37.253906 21.199219 C 37.253906 21.080563 37.248594 20.966283 37.246094 20.849609 C 38.220518 20.065736 39.137461 19.200995 39.832031 18.158203 A 1.0001 1.0001 0 0 0 38.705078 16.650391 C 38.86821 16.333051 39.096689 16.05609 39.207031 15.710938 A 1.0001 1.0001 0 0 0 37.742188 14.546875 C 36.868349 15.066278 35.888088 15.409788 34.871094 15.648438 C 33.727837 14.671741 32.305945 14 30.693359 14 z M 30.693359 16 C 32.00471 16 33.177989 16.551433 34.005859 17.4375 A 1.0001 1.0001 0 0 0 34.929688 17.734375 C 35.084483 17.703805 35.20864 17.604756 35.361328 17.568359 C 35.338868 17.582399 35.325454 17.607444 35.302734 17.621094 A 1.0001 1.0001 0 0 0 35.835938 19.478516 C 35.765527 19.532406 35.724114 19.617936 35.652344 19.669922 A 1.0001 1.0001 0 0 0 35.238281 20.521484 C 35.247781 20.746907 35.253906 20.973748 35.253906 21.199219 C 35.253906 24.615016 33.94021 28.352038 31.443359 31.191406 C 28.946499 34.030779 25.307867 36 20.490234 36 C 18.833163 36 17.274645 35.665541 15.791016 35.160156 C 17.638051 34.769725 19.386233 34.116881 20.818359 32.990234 A 1.0001 1.0001 0 0 0 20.21875 31.205078 C 18.801889 31.179348 17.709035 30.376495 16.894531 29.337891 C 17.195822 29.298891 17.507754 29.296191 17.794922 29.216797 A 1.0001 1.0001 0 0 0 17.726562 27.271484 C 16.07498 26.937515 14.784514 25.693071 14.3125 24.083984 C 14.738309 24.186876 15.111682 24.417196 15.564453 24.431641 A 1.0001 1.0001 0 0 0 16.152344 22.601562 C 14.933055 21.784606 14.132813 20.396761 14.132812 18.808594 C 14.132812 18.481052 14.308345 18.220556 14.373047 17.914062 C 17.213228 20.732043 20.992263 22.602935 25.248047 22.818359 A 1.0001 1.0001 0 0 0 26.271484 21.589844 C 26.193571 21.259524 26.154297 20.914592 26.154297 20.554688 C 26.154297 18.026758 28.175189 16 30.693359 16 z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCwhodydfRJqjGkN2d08QN_g"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="youtube"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 24.402344 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.402344 16.898438 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.902344 40.5 17.898438 41 24.5 41 C 31.101563 41 37.097656 40.5 40.597656 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.097656 35.5 C 45.5 33 46 29.402344 46.097656 24.902344 C 46.097656 20.402344 45.597656 16.800781 45.097656 14.300781 C 44.699219 12.101563 42.800781 10.5 40.597656 10 C 37.097656 9.5 31 9 24.402344 9 Z M 24.402344 11 C 31.601563 11 37.398438 11.597656 40.199219 12.097656 C 41.699219 12.5 42.898438 13.5 43.097656 14.800781 C 43.699219 18 44.097656 21.402344 44.097656 24.902344 C 44 29.199219 43.5 32.699219 43.097656 35.199219 C 42.800781 37.097656 40.800781 37.699219 40.199219 37.902344 C 36.597656 38.601563 30.597656 39.097656 24.597656 39.097656 C 18.597656 39.097656 12.5 38.699219 9 37.902344 C 7.5 37.5 6.300781 36.5 6.101563 35.199219 C 5.300781 32.398438 5 28.699219 5 25 C 5 20.398438 5.402344 17 5.800781 14.902344 C 6.101563 13 8.199219 12.398438 8.699219 12.199219 C 12 11.5 18.101563 11 24.402344 11 Z M 19 17 L 19 33 L 33 25 Z M 21 20.402344 L 29 25 L 21 29.597656 Z"></path>
                      </svg>
                    </a>
                  </div>
                  <Link to="/contact-us" className="btn btn-dark">
                    Contact Us
                  </Link>
                </div>
                <div className="col-6 col-sm-6 col-xl-2 mt-5 mt-xl-0 ml-xl-5 order-1 order-sm-2 order-xl-1">
                  <h4>Information</h4>
                  <div className="footer-links">
                    <Link to="/about-us">About Us</Link>
                    <Link to="/how-to-sell">How To Sell</Link>
                    <Link to="/delivery">Delivery</Link>
                    <Link to="/faqs">FAQs</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-xl-2 mt-5 mt-xl-0 ml-xl-5 order-2 order-sm-3 order-xl-2">
                  <h4>Account</h4>
                  <div className="footer-links">
                    <Link to="/account">My Account</Link>
                    <Link to="/account">Messages</Link>
                    <Link to="/account">Orders</Link>
                    <Link to="/account">Settings</Link>
                    <Link to="/account">Reviews</Link>
                    <Link to="/account">Logout</Link>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-4 order-3 order-sm-1 order-xl-3">
                  <h4>Subscribe to our Newsletter</h4>
                  <form
                    className="form-inline"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <label htmlFor="newsletter">
                      Keep up to date with the latest drops and offers!
                    </label>
                    <input
                      id="newsletter"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control"
                    />
                    <button className="btn btn-dark">Subscribe</button>
                  </form>
                </div>
              </div>
              <div className="row copyrightrow">
                <div className="col-12 col-sm-6">© Copyright CrepPlug 2020</div>
                <div className="col-12 col-sm-6 text-right">
                  <a href="https://captivastudio.com" target="_blank">
                    Website by Captiva
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </BackgroundImage>
      )
    }}
  />
)

const Footer = () => (
  <>
    <Boxes />
    <BackgroundSection />
  </>
)

export default Footer
