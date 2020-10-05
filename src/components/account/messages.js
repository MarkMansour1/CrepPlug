import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Loader from "../loader"

import { getUser } from "../../services/auth"
import { timeSince } from "../../services/utils"
import { Messages } from "../svg"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wp/v2/messages`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(resultData => {
        // Gets the most recent message from each sender
        var data = []
        var senders = []
        for (let i in resultData) {
          var message = resultData[i]
          var users = message.cmb2.users
          if (
            !senders.includes(users.sender) &&
            users.receiver === user.username
          ) {
            senders.push(users.sender)
            data.push(message)
          }
        }
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="account-settings">
      <h2 className="title">
        Messages
        <Messages />
      </h2>
      <Loader visible={loading} />
      {data ? (
        <table className="table account-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Sender</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(message => (
              <tr key={message.id}>
                <td>{message.title.rendered}</td>
                <td>{message.cmb2.users.sender}</td>
                <td>{timeSince(message.date)}</td>
                <td>
                  <Link
                    to={`/account/message/${message.cmb2.users.sender}`}
                    className="text-secondary"
                  >
                    Open Chat
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

export default AccountSection
