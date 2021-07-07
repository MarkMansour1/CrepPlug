import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

import Product from "../templates/product"
import Loader from "../components/loader"
import VariableProduct from "../templates/variable-product"
import { toInteger } from "lodash"

const PageComponent = ({ data }) => {
  const [productData, setProductData] = useState(null)

  const { products } = data

  // TODO replace id with url and get id from url slug
  const slug =
    typeof window !== "undefined"
      ? window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        )
      : null

  useEffect(() => {
    fetch(
      `${process.env.GATSBY_SITE_URL}/wp-json/wc/v3/products?slug=${slug}&consumer_key=${process.env.GATSBY_CONSUMER_KEY}&consumer_secret=${process.env.GATSBY_CONSUMER_SECRET}`
    )
      .then(res => res.json())
      .then(res => {
        let product = res[0]
        console.log(product)

        // Alter data to fit product template format
        product.productId = toInteger(product.id)

        product.price = "£" + (Math.round(product.price * 100) / 100).toFixed(2)
        product.regularPrice =
          "£" + (Math.round(product.regular_price * 100) / 100).toFixed(2)
        product.salePrice =
          "£" + (Math.round(product.sale_price * 100) / 100).toFixed(2)

        product.attributes.nodes = product.attributes
        product.shortDescription = product.short_description

        product.galleryImages = []
        product.galleryImages.nodes = product.images.map(img => ({
          sourceUrl: img.src,
        }))

        product.vendorId = product.store.vendor_id
        product.vendorName = product.store.vendor_display_name
        // TODO replace with real user image
        product.vendorImage =
          "https://secure.gravatar.com/avatar/493e06dec891b4cca35f683038394a92?s=96&d=mm&r=g"

        setProductData(product)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // Display the correct product type or loading screen
  return productData ? (
    productData.type === "variable" ? (
      <VariableProduct data={{ page: productData, products: products }} />
    ) : (
      <Product data={{ page: productData, products: products }} />
    )
  ) : (
    <Layout>
      <div className="container text-center pt-5">
        <h2>Loading product</h2>
        <Loader visible={true} />
      </div>
    </Layout>
  )
}

export default PageComponent

export const query = graphql`
  query {
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
