import React from "react"
import { timeSince } from "../services/utils"
import defaultimg from "../images/default_product.png"

const SingleProduct = ({ product }) => {
  var sizes = product.attributes.find(attribute => attribute.name === "Size")
    .options

  var sizeList = ""
  if (sizes.length > 1) {
    sizeList = "Multiple sizes"
  } else if (sizes.length > 0) {
    sizeList = "Size " + sizes[0][0].replace("-", ".")
  }

  const outOfStock =
    product.manage_stock && !product.stock_quantity ? true : false

  const image =
    product.images && product.images.length > 0
      ? product.images[0].src
      : defaultimg

  return (
    <div className="single-product">
      <a href={`${process.env.GATSBY_SITE_URL}/product/${product.slug}`}>
        <div className="product-image">
          {outOfStock && (
            <div className="soldindicator">
              <span>SOLD</span>
            </div>
          )}
          <div className="img-container">
            <img src={image} alt={product?.name} />
          </div>
        </div>
      </a>
      <div className="product-date">{timeSince(product?.date_created)}</div>
      <a href={`${process.env.GATSBY_SITE_URL}/product/${product?.slug}`}>
        <div className="product-name">
          {product?.name ?? "Name Unavailable"}
        </div>
      </a>
      <div className="d-flex justify-content-between">
        <div className="product-price">£{product?.price}</div>
        <div className="product-size">{sizeList}</div>
      </div>
    </div>
  )
}

export default SingleProduct
