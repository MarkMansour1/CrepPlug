import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { PayPalButton } from "react-paypal-button-v2"

import { getUser } from "../services/auth"
import { getCartProducts, removeCartProduct } from "../services/cart"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Cart, Cross } from "../components/svg"

import defaultimg from "../images/default_product.png"

const PageComponent = props => {
  const [data, setData] = useState(getCartProducts())
  const user = getUser()

  const handleRemove = productId => {
    var products = removeCartProduct(user, productId)
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

  return (
    <Layout>
      <SEO title="Cart" />
      {data && data.length > 0 ? (
        <div className="container container-wide pt-5">
          <div className="row">
            <div className="col">
              <h2 className="title">
                Cart
                <Cart />
              </h2>
              <table className="table product-table">
                <tbody>
                  {data.map(product => (
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
                      <td>{product.price}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={product.quantity}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemove(product.productId)}
                          className="btn btn-light btn-sm ml-3"
                        >
                          <Cross size="2em" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-12 col-md-4">
              <div className="cart-total mt-5 pt-4">
                <h3>Cart Totals</h3>
                <div className="row mb-3">
                  <div className="col-6">
                    <span>Subtotal</span>
                    <span>Shipping</span>
                    <span>Total</span>
                  </div>
                  <div className="col-6">
                    <span>£{data && getTotals().subtotal}</span>
                    <span>£{data && getTotals().shipping}</span>
                    <span>£{data && getTotals().total}</span>
                  </div>
                </div>
                <PayPalButton
                  options={{
                    clientId: process.env.PAYPAL_CLIENTID,
                    currency: "GBP",
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "GBP",
                            value: "2.56",
                          },
                        },
                      ],
                      // application_context: {
                      //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                      // }
                    })
                  }}
                  onApprove={(data, actions) => {
                    // Capture the funds from the transaction
                    return actions.order.capture().then(function (details) {
                      // Show a success message to your buyer
                      alert(
                        "Transaction completed by " +
                          details.payer.name.given_name
                      )
                      console.log(details)
                      console.log(data)

                      // OPTIONAL: Call your server to save the transaction
                      return fetch("", {
                        method: "post",
                        body: JSON.stringify({
                          orderID: data.orderID,
                        }),
                      })
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center py-5">
          <h2 className="title">
            Cart
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
