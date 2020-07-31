import React, { useState, useEffect } from "react"
import { getUser } from "../../services/auth"

import SingleProduct from "../single-product"

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
    <div className="row">
      {data
        ? data.map(product => (
            <div className="col-4">
              <SingleProduct data={product} />
            </div>
          ))
        : false}
    </div>
  )
}

export default AccountSection
