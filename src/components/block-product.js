import React, { useState } from "react"
import { Link } from "gatsby"

import { RightArrow } from "../components/svg"
import SingleProduct from "./single-product"

const Block = ({ title, link, linkText, products }) => {
  return (
    <>
      <div className="block-wrapper">
        <div className="block-header">
          <h3>{title}</h3>
          <Link to={link} className="link-flat text-secondary">
            {`${linkText} `}
            <RightArrow />
          </Link>
        </div>
        <div className="block-body">
          {products.map(product => (
            <div className="block-product" key={product.id}>
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Block
