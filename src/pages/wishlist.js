import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { getUser } from "../services/auth"
import { removeWishlistProduct } from "../services/wishlist"
import { Cross } from "../components/svg"

import defaultimg from "../images/default_product.png"

const PageComponent = props => {
  const [data, setData] = useState(null)

  const user = getUser()
  const allProducts = props.data.products.edges

  useEffect(() => {
    fetch(
      `${process.env.SITE_URL}/wp-json/wc/v3/wishlist/${user.shareKey}/get_products`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then(result => result.json())
      .then(result => {
        setData(result)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleRemove = itemId => {
    var newData = data.slice()
    for (let i in data) {
      if (data[i].item_id === itemId) {
        newData.splice(i, 1)
        setData(newData)
        break
      }
    }
    removeWishlistProduct(user, itemId)
  }

  return (
    <Layout>
      <SEO title="Wishlist" />
      <div className="container pt-5">
        <h2 className="text-center">Save Your Favourite Trainers</h2>
        <table className="table product-table mt-5">
          <tbody>
            {data
              ? allProducts.map(({ node: product }) => {
                  var inWishlist = false
                  var itemId
                  for (var i in data) {
                    if (data[i].product_id == product.productId) {
                      inWishlist = true
                      itemId = data[i].item_id
                      break
                    }
                  }

                  if (inWishlist) {
                    return (
                      <tr key={product.productId}>
                        <td style={{ minWidth: "100px" }}>
                          <Link to={`/product/${product.slug}`}>
                            <div className="img-container">
                              {product.image && product.image.sourceUrl ? (
                                <img
                                  src={product.image.sourceUrl}
                                  alt={product.name}
                                />
                              ) : (
                                <img src={defaultimg} alt="" />
                              )}
                            </div>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/product/${product.slug}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td>
                          {product.manageStock && !product.stockQuantity
                            ? "Out of stock"
                            : "In stock"}
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <button className="btn btn-secondary btn-sm">
                            Add to cart
                          </button>
                          <button
                            onClick={() => handleRemove(itemId)}
                            className="btn btn-light btn-sm ml-3"
                          >
                            <Cross size="2em" />
                          </button>
                        </td>
                      </tr>
                    )
                  }
                })
              : null}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default PageComponent

export const query = graphql`
  query {
    products: allWpSimpleProduct {
      edges {
        node {
          productId
          slug
          name
          price
          regularPrice
          manageStock
          stockQuantity
          image {
            sourceUrl
          }
        }
      }
    }
  }
`
