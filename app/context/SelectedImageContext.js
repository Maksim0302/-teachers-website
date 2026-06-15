'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

const SelectedImageContext = createContext()

export const useSelectedImage = () => useContext(SelectedImageContext)

export const SelectedImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    const storedImage = localStorage.getItem('selectedImage')
    if (storedImage) {
      setSelectedImage(storedImage)
    }
  }, [])

  const handleImageChange = (imageSrc) => {
    setSelectedImage(imageSrc)
    localStorage.setItem('selectedImage', imageSrc)
  }

  return (
    <SelectedImageContext.Provider value={{ selectedImage, handleImageChange }}>
      {children}
    </SelectedImageContext.Provider>
  )
}
