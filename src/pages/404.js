import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import kanye from "../images/kanye.png"

const PageComponent = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="container fourohfour">
      <h1>404</h1>
      <div className="d-block mb-5">
        <img src={kanye} />
      </div>
      <Link to="/shop" className="btn btn-primary btn-lg">
        Shop our latest products
      </Link>
    </div>
  </Layout>
)

export default PageComponent
