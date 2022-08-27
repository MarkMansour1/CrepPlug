import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import SinglePost from "../components/single-post"

import useSWR from "swr"
import fetcher from "../services/fetcher"

const BlogPage = ({ data }) => {
  const { data: posts } = useSWR("wp-json/wp/v2/posts", fetcher)

  return (
    <Layout>
      <SEO title="Blog" />
      <Banner
        details={[
          "blog",
          "Read through our blog and find out about upcoming releases, discover new brands and individuals through our lookbooks, new ways to rock your favourite crep & more.",
          data.banner.childImageSharp.fluid,
        ]}
      />
      <div className="container container-wide pt-5">
        <div className="row">
          {posts &&
            posts.map(post => (
              <div className="col-3 mb-4" key={post.id}>
                <SinglePost post={post} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
         query {
           banner: file(relativePath: { eq: "banners/blog.jpg" }) {
             childImageSharp {
               fluid(maxHeight: 175) {
                 ...GatsbyImageSharpFluid_withWebp_tracedSVG
               }
             }
           }
         }
       `
