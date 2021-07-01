export const isBrowser = () => typeof window !== "undefined"

export const getCartProducts = () => {
  var products = null

  if (isBrowser() && localStorage.getItem("cartProducts")) {
    products = JSON.parse(localStorage.getItem("cartProducts"))
  }

  return products
}

export const addCartProduct = (user, productData, quantity, size) => {
  window.open(
    `${process.env.SITE_URL}/?add-to-cart=${productData.productId}`,
    "_blank",
    "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none"
  )

  return true
}

export const addLocalCartProduct = (user, productData, quantity, size) => {
  let products = []
  if (isBrowser() && localStorage.getItem("cartProducts")) {
    products = JSON.parse(localStorage.getItem("cartProducts"))
  }

  let productMatches = 0
  let currentQuantity = 0
  for (let i in products) {
    // Checks if there are other products with the same id
    if (products[i].productId === productData.productId) {
      productMatches += products[i].quantity

      // Checks if the size is also the same
      if (products[i].size === size) {
        currentQuantity += products[i].quantity
      }
    }
  }

  if (
    productMatches + quantity <= productData.stockQuantity ||
    productData.manageStock === false
  ) {
    // Removes all products with the same id/size in order to increase quantity instead of adding another copy
    products = products.filter(
      product =>
        !(product.productId === productData.productId && product.size === size)
    )

    products.push({
      productId: productData.productId,
      slug: productData.slug,
      image: productData.image,
      name: productData.name,
      size: size,
      price: productData.price,
      quantity: currentQuantity + quantity,
      // TODO remove this stockquantity and replace with useeffect on cart page
      stockQuantity: productData.stockQuantity,
      manageStock: productData.manageStock,
      vendorId: productData.vendorId,
    })
    localStorage.setItem("cartProducts", JSON.stringify(products))

    return true
  } else {
    return false
  }
}

export const removeCartProduct = (user, productId, productSize) => {
  var products = []

  if (isBrowser()) {
    let storageProducts = JSON.parse(localStorage.getItem("cartProducts"))
    products = storageProducts.filter(
      product =>
        !(product.productId === productId && product.size === productSize)
    )
    localStorage.setItem("cartProducts", JSON.stringify(products))
  }

  //  TODO remove from woocommmerce cart

  return products
}

export const clearCartProducts = user => {
  isBrowser() && localStorage.removeItem("cartProducts")

  //   TODO clear woocommmerce cart
}

export const changeCartQuantity = (user, productId, productSize, increase) => {
  let products = []
  if (isBrowser() && localStorage.getItem("cartProducts")) {
    products = JSON.parse(localStorage.getItem("cartProducts"))
  }

  let productMatches = 0
  for (let i in products) {
    if (products[i].productId === productId) {
      productMatches += products[i].quantity
    }
  }

  for (let i in products) {
    if (
      products[i].productId === productId &&
      products[i].size === productSize
    ) {
      if (increase === true) {
        if (
          productMatches < products[i].stockQuantity ||
          products[i].manageStock === false
        ) {
          products[i].quantity++
        }
      } else {
        if (products[i].quantity > 1) {
          products[i].quantity--
        }
      }
      break
    }
  }

  isBrowser() && localStorage.setItem("cartProducts", JSON.stringify(products))
  return products
  // TODO update woocommerce cart
}
