import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-[#191919] text-[#E6E6E6]">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-[#2A2A2A] pb-8">
        
        <div className="md:max-w-96">
          <img className='h-9 ' src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm text-[#A8A8A8] leading-relaxed">
            Precision-crafted AI tools for creators who demand speed, quality, and control.<br/> 
            Create smarter. Work sharper.
          </p>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20">
          
          <div>
            <h2 className="font-semibold mb-5 text-[#EDEDED]">Company</h2>
            <ul className="text-sm text-[#9E9E9E] space-y-2">
              <li><a href="#" className="hover:text-[#E6E6E6] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#E6E6E6] transition">About us</a></li>
              <li><a href="#" className="hover:text-[#E6E6E6] transition">Contact us</a></li>
              <li><a href="#" className="hover:text-[#E6E6E6] transition">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[#EDEDED] mb-5">Newsletter</h2>
            <p className="text-sm text-[#9E9E9E] max-w-64">
              Get updates, tips, and insights directly in your inbox.
            </p>

            <div className="flex items-center gap-2 pt-4">
              <input 
                className="bg-[#1F1F1F] border border-[#2C2C2C] placeholder-[#7A7A7A] text-sm text-[#E6E6E6] outline-none w-full max-w-64 h-9 rounded px-3 focus:ring-2 ring-[#3A3A3A]"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-[#3A3A3A] hover:bg-[#4A4A4A] transition w-24 h-9 text-[#EDEDED] rounded">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      <p className="pt-5 text-center text-xs md:text-sm text-[#7A7A7A] pb-6">
        © 2025 <span className="text-[#E6E6E6]">BAT AI</span>. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
