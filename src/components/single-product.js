import React from "react"
import { Link } from "gatsby"

import defaultimg from "../images/sourcing.jpg"

class Single extends React.Component {
  render() {
    var product = this.props.data
    var sizes = []

    if (product.attributes) {
      product.attributes.nodes.forEach(attribute => {
        if (attribute.name === "pa_size") {
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
              {product.image && product.image.sourceUrl ? (
                <img src={product.image.sourceUrl} alt={product.name} />
              ) : (
                <img src={defaultimg} alt="" />
              )}
            </div>
          </div>
        </Link>
        <div className="product-date">{timeSince(product.date)}</div>
        <Link to={`/product/${product.slug}`}>
          <div className="product-name">
            {product.name ? product.name : "Name Unavailable"}
          </div>
        </Link>
        <div className="d-flex justify-content-between">
          <div className="product-price">{product.price}</div>
          <div className="product-size">{sizeList}</div>
        </div>
      </div>
    )
  }
}

export default Single

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
