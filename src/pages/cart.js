import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Stepper from "bs-stepper"

class PageComponent extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Cart" />
        <div className="container container-wide">
          <h2 className="text-gray-dark pt-5">Cart</h2>
        </div>
      </Layout>
    )
  }
}

export default PageComponent
