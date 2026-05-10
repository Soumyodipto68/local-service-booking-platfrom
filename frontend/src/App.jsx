import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminDashboard from './pages/AdminDashboard'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/customer-dashboard' element={<CustomerDashboard />} />
        <Route path='/provider-dashboard' element={<ProviderDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App