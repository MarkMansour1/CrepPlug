import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  const url =
    typeof window !== "undefined" ? window.location.href.split("/") : ""
  const messageId = url[url.length - 1]

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wcfmmp/v1/enquiries/${messageId}`, {
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
    <div className="message-details">
      <Link to="/account/messages" className="link-flat text-secondary">
        <svg
          viewBox="0 0 16 16"
          className="bi bi-arrow-left"
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
        {` Back to all messages`}
      </Link>
      <div className="pt-4">
        {loading && <h4>Loading...</h4>}
        {data ? <MessageDetails message={data} /> : null}
      </div>
    </div>
  )
}

export default AccountSection

const MessageDetails = ({ message }) => {
  return (
    <div>
      <h3>Message #{message.ID}</h3>
      <p>Placed on: </p>
      <p className="m-0">Status: </p>
    </div>
  )
}
