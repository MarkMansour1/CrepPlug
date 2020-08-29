import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

import { getUser } from "../services/auth"

const PageComponent = () => {
  const user = getUser()

  return (
    <Layout>
      <SEO title="Sourcing" />
      <div className="container pt-5" style={{ maxWidth: "600px" }}>
        <div className="text-center">
          <h2>Sourcing</h2>
          <p className="text-gray mb-5">
            Looking for a pair of trainers to buy? Fill out the form with the
            details of the pair you’re looking for. We will get back to you ASAP
            with a price.
          </p>
        </div>
        <form>
          <div className="form-group">
            <label htmlhtmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
            />
          </div>
          <div className="form-group">
            <label htmlhtmlFor="model">Model (name of trainer)</label>
            <input
              type="text"
              className="form-control"
              id="model"
              value={window.history.state.name}
            />
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
    </Layout>
  )
}
export default PageComponent
