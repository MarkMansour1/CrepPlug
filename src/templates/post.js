import React from "react"
import { Link, graphql } from "gatsby"

import { Calendar } from "../components/svg"

import Layout from "../components/layout"
import SinglePost from "../components/single-post"

const PageTemplate = ({ data }) => {
  const page = data.page
  const { title, categories, content, date, author } = page

  const posts = data.posts.edges
  posts.sort(() => Math.random() - 0.5)

  var related = []
  for (let i in posts) {
    if (
      posts[i].node.categories.nodes[0].name === categories.nodes[0].name &&
      related.length < 3 &&
      posts[i].node.title !== title
    ) {
      related.push(posts[i])
    }
  }

  for (let i in posts) {
    if (related.length < 3 && posts[i].node.title !== title) {
      related.push(posts[i])
    }
  }

  return (
    <Layout>
      <div className="container pt-5">
        <div className="blog-post">
          <div className="blog-categories">
            {categories
              ? categories.nodes.map(category => (
                  <Link
                    to={`/blog`}
                    state={{ category: `${category.name}` }}
                    key={category.slug}
                  >
                    {category.name}
                  </Link>
                ))
              : null}
          </div>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div className="blog-bottom">
            <div className="blog-author">
              <img
                src={author.node.avatar && author.node.avatar.url}
                className="lazy avatar avatar-30 photo avatar-default"
                alt={author.name}
              />
              {author.node.name}
            </div>
            <div>
              <span className="mr-2">
                <Calendar size=".8rem" />
              </span>
              {date}
            </div>
            <div className="blog-categories">
              {categories
                ? categories.nodes.map(category => (
                    <Link
                      to={`/blog`}
                      state={{ category: `${category.name}` }}
                      key={category.slug}
                    >
                      {category.name}
                    </Link>
                  ))
                : null}
            </div>
          </div>
          <h3>Related Posts</h3>
          <div className="row">
            {related.map(({ node: post }) => (
              <div className="col-6 col-md-4" key={post.id}>
                <SinglePost post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageTemplate

