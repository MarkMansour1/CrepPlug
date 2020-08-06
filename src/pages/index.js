import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import ProductBlock from "../components/block-product"
import PostBlock from "../components/block-post"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const products = data.products.edges
    const posts = data.posts.edges

    var mostPopular = products
      .slice()
      .sort(function (a, b) {
        return Number(b.node.date) - Number(a.node.date)
      })
      .slice(0, 10)

    var mostRecent = []
    for (var i = 0; i < products.length; i++) {
      if (
        mostRecent.length < 10 &&
        products[i].node.image &&
        products[i].node.image.sourceUrl
      ) {
        mostRecent.push(products[i])
      }
    }

    return (
      <Layout>
        <SEO title="Home" />
        <div className="container container-wide py-5">
          <ProductBlock
            title="Most Popular"
            link="/shop"
            linkText="Shop All"
            products={mostPopular}
          />
          <ProductBlock
            title="Latest Footwear"
            link="/shop"
            linkText="Shop All"
            products={mostRecent}
          />
          <ProductBlock
            title="CrepPlug Picks"
            link="/shop"
            linkText="Shop All"
            products={mostPopular}
          />
          <PostBlock
            title="From The Blog"
            link="/blog"
            linkText="Read More"
            posts={posts}
          />
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const query = graphql`
  query {
    products: allWpSimpleProduct(limit: 10) {
      edges {
        node {
          id
          slug
          name
          price
          regularPrice
          date
          image {
            sourceUrl
          }
          productCategories {
            nodes {
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
    posts: allWpPost(limit: 6, sort: { fields: date, order: DESC }) {
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
          author {
            node {
              username
              avatar {
                url
              }
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
        }
      }
    }
  }
`
