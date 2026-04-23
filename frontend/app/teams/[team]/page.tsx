"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';

// NEW: Import the data from our separated file!
// Adjust the '../' path depending on exactly where you placed the 'data' folder
import { TEAM_SQUADS, DEFAULT_SQUAD } from '../../../data/squads';

const MOCK_STATS = {
  matchesPlayed: 3, goals: 5, goalsConceded: 2, cleanSheets: 1,
  attemptsAtGoal: 42, attemptsOnTarget: 18, assists: 4, penaltiesScored: 1, ownGoals: 0,
  passes: 1450, passesCompleted: 1280, crosses: 45, crossesCompleted: 12,
  forcedTurnovers: 35, corners: 15, freeKicks: 22, foulsAgainst: 28, yellowCards: 4, redCards: 0
};

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

const StatRow = ({ label, value }: { label: string, value: number | string }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded">
    <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">{label}</span>
    <span className="font-black text-slate-900 text-lg">{value}</span>
  </div>
);

export default function TeamDetailPage({ params }: { params: Promise<{ team: string }> }) {
  const resolvedParams = use(params);
  const teamName = decodeURIComponent(resolvedParams.team);
  const [activeTab, setActiveTab] = useState<'squad' | 'stats'>('squad');

  const passCompletionPct = Math.round((MOCK_STATS.passesCompleted / MOCK_STATS.passes) * 100);
  const crossCompletionPct = Math.round((MOCK_STATS.crossesCompleted / MOCK_STATS.crosses) * 100);

  // NEW: Fetch the specific squad for this team, or use the generic fallback
  const currentSquad = TEAM_SQUADS[teamName] || DEFAULT_SQUAD;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-blue-800 text-white pt-10 pb-6 px-4 border-b-4 border-red-600 shadow-sm relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-full flex justify-between items-center sm:hidden mb-2">
            <Link href="/teams" className="text-blue-200 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">
              &larr; Back
            </Link>
            <span className="text-sm font-black text-blue-300 uppercase tracking-widest">Rank #{getRank(teamName)}</span>
          </div>

          <Link href="/teams" className="hidden sm:block absolute top-4 left-4 xl:left-auto text-blue-200 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">
            &larr; Back to Teams
          </Link>

          <div className="text-6xl sm:text-7xl drop-shadow-md">{FLAG_MAP[teamName] || ""}</div>
          
          <div className="flex flex-col items-start">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-left">{teamName}</h1>
            <span className="hidden sm:block text-sm font-black text-blue-300 uppercase tracking-widest mt-2 text-left">Tournament Rank: #{getRank(teamName)}</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex space-x-8">
          <button 
            onClick={() => setActiveTab('squad')}
            className={`py-4 font-black uppercase tracking-widest text-sm transition-all border-b-4 ${
              activeTab === 'squad' 
                ? 'border-red-600 text-red-600' 
                : 'border-transparent text-slate-500 hover:text-blue-800 hover:border-blue-300'
            }`}
          >
            Squad
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`py-4 font-black uppercase tracking-widest text-sm transition-all border-b-4 ${
              activeTab === 'stats' 
                ? 'border-red-600 text-red-600' 
                : 'border-transparent text-slate-500 hover:text-blue-800 hover:border-blue-300'
            }`}
          >
            Tournament Stats
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
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-blue-300 transition-colors">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Matches Played</p>
                <p className="text-4xl font-black text-slate-900">{MOCK_STATS.matchesPlayed}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-green-300 transition-colors">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Goals Scored</p>
                <p className="text-4xl font-black text-green-600">{MOCK_STATS.goals}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-red-300 transition-colors">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Goals Conceded</p>
                <p className="text-4xl font-black text-red-600">{MOCK_STATS.goalsConceded}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-blue-300 transition-colors">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Clean Sheets</p>
                <p className="text-4xl font-black text-blue-800">{MOCK_STATS.cleanSheets}</p>
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-black text-blue-900 uppercase border-b-2 border-red-600 pb-3 mb-3 inline-block">Attacking</h3>
                <StatRow label="Attempts at Goal" value={MOCK_STATS.attemptsAtGoal} />
                <StatRow label="Attempts on Target" value={MOCK_STATS.attemptsOnTarget} />
                <StatRow label="Assists" value={MOCK_STATS.assists} />
                <StatRow label="Corners" value={MOCK_STATS.corners} />
                <StatRow label="Penalties Scored" value={MOCK_STATS.penaltiesScored} />
                <StatRow label="Own Goals (For)" value={MOCK_STATS.ownGoals} />
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-black text-blue-900 uppercase border-b-2 border-red-600 pb-3 mb-4 inline-block">Passing</h3>
                
                <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Passes Completed</span>
                    <span className="font-black text-slate-900">{MOCK_STATS.passesCompleted} / {MOCK_STATS.passes}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-blue-800 h-2.5 rounded-full" style={{ width: `${passCompletionPct}%` }}></div>
                  </div>
                  <p className="text-right text-xs font-bold text-blue-800 mt-2">{passCompletionPct}% Accuracy</p>
                </div>

                <div className="mb-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Crosses Completed</span>
                    <span className="font-black text-slate-900">{MOCK_STATS.crossesCompleted} / {MOCK_STATS.crosses}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${crossCompletionPct}%` }}></div>
                  </div>
                  <p className="text-right text-xs font-bold text-green-700 mt-2">{crossCompletionPct}% Accuracy</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-black text-blue-900 uppercase border-b-2 border-red-600 pb-3 mb-3 inline-block">Defense & Discipline</h3>
                <StatRow label="Forced Turnovers" value={MOCK_STATS.forcedTurnovers} />
                <StatRow label="Fouls Against" value={MOCK_STATS.foulsAgainst} />
                <StatRow label="Free Kicks Won" value={MOCK_STATS.freeKicks} />
                <div className="flex justify-between items-center py-3 border-b border-slate-100 px-2 hover:bg-slate-50 transition-colors rounded">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs flex items-center gap-2">
                    <span className="w-3 h-4 bg-yellow-400 rounded-sm shadow-sm border border-yellow-500"></span> Yellow Cards
                  </span>
                  <span className="font-black text-slate-900 text-lg">{MOCK_STATS.yellowCards}</span>
                </div>
                <div className="flex justify-between items-center py-3 px-2 hover:bg-slate-50 transition-colors rounded">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs flex items-center gap-2">
                    <span className="w-3 h-4 bg-red-600 rounded-sm shadow-sm border border-red-700"></span> Red Cards
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
            {/* NEW: Iterate over the dynamically loaded currentSquad */}
            {Object.entries(currentSquad).map(([position, players]) => (
              <div key={position}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-black text-blue-900 uppercase m-0">{position}</h2>
                  <div className="h-1 flex-grow bg-slate-100 rounded"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {(players as Array<{name: string, number: number}>).map((player) => (
                    <div key={player.name} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center relative transition-all hover:-translate-y-1 hover:border-red-600 hover:shadow-md group">
                      <div className="absolute top-3 left-3 text-2xl z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                        {FLAG_MAP[teamName] || ""}
                      </div>
                      
                      <div className="w-full bg-slate-50 pt-8 pb-4 flex justify-center items-end h-48 border-b border-slate-100 relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                        <svg className="w-40 h-40 text-slate-200 relative z-10 group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-slate-100 opacity-50 z-0 group-hover:text-white transition-colors">
                          {player.number}
                        </div>
                      </div>
                      
                      <div className="p-5 text-center w-full relative z-10 bg-white">
                        <h3 className="font-black text-lg text-slate-900 leading-tight mb-1 group-hover:text-blue-900 transition-colors">{player.name}</h3>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <span className="bg-slate-100 text-slate-500 font-black text-xs px-2 py-1 rounded">#{player.number}</span>
                          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">{position.slice(0, -1)}</span>
                        </div>
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