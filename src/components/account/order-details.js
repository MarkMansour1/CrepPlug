import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  const url =
    typeof window !== "undefined" ? window.location.href.split("/") : ""
  const orderId = url[url.length - 1]

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wc/v3/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Link to="/account/orders" className="link-flat text-secondary">
        <svg
          viewBox="0 0 16 16"
          class="bi bi-arrow-left"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
          />
          <path
            fill-rule="evenodd"
            d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        {` Back to all orders`}
      </Link>
      <hr className="my-4" />
      {loading && <h4>Loading...</h4>}
      {data ? <OrderDetails order={data} /> : null}
    </div>
  )
}

export default AccountSection

const OrderDetails = ({ order }) => {
  var customerEmail

  for (var index in order.meta_data) {
    if (order.meta_data[index].key == "_customer_email") {
      var customerEmail = order.meta_data[index].value
    }
  }

  // "first_name": "Ziggy",
  //   "last_name": "Botchey",
  //     "company": "",
  //       "address_1": "178 maple road",
  //         "address_2": "",
  //           "city": "London",
  //             "state": "Kent",
  //               "postcode": "SE20 8JB",
  //                 "country": "GB"

  var shippingFields = [
    "First Name",
    "Last Name",
    "Company",
    "Address 1",
    "Address 2",
    "City",
    "State",
    "Postcode",
    "Country",
    "Email",
    "Phone",
  ]

  var shippingDetails = []
  // TODO change billing back to shipping
  for (var i in order.billing) {
    shippingDetails.push(order.billing[i])
  }

  const billing = order.billing
  var customerDetails = [
    ["First Name", billing.first_name],
    ["Last Name", billing.last_name],
    ["Email", billing.email],
    ["Phone", billing.phone],
  ]

  return (
    <div>
      <h3>Order #{order.id}</h3>
      <p>
        Placed on{" "}
        <strong>{new Date(order.date_created).toLocaleDateString()}</strong> and
        currently <strong>{order.status}</strong>
      </p>
      <div className="d-flex justify-content-evenly">
        <div>
          <strong>Shipping Details:</strong>
          <p>
            {shippingDetails.map((detail, index) => (
              <div>{shippingFields[index] + ": " + detail}</div>
            ))}
          </p>
        </div>
        <div>
          <strong>Customer Details:</strong>
          <p>
            {customerDetails.map(detail => (
              <div>{detail[0] + ": " + detail[1]}</div>
            ))}
          </p>
        </div>
      </div>

      <hr />
      <h4>Order Details</h4>
    </div>
  )
}
