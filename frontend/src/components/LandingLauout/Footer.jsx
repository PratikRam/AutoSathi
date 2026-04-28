import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, CarFront } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-8">
          
          {/* Brand & info */}
          <div className="flex flex-col max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <CarFront size={18} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">AutoSathi</span>
            </Link>
            <p className="text-gray-500 font-medium mb-6 leading-relaxed">
              Smart vehicle management made simple.
            </p>
            <a href="mailto:support@autosathi.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors w-fit">
              <Mail size={16} />
              support@autosathi.com
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-12 sm:gap-16">
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Product</h4>
              <nav className="flex flex-col gap-3.5">
                <Link to="/" className="text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm">Home</Link>
                <span className="text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm cursor-pointer">Features</span>
                <span className="text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm cursor-pointer">How It Works</span>
              </nav>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Company</h4>
              <nav className="flex flex-col gap-3.5">
                <span className="text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm cursor-pointer">About</span>
                <span className="text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm cursor-pointer">Contact</span>
              </nav>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 font-medium text-center md:text-left">
            © 2026 AutoSathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer