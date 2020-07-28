import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const PageTemplate = ({ data }) => {
  const { page } = data
  const { title } = page

  return (
    <Layout>
      <div className="container py-5">
        <h2>{title}</h2>
      </div>
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query post($id: String!) {
    page: wpPost(id: { eq: $id }) {
      title
    }
  }
`
