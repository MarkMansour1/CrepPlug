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
        <SEO title="Terms of Service" />
        <div className="container container-wide pt-5">
          <div className="text-center">
            <h1>Terms Of Service</h1>
            <p>This Agreement was last modified on {page.date}</p>
          </div>
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
  query {
    wpPage(title: { eq: "Privacy Policy" }) {
      id
      content
      date(formatString: "DD/MM/YYYY")
    }
  }
`
