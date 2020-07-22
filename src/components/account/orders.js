import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

const AccountSection = () => {
  const [data, setData] = useState(0)

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wc/v3/orders?per_page=100`, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGVzaWduc3VpdGUucHJvIiwiaWF0IjoxNTk1NDEwNjA1LCJuYmYiOjE1OTU0MTA2MDUsImV4cCI6MTU5NjAxNTQwNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.G4UVrydLcSEXY165AauqjuA8QXwl9RgCLgunoV6E0_4",
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setData(resultData)
      })
  }, [])

  console.log(data)

  return (
    <div>
      <h2 className="mb-5">Orders</h2>
      <Tabs justify defaultActiveKey="purchases" transition={false}>
        <Tab eventKey="purchases" title="Purchases">
          <table class="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((order, index) => {
                    if (index % 2 == 0) {
                      return (
                        <tr>
                          <td>{order.id}</td>
                          <td>{order.line_items[0].name}</td>
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
          <table class="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((order, index) => {
                    if (index % 2 == 1) {
                      return (
                        <tr>
                          <td>{order.id}</td>
                          <td>{order.line_items[0].name}</td>
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
