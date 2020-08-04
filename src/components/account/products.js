import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { getUser } from "../../services/auth"

import SingleProduct from "../single-product"

const AccountSection = () => {
  const [data, setData] = useState(0)
  const user = getUser()

  useEffect(() => {
    fetch(`https://designsuite.pro/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          products {
            edges {
              node {
                id
                slug
                name
                date
                image {
                  sourceUrl
                }
              }
            }
          }
        }`,
      }),
    })
    .then(res => res.json())
    .then(res => {
      setData(res.data.products.edges)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="row">
      {data
        ? data.map(({ node: product }) => (
            <div className="col-4 mb-3" key={product.id}>
              <SingleProduct data={product} />
            </div>
          ))
        : false}
    </div>
  )
}

export default AccountSection
