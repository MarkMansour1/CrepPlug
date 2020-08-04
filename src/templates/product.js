import React from "react"
import { graphql } from "gatsby"
import Flicking from "@egjs/react-flicking"

import Layout from "../components/layout"

import defaultimg from "../images/sourcing.jpg"

const PageTemplate = ({ data }) => {
  const { page } = data
  const { name, price, shortDescription, image, galleryImages } = page
  var images = [{ sourceUrl: defaultimg }]

  if (image && image.sourceUrl) {
    images = [{ sourceUrl: image.sourceUrl }]
  } else if (
    galleryImages &&
    galleryImages.nodes[0] &&
    galleryImages.nodes[0].sourceUrl
  ) {
    images = galleryImages.nodes
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-7">
            <Flicking className="w-75" circular={true}>
              {images.map(image => (
                <img src={image.sourceUrl} alt="" className="w-100" />
              ))}
            </Flicking>
          </div>
          <div className="col-lg-5 pl-lg-4 order-1 order-lg-2">
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
