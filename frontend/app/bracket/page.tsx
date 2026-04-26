"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const KNOCKOUT_START_DATE = new Date('2026-06-28T00:00:00Z');

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

const ROUND_OF_32_TEAMS = [
  "A1", "B2", "C1", "D2", "E1", "F2", "G1", "H2", 
  "I1", "J2", "K1", "L2", "A2", "C2", "E2", "G2", 
  "B1", "A3", "D1", "C3", "F1", "E3", "H1", "G3", 
  "J1", "I2", "L1", "K2", "B3", "D3", "F3", "H3", 
];

const getRankColor = (index: number) => {
  if (index === 0) return 'text-amber-500 font-bold'; // Gold
  if (index === 1) return 'text-slate-400 font-bold'; // Silver
  if (index === 2) return 'text-amber-700 font-bold'; // Bronze
  return 'text-slate-400 font-semibold';
};

export default function BracketPage() {
  const [picks, setPicks] = useState<{ [matchId: number]: string }>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isKnockoutLocked, setIsKnockoutLocked] = useState(false);

  const [actualWinners, setActualWinners] = useState<{ [matchId: number]: string }>({});
  const [eliminatedTeams, setEliminatedTeams] = useState<string[]>([]);
  const [bracketStandings, setBracketStandings] = useState<any[]>([]);
  
  // Tabs for the Knockout Stage Hub
  const [activeTab, setActiveTab] = useState<'bracket' | 'leaderboard'>('bracket');

  useEffect(() => {
    if (new Date() >= KNOCKOUT_START_DATE) {
      setIsKnockoutLocked(true);
    }

    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      
      const userId = user.UserID || user.id;
      fetch(`https://world-cup-api-bzrw.onrender.com/api/users/${userId}/bracket`)
        .then(res => res.json())
        .then(data => {
          if (data.picks) setPicks(data.picks);
        })
        .catch(err => console.error("Error loading bracket:", err));
    }

    const fetchLeaderboard = async () => {
      try {
        const usersRes = await fetch('https://world-cup-api-bzrw.onrender.com/api/users');
        const usersData = await usersRes.json();

        const standingsData = await Promise.all(usersData.map(async (u: any) => {
          let championPick = "TBD";
          try {
            const userId = u.UserID || u.id;
            const bracketRes = await fetch(`https://world-cup-api-bzrw.onrender.com/api/users/${userId}/bracket`);
            const bracketData = await bracketRes.json();
            if (bracketData.picks && bracketData.picks["31"]) championPick = bracketData.picks["31"];
          } catch (err) { }

          return {
            id: u.UserID || u.id,
            name: u.Username,
            points: u.TotalPoints || 0,
            accuracy: "TBD", // Mock Percentage logic goes here once tournament starts
            champion: championPick
          };
        }));

        standingsData.sort((a, b) => b.points - a.points);
        const rankedStandings = standingsData.map((item, index) => ({ ...item, rank: index + 1 }));
        setBracketStandings(rankedStandings);
      } catch (error) { console.error("Error loading standings:", error); }
    };

    fetchLeaderboard();
  }, []);

  const saveBracketToVault = async () => {
    if (!currentUser) return alert("Please log in on the main page first!");
    if (isKnockoutLocked) return alert("The Knockout Stage has started! Brackets are officially locked.");

    setIsSaving(true);
    try {
      const payload = { user_id: Number(currentUser.UserID || currentUser.id), picks: picks };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bracket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <-- SENDS THE COOKIE TO THE BOUNCER
        body: JSON.stringify(payload)
      });
      if (res.ok) alert("Bracket successfully saved.");
      else alert("Error saving bracket.");
    } catch (error) { console.error("Save error:", error); }
    setIsSaving(false);
  };

  const getNextMatchId = (currentId: number) => {
    if (currentId <= 16) return Math.floor((currentId - 1) / 2) + 17;
    if (currentId <= 24) return Math.floor((currentId - 17) / 2) + 25;
    if (currentId <= 28) return Math.floor((currentId - 25) / 2) + 29;
    if (currentId <= 30) return 31; 
    return 0; 
  };

  const handlePick = (currentMatchId: number, team: string) => {
    if (isKnockoutLocked || !team || team.includes("TBD")) return; 
    
    const newPicks = { ...picks };
    if (picks[currentMatchId] === team) newPicks[currentMatchId] = ""; 
    else newPicks[currentMatchId] = team;

    let curr = currentMatchId;
    let next = getNextMatchId(curr);
    let oldTeam = picks[currentMatchId]; 

    while (next !== 0 && newPicks[next] === oldTeam && oldTeam !== "") {
      newPicks[next] = ""; 
      curr = next;
      next = getNextMatchId(curr);
    }
    setPicks(newPicks);
  };

  const getTeam = (matchId: number, position: 'top' | 'bottom') => {
    if (matchId <= 16) {
      const index = (matchId - 1) * 2 + (position === 'top' ? 0 : 1);
      return ROUND_OF_32_TEAMS[index];
    }
    let p1, p2;
    if (matchId <= 24) { p1 = (matchId - 17) * 2 + 1; p2 = p1 + 1; }
    else if (matchId <= 28) { p1 = (matchId - 25) * 2 + 17; p2 = p1 + 1; }
    else if (matchId <= 30) { p1 = (matchId - 29) * 2 + 25; p2 = p1 + 1; }
    else { p1 = 29; p2 = 30; }

    return position === 'top' ? picks[p1] || "" : picks[p2] || "";
  };

  const MatchNode = ({ matchId, side }: { matchId: number, side: 'left' | 'right' | 'center' }) => {
    const topTeam = getTeam(matchId, 'top');
    const bottomTeam = getTeam(matchId, 'bottom');
    const pickedTeam = picks[matchId];

    const getButtonStyle = (team: string) => {
      if (!team) return { bg: `bg-gray-50 border-transparent text-slate-400`, text: 'italic text-[12px]' };
      const isElim = eliminatedTeams.includes(team);
      const isWin = actualWinners[matchId] === team;
      const isSel = pickedTeam === team;

      if (isSel) {
        if (isWin) return { bg: 'bg-emerald-50 text-emerald-900 border-emerald-500 ring-1 ring-emerald-500/20 z-10 shadow-sm', text: 'font-bold' }; 
        if (isElim) return { bg: 'bg-gray-50 text-slate-400 border-slate-200 opacity-60 z-10', text: 'line-through font-semibold' }; 
        return { bg: 'bg-blue-50/80 text-blue-900 border-blue-600 ring-1 ring-blue-600/20 z-10 shadow-sm', text: 'font-bold' }; 
      } else {
        if (isElim) return { bg: 'bg-gray-50 text-slate-400 border-slate-200 opacity-60', text: 'line-through' }; 
        return { bg: `bg-white text-slate-700 border-slate-200 ${!isKnockoutLocked ? 'hover:bg-gray-50 hover:border-slate-300' : 'opacity-90'}`, text: 'font-semibold' }; 
      }
    };

    const topStyles = getButtonStyle(topTeam);
    const bottomStyles = getButtonStyle(bottomTeam);

    const renderTeam = (team: string, styles: any) => {
      if (!team) return <span className="text-slate-400 italic flex-1 text-center text-[10px] sm:text-xs">TBD</span>;
      const isSel = styles.bg.includes('border-blue-600') || styles.bg.includes('border-emerald-500');
      return (
        <span className={`flex items-center justify-between w-full ${styles.text}`}>
          <span className="truncate text-[10px] sm:text-[11px] lg:text-xs">{team}</span>
          {TEAM_RANKS[team] && <span className={`text-[9px] ml-1 font-bold hidden sm:inline ${isSel ? (styles.bg.includes('emerald') ? 'text-emerald-600' : 'text-blue-600') : 'text-slate-400'}`}>#{getRank(team)}</span>}
        </span>
      );
    };

    return (
      <div className={`relative flex flex-col justify-center my-1 w-20 sm:w-24 md:w-28 lg:w-32 group ${isKnockoutLocked ? 'cursor-not-allowed' : ''}`}>
        {side === 'left' && <div className={`absolute top-1/2 -right-2 sm:-right-3 md:-right-4 w-2 sm:w-3 md:w-4 h-[2px] bg-slate-200 z-0 ${!isKnockoutLocked ? 'group-hover:bg-blue-300' : ''}`}></div>}
        {side === 'right' && <div className={`absolute top-1/2 -left-2 sm:-left-3 md:-left-4 w-2 sm:w-3 md:w-4 h-[2px] bg-slate-200 z-0 ${!isKnockoutLocked ? 'group-hover:bg-blue-300' : ''}`}></div>}
        <div className={`flex flex-col bg-white border border-slate-200 rounded shadow-sm w-full relative z-10 transition-all ${!isKnockoutLocked ? 'hover:shadow-md' : ''}`}>
          <button disabled={isKnockoutLocked} onClick={() => handlePick(matchId, topTeam)} className={`p-1 sm:p-1.5 text-left border-b border-slate-100 flex items-center ${isKnockoutLocked ? 'cursor-not-allowed' : ''} ${topStyles.bg}`}>{renderTeam(topTeam, topStyles)}</button>
          <button disabled={isKnockoutLocked} onClick={() => handlePick(matchId, bottomTeam)} className={`p-1 sm:p-1.5 text-left flex items-center rounded-b ${isKnockoutLocked ? 'cursor-not-allowed' : ''} ${bottomStyles.bg}`}>{renderTeam(bottomTeam, bottomStyles)}</button>
        </div>
      </div>
    );
  };

  const MatchColumn = ({ startId, count, side }: { startId: number, count: number, side: 'left' | 'right' }) => (
    <div className="flex flex-col justify-around min-h-[500px] sm:min-h-[600px] relative z-20">
      {Array.from({ length: count }).map((_, i) => <MatchNode key={startId + i} matchId={startId + i} side={side} />)}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans relative pb-12">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600"></div>

      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 pt-8">
        
        {/* --- HUB HEADER --- */}
        <div className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-end pb-4">
          <div className="flex items-stretch gap-3">
            <div className="w-1.5 rounded-full bg-gradient-to-b from-blue-800 via-red-600 to-emerald-600"></div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950 tracking-tight leading-none pt-1 uppercase">Knockout Hub</h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5 pb-1">Submit your bracket and track your live points.</p>
            </div>
          </div>
        </div>

        {/* --- BROADCAST TABS --- */}
        <div className="flex space-x-6 sm:space-x-8 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('bracket')}
            className={`py-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'bracket' ? 'text-blue-900' : 'text-slate-400 hover:text-blue-700'}`}
          >
            Tournament Bracket
            {activeTab === 'bracket' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-sm"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'leaderboard' ? 'text-blue-900' : 'text-slate-400 hover:text-blue-700'}`}
          >
            Bracket Leaderboard
            {activeTab === 'leaderboard' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-sm"></span>}
          </button>
        </div>

        {/* --- TAB CONTENT: KNOCKOUT BRACKET --- */}
        {activeTab === 'bracket' && (
          <>
            {/* Contextual Actions (Only visible on Bracket Tab) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
               <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden lg:flex items-center gap-3">
                 <span className="text-slate-400">Pts:</span>
                 <span>R16 <span className="text-emerald-600">+2</span></span>
                 <span>QF <span className="text-emerald-600">+4</span></span>
                 <span>SF <span className="text-emerald-600">+8</span></span>
                 <span>Champ <span className="text-emerald-600">+16</span></span>
               </div>

               <button 
                onClick={saveBracketToVault} 
                disabled={isSaving || isKnockoutLocked} 
                className={`font-bold py-2 px-6 rounded-md text-sm transition-colors shadow-sm ml-auto ${isKnockoutLocked ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
              >
                {isKnockoutLocked ? "🔒 Bracket Locked" : isSaving ? "Saving..." : "Save Bracket"}
              </button>
            </div>

            {isKnockoutLocked && (
              <div className="mb-4 bg-rose-50 text-rose-700 font-bold px-4 py-2.5 rounded-md text-sm border border-rose-200 shadow-sm flex items-center justify-center gap-2">
                <span>🔒</span> Knockout Stage has commenced. Brackets are officially locked.
              </div>
            )}

            <div className="overflow-x-auto pb-8 scrollbar-hide mb-6 border-b border-slate-200">
              <div className="flex w-full min-w-[800px] xl:min-w-0 mx-auto mt-2">
                <div className="flex flex-1 justify-between pr-2 sm:pr-3 md:pr-4 gap-2 sm:gap-3 md:gap-4">
                  <MatchColumn startId={1} count={8} side="left" />  
                  <MatchColumn startId={17} count={4} side="left" /> 
                  <MatchColumn startId={25} count={2} side="left" /> 
                  <MatchColumn startId={29} count={1} side="left" /> 
                </div>

                <div className="relative flex flex-col items-center justify-center w-[100px] sm:w-[140px] md:w-[180px] flex-none min-h-[500px] sm:min-h-[600px]">
                  <div className="absolute top-12 sm:top-16 md:top-20 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center w-full">
                    <h2 className="text-[10px] sm:text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-1.5">Champion</h2>
                    <div className={`w-28 sm:w-36 md:w-44 p-2 sm:p-3 border rounded-md shadow-sm flex flex-col items-center justify-center min-h-[50px] sm:min-h-[60px] transition-all bg-white
                      ${eliminatedTeams.includes(picks[31] || "") ? "border-slate-200 text-slate-400 line-through opacity-80" : actualWinners[31] === picks[31] && picks[31] ? "border-amber-400 text-amber-900 ring-1 ring-amber-400/30 bg-amber-50" : "border-amber-300 text-slate-900"}`}
                    >
                      <span className="truncate w-full text-center font-bold text-xs sm:text-sm md:text-base">{picks[31] || "—"}</span>
                      {picks[31] && TEAM_RANKS[picks[31]] && <span className="text-[9px] tracking-widest uppercase mt-0.5 text-amber-600/80 font-bold hidden sm:block">Rank #{getRank(picks[31])}</span>}
                    </div>
                  </div>
                  <div className="relative z-10 w-full flex flex-col items-center justify-center">
                    <h2 className="absolute bottom-full mb-1 sm:mb-2 w-max text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Final Match</h2>
                    <MatchNode matchId={31} side="center" />
                  </div>
                </div>

                <div className="flex flex-1 justify-between flex-row-reverse pl-2 sm:pl-3 md:pl-4 gap-2 sm:gap-3 md:gap-4">
                  <MatchColumn startId={9} count={8} side="right" />   
                  <MatchColumn startId={21} count={4} side="right" />  
                  <MatchColumn startId={27} count={2} side="right" />  
                  <MatchColumn startId={30} count={1} side="right" />  
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- TAB CONTENT: BRACKET LEADERBOARD (Restricted Width) --- */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-200 px-4 py-3 items-center">
                <div className="w-12 text-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RNK</span></div>
                <div className="flex-1 pl-2"><span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">Player Roster</span></div>
                <div className="hidden sm:block w-48 text-left"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Champion Pick</span></div>
                <div className="hidden md:block w-24 text-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</span></div>
                <div className="w-16 text-right pr-2"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PTS</span></div>
              </div>

              <div className="flex flex-col tabular-nums text-sm bg-white">
                {bracketStandings.length === 0 ? (
                  <div className="p-8 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">No players have joined yet</div>
                ) : (
                  bracketStandings.map((user, index) => {
                    const targetUserId = String(user.id);
                    const loggedInUserId = currentUser ? String(currentUser.UserID || currentUser.id) : null;
                    const isCurrentUser = loggedInUserId === targetUserId;

                    return (
                      <div key={user.name} className={`flex items-center px-4 py-3 border-b border-slate-100 last:border-0 transition-colors ${isCurrentUser ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                        <div className={`w-12 text-center text-sm ${getRankColor(index)}`}>{user.rank}</div>
                        <div className="flex-1 pl-2 truncate">
                           <Link href={`/profile/${targetUserId}`} className={`hover:underline ${isCurrentUser ? 'font-bold text-blue-900' : 'font-medium text-slate-800'}`}>
                             {user.name}
                             {isCurrentUser && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1.5 no-underline">(You)</span>}
                           </Link>
                        </div>
                        <div className="hidden sm:flex w-48 items-center gap-2 text-left">
                          {user.champion !== "TBD" ? (
                            <>
                              <span className="text-xl leading-none rounded-full ring-1 ring-slate-200 overflow-hidden bg-white shadow-sm inline-block">{FLAG_MAP[user.champion]}</span>
                              <span className="font-medium text-slate-700 truncate">{user.champion}</span>
                              {TEAM_RANKS[user.champion] && <span className="text-[9px] text-slate-400 font-bold tracking-widest">#{getRank(user.champion)}</span>}
                            </>
                          ) : <span className="text-[11px] text-slate-400 italic font-medium">TBD</span>}
                        </div>
                        <div className="hidden md:block w-24 text-center font-medium text-slate-500">
                          {user.accuracy}
                        </div>
                        <div className={`w-16 text-right pr-2 text-base ${index === 0 ? 'font-bold text-amber-600' : 'font-semibold text-slate-900'}`}>{user.points}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}