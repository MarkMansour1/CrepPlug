import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import sourcing from "../images/sourcing.jpg"

const PageComponent = () => (
  <Layout>
    <SEO title="Sourcing" />
    <div className="container container-wide">
      <div className="row" style={{ paddingTop: "50px" }}>
        <div className="col-6">
          <h2 className="text-gray-dark">Sourcing</h2>
          <p className="text-gray">
            Looking for a pair of trainers to buy? Fill out the form with the
            details of the pair you’re looking for. We will get back to you ASAP
            with a price.
          </p>
        </div>
        <div className="col-5 offset-1">
          <form>
            <div className="form-group">
              <label htmlhtmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="model">Model (name of trainer)</label>
              <input type="text" className="form-control" id="model" />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="size">UK size</label>
              <input type="number" className="form-control" id="size" />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="instagram">
                Instagram (Expect to receive an invoice within two hours)
              </label>
              <input type="text" className="form-control" id="instagram" />
            </div>
            <div className="form-group">
              <label>Upload a photo</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlhtmlFor="customFile">
                  Choose file
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary w-100">
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
)

export default PageComponent
