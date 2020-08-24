import React from "react"
import Img from "gatsby-image"

class Banner extends React.Component {
  render() {
    const { details } = this.props

    return (
      <div
        className={`container container-wide pt-5 ${
          details[3] != null ? "d-none d-md-block" : ""
        }`}
      >
        <div className="page-banner">
          <div className="banner-text">
            <h1>{details[0]}</h1>
            {(details[1] + "").split("~").map(line => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="banner-image">
            <Img fluid={details[2]} className="img-fluid" alt={details[0]} />
          </div>
        </div>
      </div>
    )
  }
}

export default Banner
