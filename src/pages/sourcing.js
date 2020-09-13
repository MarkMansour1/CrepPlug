import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

class PageComponent extends React.Component {
  state = {
    email: "",
    model: "",
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
    if (window.history.state) {
      this.setState({ model: window.history.state.name })
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Sourcing" />
        <div className="container pt-5" style={{ maxWidth: "500px" }}>
          <div className="text-center">
            <h2>Sourcing</h2>
            <p className="text-gray mb-4">
              Looking for a pair of trainers to buy? Fill out the form with the
              details of the pair you’re looking for. We will get back to you
              ASAP with a price.
            </p>
          </div>
          <form>
            <div className="form-group">
              <label htmlhtmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="model">Model (name of trainer)</label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={this.state.model}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="size">UK size</label>
              <input
                type="number"
                className="form-control"
                id="size"
                min="1"
                max="13"
                step="0.5"
              />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="instagram">
                Instagram (Expect to receive an invoice within two hours)
              </label>
              <input type="text" className="form-control" id="instagram" />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Additional notes</label>
              <textarea id="notes" className="form-control" rows="4" />
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
}

export default PageComponent
