export const removeProduct = (user, itemId, data) => {
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
      for (var i in data) {
        if (data[i].item_id === itemId) {
          data.splice(i, 1)
          break
        }
      }
    })
    .catch(err => {
      console.log(err)
    })

  return data
}
