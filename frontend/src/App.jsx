import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import ProviderDashboard from './pages/Provider/ProviderDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import PublicRoute from './routes/PublicRoutes'
import Navbar from './components/Navabr'
import Providers from './pages/Provider/Providers'
import ProviderDetails from './pages/Provider/ProviderDetails'
import CreateBooking from './pages/Bookings/CreateBooking'
import CustomerProfile from './pages/Customer/CustomerProfile'
import ProviderProfile from './pages/Provider/ProviderProfile'
import AdminProfile from './pages/Admin/AdminProfile'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <Home />
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
        <Route path='/customer/dashboard' element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path='/provider/dashboard' element={
          <ProtectedRoute role="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        } />
        <Route path='/admin/dashboard' element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route
          path="/providers"
          element={<Providers />}
        />
        <Route
          path="/providers/:id"
          element={<ProviderDetails />}
        />
        <Route
          path="/book/:providerId"
          element={
            <ProtectedRoute role="customer">
              <CreateBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={<CustomerProfile />}
        />

        <Route
          path="/provider/profile"
          element={<ProviderProfile />}
        />

        <Route
          path="/admin/profile"
          element={<AdminProfile />}
        />
      </Routes>

    </div>
  )
}

export default App