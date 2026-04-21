"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';

// --- MOCK DATA ---
const MOCK_SQUAD = {
  Goalkeepers: [
    { name: "Franco ARMANI", number: 1 },
    { name: "Geronimo RULLI", number: 12 },
    { name: "Emiliano MARTINEZ", number: 23 }
  ],
  Defenders: [
    { name: "Nahuel MOLINA", number: 26 },
    { name: "Cristian ROMERO", number: 13 },
    { name: "Nicolas OTAMENDI", number: 19 },
    { name: "Marcos ACUNA", number: 8 }
  ],
  Midfielders: [
    { name: "Rodrigo DE PAUL", number: 7 },
    { name: "Enzo FERNANDEZ", number: 24 },
    { name: "Alexis MAC ALLISTER", number: 20 }
  ],
  Forwards: [
    { name: "Lionel MESSI", number: 10 },
    { name: "Julian ALVAREZ", number: 9 },
    { name: "Angel DI MARIA", number: 11 }
  ]
};

// NEW: Mock stats mapping directly to your requested list
const MOCK_STATS = {
  matchesPlayed: 3,
  goals: 5,
  goalsConceded: 2,
  cleanSheets: 1,
  
  attemptsAtGoal: 42,
  attemptsOnTarget: 18,
  assists: 4,
  penaltiesScored: 1,
  ownGoals: 0,
  
  passes: 1450,
  passesCompleted: 1280,
  crosses: 45,
  crossesCompleted: 12,
  
  forcedTurnovers: 35,
  corners: 15,
  freeKicks: 22,
  foulsAgainst: 28,
  yellowCards: 4,
  redCards: 0
};

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

// Helper component for stat rows
const StatRow = ({ label, value }: { label: string, value: number | string }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
    <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">{label}</span>
    <span className="font-black text-slate-900 text-lg">{value}</span>
  </div>
);

export default function TeamDetailPage({ params }: { params: Promise<{ team: string }> }) {
  const resolvedParams = use(params);
  const teamName = decodeURIComponent(resolvedParams.team);
  const [activeTab, setActiveTab] = useState<'squad' | 'stats'>('squad');

  // Calculate percentages for the progress bars
  const passCompletionPct = Math.round((MOCK_STATS.passesCompleted / MOCK_STATS.passes) * 100);
  const crossCompletionPct = Math.round((MOCK_STATS.crossesCompleted / MOCK_STATS.crosses) * 100);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white pt-12 pb-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <Link href="/teams" className="text-slate-400 hover:text-white transition-colors text-xl font-bold">
            &larr; Back
          </Link>
          <div className="text-6xl">{FLAG_MAP[teamName] || "🏳️"}</div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">{teamName}</h1>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 flex space-x-8">
          <button 
            onClick={() => setActiveTab('squad')}
            className={`py-4 font-black uppercase tracking-widest text-sm transition-colors border-b-4 ${activeTab === 'squad' ? 'border-red-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Squad
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`py-4 font-black uppercase tracking-widest text-sm transition-colors border-b-4 ${activeTab === 'stats' ? 'border-red-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Stats
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            
            {/* Top Level Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Matches Played</p>
                <p className="text-4xl font-black text-blue-800">{MOCK_STATS.matchesPlayed}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Goals</p>
                <p className="text-4xl font-black text-emerald-600">{MOCK_STATS.goals}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Goals Conceded</p>
                <p className="text-4xl font-black text-red-600">{MOCK_STATS.goalsConceded}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Clean Sheets</p>
                <p className="text-4xl font-black text-slate-900">{MOCK_STATS.cleanSheets}</p>
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Column 1: Attack */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-black text-slate-900 uppercase border-b-2 border-slate-100 pb-3 mb-3">Attacking</h3>
                <StatRow label="Attempts at Goal" value={MOCK_STATS.attemptsAtGoal} />
                <StatRow label="Attempts on Target" value={MOCK_STATS.attemptsOnTarget} />
                <StatRow label="Assists" value={MOCK_STATS.assists} />
                <StatRow label="Corners" value={MOCK_STATS.corners} />
                <StatRow label="Penalties Scored" value={MOCK_STATS.penaltiesScored} />
                <StatRow label="Own Goals (For)" value={MOCK_STATS.ownGoals} />
              </div>

              {/* Column 2: Passing & Possession */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-black text-slate-900 uppercase border-b-2 border-slate-100 pb-3 mb-4">Passing</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Passes Completed</span>
                    <span className="font-black text-slate-900">{MOCK_STATS.passesCompleted} / {MOCK_STATS.passes}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-800 h-2.5 rounded-full" style={{ width: `${passCompletionPct}%` }}></div>
                  </div>
                  <p className="text-right text-xs font-bold text-blue-800 mt-1">{passCompletionPct}% Accuracy</p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Crosses Completed</span>
                    <span className="font-black text-slate-900">{MOCK_STATS.crossesCompleted} / {MOCK_STATS.crosses}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${crossCompletionPct}%` }}></div>
                  </div>
                  <p className="text-right text-xs font-bold text-emerald-600 mt-1">{crossCompletionPct}% Accuracy</p>
                </div>
              </div>

              {/* Column 3: Defense & Discipline */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-black text-slate-900 uppercase border-b-2 border-slate-100 pb-3 mb-3">Defense & Discipline</h3>
                <StatRow label="Forced Turnovers" value={MOCK_STATS.forcedTurnovers} />
                <StatRow label="Fouls Against" value={MOCK_STATS.foulsAgainst} />
                <StatRow label="Free Kicks Won" value={MOCK_STATS.freeKicks} />
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs flex items-center gap-2">
                    <span className="w-3 h-4 bg-yellow-400 rounded-sm"></span> Yellow Cards
                  </span>
                  <span className="font-black text-slate-900 text-lg">{MOCK_STATS.yellowCards}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs flex items-center gap-2">
                    <span className="w-3 h-4 bg-red-600 rounded-sm"></span> Red Cards
                  </span>
                  <span className="font-black text-slate-900 text-lg">{MOCK_STATS.redCards}</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SQUAD TAB */}
        {activeTab === 'squad' && (
          <div className="space-y-12">
            {Object.entries(MOCK_SQUAD).map(([position, players]) => (
              <div key={position}>
                <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase border-b-2 border-slate-200 pb-2">{position}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {players.map((player) => (
                    <div key={player.name} className="bg-white rounded-t-xl rounded-b-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center relative transition-transform hover:-translate-y-1">
                      <div className="absolute top-3 left-3 text-2xl z-10">{FLAG_MAP[teamName]}</div>
                      <div className="w-full bg-slate-100 pt-8 pb-4 flex justify-center items-end h-64 border-b border-slate-200 relative overflow-hidden">
                        <svg className="w-48 h-48 text-slate-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-slate-200 opacity-50 z-0">
                          {player.number}
                        </div>
                      </div>
                      <div className="p-6 text-center w-full relative z-10 bg-white">
                        <h3 className="font-black text-lg text-slate-900 leading-tight mb-2">{player.name}</h3>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{position.slice(0, -1)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}