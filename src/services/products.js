export function createProduct(user, state) {
  const categories = []
  for (let i in state.categories) {
    categories.push({ id: state.categories[i] })
  }

  const data = {
    name: state.name,
    type: "simple",
    regular_price: state.regularPrice,
    sale_price: state.salePrice,
    short_description: state.shortDescription,
    categories: categories,
    attributes: [
      {
        id: "3",
        name: "Colour",
        visible: true,
        variation: false,
        options: state.colours,
      },
      {
        id: "4",
        name: "Size",
        visible: true,
        variation: false,
        options: state.sizes,
      },
      {
        id: "2",
        name: "Condition",
        visible: true,
        variation: false,
        options: state.conditions,
      },
    ],
  }

  console.log(data)
  console.log(JSON.stringify(data))

  // TODO add images

  fetch(`${process.env.SITE_URL}/wp-json/wc/v3/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}
