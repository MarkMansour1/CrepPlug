import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { getUser } from "../../services/auth"

import defaultimg from "../../images/default_product.png"

const AccountSection = () => {
  const [data, setData] = useState(0)
  const user = getUser()

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wc/v3/products`, {
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
    <div className="row">
      {data
        ? data.map(product => (
            <div className="col-4 mb-3" key={product.id}>
              <SingleProduct data={product} />
            </div>
          ))
        : false}
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
