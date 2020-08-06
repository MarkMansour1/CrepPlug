export const applyFilters = (state, productList) => {
  // If a minimum price is set, remove all products below it
  if (state.minPrice !== null) {
    for (var i = 0; i < productList.length; i++) {
      if (parseFloat(productList[i].node.price.substr(1)) < state.minPrice) {
        productList.splice(i, 1)
        i--
      }
    }
  }

  // If a maximum price is set, remove all products above it
  if (state.maxPrice !== null) {
    for (var i = 0; i < productList.length; i++) {
      if (parseFloat(productList[i].node.price.substr(1)) > state.maxPrice) {
        productList.splice(i, 1)
        i--
      }
    }
  }

  // If there are category filters enabled, apply them to the product list
  if (state.categories.length > 0) {
    // Loops through every product in the list
    for (var i = 0; i < productList.length; i++) {
      // Checks if any of the product categories are included in the filters
      if (
        !productList[i].node.productCategories.nodes.some(
          category => state.categories.indexOf(category.name) >= 0
        )
      ) {
        // If not, remove the product from the array
        productList.splice(i, 1)
        i--
      }
    }
  }

  // If there are condition filters enabled, apply them to the product list
  if (state.conditions.length > 0) {
    for (var i = 0; i < productList.length; i++) {
      var product = productList[i].node

      // Creates an array of conditions from the product attributes
      var conditions = []
      if (product.attributes) {
        for (var index in product.attributes.nodes) {
          if (product.attributes.nodes[index].name === "pa_condition") {
            conditions = conditions.concat(
              product.attributes.nodes[index].options
            )
          }
        }
      }

      // If none of the product conditions match an active filter, remove the product from the list
      if (
        !state.conditions.some(
          condition => conditions.indexOf(condition.toLowerCase()) >= 0
        )
      ) {
        productList.splice(i, 1)
        i--
      }
    }
  }

  // If there are size filters enabled, apply them to the product list
  if (state.sizes.length > 0) {
    for (var i = 0; i < productList.length; i++) {
      var product = productList[i].node

      // Creates an array of sizes from the product attributes
      var sizes = []
      if (product.attributes) {
        for (var index in product.attributes.nodes) {
          if (product.attributes.nodes[index].name === "pa_size") {
            sizes = sizes.concat(product.attributes.nodes[index].options)
          }
        }
      }

      // If none of the product sizes match an active filter, remove the product from the list
      if (!state.sizes.some(size => sizes.indexOf(size.toLowerCase()) >= 0)) {
        productList.splice(i, 1)
        i--
      }
    }
  }

  // If there are colour filters enabled, apply them to the product list
  if (state.colours.length > 0) {
    for (var i = 0; i < productList.length; i++) {
      var product = productList[i].node

      // Creates an array of colours from the product attributes
      var colours = []
      if (product.attributes) {
        for (var index in product.attributes.nodes) {
          if (product.attributes.nodes[index].name === "pa_colour") {
            colours = colours.concat(product.attributes.nodes[index].options)
          }
        }
      }

      // If none of the product colours match an active filter, remove the product from the list
      if (
        !state.colours.some(
          colour => colours.indexOf(colour.toLowerCase()) >= 0
        )
      ) {
        productList.splice(i, 1)
        i--
      }
    }
  }

  productList = applySort(state.sort, productList)

  return productList
}

export const applySort = (sort, productList) => {
  if (sort === "recent") {
    productList.sort(mostRecent)
  } else if (sort === "popular") {
    productList.sort(mostPopular)
  } else if (sort === "priceasc") {
    productList.sort(priceAscending)
  } else if (sort === "pricedesc") {
    productList.sort(priceDescending)
  }

  return productList
}

function mostRecent(a, b) {
  a = new Date(a.node.date)
  b = new Date(b.node.date)

  return b - a
}

function mostPopular(a, b) {
  return 0
}

function priceAscending(a, b) {
  a = parseFloat(a.node.price.substr(1))
  b = parseFloat(b.node.price.substr(1))

  if (a === b) {
    return 0
  } else {
    return a < b ? -1 : 1
  }
}

function priceDescending(a, b) {
  a = parseFloat(a.node.price.substr(1))
  b = parseFloat(b.node.price.substr(1))

  if (a === b) {
    return 0
  } else {
    return a > b ? -1 : 1
  }
}
