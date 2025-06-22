import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ViewItems from './pages/ViewItems'
import AddItems from './pages/AddItems'
import { ItemProvider } from './context/ItemContext'

function App() {
  return (
    <ItemProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/view-items" replace />} />
              <Route path="/view-items" element={<ViewItems />} />
              <Route path="/add-items" element={<AddItems />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ItemProvider>
  )
}

export default App