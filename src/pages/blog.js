import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SinglePost from "../components/single-post"

class PageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      items: [],
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  filterProducts() {
    // const allPosts = this.props.data.products.edges
    // var productList = applyFilters(this.state, allProducts.slice())
    // this.setState({
    //   items: productList,
    // })
  }

  handleFilterChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    // if (name === "minPrice" || name === "maxPrice") {
    //   this.setState(
    //     {
    //       [name]: parseFloat(value),
    //     },
    //     () => this.filterProducts()
    //   )
    // } else {
    //   var stateValues = this.state[name]
    //   var index = stateValues.indexOf(value)
    //   index > -1 ? stateValues.splice(index, 1) : stateValues.push(value)

    //   this.setState(
    //     {
    //       [name]: stateValues,
    //     },
    //     () => this.filterProducts()
    //   )
    // }
  }

  componentDidMount() {
    const allPosts = this.props.data.posts.edges

    this.setState({
      items: allPosts,
    })
  }

  render() {
    const posts = this.props.data.posts.edges

    // var categories = ["All"]
    // for(let post in posts){
    //     for(let cat in posts[post].categories.nodes){
    //              categories.indexOf(posts[post].categories[j].name) === -1
    //       ? categories.push(posts[i].node.categories[j].name)
    //       : null
    //     }
    // }

    // for (var i = 0; i < posts.length; i++) {
    //   for (var j = 0; j < posts[i].node.categories.length; j++) {
    //     categories.indexOf(posts[i].node.categories[j].name) === -1
    //       ? categories.push(posts[i].node.categories[j].name)
    //       : null
    //   }
    // }

    return (
      <Layout>
        <SEO title="Shop" />
        <div className="container container-wide pt-5">
          <div className="row">
            {this.state.items.map(({ node: post }) => {
              return (
                <div className="col-3" key={post.id}>
                  <SinglePost data={post} />
                  category: {post.categories.nodes[0].name}
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
