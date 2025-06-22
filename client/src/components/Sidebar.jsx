import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function Sidebar() {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isHambergerClicked,setIsHambergerClicked] = useState(false)
  const sidebarRef = useRef()

  const handleHamberger =() =>{
    setIsHambergerClicked(!isHambergerClicked);
    setIsMobileOpen(true)
  }

  const handleonClose =() =>{
    setIsMobileOpen(false)
    setIsHambergerClicked(!isHambergerClicked)
  }

  const menuItems = [
    {
      path: '/view-items',
      name: 'View Items',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
        </svg>
      )
    },
    {
      path: '/add-items',
      name: 'Add Items',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ]

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMobileOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsMobileOpen(false)
      }
      
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isMobileOpen])

  return (
    <>
      {!isHambergerClicked && (
        <div className="md:hidden p-4 fixed top-0 left-0 z-50">
        <button
          onClick={handleHamberger}
          className="text-gray-600 bg-white shadow-md p-2 rounded"
        >
          ☰
        </button>
      </div>
      )}
      {/* Hamburger for mobile only */}
      

      {/* Sidebar - mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden">
          <div
            ref={sidebarRef}
            className="w-64 h-full bg-white shadow-xl border-r border-gray-200 z-50 fixed left-0 top-0"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Admin</h2>
                  <p className="text-sm text-gray-500">Item Manager</p>
                </div>
              </div>
              <button onClick={handleonClose} className="text-gray-500 text-xl">✕</button>
            </div>

            <nav className="mt-6">
              <div className="px-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Management</p>
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${
                    location.pathname === item.path ? 'bg-gray-100 font-medium' : ''
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-6 border-t border-gray-200">
              <p className="text-xs text-gray-400 text-center">Item Manager v1.0</p>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - desktop always visible */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-50 flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin</h2>
              <p className="text-sm text-gray-500">Item Manager</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Management</p>
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              
              className={`flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100 font-medium' : ''
              }`
              
            }
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">Item Manager v1.0</p>
        </div>
      </div>
    </>
  )
}

export default Sidebar
