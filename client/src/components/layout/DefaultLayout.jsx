import React from 'react'
import "./layout.css"
export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      {children}
    </div>
  )
}
