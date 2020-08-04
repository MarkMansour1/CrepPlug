import React from "react"
import { Link, graphql } from "gatsby"
import { InfiniteScroll } from "react-simple-infinite-scroll"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import Layout from "../components/layout"
import SingleProduct from "../components/single-product"

class PageComponent extends React.Component {
  state = {
    items: [],
    isLoading: true,
    page: 2,
  }

  componentDidMount() {}

  render() {
    const { data } = this.props
    const allProducts = data.products.edges

    return (
      <Layout>
        <div className="container container-wide pt-5">
          <div className="row">
            <div className="col-3">
              <Accordion>
                <Card>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <ul>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Price Range
                  </Accordion.Toggle>
                </Card>
                <Card>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <ul>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Categories
                  </Accordion.Toggle>
                </Card>
                <Card>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <ul>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Condition
                  </Accordion.Toggle>
                </Card>
                <Card>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>
                      <ul>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Card.Header} eventKey="4">
                    Size
                  </Accordion.Toggle>
                </Card>
                <Card>
                  <Accordion.Collapse eventKey="5">
                    <Card.Body>
                      <ul>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                        <li>Filter</li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Toggle as={Card.Header} eventKey="5">
                    Colour
                  </Accordion.Toggle>
                </Card>
              </Accordion>
            </div>
            <div className="col-9">
              {/* <div className="row">
                {allProducts.map(({ node: product }) => (
                  <div className="col-3 mb-4">
                    <SingleProduct data={product} />
                  </div>
                ))}
              </div> */}
              {allProducts.map(({ node: product }, index) => {
                return (
                  <div
                    className="d-inline-block mr-5 mb-4"
                    key={product.id}
                    style={{ width: "15%" }}
                  >
                    <SingleProduct data={product} style={{ width: "100%" }} />
                  </div>
                )
              })}
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
