"use client";

import React, { useState, useEffect } from 'react';

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

export default function BracketStandingsPage() {
  const [standings, setStandings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 font-bold tracking-widest uppercase text-blue-800">LOADING LEADERBOARD...</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">
            BRACKET <span className="text-red-600">STANDINGS</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2">The ultimate test of soccer knowledge.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* SOLID BLUE HEADER */}
          <div className="grid grid-cols-12 gap-4 bg-blue-800 text-white p-4 font-black uppercase tracking-wider text-xs sm:text-sm">
            <div className="col-span-2 sm:col-span-1 text-center text-blue-200">RNK</div>
            <div className="col-span-5 sm:col-span-4">PLAYER</div>
            <div className="hidden sm:block col-span-3 text-center">CHAMPION PICK</div>
            <div className="col-span-3 sm:col-span-2 text-center text-blue-200">ACCURACY</div>
            <div className="col-span-2 sm:col-span-2 text-right pr-4 text-blue-200">PTS</div>
          </div>

          <div className="divide-y divide-slate-100">
            {standings.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-bold uppercase tracking-widest">No players have joined yet!</div>
            ) : (
              standings.map((user) => (
                <div key={user.name} className="grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-slate-50">
                  
                  <div className="col-span-2 sm:col-span-1 text-center font-black text-slate-400">
                    #{user.rank}
                  </div>
                  
                  <div className="col-span-5 sm:col-span-4 font-black tracking-wide text-lg text-slate-900 truncate">
                    {user.name}
                  </div>

                  {/* CHAMPION PICK WITH FLAG & RANK */}
                  <div className="hidden sm:flex col-span-3 items-center justify-center gap-2 text-center font-bold text-slate-700 truncate">
                    {user.champion !== "TBD" && (
                      <span className="text-lg">{FLAG_MAP[user.champion] || ""}</span>
                    )}
                    <span>{user.champion}</span>
                    {TEAM_RANKS[user.champion] && (
                      <span className="text-[10px] text-slate-400 font-black tracking-widest">#{getRank(user.champion)}</span>
                    )}
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <div className="inline-block bg-slate-100 border border-slate-200 text-slate-500 font-black px-3 py-1 rounded-md text-sm shadow-sm">
                      {user.accuracy}
                    </div>
                  </div>
                  
                  {/* GREEN POINTS BADGE */}
                  <div className="col-span-2 sm:col-span-2 flex justify-end items-center pr-2">
                    <span className="font-black text-white bg-green-500 px-3 py-1 rounded-md shadow-sm text-lg sm:text-xl">
                      {user.points}
                    </span>
                  </div>
                  
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}