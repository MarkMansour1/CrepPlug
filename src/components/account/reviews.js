import React, { useState, useEffect } from "react"

import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.SITE_URL}/wp-json/wc/v3/products/reviews`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(response => response.json())
      .then(resultData => {
        setData(resultData)
      })
  }, [])

  return (
    <div className="account-settings">
      <h2 className="d-flex align-items-center justify-content-between">
        Reviews
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chat-right-text"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
          ></path>
        </svg>
      </h2>
      <div className="account-reviews card">
        {data
          ? data.map(review => (
              <div className="review" key={review.id}>
                <p>Rating: {review.rating} stars</p>
                <p>
                  "
                  <span dangerouslySetInnerHTML={{ __html: review.review }} />"
                </p>
                <p>Review by {review.reviewer}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default AccountSection
