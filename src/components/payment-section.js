import React from "react"
import { PayPalButton } from "react-paypal-button-v2"

class PaymentSection extends React.Component {
  render() {
    const { subtotal, shipping, total } = this.props.totals

    return (
      <>
        <div className="cart-total mt-5 pt-4">
          <h3>Cart Totals</h3>
          <div className="row mb-3">
            <div className="col-6">
              <span>Subtotal</span>
              <span>Shipping</span>
              <span>Total</span>
            </div>
            <div className="col-6">
              <span>£{subtotal}</span>
              <span>£{shipping}</span>
              <span>£{total}</span>
            </div>
          </div>
          <PayPalButton
            options={{
              // clientId: process.env.PAYPAL_CLIENTID,
              clientId: "sb",
              currency: "GBP",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "GBP",
                      value: "10.00",
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
      </>
    )
  }
}

export default PaymentSection
