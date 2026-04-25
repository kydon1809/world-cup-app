"use client";

import React, { useState, useEffect } from 'react';
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

const getRankColor = (index: number) => {
  if (index === 0) return 'text-amber-500 font-bold'; // Gold
  if (index === 1) return 'text-slate-400 font-bold'; // Silver
  if (index === 2) return 'text-amber-700 font-bold'; // Bronze
  return 'text-slate-400 font-semibold';
};

export default function BracketStandingsPage() {
  const [standings, setStandings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // 1. Load active user to highlight them on the leaderboard
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    // 2. Fetch Standings Data
    const fetchStandings = async () => {
      try {
        const usersRes = await fetch('https://world-cup-api-bzrw.onrender.com/api/users');
        const users = await usersRes.json();

        const standingsData = await Promise.all(users.map(async (user: any) => {
          let championPick = "TBD";
          try {
            const userId = user.UserID || user.id;
            const bracketRes = await fetch(`https://world-cup-api-bzrw.onrender.com/api/users/${userId}/bracket`);
            const bracketData = await bracketRes.json();
            if (bracketData.picks && bracketData.picks["31"]) championPick = bracketData.picks["31"];
          } catch (err) { }

          return {
            id: user.UserID || user.id,
            name: user.Username,
            points: user.TotalPoints || 0,
            accuracy: "0%",
            champion: championPick
          };
        }));

        standingsData.sort((a, b) => b.points - a.points);
        const rankedStandings = standingsData.map((item, index) => ({ ...item, rank: index + 1 }));
        setStandings(rankedStandings);
      } catch (error) {
        console.error("Failed to load standings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (isLoading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 font-medium tracking-widest uppercase text-slate-500 text-sm">Loading Leaderboard...</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- ENTERPRISE HEADER --- */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-4">
          <div className="flex items-stretch gap-3">
            <div className="w-1.5 rounded-full bg-gradient-to-b from-blue-800 via-red-600 to-emerald-600"></div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950 tracking-tight leading-none pt-1 uppercase">Global Leaderboard</h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5 pb-1">The ultimate test of tournament knowledge.</p>
            </div>
          </div>
        </div>

        {/* --- GHOST TABLE CONTAINER --- */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Subtle Table Header with Tinted Badge */}
          <div className="flex bg-slate-50 border-b border-slate-200 px-4 py-3 items-center">
            <div className="w-12 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RNK</span>
            </div>
            <div className="flex-1 pl-2">
              <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                Player Roster
              </span>
            </div>
            <div className="hidden sm:block w-48 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Champion Pick</span>
            </div>
            <div className="hidden md:block w-24 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</span>
            </div>
            <div className="w-16 text-right pr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PTS</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col tabular-nums text-sm">
            {standings.length === 0 ? (
              <div className="p-8 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">No players have joined yet</div>
            ) : (
              standings.map((user, index) => {
                const isCurrentUser = currentUser && user.id === (currentUser.UserID || currentUser.id);

                return (
                  <div 
                    key={user.name} 
                    className={`flex items-center px-4 py-3.5 border-b border-slate-100 last:border-0 transition-colors ${
                      isCurrentUser ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    
                    {/* Rank */}
                    <div className={`w-12 text-center text-sm ${getRankColor(index)}`}>
                      {user.rank}
                    </div>
                    
                    {/* Player Name */}
                    <div className="flex-1 pl-2 truncate">
                      <Link 
                        href={`/profile/${user.id}`} 
                        className={`hover:underline ${isCurrentUser ? 'font-bold text-blue-900' : 'font-semibold text-slate-800'}`}
                      >
                        {user.name}
                      </Link>
                    </div>

                    {/* Champion Pick */}
                    <div className="hidden sm:flex w-48 items-center gap-2 text-left">
                      {user.champion !== "TBD" ? (
                        <>
                          <span className="text-xl leading-none rounded-full ring-1 ring-slate-200 overflow-hidden bg-white shadow-sm inline-block">
                            {FLAG_MAP[user.champion]}
                          </span>
                          <span className="font-medium text-slate-700 truncate">{user.champion}</span>
                          {TEAM_RANKS[user.champion] && (
                            <span className="text-[9px] text-slate-400 font-bold tracking-widest">#{getRank(user.champion)}</span>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">TBD</span>
                      )}
                    </div>
                    
                    {/* Accuracy */}
                    <div className="hidden md:block w-24 text-center font-medium text-slate-500">
                      {user.accuracy}
                    </div>
                    
                    {/* Points */}
                    <div className={`w-16 text-right pr-2 text-base ${index === 0 ? 'font-bold text-amber-600' : 'font-semibold text-slate-900'}`}>
                      {user.points}
                    </div>
                    
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}