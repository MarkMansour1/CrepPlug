import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const page = data.wpPage

    return (
      <Layout>
        <SEO title="Delivery" />
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
    wpPage(title: { eq: "Privacy Policy" }) {
      id
      content
      date(formatString: "DD/MM/YYYY")
    }
  }
`
