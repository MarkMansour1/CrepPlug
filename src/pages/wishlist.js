import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { getUser } from "../services/auth"

import defaultimg from "../images/default_product.png"

const PageComponent = () => {
  const [data, setData] = useState(null)
  const user = getUser()

  useEffect(() => {
    fetch(
      `${process.env.SITE_URL}/wp-json/wc/v3/wishlist/get_by_user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then(res => res.json())
      .then(res => {
        const shareKey = res[0].share_key
        fetch(
          `${process.env.SITE_URL}/wp-json/wc/v3/wishlist/${shareKey}/get_products`,
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
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <SEO title="Wishist" />
      <div className="container pt-5">
        <h2>Save Your Favourite Trainers</h2>
        <table className="table product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Stock Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map(product => (
                  <tr key={product.product_id}>
                    {/* <td>
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
                    </td> */}
                    {/* <td>
                      <Link to={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </td> */}
                    <td>{product.in_stock ? "In stock" : "Out of stock"}</td>
                    <td>{product.price}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm">
                        Add to cart
                      </button>
                      <button className="btn btn-light btn-sm ml-3">
                        <svg
                          width="2em"
                          height="2em"
                          viewBox="0 0 16 16"
                          class="bi bi-x"
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
                ))
              : null}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default PageComponent
