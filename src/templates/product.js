import React from "react"
import { graphql } from "gatsby"
import AliceCarousel from "react-alice-carousel"

import { getUser } from "../services/auth"
import { addWishlistProduct } from "../services/wishlist"
import { Wishlist } from "../components/svg"

import Layout from "../components/layout"
import ProductBlock from "../components/block-product"

import defaultimg from "../images/sourcing.jpg"

const PageTemplate = ({ data }) => {
  const user = getUser()

  const { page, products } = data
  const {
    productId,
    name,
    price,
    salePrice,
    regularPrice,
    shortDescription,
    attributes,
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

  var related = products.edges.slice(0, 6)

  return (
    <Layout>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <ImageCarousel images={images} />
          </div>
          <div className="col-12 col-md-6">
            <div className="product-info">
              <h3>{name}</h3>
              <div className="product-price">
                {price}{" "}
                {salePrice && <span>{regularPrice && regularPrice}</span>}
              </div>
              <div className="product-attributes">
                {attributes &&
                  attributes.nodes &&
                  attributes.nodes[0] &&
                  attributes.nodes[0].options.map(value => (
                    <div>
                      Colour: <span>{value}</span>
                    </div>
                  ))}
                {attributes &&
                  attributes.nodes &&
                  attributes.nodes[1] &&
                  attributes.nodes[1].options.map(value => (
                    <div>
                      Condition: <span>{value}</span>
                    </div>
                  ))}
                {attributes &&
                  attributes.nodes &&
                  attributes.nodes[2] &&
                  attributes.nodes[2].options.map(value => (
                    <div>
                      Size: <span>{value}</span>
                    </div>
                  ))}
              </div>
              <div
                className="product-desc"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
              />
              <div className="product-stock"></div>
              <div className="product-cart">
                Quantity
                <button className="btn btn-primary">Add to Cart</button>
                <button
                  onClick={() =>
                    addWishlistProduct(user, { product_id: productId })
                  }
                  className="btn btn-light"
                >
                  <Wishlist size="1.5rem" />
                </button>
              </div>
              <div className="product-actions">
                <button className="btn btn-outline-primary">
                  Message seller
                </button>
                <button className="btn btn-outline-primary">
                  Request your size
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>reviews/messages</div>
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
      name
      price
      salePrice
      regularPrice
      shortDescription
      attributes {
        nodes {
          name
          options
        }
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
    images: this.props.images,
    galleryImages: this.props.images.map(image => (
      <div className="img-container" key={image.sourceUrl}>
        <img src={image.sourceUrl} alt="" />
      </div>
    )),
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          {this.state.images.map((image, index) => (
            <div
              onClick={() => this.Carousel.slideTo(index)}
              style={{
                width: "75px",
                opacity: "0.75",
                cursor: "pointer",
              }}
              key={index}
            >
              <div className="img-container mb-3">
                <img src={image.sourceUrl} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="col-10">
          <AliceCarousel
            dotsDisabled={true}
            buttonsDisabled={true}
            swipeDisabled={false}
            items={this.state.galleryImages}
            ref={el => (this.Carousel = el)}
          />
        </div>
      </div>
    )
  }
}
