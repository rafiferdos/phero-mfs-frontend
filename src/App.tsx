import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected routes will go here */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <div>Dashboard (Coming Soon)</div>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
