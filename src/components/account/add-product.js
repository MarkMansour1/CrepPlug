import React from "react"
import Select from "react-select"

import { getUser } from "../../services/auth"
import { createProduct } from "../../services/products"
import { AddProduct } from "../svg"

class AccountSection extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  state = {
    name: "",
    type: "simple",
    regularPrice: "",
    salePrice: "",
    shortDescription: "",
    categories: [],
    colours: [],
    conditions: [],
    sizes: [],
    stockQuantity: 1,
    // featuredImage: { src: "" },
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSelectChange = (selected, target) => {
    var items = []
    for (var i in selected) {
      items.push(selected[i].value)
    }

    this.setState({ [target.name]: items })
  }

  handlePhotoUpload = event => {
    var image = event.target.files[0]

    this.setState({
      featuredImage: { src: image },
    })

    console.log(image)
  }

  onSubmit(e) {
    e.preventDefault()

    createProduct(getUser(), this.state)
  }

  render() {
    const productOptions = this.props.productOptions

    var categories = []
    for (let i in productOptions.categories) {
      categories.push({
        value: productOptions.categories[i].node.databaseId,
        label: productOptions.categories[i].node.name,
      })
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

    return (
      <div className="w-75 mx-auto">
        <h2 className="title">
          Add Product
          <AddProduct />
        </h2>
        <form onSubmit={this.onSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="regularPrice">Price</label>
              <input
                type="number"
                className="form-control"
                id="regularPrice"
                name="regularPrice"
                min="0"
                step="10"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="salePrice">Sale Price</label>
              <input
                type="number"
                className="form-control"
                id="salePrice"
                name="salePrice"
                min="0"
                max={this.state.regularPrice}
                step="10"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="shortDescription">Description</label>
            <textarea
              rows="3"
              className="form-control"
              id="shortDescription"
              name="shortDescription"
              onChange={this.handleChange}
              placeholder=""
            />
            <small className="text-gray">
              Please include the condition of the sneaker (Deadstock/Used) and
              where you purchased the product from.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <Select
              id="categories"
              name="categories"
              options={categories}
              isMulti
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleSelectChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="conditions">Condition</label>
            <Select
              id="conditions"
              name="conditions"
              options={conditions}
              isMulti
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleSelectChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="colours">Colours</label>
            <Select
              id="colours"
              name="colours"
              options={colours}
              isMulti
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleSelectChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sizes">Sizes</label>
            <Select
              id="sizes"
              name="sizes"
              options={sizes}
              isMulti
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleSelectChange}
            />
          </div>
          <div className="form-group">
            <label>Upload a photo</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="featuredImage"
                name="featuredImage"
                // onChange={this.handlePhotoUpload}
              />
              <label className="custom-file-label" htmlFor="featuredImage">
                Choose file
              </label>
            </div>
          </div>
          <button className="btn btn-secondary w-100">Add Product</button>
        </form>
      </div>
    )
  }
}

export default AccountSection
