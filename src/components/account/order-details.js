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
    <div className="order-details">
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
      <div className="pt-4">
        {loading && <h4>Loading...</h4>}
        {data ? <OrderDetails order={data} /> : null}
      </div>
    </div>
  )
}

export default AccountSection

const OrderDetails = ({ order }) => {
  const billing = order.billing

  var shippingDetails = [
    ["Address 1", billing.address_1],
    ["Address 2", billing.address_2],
    ["Company", billing.company],
    ["City", billing.city],
    ["State", billing.state],
    ["Postcode", billing.postcode],
    ["Country", billing.country],
  ]

  var customerDetails = [
    ["Name", billing.first_name + " " + billing.last_name],
    ["Email", billing.email],
    ["Phone", "+44 " + billing.phone],
  ]

  return (
    <div>
      <h3>Order #{order.id}</h3>
      <p>Placed on: {new Date(order.date_created).toLocaleDateString()}</p>
      <p className="m-0">Status: {order.status}</p>
      <div className="pt-5">
        <h4>Order Items</h4>
        <table className="w-100">
          <thead>
            <tr>
              <th>Product(s)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="order-items">
            {order.line_items.map(item => (
              <tr>
                <td>
                  {item.name} x {item.quantity}
                </td>
                <td>£{item.total}</td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <th>Shipping</th>
              <td>£{order.shipping_total}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <td>£{order.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="d-flex justify-content-between pt-5">
        <div>
          <h4>Shipping Address:</h4>
          {shippingDetails.map(detail => {
            if (detail[1]) {
              return <div className="mb-1">{detail[1]}</div>
            }
          })}
        </div>
        <div>
          <h4>Customer Details:</h4>
          {customerDetails.map(detail => (
            <>
              <small className="d-block text-gray-light">{detail[0]}</small>
              <div className="mb-2">{detail[1]}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
