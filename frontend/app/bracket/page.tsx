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

const ROUND_OF_32_TEAMS = [
  "A1", "B2", "C1", "D2", "E1", "F2", "G1", "H2", 
  "I1", "J2", "K1", "L2", "A2", "C2", "E2", "G2", 
  "B1", "A3", "D1", "C3", "F1", "E3", "H1", "G3", 
  "J1", "I2", "L1", "K2", "B3", "D3", "F3", "H3", 
];

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
      teams: teams.map(teamName => ({
        name: teamName, played: 0, won: 0, draw: 0, lost: 0, gd: 0, pts: 0
      }))
    });
  }
  return groups;
};

export default function BracketPage() {
  const [picks, setPicks] = useState<{ [matchId: number]: string }>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [actualWinners, setActualWinners] = useState<{ [matchId: number]: string }>({});
  const [eliminatedTeams, setEliminatedTeams] = useState<string[]>([]);
  const [groupStandings, setGroupStandings] = useState(generateOfficialGroups());

  useEffect(() => {
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
  }, []);

  const saveBracketToVault = async () => {
    if (!currentUser) {
      alert("Please log in on the main page first!");
      return;
    }
    setIsSaving(true);
    try {
      const payload = { user_id: Number(currentUser.UserID || currentUser.id), picks: picks };
      const res = await fetch('https://world-cup-api-bzrw.onrender.com/api/bracket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) alert("Bracket successfully saved to the Vault!");
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
    if (!team) return; 
    const isDeselecting = picks[currentMatchId] === team;
    const newPicks = { ...picks };

    if (isDeselecting) newPicks[currentMatchId] = ""; 
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
    let prevMatch1, prevMatch2;
    if (matchId <= 24) { prevMatch1 = (matchId - 17) * 2 + 1; prevMatch2 = prevMatch1 + 1; }
    else if (matchId <= 28) { prevMatch1 = (matchId - 25) * 2 + 17; prevMatch2 = prevMatch1 + 1; }
    else if (matchId <= 30) { prevMatch1 = (matchId - 29) * 2 + 25; prevMatch2 = prevMatch1 + 1; }
    else { prevMatch1 = 29; prevMatch2 = 30; }

    return position === 'top' ? picks[prevMatch1] || "" : picks[prevMatch2] || "";
  };

  const MatchNode = ({ matchId }: { matchId: number }) => {
    const topTeam = getTeam(matchId, 'top');
    const bottomTeam = getTeam(matchId, 'bottom');
    const pickedTeam = picks[matchId];

    const getButtonStyle = (team: string) => {
      if (!team) return { bg: 'bg-slate-50 text-slate-700 hover:bg-slate-100', text: '' };
      const isEliminated = eliminatedTeams.includes(team);
      const isWinner = actualWinners[matchId] === team;
      const isSelected = pickedTeam === team;

      if (isSelected) {
        if (isWinner) return { bg: 'bg-yellow-400 text-yellow-900 border-yellow-500 shadow-md', text: '' }; 
        if (isEliminated) return { bg: 'bg-slate-200 text-slate-400 border-slate-300', text: 'line-through opacity-60' }; 
        return { bg: 'bg-blue-800 text-white border-blue-800 shadow-md', text: '' }; 
      } else {
        if (isEliminated) return { bg: 'bg-slate-50 text-slate-400', text: 'line-through' }; 
        return { bg: 'bg-slate-50 text-slate-700 hover:bg-slate-100', text: '' }; 
      }
    };

    const topStyles = getButtonStyle(topTeam);
    const bottomStyles = getButtonStyle(bottomTeam);

    return (
      <div className="flex flex-col justify-center my-2 w-32 sm:w-36 bg-white border-2 border-slate-200 rounded-md shadow-sm overflow-hidden text-sm">
        <button onClick={() => handlePick(matchId, topTeam)} className={`p-2 text-left font-bold transition-all border-b-2 border-slate-100 truncate ${topStyles.bg}`}>
          <span className={topStyles.text}>{topTeam || <span className="text-slate-300 italic flex-1">TBD</span>}</span>
        </button>
        <button onClick={() => handlePick(matchId, bottomTeam)} className={`p-2 text-left font-bold transition-all truncate ${bottomStyles.bg}`}>
          <span className={bottomStyles.text}>{bottomTeam || <span className="text-slate-300 italic flex-1">TBD</span>}</span>
        </button>
      </div>
    );
  };

  const MatchColumn = ({ startId, count }: { startId: number, count: number }) => (
    <div className="flex flex-col justify-around px-2 min-h-[800px]">
      {Array.from({ length: count }).map((_, i) => (
        <MatchNode key={startId + i} matchId={startId + i} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-[1800px] mx-auto">
        
        {/* --- SECTION 1: THE KNOCKOUT BRACKET --- */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Knockout Stage</h1>
          <p className="text-slate-500 font-bold mt-2 mb-4">Click a team to advance them. Correct picks turn gold, eliminated teams bust.</p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <button onClick={saveBracketToVault} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white font-black py-3 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95">
              {isSaving ? "Saving..." : "💾 Save My Bracket"}
            </button>
            
            {/* NEW: Knockout Scoring Legend */}
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-full shadow-sm text-sm font-bold text-slate-500 hidden sm:flex gap-4">
              <span className="text-slate-900">Bracket Points:</span>
              <span>Round of 16 <span className="text-emerald-500">+2</span></span>
              <span>•</span>
              <span>Quarter-Finals <span className="text-emerald-500">+4</span></span>
              <span>•</span>
              <span>Semi-Finals <span className="text-emerald-500">+8</span></span>
              <span>•</span>
              <span>Champion <span className="text-emerald-500">+16</span></span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-16 scrollbar-hide border-b-4 border-slate-200 mb-16">
          <div className="flex min-w-[1400px] mx-auto px-4 mt-8">
            
            <div className="flex flex-1 justify-between pr-4 sm:pr-8">
              <MatchColumn startId={1} count={8} />  
              <MatchColumn startId={17} count={4} /> 
              <MatchColumn startId={25} count={2} /> 
              <MatchColumn startId={29} count={1} /> 
            </div>

            <div className="relative flex flex-col items-center justify-center w-[250px] sm:w-[300px] flex-none">
              <div className="absolute top-4 sm:top-12 left-1/2 -translate-x-1/2 text-center flex flex-col items-center w-full">
                <h2 className="text-xl sm:text-2xl font-black text-yellow-500 uppercase tracking-widest mb-4">Champion</h2>
                <div className={`w-48 sm:w-64 p-4 sm:p-6 border-4 rounded-2xl shadow-xl font-black text-xl sm:text-3xl truncate flex items-center justify-center min-h-[80px] sm:min-h-[100px] transition-all
                  ${eliminatedTeams.includes(picks[31] || "") 
                    ? "bg-slate-200 border-slate-300 text-slate-400 line-through opacity-80" 
                    : actualWinners[31] === picks[31] && picks[31]
                      ? "bg-yellow-400 border-yellow-500 text-yellow-900"
                      : "bg-yellow-500 border-yellow-500 text-white"
                  }`}
                >
                  {picks[31] || "..."}
                </div>
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <h2 className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max text-lg sm:text-xl font-black text-slate-400 uppercase tracking-widest text-center">
                  Final Match
                </h2>
                <MatchNode matchId={31} />
              </div>
            </div>

            <div className="flex flex-1 justify-between flex-row-reverse pl-4 sm:pl-8">
              <MatchColumn startId={9} count={8} />   
              <MatchColumn startId={21} count={4} />  
              <MatchColumn startId={27} count={2} />  
              <MatchColumn startId={30} count={1} />  
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE GROUP STAGE STANDINGS --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Group Stage Standings</h2>
            <p className="text-slate-500 font-bold mt-2">Live tables for all 12 groups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupStandings.map((group, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                
                {/* TABLE HEADER */}
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-black text-lg text-slate-900 whitespace-nowrap pr-2">{group.name}</h3>
                  <div className="flex text-xs font-bold text-slate-400 tracking-wider">
                    <span className="w-6 sm:w-8 text-center flex-shrink-0" title="Played">P</span>
                    <span className="w-6 sm:w-8 text-center flex-shrink-0" title="Wins">W</span>
                    <span className="w-6 sm:w-8 text-center flex-shrink-0" title="Draws">D</span>
                    <span className="w-6 sm:w-8 text-center flex-shrink-0" title="Losses">L</span>
                    <span className="w-8 sm:w-10 text-center flex-shrink-0" title="Goal Difference">GD</span>
                    <span className="w-8 sm:w-10 text-center text-slate-900 flex-shrink-0" title="Points">Pts</span>
                  </div>
                </div>

                {/* TABLE ROWS */}
                <div className="flex flex-col">
                  {group.teams.map((team, tIdx) => (
                    <div key={tIdx} className="relative flex justify-between items-center p-3 sm:p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      
                      {/* GREEN QUALIFICATION BAR (Top 2 teams) */}
                      {tIdx < 2 && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-sm"></div>
                      )}

                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 pl-2 min-w-0">
                        <span className="text-slate-400 font-bold text-sm w-3 flex-shrink-0">{tIdx + 1}</span>
                        <span className="text-lg flex-shrink-0">{FLAG_MAP[team.name] || "🏳️"}</span>
                        <span className="font-bold text-slate-900 tracking-wide truncate" title={team.name}>
                          {FIFA_CODES[team.name] || team.name}
                        </span>
                      </div>

                      <div className="flex text-sm font-bold">
                        <span className="w-6 sm:w-8 text-center text-slate-500 flex-shrink-0">{team.played}</span>
                        <span className="w-6 sm:w-8 text-center text-slate-500 flex-shrink-0">{team.won}</span>
                        <span className="w-6 sm:w-8 text-center text-slate-500 flex-shrink-0">{team.draw}</span>
                        <span className="w-6 sm:w-8 text-center text-slate-500 flex-shrink-0">{team.lost}</span>
                        <span className="w-8 sm:w-10 text-center text-slate-500 flex-shrink-0">{team.gd}</span>
                        <span className="w-8 sm:w-10 text-center text-slate-900 font-black flex-shrink-0">{team.pts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* NEW: Group Stage Legend */}
          <div className="mt-10 max-w-4xl mx-auto bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center text-sm font-bold text-slate-700">
              <span className="w-3 h-3 bg-emerald-500 rounded-sm mr-3"></span> 
              Top 2 teams qualify for Knockout Stage
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 tracking-wider uppercase">
              <span title="Matches Played"><span className="text-slate-900">P:</span> Played</span>
              <span title="Wins (3 Points)"><span className="text-slate-900">W:</span> Wins</span>
              <span title="Draws (1 Point)"><span className="text-slate-900">D:</span> Draws</span>
              <span title="Losses (0 Points)"><span className="text-slate-900">L:</span> Losses</span>
              <span title="Goals For minus Goals Against"><span className="text-slate-900">GD:</span> Goal Difference</span>
              <span title="Total Points"><span className="text-slate-900">Pts:</span> Points</span>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}