import React, { useState } from "react";
import logo from "../assets/xpd1.png";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { deleteCookie } from "../utils/cookieUtils";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { authenticated, updateAuthStatus } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie('authToken');
    updateAuthStatus(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="fixed w-full z-50 mt-6 backdrop-blur-sm bg-transparent text-[#E4E1EC]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
          <img src={logo} alt="Company Logo" className="h-10 w-auto" />
          </Link>
          

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 items-center font-medium ">
            <li>
              <a href="/pricing" className="hover:text-[#D1B0FF]">
                Pricing
              </a>
            </li>
            <li>
              <a href="#resources" className="hover:text-[#D1B0FF]">
                Resources
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-[#D1B0FF]">
                Blog
              </a>
            </li>
            {authenticated ? (
              <>
                <li>
                  <Link to="/home-ai">
                    <button className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition">
                      Account
                    </button>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition">
                      LogIn
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <button className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition">
                      SignIn
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Hamburger Menu */}
          <div
            className="md:hidden flex flex-col gap-[5px] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-[#E4E1EC]"></span>
            <span className="w-6 h-0.5 bg-[#E4E1EC]"></span>
            <span className="w-6 h-0.5 bg-[#E4E1EC]"></span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col  items-center gap-4 py-4 bg-[#2f0d3002] text-[#E4E1EC] font-medium">
            <li>
              <a href="/pricing" className="hover:text-[#D1B0FF]">
                Pricing
              </a>
            </li>
            <li>
              <a href="#resources" className="hover:text-[#D1B0FF]">
                Resources
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-[#D1B0FF]">
                Blog
              </a>
            </li>
            {authenticated ? (
              <>
                <li>
                  <Link to="/home-ai">
                    <button className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition">
                      Account
                    </button>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                   <Link to="/login">
                    <button className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition">
                      LOG IN
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <button className="border border-[#D1B0FF] text-[#D1B0FF] px-4 py-1 rounded-full hover:bg-[#D1B0FF] hover:text-[#0A021F] transition">
                      SIGN IN
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </motion.nav>
  );
}

export default Navbar;
