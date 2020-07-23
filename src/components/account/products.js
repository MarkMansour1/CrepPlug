import React, { useState, useEffect } from "react"
import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [data, setData] = useState(0)
  const user = getUser()

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wcfmmp/v1/products/`, {
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
    <div>
      <h2>Products</h2>
      <div className="row">
        {data
          ? data.map(product => (
              <div className="col-4">
                <img
                  src={
                    product.images && product.images[0]
                      ? product.images[0].src
                      : null
                  }
                  alt=""
                  className="w-100 h-50"
                />
                <p>{product.name}</p>
                <strong>£{product.price}</strong>
              </div>
            ))
          : false}
      </div>
    </div>
  )
}

export default AccountSection
