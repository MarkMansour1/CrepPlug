export const getCartProducts = () => {
  if (localStorage.getItem("cartProducts")) {
    let products = JSON.parse(localStorage.getItem("cartProducts"))
    return products
  } else {
    return null
  }
}

export const addCartProduct = (user, productData, quantity, size) => {
  let products = []
  if (localStorage.getItem("cartProducts")) {
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

  //   TODO add to woocommmerce cart
}

export const removeCartProduct = (user, productId, productSize) => {
  let storageProducts = JSON.parse(localStorage.getItem("cartProducts"))
  let products = storageProducts.filter(
    product =>
      !(product.productId === productId && product.size === productSize)
  )
  localStorage.setItem("cartProducts", JSON.stringify(products))

  //  TODO remove from woocommmerce cart

  return products
}

export const clearCartProducts = user => {
  localStorage.removeItem("cartProducts")

  //   TODO clear woocommmerce cart
}

export const changeCartQuantity = (user, productId, productSize, increase) => {
  let products = []
  if (localStorage.getItem("cartProducts")) {
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

  localStorage.setItem("cartProducts", JSON.stringify(products))
  return products
  // TODO update woocommerce cart
}
