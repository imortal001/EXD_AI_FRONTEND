import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PricingPage from "./PricingPage";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
    <Navbar/>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center justify-center h-screen px-4 text-[#E4E1EC]">
        <h1 className="text-center text-white text-4xl md:text-5xl font-extralight leading-snug max-w-2xl">
          Turn your thoughts into{" "}
          <span className="text-[#D1B0FF]">viral memes</span> instantly with{" "}
          <span className="text-[#B892FF]">
            Your text. Our AI. Endless memes.
          </span>
        </h1>

       
        <div className="w-130 h-[3px] bg-[#ffffff] mt-8 rounded-full shadow-[0_0_18px_white] transition-all duration-300 hover:shadow-fuchsia-300 hover:shadow-2xl"></div>


        <p className="mt-4 text-center text-base md:text-lg text-[#A59CB2] mt-9 max-w-xl">
  Just enter your idea, and our AI instantly turns it into a hilarious meme No editing no effort just pure fun.
</p>
<button className="bg-[#070205] mt-6 text-white px-6 py-3 rounded-md hover:bg-[#9179d349] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B892FF] focus:ring-offset-2"><Link to="/signup">Try Now </Link> </button>
      </div>

      <PricingPage/>&nbsp;

      <Footer/>
    </motion.div>
    
    </>
    
  );
}

export default HomePage;
