import React from "react"
import PropTypes from "prop-types"

import { MinimalHeader as Header } from "./header"
import { MinimalFooter as Footer } from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
