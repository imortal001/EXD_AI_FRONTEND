import React from 'react'
import { Linkedin , Twitter } from 'lucide-react';
function Footer() {
  return (
    <div>
        <footer className="flex justify-center  gap-10 bg-[#070205] text-white py-2 text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} XPD AI. All rights reserved XPD.inc.
            </p>
            <div className='flex justify-end items-baseline-last gap-6'>
                 <a href="https://www.linkedin.com/in/bhavesh-mahajan-942084242/"><Linkedin /></a>
                 <a href="https://twitter.com/cryptobhavesh99">  <Twitter /></a >
            </div>
          
        </footer>
    </div>
  )
}

export default Footer