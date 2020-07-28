import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const PageTemplate = ({ data }) => {
  const { page } = data
  const { name, price, shortDescription, galleryImages } = page
  var image

  if (
    galleryImages &&
    galleryImages.nodes[0] &&
    galleryImages.nodes[0].sourceUrl
  ) {
    image = galleryImages.nodes[0].sourceUrl
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-7">
            <img src={image} className="w-75" />
          </div>
          <div class="col-lg-5 pl-lg-4 order-1 order-lg-2">
            <h3 class="mb-4">{name}</h3>
            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              <ul class="list-inline mb-2 mb-sm-0">
                <li class="list-inline-item h4 font-weight-light mb-0">
                  {price}
                </li>
                <li class="list-inline-item text-muted font-weight-light">
                  <del>£190.00</del>
                </li>
              </ul>
              <div class="d-flex align-items-center text-sm">
                <span class="text-muted text-uppercase">25 reviews</span>
              </div>
            </div>
            <p
              class="mb-4 text-muted"
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
            <form id="buyForm" action="#">
              <div class="input-group w-100 mb-4">
                <button class="btn btn-primary btn-block" type="submit">
                  Add to Cart
                </button>
                <button class="btn btn-outline-primary w-100">
                  Add to wishlist
                </button>
                <button class="btn btn-outline-primary w-100">
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
      galleryImages {
        nodes {
          sourceUrl
        }
      }
    }
  }
`
