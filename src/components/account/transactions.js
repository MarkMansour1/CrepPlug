import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import Loader from "../loader"

import { getUser } from "../../services/auth"
import { Transactions } from "../svg"

const AccountSection = () => {
  const [purchases, setPurchases] = useState(null)
  const [sales, setSales] = useState(null)
  const [loading, setLoading] = useState(0)
  const user = getUser()

  // ?consumer_key=${process.env.GATSBY_CONSUMER_KEY}&consumer_secret=${process.env.GATSBY_CONSUMER_SECRET}

  useEffect(() => {
    // Purchases
    fetch(
      `${process.env.GATSBY_SITE_URL}/wp-json/wc/v3/orders?customer=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then(response => response.json())
      .then(resultData => {
        setPurchases(resultData)
        setLoading(loading => {
          return loading + 1
        })
      })
      .catch(err => {
        console.log(err)
      })

    // Sales
    fetch(`${process.env.GATSBY_SITE_URL}/wp-json/wcfmmp/v1/orders`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setSales(resultData)
        setLoading(loading => {
          return loading + 1
        })
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
      {loading === 2 ? (
        <Tabs justify defaultActiveKey="purchases">
          <Tab eventKey="purchases" title="Purchases">
            {purchases.length < 1 ? (
              <div className="py-4 text-center">
                <h3>No purchases yet</h3>
                <Link to="/shop" className="btn btn-secondary">
                  Shop the feed
                </Link>
              </div>
            ) : (
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
                  {purchases.map(order => (
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
                  ))}
                </tbody>
              </table>
            )}
          </Tab>
          <Tab eventKey="sales" title="Sales">
            {sales.length < 1 ? (
              <div className="py-4 text-center">
                <h3>No sales yet</h3>
                <Link to="/sell" className="btn btn-secondary">
                  List an item
                </Link>
              </div>
            ) : (
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
                  {sales &&
                    sales.map((order, index) => (
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
                    ))}
                </tbody>
              </table>
            )}
          </Tab>
        </Tabs>
      ) : (
        <Loader visible={true} />
      )}
    </div>
  )
}

export default AccountSection
