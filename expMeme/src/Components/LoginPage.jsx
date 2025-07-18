import  { useState } from 'react';
import { motion } from "framer-motion";
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../utils/cookieUtils';
import { useAuth } from '../context/AuthContext';

// API call function for login
export const handleLogin = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    return { success: true, data: res.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.msg) {
      return { success: false, error: error.response.data.msg };
    } else {
      return { success: false, error: "Login failed. Please try again." };
    }
  }
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateAuthStatus } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    if (result.success) {
      // Store the token in a cookie
      if (result.data.token) {
        setCookie('authToken', result.data.token, 7);
      }
      updateAuthStatus(true);
      alert("Login successful!");
      setEmail("");
      setPassword("");
      navigate('/home-ai');
      
    } else {
      alert(result.error);
    }
  };

  return (
    <>
   
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    > <Navbar/>
      <div className="mt-15 px-4 sm:px-6 flex justify-center items-center text-white min-h-screen">
        <div className="bg-[#493346] p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-xl sm:text-2xl font-extralight text-center mb-6">LOGIN</h1>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-[#772781] border border-[#D1B0FF] text-white focus:outline-none focus:ring-2 focus:ring-[#D1B0FF] text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-[#772781] border border-[#D1B0FF] text-white focus:outline-none focus:ring-2 focus:ring-[#D1B0FF] text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-white text-[#0A021F] py-2 rounded-full font-semibold hover:bg-[#b89afc] transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </motion.div>
    </>
  );
}

export default LoginPage;
