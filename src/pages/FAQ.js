import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const SourcingPage = () => (
  <Layout>
    <SEO title="Sourcing" />
    <div className="container container-wide">
      <div className="row" style={{ paddingTop: "50px" }}>
        <div className="col-2">
          <h2 className="text-gray-dark">FAQs</h2>
        </div>
        <div className="col-9 offset-1">
          <h4>As a Seller</h4>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                How do I get started?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  You want to start selling? Make sure you have a PayPal account
                  and go ahead and sign up by clicking My Account, fill in your
                  profile/account details. Now you can start uploading items,
                  selling them and start making money in a matter of minutes.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                How much does it cost?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Setting up a store at CrepPlug and posting items is completely
                  FREE! We we want you to succeed as much as we do. Only when
                  you sell something we take a (6%) transaction fee. We both
                  win. There are no set up fees, no listing fees and no monthly
                  fees.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                How many items can I upload?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  There is no limit at all and you are allowed to upload how
                  many items you want.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <h4 className="mt-5">As a Buyer</h4>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                How do I get started?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  You want to start selling? Make sure you have a PayPal account
                  and go ahead and sign up by clicking My Account, fill in your
                  profile/account details. Now you can start uploading items,
                  selling them and start making money in a matter of minutes.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                How much does it cost?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Setting up a store at CrepPlug and posting items is completely
                  FREE! We we want you to succeed as much as we do. Only when
                  you sell something we take a (6%) transaction fee. We both
                  win. There are no set up fees, no listing fees and no monthly
                  fees.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                How many items can I upload?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  There is no limit at all and you are allowed to upload how
                  many items you want.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  </Layout>
)

export default SourcingPage
