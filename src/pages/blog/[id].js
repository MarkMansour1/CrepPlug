import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Banner from "../../components/banner"
import SinglePost from "../../components/single-post"

import useSWR from "swr"
import fetcher from "../../services/fetcher"
import { Calendar } from "../../components/svg"

import { timeSince } from "../../services/utils"

const BlogPage = props => {
  const id = props.params.id

  const { data: post, loading, error } = useSWR(
    `wp-json/wp/v2/posts/${id}`,
    fetcher
  )

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="container pt-5">
        <div className="blog-post">
          <h2>{post?.title?.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
          <div className="blog-bottom">
            <div>
              <span className="mr-2">
                <Calendar size=".8rem" />
              </span>
              {timeSince(post?.date)}
            </div>
          </div>
          {/* <h3>Related Posts</h3>
          <div className="row">
            {posts.slice(0, 3).map(post => (
              <div className="col-6 col-md-4" key={post.id}>
                <SinglePost post={post} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
