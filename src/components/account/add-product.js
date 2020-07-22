import React from "react"

import Stepper from "bs-stepper"

class AccountSection extends React.Component {
  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
    })
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div style={{ maxWidth: "992px", margin: "0 auto" }}>
        <div id="stepper1" class="bs-stepper">
          <div class="bs-stepper-header">
            <div class="step" data-target="#details">
              <button class="step-trigger">
                <span class="bs-stepper-circle">1</span>
                <span class="bs-stepper-label">Product Info</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#categories">
              <button class="step-trigger">
                <span class="bs-stepper-circle">2</span>
                <span class="bs-stepper-label">Categories</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#images">
              <button class="step-trigger">
                <span class="bs-stepper-circle">3</span>
                <span class="bs-stepper-label">Images</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <div id="details" class="content">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Price</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Sale Price</label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="3" className="form-control" />
                </div>
              </form>
              <button
                class="btn btn-primary mt-3"
                onClick={() => this.stepper.next()}
              >
                Next
              </button>
            </div>
            <div id="categories" class="content">
              <form>
                <div className="form-group">
                  <label>Categories</label>
                  <select id="inputState" class="form-control">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Colour</label>
                  <select id="inputState" class="form-control">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="inputState">Size</label>
                  <select id="inputState" class="form-control">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </form>
              <button
                class="btn btn-primary mt-3 mr-3"
                onClick={() => this.stepper.previous()}
              >
                Previous
              </button>
              <button
                class="btn btn-primary mt-3"
                onClick={() => this.stepper.next()}
              >
                Next
              </button>
            </div>
            <div id="images" class="content">
              <div className="border p-5"></div>
              <button
                class="btn btn-primary mt-3 mr-3"
                onClick={() => this.stepper.previous()}
              >
                Previous
              </button>
              <button class="btn btn-primary mt-3">Add Product</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountSection
