import React from "react"
import { Link, graphql } from "gatsby"
import { InfiniteScroll } from "react-simple-infinite-scroll"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SingleProduct from "../components/single-product"

class PageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      priceRange: [null, null],
      categories: [],
      conditions: [],
      sizes: [],
      colours: [],
      search: "",
      items: [],
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
  }

  handleFilterChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    if (name == "minPrice") {
      this.setState({
        priceRange: [value, this.state.priceRange[1]],
      })
    } else if (name == "maxPrice") {
      this.setState({
        priceRange: [this.state.priceRange[0], value],
      })
    } else {
      var stateValues = this.state[name]
      var index = stateValues.indexOf(value)
      index > -1 ? stateValues.splice(index, 1) : stateValues.push(value)

      this.setState({
        [name]: stateValues,
      })
    }

    this.filterProducts()
  }

  clearFilters() {
    this.setState({
      priceRange: [null, null],
      categories: [],
      conditions: [],
      sizes: [],
      colours: [],
      search: "",
    })

    this.filterProducts()
  }

  filterProducts() {
    var productList = this.props.data.products.edges

    if (this.state.categories.length > 0) {
      for (var i in productList) {
        if (
          productList[i].node.productCategories.nodes.some(
            category => this.state.categories.indexOf(category.name) >= 0
          ) === false
        ) {
          productList.splice(i, 1)
        }
      }
    }

    this.setState({
      items: productList,
    })
  }

  componentDidMount() {
    const allProducts = this.props.data.products.edges

    this.setState({
      items: allProducts,
    })
  }

  render() {
    const { data } = this.props
    const allProducts = data.products.edges

    const categories = ["Nike", "Adidas", "Vans", "Jordans"]
    const conditions = ["New", "Used"]
    const colours = ["White", "Black", "Red", "Blue", "Green"]
    var sizes = []
    for (var i = 1; i < 12; i += 0.5) {
      sizes.push(i)
    }

    return (
      <Layout>
        <div className="container container-wide pt-5">
          <div className="row">
            <div className="col-3">
              <div className="shop-filters">
                <Accordion>
                  <Card>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="priceRange0" />
                            <input
                              id="priceRange0"
                              className="form-control"
                              label="Min"
                              type="number"
                              min="0"
                              step="10"
                              placeholder="Min"
                              name="minPrice"
                              onChange={this.handleFilterChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="priceRange1" />
                            <input
                              id="priceRange1"
                              className="form-control"
                              label="Max"
                              type="number"
                              min="0"
                              step="10"
                              placeholder="Max"
                              name="maxPrice"
                              onChange={this.handleFilterChange}
                            />
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Price Range
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        {categories.map(filter => (
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="categories"
                              onChange={this.handleFilterChange}
                            />
                            <label class="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      Categories
                      <span class="badge badge-light ml-3">
                        {this.state.categories.length > 0 &&
                          this.state.categories.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        {conditions.map(filter => (
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="conditions"
                              onChange={this.handleFilterChange}
                            />
                            <label class="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      Condition
                      <span class="badge badge-light ml-3">
                        {this.state.conditions.length > 0 &&
                          this.state.conditions.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        {sizes.map(filter => (
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="sizes"
                              onChange={this.handleFilterChange}
                            />
                            <label class="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                      Size
                      <span class="badge badge-light ml-3">
                        {this.state.sizes.length > 0 && this.state.sizes.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        {colours.map(filter => (
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="colours"
                              onChange={this.handleFilterChange}
                            />
                            <label class="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                      Colour
                      <span class="badge badge-light ml-3">
                        {this.state.colours.length > 0 &&
                          this.state.colours.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                </Accordion>
                <button
                  className="btn btn-outline-primary btn-sm w-100 mt-4"
                  onClick={this.clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {this.state.items.map(({ node: product }) => {
                  return (
                    <div
                      className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                      key={product.id}
                    >
                      <SingleProduct data={product} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent

export const query = graphql`
  query {
    products: allWpSimpleProduct {
      edges {
        node {
          id
          slug
          name
          price
          regularPrice
          date
          image {
            sourceUrl
          }
          productCategories {
            nodes {
              name
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`
