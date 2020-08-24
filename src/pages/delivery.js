import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const page = data.wpPage

    return (
      <Layout>
        <SEO title="Delivery" />
        <Banner
          details={[
            "delivery",
            "Once you have purchased an item the seller will be ready to ship it to you. Contact them to be updated. If you have any issues, give us a message.",
            data.banner.childImageSharp.fluid,
          ]}
        />
        <div className="container container-wide">
          <div
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          ></div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const pageQuery = graphql`
  {
    banner: file(relativePath: { eq: "banners/delivery.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wpPage(title: { eq: "Privacy Policy" }) {
      id
      content
      date(formatString: "DD/MM/YYYY")
    }
  }
`
