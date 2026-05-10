import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import PublicRoute from './routes/PublicRoutes'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path='/customer-dashboard' element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path='/provider-dashboard' element={
          <ProtectedRoute role="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        } />
        <Route path='/admin-dashboard' element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App