import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(null)
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
          <table className="table order-table">
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
                  })
                : null}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="sales" title="Sales">
          <table className="table order-table">
            <tbody>
              {data
                ? data.map((order, index) => {
                    return <tr>{/* {copy from purchase orders here} */}</tr>
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
