import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"

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
