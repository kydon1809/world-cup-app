"use client";

import React from 'react';
import Link from 'next/link';

// --- DICTIONARIES ---
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

export default function TeamsHubPage() {
  // Sort teams alphabetically
  const allTeams = Object.keys(FIFA_CODES).sort();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Teams</h1>
          <p className="text-slate-500 font-bold mt-2">All 48 nations competing in North America.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {allTeams.map((team) => (
            <Link 
              href={`/teams/${encodeURIComponent(team)}`} 
              key={team}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-800 transition-all p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {FLAG_MAP[team] || "🏳️"}
              </div>
              <h2 className="font-black text-slate-900 leading-tight mb-1">{team}</h2>
              <p className="text-sm font-bold text-slate-400 tracking-widest">({FIFA_CODES[team]})</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}