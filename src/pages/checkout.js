import React from "react"
import { Link } from "gatsby"
import { PayPalButton } from "react-paypal-button-v2"

import Layout from "../components/layout"
import SEO from "../components/seo"

class PageComponent extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Checkout" />
        <div className="container text-center py-5">
          <h2>Checkout</h2>
          <PayPalButton
            options={{
              clientId: process.env.PAYPAL_CLIENTID,
              currency: "GBP",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "GBP",
                      value: "2.56",
                    },
                  },
                ],
                // application_context: {
                //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                // }
              })
            }}
            onApprove={(data, actions) => {
              // Capture the funds from the transaction
              return actions.order.capture().then(function (details) {
                // Show a success message to your buyer
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                )
                console.log(details)
                console.log(data)

                // OPTIONAL: Call your server to save the transaction
                return fetch("", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                })
              })
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default PageComponent
