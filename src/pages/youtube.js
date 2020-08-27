import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { timeSince } from "../services/utils"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

const PageComponent = props => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUwhodydfRJqjGkN2d08QN_g&key=AIzaSyBZXU8QfJyU9osaRzUaBgjPTIaU6zA_lIo&part=snippet&maxResults=100`
    )
      .then(res => res.json())
      .then(res => {
        setData(res.items)
        console.log(res.items)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <SEO title="YouTube" />
      <Banner
        details={[
          "youtube",
          "Watch content that we've created via our YouTube channel, which features our On the Feed series, Loobook series & more to come. Created by the community for the community.",
          props.data.banner.childImageSharp.fluid,
        ]}
      />
      <div className="container container-wide pt-5">
        <div className="row">
          {data
            ? data.map(video => (
                <div
                  className="col-6 col-sm-4 col-md-3 col-xl-24 mb-4"
                  key={video.id}
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                    target="_blank"
                  >
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className="w-100"
                    />
                    <h5 className="my-2">{video.snippet.title}</h5>
                    <p className="text-gray">
                      {timeSince(video.snippet.publishedAt)}
                    </p>
                  </a>
                </div>
              ))
            : null}
        </div>
      </div>
    </Layout>
  )
}

export default PageComponent

export const pageQuery = graphql`
  query {
    banner: file(relativePath: { eq: "banners/youtube.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`
