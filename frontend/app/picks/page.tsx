"use client";

import React, { useState, useEffect } from 'react';

// --- MOCK PROP BETS WITH CONSENSUS DATA ---
const PROP_BETS = [
  {
    id: "golden_boot",
    title: "👟 Golden Boot",
    description: "Player to score the most goals in the tournament.",
    theme: "bg-blue-600",
    favorites: [
      { rank: 1, name: "Kylian Mbappé (FRA)" },
      { rank: 2, name: "Harry Kane (ENG)" },
      { rank: 3, name: "Lionel Messi (ARG)" },
    ],
    options: ["Kylian Mbappé (FRA)", "Harry Kane (ENG)", "Vinícius Júnior (BRA)", "Lionel Messi (ARG)", "Jude Bellingham (ENG)", "Lamine Yamal (ESP)", "Other"]
  },
  {
    id: "golden_ball",
    title: "⚽ Golden Ball (MVP)",
    description: "Best overall player of the tournament.",
    theme: "bg-amber-500",
    favorites: [
      { rank: 1, name: "Kylian Mbappé (FRA)" },
      { rank: 2, name: "Jude Bellingham (ENG)" },
      { rank: 3, name: "Vinícius Júnior (BRA)" },
    ],
    options: ["Jude Bellingham (ENG)", "Kylian Mbappé (FRA)", "Rodri (ESP)", "Vinícius Júnior (BRA)", "Kevin De Bruyne (BEL)", "Lionel Messi (ARG)", "Other"]
  },
  {
    id: "golden_glove",
    title: "🧤 Golden Glove",
    description: "Best goalkeeper of the tournament.",
    theme: "bg-emerald-600",
    favorites: [
      { rank: 1, name: "Alisson (BRA)" },
      { rank: 2, name: "Emiliano Martinez (ARG)" },
      { rank: 3, name: "Unai Simón (ESP)" },
    ],
    options: ["Alisson (BRA)", "Emiliano Martinez (ARG)", "Unai Simón (ESP)", "Mike Maignan (FRA)", "Jordan Pickford (ENG)", "Other"]
  },
  {
    id: "dark_horse",
    title: "🐎 Dark Horse Team",
    description: "Which team outside the top favorites makes the deepest run?",
    theme: "bg-purple-600",
    favorites: [
      { rank: 1, name: "Uruguay" },
      { rank: 2, name: "Colombia" },
      { rank: 3, name: "Japan" },
    ],
    options: ["Uruguay", "Colombia", "USA", "Japan", "Senegal", "Morocco", "Mexico", "Other"]
  }
];

export default function PropPicksPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Mock user load
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSelection = (propId: string, value: string) => {
    setPicks(prev => ({ ...prev, [propId]: value }));
  };

  const savePropPicks = async () => {
    /* Temporarily bypassed the user check for testing */
    // if (!currentUser) {
    //   alert("Please log in on the main page first!");
    //   return;
    // }
    
    setIsSaving(true);
    
    // Mock save delay
    setTimeout(() => {
      alert("Prop picks successfully saved to the Vault!");
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Tournament Props 🏆
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Lock in your predictions! Review the expert consensus favorites, then make your official pick below.
          </p>
        </div>

        {/* PROPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROP_BETS.map((prop) => (
            <div key={prop.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
              
              {/* Card Header */}
              <div className={`${prop.theme} px-6 py-4`}>
                <h2 className="text-2xl font-bold text-white tracking-wide">{prop.title}</h2>
                <p className="text-white/80 text-sm mt-1">{prop.description}</p>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                {/* Consensus Favorites List */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Expert Favorites</h3>
                  <ul className="space-y-3">
                    {prop.favorites.map((fav) => (
                      <li key={fav.rank} className="flex items-center gap-3 text-sm">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 font-bold text-xs">
                          {fav.rank}
                        </span>
                        <span className="font-medium text-gray-800">{fav.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Selection Dropdown */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Your Official Pick
                  </label>
                  <div className="relative">
                    <select 
                      value={picks[prop.id] || ""}
                      onChange={(e) => handleSelection(prop.id, e.target.value)}
                      className={`w-full appearance-none bg-gray-50 border-2 ${picks[prop.id] ? 'border-green-500 bg-green-50' : 'border-gray-200'} text-gray-900 font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors cursor-pointer`}
                    >
                      <option value="" disabled>Select your pick...</option>
                      {prop.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <div className="mt-12 text-center pb-12">
          <button 
            onClick={savePropPicks} 
            disabled={isSaving} 
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider"
          >
            {isSaving ? "Locking in..." : "Lock In My Picks 🔒"}
          </button>
        </div>

      </div>
    </div>
  );
}