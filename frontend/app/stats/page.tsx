"use client";

import React from 'react';

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

// ADDED: 4 more teams to balance the column height perfectly
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
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Tournament Stats</h1>
          <p className="text-slate-500 text-lg">Historical Mockup: 2022 Leaders</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* COLUMN 1: Attacking */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold border-b-2 border-red-200 pb-2 flex items-center gap-2">
              Attacking Leaders
            </h2>
            
            {/* Goals Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Golden Boot (Goals)</h3>
              <div className="space-y-4">
                {attackingStats.goals.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">{player.name}</p>
                      <p className="text-xs text-slate-500">{player.team}</p>
                    </div>
                    <span className="text-xl font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assists Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Top Playmakers (Assists)</h3>
              <div className="space-y-4">
                {attackingStats.assists.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">{player.name}</p>
                      <p className="text-xs text-slate-500">{player.team}</p>
                    </div>
                    <span className="text-xl font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Defensive */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold border-b-2 border-red-200 pb-2 flex items-center gap-2">
              Defensive Anchors
            </h2>

            {/* Tackles Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Midfield Enforcers (Tackles)</h3>
              <div className="space-y-4">
                {defensiveStats.tackles.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">{player.name}</p>
                      <p className="text-xs text-slate-500">{player.team}</p>
                    </div>
                    <span className="text-xl font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Saves Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Shot Stoppers (Saves)</h3>
              <div className="space-y-4">
                {defensiveStats.saves.map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">{player.name}</p>
                      <p className="text-xs text-slate-500">{player.team}</p>
                    </div>
                    <span className="text-xl font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Team Dynamics */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold border-b-2 border-red-200 pb-2 flex items-center gap-2">
              Team Dynamics
            </h2>
            
            {/* Possession Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Possession Dominance</h3>
              
              {/* Table Header */}
              <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-3 mb-4">
                <span className="w-1/3">TEAM</span>
                <span className="w-1/3 text-center">POSS %</span>
                <span className="w-1/3 text-right">PASS ACC</span>
              </div>

              <div className="space-y-4">
                {teamStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 w-1/3">{stat.team}</span>
                    <div className="w-1/3 flex justify-center">
                      <span className="font-black text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{stat.possession}</span>
                    </div>
                    <div className="w-1/3 flex justify-end">
                      <span className="font-black text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{stat.passAccuracy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}