import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import { Instagram, Facebook, Twitter, YouTube } from "./svg"

import fees from "../images/footer/fees.png"
import protection from "../images/footer/protection.png"
import listings from "../images/footer/listings.png"
import logo from "../images/logo.png"

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
        <Link to="/sell">
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
        background: file(relativePath: { eq: "footer/footer.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
                  <img src={logo} alt="CrepPlug" style={{ height: "32px" }} />
                  <div className="social-links">
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
                    <a href={`${process.env.GATSBY_SITE_URL}/my-account`}>
                      My Account
                    </a>
                    <a
                      href={`${process.env.GATSBY_SITE_URL}/store-manager/messages`}
                    >
                      Messages
                    </a>
                    <a
                      href={`${process.env.GATSBY_SITE_URL}/my-account/orders`}
                    >
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
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-4 order-3 order-sm-1 order-xl-3 mt-5 mt-sm-0">
                  <h4>Subscribe to our Newsletter</h4>
                  <form
                    className="form-inline w-100"
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
                <div className="col-12 col-sm-6">
                  © Copyright CrepPlug {new Date().getFullYear()}
                </div>
                <div className="col-12 col-sm-6 text-xl-right">
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

export const MinimalFooter = () => (
  <div className="bg-light py-3">
    <div className="container container-wide">
      <div className="row">
        <div className="col-12 col-sm-6">© Copyright CrepPlug 2020</div>
        <div className="col-12 col-sm-6 text-right">
          <a href="https://captivastudio.com" target="_blank">
            Website by Captiva
          </a>
        </div>
      </div>
    </div>
  </div>
)
