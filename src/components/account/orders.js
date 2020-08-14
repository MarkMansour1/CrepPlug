import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wc/v3/orders`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h2 className="d-flex align-items-center justify-content-between">
        Orders
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-bag-check"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"
          ></path>
          <path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z"></path>
          <path
            fill-rule="evenodd"
            d="M10.854 7.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"
          ></path>
        </svg>
      </h2>
      <Tabs justify defaultActiveKey="purchases" transition={false}>
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
              {data
                ? data.map((order, index) => {
                    if (index % 2 == 0) {
                      return (
                        <tr>
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
                              <span className="d-block">{item.name}</span>
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
                  })
                : null}
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
              {data
                ? data.map((order, index) => {
                    if (index % 2 == 1) {
                      return (
                        <tr>
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
                              <span className="d-block">{item.name}</span>
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
                  })
                : null}
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AccountSection
