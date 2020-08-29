import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import StarRatings from "react-star-ratings"
import Carousel, { Dots } from "@brainhubeu/react-carousel"

import Layout from "../components/layout"
import ProductBlock from "../components/block-product"
import { Wishlist } from "../components/svg"

import { getUser } from "../services/auth"
import { addCartProduct } from "../services/cart"
import { addWishlistProduct } from "../services/wishlist"

import defaultimg from "../images/default_product.png"

const PageTemplate = ({ data }) => {
  const [quantity, setQuantity] = useState(1)
  const user = getUser()

  const { page, products } = data
  const {
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
  } = page

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

  // Gets 6 random products for related
  var related = products.edges.slice(0, 6)

  return (
    <Layout>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-7">
            <ImageCarousel images={images} />
          </div>
          <div className="col-12 col-md-5">
            <div className="product-info">
              <h3>{name}</h3>
              {reviews.nodes.length > 0 && (
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
              )}
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
                {attributes &&
                  attributes.nodes &&
                  attributes.nodes[2] &&
                  attributes.nodes[2].options && (
                    <div>
                      Size:{" "}
                      {attributes.nodes[2].options.map(value => (
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
              </div>
              <div className="product-stock"></div>
              <div className="product-cart">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1)
                    }
                  }}
                  className="btn btn-light"
                >
                  -
                </button>
                <div className="quantity">{quantity}</div>
                <button
                  onClick={() => {
                    console.log(manageStock)
                    console.log(stockQuantity)

                    if (
                      !manageStock ||
                      !stockQuantity ||
                      quantity < stockQuantity
                    ) {
                      setQuantity(quantity + 1)
                    }
                  }}
                  className="btn btn-light"
                >
                  +
                </button>
                <button
                  onClick={() =>
                    addCartProduct(user, {
                      id: productId,
                      slug: slug,
                      image: image,
                      name: name,
                      price: price,
                      quantity: quantity,
                    })
                  }
                  className="btn btn-primary cart-add"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    addWishlistProduct(user, { product_id: productId })
                  }
                  className="btn btn-light wishlist-add"
                >
                  <Wishlist size="1.5rem" />
                </button>
              </div>
              <div className="product-actions">
                <button className="btn btn-outline-primary">
                  Message seller
                </button>
                <Link
                  to="/sourcing"
                  state={{ name: name }}
                  className="btn btn-outline-primary"
                >
                  Request your size
                </Link>
              </div>
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
          products={related}
        />
      </div>
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
          // arrows
          lazyLoad
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
