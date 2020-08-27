import React from "react"
import { Link, graphql, navigate } from "gatsby"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import SingleProduct from "../components/single-product"
import ProductBlock from "../components/block-product"

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
    // TODO reset form elements

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
      () => {
        navigate("/shop")
        this.filterProducts()
      }
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

    const url = typeof window !== "undefined" ? window.location.search : ""
    const urlParams = new URLSearchParams(url)
    const searchString = urlParams.get("search") ? urlParams.get("search") : ""

    this.setState(
      {
        items: allProducts,
        search: searchString,
      },
      () => {
        this.filterProducts()
      }
    )
  }

  componentDidUpdate() {
    const url = typeof window !== "undefined" ? window.location.search : ""
    const urlParams = new URLSearchParams(url)
    const searchString = urlParams.get("search") ? urlParams.get("search") : ""

    if (searchString !== this.state.search) {
      this.setState(
        {
          search: searchString,
        },
        () => {
          this.filterProducts()
        }
      )
    }
  }

  render() {
    const { data } = this.props
    const allProducts = data.products.edges
    const allCategories = data.categories.edges

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

    var mostPopular = allProducts
      .slice()
      .sort(function () {
        return 0.5 - Math.random()
      })
      .slice(0, 10)

    return (
      <Layout>
        <SEO title="Shop" />
        <Banner
          details={[
            "crepplug shop",
            "On CrepPlug, you can Buy and Sell New Trainers or Used Trainers, exclusive Custom Air Force 1, Nikes, Jordan’s, Yeezy’s and much more for the cheapest prices on the market.",
            data.banner.childImageSharp.fluid,
            false,
          ]}
        />
        <div className="container container-wide">
          <ProductBlock
            title="Most Popular"
            link="/shop"
            linkText="Shop All"
            products={mostPopular}
          />
          <div className="row">
            <div className="col-3">
              <h3 className="pt-5">Filters</h3>
              <div className="shop-filters">
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
              <div className="d-flex justify-content-between align-items-center py-4">
                <div>
                  Showing {this.state.items.length}{" "}
                  {this.state.search.length > 1
                    ? `results for ${this.state.search}`
                    : "products"}
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
    banner: file(relativePath: { eq: "banners/crep.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
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
    categories: allWpProductCategory {
      edges {
        node {
          name
        }
      }
    }
  }
`
