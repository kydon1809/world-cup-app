"use client";

import React, { useState, useEffect } from 'react';

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
const getFlag = (team: string) => FLAG_MAP[team] || "🏳️";

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
  
  // NEW: State to control password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [compareMatch, setCompareMatch] = useState<any | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    Promise.all([
      fetch('https://world-cup-api-bzrw.onrender.com/api/users').then(res => res.json()),
      fetch('https://world-cup-api-bzrw.onrender.com/api/matches').then(res => res.json())
    ]).then(([userData, matchData]) => {
      setUsers(userData);
      setAllMatches(matchData);
      if (matchData.length > 0) setSelectedDate(matchData[0].date);
      setIsLoading(false);
    }).catch(err => console.error("Data fetch error:", err));
  }, []);

  useEffect(() => {
    if (currentUser && allMatches.length > 0) {
      const userId = currentUser.UserID || currentUser.id;
      
      fetch(`https://world-cup-api-bzrw.onrender.com/api/users/${userId}/picks`)
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data)) return; 

          const history: { [key: string]: string } = {};
          const locks: { [key: string]: string } = {};
          
          data.forEach((pick: any) => { 
            if (pick.PickedTeam !== "") {
              history[pick.MatchID] = pick.PickedTeam; 
            }
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
    
    if (!authUsername || !authPassword) {
      setAuthError("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch('https://world-cup-api-bzrw.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: authUsername, password: authPassword })
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('wc_user', JSON.stringify(user));
        window.location.reload();
      } else {
        setAuthError("Invalid username or password.");
      }
    } catch (error) { 
      setAuthError("Server error. Make sure your backend is running.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!authUsername || !authPassword) {
      setAuthError("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch('https://world-cup-api-bzrw.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Username: authUsername,
          Password: authPassword,
          Email: `${authUsername.replace(/\s+/g, '').toLowerCase()}@family.com` 
        })
      });
      
      if (res.ok) {
        const newUser = await res.json();
        localStorage.setItem('wc_user', JSON.stringify(newUser));
        window.location.href = '/welcome';
      } else {
        setAuthError("Username might already be taken.");
      }
    } catch (error) { 
      setAuthError("Server error. Make sure your backend is running.");
    }
  };

  const submitPick = async (matchId: any, team: string, isLockAction: boolean = false) => {
    if (!currentUser) return;

    let finalTeam = team;
    let finalIsLock = false;

    if (isLockAction) {
      if (dailyLocks[selectedDate] === matchId) {
        finalIsLock = false; 
      } else {
        finalIsLock = true;  
      }
    } else {
      if (lockedPicks[matchId] === team) {
        finalTeam = ""; 
        finalIsLock = false; 
      } else {
        finalIsLock = dailyLocks[selectedDate] === matchId; 
      }
    }

    try {
      const payload = {
        user_id: Number(currentUser.UserID || currentUser.id),
        match_id: String(matchId),
        picked_team: finalTeam,
        is_lock: finalIsLock
      };
      
      const res = await fetch('https://world-cup-api-bzrw.onrender.com/api/picks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        if (finalTeam === "") {
          setLockedPicks(prev => {
            const next = { ...prev };
            delete next[matchId];
            return next;
          });
          if (dailyLocks[selectedDate] === matchId) {
            setDailyLocks(prev => {
              const next = { ...prev };
              delete next[selectedDate];
              return next;
            });
          }
        } else {
          setLockedPicks(prev => ({ ...prev, [matchId]: finalTeam }));
          
          if (finalIsLock) {
            setDailyLocks(prev => ({ ...prev, [selectedDate]: matchId }));
          } else if (dailyLocks[selectedDate] === matchId) {
            setDailyLocks(prev => {
              const next = { ...prev };
              delete next[selectedDate];
              return next;
            });
          }
        }
      }
    } catch (error) { console.error("Error saving pick:", error); }
  };

  if (isLoading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 font-bold tracking-widest uppercase text-blue-800">Loading Stadium...</div>;

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 font-sans">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-md w-full">
          
          <div className="text-center mb-8">
            <div className="text-4xl mb-2"></div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-500 font-bold mt-2">
              {isLoginMode ? "Sign in to make your Picks." : "Join the family tournament."}
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-lg text-center">
              {authError}
            </div>
          )}

          <form onSubmit={isLoginMode ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Username</label>
              <input 
                type="text" 
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 transition-colors font-bold"
              />
            </div>
            
            {/* UPDATED: Password input with eye toggle button */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 pr-12 text-slate-900 focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 transition-colors font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none rounded-md"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-black uppercase tracking-widest py-4 rounded-lg mt-4 shadow-md transition-transform transform hover:-translate-y-1"
            >
              {isLoginMode ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6 flex flex-col items-center">
            <p className="text-sm font-bold text-slate-500">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button 
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setAuthError("");
                setShowPassword(false);
              }}
              className="mt-3 px-6 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-transparent hover:border-red-600 rounded-xl font-black uppercase tracking-widest text-sm transition-all"
            >
              {isLoginMode ? "Create one here" : "Sign in here"}
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
    let homeColor = "text-slate-900";
    let awayColor = "text-slate-900";
    
    if (homeStat > awayStat) {
      homeColor = reverseColors ? "text-red-600" : "text-emerald-600";
      awayColor = reverseColors ? "text-emerald-600" : "text-slate-400";
    } else if (awayStat > homeStat) {
      homeColor = reverseColors ? "text-emerald-600" : "text-slate-400";
      awayColor = reverseColors ? "text-red-600" : "text-emerald-600";
    }

    return (
      <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
        <span className={`w-1/3 text-center font-black text-xl ${homeColor}`}>{homeStat}{label === 'Possession' ? '%' : ''}</span>
        <span className="w-1/3 text-center text-xs font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <span className={`w-1/3 text-center font-black text-xl ${awayColor}`}>{awayStat}{label === 'Possession' ? '%' : ''}</span>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] text-slate-900 bg-slate-50 font-sans relative">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-2 shadow-sm">
              <span className="font-black text-slate-500 uppercase tracking-widest text-sm hidden sm:block whitespace-nowrap">Matchday:</span>
              <div className="flex items-center w-full sm:flex-1 gap-2">
                <button onClick={handlePrevDay} disabled={currentIndex === 0} className="bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-blue-800 font-black p-3 rounded-lg transition-colors border border-slate-200">&lt;</button>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-900 font-bold rounded-lg px-2 sm:px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-800 cursor-pointer text-center uppercase tracking-wide">
                  {uniqueDates.map(dateStr => {
                    const displayDate = new Date(dateStr + "T12:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                    return <option key={dateStr} value={dateStr}>{displayDate}</option>;
                  })}
                </select>
                <button onClick={handleNextDay} disabled={currentIndex === uniqueDates.length - 1} className="bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-blue-800 font-black p-3 rounded-lg transition-colors border border-slate-200">&gt;</button>
              </div>
            </div>

            <h2 className="text-2xl font-black mb-4 pt-2 flex items-center gap-2 uppercase tracking-wide text-slate-900">Matches</h2>
            
            {matchesToDisplay.map((match) => {
              const isPastDay = match.date < todayStr;
              const isTodayLocked = match.date === todayStr && currentHour >= 11;
              const isLocked = isPastDay || isTodayLocked;
              const hasPickedThisMatch = !!lockedPicks[match.id];
              const isThisMatchTheDailyLock = dailyLocks[selectedDate] === match.id;

              return (
                <div key={match.id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between items-center gap-4 shadow-sm">
                  
                  {/* UPDATED: Centered Layout Stack */}
                  <div className="flex flex-col w-full items-center gap-4">
                    <div className="text-center">
                      <span className="text-xs font-black uppercase text-red-600 tracking-widest block">{match.group}</span>
                      <span className="text-sm font-bold text-slate-500">{match.time}</span>
                    </div>

                    <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
                      <button 
                        onClick={() => submitPick(match.id, match.home)}
                        disabled={isLocked}
                        className={`flex-1 py-3 px-2 sm:px-4 rounded-lg font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-center gap-2 ${
                          lockedPicks[match.id] === match.home 
                            ? 'bg-white text-slate-900 border-blue-800 ring-2 ring-blue-800 shadow-md'
                            : isLocked
                              ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-800 hover:text-blue-800'
                        }`}
                      >
                        <span className="text-lg sm:text-xl">{getFlag(match.home)}</span>
                        <span className="truncate flex items-center gap-1">
                          <span className="text-slate-400 text-xs font-black">#{getRank(match.home)}</span> {match.home}
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => submitPick(match.id, "Draw")}
                        disabled={isLocked}
                        className={`py-3 px-3 sm:px-6 rounded-lg font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-center uppercase tracking-widest ${
                          lockedPicks[match.id] === "Draw" 
                            ? 'bg-white text-slate-900 border-blue-800 ring-2 ring-blue-800 shadow-md'
                            : isLocked
                              ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60' 
                              : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-800 hover:text-blue-800'
                        }`}
                      >
                        Draw
                      </button>
                      
                      <button 
                        onClick={() => submitPick(match.id, match.away)}
                        disabled={isLocked}
                        className={`flex-1 py-3 px-2 sm:px-4 rounded-lg font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-center gap-2 ${
                          lockedPicks[match.id] === match.away 
                            ? 'bg-white text-slate-900 border-blue-800 ring-2 ring-blue-800 shadow-md'
                            : isLocked
                              ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-800 hover:text-blue-800'
                        }`}
                      >
                        <span className="truncate flex items-center gap-1">
                          {match.away} <span className="text-slate-400 text-xs font-black">#{getRank(match.away)}</span>
                        </span>
                        <span className="text-lg sm:text-xl">{getFlag(match.away)}</span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex justify-center mt-2">
                    <button 
                      onClick={() => setCompareMatch(match)}
                      className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-full transition-colors flex items-center gap-2"
                    >
                      Look at the Matchup
                    </button>
                  </div>

                  <div className="w-full border-t border-slate-100 pt-4 mt-2">
                    <button
                      onClick={() => submitPick(match.id, lockedPicks[match.id], true)}
                      disabled={isLocked || !hasPickedThisMatch} 
                      className={`w-full py-2 rounded-lg font-black text-sm uppercase tracking-widest transition-all ${
                        isThisMatchTheDailyLock
                          ? 'bg-yellow-400 text-yellow-900 shadow-md border border-yellow-500 hover:bg-red-50 hover:text-red-700 hover:border-red-300'
                          : isLocked
                            ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed hidden sm:block'
                            : !hasPickedThisMatch
                              ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
                              : 'bg-slate-100 text-slate-400 hover:bg-yellow-100 hover:text-yellow-700 border border-slate-200 shadow-sm'
                      }`}
                    >
                      {isThisMatchTheDailyLock 
                        ? "Locked In" 
                        : isLocked
                          ? "Match Locked"
                          : !hasPickedThisMatch
                            ? "Pick a winner to enable Lock"
                            : "Make this my Lock of the Day"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-wide text-slate-900">Standings</h2>
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div key={user.UserID || user.id} className="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0">
                    <span className="font-black text-slate-400 w-8">#{index + 1}</span>
                    <span className={`flex-1 font-bold tracking-wide ${user.UserID === currentUser.UserID ? 'text-blue-800 text-lg' : 'text-slate-700'}`}>
                      {user.Username}
                    </span>
                    <span className="font-black text-white bg-emerald-500 px-3 py-1 rounded-md shadow-sm">{user.TotalPoints || 0}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-wide text-slate-900">
                Scoring Rules
              </h2>
              <div className="space-y-4 text-sm font-bold">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-500 text-xl"></span>
                  <div>
                    <span className="text-slate-900 block text-base">Standard Pick (+1 Pt)</span>
                    <span className="text-slate-500 text-xs font-normal mt-1 block">Predict the correct winner or draw.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-slate-100 pt-4">
                  <span className="text-yellow-400 text-xl"></span>
                  <div>
                    <span className="text-slate-900 block text-base">Lock of the Day (+2 Pts)</span>
                    <span className="text-slate-500 text-xs font-normal mt-1 block">Double points for your most confident daily pick.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-slate-100 pt-4">
                  <span className="text-blue-500 text-xl"></span>
                  <div>
                    <span className="text-slate-900 block text-base">Draws Are Tricky (+2 Pts)</span>
                    <span className="text-slate-500 text-xs font-normal mt-1 block">Because draws are harder to predict in the group stage, correct draw picks award double points!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {compareMatch && (() => {
        const homeStats = getMockTeamStats(compareMatch.home);
        const awayStats = getMockTeamStats(compareMatch.away);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
              
              <div className="bg-slate-900 p-4 flex justify-between items-center">
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                  Look at the Matchup
                </h3>
                <button 
                  onClick={() => setCompareMatch(null)}
                  className="text-slate-400 hover:text-white font-bold text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 bg-slate-50 flex justify-between items-center border-b border-slate-200">
                <div className="w-2/5 text-center">
                  <div className="text-5xl mb-2">{getFlag(compareMatch.home)}</div>
                  <div className="font-black text-lg leading-tight">{compareMatch.home}</div>
                </div>
                <div className="w-1/5 text-center font-black text-slate-300 italic text-xl">VS</div>
                <div className="w-2/5 text-center">
                  <div className="text-5xl mb-2">{getFlag(compareMatch.away)}</div>
                  <div className="font-black text-lg leading-tight">{compareMatch.away}</div>
                </div>
              </div>

              <div className="p-6 space-y-2">
                {renderCompareRow("Avg Goals Scored", homeStats.goalsScored, awayStats.goalsScored)}
                {renderCompareRow("Goals Conceded", homeStats.goalsConceded, awayStats.goalsConceded, true)}
                {renderCompareRow("Possession", homeStats.possession, awayStats.possession)}
                {renderCompareRow("Shots on Target", homeStats.shotsOnTarget, awayStats.shotsOnTarget)}
                {renderCompareRow("Clean Sheets", homeStats.cleanSheets, awayStats.cleanSheets)}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                <button 
                  onClick={() => setCompareMatch(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg transition-colors text-sm uppercase tracking-wide"
                >
                  Close Analysis
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}