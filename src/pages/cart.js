import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { PayPalButton } from "react-paypal-button-v2"

import { getUser } from "../services/auth"
import { removeProduct } from "../services/wishlist"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
  }

  return (
    <Layout>
      <SEO title="Cart" />
      <div className="container pt-5">
        <h2>Shopping Cart</h2>
        <div className="row">
          <div className="col-12 col-md-8">
            <table className="table product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
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
                            <td>
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
                                value="1"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <button
                                onClick={() => handleRemove(itemId)}
                                className="btn btn-light btn-sm ml-3"
                              >
                                <svg
                                  width="2em"
                                  height="2em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-x"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                                  />
                                </svg>
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
          <div className="col-12 col-md-4">
            <div className="cart-total">
              <h3>Cart Totals</h3>
              <div className="row mb-3">
                <div className="col-6">
                  <span>Subtotal</span>
                  <span>Shipping</span>
                  <span>Total</span>
                </div>
                <div className="col-6">
                  <span>£150.00</span>
                  <span>£3.99</span>
                  <span>£153.99</span>
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
