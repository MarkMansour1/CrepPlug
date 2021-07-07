import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { timeSince } from "../services/utils"

import defaultimg from "../images/default_product.png"

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
    if (sizes.length > 1) {
      sizeList = "Multiple sizes"
    } else if (sizes.length > 0) {
      sizeList = "Size " + sizes[0][0].replace("-", ".")
    }

    const outOfStock =
      product.manageStock && !product.stockQuantity ? true : false

    return (
      <div className="single-product">
        <Link to={`/product/${product.slug}`}>
          <div className="product-image">
            {outOfStock && (
              <div className="soldindicator">
                <span>SOLD</span>
              </div>
            )}
            {product.localImage ? (
              <Img
                fluid={{
                  ...product.localImage.childImageSharp.fluid,
                  aspectRatio: 1,
                }}
                alt={product.name}
              />
            ) : (
              <div className="img-container">
                {product.image && product.image.sourceUrl ? (
                  <img src={product.image.sourceUrl} alt={product.name} />
                ) : (
                  <img src={defaultimg} alt={product.name} />
                )}
              </div>
            )}
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
