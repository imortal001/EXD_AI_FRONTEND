import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
//import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage'
import SignUpPage from './Components/SignUpPage'
import LoginPage from './Components/LoginPage'
import PricingPage from './Components/PricingPage'
import HomeAI from './AIComponents/HomeAI'
import { AuthProvider } from './context/AuthContext'
import AIBlog from './Components/AIBlog'
import ProtectedRoute from './Components/ProtectedRoute'
import RazorpayCheckout from './Components/RasorpayCheckout'
import RazorpayCheckout2 from './Components/ResorpayCheckout2'
function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/pricing" element={<PricingPage/>} />
          <Route path="/resources" element={<h1>Resources</h1>} />
          <Route path="/blog" element={<AIBlog/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/razorpay-checkout" element={<RazorpayCheckout />} />
          <Route path="/razorpay-checkout2" element={<RazorpayCheckout2 />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home-ai" element={
          <ProtectedRoute>
            <HomeAI />
          </ProtectedRoute>
        } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
