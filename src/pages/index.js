import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import SingleProduct from "../components/single-product"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const allProducts = data.products.edges

    return (
      <Layout>
        <SEO title="Home" />
        <div className="container container-wide py-5">
          <div className="block-wrapper">
            <div className="block-header">
              <h3>Most Popular</h3>
              <Link to="/shop" className="link-flat text-secondary">
                Shop All
              </Link>
            </div>
            <div className="block-body">
              {allProducts.map(({ node: product }) => (
                <div className="block-product" key={product.id}>
                  <SingleProduct data={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const query = graphql`
  query {
    products: allWpSimpleProduct(limit: 10) {
      edges {
        node {
          id
          slug
          name
          price
          regularPrice
          date
          image {
            sourceUrl
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
