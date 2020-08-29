import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="About Us" />
        {/* <Banner
          details={[
            "about us",
            "CrepPlug is a marketplace where people can come to buy and sell their trainers, a new platform dedicated to streetwear and youth culture.",
            data.banner.childImageSharp.fluid,
            false,
          ]}
        /> */}
        <div className="container container-wide pt-5">
          <div className="about-us">
            <div className="block block-container p-0">
              <h1 className="my-5">Be Your Own Plug</h1>
              <p>
                More than just a website but a unique community with every piece
                of CrepPlug coming together so that we can give the best
                current, relatable and relevant content possible.
              </p>
              <p>
                We want you to be your own plug. Whether it be finding and
                buying a pair of trainers you've been searching up and down for,
                being up to date with the latest drops or even discovering an
                upcoming talented photographer, graphic designer or musician.
              </p>
              <p>
                A UK platform with high aspirations to connect people together
                and one day become a household name.
              </p>
            </div>
            <div className="block">
              <div className="row">
                <div className="col-md-6">
                  <Img fluid={data.buyer.childImageSharp.fluid} alt="" />
                </div>
                <div className="col-12 col-md-6 my-auto">
                  <h3>A variety to choose from, at great prices</h3>
                  <p>
                    Browse our marketplace for both new and used trainers you
                    can't find elsewhere. A UK sneaker marketplace, with new
                    products daily dedicated in delivering the best. We ensure
                    your products reach a great audience through our website and
                    socials. If anything goes wrong, every transaction conducted
                    through CrepPlug with PayPal is eligible for a full refund
                    with the use of PayPal's buyer protection.
                  </p>
                  <Link to="/shop" className="btn btn-secondary">
                    Browse The Shop
                  </Link>
                  <Link to="/buyer-protection" className="btn btn-secondary">
                    Buyer Protection
                  </Link>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="row">
                <div className="col-md-6 order-md-2">
                  <Img
                    fluid={data.seller.childImageSharp.fluid}
                    alt="About Selling"
                  />
                </div>
                <div className="col-12 col-md-6 order-md-1 my-auto">
                  <h3>That pair over there is worth money!</h3>
                  <p>
                    Like many you most probably have a pair of trainers in your
                    room which you do not wear. Didn't you know it was valuable?
                    Turn that into money on CrepPlug, connect with the buyers
                    who have been looking for what you have lying around.
                    Listing an item is always free and our commission rates are
                    the lowest around. Sellers who transact through CrepPlug
                    with PayPal are protected!
                  </p>
                  <Link to="/account/add-product" className="btn btn-secondary">
                    Sell An Item
                  </Link>
                  <Link to="/buyer-protection" className="btn btn-secondary">
                    Seller Protection
                  </Link>
                </div>
              </div>
            </div>
            <div className="block aboutcommission">
              <h3>Free for buyers, low fees for sellers</h3>
              <div className="commissionboxes">
                <div className="commissionbox">
                  6%
                  <span>CrepPlug Commission</span>
                </div>
                <span className="mx-3 mx-md-5">+</span>
                <div className="commissionbox">
                  2.9% + 30p
                  <span>Paypal fees*</span>
                </div>
              </div>
              <p>
                Post any item for free, and CrepPlug takes a commission when
                your items sell.
                <small>
                  *PayPal charges 2.9% + 30p when either the buyer or seller are
                  international.
                </small>
              </p>
            </div>
            <div className="block">
              <div className="row">
                <div className="col-md-6">
                  <Img
                    fluid={data.social.childImageSharp.fluid}
                    alt="Be Social"
                  />
                </div>
                <div className="col-12 col-md-6 my-auto">
                  <h3>Be Social</h3>
                  <p>
                    Follow us on Instagram and Twitter to keep up on the biggest
                    drops and best pieces. Get inspired by our community who
                    love to share their style.
                  </p>
                  <a
                    href="https://www.instagram.com/creppluguk"
                    className="btn btn-secondary"
                    target="_blank"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.twitter.com/crepplug"
                    className="btn btn-secondary"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="row">
                <div className="col-md-6 order-md-2">
                  <Img
                    fluid={data.team.childImageSharp.fluid}
                    alt="Join the Team"
                  />
                </div>
                <div className="col-12 col-md-6 order-md-1 my-auto">
                  <h3>Join the Team</h3>
                  <p>
                    We are always looking for talented individuals to join our
                    London-based team. Our team is full of people who are
                    passionate about fashion and committed to improving our
                    community marketplace.
                  </p>
                  <Link to="/contact-us" className="btn btn-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="block block-container">
              <h3>More Questions?</h3>
              <p>
                We’ve got answers. Visit our FAQs for our most Frequently Asked
                Questions, detailed info on how CrepPlug works, or you can get
                in touch directly with our Community Support Team.
              </p>
              <Link to="/faqs" className="btn btn-secondary btn-lg">
                Visit the FAQs
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const aboutImage = graphql`
  fragment aboutImage on File {
    childImageSharp {
      fluid(maxWidth: 450, maxHeight: 500) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    banner: file(relativePath: { eq: "banners/about.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    buyer: file(relativePath: { eq: "about/buyer.png" }) {
      ...aboutImage
    }
    seller: file(relativePath: { eq: "about/seller.png" }) {
      ...aboutImage
    }
    social: file(relativePath: { eq: "about/social.png" }) {
      ...aboutImage
    }
    team: file(relativePath: { eq: "about/team.png" }) {
      childImageSharp {
        fluid(maxWidth: 450, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`
