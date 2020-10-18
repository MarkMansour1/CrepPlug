import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import SEO from "../components/seo"
import Banner from "../components/banner"
import SingleProduct from "../components/single-product"
import { Filters } from "../components/svg"
import Loader from "../components/loader"

import { applyFilters, applySort } from "../services/filters"

const PageComponent2 = props => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const allProducts = props.items.edges

  const url =
    typeof window !== "undefined" ? window.location.href.split("/") : ""
  const vendorName = url[url.length - 1]

  // TODO get vendor socials etc to display
  // TODO get vendor reviews

  // useEffect(() => {
  // fetch(`${process.env.SITE_URL}/wp-json/wcfmmp/v1/store-vendors/${id}`, {
  //   headers: {
  //     Authorization: `Bearer ${user.token}`,
  //   },
  // })
  //   .then(res => res.json())
  //   .then(res => {
  //     setData(res)
  //     setLoading(false)
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, [])

  var products = allProducts.slice()
  for (let i = 0; i < products.length; i++) {
    if (products[i].node.vendorName !== vendorName) {
      products.splice(i, 1)
      i--
    }
  }

  return (
    <div className="store">
      <SEO title={`${vendorName}'s Store`} />
      <Banner
        details={[
          `${vendorName}'s Store`,
          "10 reviews. 5 stars. 5 products",
          props.banner.childImageSharp.fluid,
        ]}
      />
      <div className="container container-wide pt-5">
        <div className="row pt-5">
          {products.map(({ node: product }) => {
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
  )
}

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
      soldItems: [],
      filtersClosed: false,
      storeName: "Store",
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSorterChange = this.handleSorterChange.bind(this)
    this.toggleFilters = this.toggleFilters.bind(this)
  }

  filterProducts() {
    const allProducts = this.props.products.edges

    var products = allProducts.slice()
    for (let i = 0; i < products.length; i++) {
      if (products[i].node.vendorName !== this.state.storeName) {
        products.splice(i, 1)
        i--
      }
    }

    var productLists = applyFilters(this.state, products)

    this.setState({
      items: productLists.unsold,
      soldItems: productLists.sold,
    })
  }

  toggleFilters() {
    this.setState({
      filtersClosed: !this.state.filtersClosed,
    })
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
    } else if (name === "search") {
      this.setState(
        {
          [name]: value,
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
    console.log(productList)
    productList = applySort(value, productList)

    this.setState({
      sort: value,
      items: productList,
    })
  }

  componentDidMount() {
    const allProducts = this.props.products.edges

    const url =
      typeof window !== "undefined" ? window.location.href.split("/") : ""
    const vendorName = url[url.length - 1]

    this.setState(
      {
        items: allProducts,
        storeName: vendorName,
      },
      () => {
        this.filterProducts()
      }
    )
  }

  render() {
    const allSiteProducts = this.props.products.edges
    const allCategories = this.props.categories.edges

    const url =
      typeof window !== "undefined" ? window.location.href.split("/") : ""
    const vendorName = url[url.length - 1]

    var allProducts = allSiteProducts.slice()
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].node.vendorName !== vendorName) {
        allProducts.splice(i, 1)
        i--
      }
    }

    var conditions = ["New", "Used"]
    var categories = []
    var colours = []
    var sizes = []

    // Gets all the woocommerce product categories, excluding this list
    const exclude = ["New", "Used", "All", "Uncategorized", "Accessories"]
    for (let i in allCategories) {
      let category = allCategories[i].node.name
      if (exclude.includes(category) == false) {
        categories.push(category)
      }
    }

    // Gets all the available colours and sizes from all the products available
    for (let product in allProducts) {
      let attributes =
        allProducts[product].node.attributes &&
        allProducts[product].node.attributes.nodes

      for (let attribute in attributes) {
        let attr = attributes[attribute]
        if (attr.name == "pa_colour") {
          for (let option in attr.options) {
            let opt = attr.options[option]
            if (!colours.includes(opt)) {
              colours.push(opt)
            }
          }
        } else if (attr.name == "pa_size") {
          for (let option in attr.options) {
            let opt = attr.options[option]
            if (!sizes.includes(opt)) {
              sizes.push(opt)
            }
          }
        }
      }
    }
    // Puts the sizes in order
    sizes.sort((a, b) => a - b)

    return (
      <div>
        <SEO title="Shop" />
        {/* <Banner
          details={[
            this.state.storeName,
            "5 products, 10 reviews",
            this.props.banner.childImageSharp.fluid,
          ]}
        /> */}
        <div className="container container-wide pt-5">
          <h2 className="text-center">{this.state.storeName}'s store</h2>
          <div className="row mt-5">
            <div className="col-12 col-md-3">
              <div className="row">
                <div className="col sticky">
                  <h3
                    className="shop-filters-title"
                    onClick={this.toggleFilters}
                  >
                    <div>
                      <Filters />
                      {` Filters`}
                    </div>
                    <span>{this.state.filtersClosed ? "+" : "-"}</span>
                  </h3>
                  <div
                    className={`shop-filters ${
                      this.state.filtersClosed ? "shop-filters-closed" : ""
                    }`}
                  >
                    <Accordion>
                      <Card>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="form-group">
                              <label htmlFor="search" />
                              <input
                                id="search"
                                name="search"
                                className="form-control"
                                type="text"
                                value={this.state.search}
                                onChange={this.handleFilterChange}
                                placeholder="Search..."
                              />
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Search
                          <span className="badge badge-light ml-3">
                            {this.state.search.length > 0 && "1"}
                          </span>
                        </Accordion.Toggle>
                      </Card>
                      <Card>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            <div className="form-row">
                              <div className="form-group col">
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
                              <div className="form-group col">
                                <label htmlFor="maxPrice" />
                                <input
                                  id="maxPrice"
                                  className="form-control"
                                  label="Max"
                                  type="number"
                                  min="10"
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
                          <span className="badge badge-light ml-3">
                            {this.state.minPrice && this.state.maxPrice
                              ? "2"
                              : this.state.minPrice || this.state.maxPrice
                              ? "1"
                              : null}
                          </span>
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
                                <label
                                  className="form-check-label"
                                  for={filter}
                                >
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
                                <label
                                  className="form-check-label"
                                  for={filter}
                                >
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
                                <label
                                  className="form-check-label"
                                  for={filter}
                                >
                                  {filter}
                                </label>
                              </div>
                            ))}
                          </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="4">
                          Size
                          <span className="badge badge-light ml-3">
                            {this.state.sizes.length > 0 &&
                              this.state.sizes.length}
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
                                <label
                                  className="form-check-label"
                                  for={filter}
                                >
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
                  </div>
                  <div className="shop-filters-header">
                    <div>
                      Showing {this.state.items.length}{" "}
                      {this.state.search.length > 0
                        ? `results for "${this.state.search}"`
                        : "items"}
                    </div>
                    <select
                      className="form-control form-control-sm"
                      onChange={this.handleSorterChange}
                    >
                      <option value="recent">Sort By: Most Recent</option>
                      <option value="popular">Sort By: Most Popular</option>
                      <option value="priceasc">Sort By: Lowest Price</option>
                      <option value="pricedesc">Sort By: Highest Price</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="justify-content-between align-items-center d-none d-md-flex py-4">
                <div>
                  Showing {this.state.items.length}{" "}
                  {this.state.search.length > 0
                    ? `results for "${this.state.search}"`
                    : "items"}
                </div>
                <select
                  className="form-control form-control-sm"
                  onChange={this.handleSorterChange}
                  style={{ maxWidth: "300px" }}
                >
                  <option value="recent">Sort By: Most Recent</option>
                  <option value="popular">Sort By: Most Popular</option>
                  <option value="priceasc">Sort By: Lowest Price</option>
                  <option value="pricedesc">Sort By: Highest Price</option>
                </select>
              </div>
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
              <div className="row mt-5">
                {this.state.soldItems.map(({ node: product }) => {
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
      </div>
    )
  }
}

export default PageComponent
