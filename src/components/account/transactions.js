import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import Loader from "../loader"

import { getUser } from "../../services/auth"
import { Transactions } from "../svg"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    fetch(
      `${process.env.SITE_URL}/wp-json/wc/v3/orders?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`
    )
      .then(response => response.json())
      .then(resultData => {
        setData(resultData)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h2 className="title">
        Transactions
        <Transactions />
      </h2>
      <Loader visible={loading} />
      {data ? (
        <Tabs justify defaultActiveKey="purchases">
          <Tab eventKey="purchases" title="Purchases">
            <table className="table account-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Products</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order, index) => {
                  if (index % 2 == 0) {
                    return (
                      <tr key={order.id}>
                        <td>
                          <Link
                            to={`/account/order/${order.id}`}
                            className="text-secondary"
                          >
                            #{order.id}
                          </Link>
                        </td>
                        <td>
                          {order.line_items.map(item => (
                            <span className="d-block" key={item.name}>
                              {item.name}
                            </span>
                          ))}
                        </td>
                        <td>
                          {new Date(order.date_created).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{order.status}</td>
                        <td>£{order.total}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="sales" title="Sales">
            <table className="table account-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Products</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order, index) => {
                  if (index % 2 == 1) {
                    return (
                      <tr key={order.id}>
                        <td>
                          <Link
                            to={`/account/order/${order.id}`}
                            className="text-secondary"
                          >
                            #{order.id}
                          </Link>
                        </td>
                        <td>
                          {order.line_items.map(item => (
                            <span className="d-block">
                              {item.name} key={item.name}
                            </span>
                          ))}
                        </td>
                        <td>
                          {new Date(order.date_created).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{order.status}</td>
                        <td>£{order.total}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </Tab>
        </Tabs>
      ) : null}
    </div>
  )
}

export default AccountSection
