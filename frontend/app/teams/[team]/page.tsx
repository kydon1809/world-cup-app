"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
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

// Refined Enterprise StatRow (Using neutral gray hover)
const StatRow = ({ label, value, valueColor = "text-slate-900" }: { label: string, value: number | string, valueColor?: string }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors px-5 tabular-nums text-sm">
    <span className="font-medium text-slate-600">{label}</span>
    <span className={`font-semibold ${valueColor}`}>{value}</span>
  </div>
);

export default function TeamDetailPage({ params }: { params: Promise<{ team: string }> }) {
  const resolvedParams = use(params);
  const teamName = decodeURIComponent(resolvedParams.team);
  const [activeTab, setActiveTab] = useState<'squad' | 'stats'>('squad');

  const passCompletionPct = Math.round((MOCK_STATS.passesCompleted / MOCK_STATS.passes) * 100);
  const crossCompletionPct = Math.round((MOCK_STATS.crossesCompleted / MOCK_STATS.crosses) * 100);

  const currentSquad = TEAM_SQUADS[teamName] || DEFAULT_SQUAD;
  const teamRank = getRank(teamName);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans">
      
      {/* ENTERPRISE HEADER BANNER (ESPN Charcoal Style) */}
      <div className="bg-[#2b2c2d] text-white pt-8 pb-0 px-4 border-b border-slate-800 shadow-sm relative">
        
        {/* TOURNAMENT HOST BRANDING (USA/CAN/MEX) - Top edge of the dark header */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-emerald-500 z-10"></div>

        <div className="max-w-7xl mx-auto relative z-20">
          
          {/* Breadcrumb Navigation */}
          <Link href="/teams" className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-4">
            &larr; Back to Teams
          </Link>

          {/* Team Identity Block */}
          <div className="flex items-end gap-5 pb-6">
            <div className="text-6xl sm:text-7xl leading-none rounded-sm bg-white p-1 shadow-md">
              {FLAG_MAP[teamName] || ""}
            </div>
            
            <div className="flex flex-col items-start pb-1">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-none mb-1.5">{teamName}</h1>
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest">
                <span className="text-slate-400">Tournament Rank:</span>
                <span className={teamRank <= 3 ? (teamRank === 1 ? 'text-amber-400' : teamRank === 2 ? 'text-slate-300' : 'text-amber-600') : 'text-white'}>
                  #{teamRank}
                </span>
              </div>
            </div>
          </div>

          {/* Broadcast Tabs */}
          <div className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('squad')}
              className={`py-3 text-[13px] font-semibold uppercase tracking-wider transition-colors relative ${
                activeTab === 'squad' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Squad
              {activeTab === 'squad' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-slate-50"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`py-3 text-[13px] font-semibold uppercase tracking-wider transition-colors relative ${
                activeTab === 'stats' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tournament Stats
              {activeTab === 'stats' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-slate-50"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* SQUAD TAB */}
        {activeTab === 'squad' && (
          <div className="space-y-8">
            {Object.entries(currentSquad).map(([position, players]) => (
              <div key={position} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                
                {/* Badge Header for Position */}
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                    {position}
                  </span>
                </div>
                
                {/* Sleek Data Tiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 bg-white">
                  {(players as Array<{name: string, number: number}>).map((player, index) => (
                    <div 
                      key={player.name} 
                      className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 transition-colors border-slate-100 ${
                        index !== 0 ? 'border-t sm:border-t-0' : '' 
                      } border-b sm:border-b-0 sm:border-r`}
                    >
                      {/* Number Block */}
                      <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg mr-3 shadow-sm tabular-nums flex-shrink-0">
                        {player.number}
                      </div>
                      
                      {/* Player Info */}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-semibold text-slate-800 text-sm truncate">{player.name}</span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest truncate">{position.slice(0, -1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            
            {/* Top Level Overview (KPI Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Matches Played</span>
                <span className="text-3xl font-semibold text-slate-900 tabular-nums">{MOCK_STATS.matchesPlayed}</span>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Goals Scored</span>
                <span className="text-3xl font-semibold text-emerald-600 tabular-nums">{MOCK_STATS.goals}</span>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Goals Conceded</span>
                <span className="text-3xl font-semibold text-rose-600 tabular-nums">{MOCK_STATS.goalsConceded}</span>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Clean Sheets</span>
                <span className="text-3xl font-semibold text-blue-700 tabular-nums">{MOCK_STATS.cleanSheets}</span>
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1: Attacking */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                    Attacking
                  </span>
                </div>
                <div className="flex flex-col bg-white">
                  <StatRow label="Attempts at Goal" value={MOCK_STATS.attemptsAtGoal} />
                  <StatRow label="Attempts on Target" value={MOCK_STATS.attemptsOnTarget} valueColor="text-blue-600" />
                  <StatRow label="Assists" value={MOCK_STATS.assists} valueColor="text-emerald-600" />
                  <StatRow label="Corners" value={MOCK_STATS.corners} />
                  <StatRow label="Penalties Scored" value={MOCK_STATS.penaltiesScored} />
                  <StatRow label="Own Goals (For)" value={MOCK_STATS.ownGoals} />
                </div>
              </div>

              {/* Box 2: Passing (With micro-progress bars) */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                    Passing
                  </span>
                </div>
                
                <div className="p-5 flex-grow flex flex-col justify-center space-y-7 bg-white">
                  {/* Passing Accuracy */}
                  <div>
                    <div className="flex justify-between items-end mb-2 tabular-nums">
                      <span className="font-medium text-slate-600 text-sm">Passes Completed</span>
                      <span className="font-semibold text-slate-900 text-sm">{MOCK_STATS.passesCompleted} / {MOCK_STATS.passes}</span>
                    </div>
                    {/* Sleek, thin progress bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 shadow-inner overflow-hidden">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${passCompletionPct}%` }}></div>
                    </div>
                    <p className="text-right text-[10px] font-bold text-blue-600 mt-1.5 uppercase tracking-widest">{passCompletionPct}% Accuracy</p>
                  </div>

                  {/* Crossing Accuracy */}
                  <div>
                    <div className="flex justify-between items-end mb-2 tabular-nums">
                      <span className="font-medium text-slate-600 text-sm">Crosses Completed</span>
                      <span className="font-semibold text-slate-900 text-sm">{MOCK_STATS.crossesCompleted} / {MOCK_STATS.crosses}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 shadow-inner overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${crossCompletionPct}%` }}></div>
                    </div>
                    <p className="text-right text-[10px] font-bold text-emerald-600 mt-1.5 uppercase tracking-widest">{crossCompletionPct}% Accuracy</p>
                  </div>
                </div>
              </div>

              {/* Box 3: Defense & Discipline */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                    Defense & Discipline
                  </span>
                </div>
                <div className="flex flex-col bg-white">
                  <StatRow label="Forced Turnovers" value={MOCK_STATS.forcedTurnovers} valueColor="text-emerald-600" />
                  <StatRow label="Fouls Against" value={MOCK_STATS.foulsAgainst} />
                  <StatRow label="Free Kicks Won" value={MOCK_STATS.freeKicks} />
                  
                  {/* Semantic Discipline Rows */}
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 px-5 hover:bg-gray-50 transition-colors text-sm tabular-nums">
                    <span className="font-medium text-slate-600 flex items-center gap-2">
                      <span className="w-2.5 h-3.5 bg-amber-400 rounded-sm border border-amber-500 shadow-sm"></span> Yellow Cards
                    </span>
                    <span className="font-semibold text-amber-600">{MOCK_STATS.yellowCards}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-5 hover:bg-gray-50 transition-colors text-sm tabular-nums">
                    <span className="font-medium text-slate-600 flex items-center gap-2">
                      <span className="w-2.5 h-3.5 bg-rose-600 rounded-sm border border-rose-700 shadow-sm"></span> Red Cards
                    </span>
                    <span className="font-semibold text-rose-600">{MOCK_STATS.redCards}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}