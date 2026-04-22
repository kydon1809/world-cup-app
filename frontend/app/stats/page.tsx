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
  "Poland": "🇵🇱" // Added Poland specifically for the 2022 mockup data
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
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 text-slate-900 font-sans p-4 sm:p-8">
      
      <main className="max-w-7xl mx-auto py-6">
        
        {/* NEW HEADER STYLE */}
        <div className="mb-10 text-center border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">
            TOURNAMENT <span className="text-red-600">STATS</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2">Historical Mockup: 2022 Leaders</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* COLUMN 1: Attacking */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-blue-900 uppercase border-b-2 border-red-600 pb-2">
              Attacking Leaders
            </h2>
            
            {/* Goals Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-blue-800 text-white p-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-center">Golden Boot (Goals)</h3>
              </div>
              <div className="p-6 space-y-4">
                {attackingStats.goals.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0 hover:bg-slate-50 transition-colors px-2 rounded">
                    <div>
                      <p className="font-black text-slate-900">{player.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm">{FLAG_MAP[player.team] || ""}</span>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{player.team}</p>
                        {TEAM_RANKS[player.team] && <span className="text-[9px] text-slate-400 font-black tracking-widest ml-1">#{getRank(player.team)}</span>}
                      </div>
                    </div>
                    <span className="text-xl font-black text-white bg-green-500 px-3 py-1 rounded-md shadow-sm">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assists Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-blue-800 text-white p-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-center">Top Playmakers (Assists)</h3>
              </div>
              <div className="p-6 space-y-4">
                {attackingStats.assists.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0 hover:bg-slate-50 transition-colors px-2 rounded">
                    <div>
                      <p className="font-black text-slate-900">{player.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm">{FLAG_MAP[player.team] || ""}</span>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{player.team}</p>
                        {TEAM_RANKS[player.team] && <span className="text-[9px] text-slate-400 font-black tracking-widest ml-1">#{getRank(player.team)}</span>}
                      </div>
                    </div>
                    <span className="text-xl font-black text-white bg-green-500 px-3 py-1 rounded-md shadow-sm">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Defensive */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-blue-900 uppercase border-b-2 border-red-600 pb-2">
              Defensive Anchors
            </h2>

            {/* Tackles Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-blue-800 text-white p-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-center">Midfield Enforcers (Tackles)</h3>
              </div>
              <div className="p-6 space-y-4">
                {defensiveStats.tackles.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0 hover:bg-slate-50 transition-colors px-2 rounded">
                    <div>
                      <p className="font-black text-slate-900">{player.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm">{FLAG_MAP[player.team] || ""}</span>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{player.team}</p>
                        {TEAM_RANKS[player.team] && <span className="text-[9px] text-slate-400 font-black tracking-widest ml-1">#{getRank(player.team)}</span>}
                      </div>
                    </div>
                    <span className="text-xl font-black text-white bg-green-500 px-3 py-1 rounded-md shadow-sm">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Saves Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-blue-800 text-white p-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-center">Shot Stoppers (Saves)</h3>
              </div>
              <div className="p-6 space-y-4">
                {defensiveStats.saves.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0 hover:bg-slate-50 transition-colors px-2 rounded">
                    <div>
                      <p className="font-black text-slate-900">{player.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm">{FLAG_MAP[player.team] || ""}</span>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{player.team}</p>
                        {TEAM_RANKS[player.team] && <span className="text-[9px] text-slate-400 font-black tracking-widest ml-1">#{getRank(player.team)}</span>}
                      </div>
                    </div>
                    <span className="text-xl font-black text-white bg-green-500 px-3 py-1 rounded-md shadow-sm">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Team Dynamics */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-blue-900 uppercase border-b-2 border-red-600 pb-2">
              Team Dynamics
            </h2>
            
            {/* Possession Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
              <div className="bg-blue-800 text-white p-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-center">Possession Dominance</h3>
              </div>
              
              <div className="p-6">
                {/* Table Header */}
                <div className="flex justify-between text-xs font-black text-slate-400 border-b border-slate-200 pb-3 mb-4 uppercase tracking-widest">
                  <span className="w-1/2">TEAM</span>
                  <span className="w-1/4 text-center">POSS</span>
                  <span className="w-1/4 text-right">PASS</span>
                </div>

                <div className="space-y-4">
                  {teamStats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0 hover:bg-slate-50 transition-colors rounded px-1">
                      <div className="w-1/2 flex flex-col">
                        <span className="font-black text-slate-900 truncate">{stat.team}</span>
                        <div className="flex items-center gap-1">
                           <span className="text-[10px]">{FLAG_MAP[stat.team] || ""}</span>
                           {TEAM_RANKS[stat.team] && <span className="text-[9px] text-slate-400 font-black tracking-widest uppercase">#{getRank(stat.team)}</span>}
                        </div>
                      </div>
                      <div className="w-1/4 flex justify-center">
                        <span className="font-black text-white bg-slate-400 px-2 py-1 rounded-md shadow-sm text-sm">{stat.possession}</span>
                      </div>
                      <div className="w-1/4 flex justify-end">
                        <span className="font-black text-white bg-slate-400 px-2 py-1 rounded-md shadow-sm text-sm">{stat.passAccuracy}</span>
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