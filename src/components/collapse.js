import React, { useState } from "react"
import Collapse from "react-bootstrap/Collapse"

const Component = () => {
  const [open, setOpen] = useState(true)
  const categories = ["Nike", "Adidas", "Vans", "Jordans"]

  return (
    <div>
      <h3 onClick={() => setOpen(!open)}>Categories</h3>
      <Collapse in={open}>
        <div>
          {categories.map(categoryFilter => (
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value={categoryFilter}
                id={categoryFilter}
              />
              <label className="form-check-label" htmlFor={categoryFilter}>
                {categoryFilter}
              </label>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default Component
