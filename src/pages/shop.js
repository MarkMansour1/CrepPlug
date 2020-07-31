import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SingleProduct from "../components/single-product"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    console.log(data)
    const allProducts = data.products.edges

    console.log(allProducts)

    return (
      <Layout>
        <div className="container container-wide pt-5">
          <div className="row">
            {allProducts.map(({ node: product }) => (
              <div className="col-3 mb-4">
                <SingleProduct data={product} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const query = graphql`
  query {
    products: allWpSimpleProduct {
      edges {
        node {
          id
          slug
          name
          price
          regularPrice
          date
          galleryImages {
            nodes {
              sourceUrl
            }
          }
          productCategories {
            nodes {
              name
            }
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
  }
`
