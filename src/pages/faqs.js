import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

class PageComponent extends React.Component {
  render() {
    const seller = [
      {
        question: "How do I get started?",
        answer:
          "You want to start selling? Make sure you have a PayPal account and go ahead and sign up by clicking My Account, fill in your profile/ account details.Now you can start uploading items, selling them and start making money in a matter of minutes.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Setting up a store at CrepPlug and posting items is completely FREE! We we want you to succeed as much as we do. Only when you sell something we take a (6%) transaction fee. We both win. There are no set up fees, no listing fees and no monthly fees.",
      },
      {
        question: "How many items can I upload?",
        answer:
          " There is no limit at all and you are allowed to upload how many items you want.",
      },
    ]

    const buyer = [
      {
        question: "How many items can I upload?",
        answer:
          " There is no limit at all and you are allowed to upload how many items you want.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Setting up a store at CrepPlug and posting items is completely FREE! We we want you to succeed as much as we do. Only when you sell something we take a (6%) transaction fee. We both win. There are no set up fees, no listing fees and no monthly fees.",
      },
      {
        question: "How do I get started?",
        answer:
          "You want to start selling? Make sure you have a PayPal account and go ahead and sign up by clicking My Account, fill in your profile/ account details.Now you can start uploading items, selling them and start making money in a matter of minutes.",
      },
    ]

    return (
      <Layout>
        <SEO title="Sourcing" />
        <div className="container container-narrow">
          <h2 className="text-gray-dark text-center py-5">
            Frequently Asked Questions
          </h2>
          <h4>As a Seller</h4>
          <Accordion>
            {seller.map((faq, index) => (
              <Card>
                <Accordion.Collapse eventKey={index + 1}>
                  <Card.Body>{faq.answer}</Card.Body>
                </Accordion.Collapse>
                <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                  {faq.question}
                </Accordion.Toggle>
              </Card>
            ))}
          </Accordion>
          <h4 className="mt-5">As a Buyer</h4>
          <Accordion>
            {buyer.map((faq, index) => (
              <Card>
                <Accordion.Collapse eventKey={index + 1}>
                  <Card.Body>{faq.answer}</Card.Body>
                </Accordion.Collapse>
                <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                  {faq.question}
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
