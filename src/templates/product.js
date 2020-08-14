import React from "react"
import { graphql } from "gatsby"
import AliceCarousel from "react-alice-carousel"

import Layout from "../components/layout"

import defaultimg from "../images/sourcing.jpg"

const PageTemplate = ({ data }) => {
  const { page } = data
  const {
    name,
    price,
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

  return (
    <Layout>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <ImageCarousel images={images} />
          </div>
          <div className="col-12 col-md-5 offset-lg-1">
            <h3 className="mb-4">{name}</h3>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              <ul className="list-inline mb-2 mb-sm-0">
                <li className="list-inline-item mb-0">{price}</li>
                <li className="list-inline-item text-muted font-weight-light">
                  <del>£190.00</del>
                </li>
              </ul>
              <div className="d-flex align-items-center text-sm">
                <span className="text-muted text-uppercase">25 reviews</span>
              </div>
            </div>
            <p
              className="mb-4 text-muted"
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
            <form id="buyForm" action="#">
              <div className="input-group w-100 mb-4">
                <button className="btn btn-primary btn-block" type="submit">
                  Add to Cart
                </button>
                <button className="btn btn-outline-primary w-100">
                  Add to wishlist
                </button>
                <button className="btn btn-outline-primary w-100">
                  Message seller
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query product($id: String!) {
    page: wpSimpleProduct(id: { eq: $id }) {
      name
      price
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

  thumbItem = (image, i) => (
    <div
      className="col"
      key={image.sourceUrl}
      onClick={() => this.Carousel.slideTo(i)}
      style={{
        maxWidth: "125px",
        opacity: "0.75",
        cursor: "pointer",
      }}
    >
      <div className="img-container">
        <img src={image.sourceUrl} alt="" />
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          swipeDisabled={false}
          items={this.state.galleryImages}
          ref={el => (this.Carousel = el)}
        />
        {this.state.images.length > 1 && (
          <div className="row small-gutter mt-3 px-4">
            {this.state.images.map(this.thumbItem)}
          </div>
        )}
      </div>
    )
  }
}
