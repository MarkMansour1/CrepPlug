import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

class PageComponent extends React.Component {
  render() {
    const { data } = this.props
    const page = { content: "" }

    var buyer, seller

    if (typeof window !== "undefined") {
      // Gets the content from the page
      let content = document.createElement("DIV")
      content.innerHTML = page.content
      let faqs = content.textContent || content.innerText || ""

      // Splits the faqs into buyer and seller
      faqs = faqs.split("As A Buyer")
      let spaces = "\n\n\n\n"

      // Splits each indivdual question and answer and creates an array
      seller = faqs[0].split(spaces)
      seller = seller
        .map(question => {
          let i = question.indexOf("?") + 1
          var qna = [question.slice(0, i), question.slice(i + 1)]
          return qna
        })
        .slice(1, seller.length - 1)

      buyer = faqs[1].split(spaces)
      buyer = buyer
        .map(question => {
          let i = question.indexOf("?") + 1
          var qna = [question.slice(0, i), question.slice(i + 1)]
          return qna
        })
        .slice(1, buyer.length - 1)
    }

    return (
      <Layout>
        <SEO title="FAQs" />
        <div className="container container-narrow">
          <h2 className="text-center py-5">Frequently Asked Questions</h2>
          <h4>As a Seller</h4>
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
          </Accordion>
        </div>
      </Layout>
    )
  }
}

export default PageComponent


