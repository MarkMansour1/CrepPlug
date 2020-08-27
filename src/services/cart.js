export const getCartProducts = () => {
  if (localStorage.getItem("cartProducts")) {
    let products = JSON.parse(localStorage.getItem("cartProducts"))
    return products
  } else {
    return null
  }
}

export const addCartProduct = (user, data) => {
  let products = []
  if (localStorage.getItem("cartProducts")) {
    products = JSON.parse(localStorage.getItem("cartProducts"))
  }

  //   TODO check if item already exists, if so add to quantity
  //   TODO add stockquantiy to data to check if it can add
  products.push({
    productId: data.id,
    slug: data.slug,
    image: data.image,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  })
  localStorage.setItem("cartProducts", JSON.stringify(products))

  //   TODO add to woocommmerce cart
}

export const removeCartProduct = (user, productId) => {
  let storageProducts = JSON.parse(localStorage.getItem("cartProducts"))
  let products = storageProducts.filter(
    product => product.productId !== productId
  )
  localStorage.setItem("cartProducts", JSON.stringify(products))

  //  TODO remove from woocommmerce cart

  return products
}

export const clearCartProducts = user => {
  localStorage.removeItem("cartProducts")

  //   TODO clear woocommmerce cart
}
