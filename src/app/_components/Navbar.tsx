"use client"
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <h1 className="text-2xl text-white mx-16">HR Administration System</h1>
          </div>
        </div>
      </div>

      {/* Full-screen menu */}
      <div 
        className={`fixed inset-0 z-50 bg-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close main menu</span>
            <X className="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <a href="/" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700 mb-4">Home</a>
          <a href="/employee-list" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700 mb-4">Employees</a>
          <a href="/employee-create-edit" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">Create / Edit Employee</a>
          <a href="/department-list" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700 mb-4">Departments</a>
          <a href="/department-create-edit" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">Create / Edit Department</a>
        </div>
      </div>
    </nav>
  )
}