import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import StarRatings from "react-star-ratings"
import Carousel, { Dots } from "@brainhubeu/react-carousel"

import Layout from "../components/layout"
import ProductBlock from "../components/block-product"
import { Wishlist, RightArrow, Messages, Question } from "../components/svg"
import {
  WishModal,
  CartModal,
  MessageModal,
  RequestModal,
} from "../components/modals"

import { getUser } from "../services/auth"
import { addCartVariableProduct } from "../services/cart"

import defaultimg from "../images/default_product.png"
import protection from "../images/protection.png"

const PageTemplate = ({ data }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(16557)
  const [showCart, setCart] = useState(false)
  const [error, setError] = useState(false)
  const user = getUser()

  const { page, products } = data
  var {
    productId,
    slug,
    name,
    price,
    stockQuantity,
    manageStock,
    shortDescription,
    image,
    galleryImages,
    related,
  } = page

  const outOfStock = manageStock && !stockQuantity ? true : false

  var images = []
  if (image && image.sourceUrl) {
    images = [{ sourceUrl: image.sourceUrl }]
  }
  if (
    galleryImages &&
    galleryImages.nodes[0] &&
    galleryImages.nodes[0].sourceUrl
  ) {
    images = images.concat(galleryImages.nodes)
  }
  if (images.length === 0) {
    images.push({ sourceUrl: defaultimg })
  }

  // Gets 6  products for related
  var relatedProducts = []
  if (related) {
    for (let i in related.nodes) {
      // Adds all the products matching the related id to the relatedproducts array
      relatedProducts = relatedProducts.concat(
        products.edges.filter(
          ({ node: product }) => product.id === related.nodes[i].id
        )
      )
    }
  }

  // If there aren't enough related products, fill the rest with random products
  // TODO replace 3.5 with a number related to the product to keep it different for each product but random overall
  let num = Math.floor(products.edges.length / 3.5)
  while (relatedProducts.length <= 6 && num < products.edges.length) {
    let p = products.edges[num]
    if (
      relatedProducts.filter(({ node: product }) => product.id === p.node.id)
        .length < 1
    ) {
      relatedProducts.push(p)
    }
    num++
  }

  const cartSubmit = e => {
    e.preventDefault()

    let res = addCartVariableProduct(user, page, quantity, size)

    if (res === false) {
      setError("Item is already in your cart.")
    } else {
      setError(false)
    }

    setCart(res)
  }

  return (
    <Layout>
      <div className="container pt-5">
        <div className="row pb-5">
          <div className="col-12 col-md-7">
            <h3 className="text-left d-md-none">{name}</h3>
            <ImageCarousel images={images} />
          </div>
          <div className="col-12 col-md-5">
            <div className="product-info">
              <div className="d-flex justify-content-between align-items-start">
                <h3 className="d-none d-md-block">{name}</h3>
              </div>
              <div
                className="product-desc"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
              />
              <div className="product-price">{price}</div>
              <form onSubmit={cartSubmit} className="product-cart">
                {!outOfStock && (
                  <div className="form-group row">
                    <div className="col-4">
                      <label>Quantity:</label>
                      <div className="product-quantity">
                        <div
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity(quantity - 1)
                            }
                          }}
                          className="btn btn-sm"
                        >
                          -
                        </div>
                        <div className="quantity">{quantity}</div>
                        <div
                          onClick={() => {
                            if (!manageStock || quantity < stockQuantity) {
                              setQuantity(quantity + 1)
                            }
                          }}
                          className="btn btn-sm"
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <label>Size:</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={event => setSize(event.target.value)}
                        required
                      >
                        <option value={16557}>Small: size 3-5</option>
                        <option value={16558}>Medium: size 6-10</option>
                        <option value={16559}>Large: size 11+</option>
                      </select>
                    </div>
                  </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-primary cart-add"
                  disabled={outOfStock}
                >
                  {outOfStock ? "Out of stock" : "Add to Cart"}
                </button>
              </form>
              <a
                href="/buyer-protection"
                target="_blank"
                className="product-protection mt-3"
              >
                <img src={protection} alt="" />
                <div>
                  <span>Buyer Protection Guarantee</span>
                  Your purchase is protected <RightArrow />
                </div>
              </a>
            </div>
          </div>
        </div>
        <ProductBlock
          title="Related Products"
          link="/shop"
          linkText="Shop All"
          products={relatedProducts}
        />
      </div>
      <CartModal name={name} show={showCart} onHide={() => setCart(false)} />
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query variableProduct($id: String!) {
    page: wpSimpleProduct(id: { eq: $id }) {
      productId
      slug
      name
      price
      salePrice
      regularPrice
      shortDescription
      stockQuantity
      manageStock
      vendorId
      vendorName
      vendorImage
      metaData {
        id
        key
        value
      }
      related {
        nodes {
          id
        }
      }
      attributes {
        nodes {
          name
          options
        }
      }
      reviewCount
      reviews {
        nodes {
          id
          content
          author {
            node {
              name
            }
          }
          date(formatString: "MMMM DD, YYYY")
        }
        averageRating
      }
      image {
        sourceUrl
      }
      galleryImages {
        nodes {
          sourceUrl
        }
      }
    }
    products: allWpSimpleProduct {
      edges {
        node {
          id
          slug
          name
          price
          regularPrice
          date
          image {
            sourceUrl
          }

          productCategories {
            nodes {
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`

class ImageCarousel extends React.Component {
  state = {
    value: 0,
    images: this.props.images,
    thumbnails: this.props.images.map((image, index) => (
      <img
        key={index}
        className="img-container"
        style={{ maxWidth: "100px", maxHeight: "100px" }}
        src={image.sourceUrl}
      />
    )),
  }

  onChange = value => this.setState({ value })

  render() {
    return (
      <>
        <Carousel
          value={this.state.value}
          onChange={this.onChange}
          lazyLoad
          arrows
        >
          {this.state.images.map((image, index) => (
            <div className="img-container" key={image.sourceUrl}>
              <img src={image.sourceUrl} alt="" />
            </div>
          ))}
        </Carousel>
        <Dots
          value={this.state.value}
          onChange={this.onChange}
          thumbnails={this.state.thumbnails}
        />
      </>
    )
  }
}
