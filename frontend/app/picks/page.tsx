"use client";

import React, { useState, useEffect } from 'react';

// --- MOCK PROP BETS ---
const PROP_BETS = [
  {
    id: "golden_boot",
    title: "Golden Boot",
    description: "Player to score the most goals in the tournament.",
    options: ["Kylian Mbappé (FRA)", "Harry Kane (ENG)", "Vinícius Júnior (BRA)", "Lionel Messi (ARG)", "Jude Bellingham (ENG)", "Lamine Yamal (ESP)", "Other"]
  },
  {
    id: "golden_ball",
    title: "Golden Ball (MVP)",
    description: "Best overall player of the tournament.",
    options: ["Jude Bellingham (ENG)", "Kylian Mbappé (FRA)", "Rodri (ESP)", "Vinícius Júnior (BRA)", "Kevin De Bruyne (BEL)", "Lionel Messi (ARG)", "Other"]
  },
  {
    id: "golden_glove",
    title: "Golden Glove",
    description: "Best goalkeeper of the tournament.",
    options: ["Alisson (BRA)", "Emiliano Martinez (ARG)", "Unai Simón (ESP)", "Mike Maignan (FRA)", "Jordan Pickford (ENG)", "Other"]
  },
  {
    id: "dark_horse",
    title: "Dark Horse Team",
    description: "Which team outside the top 10 favorites will make the deepest run?",
    options: ["Uruguay", "Colombia", "USA", "Japan", "Senegal", "Morocco", "Mexico", "Other"]
  },
  {
    id: "most_goals_team",
    title: "Highest Scoring Team",
    description: "Which country will score the most total goals?",
    options: ["France", "England", "Spain", "Brazil", "Argentina", "Portugal", "Germany", "Other"]
  }
];

export default function PropPicksPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      // TODO: Fetch saved prop picks from database here when API is ready
    }
  }, []);

  const handleSelection = (propId: string, value: string) => {
    setPicks(prev => ({ ...prev, [propId]: value }));
  };

  const savePropPicks = async () => {
    if (!currentUser) {
      alert("Please log in on the main page first!");
      return;
    }
    setIsSaving(true);
    
    // Mock save delay - replace with actual API call later
    setTimeout(() => {
      alert("Prop picks successfully saved to the Vault!");
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">
            TOURNAMENT <span className="text-red-600">PROPS</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2">Lock in your predictions for the tournament awards.</p>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={savePropPicks} 
              disabled={isSaving} 
              className="bg-red-600 hover:bg-red-700 text-white font-black py-3 px-10 rounded-xl shadow-md transition-transform transform hover:-translate-y-1 uppercase tracking-widest"
            >
              {isSaving ? "SAVING..." : "SAVE MY PICKS"}
            </button>
          </div>
        </div>

        {/* PROPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROP_BETS.map((prop) => (
            <div key={prop.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-blue-300 transition-colors">
              
              <div className="bg-blue-800 text-white p-4">
                <h2 className="font-black text-lg uppercase tracking-wider">{prop.title}</h2>
              </div>
              
              <div className="p-6">
                <p className="text-sm font-bold text-slate-500 mb-4 h-10">{prop.description}</p>
                
                <div className="relative">
                  <select 
                    value={picks[prop.id] || ""}
                    onChange={(e) => handleSelection(prop.id, e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-200 text-slate-900 font-black rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-red-600 focus:ring-0 transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select your pick...</option>
                    {prop.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}