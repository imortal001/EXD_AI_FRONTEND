import React from 'react'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import RazorpayCheckout from './RasorPayCheckOut'
import RazorpayCheckout2 from './ResorpayCheckout2'
import { Link } from 'react-router-dom'

const cardTransition = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1], // cubic-bezier for extra smoothness
};

function PricingPage() {
  return (
    <>

      {/* Navbar intentionally omitted as per user change */}<Navbar/>
      <div className="flex flex-col items-center mt-5 ml-0 md:items-start md:ml-80 text-center md:text-left">
  <h1 className="text-3xl font-bold mt-30 font-mono md:text-4xl">
    Pricing
  </h1>
  <p className="text-gray-400 mt-2 font-mono font-extralight">
    Choose the plan that works for you
  </p>
</div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12 mb-16">
        {/* Hobby Card */}
        <motion.div
          className="bg-[#18141c] text-white rounded-2xl shadow-lg p-8 w-80 flex flex-col items-start border border-[#23202a] transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cardTransition, delay: 0.1 }}
          whileHover={{ scale: 1.045, boxShadow: '0 12px 36px 0 rgba(145,121,211,0.28)' }}
        >
          <span className="text-lg font-semibold mb-2">Hobby</span>
          <span className="text-4xl font-bold mb-1">Free</span>
          <span className="text-gray-400 text-sm mb-4">Includes</span>
          <ul className="mb-6 text-sm space-y-1">
            <li>✓ Pro two-week trial</li>
            <li>✓ Limited agent requests</li>
            <li>✓ Limited tab completions</li>
          </ul>
          <div className="flex gap-2 w-full">
            <Link to="/signup"><button className="bg-white text-black px-5 py-2 rounded-md font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B892FF] focus:ring-offset-2">Get Started</button></Link>
            <button className="bg-[#23202a] text-white px-5 py-2 rounded-md font-medium border border-[#35313e] transition-all duration-300 hover:bg-[#2c2833] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B892FF] focus:ring-offset-2">Others</button>
          </div>
        </motion.div>
        {/* Pro Card */}
        <motion.div
          className="bg-[#18141c] text-white rounded-2xl shadow-lg p-8 w-80 flex flex-col items-start border border-[#23202a] transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cardTransition, delay: 0.2 }}
          whileHover={{ scale: 1.045, boxShadow: '0 12px 36px 0 rgba(145,121,211,0.28)' }}
        >
          <span className="text-lg font-semibold mb-2">Pro</span>
          <span className="text-4xl font-bold mb-1">$16 <span className="text-base font-normal">/mo</span></span>
          <span className="text-gray-400 text-sm mb-4">Everything in Hobby, plus</span>
          <ul className="mb-6 text-sm space-y-1">
            <li>✓ Extended limits on agent</li>
            <li>✓ Unlimited tab completions</li>
            <li>✓ Access to Background Agents</li>
            <li>✓ Access to Bug Bot</li>
            <li>✓ Access to maximum context windows</li>
          </ul>
          <div className="flex gap-2 w-full">
           <Link to="/razorpay-checkout2"> <button className="bg-[#e0c3fc] text-black px-5 py-2 rounded-md font-medium transition-all duration-300 hover:bg-[#d1b0ff] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B892FF] focus:ring-offset-2">Get Pro</button></Link>
            <button className="bg-[#23202a] text-white px-5 py-2 rounded-md font-medium border border-[#35313e] transition-all duration-300 hover:bg-[#2c2833] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B892FF] focus:ring-offset-2">More info ↗</button>
          </div>
        </motion.div>
        {/* Ultra Card */}
        <motion.div
          className="bg-[#18141c] text-white rounded-2xl shadow-lg p-8 w-80 flex flex-col items-start border border-[#23202a] transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cardTransition, delay: 0.3 }}
          whileHover={{ scale: 1.045, boxShadow: '0 12px 36px 0 rgba(145,121,211,0.28)' }}
        >
          <span className="text-lg font-semibold mb-2">Ultra</span>
          <span className="text-4xl font-bold mb-1">$200 <span className="text-base font-normal">/mo</span></span>
          <span className="text-gray-400 text-sm mb-4">Everything in Pro, plus</span>
          <ul className="mb-6 text-sm space-y-1">
            <li>✓ 20x usage on all OpenAI, Claude, Gemini models</li>
            <li>✓ Priority access to new features</li>
          </ul>
          <div className="flex gap-2 w-full">
            <Link to="/razorpay-checkout"><button className="bg-white text-black px-5 py-2 rounded-md font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B892FF] focus:ring-offset-2">Get Ultra</button></Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default PricingPage