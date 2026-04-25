"use client";

import React from 'react';

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
  "Portugal": "🇵🇹", "Congo DR": "🇨🇩", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴",
  "Poland": "🇵🇱" 
};

// --- MOCK DATA: 2022 WORLD CUP STATS ---
const attackingStats = {
  goals: [
    { name: "Kylian Mbappé", team: "France", value: 8 },
    { name: "Lionel Messi", team: "Argentina", value: 7 },
    { name: "Julián Álvarez", team: "Argentina", value: 4 },
  ],
  assists: [
    { name: "Antoine Griezmann", team: "France", value: 3 },
    { name: "Harry Kane", team: "England", value: 3 },
    { name: "Bruno Fernandes", team: "Portugal", value: 3 },
  ]
};

const defensiveStats = {
  saves: [
    { name: "Dominik Livaković", team: "Croatia", value: 25 },
    { name: "Wojciech Szczęsny", team: "Poland", value: 23 },
    { name: "Andries Noppert", team: "Netherlands", value: 18 },
  ],
  tackles: [
    { name: "Achraf Hakimi", team: "Morocco", value: 26 },
    { name: "Mateo Kovačić", team: "Croatia", value: 24 },
    { name: "Enzo Fernández", team: "Argentina", value: 22 },
  ]
};

const teamStats = [
  { team: "Spain", possession: "77%", passAccuracy: "93%" },
  { team: "England", possession: "62%", passAccuracy: "89%" },
  { team: "Portugal", possession: "60%", passAccuracy: "88%" },
  { team: "Argentina", possession: "58%", passAccuracy: "88%" },
  { team: "Brazil", possession: "56%", passAccuracy: "88%" },
  { team: "Croatia", possession: "54%", passAccuracy: "86%" },
  { team: "France", possession: "52%", passAccuracy: "85%" },
  { team: "Morocco", possession: "39%", passAccuracy: "81%" },
];

export default function StatsPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 text-slate-900 font-sans relative pb-12">
      
      {/* TOURNAMENT HOST BRANDING (USA/CAN/MEX) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* --- ENTERPRISE HEADER WITH HOST BRANDING --- */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-4">
          <div className="flex items-stretch gap-3">
            {/* The United 2026 Color Pillar */}
            <div className="w-1.5 rounded-full bg-gradient-to-b from-blue-800 via-red-600 to-emerald-600"></div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950 tracking-tight leading-none pt-1 uppercase">Tournament Stats</h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5 pb-1">Historical Leaders (2022 Mockup Data).</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* COLUMN 1: Attacking */}
          <div className="space-y-6">
            <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">
              Attacking Leaders
            </h2>
            
            {/* Goals Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                  Golden Boot (Goals)
                </span>
              </div>
              <div className="flex flex-col bg-white">
                {attackingStats.goals.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-400 w-3 text-right">{idx + 1}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm leading-tight">{player.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-sm leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block bg-white shadow-sm">{FLAG_MAP[player.team] || ""}</span>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{player.team}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-emerald-600 tabular-nums">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assists Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                  Top Playmakers (Assists)
                </span>
              </div>
              <div className="flex flex-col bg-white">
                {attackingStats.assists.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-400 w-3 text-right">{idx + 1}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm leading-tight">{player.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-sm leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block bg-white shadow-sm">{FLAG_MAP[player.team] || ""}</span>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{player.team}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-emerald-600 tabular-nums">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Defensive */}
          <div className="space-y-6">
            <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">
              Defensive Anchors
            </h2>

            {/* Tackles Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                  Midfield Enforcers (Tackles)
                </span>
              </div>
              <div className="flex flex-col bg-white">
                {defensiveStats.tackles.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-400 w-3 text-right">{idx + 1}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm leading-tight">{player.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-sm leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block bg-white shadow-sm">{FLAG_MAP[player.team] || ""}</span>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{player.team}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-slate-700 tabular-nums">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Saves Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
               <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                  Shot Stoppers (Saves)
                </span>
              </div>
              <div className="flex flex-col bg-white">
                {defensiveStats.saves.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-400 w-3 text-right">{idx + 1}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm leading-tight">{player.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-sm leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block bg-white shadow-sm">{FLAG_MAP[player.team] || ""}</span>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{player.team}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-blue-700 tabular-nums">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Team Dynamics */}
          <div className="space-y-6">
            <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">
              Team Dynamics
            </h2>
            
            {/* Possession Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-fit hover:shadow-md transition-shadow">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                  Possession Dominance
                </span>
              </div>
              
              <div className="flex flex-col bg-white">
                {/* Secondary Table Ghost Header */}
                <div className="flex bg-slate-50 border-b border-slate-100 px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-1/2 pl-2">Team</div>
                  <div className="w-1/4 text-center">Poss</div>
                  <div className="w-1/4 text-right pr-2">Pass</div>
                </div>

                <div className="flex flex-col tabular-nums text-sm">
                  {teamStats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center px-4 py-2.5 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className="w-1/2 flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-semibold text-slate-400 w-3 text-right">{idx + 1}</span>
                        <span className="text-base leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block bg-white flex-shrink-0 shadow-sm">{FLAG_MAP[stat.team] || ""}</span>
                        <span className="font-semibold text-slate-800 truncate">{stat.team}</span>
                      </div>
                      <div className="w-1/4 flex justify-center">
                        <span className="font-medium text-slate-600">{stat.possession}</span>
                      </div>
                      <div className="w-1/4 flex justify-end pr-2">
                        <span className="font-medium text-slate-600">{stat.passAccuracy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}