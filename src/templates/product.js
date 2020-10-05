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

import { getUser, isLoggedIn } from "../services/auth"
import { addCartProduct } from "../services/cart"
import { addWishlistProduct } from "../services/wishlist"
import { updateProduct } from "../services/products"

import defaultimg from "../images/default_product.png"
import protection from "../images/protection.png"

const PageTemplate = ({ data }) => {
  const [quantity, setQuantity] = useState(1)
  const [sizes, setSizes] = useState(null)
  const [size, setSize] = useState(null)
  const [showWish, setWish] = useState(false)
  const [showCart, setCart] = useState(false)
  const [showMessage, setMessage] = useState(false)
  const [showRequest, setRequest] = useState(false)
  const user = getUser()

  const { page, products } = data
  var {
    productId,
    slug,
    name,
    price,
    salePrice,
    regularPrice,
    stockQuantity,
    manageStock,
    shortDescription,
    attributes,
    reviewCount,
    reviews,
    image,
    galleryImages,
    related,
    vendorId,
    vendorName,
    vendorImage,
    metaData,
  } = page

  useEffect(() => {
    if (
      attributes &&
      attributes.nodes &&
      attributes.nodes[2] &&
      attributes.nodes[2].options
    ) {
      let sizeOptions = attributes.nodes[2].options
      setSizes(sizeOptions)
      setSize(sizeOptions[0])
    }

    fetch(
      `${process.env.SITE_URL}/wp-json/wc/v3/products/${productId}?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`
    )
      .then(res => res.json())
      .then(data => {
        const viewMeta = data.meta_data.find(
          meta => meta.key === "_wcfm_product_views"
        )
        var views = parseInt(viewMeta.value) || 0

        // TODO uncomment this in production to count views
        // updateProduct(productId, {
        //   meta_data: [
        //     {
        //       key: "_wcfm_product_views",
        //       value: views + 1,
        //     },
        //   ],
        // })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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
  for (let i in related.nodes) {
    // Adds all the products matching the related id to the relatedproducts array
    relatedProducts = relatedProducts.concat(
      products.edges.filter(
        ({ node: product }) => product.id === related.nodes[i].id
      )
    )
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

  const wishlistSubmit = () => {
    addWishlistProduct(user, { product_id: productId })
    setWish(true)
  }

  const cartSubmit = e => {
    e.preventDefault()

    let res = addCartProduct(user, page, quantity, size)

    if (res == false) {
      console.log("didnt add")
    }

    setCart(res)
  }

  return (
    <Layout>
      <div className="container pt-5">
        {/* TODO remove pb-5 when reviews added */}
        <div className="row pb-5">
          <div className="col-12 col-md-7">
            <h3 className="text-left d-md-none">{name}</h3>
            <ImageCarousel images={images} />
          </div>
          <div className="col-12 col-md-5">
            <div className="product-info">
              <div className="d-flex justify-content-between align-items-start">
                <h3 className="d-none d-md-block">{name}</h3>
                {/* TODO if the logged in user is the product owner, change wishlist button to edit product button */}
                {/* <button
                  onClick={wishlistSubmit}
                  className="btn wishlist-add"
                  style={{ color: "black", padding: ".25rem" }}
                >
                  <Wishlist size="1.5rem" />
                </button> */}
              </div>
              {/* {reviews.nodes.length > 0 && (
                <div className="product-rating">
                  <StarRatings
                    name="productRating"
                    rating={reviews.averageRating}
                    starRatedColor="black"
                    starEmptyColor="#ccc"
                    numberOfStars={5}
                    svgIconPath="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    svgIconViewBox="0 0 16 16"
                    starDimension="16px"
                    starSpacing="0"
                  />
                </div>
              )} */}
              <div className="product-attributes">
                {attributes &&
                  attributes.nodes &&
                  attributes.nodes[0] &&
                  attributes.nodes[0].options && (
                    <div>
                      Colour:{" "}
                      {attributes.nodes[0].options.map(value => (
                        <span>{value}</span>
                      ))}
                    </div>
                  )}
                {attributes &&
                  attributes.nodes &&
                  attributes.nodes[1] &&
                  attributes.nodes[1].options && (
                    <div>
                      Condition:{" "}
                      {attributes.nodes[1].options.map(value => (
                        <span>{value}</span>
                      ))}
                    </div>
                  )}
              </div>
              <div
                className="product-desc"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
              />
              <div className="product-price">
                {price}{" "}
                {salePrice && <span>{regularPrice && regularPrice}</span>}
                <div className="product-shipping">
                  <strong>+£3.99</strong> shipping
                </div>
              </div>
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
                            if (quantity < stockQuantity) {
                              setQuantity(quantity + 1)
                            }
                          }}
                          className="btn btn-sm"
                        >
                          +
                        </div>
                      </div>
                    </div>
                    {sizes && (
                      <div className="col-8">
                        <label>Size:</label>
                        <select
                          className="form-control form-control-sm"
                          value={size}
                          onChange={event => setSize(event.target.value)}
                          required
                        >
                          {sizes.map(size => (
                            <option value={size}>Size: {size}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary cart-add"
                  disabled={outOfStock}
                >
                  {outOfStock ? "Out of stock" : "Add to Cart"}
                </button>
              </form>
              <div className="product-actions">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setMessage(true)}
                >
                  Message seller
                </button>
                <div className="product-actions-extra">
                  <div className="link-flat" onClick={wishlistSubmit}>
                    <Wishlist />
                    {` Add to wishlist`}
                  </div>
                  <div className="link-flat" onClick={() => setRequest(true)}>
                    <Question />
                    {` Request your size`}
                  </div>
                </div>
              </div>
              <a
                href="/buyer-protection"
                target="_blank"
                className="product-protection"
              >
                <img src={protection} alt="" />
                <div>
                  <span>Buyer Protection Guarantee</span>
                  Your purchase is protected <RightArrow />
                </div>
              </a>
              <SellerInfo
                vendor={{ id: vendorId, name: vendorName, image: vendorImage }}
              />
              {/* <Link to="/sourcing" state={{ name: name }} className="link-flat">
                Request your size
              </Link> */}
              {/* <Link to="/shop">
                <BackgroundImage
                  Tag="div"
                  fluid={data.feedBanner.childImageSharp.fluid}
                >
                  <div className="product-shop-banner">
                    <div className="banner-text">Visit store</div>
                  </div>
                </BackgroundImage>
              </Link> */}
            </div>
          </div>
        </div>
        {/* <div className="product-reviews">
          <h3>Comments</h3>
          <p>
            {reviewCount === 0 ? "No" : reviewCount.toString()} comment
            {reviewCount === 1 ? "" : "s"} for {name}
          </p>
          {reviews && (
            <>
              {reviews.nodes.map(review => (
                <div className="product-review" key={review.id}>
                  <div className="review-info">
                    <strong>{review.author.node.name}</strong> - {review.date}
                  </div>
                  <div className="review-stars"></div>
                  <div dangerouslySetInnerHTML={{ __html: review.content }} />
                </div>
              ))}
            </>
          )}
          <div className="new-review"></div>
        </div> */}
        <ProductBlock
          title="Related Products"
          link="/shop"
          linkText="Shop All"
          products={relatedProducts}
        />
      </div>
      <WishModal name={name} show={showWish} onHide={() => setWish(false)} />
      <CartModal name={name} show={showCart} onHide={() => setCart(false)} />
      {/* TODO add vendor and user props to message */}
      {/* TODO replace with log in modal if user is not logged in */}
      <MessageModal
        receiver={vendorName}
        show={showMessage}
        onHide={() => setMessage(false)}
      />
      <RequestModal
        backdrop="static"
        name={name}
        show={showRequest}
        onHide={() => setRequest(false)}
      />
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query product($id: String!) {
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
          localImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
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
    feedBanner: file(relativePath: { eq: "banners/feed.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
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

const SellerInfo = ({ vendor }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  if (!vendor || !vendor.id || !vendor.name || !vendor.image) {
    return null
  }

  const { id, name, image } = vendor

  return (
    <div className="my-4">
      <hr />
      <Link to={`/store/${name}`}>
        <div className="product-seller">
          <img src={image} alt="" />
          <div>
            <span>{name}</span>
            <StarRatings
              name="productRating"
              rating={5}
              starRatedColor="black"
              starEmptyColor="#ccc"
              numberOfStars={5}
              svgIconPath="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              svgIconViewBox="0 0 16 16"
              starDimension="10px"
              starSpacing="0"
            />
            <small>10 reviews</small>
          </div>
        </div>
      </Link>
      <hr />
    </div>
  )
}
