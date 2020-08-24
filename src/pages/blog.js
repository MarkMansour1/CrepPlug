import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import SinglePost from "../components/single-post"

class PageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }

    this.filterPosts = this.filterPosts.bind(this)
  }

  filterPosts(filter) {
    const allPosts = this.props.data.posts.edges
    var postList = allPosts.slice()

    if (filter != "All") {
      for (let i = 0; i < postList.length; i++) {
        var contains = false

        for (let cat in postList[i].node.categories.nodes) {
          if (postList[i].node.categories.nodes[cat].name === filter) {
            contains = true
            break
          }
        }

        if (contains === false) {
          postList.splice(i, 1)
          i--
        }
      }
    }

    this.setState({
      items: postList,
    })
  }

  componentDidMount() {
    const allPosts = this.props.data.posts.edges

    this.setState({
      items: allPosts,
    })
  }

  render() {
    const { data } = this.props
    const posts = data.posts.edges

    var categories = ["All"]
    for (let post in posts) {
      for (let cat in posts[post].node.categories.nodes) {
        if (
          categories.indexOf(posts[post].node.categories.nodes[cat].name) === -1
        ) {
          categories.push(posts[post].node.categories.nodes[cat].name)
        }
      }
    }

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
          <div className="py-4">
            {categories.map(category => (
              <button
                className="btn btn-light btn-sm ml-2"
                key={category}
                id={category}
                onClick={() => {
                  this.filterPosts(category)
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="row">
            {this.state.items.map(({ node: post }) => {
              return (
                <div className="col-3 mb-4" key={post.id}>
                  <SinglePost data={post} />
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "banners/blog.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid
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
