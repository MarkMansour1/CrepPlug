import React, { useState } from "react"
import { Link } from "gatsby"

import { RightArrow } from "../components/svg"
import SingleProduct from "./single-product"

import Carousel from "@brainhubeu/react-carousel"

// const Block = ({ title, link, linkText, products }) => (
//   <div className="block-wrapper">
//     <div className="block-header">
//       <h3>{title}</h3>
//       <Link to={link} className="link-flat text-secondary">
//         {`${linkText} `}
//         <RightArrow />
//       </Link>
//     </div>
//     <div className="block-body">
//       {products.map(({ node: product }) => (
//         <div className="block-product" key={product.id}>
//           <SingleProduct data={product} />
//         </div>
//       ))}
//     </div>
//   </div>
// )

const Block = ({ title, link, linkText, products }) => {
  const [value, setValue] = useState(0)

  const onChange = newValue => setValue(newValue)

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
          {/* <Carousel
            // value={value}
            // onChange={onChange}
            // lazyLoad
            // arrows
            infinite
            arrows
            slidesPerPage={6}
          >
            {products.map(({ node: product }) => (
              <div
                className="block-product"
                key={product.id}
                style={{ width: "90%" }}
              >
                <SingleProduct data={product} />
              </div>
            ))}
          </Carousel> */}
          {products.map(({ node: product }) => (
            <div className="block-product" key={product.id}>
              <SingleProduct data={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Block
