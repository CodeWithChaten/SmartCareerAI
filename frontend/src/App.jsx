import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import OrganizationDashboard from './pages/OrganizationDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (role) => {
    setUserRole(role)
    localStorage.setItem('userRole', role)
  }

  const handleLogout = () => {
    setUserRole(null)
    localStorage.removeItem('userRole')
  }

  // Check for existing session on mount
  useState(() => {
    const savedRole = localStorage.getItem('userRole')
    if (savedRole) {
      setUserRole(savedRole)
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole={userRole} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard/student"
            element={userRole === 'student' ? <StudentDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/organization"
            element={userRole === 'organization' ? <OrganizationDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/admin"
            element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
