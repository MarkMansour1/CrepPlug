import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { RightArrow } from "../components/svg"

import ProductBlock from "../components/block-product"
import PostBlock from "../components/block-post"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.posts.edges
    var products = data.products.edges

    const { buy, sell, source } = data
    const { nike, adidas, jordan, puma, yeezy, vans } = data
    const brands = [
      { name: "Nike", image: nike },
      { name: "Adidas", image: adidas },
      { name: "Jordan", image: jordan },
      { name: "Puma", image: puma },
      { name: "Yeezy", image: yeezy },
      { name: "Vans", image: vans },
    ]

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

    products = shuffle(products.slice())

    var cpPicks = []
    for (var i = 0; i < products.length; i++) {
      if (
        cpPicks.length < 10 &&
        products[i].node.image &&
        products[i].node.image.sourceUrl
      ) {
        if (products[i].node.productCategories != null) {
          products[i].node.productCategories.nodes.forEach(category => {
            if (category.name === "Adidas") {
              cpPicks.push(products[i])
            }
          })
        }
      }
    }

    function shuffle(a) {
      var j, x, i
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a
    }

    return (
      <Layout>
        <SEO title="Home" />
        <div className="container container-wide pt-5 pt-md-4">
          <div className="row home-row">
            <div className="col-12 col-lg-8">
              <BackgroundImage Tag="div" fluid={buy.childImageSharp.fluid}>
                <div className="home-section home-buy">
                  <div>
                    <h1>
                      UK’s Biggest Sneaker <span>Marketplace</span>
                    </h1>
                    <Link to="/shop" className="btn btn-outline-light btn-lg">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </BackgroundImage>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <BackgroundImage Tag="div" fluid={sell.childImageSharp.fluid}>
                <div className="home-section home-sell">
                  <div>
                    <h2>
                      Sell your <span>trainers here</span>
                    </h2>
                    <Link
                      to="/account/add-product"
                      className="btn btn-outline-light"
                    >
                      Start Selling
                    </Link>
                  </div>
                </div>
              </BackgroundImage>
            </div>
            <div className="col-12 col-lg-8 d-none d-lg-block">
              <ProductBlock
                title="Most Popular"
                link="/shop"
                linkText="Shop All"
                products={mostPopular}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <BackgroundImage Tag="div" fluid={source.childImageSharp.fluid}>
                <div className="home-section home-source">
                  <div>
                    <h2>
                      Request a pair <span>of trainers</span>
                    </h2>
                    <Link to="/sourcing" className="btn btn-outline-light">
                      Sourcing
                    </Link>
                  </div>
                </div>
              </BackgroundImage>
            </div>
          </div>
          <div className="block-wrapper">
            <div className="block-header">
              <h3>Shop By Brand</h3>
              <Link to="/shop" className="link-flat text-secondary">
                Shop All <RightArrow />
              </Link>
            </div>
            <div className="block-body row pb-0">
              {brands.map((brand, index) => (
                <div
                  className={`col-4 col-md-3 col-xl-2 ${
                    index < 3 ? "mb-xl-0 mb-4" : ""
                  }`}
                  key={brand.name}
                >
                  <Link to={`/shop?search=${brand.name.toLowerCase()}`}>
                    <Img
                      fluid={brand.image.childImageSharp.fluid}
                      alt={brand.name}
                      style={{ border: "1px solid #dee4ea" }}
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
            products={cpPicks}
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

export const homeImage = graphql`
  fragment homeImage on File {
    childImageSharp {
      fluid(maxWidth: 1000, maxHeight: 500) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`
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
    buy: file(relativePath: { eq: "index/buy.jpg" }) {
      ...homeImage
    }
    sell: file(relativePath: { eq: "index/sell.jpg" }) {
      ...homeImage
    }
    source: file(relativePath: { eq: "index/source.jpg" }) {
      ...homeImage
    }
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
    products: allWpSimpleProduct {
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
