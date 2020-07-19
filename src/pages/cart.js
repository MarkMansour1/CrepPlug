import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Stepper from "bs-stepper"

import "bs-stepper/dist/css/bs-stepper.min.css"

class CartPage extends React.Component {
  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {})
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <Layout>
        <SEO title="Cart" />
        <link rel="stylesheet" href="bs-stepper.min.css"></link>
        <div className="container container-wide">
          <h2 className="text-gray-dark pt-5">Cart</h2>
          <div class="mb-5 p-4 bg-white shadow-sm">
            <h3>Linear stepper</h3>
            <div id="stepper1" class="bs-stepper">
              <div class="bs-stepper-header">
                <div class="step" data-target="#test-l-1">
                  <button class="step-trigger">
                    <span class="bs-stepper-circle">1</span>
                    <span class="bs-stepper-label">Email</span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#test-l-2">
                  <button class="step-trigger">
                    <span class="bs-stepper-circle">2</span>
                    <span class="bs-stepper-label">Password</span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#test-l-3">
                  <button class="step-trigger">
                    <span class="bs-stepper-circle">3</span>
                    <span class="bs-stepper-label">Validate</span>
                  </button>
                </div>
              </div>
              <div class="bs-stepper-content">
                <form onSubmit={this.onSubmit}>
                  <div id="test-l-1" class="content">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                      />
                    </div>
                    <button
                      class="btn btn-primary"
                      onClick={() => this.stepper.next()}
                    >
                      Next
                    </button>
                  </div>
                  <div id="test-l-2" class="content">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <button
                      class="btn btn-primary"
                      onClick={() => this.stepper.previous()}
                    >
                      Previous
                    </button>
                    <button
                      class="btn btn-primary"
                      onClick={() => this.stepper.next()}
                    >
                      Next
                    </button>
                  </div>
                  <div id="test-l-3" class="content text-center">
                    <button
                      class="btn btn-primary"
                      onClick={() => this.stepper.previous()}
                    >
                      Previous
                    </button>
                    <button type="submit" class="btn btn-primary mt-5">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default CartPage
