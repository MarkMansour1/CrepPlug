import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import { Products } from "../svg"
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

      {data ? (
        <Tabs justify defaultActiveKey="forsale" transition={false}>
          <Tab eventKey="forsale" title="For Sale">
            <table className="table account-table">
              <tbody>
                {data.map(product => {
                  return (
                    <tr>
                      <td style={{ minWidth: "100px" }}>
                        <div className="img-container">
                          {product.images[0] && product.images[0].src ? (
                            <img
                              src={product.images[0].src}
                              alt={product.name}
                            />
                          ) : (
                            <img src={defaultimg} alt={product.name} />
                          )}
                        </div>
                      </td>
                      <td>{product.name}</td>
                      <td>
                        {product.stock_status === "instock"
                          ? "In stock"
                          : "Out of stock"}
                      </td>
                      <td>£{product.price}</td>
                      <td>{timeSince(product.date_created)}</td>
                      <td>
                        <button className="btn btn-light btn-sm btn-block">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="sold" title="Sold">
            <div className="row">
              {data.map(product => (
                <div className="col-4 my-2" key={product.id}>
                  <SingleProduct data={product} />
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      ) : null}
    </div>
  )
}

export default AccountSection

class SingleProduct extends React.Component {
  render() {
    var product = this.props.data
    var sizes = []

    if (product.attributes) {
      product.attributes.forEach(attribute => {
        if (attribute.name === "Size") {
          sizes.push(attribute.options)
        }
      })
    }

    var sizeList = ""
    if (sizes.length > 0) {
      sizeList = "Size " + sizes[0]
    } else {
      sizeList = "Size 7"
    }

    return (
      <div className="single-product">
        <Link to={`/product/${product.slug}`}>
          <div className="product-image">
            <div className="img-container">
              {product.images[0] && product.images[0].src ? (
                <img src={product.images[0].src} alt={product.name} />
              ) : (
                <img src={defaultimg} alt={product.name} />
              )}
            </div>
          </div>
        </Link>
        <div className="product-date">{timeSince(product.date_created)}</div>
        <Link to={`/product/${product.slug}`}>
          <div className="product-name">
            {product.name ? product.name : "Name Unavailable"}
          </div>
        </Link>
        <div className="d-flex justify-content-between">
          <div className="product-price">£{product.price}</div>
          <div className="product-size">{sizeList}</div>
        </div>
      </div>
    )
  }
}
