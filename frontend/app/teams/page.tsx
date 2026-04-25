"use client";

import React from 'react';
import Link from 'next/link';

// --- DICTIONARIES ---
const TEAM_RANKS: Record<string, number> = {
  "Spain": 1, "France": 2, "England": 3, "Brazil": 4, "Argentina": 5,
  "Portugal": 6, "Germany": 7, "Netherlands": 8, "Norway": 9, "Belgium": 10,
  "Colombia": 11, "Morocco": 12, "Japan": 13, "USA": 14, "Uruguay": 15,
  "Mexico": 16, "Croatia": 17, "Switzerland": 18, "Ecuador": 19, "Sweden": 20,
  "Türkiye": 21, "Senegal": 22, "Austria": 23, "Paraguay": 24, "Canada": 25,
  "Scotland": 26, "Côte d'Ivoire": 27, "Bosnia and Herzegovina": 28, "Czechia": 29, "Egypt": 30,
  "Ghana": 31, "Algeria": 32, "Korea Republic": 33, "Australia": 34, "Tunisia": 35,
  "IR Iran": 36, "Congo DR": 37, "South Africa": 38, "Saudi Arabia": 39, "Panama": 40,
  "New Zealand": 41, "Qatar": 42, "Uzbekistan": 43, "Cabo Verde": 44, "Iraq": 45,
  "Jordan": 46, "Curaçao": 47, "Haiti": 48
};
const getRank = (team: string) => TEAM_RANKS[team] || 99;

const FLAG_MAP: Record<string, string> = {
  "Mexico": "🇲🇽", "South Africa": "🇿🇦", "Korea Republic": "🇰🇷", "Czechia": "🇨🇿",
  "Canada": "🇨🇦", "Bosnia and Herzegovina": "🇧🇦", "USA": "🇺🇸", "Paraguay": "🇵🇾",
  "Haiti": "🇭🇹", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Australia": "🇦🇺", "Türkiye": "🇹🇷",
  "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Qatar": "🇶🇦", "Switzerland": "🇨🇭",
  "Côte d'Ivoire": "🇨🇮", "Ecuador": "🇪🇨", "Germany": "🇩🇪", "Curaçao": "🇨🇼",
  "Netherlands": "🇳🇱", "Japan": "🇯🇵", "Sweden": "🇸🇪", "Tunisia": "🇹🇳",
  "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾", "Spain": "🇪🇸", "Cabo Verde": "🇨🇻",
  "IR Iran": "🇮🇷", "New Zealand": "🇳🇿", "Belgium": "🇧🇪", "Egypt": "🇪🇬",
  "France": "🇫🇷", "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴",
  "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
  "Ghana": "🇬🇭", "Panama": "🇵🇦", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croatia": "🇭🇷",
  "Portugal": "🇵🇹", "Congo DR": "🇨🇩", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴"
};

const FIFA_CODES: Record<string, string> = {
  "Mexico": "MEX", "South Africa": "RSA", "Korea Republic": "KOR", "Czechia": "CZE",
  "Canada": "CAN", "Switzerland": "SUI", "Qatar": "QAT", "Bosnia and Herzegovina": "BIH",
  "Brazil": "BRA", "Morocco": "MAR", "Haiti": "HAI", "Scotland": "SCO",
  "USA": "USA", "Paraguay": "PAR", "Australia": "AUS", "Türkiye": "TUR",
  "Germany": "GER", "Curaçao": "CUW", "Côte d'Ivoire": "CIV", "Ecuador": "ECU",
  "Netherlands": "NED", "Japan": "JPN", "Tunisia": "TUN", "Sweden": "SWE",
  "Belgium": "BEL", "Egypt": "EGY", "IR Iran": "IRN", "New Zealand": "NZL",
  "Spain": "ESP", "Cabo Verde": "CPV", "Saudi Arabia": "KSA", "Uruguay": "URU",
  "France": "FRA", "Senegal": "SEN", "Norway": "NOR", "Iraq": "IRQ",
  "Argentina": "ARG", "Algeria": "ALG", "Austria": "AUT", "Jordan": "JOR",
  "Portugal": "POR", "Uzbekistan": "UZB", "Colombia": "COL", "Congo DR": "COD",
  "England": "ENG", "Croatia": "CRO", "Ghana": "GHA", "Panama": "PAN"
};

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-amber-500 font-bold'; // Gold
  if (rank === 2) return 'text-slate-400 font-bold'; // Silver
  if (rank === 3) return 'text-amber-700 font-bold'; // Bronze
  return 'text-slate-400 font-semibold';
};

export default function TeamsHubPage() {
  const allTeams = Object.keys(FIFA_CODES).sort((a, b) => getRank(a) - getRank(b));

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans relative pb-12">
      
      {/* TOURNAMENT HOST BRANDING (USA/CAN/MEX) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* --- ENTERPRISE HEADER WITH HOST BRANDING --- */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-4">
          <div className="flex items-stretch gap-3">
            {/* The United 2026 Color Pillar */}
            <div className="w-1.5 rounded-full bg-gradient-to-b from-blue-800 via-red-600 to-emerald-600"></div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950 tracking-tight leading-none pt-1 uppercase">Tournament Teams</h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5 pb-1">All 48 competing nations, ranked by current tournament odds.</p>
            </div>
          </div>
          
          {/* Favorites Legend (Tinted Badge Style) */}
          <div className="mt-4 md:mt-0 flex items-center bg-white border border-slate-200 rounded-md shadow-sm p-1.5 pr-4 text-[11px] font-bold uppercase tracking-widest">
            <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded border border-blue-200 shadow-sm mr-4">
              Favorites Legend
            </span>
            <span className="text-amber-500 mr-3">1st</span>
            <span className="text-slate-400 mr-3">2nd</span>
            <span className="text-amber-700">3rd</span>
          </div>
        </div>

        {/* --- DATA TILES GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {allTeams.map((team) => {
            const rank = getRank(team);
            
            return (
              <Link 
                href={`/teams/${encodeURIComponent(team)}`} 
                key={team}
                className="relative bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 p-4 sm:p-5 flex flex-col items-center justify-center text-center group overflow-hidden"
              >
                {/* Subtle Hover Interaction Bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out"></div>

                {/* RANK BADGE */}
                <div className="absolute top-2 left-2.5 w-full flex justify-start">
                  <span className={`text-[10px] uppercase tracking-widest ${getRankColor(rank)}`}>
                    #{rank}
                  </span>
                </div>

                {/* FLAG ICON */}
                <div className="text-4xl sm:text-5xl mb-2.5 mt-3 rounded-full ring-1 ring-slate-200 overflow-hidden leading-none inline-block bg-white shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
                  {FLAG_MAP[team]}
                </div>
                
                {/* TEAM INFO */}
                <h2 className="font-bold text-slate-800 text-sm leading-tight mb-0.5 group-hover:text-blue-700 transition-colors">
                  {team}
                </h2>
                <p className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
                  {FIFA_CODES[team]}
                </p>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  );
}