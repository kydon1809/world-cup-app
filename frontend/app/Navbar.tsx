"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('wc_user');
    window.location.href = '/'; 
  };

  const isActive = (path: string) => pathname === path;

  const navPaths = ['/', '/bracket', '/picks', '/teams', '/standings', '/stats'];
  const navLabels = ['Group Stage', 'Knockout', 'Picks', 'Teams', 'Standings', 'Stats'];

  return (
    <nav className="bg-[#2b2c2d] text-white sticky top-0 z-50 border-b border-[#2b2c2d] shadow-md">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between h-14 sm:h-[60px] items-center">
          
          {/* LEFT SIDE: Brand & Links */}
          <div className="flex items-center h-full">
            
            {/* --- NEW BESPOKE BROADCAST LOGO --- */}
            <div className="flex-shrink-0 h-full flex items-center pr-4 sm:pr-8 border-r border-slate-700/50 mr-2 sm:mr-6">
              <Link href="/" className="flex items-center gap-3 group pl-2 sm:pl-4">
                
                {/* The "United" Tricolor Chevrons */}
                <div className="flex space-x-[3px] h-6 sm:h-7 transform -skew-x-[16deg] group-hover:scale-105 transition-transform duration-300">
                  <div className="w-2 sm:w-2.5 h-full bg-blue-700 rounded-sm shadow-sm"></div>
                  <div className="w-2 sm:w-2.5 h-full bg-red-600 rounded-sm shadow-sm"></div>
                  <div className="w-2 sm:w-2.5 h-full bg-emerald-500 rounded-sm shadow-sm"></div>
                </div>
                
                {/* Brand Typography */}
                <div className="flex flex-col justify-center leading-none mt-0.5">
                  <span className="font-black text-white text-lg sm:text-xl tracking-tighter">
                    WC<span className="text-slate-300 font-bold ml-0.5">26</span>
                  </span>
                  <span className="font-bold text-[8px] sm:text-[9px] text-slate-400 tracking-[0.2em] uppercase mt-0.5 group-hover:text-slate-200 transition-colors">
                    Prediction Hub
                  </span>
                </div>

              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex h-full">
              {navPaths.map((path, idx) => (
                <Link 
                  key={path}
                  href={path} 
                  className={`relative flex items-center px-4 lg:px-5 h-full text-[15px] font-medium transition-colors ${
                    isActive(path) 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {navLabels[idx]}
                  
                  {/* ESPN's Signature Active Triangle */}
                  {isActive(path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-slate-50"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: User / Utility */}
          <div className="flex items-center h-full pr-4 sm:pr-6 gap-6">
            {currentUser ? (
              <div className="flex items-center gap-6 h-full">
                
                {/* User Profile Area */}
                <div className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {/* WRAP THE USERNAME IN A LINK */}
                  <Link 
                    href={`/profile/${currentUser.UserID || currentUser.id}`} 
                    className="text-[15px] font-medium hover:underline"
                  >
                    {currentUser.Username}
                  </Link>
                </div>
                
                {/* Sign Out Utility */}
                <button 
                  onClick={handleLogout}
                  className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <span className="text-[13px] font-medium text-gray-400">Not logged in</span>
            )}
          </div>
          
        </div>
      </div>

      {/* MOBILE NAVIGATION - Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto scrollbar-hide bg-[#2b2c2d] px-2 shadow-inner border-t border-slate-700/50">
        {navPaths.map((path, idx) => (
          <Link 
            key={path}
            href={path} 
            className={`relative px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
              isActive(path) 
                ? 'text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {navLabels[idx]}
            {isActive(path) && (
               <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent border-b-slate-50"></span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}