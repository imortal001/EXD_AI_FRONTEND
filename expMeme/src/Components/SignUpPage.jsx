import React, { useState } from 'react';
import { motion } from "framer-motion";
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// API call function for signup
export const handleSignUp = async (name, email, password) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
    });
    return { success: true, data: res.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.msg) {
      return { success: false, error: error.response.data.msg };
    } else {
      return { success: false, error: "Signup failed. Please try again." };
    }
  }
};

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const result = await handleSignUp(name, email, password);
  if (result.success) {
    alert(result.data.msg || "Account created successfully!");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate('/login');

  } else {
    alert(result.error);
  }
};

  return (
   <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
> <Navbar/>
  <div className="mt-20 px-4 sm:px-6 flex justify-center items-center text-white min-h-screen">
  <div className="bg-[#493346] p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
    <h1 className="text-xl sm:text-2xl font-extralight text-center mb-6">CREATE ACCOUNT</h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 text-sm">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 rounded-md bg-[#772781] border border-[#D1B0FF] text-white focus:outline-none focus:ring-2 focus:ring-[#D1B0FF] text-sm"
        />
      </div>

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

      <div>
        <label className="block mb-1 text-sm">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full px-4 py-2 rounded-md bg-[#772781] border border-[#D1B0FF] text-white focus:outline-none focus:ring-2 focus:ring-[#D1B0FF] text-sm"
        />
      </div>
      <div className='flex flex-col justify-center items-center '> 
        <button
        type="submit"
        className="mt-4 w-full bg-white text-[#0A021F] py-2 rounded-full font-semibold hover:bg-[#b89afc] transition"
      >
        Sign Up
      </button>

      <button
        type="submit"
        className=" flex justify-center items-center  mt-5 w-50 bg-violet-500 text-[#0A021F] py-2 rounded-full text-sm hover:bg-[#b89afc] transition"
      >
        Sign Up With Google 🇬
        
      </button><a href="/login" className='text-[#D1B0FF] flex justify-end mt-3 '> Have an account,Log in</a>
      </div>
      
      
    </form>
  </div>
</div>
</motion.div>

  );
}

export default SignUpPage;
