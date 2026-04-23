"use client";

import React, { useState, useEffect } from 'react';

// --- MOCK PROP BETS WITH FLAGS & EXPERT CONSENSUS ---
const PROP_BETS = [
  {
    id: "golden_boot",
    title: "Golden Boot",
    description: "Player to score the most goals in the tournament.",
    favorites: [
      { rank: 1, name: "🇫🇷 Kylian Mbappé (FRA)" },
      { rank: 2, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Harry Kane (ENG)" },
      { rank: 3, name: "🇦🇷 Lionel Messi (ARG)" },
    ],
    options: ["🇫🇷 Kylian Mbappé (FRA)", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Harry Kane (ENG)", "🇧🇷 Vinícius Júnior (BRA)", "🇦🇷 Lionel Messi (ARG)", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Jude Bellingham (ENG)", "🇪🇸 Lamine Yamal (ESP)", "Other"]
  },
  {
    id: "golden_ball",
    title: "Golden Ball (MVP)",
    description: "Best overall player of the tournament.",
    favorites: [
      { rank: 1, name: "🇫🇷 Kylian Mbappé (FRA)" },
      { rank: 2, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Jude Bellingham (ENG)" },
      { rank: 3, name: "🇧🇷 Vinícius Júnior (BRA)" },
    ],
    options: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Jude Bellingham (ENG)", "🇫🇷 Kylian Mbappé (FRA)", "🇪🇸 Rodri (ESP)", "🇧🇷 Vinícius Júnior (BRA)", "🇧🇪 Kevin De Bruyne (BEL)", "🇦🇷 Lionel Messi (ARG)", "Other"]
  },
  {
    id: "golden_glove",
    title: "Golden Glove",
    description: "Best goalkeeper of the tournament.",
    favorites: [
      { rank: 1, name: "🇧🇷 Alisson (BRA)" },
      { rank: 2, name: "🇦🇷 Emiliano Martinez (ARG)" },
      { rank: 3, name: "🇪🇸 Unai Simón (ESP)" },
    ],
    options: ["🇧🇷 Alisson (BRA)", "🇦🇷 Emiliano Martinez (ARG)", "🇪🇸 Unai Simón (ESP)", "🇫🇷 Mike Maignan (FRA)", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Jordan Pickford (ENG)", "Other"]
  },
  {
    id: "dark_horse",
    title: "Dark Horse Team",
    description: "Which team outside the top favorites makes the deepest run?",
    favorites: [
      { rank: 1, name: "🇺🇾 Uruguay" },
      { rank: 2, name: "🇨🇴 Colombia" },
      { rank: 3, name: "🇯🇵 Japan" },
    ],
    options: ["🇺🇾 Uruguay", "🇨🇴 Colombia", "🇺🇸 USA", "🇯🇵 Japan", "🇸🇳 Senegal", "🇲🇦 Morocco", "🇲🇽 Mexico", "Other"]
  },
  {
    id: "most_goals_team",
    title: "Highest Scoring Team",
    description: "Which country will score the most total goals?",
    favorites: [
      { rank: 1, name: "🇫🇷 France" },
      { rank: 2, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England" },
      { rank: 3, name: "🇧🇷 Brazil" },
    ],
    options: ["🇫🇷 France", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", "🇪🇸 Spain", "🇧🇷 Brazil", "🇦🇷 Argentina", "🇵🇹 Portugal", "🇩🇪 Germany", "Other"]
  }
];

export default function PropPicksPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    setSaveSuccess(false);
    
    try {
      const userId = currentUser.UserID || currentUser.id;
      const payload = { 
        user_id: Number(userId), 
        props: picks 
      };

      // Hitting your real Render API
      const res = await fetch('https://world-cup-api-bzrw.onrender.com/api/props', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Error saving picks. Please try again.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Network error. Could not connect to the Vault.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">
            TOURNAMENT <span className="text-red-600">PROPS</span>
          </h1>
          <p className="mt-4 text-lg font-bold text-slate-500">
            Review the expert consensus favorites, then make your official pick.
          </p>
        </div>

        {/* PROPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROP_BETS.map((prop) => {
            const isSelected = !!picks[prop.id];

            return (
              <div key={prop.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 flex flex-col hover:border-blue-300 transition-colors">
                
                {/* SECONDARY COLOR: Card Header */}
                <div className="bg-blue-800 px-6 py-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-wider uppercase">{prop.title}</h2>
                    <p className="text-blue-200 text-xs font-bold mt-1 uppercase tracking-wide">{prop.description}</p>
                  </div>
                  {/* ACCENT: Green indicator dot when selected */}
                  {isSelected && (
                    <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm border border-green-700 flex-shrink-0"></span>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  {/* Consensus Favorites List */}
                  <div className="mb-6 flex-grow">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Expert Favorites</h3>
                    <ul className="space-y-3">
                      {prop.favorites.map((fav) => (
                        <li key={fav.rank} className="flex items-center gap-3 text-sm">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-black text-xs shadow-sm">
                            {fav.rank}
                          </span>
                          <span className="font-bold text-slate-800">{fav.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Selection Dropdown */}
                  <div className="mt-auto pt-5 border-t border-slate-100">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Your Official Pick
                    </label>
                    <div className="relative">
                      <select 
                        value={picks[prop.id] || ""}
                        onChange={(e) => handleSelection(prop.id, e.target.value)}
                        className={`w-full appearance-none bg-slate-50 border-2 text-slate-900 font-black rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-0 transition-colors cursor-pointer shadow-sm
                          ${isSelected 
                            ? 'border-green-500 bg-green-50 focus:border-green-600' // ACCENT
                            : 'border-slate-200 focus:border-red-600' // PRIMARY
                          }`}
                      >
                        <option value="" disabled>Select your pick...</option>
                        {prop.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* SAVE BUTTON */}
        <div className="mt-12 text-center pb-12">
          <button 
            onClick={savePropPicks} 
            disabled={isSaving || saveSuccess} 
            className={`font-black py-4 px-12 rounded-xl shadow-md transition-all transform hover:-translate-y-1 uppercase tracking-widest text-white border-2
              ${saveSuccess 
                ? 'bg-green-500 border-green-600 hover:transform-none cursor-default' 
                : 'bg-red-600 border-red-700 hover:bg-red-700'
              }`}
          >
            {isSaving ? "LOCKING IN..." : saveSuccess ? "PICKS LOCKED IN ✓" : "LOCK IN MY PICKS"}
          </button>
        </div>

      </div>
    </div>
  );
}