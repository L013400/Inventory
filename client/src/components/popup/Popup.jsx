import React, { useState } from 'react'
import "./Popup.css"
export default function Popup({ children, collapsible, visible, handleVisible }) {
  const [isOpen, setIsOpen] = useState(false | visible)
  const handleClick = (value) => {
    setIsOpen(value)
    handleVisible(value)
  }
  return (
    isOpen ? <div className="overlay" onClick={() => collapsible && handleClick(false)}>
      <div onClick={(e)=>e.stopPropagation()} className="overlay-child">
      {children}
      </div>
    </div> : null
  )
}
