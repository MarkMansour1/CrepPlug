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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    data: {
      allWpSimpleProduct: { nodes: allProducts },
    },
  } = await graphql(`
    query {
      allWpSimpleProduct {
        nodes {
          id
          slug
        }
      }
    }
  `)

  const productTemplate = path.resolve(`./src/templates/product.js`)

  allProducts.forEach(product => {
    createPage({
      path: `/product/${product.slug}/`,
      component: slash(productTemplate),
      context: {
        id: product.id,
      },
    })
  })
}
