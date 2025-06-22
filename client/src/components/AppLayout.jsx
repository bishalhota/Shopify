// import { useRef, useState, useEffect } from 'react'
// import Sidebar from './Sidebar'

// function AppLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const sidebarRef = useRef()

//   // Close sidebar on outside click
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//         setSidebarOpen(false)
//       }
//     }

//     if (sidebarOpen) {
//       document.addEventListener('mousedown', handleClickOutside)
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [sidebarOpen])

//   return (
//     <div className="flex">
//       {/* Sidebar for desktop */}
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>

//       {/* Hamburger + Sidebar for mobile */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="bg-gray-200 p-2 rounded-md shadow"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 flex">
//           {/* Sidebar */}
//           <div ref={sidebarRef}>
//             <Sidebar onClose={() => setSidebarOpen(false)} />
//           </div>

//           {/* Overlay to detect outside click */}
//           <div className="flex-1 bg-black bg-opacity-40" />
//         </div>
//       )}

//       {/* Main content */}
//       <main className="flex-1 ml-0 md:ml-64 p-6 bg-gray-50 min-h-screen">
//         {children}
//       </main>
//     </div>
//   )
// }

// export default AppLayout
