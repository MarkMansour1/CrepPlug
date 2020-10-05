import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { Products, Edit } from "../svg"
import Loader from "../loader"

import { getUser } from "../../services/auth"
import { timeSince } from "../../services/utils"

import defaultimg from "../../images/default_product.png"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h2 className="title">
        Products
        <Products />
      </h2>
      <Loader visible={loading} />
      {/* {!loading && (
        <Link to="/sell" className="btn btn-outline-secondary btn-sm mb-3">
          Add new product
        </Link>
      )} */}
      <table className="table account-table">
        <tbody>
          {data &&
            data.map(product => {
              let views = product.meta_data.find(
                meta => meta.key === "_wcfm_product_views"
              )
              if (!views || views === undefined) {
                views = 0
              } else {
                views = views.value
              }

              return (
                <tr>
                  <td style={{ minWidth: "100px" }}>
                    <a href={`/product/${product.slug}`} target="_blank">
                      <div className="img-container">
                        {product.images[0] && product.images[0].src ? (
                          <img src={product.images[0].src} alt={product.name} />
                        ) : (
                          <img src={defaultimg} alt={product.name} />
                        )}
                      </div>
                    </a>
                  </td>
                  <td className="product-details">
                    <a href={`/product/${product.slug}`} target="_blank">
                      {product.name}
                    </a>
                    <span>
                      {product.stock_status === "instock"
                        ? "In stock"
                        : "Out of stock"}
                      {product.stock_quantity
                        ? `(${product.stock_quantity})`
                        : null}
                    </span>
                    <span>{views} views</span>
                    <strong>£{product.price}</strong>
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/edit-product/${product.slug}`}
                      className="btn btn-light btn-sm"
                    >
                      <Edit /> Edit
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AccountSection
