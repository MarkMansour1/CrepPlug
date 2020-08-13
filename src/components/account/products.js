import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import { getUser } from "../../services/auth"

import defaultimg from "../../images/default_product.png"

const AccountSection = () => {
  const [data, setData] = useState(0)
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
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h2 className="d-flex align-items-center justify-content-between">
        Products
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-archive"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M5.5 7.5A.5.5 0 0 1 6 7h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1z"
          ></path>
        </svg>
      </h2>
      <Tabs justify defaultActiveKey="forsale" transition={false}>
        <Tab eventKey="forsale" title="For Sale">
          <div className="row">
            {data
              ? data.map(product => (
                  <div className="col-4 my-2" key={product.id}>
                    <SingleProduct data={product} />
                  </div>
                ))
              : false}
          </div>
        </Tab>
        <Tab eventKey="sold" title="Sold">
          <div className="row">
            {data
              ? data.map(product => (
                  <div className="col-4 my-2" key={product.id}>
                    <SingleProduct data={product} />
                  </div>
                ))
              : false}
          </div>
        </Tab>
      </Tabs>
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

function timeSince(date) {
  date = new Date(date)

  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + " years ago"
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + " months ago"
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + " days ago"
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + " hours ago"
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + " minutes ago"
  }
  return Math.floor(seconds) + " seconds ago"
}
