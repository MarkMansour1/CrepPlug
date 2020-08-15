import React from "react"
import { Link, graphql } from "gatsby"

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
      posts[i].node.categories.nodes[0].name == categories.nodes[0].name &&
      related.length < 3 &&
      posts[i].node.title != title
    ) {
      related.push(posts[i])
    }
  }

  for (let i in posts) {
    if (related.length < 3 && posts[i].node.title != title) {
      related.push(posts[i])
    }
  }

  console.log(related)

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
                class="lazy avatar avatar-30 photo avatar-default"
                alt={author.name}
              />
              {author.node.name}
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-calendar-event-fill mr-2 mb-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm12.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                ></path>
              </svg>
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
                <SinglePost data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query post($id: String!) {
    page: wpPost(id: { eq: $id }) {
      id
      title
      slug
      excerpt
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          avatar {
            url
          }
          name
          slug
        }
      }
    }
    posts: allWpPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          date(formatString: "MMMM DD, YYYY")
          slug
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
              avatar {
                url
              }
            }
          }
        }
      }
    }
  }
`
