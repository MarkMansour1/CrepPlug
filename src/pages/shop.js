import React from "react"
import { Link, graphql } from "gatsby"
import { InfiniteScroll } from "react-simple-infinite-scroll"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SingleProduct from "../components/single-product"

import { applyFilters, applySort } from "../services/filters"

class PageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      minPrice: null,
      maxPrice: null,
      categories: [],
      conditions: [],
      sizes: [],
      colours: [],
      search: "",
      sort: "recent",
      items: [],
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSorterChange = this.handleSorterChange.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
  }

  filterProducts() {
    const allProducts = this.props.data.products.edges
    var productList = applyFilters(this.state, allProducts.slice())

    this.setState({
      items: productList,
    })
  }

  clearFilters() {
    // TODO reset form elements as well

    this.setState(
      {
        minPrice: null,
        maxPrice: null,
        categories: [],
        conditions: [],
        sizes: [],
        colours: [],
        search: "",
      },
      () => this.filterProducts()
    )
  }

  handleFilterChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    if (name === "minPrice" || name === "maxPrice") {
      this.setState(
        {
          [name]: parseFloat(value),
        },
        () => this.filterProducts()
      )
    } else {
      var stateValues = this.state[name]
      var index = stateValues.indexOf(value)
      index > -1 ? stateValues.splice(index, 1) : stateValues.push(value)

      this.setState(
        {
          [name]: stateValues,
        },
        () => this.filterProducts()
      )
    }
  }

  handleSorterChange(event) {
    var value = event.target.value
    var productList = this.state.items.slice()
    productList = applySort(value, productList)

    this.setState({
      sort: value,
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
    var sizes = [6, 7, 8, 9]

    return (
      <Layout>
        <div className="container container-wide pt-5">
          <div className="row">
            <div className="col-3">
              <div className="shop-filters">
                <div className="py-3">Showing {this.state.items.length} products</div>
                <select
                  className="form-control mb-4"
                  onChange={this.handleSorterChange}
                >
                  <option value="recent">Sort By: Most Recent</option>
                  <option value="popular">Sort By: Most Popular</option>
                  <option value="priceasc">Sort By: Lowest Price</option>
                  <option value="pricedesc">Sort By: Highest Price</option>
                </select>
                <Accordion>
                  <Card>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="minPrice" />
                            <input
                              id="minPrice"
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
                            <label htmlFor="maxPrice" />
                            <input
                              id="maxPrice"
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
                          <div className="form-check" key={filter}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="categories"
                              onChange={this.handleFilterChange}
                            />
                            <label className="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      Categories
                      <span className="badge badge-light ml-3">
                        {this.state.categories.length > 0 &&
                          this.state.categories.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        {conditions.map(filter => (
                          <div className="form-check" key={filter}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="conditions"
                              onChange={this.handleFilterChange}
                            />
                            <label className="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      Condition
                      <span className="badge badge-light ml-3">
                        {this.state.conditions.length > 0 &&
                          this.state.conditions.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        {sizes.map(filter => (
                          <div className="form-check" key={filter}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="sizes"
                              onChange={this.handleFilterChange}
                            />
                            <label className="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                      Size
                      <span className="badge badge-light ml-3">
                        {this.state.sizes.length > 0 && this.state.sizes.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        {colours.map(filter => (
                          <div className="form-check" key={filter}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={filter}
                              id={filter}
                              name="colours"
                              onChange={this.handleFilterChange}
                            />
                            <label className="form-check-label" for={filter}>
                              {filter}
                            </label>
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                      Colour
                      <span className="badge badge-light ml-3">
                        {this.state.colours.length > 0 &&
                          this.state.colours.length}
                      </span>
                    </Accordion.Toggle>
                  </Card>
                </Accordion>
                <button
                  className="btn btn-light btn-sm w-100 mt-4"
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
                    <>
                      <div
                        className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                        key={product.id}
                      >
                        <SingleProduct data={product} />
                      </div>
                    </>
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
