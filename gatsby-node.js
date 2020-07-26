exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/posts/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/posts/*"
    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data
  const allPokemon = ["pikachu", "charizard", "squirtle"]

  allPokemon.forEach(pokemon => {
    createPage({
      path: `/posts/${pokemon}/`,
      component: require.resolve("./src/pages/faq.js"),
      context: { pokemon },
    })
  })
}
