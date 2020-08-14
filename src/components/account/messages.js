import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { getUser } from "../../services/auth"

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
      <h2 className="d-flex align-items-center justify-content-between">
        Messages
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-envelope"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
          ></path>
        </svg>
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
