import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

class PageComponent extends React.Component {
  render() {
    const url = typeof window !== "undefined" ? window.location.href : ""

    return (
      <Layout>
        <div className="container container-wide pt-5">
          <div className="row">
            <h2>Product</h2>
            <h4>{url}</h4>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent
