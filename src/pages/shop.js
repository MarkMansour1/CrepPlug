import React from "react"
import { Link, graphql, navigate } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import SingleProduct from "../components/single-product"
import ProductBlock from "../components/block-product"
import { RightArrow, Filters, UpChevron, DownChevron } from "../components/svg"

import {
  applyFilters,
  applySort,
  mostPopularFunction,
} from "../services/filters"

import dcreaselogo from "../images/dcrease/dcrease-logo.png"
import useSWR from "swr"
import fetcher from "../services/fetcher"

const ShopPage = ({ data }) => {
  const { data: products, loading, error } = useSWR(
    `wp-json/wc/v3/products?per_page=100`,
    fetcher
  )

  console.log(products)

  return (
    <Layout>
      <SEO title="Shop" />
      <Banner
        details={[
          "crepplug shop",
          "On CrepPlug, you can Buy and Sell New Trainers or Used Trainers, exclusive Custom Air Force 1, Nikes, Jordan’s, Yeezy’s and much more for the cheapest prices on the market.",
          data.banner.childImageSharp.fluid,
          false,
        ]}
      />
      <div className="container container-wide pt-4 pt-md-0"></div>
    </Layout>
  )
}

export default ShopPage

export const query = graphql`
         query {
           banner: file(relativePath: { eq: "banners/crep.jpg" }) {
             childImageSharp {
               fluid(maxHeight: 175) {
                 ...GatsbyImageSharpFluid_withWebp_tracedSVG
               }
             }
           }
           dcrease: file(relativePath: { eq: "dcrease/banner.jpg" }) {
             childImageSharp {
               fluid(quality: 100, maxWidth: 250) {
                 ...GatsbyImageSharpFluid_withWebp_tracedSVG
               }
             }
           }
         }
       `
