import React, { useEffect, useState } from "react"
import { Link, graphql, navigate } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import SingleProduct from "../components/single-product"
import ProductBlock from "../components/block-product"
import { RightArrow, Filters, UpChevron, DownChevron } from "../components/svg"

import {
  applyFilters,
  applySort,
  mostPopularFunction,
} from "../services/filters"

import dcreaselogo from "../images/dcrease/dcrease-logo.png"
import useSWR from "swr"
import fetcher from "../services/fetcher"

const ShopPage = ({ data }) => {
  const [state, setState] = useState({
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
  })

  const { data: products, loading, error } = useSWR(
    `wp-json/wc/v3/products?per_page=100`,
    fetcher
  )

  const filterProducts = () => {
    if (!products) return

    // var productLists = applyFilters(state, products.slice())

    let productLists = {
      sold: [],
      unsold: [],
    }

    setState({
      ...state,
      items: productLists.unsold,
      soldItems: productLists.sold,
    })
  }

  const toggleFilters = () => {
    setState({
      ...state,
      filtersClosed: !state.filtersClosed,
    })
  }

  const clearFilters = () => {
    setState({
      ...state,
      minPrice: null,
      maxPrice: null,
      categories: [],
      conditions: [],
      sizes: [],
      colours: [],
      search: "",
      urlSearch: "",
    })

    navigate("/shop")
    filterProducts()
  }

  const handleFilterChange = event => {
    const target = event.target
    const name = target.name
    const value = target.value

    if (name === "minPrice" || name === "maxPrice") {
      setState({ ...state, [name]: parseFloat(value) })
    } else if (name === "search") {
      setState({ ...state, [name]: value })
    } else {
      var stateValues = state[name]
      var index = stateValues.indexOf(value)
      index > -1 ? stateValues.splice(index, 1) : stateValues.push(value)

      setState({ ...state, [name]: stateValues })
    }

    filterProducts()
  }

  const handleSorterChange = event => {
    var value = event.target.value
    var productList = state.items.slice()
    productList = applySort(value, productList)

    setState({
      ...state,
      sort: value,
      items: productList,
    })
  }

  const url = typeof window !== "undefined" ? window.location.search : ""
  const urlParams = new URLSearchParams(url)
  const searchString = urlParams.get("search") ? urlParams.get("search") : ""

  useEffect(() => {
    setState({
      ...state,
      items: products ?? [],
      search: searchString,
      urlSearch: searchString,
    })

    filterProducts()
  }, [products, searchString])

  console.log(state)

  var conditions = ["New", "Used"]
  var categories = []
  var colours = []
  var sizes = []

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
      <div className="container container-wide pt-4 pt-md-0">
        {/* <ProductBlock
          title="Most Popular"
          link="/shop"
          linkText="Shop All"
          products={products?.slice(0, 10) ?? []}
        /> */}
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="row">
              <div className="col sticky">
                <h3 className="shop-filters-title" onClick={toggleFilters}>
                  <div>
                    <Filters size=".75em" />
                    {` Filters`}
                  </div>
                  <span>{state.filtersClosed ? "+" : "-"}</span>
                </h3>
                <div id="shop-filters-wrapper">
                  <div
                    id="shop-filters"
                    className={`shop-filters ${
                      state.filtersClosed ? "shop-filters-closed" : ""
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
                                value={state.search}
                                onChange={handleFilterChange}
                                placeholder="Search..."
                              />
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Search
                          <span className="badge badge-light ml-3">
                            {state.search.length > 0 && "1"}
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
                                  onChange={handleFilterChange}
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
                                  onChange={handleFilterChange}
                                />
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          Price Range
                          <span className="badge badge-light ml-3">
                            {state.minPrice && state.maxPrice
                              ? "2"
                              : state.minPrice || state.maxPrice
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
                                  onChange={handleFilterChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={filter}
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
                            {state.categories.length > 0 &&
                              state.categories.length}
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
                                  onChange={handleFilterChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={filter}
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
                            {state.conditions.length > 0 &&
                              state.conditions.length}
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
                                  onChange={handleFilterChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={filter}
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
                            {state.sizes.length > 0 && state.sizes.length}
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
                                  onChange={handleFilterChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={filter}
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
                            {state.colours.length > 0 && state.colours.length}
                          </span>
                        </Accordion.Toggle>
                      </Card>
                    </Accordion>
                    {/* <button
                        className="btn btn-light btn-sm w-100 my-4"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button> */}
                  </div>
                </div>
                <div className="shop-filters-header">
                  <div>
                    Showing {state.items.length}{" "}
                    {state.search.length > 0
                      ? `results for "${state.search}"`
                      : "items"}
                  </div>
                  <select
                    className="form-control form-control-sm"
                    onChange={handleSorterChange}
                  >
                    <option value="recent">Sort By: Most Recent</option>
                    <option value="popular">Sort By: Most Popular</option>
                    <option value="priceasc">Sort By: Lowest Price</option>
                    <option value="pricedesc">Sort By: Highest Price</option>
                  </select>
                </div>
                <div className="shop-banner d-none d-md-block">
                  <a
                    href={`${process.env.GATSBY_SITE_URL}/product/d-crease-insert`}
                  >
                    <BackgroundImage
                      Tag="div"
                      fluid={data.dcrease.childImageSharp.fluid}
                    >
                      <div className="shop-banner-container">
                        <div>
                          <img src={dcreaselogo} alt="" />
                        </div>
                        <div className="dcrease-txt">
                          Go
                          <span>
                            Crease <br /> Free
                          </span>
                        </div>
                        <div className="dcrease-link">
                          A CrepPlug verified <br /> crease preventer{" "}
                          <RightArrow />
                        </div>
                      </div>
                    </BackgroundImage>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="justify-content-between align-items-center d-none d-md-flex py-4">
              <div>
                Showing {state.items.length}{" "}
                {state.search.length > 0
                  ? `results for "${state.search}"`
                  : "items"}
              </div>
              <select
                className="form-control form-control-sm"
                onChange={handleSorterChange}
                style={{ maxWidth: "300px" }}
              >
                <option value="recent">Sort By: Most Recent</option>
                <option value="popular">Sort By: Most Popular</option>
                <option value="priceasc">Sort By: Lowest Price</option>
                <option value="pricedesc">Sort By: Highest Price</option>
              </select>
            </div>
            <div className="row">
              {state.items.map(product => {
                return (
                  <>
                    <div
                      className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                      key={product.id}
                    >
                      <SingleProduct product={product} />
                    </div>
                  </>
                )
              })}
            </div>
            <div className="row mt-5">
              {state.soldItems.map(product => {
                return (
                  <>
                    <div
                      className="col-6 col-sm-4 col-lg-3 col-xl-24 mb-4"
                      key={product.id}
                    >
                      <SingleProduct product={product} />
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

export default ShopPage

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "banners/crep.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 175) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    dcrease: file(relativePath: { eq: "dcrease/banner.jpg" }) {
      childImageSharp {
        fluid(quality: 100, maxWidth: 250) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`
