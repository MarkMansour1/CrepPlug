import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { getUser } from "../../services/auth"
import { LeftArrow } from "../svg"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  const url =
    typeof window !== "undefined" ? window.location.href.split("/") : ""
  const orderId = url[url.length - 1]

  useEffect(() => {
    fetch(
      `${process.env.SITE_URL}/wp-json/wc/v3/orders/${orderId}?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`
    )
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
      <Link to="/account/transactions" className="link-flat text-secondary">
        <LeftArrow />
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
      <div className="alert alert-secondary" role="alert">
        Already shipped this order?{" "}
        <a href="#" className="alert-link">
          Mark as shipped.
        </a>
      </div>
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
              <tr key={item.id}>
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
          {shippingDetails.map((detail, index) => {
            if (detail[1]) {
              return (
                <div className="mb-1" key={index}>
                  {detail[1]}
                </div>
              )
            }
          })}
        </div>
        <div>
          <h4>Customer Details:</h4>
          {customerDetails.map((detail, index) => (
            <>
              <small className="d-block text-gray">{detail[0]}</small>
              <div className="mb-2" key={index}>
                {detail[1]}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
