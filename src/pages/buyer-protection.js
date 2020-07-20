import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/layout"

// import protection from "../img/protection.png"

class PageComponent extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title="Crep Plug | Buyer Protection" />
        <div className="protection-section">
          <h1> Our marketplace is 100% safe for buyers and sellers</h1>
          <div className="container">
            <div className="protectionbox">
              {/* <img src={protection} alt="Buyer Protection Guarantee" /> */}
              <h4>Crepplug + PayPal Protection</h4>
              <p>
                If anything goes wrong, every transaction conducted through
                Crepplug with PayPal is eligible for a full refund.
              </p>
            </div>
            <div className="block">
              <h3>Buyer Protection</h3>
              <div className="row">
                <div className="col-12 col-md-5 pr-5">
                  <div className="coveredbox">
                    <p>
                      <strong>What's covered</strong>
                    </p>
                    <ul>
                      <li>Items not delivered</li>
                      <li>Items not as described</li>
                      <li>Inauthentic items</li>
                    </ul>
                  </div>
                  <div className="coveredbox">
                    <p>
                      <strong>What's not covered</strong>
                    </p>
                    <ul>
                      <li>
                        Transactions completed off of CrepPlug (PayPal gifts,
                        Venmo, in person transactions, trades, etc.)
                      </li>
                      <li>Items purchased through PayPal Guest Checkout</li>
                      <li>Items that don't fit</li>
                      <li>
                        Items you decided you no longer want after purchasing
                      </li>
                      <li>
                        Claims that are closed prematurely or filed incorrectly
                      </li>
                      <li>Items reported after 90 days</li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <p>
                    <strong>How it works</strong>
                  </p>
                  <p>
                    If you follow these guidelines, you are eligible for PayPal
                    Buyer Protection:
                  </p>
                  <ul>
                    <li>Complete the transaction on CrepPlug (not offsite)</li>
                    <li>
                      Use your registered PayPal account (not guest checkout)
                    </li>
                    <li>
                      Provide a{" "}
                      <a
                        href="https://www.paypal.com/us/webapps/mpp/shipping-address-outside"
                        target="_blank"
                      >
                        PayPal Confirmed Shipping Address
                      </a>
                    </li>
                    <li>Report the issue to CrepPlug within 90 days.</li>
                    <li>
                      File the appropriate claim within 180 days of the
                      transaction
                    </li>
                    <li>
                      Do not close the claim until you confirm that the case is
                      resolved
                    </li>
                    <li>
                      See more at{" "}
                      <a
                        href="https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security"
                        target="_blank"
                      >
                        PayPal Buyer Protection
                      </a>
                    </li>
                  </ul>
                  <p className="mt-5">
                    <strong>PayPal Buyer Protection</strong>
                  </p>
                  <p>
                    If you do not receive your purchase or receive an item that
                    is significantly different from the listing,{" "}
                    <a href="https://shop.crepplug.com/contact-us">
                      contact our support team
                    </a>{" "}
                    and we will guide you through the process of receiving a
                    full refund (including shipping costs) through PayPal.
                  </p>
                </div>
              </div>
            </div>
            <div className="block">
              <h3>Seller Protection</h3>
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className="coveredbox">
                    <p>
                      <strong>What's covered</strong>
                    </p>
                    <ul>
                      <li>
                        Buyer chargebacks: files an unauthorized payment claim
                        with their payment provider.
                      </li>
                      <li>
                        Buyer claims the item was not received but your shipment
                        has been marked as delivered.
                      </li>
                      <li>Buyer claims the item is not as described but is.</li>
                      <li>
                        Buyer claims the item is inauthentic but the item is
                        authentic.
                      </li>
                    </ul>
                  </div>
                  <div className="coveredbox">
                    <p>
                      <strong>What's not covered</strong>
                    </p>
                    <ul>
                      <li>
                        Transactions completed off of CrepPlug (PayPal gifts,
                        Venmo, in person transactions, trades, etc.)
                      </li>
                      <li>
                        Items shipped without full online tracking (e.g. USPS
                        First Class International)
                      </li>
                      <li>Items reported after 90 days</li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <p>
                    <strong>How it works</strong>
                  </p>
                  <p>
                    If you follow these guidelines, you are eligible for PayPal
                    Seller Protection:
                  </p>
                  <ul>
                    <li>Complete the transaction on CrepPlug (not offsite)</li>
                    <li>
                      Ship the item with a tracking number. For items over £250,
                      get signature confirmation.
                    </li>
                    <li>
                      Ship to the confirmed address on the Transaction Details
                      page.
                    </li>
                    <li>Report the issue to CrepPlug within 90 days.</li>
                    <li>
                      See more at{" "}
                      <a
                        href="https://www.paypal.com/us/webapps/mpp/security/seller-protection"
                        target="_blank"
                      >
                        PayPal Seller Protection
                      </a>
                      .
                    </li>
                  </ul>
                  <p className="mt-5">
                    <strong>PayPal Seller Protection</strong>
                  </p>
                  <p>
                    If a buyer opens a PayPal claim on an item you sold on
                    CrepPlug, you can defend your claim with records: photos,
                    receipts, shipping tracking, etc. PayPal will review your
                    claim and can reimburse you for the full cost of the item
                    plus shipping costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageComponent
