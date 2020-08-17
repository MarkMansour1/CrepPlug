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
        <LeftArrow />
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
