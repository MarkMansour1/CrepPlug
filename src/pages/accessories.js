import React from "react"
import { Link, graphql, navigate } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Accessories" />
        <div className="container container-wide pt-5"></div>
      </Layout>
    )
  }
}

export default PageComponent
