import { Link } from "gatsby"
import React from "react"

const Footer = () => {
  return (
    <footer className="py-3 bg-dark text-white" style={{ marginTop: "100px" }}>
      <div className="container container-wide">
        <div className="d-flex justify-content-between">
          <div>© CrepPlug {new Date().getFullYear()}. All rights reserved.</div>
          <div>Website by Captiva</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
