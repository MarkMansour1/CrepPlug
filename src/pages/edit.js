import React, { useState, useEffect } from "react"
import { navigate, graphql } from "gatsby"
import { useDropzone } from "react-dropzone"
import Select from "react-select"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Products } from "../components/svg"
import AccountNav from "../components/account/account-nav"

import { getUser, isBrowser, isLoggedIn } from "../services/auth"
import { updateProduct, uploadImage } from "../services/products"

const PageComponent = props => {
  const [name, setName] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [regularPrice, setRegularPrice] = useState(undefined)
  const [salePrice, setSalePrice] = useState(undefined)
  const [infiniteStock, setInfiniteStock] = useState(false)
  const [stockQuantity, setStockQuantity] = useState(1)
  const [categories, setCategories] = useState({ select: [], product: [] })
  const [colours, setColours] = useState({ select: [], product: [] })
  const [conditions, setConditions] = useState({ select: [], product: [] })
  const [sizes, setSizes] = useState({ select: [], product: [] })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const productOptions = getProductOptions(props)
  const {
    categoryOptions,
    colourOptions,
    conditionOptions,
    sizeOptions,
  } = productOptions

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wc/v3/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        //
        //
        setName(res.name)

        var tmp = document.createElement("SHORTDESC")
        tmp.innerHTML = res.short_description
        setShortDescription(tmp.textContent || tmp.innerText || "")

        setRegularPrice(res.regular_price)
        document.getElementById("regularPrice").value = res.regular_price

        if (parseFloat(res.sale_price) < parseFloat(res.regular_price)) {
          setSalePrice(res.sale_price)
          document.getElementById("salePrice").value = res.sale_price
        }

        if (res.manage_stock) {
          setStockQuantity(res.stock_quantity)
          document.getElementById("stockQuantity").value = res.stock_quantity
        } else {
          document.getElementById("infiniteStock").checked = true
          setInfiniteStock(true)
        }

        var resCategories = { select: [], product: [] }
        for (let i in res.categories) {
          resCategories.select.push({
            label: res.categories[i].name,
            value: { id: res.categories[i].id },
          })
          resCategories.product.push({ id: res.categories[i].id })
        }
        setCategories(resCategories)

        for (let i in res.attributes) {
          let resAtt = res.attributes[i]

          if (resAtt["name"] === "Colour") {
            setColours({
              select: resAtt.options.map(option => ({
                label: option,
                value: option,
              })),
              product: resAtt.options,
            })
          } else if (resAtt["name"] === "Condition") {
            setConditions({
              select: resAtt.options.map(option => ({
                label: option,
                value: option,
              })),
              product: resAtt.options,
            })
          } else if (resAtt["name"] === "Size") {
            setSizes({
              select: resAtt.options.map(option => ({
                label: option,
                value: option,
              })),
              product: resAtt.options,
            })
          }
        }

        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setLoading(true)

      for (let i in acceptedFiles) {
        let file = acceptedFiles[i]

        uploadImage(user, file).then(image => {
          if (image) {
            setImages(images => images.concat([image]))
          }

          setLoading(i => false)
        })
      }
    },
  })

  if (isBrowser()) {
    if (isLoggedIn()) {
      var user = getUser()
      const url = typeof window !== "undefined" ? window.location.search : ""
      const urlParams = new URLSearchParams(url)
      var productId = false
      if (urlParams.has("product")) {
        productId = urlParams.get("product")
      } else {
        navigate("/")
      }
    } else {
      const url = typeof window !== "undefined" ? window.location.search : ""
      navigate("/login")
      return null
    }
  }

  const formSubmit = e => {
    e.preventDefault()
    setLoading(true)

    const productData = {
      name: name,
      type: "simple",
      regular_price: regularPrice,
      sale_price: salePrice,
      short_description: shortDescription,
      images: images,
      categories: categories.product,
      // TODO check these ids and names with the other wordpress
      attributes: [
        {
          id: "3",
          name: "Colour",
          visible: true,
          variation: false,
          options: colours.product,
        },
        {
          id: "4",
          name: "Size",
          visible: true,
          variation: false,
          options: sizes.product,
        },
        {
          id: "2",
          name: "Condition",
          visible: true,
          variation: false,
          options: conditions.product,
        },
      ],
      meta_data: [
        {
          key: "_wcfm_product_views",
          value: "0",
        },
      ],
      manage_stock: !infiniteStock,
      stock_quantity: stockQuantity,
    }

    console.log(productData)

    updateProduct(productId, productData).then(res => {
      if (res.id) {
        setSuccess("Changes saved successfully.")
      } else {
        setError("We couldn't save your changes. Please try again later.")
      }

      window.scrollTo(0, 0)
      setLoading(false)
    })
  }

  return (
    <Layout>
      <SEO title="Edit Product" />
      <div className="container pt-5">
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <AccountNav user={user} />
          </div>
          <div className="col-12 col-md-9 account-wrapper">
            <div className="product-form">
              {success && (
                <div className="alert alert-success mb-4">{success}</div>
              )}
              {error && <div className="alert alert-danger mb-4">{error}</div>}
              <h2 className="title">
                Edit Product
                <Products />
              </h2>
              <form onSubmit={formSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={event => setName(event.target.value)}
                    value={name}
                    disabled={loading}
                    // required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortDescription">Description</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    id="shortDescription"
                    name="shortDescription"
                    onChange={event => setShortDescription(event.target.value)}
                    value={shortDescription}
                    disabled={loading}
                    // placeholder="Describe your product. Please include the condition of the sneaker (Deadstock/Used) and where you purchased the product from."
                  />
                  {/* <p className="mt-3">
              Please include the condition of the sneaker (Deadstock/Used) and
              where you purchased the product from.
            </p> */}
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="regularPrice">Price</label>
                    <div className="price-field">
                      <span>£</span>
                      <input
                        type="number"
                        className="form-control"
                        id="regularPrice"
                        name="regularPrice"
                        min="0"
                        onChange={event => setRegularPrice(event.target.value)}
                        disabled={loading}
                        // required
                      />
                    </div>
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="salePrice">Sale Price</label>
                    <div className="price-field">
                      <span>£</span>
                      <input
                        type="number"
                        className="form-control"
                        id="salePrice"
                        name="salePrice"
                        min="0"
                        max={regularPrice}
                        onChange={event => setSalePrice(event.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="stockQuantity">Stock Quantity</label>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="infiniteStock"
                      onChange={event => setInfiniteStock(event.target.checked)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="infiniteStock"
                    >
                      Unlimited stock?
                    </label>
                  </div>
                  {!infiniteStock && (
                    <input
                      type="number"
                      className="form-control stock-input"
                      id="stockQuantity"
                      name="stockQuantity"
                      min="1"
                      defaultValue="1"
                      onChange={event => setStockQuantity(event.target.value)}
                      disabled={loading}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="categories">Categories</label>
                  <Select
                    id="categories"
                    name="categories"
                    options={categoryOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={values =>
                      values
                        ? setCategories({
                            select: values,
                            product: values.map(val => ({ id: val.value })),
                          })
                        : setCategories({ select: [], product: [] })
                    }
                    value={categories.select}
                    isDisabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="conditions">Condition</label>
                  <Select
                    id="conditions"
                    name="conditions"
                    options={conditionOptions}
                    isMulti
                    closeMenuOnSelect={true}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={values =>
                      values
                        ? setConditions({
                            select: values,
                            product: values.map(val => val.value),
                          })
                        : setConditions({ select: [], product: [] })
                    }
                    value={conditions.select}
                    isDisabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="colours">Colours</label>
                  <Select
                    id="colours"
                    name="colours"
                    options={colourOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={values =>
                      values
                        ? setColours({
                            select: values,
                            product: values.map(val => val.value),
                          })
                        : setColours({ select: [], product: [] })
                    }
                    value={colours.select}
                    isDisabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sizes">Size(s)</label>
                  <Select
                    id="sizes"
                    name="sizes"
                    options={sizeOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={values =>
                      values
                        ? setSizes({
                            select: values,
                            product: values.map(val => val.value),
                          })
                        : setSizes({ select: [], product: [] })
                    }
                    value={sizes.select}
                    isDisabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Photos</label>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    Upload your images here
                  </div>
                  <aside className="thumbs-container">
                    {loading ? "Loading..." : null}
                    {images.map((image, index) => (
                      <div>
                        <div className="thumb" key={index}>
                          <div className="img-container">
                            <img src={image.src} className="thumb-img" />
                          </div>
                        </div>
                        <div
                          className="d-block"
                          onClick={() =>
                            setImages(images.filter(i => i.src !== image.src))
                          }
                        >
                          Remove
                        </div>
                      </div>
                    ))}
                  </aside>
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary btn-lg w-100"
                  disabled={loading}
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageComponent

export const query = graphql`
  query {
    categories: allWpProductCategory {
      edges {
        node {
          name
          databaseId
        }
      }
    }
    colours: allWpPaColour {
      edges {
        node {
          name
        }
      }
    }
    conditions: allWpPaCondition {
      edges {
        node {
          name
        }
      }
    }
    sizes: allWpPaSize {
      edges {
        node {
          name
        }
      }
    }
  }
`

const getProductOptions = props => {
  const productOptions = {
    categories: props.data.categories.edges,
    colours: props.data.colours.edges,
    conditions: props.data.conditions.edges,
    sizes: props.data.sizes.edges,
  }

  var categories = []
  // TODO update this with new wordpress
  var blacklist = ["All", "Uncategorized", "New", "Used"]
  for (let i in productOptions.categories) {
    let cat = productOptions.categories[i].node

    if (!blacklist.includes(cat.name)) {
      categories.push({
        value: cat.databaseId,
        label: cat.name,
      })
    }
  }

  var colours = []
  for (let i in productOptions.colours) {
    colours.push({
      value: productOptions.colours[i].node.name,
      label: productOptions.colours[i].node.name,
    })
  }

  var conditions = []
  for (let i in productOptions.conditions) {
    conditions.push({
      value: productOptions.conditions[i].node.name,
      label: productOptions.conditions[i].node.name,
    })
  }

  var sizes = []
  for (let i in productOptions.sizes) {
    sizes.push({
      value: productOptions.sizes[i].node.name,
      label: productOptions.sizes[i].node.name,
    })
  }

  return {
    categoryOptions: categories,
    colourOptions: colours,
    conditionOptions: conditions,
    sizeOptions: sizes,
  }
}
