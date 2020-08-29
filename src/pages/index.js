import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { RightArrow } from "../components/svg"

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

    const { nike, adidas, jordan, puma, yeezy, vans } = data

    const brands = [
      { name: "Nike", image: nike },
      { name: "Adidas", image: adidas },
      { name: "Jordan", image: jordan },
      { name: "Puma", image: puma },
      { name: "Yeezy", image: yeezy },
      { name: "Vans", image: vans },
    ]

    return (
      <Layout>
        <SEO title="Home" />
        <div className="container container-wide py-5">
          <div className="block-wrapper">
            <div className="block-header">
              <h3>Shop By Brand</h3>
              <Link to="/shop" className="link-flat text-secondary">
                Shop All <RightArrow />
              </Link>
            </div>
            <div className="block-body row">
              {brands.map(brand => (
                <div
                  className="col-4 col-md-3 col-xl-2 mb-xl-0 mb-4"
                  key={brand.name}
                >
                  <Link to={`/shop?search=${brand.name.toLowerCase()}`}>
                    <Img
                      fluid={brand.image.childImageSharp.fluid}
                      alt={brand.name}
                      style={{ border: "2px solid #eee" }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
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

export const brandImage = graphql`
  fragment brandImage on File {
    childImageSharp {
      fluid(maxWidth: 300, maxHeight: 300) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`

export const query = graphql`
  query {
    nike: file(relativePath: { eq: "brands/nike.png" }) {
      ...brandImage
    }
    adidas: file(relativePath: { eq: "brands/adidas.png" }) {
      ...brandImage
    }
    jordan: file(relativePath: { eq: "brands/jordan.png" }) {
      ...brandImage
    }
    puma: file(relativePath: { eq: "brands/puma.png" }) {
      ...brandImage
    }
    yeezy: file(relativePath: { eq: "brands/yeezy.png" }) {
      ...brandImage
    }
    vans: file(relativePath: { eq: "brands/vans.png" }) {
      ...brandImage
    }
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
          localImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
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
