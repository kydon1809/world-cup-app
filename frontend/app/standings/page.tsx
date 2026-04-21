"use client";

import React, { useState, useEffect } from 'react';

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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 font-bold">Loading Leaderboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Bracket Standings</h1>
          <p className="text-slate-500 font-bold mt-2">The ultimate test of soccer knowledge.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* PRIMARY RED HEADER */}
          <div className="grid grid-cols-12 gap-4 bg-red-600 text-white p-4 font-black uppercase tracking-wider text-xs sm:text-sm">
            <div className="col-span-2 sm:col-span-1 text-center">Rnk</div>
            <div className="col-span-5 sm:col-span-4">Player</div>
            <div className="hidden sm:block col-span-3 text-center">Champion Pick</div>
            <div className="col-span-3 sm:col-span-2 text-center">Accuracy</div>
            <div className="col-span-2 sm:col-span-2 text-right pr-4">Pts</div>
          </div>

          <div className="divide-y divide-slate-100">
            {standings.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-bold">No players have joined yet!</div>
            ) : (
              standings.map((user) => (
                <div key={user.name} className="grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-slate-50">
                  {/* RANK & USERNAME BOTH MATCH CHARCOAL BLACK */}
                  <div className="col-span-2 sm:col-span-1 text-center font-black text-slate-900">
                    #{user.rank}
                  </div>
                  <div className="col-span-5 sm:col-span-4 font-bold text-lg text-slate-900 truncate">
                    {user.name}
                  </div>

                  {/* ACCENTS */}
                  <div className="hidden sm:block col-span-3 text-center font-bold text-slate-500 truncate">
                    {user.champion}
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <div className="inline-block bg-teal-50 text-teal-700 font-bold px-3 py-1 rounded-md text-sm">
                      {user.accuracy}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 text-right pr-2">
                    <span className="font-black text-2xl text-violet-700">{user.points}</span>
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