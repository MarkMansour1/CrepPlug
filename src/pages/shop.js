import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

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
                <Link to={`/product/${product.slug}`}>{product.name}</Link>
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
          name
          slug
        }
      }
    }
  }
`
