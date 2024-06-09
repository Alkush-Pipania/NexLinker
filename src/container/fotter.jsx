import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

const fotter = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-300">
      <div className="flex items-center justify-center gap-3 py-3">
      <img src={logo} alt="" className="w-12 h-auto object-contain" />
      <p>resume</p>
      </div>
      <div className="flex items-center justify-center gap-3 py-3">
        <Link to="/" className="text-blue-700 text-sm">Home</Link>
        <Link to="/" className="text-blue-700 text-sm">Contact</Link>
        <Link to="/" className="text-blue-700 text-sm whitespace-nowrap">privacy policy</Link>
      </div>
    </div>
  )
}

export default fotter