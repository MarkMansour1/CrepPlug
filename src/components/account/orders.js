import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(0)
  const user = getUser()

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wc/v3/orders`, {
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
      <Tabs justify defaultActiveKey="purchases" transition={false}>
        <Tab eventKey="purchases" title="Purchases">
          <table className="table">
            <tbody>
              {data
                ? data.map((order, index) => {
                    if (index % 2 == 0) {
                      return (
                        <tr>
                          <td>{order.id}</td>
                          <td>
                            {order.line_items.map(item => (
                              <span className="d-block">{item.name}</span>
                            ))}
                          </td>
                          <td>{order.date_created.slice(0, 10)}</td>
                          <td>{order.status}</td>
                          <td>{order.total}</td>
                          <td>
                            <Link
                              to={`/account/order/${order.id}`}
                              className="btn btn-light btn-sm"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      )
                    }
                  })
                : null}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="sales" title="Sales">
          <table className="table">
            {/* <thead>
              <tr>
                <th>Order</th>
                <th>Products</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead> */}
            <tbody>
              {data
                ? data.map((order, index) => {
                    if (index % 2 == 1) {
                      return (
                        <tr>
                          <td>{order.id}</td>
                          <td>
                            {order.line_items.map(item => (
                              <span className="d-block">{item.name}</span>
                            ))}
                          </td>
                          <td>{order.date_created.slice(0, 10)}</td>
                          <td>{order.status}</td>
                          <td>{order.total}</td>
                          <td>
                            <Link
                              to={`/account/order/${order.id}`}
                              className="btn btn-light btn-sm"
                            >
                              View
                            </Link>
                          </td>
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
