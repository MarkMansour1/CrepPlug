import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import kanye from "../images/kanye.png"

const PageComponent = ({ data }) => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="container fourohfour">
      <h1>404</h1>
      <div className="d-block mb-5 w-75 mx-auto" style={{ maxWidth: "500px" }}>
        <Img fluid={data.kanye.childImageSharp.fluid} alt="" />
      </div>
      <Link to="/shop" className="btn btn-primary btn-lg">
        Shop our latest products
      </Link>
    </div>
  </Layout>
)

export default PageComponent

export const pageQuery = graphql`
  query {
    kanye: file(relativePath: { eq: "kanye.png" }) {
      childImageSharp {
        fluid(maxWidth: 650, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
