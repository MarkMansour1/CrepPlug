import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  render() {
    return (
      <Layout minimal={true}>
        <SEO title="Contact Us" />
        <div className="layout-minimal">
          <h2 className="text-gray-dark">Contact Us</h2>
          <p className="text-gray-light mb-4">
            Before contacting the support team be sure to look at our{" "}
            <Link
              to="/faq"
              className="text-gray-light text-underline"
              target="_blank"
            >
              FAQs
            </Link>
            .
          </p>
          <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
              <label for="listing">Listing URL (Optional)</label>
              <input type="text" class="form-control" id="listing" />
            </div>
            <div class="form-group">
              <label for="reason">Reason for request</label>
              <input type="number" class="form-control" id="reason" />
            </div>
            <div class="form-group">
              <label for="message">Your message</label>
              <textarea class="form-control" id="message" rows="3" />
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
              Send Message
            </button>
          </form>
        </div>
      </Layout>
    )
  }
}

export default PageComponent
