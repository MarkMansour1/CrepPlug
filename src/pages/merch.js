import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ProductBlock from "../components/block-product"
import PostBlock from "../components/block-post"

import useSWR from "swr"
import fetcher from "../services/fetcher"

const IndexPage = ({ data }) => {
  const { data: products } = useSWR("wp-json/wc/v3/products", fetcher)
  const { data: posts } = useSWR("wp-json/wp/v2/posts", fetcher)

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
          products={products ?? []}
        />
        <PostBlock
          title="From The Blog"
          link="/blog"
          linkText="Read More"
          posts={posts ?? []}
        />
      </div>
    </Layout>
  )
}

export default IndexPage

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
         }
       `
