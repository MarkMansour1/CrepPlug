import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import SEO from "../components/seo"
import Banner from "../components/banner"
import SingleProduct from "../components/single-product"
import Loader from "../components/loader"

import { getUser } from "../services/auth"

const PageComponent = props => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  const url =
    typeof window !== "undefined" ? window.location.href.split("/") : ""
  const id = url[url.length - 1]

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wcfmmp/v1/store-vendors/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="store">
      <SEO title={data ? data.vendor_display_name : "Store"} />
      <Banner
        details={[
          data ? data.vendor_display_name : "Store name",
          "10 reviews. 5 stars. 5 products",
          props.banner.childImageSharp.fluid,
        ]}
      />
      <div className="container container-wide pt-5">
        <Tabs justify defaultActiveKey="products" transition={false}>
          <Tab eventKey="products" title="Products">
            <div className="row pt-5">
              {props.items.edges.map(({ node: product }) => {
                return (
                  <>
                    <div
                      className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                      key={product.id}
                    >
                      <SingleProduct data={product} />
                    </div>
                  </>
                )
              })}
            </div>
          </Tab>
          <Tab eventKey="reviews" title="Reviews"></Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default PageComponent
