export async function createProduct(user, productData) {
  const response = fetch(
    `${process.env.GATSBY_SITE_URL}/wp-json/wc/v3/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(productData),
    }
  )
    .then(response => response.json())
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}

export async function updateProduct(productId, productData) {
  // TODO maybe replace consumer keys with user token

  // const response = fetch(
  //   `${process.env.GATSBY_SITE_URL}/wp-json/wc/v3/products/${productId}?consumer_key=${process.env.GATSBY_CONSUMER_KEY}&consumer_secret=${process.env.GATSBY_CONSUMER_SECRET}`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(productData),
  //   }
  // )
  //   .then(res => res.json())
  //   .then(res => {
  //     return res
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })

  // TODO uncomment product add
  const response = {
    id: 1,
    slug: "patrick-ewings-33-hi-redblackwhite",
  }

  return response
}

export async function uploadImage(user, file) {
  let formData = new FormData()
  formData.append("file", file)
  formData.append("title", file.name)
  formData.append("caption", "")

  const data = await fetch(
    `${process.env.GATSBY_SITE_URL}/wp-json/wp/v2/media`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    }
  )
    .then(res => res.json())
    .then(data => {
      if (data.source_url) {
        return { src: data.source_url }
      } else {
        return null
      }
    })
    .catch(err => {
      console.log(err)
    })

  return data
}
