import React from "react"

function create(dataset) {
  fetch("https://designsuite.pro/wp-json/wcfmmp/v1/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGVzaWduc3VpdGUucHJvIiwiaWF0IjoxNTk1NTI2NzM5LCJuYmYiOjE1OTU1MjY3MzksImV4cCI6MTU5NjEzMTUzOSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMyJ9fX0.8jUmZRUF1shX0yh9vdWnUFSY_2aiIDi4k1PS7UQ3WJU",
    },
    body: JSON.stringify(dataset),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}

class AccountSection extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  state = {
    name: "",
    type: "simple",
    regular_price: "",
    sale_price: "",
    short_description: "",
    featured_image: { src: "" },
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handlePhotoUpload = event => {
    var image = event.target.files[0]

    this.setState({
      featured_image: { src: image },
    })

    console.log(image)
  }

  onSubmit(e) {
    e.preventDefault()
    create(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div id="details" className="form-group">
            <label for="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.handleUpdate}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="regular_price">Price</label>
              <input
                type="number"
                className="form-control"
                id="regular_price"
                name="regular_price"
                onChange={this.handleUpdate}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Sale Price</label>
              <input
                type="number"
                className="form-control"
                id="inputPassword4"
                onChange={this.handleUpdate}
              />
            </div>
          </div>
          <div className="form-group">
            <label for="short_description">Description</label>
            <textarea
              rows="3"
              className="form-control"
              id="short_description"
              name="short_description"
              onChange={this.handleUpdate}
            />
          </div>
          <div className="form-group">
            <label>Categories</label>
            <select id="inputState" className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Colour</label>
            <select id="inputState" className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div id="categories" className="form-group">
            <label htmlFor="inputState">Size</label>
            <select id="inputState" className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="form-group mb-5">
            <label>Upload a photo</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="featured_image"
                name="featured_image"
                onChange={this.handlePhotoUpload}
              />
              <label className="custom-file-label" htmlFor="featured_image">
                Choose file
              </label>
            </div>
          </div>
          <button className="btn btn-primary mt-3">Add Product</button>
        </form>
      </div>
    )
  }
}

export default AccountSection
