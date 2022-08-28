import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Cleaning" />
        <Banner
          details={[
            "cleaning",
            "If you can't find what you're looking for you can contact us to source your desired product and we'll deliver them straight to you.",
            data.banner.childImageSharp.fluid,
            false,
          ]}
        />
        <div className="container container-wide pt-5">
          <h1 className="d-md-none pt-3">Sourcing</h1>
          <div className="row">
            <div className="col-md-4">
              <p className="text-gray">
                Fill in the form with the details and photos of the pair of
                sneakers you need cleaned. We will get back to you ASAP with the
                treatment your sneakers require.
              </p>
              <h4>Standard Treatment: £20</h4>
              <p className="text-gray">
                Our standard treatment includes a deep upper & midsole clean and
                under-sole clean including Jordans, Yeezys etc.
              </p>
              <h4>Premium Treatment: £25</h4>
              <p className="text-gray">
                Our premium treatment includes a deep upper & midsole clean and
                under-sole clean including luxury designer trainers such as Dior
                B22’s, Balenciagas etc. Each initial order comes with a pack of
                free shoe trees.
              </p>
            </div>
            <div className="col-md-1" />
            <div className="col-md-7 contactform m-0 pl-md-5">
              <form name="cleaning" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="cleaning" />
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="model">Trainer Model *</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlhtmlFor="size">UK Size *</label>
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
                  <label htmlFor="instagram">
                    Instagram * (Expect to receive an invoice within two hours)
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control"
                    rows="5"
                  />
                </div>
                <div className="form-group">
                  <label>Upload a photo</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="attachments"
                    />
                    <label
                      className="custom-file-label"
                      htmlhtmlFor="attachments"
                    >
                      Choose file
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-secondary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    banner: file(relativePath: { eq: "banners/cleaning.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default PageComponent
