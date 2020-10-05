import React, { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"

import { Dashboard } from "../svg"

import { uploadImage } from "../../services/products"
import { getUser } from "../../services/auth"

const AccountSection = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const user = getUser()

  
  return (
    <div>
      <h2 className="title">
        Dashboard <Dashboard />
      </h2>
    </div>
  )
}

export default AccountSection
