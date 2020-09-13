import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"
import { Cross } from "../components/svg"
import { CartModal } from "../components/modals"

import { getUser } from "../services/auth"
import { addCartProduct } from "../services/cart"
import { removeWishlistProduct } from "../services/wishlist"

import defaultimg from "../images/default_product.png"

const PageComponent = props => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showCart, setCart] = useState(false)

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
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const cartSubmit = (itemId, product) => {
    let res = addCartProduct(user, product, 1, null)

    if (res === true) {
      handleRemove(itemId)
      setCart(true)
    }
  }

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
        {<Loader visible={loading} />}
        {data ? (
          data.length > 0 ? (
            <table className="table product-table mt-5">
              <tbody>
                {allProducts.map(({ node: product }) => {
                  var inWishlist = false
                  var itemId
                  for (var i in data) {
                    if (data[i].product_id == product.productId) {
                      inWishlist = true
                      itemId = data[i].item_id
                      break
                    }
                  }

                  const {
                    productId,
                    slug,
                    name,
                    price,
                    stockQuantity,
                    manageStock,
                    image,
                  } = product

                  const outOfStock =
                    manageStock && !stockQuantity ? true : false

                  if (inWishlist) {
                    return (
                      <tr key={productId}>
                        <td>
                          <button
                            onClick={() => handleRemove(itemId)}
                            className="btn btn-sm"
                          >
                            <Cross size="2em" />
                          </button>
                        </td>
                        <td style={{ minWidth: "100px" }}>
                          <Link to={`/product/${slug}`}>
                            <div className="img-container">
                              {image && image.sourceUrl ? (
                                <img src={image.sourceUrl} alt={name} />
                              ) : (
                                <img src={defaultimg} alt="" />
                              )}
                            </div>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/product/${slug}`}>{name}</Link>
                        </td>
                        <td>{outOfStock ? "Out of stock" : "In stock"}</td>
                        <td>{price}</td>
                        <td>
                          <button
                            onClick={() => cartSubmit(itemId, product)}
                            className="btn btn-secondary btn-sm"
                            disabled={outOfStock}
                          >
                            Add to cart
                          </button>
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-5">
              <h4 className="d-block mb-3">Your wishlist is empty</h4>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop the feed
              </Link>
            </div>
          )
        ) : null}
        <CartModal
          name={"Product"}
          show={showCart}
          onHide={() => setCart(false)}
        />
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
          localImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
