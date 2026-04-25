"use client";

import React, { useState, useEffect } from 'react';

// --- TOURNAMENT LOCKOUT DATE ---
// Set to June 11, 2026 (Kickoff day)
const TOURNAMENT_START_DATE = new Date('2026-06-11T00:00:00Z');

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
  const [isTournamentLocked, setIsTournamentLocked] = useState(false);

  useEffect(() => {
    // 1. Check if the tournament has started
    if (new Date() >= TOURNAMENT_START_DATE) {
      setIsTournamentLocked(true);
    }

    // 2. Load the user
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
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
    
    // Hardstop just in case someone tries to bypass the disabled button
    if (isTournamentLocked) {
      alert("The tournament has started! Picks are officially locked.");
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
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans relative pb-12">
      
      {/* TOURNAMENT HOST BRANDING (USA/CAN/MEX) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* --- ENTERPRISE HEADER WITH HOST BRANDING --- */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-4">
          <div className="flex items-stretch gap-3">
            {/* The United 2026 Color Pillar */}
            <div className="w-1.5 rounded-full bg-gradient-to-b from-blue-800 via-red-600 to-emerald-600"></div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950 tracking-tight leading-none pt-1 uppercase">Tournament Props</h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5 pb-1">Review expert consensus and submit your official predictions.</p>
            </div>
          </div>
          
          {/* Action Area */}
          <div className="mt-4 md:mt-0 flex items-center">
            <button 
              onClick={savePropPicks} 
              disabled={isSaving || saveSuccess || isTournamentLocked} 
              className={`font-bold py-2.5 px-6 rounded-md text-sm transition-all shadow-sm flex items-center gap-2
                ${isTournamentLocked 
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                  : saveSuccess 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-500 cursor-default' 
                    : 'bg-blue-700 hover:bg-blue-800 text-white border border-transparent hover:shadow-md'
                }`}
            >
              {isTournamentLocked 
                ? "🔒 Props Locked" 
                : isSaving 
                  ? "Saving..." 
                  : saveSuccess 
                    ? "✓ Locked In" 
                    : "Save Predictions"}
            </button>
          </div>
        </div>

        {/* LOCK WARNING BANNER */}
        {isTournamentLocked && (
          <div className="mb-6 bg-rose-50 text-rose-700 font-bold px-4 py-3 rounded-md text-sm border border-rose-200 shadow-sm flex items-center gap-2">
            <span>🔒</span> The tournament has commenced. Prop picks are officially locked.
          </div>
        )}

        {/* PROPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROP_BETS.map((prop) => {
            const isSelected = !!picks[prop.id];

            return (
              <div key={prop.id} className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col transition-shadow hover:shadow-md relative overflow-hidden">
                
                {/* Active Selection Indicator */}
                {isSelected && !isTournamentLocked && (
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-blue-600"></div>
                )}
                
                {/* Ghost Card Header with Tinted Badge */}
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex justify-between items-start">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                        {prop.title}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium text-xs pr-4">{prop.description}</p>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest bg-white px-2 py-1 rounded border border-slate-200 shadow-sm mt-0.5 flex-shrink-0">
                      ✓ Selected
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col bg-white">
                  
                  {/* Consensus Favorites List */}
                  <div className="mb-6 flex-grow">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1.5">
                      Expert Consensus
                    </h3>
                    <ul className="space-y-3">
                      {prop.favorites.map((fav) => (
                        <li key={fav.rank} className="flex items-center gap-3 text-sm">
                          <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-500 font-bold text-[11px] tabular-nums shadow-sm">
                            {fav.rank}
                          </span>
                          <span className="font-semibold text-slate-800">{fav.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Selection Dropdown */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                      Your Official Pick
                    </label>
                    <div className="relative">
                      <select 
                        value={picks[prop.id] || ""}
                        onChange={(e) => handleSelection(prop.id, e.target.value)}
                        disabled={isTournamentLocked}
                        className={`w-full appearance-none rounded-md px-4 py-3 pr-10 text-sm outline-none transition-all duration-200
                          ${isTournamentLocked 
                            ? 'bg-slate-50 border border-slate-200 text-slate-400 cursor-not-allowed opacity-80 font-semibold' 
                            : isSelected
                              ? 'bg-blue-50/50 border border-blue-600 text-blue-900 font-bold ring-2 ring-blue-600/30 shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700 font-semibold hover:border-blue-400 hover:shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }
                        `}
                      >
                        <option value="" disabled>Select your prediction...</option>
                        {prop.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      
                      {/* Custom Select Chevron or Lock Icon */}
                      <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${isTournamentLocked ? 'text-slate-300' : 'text-slate-400'}`}>
                        {isTournamentLocked ? (
                           <span className="text-sm">🔒</span>
                        ) : (
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}