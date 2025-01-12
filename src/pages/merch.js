import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ProductBlock from "../components/block-product"
import PostBlock from "../components/block-post"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const products = data.products.edges
    const posts = data.posts.edges

    return (
      <Layout>
        <SEO title="Merch" />
        <div className="container pt-4">
          <div className="text-center text-uppercase py-5 mb-5">
            <h1>
              CrepPlug's Merchandise
              <span className="d-block mt-3" style={{ fontSize: "2rem" }}>
                Join the Community
              </span>{" "}
            </h1>
          </div>
          <div className="block pb-5">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <Img
                  fluid={data.hoodie.childImageSharp.fluid}
                  className="img-fluid"
                  alt="Hoodie"
                />
              </div>
              <div className="col-12 col-md-6 text-center">
                <div className="my-auto">
                  <h2 className="mb-5">OG Crepplug Hoodie</h2>
                  <Link
                    to="/product/crepplug-hoodie/"
                    className="btn btn-secondary"
                  >
                    Purchase Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="block py-5">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 text-center order-2 order-md-1">
                <div className="my-auto">
                  <h2 className="mb-5">Crepplug Sticker</h2>
                  <Link to="/product/sticker/" className="btn btn-secondary">
                    Purchase Here
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 order-md-2">
                <Img
                  fluid={data.sticker.childImageSharp.fluid}
                  className="img-fluid"
                  alt="Sticker"
                />
              </div>
            </div>
          </div>
          <ProductBlock
            title="Recent Arrivals"
            link="/shop"
            linkText="Shop All"
            products={products}
          />
          <PostBlock
            title="From The Blog"
            link="/blog"
            linkText="Read More"
            posts={posts}
          />
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const merchImage = graphql`
  fragment merchImage on File {
    childImageSharp {
      fluid(maxWidth: 500, maxHeight: 500) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    hoodie: file(relativePath: { eq: "merch/hoodie.png" }) {
      ...merchImage
    }
    sticker: file(relativePath: { eq: "merch/sticker.png" }) {
      ...merchImage
    }
    products: allWpSimpleProduct(
      limit: 10
      sort: { fields: date, order: DESC }
    ) {
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
    posts: allWpPost(limit: 6, sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          date(formatString: "MMMM DD, YYYY")
          slug
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
              avatar {
                url
              }
            }
          }
        }
      }
    }
  }
`
