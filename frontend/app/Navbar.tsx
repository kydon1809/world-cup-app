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

  return (
    <nav className="bg-white text-slate-800 border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0 font-black text-2xl tracking-tighter uppercase">
            <Link href="/" className="text-blue-800 hover:text-blue-700 transition-colors">
              WORLDCUP <span className="text-red-600">2026</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 flex-1 justify-center h-full">
            {['/', '/bracket', '/teams', '/standings', '/stats'].map((path, idx) => {
              const labels = ['Picks', 'Knockout', 'Teams', 'Standings', 'Stats'];
              return (
                <Link 
                  key={path}
                  href={path} 
                  className={`inline-flex items-center px-1 pt-1 border-b-4 font-black tracking-wide transition-all ${
                    isActive(path) 
                      ? 'border-red-600 text-red-600' 
                      : 'border-transparent text-slate-500 hover:text-blue-800 hover:border-blue-300'
                  }`}
                >
                  {labels[idx]}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <span className="font-bold text-sm hidden sm:block text-slate-600">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 shadow-sm"></span>
                  <span className="text-slate-900">{currentUser.Username}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors border border-transparent hover:border-red-200"
                >
                  Switch Player
                </button>
              </>
            ) : (
              <span className="text-sm font-bold text-slate-500">Not logged in</span>
            )}
          </div>
          
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="md:hidden flex justify-around pb-2 border-t border-slate-100 pt-2 bg-white">
        {['/', '/bracket', '/teams', '/standings', '/stats'].map((path, idx) => {
            const labels = ['Picks', 'Knockout', 'Teams', 'Standings', 'Stats'];
            return (
              <Link 
                key={path}
                href={path} 
                className={`px-3 py-2 rounded-lg font-black text-sm transition-all ${
                  isActive(path) 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-slate-500 hover:text-blue-800 hover:bg-slate-50'
                }`}
              >
                {labels[idx]}
              </Link>
            )
          })}
      </div>
    </nav>
  );
}