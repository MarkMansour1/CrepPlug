export const addWishlistProduct = (user, data) => {
  fetch(
    `${process.env.SITE_URL}/wp-json/wc/v3/wishlist/${user.shareKey}/add_product/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then(response => response.json())
    .then(res => {
      return true
    })
    .catch(err => {
      console.log(err)
    })

  return false
}

export const removeWishlistProduct = (user, itemId) => {
  fetch(
    `${process.env.SITE_URL}/wp-json/wc/v3/wishlist/remove_product/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
    .then(result => result.json())
    .then(result => {
      return true
    })
    .catch(err => {
      console.log(err)
    })

  return false
}
