"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- CONFIGURATION ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://world-cup-api-bzrw.onrender.com';

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
const getFlag = (team: string) => FLAG_MAP[team] || "";

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

const OFFICIAL_GROUPS: Record<string, string[]> = {
  A: ["Mexico", "South Africa", "Korea Republic", "Czechia"],
  B: ["Canada", "Switzerland", "Qatar", "Bosnia and Herzegovina"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Paraguay", "Australia", "Türkiye"],
  E: ["Germany", "Curaçao", "Côte d'Ivoire", "Ecuador"],
  F: ["Netherlands", "Japan", "Tunisia", "Sweden"],
  G: ["Belgium", "Egypt", "IR Iran", "New Zealand"],
  H: ["Spain", "Cabo Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Norway", "Iraq"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "Uzbekistan", "Colombia", "Congo DR"],
  L: ["England", "Croatia", "Ghana", "Panama"]
};

const generateOfficialGroups = () => {
  const groups = [];
  for (const [letter, teams] of Object.entries(OFFICIAL_GROUPS)) {
    groups.push({
      name: `Group ${letter}`,
      teams: teams.map(teamName => ({ name: teamName, played: 0, won: 0, draw: 0, lost: 0, gd: 0, pts: 0 }))
    });
  }
  return groups;
};

const getMockTeamStats = (teamName: string) => {
  const seed = teamName.length + (teamName.charCodeAt(0) || 0);
  return {
    goalsScored: (seed % 4) + 1,
    goalsConceded: (seed % 3),
    possession: 40 + (seed % 21), 
    shotsOnTarget: 3 + (seed % 6),
    cleanSheets: seed % 2,
  };
};

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [lockedPicks, setLockedPicks] = useState<{ [key: string]: string }>({});
  const [dailyLocks, setDailyLocks] = useState<{ [date: string]: string }>({}); 
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [compareMatch, setCompareMatch] = useState<any | null>(null);
  const [groupStandings, setGroupStandings] = useState(generateOfficialGroups());
  
  // Tabs for the Group Stage Hub
  const [activeTab, setActiveTab] = useState<'picks' | 'standings'>('picks');

  useEffect(() => {
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    Promise.all([
      fetch(`${API_URL}/api/users`).then(res => res.json()),
      fetch(`${API_URL}/api/matches`).then(res => res.json())
    ]).then(([userData, matchData]) => {
      userData.sort((a: any, b: any) => (b.TotalPoints || 0) - (a.TotalPoints || 0));
      setUsers(userData);
      setAllMatches(matchData);
      if (matchData.length > 0) setSelectedDate(matchData[0].date);
      setIsLoading(false);
    }).catch(err => console.error("Data fetch error:", err));
  }, []);

  useEffect(() => {
    if (currentUser && allMatches.length > 0) {
      const userId = currentUser.UserID || currentUser.id;
      
      fetch(`${API_URL}/api/users/${userId}/picks`)
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data)) return; 

          const history: { [key: string]: string } = {};
          const locks: { [key: string]: string } = {};
          
          data.forEach((pick: any) => { 
            if (pick.PickedTeam !== "") history[pick.MatchID] = pick.PickedTeam; 
            if (pick.IsLock) {
              const matchDate = allMatches.find(m => String(m.id) === pick.MatchID)?.date;
              if (matchDate) locks[matchDate] = pick.MatchID;
            }
          });
          setLockedPicks(history);
          setDailyLocks(locks);
        })
        .catch(err => console.error("Error loading history:", err));
    } else {
      setLockedPicks({}); 
      setDailyLocks({});
    }
  }, [currentUser, allMatches]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!authUsername || !authPassword) return setAuthError("Please enter both username and password.");

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Secure Cookie Handshake
        body: JSON.stringify({ username: authUsername, password: authPassword })
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('wc_user', JSON.stringify(user));
        window.location.reload();
      } else setAuthError("Invalid username or password.");
    } catch (error) { setAuthError("Server error. Make sure your backend is running."); }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!authUsername || !authPassword) return setAuthError("Please fill out all fields.");

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Secure Cookie Handshake
        body: JSON.stringify({ Username: authUsername, Password: authPassword, Email: `${authUsername.replace(/\s+/g, '').toLowerCase()}@family.com` })
      });
      
      if (res.ok) {
        const newUser = await res.json();
        localStorage.setItem('wc_user', JSON.stringify(newUser));
        window.location.href = '/welcome';
      } else setAuthError("Username might already be taken.");
    } catch (error) { setAuthError("Server error. Make sure your backend is running."); }
  };

  const submitPick = async (matchId: any, team: string, isLockAction: boolean = false) => {
    if (!currentUser) return;

    let finalTeam = team;
    let finalIsLock = false;

    if (isLockAction) {
      finalIsLock = dailyLocks[selectedDate] !== matchId;
    } else {
      if (lockedPicks[matchId] === team) { finalTeam = ""; finalIsLock = false; }
      else finalIsLock = dailyLocks[selectedDate] === matchId; 
    }

    try {
      const payload = { user_id: Number(currentUser.UserID || currentUser.id), match_id: String(matchId), picked_team: finalTeam, is_lock: finalIsLock };
      const res = await fetch(`${API_URL}/api/picks`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', // Secure Cookie Handshake
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        if (finalTeam === "") {
          setLockedPicks(prev => { const next = { ...prev }; delete next[matchId]; return next; });
          if (dailyLocks[selectedDate] === matchId) setDailyLocks(prev => { const next = { ...prev }; delete next[selectedDate]; return next; });
        } else {
          setLockedPicks(prev => ({ ...prev, [matchId]: finalTeam }));
          if (finalIsLock) setDailyLocks(prev => ({ ...prev, [selectedDate]: matchId }));
          else if (dailyLocks[selectedDate] === matchId) setDailyLocks(prev => { const next = { ...prev }; delete next[selectedDate]; return next; });
        }
      }
    } catch (error) { console.error("Error saving pick:", error); }
  };

  if (isLoading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 font-medium tracking-widest uppercase text-blue-800 text-sm">Loading Data...</div>;

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 font-sans relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600"></div>
        <div className="bg-white rounded-md shadow-xl border-t-4 border-blue-900 p-8 max-w-sm w-full relative overflow-hidden">
          <div className="text-center mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-2xl font-bold text-blue-950 tracking-tight uppercase">{isLoginMode ? "Sign In" : "Create Account"}</h1>
            <p className="text-slate-500 text-sm mt-1">{isLoginMode ? "Access your tournament dashboard." : "Register to submit your picks."}</p>
          </div>
          {authError && <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-md text-center">{authError}</div>}
          <form onSubmit={isLoginMode ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Username</label>
              <input type="text" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} placeholder="Enter username" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 pr-10 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                  {showPassword ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-3 rounded-md mt-2 transition-colors shadow-md">{isLoginMode ? "Sign In" : "Register"}</button>
          </form>
          <div className="mt-6 text-center pt-4">
            <button onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(""); setShowPassword(false); }} className="text-[12px] font-bold text-slate-500 hover:text-blue-700 hover:underline transition-all">
              {isLoginMode ? "Need an account? Register here." : "Already have an account? Sign in."}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const uniqueDates = Array.from(new Set(allMatches.map(m => m.date)));
  const matchesToDisplay = allMatches.filter(m => m.date === selectedDate);
  const now = new Date();
  const todayStr = now.toLocaleDateString('en-CA'); 
  const currentHour = now.getHours();

  const currentIndex = uniqueDates.indexOf(selectedDate);
  const handlePrevDay = () => { if (currentIndex > 0) setSelectedDate(uniqueDates[currentIndex - 1]); };
  const handleNextDay = () => { if (currentIndex < uniqueDates.length - 1) setSelectedDate(uniqueDates[currentIndex + 1]); };

  const renderCompareRow = (label: string, homeStat: number, awayStat: number, reverseColors: boolean = false) => {
    let homeColor = "text-slate-900 font-medium";
    let awayColor = "text-slate-900 font-medium";
    if (homeStat > awayStat) { homeColor = reverseColors ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"; awayColor = reverseColors ? "text-emerald-600 font-bold" : "text-slate-500 font-normal"; } 
    else if (awayStat > homeStat) { homeColor = reverseColors ? "text-emerald-600 font-bold" : "text-slate-500 font-normal"; awayColor = reverseColors ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"; }
    return (
      <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0 text-sm tabular-nums">
        <span className={`w-1/3 text-center ${homeColor}`}>{homeStat}{label === 'Possession' ? '%' : ''}</span>
        <span className="w-1/3 text-center text-[10px] text-slate-500 uppercase tracking-widest">{label}</span>
        <span className={`w-1/3 text-center ${awayColor}`}>{awayStat}{label === 'Possession' ? '%' : ''}</span>
      </div>
    );
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'text-amber-600 font-black'; 
    if (index === 1) return 'text-slate-400 font-black'; 
    if (index === 2) return 'text-amber-800 font-black'; 
    return 'text-slate-400 font-semibold';
  };

  return (
    <div className="min-h-[calc(100vh-64px)] text-slate-900 bg-slate-50 font-sans relative pb-12">
      
      {/* TOURNAMENT HOST BRANDING */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- MEGA-HUB HEADER --- */}
        <div className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-end pb-4">
          <div className="flex items-stretch gap-3">
            <div className="w-1.5 rounded-full bg-gradient-to-b from-blue-800 via-red-600 to-emerald-600"></div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950 tracking-tight leading-none pt-1 uppercase">Group Stage Hub</h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5 pb-1">Daily picks, user standings, and live tournament tables.</p>
            </div>
          </div>
        </div>

        {/* --- BROADCAST TABS --- */}
        <div className="flex space-x-6 sm:space-x-8 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('picks')}
            className={`py-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'picks' ? 'text-blue-900' : 'text-slate-400 hover:text-blue-700'}`}
          >
            Daily Picks
            {activeTab === 'picks' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-sm"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('standings')}
            className={`py-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${activeTab === 'standings' ? 'text-blue-900' : 'text-slate-400 hover:text-blue-700'}`}
          >
            Live Group Standings
            {activeTab === 'standings' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-sm"></span>}
          </button>
        </div>

        {/* --- TAB CONTENT: DAILY PICKS & LEADERBOARD --- */}
        {activeTab === 'picks' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* MATCHES COLUMN */}
            <div className="lg:col-span-2 space-y-5">
              
              {matchesToDisplay.map((match) => {
                const isPastDay = match.date < todayStr;
                const isTodayLocked = match.date === todayStr && currentHour >= 11;
                const isLocked = isPastDay || isTodayLocked;
                const hasPickedThisMatch = !!lockedPicks[match.id];
                const isThisMatchTheDailyLock = dailyLocks[selectedDate] === match.id;

                return (
                  <div key={match.id} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col relative group">
                    {isThisMatchTheDailyLock && <div className="absolute top-0 left-0 w-full h-[4px] bg-red-600"></div>}
                    
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                       <div className="flex items-center gap-3">
                         <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">{match.group}</span>
                         {isThisMatchTheDailyLock && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] tracking-widest font-bold uppercase border border-red-200 shadow-sm">LOCKED</span>}
                       </div>
                       <div className="flex items-center gap-3">
                          <button onClick={() => setCompareMatch(match)} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 hover:text-blue-700 px-3 py-1 rounded shadow-sm transition-colors uppercase tracking-widest">Stats</button>
                          <span className="text-[11px] font-bold text-slate-500">{match.time}</span>
                       </div>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
                      <button onClick={() => submitPick(match.id, match.home)} disabled={isLocked} className={`flex-1 w-full py-3 px-4 rounded-md border transition-all duration-200 flex items-center justify-between text-sm ${lockedPicks[match.id] === match.home ? 'bg-blue-50 text-blue-900 border-blue-600 ring-2 ring-blue-600/30 shadow-md font-bold' : isLocked ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-70' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-blue-400 hover:shadow-sm font-semibold'}`}>
                        <span className="flex items-center gap-3"><span className="text-xl leading-none rounded-full ring-1 ring-slate-200 overflow-hidden shadow-sm">{getFlag(match.home)}</span><span>{match.home}</span></span>
                        <span className={`text-[10px] ${lockedPicks[match.id] === match.home ? "text-blue-600" : "text-slate-400"}`}>#{getRank(match.home)}</span>
                      </button>
                      
                      <button onClick={() => submitPick(match.id, "Draw")} disabled={isLocked} className={`w-full sm:w-auto px-6 py-3 rounded-md border transition-all duration-200 text-sm uppercase tracking-wider ${lockedPicks[match.id] === "Draw" ? 'bg-slate-100 text-slate-900 border-slate-500 ring-2 ring-slate-500/30 shadow-md font-bold' : isLocked ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-70' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm font-semibold'}`}>
                        Draw
                      </button>
                      
                      <button onClick={() => submitPick(match.id, match.away)} disabled={isLocked} className={`flex-1 w-full py-3 px-4 rounded-md border transition-all duration-200 flex items-center justify-between text-sm ${lockedPicks[match.id] === match.away ? 'bg-blue-50 text-blue-900 border-blue-600 ring-2 ring-blue-600/30 shadow-md font-bold' : isLocked ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-70' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-blue-400 hover:shadow-sm font-semibold'}`}>
                        <span className={`text-[10px] ${lockedPicks[match.id] === match.away ? "text-blue-600" : "text-slate-400"}`}>#{getRank(match.away)}</span>
                        <span className="flex items-center gap-3"><span>{match.away}</span><span className="text-xl leading-none rounded-full ring-1 ring-slate-200 overflow-hidden shadow-sm">{getFlag(match.away)}</span></span>
                      </button>
                    </div>

                    <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex justify-end">
                      <button onClick={() => submitPick(match.id, lockedPicks[match.id], true)} disabled={isLocked || !hasPickedThisMatch} className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded transition-all duration-200 flex items-center gap-1.5 ${isThisMatchTheDailyLock ? 'bg-red-600 text-white shadow-md hover:bg-red-700' : isLocked ? 'text-slate-300 cursor-not-allowed hidden' : !hasPickedThisMatch ? 'bg-slate-100 text-slate-400 cursor-not-allowed hidden sm:block' : 'bg-white border border-slate-300 text-slate-700 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 shadow-sm'}`}>
                        {isThisMatchTheDailyLock ? "🔒 Lock Active (Click to Remove)" : "Make Daily Lock"}
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* --- COMPACT BOTTOM DATE SELECTOR --- */}
              <div className="flex justify-end pt-2 mb-6">
                <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-md shadow-sm text-sm overflow-hidden">
                  <button onClick={handlePrevDay} disabled={currentIndex === 0} className="px-4 py-2 text-blue-700 hover:bg-blue-100 disabled:opacity-30 border-r border-blue-200 transition-colors font-bold">&lt;</button>
                  <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="appearance-none bg-transparent font-bold text-blue-900 px-5 py-2 focus:outline-none cursor-pointer text-center uppercase tracking-wider min-w-[160px]">
                    {uniqueDates.map(dateStr => {
                      const displayDate = new Date(dateStr + "T12:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                      return <option key={dateStr} value={dateStr}>{displayDate}</option>;
                    })}
                  </select>
                  <button onClick={handleNextDay} disabled={currentIndex === uniqueDates.length - 1} className="px-4 py-2 text-blue-700 hover:bg-blue-100 disabled:opacity-30 border-l border-blue-200 transition-colors font-bold">&gt;</button>
                </div>
              </div>

            </div>

            {/* SIDEBAR: SCORING RULES & LEADERBOARD */}
            <div className="space-y-5">
              
              {/* Compact Vertical Scoring Rules Card */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">
                    Scoring Rules
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 text-slate-700 font-bold w-7 h-7 rounded-full flex items-center justify-center text-[11px] border border-slate-200 shadow-sm flex-shrink-0 tabular-nums">+1</div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-slate-900 text-[13px] leading-tight mb-0.5">Standard Pick</span>
                      <span className="text-slate-500 text-[11px] font-medium leading-tight">Predict the correct winner.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="bg-red-100 text-red-700 font-bold w-7 h-7 rounded-full flex items-center justify-center text-[11px] border border-red-200 shadow-sm flex-shrink-0 tabular-nums">+2</div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-slate-900 text-[13px] leading-tight mb-0.5">Daily Lock</span>
                      <span className="text-slate-500 text-[11px] font-medium leading-tight">Double pts for most confident pick.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="bg-blue-100 text-blue-700 font-bold w-7 h-7 rounded-full flex items-center justify-center text-[11px] border border-blue-200 shadow-sm flex-shrink-0 tabular-nums">+2</div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-slate-900 text-[13px] leading-tight mb-0.5">Correct Draw</span>
                      <span className="text-slate-500 text-[11px] font-medium leading-tight">Draws award double points.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaderboard Card */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex bg-slate-50 border-b border-slate-200 px-4 py-3 items-center">
                  <div className="w-10 text-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RNK</span></div>
                  <div className="flex-1 pl-2"><span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-200 shadow-sm">Player Roster</span></div>
                  <div className="w-14 text-right pr-2"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PTS</span></div>
                </div>

                <div className="flex flex-col tabular-nums text-sm bg-white">
                  {users.length === 0 ? (
                    <div className="p-8 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">No players have joined yet</div>
                  ) : (
                    users.map((user, index) => {
                      const targetUserId = String(user.UserID || user.id);
                      const loggedInUserId = currentUser ? String(currentUser.UserID || currentUser.id) : null;
                      const isCurrentUser = loggedInUserId === targetUserId;
                      
                      return (
                        <div key={targetUserId} className={`flex items-center px-4 py-3 border-b border-slate-100 last:border-0 transition-colors ${isCurrentUser ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                          <div className={`w-10 text-center text-sm ${getRankColor(index)}`}>{index + 1}</div>
                          <div className="flex-1 pl-2 truncate">
                             <Link href={`/profile/${targetUserId}`} className={`hover:underline ${isCurrentUser ? 'font-bold text-blue-900' : 'font-medium text-slate-800'}`}>
                               {user.Username} 
                               {isCurrentUser && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1.5 no-underline">(You)</span>}
                             </Link>
                          </div>
                          <div className={`w-14 text-right pr-2 text-base ${index === 0 ? 'font-bold text-amber-600' : 'font-semibold text-slate-900'}`}>
                            {user.TotalPoints || 0}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- TAB CONTENT: LIVE GROUP STANDINGS --- */}
        {activeTab === 'standings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupStandings.map((group, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center text-[10px] uppercase tracking-wider">
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded font-bold uppercase tracking-widest border border-blue-200 shadow-sm">{group.name}</span>
                  <div className="flex">
                    <span className="w-6 sm:w-8 text-center font-bold text-slate-400" title="Played">P</span>
                    <span className="w-6 sm:w-8 text-center font-bold text-slate-400" title="Wins">W</span>
                    <span className="w-6 sm:w-8 text-center font-bold text-slate-400" title="Draws">D</span>
                    <span className="w-6 sm:w-8 text-center font-bold text-slate-400" title="Losses">L</span>
                    <span className="w-8 sm:w-10 text-center font-bold text-slate-400" title="Goal Difference">GD</span>
                    <span className="w-8 sm:w-10 text-center font-bold text-blue-900" title="Points">PTS</span>
                  </div>
                </div>
                <div className="flex flex-col tabular-nums text-sm bg-white">
                  {group.teams.map((team, tIdx) => (
                    <div key={tIdx} className="flex justify-between items-center px-4 py-2 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <span className={`w-4 text-[10px] font-bold text-right ${tIdx < 2 ? 'text-emerald-600' : 'text-transparent'}`}>x -</span>
                        <span className="text-sm flex-shrink-0 leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block bg-white shadow-sm">{FLAG_MAP[team.name] || ""}</span>
                        <span className="font-semibold text-slate-800 truncate" title={team.name}>{FIFA_CODES[team.name] || team.name}</span>
                      </div>
                      <div className="flex font-medium text-slate-600">
                        <span className="w-6 sm:w-8 text-center">{team.played}</span>
                        <span className="w-6 sm:w-8 text-center">{team.won}</span>
                        <span className="w-6 sm:w-8 text-center">{team.draw}</span>
                        <span className="w-6 sm:w-8 text-center">{team.lost}</span>
                        <span className={`w-8 sm:w-10 text-center font-semibold ${team.gd > 0 ? 'text-emerald-600' : team.gd < 0 ? 'text-rose-600' : 'text-slate-600'}`}>{team.gd > 0 ? `+${team.gd}` : team.gd}</span>
                        <span className="w-8 sm:w-10 text-center font-bold text-slate-900">{team.pts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* MATCHUP MODAL */}
      {compareMatch && (() => {
        const homeStats = getMockTeamStats(compareMatch.home);
        const awayStats = getMockTeamStats(compareMatch.away);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-slate-200 transform transition-all">
              <div className="bg-blue-950 px-5 py-4 flex justify-between items-center border-b border-blue-900 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-emerald-500"></div>
                <h3 className="text-white font-bold uppercase tracking-widest text-xs mt-1">Tale of the Tape</h3>
                <button onClick={() => setCompareMatch(null)} className="text-blue-300 hover:text-white transition-colors text-xl leading-none">&times;</button>
              </div>
              <div className="p-6 flex justify-between items-center border-b border-slate-200 bg-slate-50 shadow-inner">
                <div className="w-2/5 text-center">
                  <div className="text-5xl mb-2 rounded-full ring-2 ring-slate-200 overflow-hidden inline-block leading-none bg-white shadow-sm">{getFlag(compareMatch.home)}</div>
                  <div className="font-bold text-slate-900 text-sm">{compareMatch.home}</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">Rank #{getRank(compareMatch.home)}</div>
                </div>
                <div className="w-1/5 text-center font-black text-slate-300 text-lg italic">VS</div>
                <div className="w-2/5 text-center">
                  <div className="text-5xl mb-2 rounded-full ring-2 ring-slate-200 overflow-hidden inline-block leading-none bg-white shadow-sm">{getFlag(compareMatch.away)}</div>
                  <div className="font-bold text-slate-900 text-sm">{compareMatch.away}</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">Rank #{getRank(compareMatch.away)}</div>
                </div>
              </div>
              <div className="px-6 py-5 space-y-1">
                {renderCompareRow("Avg Goals", homeStats.goalsScored, awayStats.goalsScored)}
                {renderCompareRow("Goals Allowed", homeStats.goalsConceded, awayStats.goalsConceded, true)}
                {renderCompareRow("Possession", homeStats.possession, awayStats.possession)}
                {renderCompareRow("Shots on Target", homeStats.shotsOnTarget, awayStats.shotsOnTarget)}
                {renderCompareRow("Clean Sheets", homeStats.cleanSheets, awayStats.cleanSheets)}
              </div>
              <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
                <button onClick={() => setCompareMatch(null)} className="bg-blue-700 text-white hover:bg-blue-800 font-bold py-2 px-6 rounded shadow-sm text-xs uppercase tracking-widest transition-colors">Close Analysis</button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}