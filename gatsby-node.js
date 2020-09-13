// Creates client only route for all product pages
// This allows the page to be queried during runtime for products that haven't been built yet
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/product/)) {
    page.matchPath = "/product/*"
    createPage(page)
  }
}

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

// Creates a page for each product and post
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    data: {
      allWpSimpleProduct: { nodes: allProducts },
      allWpPost: { nodes: allPosts },
    },
  } = await graphql(`
    query {
      allWpSimpleProduct {
        nodes {
          id
          slug
        }
      }
      allWpPost {
        nodes {
          id
          uri
        }
      }
    }
  `)

  const productTemplate = path.resolve(`./src/templates/product.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)

  allProducts.forEach(product => {
    createPage({
      path: `/product/${product.slug}/`,
      component: slash(productTemplate),
      context: {
        id: product.id,
      },
    })
  })

  allPosts.forEach(post => {
    createPage({
      path: `/blog${post.uri}`,
      component: slash(postTemplate),
      context: {
        id: post.id,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WpSimpleProduct implements Node {
      vendorId: String
      vendorName: String
      vendorImage: String
    }
   
  `
  createTypes(typeDefs)
}
