import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { getUser } from "../../services/auth"
import { Messages } from "../svg"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wcfmmp/v1/enquiries`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setData(resultData)
      })
  }, [])

  console.log(data)

  return (
    <div className="account-settings">
      <h2 className="title">
        Messages
        <Messages />
      </h2>
      <table className="table account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Message</th>
            <th>Customer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map(message => (
                <tr>
                  <td>
                    <Link
                      to={`/account/message/${message.ID}`}
                      className="text-secondary"
                    >
                      #{message.ID}
                    </Link>
                  </td>
                  <td>{message.product_id}</td>
                  <td>{message.enquiry}</td>
                  <td>{message.customer_name}</td>
                  <td>
                    {new Date(message.posted).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default AccountSection
