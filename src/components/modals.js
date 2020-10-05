import React, { useState } from "react"
import { Link } from "gatsby"
import Modal from "react-bootstrap/Modal"

import { Wishlist, Cart, Messages, Question } from "./svg"

import { isLoggedIn, getUser } from "../services/auth"
import { sendMessage } from "../services/messages"

export function MessageModal(props) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const { receiver } = props
  const user = getUser()

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    sendMessage(user, receiver, message).then(res => {
      console.log(res)

      if (res && res.id) {
        setSent(true)
      } else {
        // error
      }

      setLoading(false)
    })
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="product-modal message-modal">
          <Messages />
          {isLoggedIn() ? (
            sent ? (
              <>
                <h3>Message Sent</h3>
                <div className="py-4">Your message has been sent.</div>
                <Link
                  to={`/account/message/${receiver}`}
                  className="btn btn-dark"
                >
                  View Chat
                </Link>
              </>
            ) : (
              <>
                <h3>Message Seller</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group text-left">
                    <label htmlFor="message">Your message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={message.length < 1 || loading}
                  >
                    Send Message
                  </button>
                </form>
              </>
            )
          ) : (
            <>
              <h3>Message Seller</h3>
              <div className="py-4">Please log in to message a seller.</div>
              <Link to="/login" className="btn btn-dark">
                Log In
              </Link>
            </>
          )}
          <button className="btn btn-outline-dark" onClick={props.onHide}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export function WishModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="product-modal">
          <Wishlist />
          <p>{`${props.name}`} added to wishlist.</p>
          <Link to="/wishlist" className="btn btn-dark" onClick={props.onHide}>
            View wishlist
          </Link>
          <button className="btn btn-outline-dark" onClick={props.onHide}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export function CartModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="product-modal">
          <Cart />
          <p>{`${props.name}`} added to cart.</p>
          <Link to="/cart" className="btn btn-dark" onClick={props.onHide}>
            View Cart
          </Link>
          <button className="btn btn-outline-dark" onClick={props.onHide}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export function RequestModal(props) {
  const [email, setEmail] = useState("")

  const sendRequest = e => {
    e.preventDefault()

    alert("request sent")
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="product-modal message-modal">
          <h3>Request your size</h3>
          <span className="text-gray">
            Fill out the form below and we will get back to you ASAP with a
            price.
          </span>
          <form onSubmit={sendRequest} className="text-left">
            <div className="form-group">
              <label htmlhtmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="size">UK size</label>
              <input
                type="number"
                className="form-control"
                id="size"
                min="1"
                max="13"
                step="0.5"
              />
            </div>
            <div className="form-group">
              <label htmlhtmlFor="instagram">
                Instagram (Expect to receive an invoice within two hours)
              </label>
              <input type="text" className="form-control" id="instagram" />
            </div>
            <button type="submit" className="btn btn-dark">
              Send Request
            </button>
          </form>
          <button className="btn btn-outline-dark" onClick={props.onHide}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
