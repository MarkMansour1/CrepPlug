import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import Store from "../templates/store"

const PageComponent = props => {
  return (
    <Layout>
      <Router>
        <Store
          path="store/*"
          banner={props.data.banner}
          products={props.data.products}
          categories={props.data.categories}
        />
      </Router>
    </Layout>
  )
}

export default PageComponent

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "banners/crep.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    products: allWpSimpleProduct {
      edges {
        node {
          id
          slug
          name
          price
          regularPrice
          date
          manageStock
          stockQuantity
          vendorId
          vendorImage
          vendorName
          image {
            sourceUrl
          }
          localImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          productCategories {
            nodes {
              name
            }
          }
          metaData {
            id
            key
            value
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
    categories: allWpProductCategory {
      edges {
        node {
          name
        }
      }
    }
  }
`
