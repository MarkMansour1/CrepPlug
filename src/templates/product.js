import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const PageTemplate = ({ data }) => {
  const { page } = data
  const { name, price } = page

  return (
    <Layout>
      <div className="container py-5">
        <h2>{name}</h2>
        <p>{price}</p>
      </div>
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query product($id: String!) {
    page: wpSimpleProduct(id: { eq: $id }) {
      name
      price
    }
  }
`
