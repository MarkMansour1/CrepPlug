import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="FAQs" />
      <div className="container container-narrow">
        <h2 className="text-center py-5">Frequently Asked Questions</h2>
        {/* <h4>As a Seller</h4>
        <Accordion>
          {seller.map((faq, index) => (
            <Card key={index}>
              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body>{faq[1]}</Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                {faq[0]}
              </Accordion.Toggle>
            </Card>
          ))}
        </Accordion>
        <h4 className="mt-5">As a Buyer</h4>
        <Accordion>
          {buyer.map((faq, index) => (
            <Card key={index}>
              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body>{faq[1]}</Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                {faq[0]}
              </Accordion.Toggle>
            </Card>
          ))}
        </Accordion> */}
      </div>
    </Layout>
  )
}

export default IndexPage

