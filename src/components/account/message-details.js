import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Loader from "../../components/loader"

import { getUser } from "../../services/auth"
import { timeSince } from "../../services/utils"
import { LeftChevron, Messages } from "../svg"
import { sendMessage } from "../../services/messages"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  const url =
    typeof window !== "undefined" ? window.location.href.split("/") : ""
  const sender = url[url.length - 1]

  useEffect(() => {
    fetch(`${process.env.GATSBY_SITE_URL}/wp-json/wp/v2/messages`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)

        setData(res.reverse())
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="message-details">
      {/* <h2 className="title">
        Messages
        <Messages />
      </h2> */}
      <Loader visible={loading} />
      {data ? <MessageDetails user={user} data={data} sender={sender} /> : null}
    </div>
  )
}

export default AccountSection

const MessageDetails = ({ user, data, sender }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(data)
  const [loading, setLoading] = useState(false)

  for (let i = 0; i < data.length; i++) {
    var users = [data[i].cmb2.users.sender, data[i].cmb2.users.receiver]
    var username = user.username

    if (!(users.includes(username) && users.includes(sender))) {
      data.splice(i, 1)
      i--
      setMessages(data)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    sendMessage(user, sender, message).then(res => {
      data.push(res)
      setMessages(data)
      setMessage("")
      setLoading(false)
    })
  }

  return (
    <div>
      <div className="chat">
        <div className="chat-top">
          <Link to="/account/messages" className="link-flat text-secondary">
            <LeftChevron />
            {` Inbox`}
          </Link>
          <div className="sender">{sender}</div>
          <div style={{ width: "100px" }} />
        </div>
        <div className="chat-body">
          {messages.map(message => {
            var sent = message.cmb2.users.sender === user.username

            return (
              <div
                className={`chat-message ${sent ? "sent" : ""}`}
                key={message.id}
              >
                <div className="message-body">{message.title.rendered}</div>
                <div className="message-time">{timeSince(message.date)}</div>
              </div>
            )
          })}
        </div>
        <div className="chat-bottom">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Write your message..."
              id="message"
              name="message"
              onChange={event => setMessage(event.target.value)}
              value={message}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
