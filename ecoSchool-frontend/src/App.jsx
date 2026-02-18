import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import ResiduosPage from './pages/ResiduosPage'
import DashboardPage from './pages/DashboardPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50">
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/residuos"  element={<ResiduosPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App