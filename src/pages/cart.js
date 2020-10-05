import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import { getUser } from "../services/auth"
import {
  addCartProduct,
  getCartProducts,
  removeCartProduct,
  changeCartQuantity,
} from "../services/cart"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Cart, Cross } from "../components/svg"
import PaymentSection from "../components/payment-section"

import defaultimg from "../images/default_product.png"
import dcrease from "../images/dcrease/dcrease.jpg"

const PageComponent = props => {
  const dcreaseSizes = [
    { value: 0, label: "Small: size 3-5" },
    { value: 1, label: "Medium: size 6-10" },
    { value: 2, label: "Large: size 11+" },
  ]

  const [data, setData] = useState(getCartProducts())
  const [dcreaseSize, setDcreaseSize] = useState(dcreaseSizes[0].value)
  const user = getUser()

  const handleRemove = (productId, productSize) => {
    var products = removeCartProduct(user, productId, productSize)
    setData(products)
  }

  const getTotals = () => {
    let subtotal = 0
    let shipping = 0
    let total = 0

    for (let product in data) {
      let price = data[product].price.substring(1)
      subtotal += parseFloat(price) * data[product].quantity
      shipping += 3.99
    }

    total = subtotal + shipping

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    }
  }

  const addSuggested = e => {
    e.preventDefault()

    console.log(
      addCartProduct(
        user,
        {
          productId: "150",
          slug: "dcreaseslug",
          image: null,
          name: "D-Crease Insert",
          size: null,
          price: "£9.99",
          quantity: 1,
          stockQuantity: null,
          manageStock: false,
          // TODO replace with dcrease vendor
          vendorId: null,
        },
        1
      )
    )

    setData(getCartProducts())
  }

  return (
    <Layout>
      <SEO title="Your Cart" />
      {data && data.length > 0 ? (
        <div className="container pt-5">
          <div className="row">
            <div className="col-12">
              <h2 className="title">
                Your Cart
                <Cart />
              </h2>
              <table className="table product-table">
                <tbody>
                  {data.map(product => (
                    <tr key={product.productId + product.size}>
                      <td style={{ width: "125px" }}>
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
                        <small className="d-block text-gray">
                          Size: {product.size}
                        </small>
                      </td>
                      <td>{product.price}</td>
                      <td style={{ width: "150px" }}>
                        <div className="product-quantity">
                          <div
                            onClick={() => {
                              let products = changeCartQuantity(
                                user,
                                product.productId,
                                product.size,
                                false
                              )
                              setData(products)
                            }}
                            className="btn btn-sm"
                          >
                            -
                          </div>
                          <div className="quantity">{product.quantity}</div>
                          <div
                            onClick={() => {
                              let products = changeCartQuantity(
                                user,
                                product.productId,
                                product.size,
                                true
                              )
                              setData(products)
                            }}
                            className="btn btn-sm"
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleRemove(product.productId, product.size)
                          }
                          className="btn btn-sm"
                        >
                          <Cross size="2em" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.filter(product => product.productId === "150").length <
                1 && (
                <>
                  <h3>Protect Your Crep</h3>
                  <form onSubmit={addSuggested}>
                    <table className="table product-table">
                      <tbody>
                        <tr>
                          <td style={{ width: "125px" }}>
                            <a href="/product/dcrease-insert" target="_blank">
                              <div className="img-container">
                                <img src={dcrease} alt="D-Crease Insert" />
                              </div>
                            </a>
                          </td>
                          <td style={{ maxWidth: "300px" }}>
                            <a href="/product/dcrease-insert" target="_blank">
                              D-Crease Insert
                              <small className="d-block text-gray">
                                Go Crease Free. A CrepPlug Verified product
                                which will prolong your sneakers life-span.
                              </small>
                            </a>
                          </td>
                          <td>
                            £9.99
                            <small className="d-block text-gray">
                              +£1.99 shipping
                            </small>
                          </td>
                          <td>
                            <select
                              id="size"
                              name="size"
                              className="form-control form-control-sm"
                              value={dcreaseSize}
                              onChange={e => setDcreaseSize(e.target.value)}
                            >
                              {dcreaseSizes.map(size => (
                                <option value={size.value} key={size.value}>
                                  {size.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-secondary btn-sm m-0"
                            >
                              Add to cart
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </>
              )}
            </div>
            <div className="col-12 col-md-6 offset-6">
              <PaymentSection totals={getTotals()} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center py-5">
          <h2 className="title">
            Your Cart
            <Cart />
          </h2>
          <h4 className="d-block mb-3">Your cart is empty</h4>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop the feed
          </Link>
        </div>
      )}
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
