import React from "react"
import { Link } from "gatsby"
// import { OutboundLink } from 'gatsby-plugin-google-analytics'

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
    }

    return (
      <div className="single-product">
        <Link to={`/product/${product.slug}`}>
          <div className="productimg">
            <div className="img-container mb-1">
              {product.galleryImages.nodes[0] &&
                product.galleryImages.nodes[0].sourceUrl && (
                  <img
                    src={product.galleryImages.nodes[0].sourceUrl}
                    alt={product.name}
                  />
                )}
            </div>
          </div>
          <small>{timeSince(product.date)}</small>
          <p className="name product-name mb-1">
            {product.name ? product.name : "Name Unavailable"}
          </p>
        </Link>
        <div className="product-bottom">
          <strong>{product.price}</strong>
          {/* <span className="views d-none">{product.meta_data.views}</span> */}
          <span className="sizes">{sizeList}</span>
        </div>
      </div>
    )
  }
}

export default SingleProduct

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
