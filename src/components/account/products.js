import React, { useState, useEffect } from "react"

const AccountSection = () => {
  const [data, setData] = useState(0)

  useEffect(() => {
    fetch(`https://designsuite.pro/wp-json/wc/v3/products?per_page=100`, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGVzaWduc3VpdGUucHJvIiwiaWF0IjoxNTk1NDEwNjA1LCJuYmYiOjE1OTU0MTA2MDUsImV4cCI6MTU5NjAxNTQwNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.G4UVrydLcSEXY165AauqjuA8QXwl9RgCLgunoV6E0_4",
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
              <div className="col-3">
                <img
                  src={
                    product.images && product.images[0]
                      ? product.images[0].src
                      : null
                  }
                  alt=""
                  className="w-100 h-50 mb-3"
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
