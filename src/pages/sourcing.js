import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import sourcing from "../images/sourcing.jpg"

const SourcingPage = () => (
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
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
              <label for="model">Model (name of trainer)</label>
              <input type="text" class="form-control" id="model" />
            </div>
            <div class="form-group">
              <label for="size">UK size</label>
              <input type="text" class="form-control" id="size" />
            </div>
            <div class="form-group">
              <label for="instagram">
                Instagram (Expect to receive an invoice within two hours)
              </label>
              <input type="text" class="form-control" id="instagram" />
            </div>
            <div className="form-group">
              <label>Upload a photo</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">
                  Choose file
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-secondary w-100">
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
)

export default SourcingPage
