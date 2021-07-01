import React, { useState, useEffect } from "react"

import { getUser } from "../../services/auth"
import { Reviews } from "../svg"

const AccountSection = () => {
  const [data, setData] = useState(null)
  const user = getUser()

  useEffect(() => {
    fetch(`${process.env.GATSBY_SITE_URL}/wp-json/wc/v3/products/reviews`, {
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
      <h2 className="title">
        Reviews
        <Reviews />
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
