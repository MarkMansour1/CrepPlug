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
        <SEO title="Services" />
        <Banner
          details={[
            'services',
            "Looking for a specific pair of trainers you can't find anywhere? Need a pair cleaned? Give us a message with your enquiry and we will help you out.",
            data.banner.childImageSharp.fluid,
          ]}
        />
        <div className="container container-wide pt-5">
          <div className="row wide-gutter">
            <div className="col-12 col-md-6">
              <Link to="/sourcing">
                <div className="image-card">
                  <Img
                    fixed={data.sourcing.childImageSharp.fixed}
                    className="img-fluid"
                    alt="Sourcing"
                  />
                  <h2>Sourcing</h2>
                </div>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/services">
                <div className="image-card">
                  <Img
                    fixed={data.cleaning.childImageSharp.fixed}
                    className="img-fluid"
                    alt="Cleaning"
                  />
                  <h2>Cleaning</h2>
                  <p>Coming Soon</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const cardImage = graphql`
  fragment cardImage on File {
    childImageSharp {
      fixed(width: 700, height: 500) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    banner: file(relativePath: { eq: "banners/services.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    sourcing: file(relativePath: { eq: "services/sourcing.jpg" }) {
      ...cardImage
    }
    cleaning: file(relativePath: { eq: "services/cleaning.jpg" }) {
      ...cardImage
    }
  }
`
