"use client";

import React, { useState, useEffect, useRef, use } from 'react';

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

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  
  const [profileUser, setProfileUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null); 
  const [championPick, setChampionPick] = useState<string>("TBD");
  const [recentPicks, setRecentPicks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- AVATAR STATE & REF ---
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1. Load the active logged-in user
    const savedUser = localStorage.getItem('wc_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    // 2. Load the profile's saved avatar from local storage
    const savedAvatar = localStorage.getItem(`wc_avatar_${userId}`);
    if (savedAvatar) setAvatarUrl(savedAvatar);

    const fetchProfileData = async () => {
      try {
        // Fetch User Info
        const usersRes = await fetch('https://world-cup-api-bzrw.onrender.com/api/users');
        const users = await usersRes.json();
        const foundUser = users.find((u: any) => String(u.UserID || u.id) === userId);
        setProfileUser(foundUser);

        if (foundUser) {
          // Fetch Bracket
          try {
            const bracketRes = await fetch(`https://world-cup-api-bzrw.onrender.com/api/users/${userId}/bracket`);
            const bracketData = await bracketRes.json();
            if (bracketData.picks && bracketData.picks["31"]) {
              setChampionPick(bracketData.picks["31"]);
            }
          } catch (e) { console.log("No bracket found"); }

          // Fetch Daily Picks
          try {
            const picksRes = await fetch(`https://world-cup-api-bzrw.onrender.com/api/users/${userId}/picks`);
            const picksData = await picksRes.json();
            if (Array.isArray(picksData)) {
              setRecentPicks(picksData);
            }
          } catch (e) { console.log("No picks found"); }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // --- HANDLE IMAGE UPLOAD ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem(`wc_avatar_${userId}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 font-bold tracking-widest uppercase text-slate-400 text-sm">Loading Scouting Report...</div>;
  if (!profileUser) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 font-bold tracking-widest uppercase text-slate-400 text-sm">Player Not Found</div>;

  const validPicks = recentPicks.filter(pick => pick.PickedTeam && pick.PickedTeam !== "");
  const totalPicksMade = validPicks.length;
  const accuracyRate = "TBD"; 

  const isCurrentUser = currentUser && String(currentUser.UserID || currentUser.id) === userId;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 font-sans relative pb-12">
      
      {/* TOURNAMENT HOST BRANDING */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-red-600 to-emerald-600 z-10"></div>

      {/* PLAYER HERO BANNER */}
      <div className="bg-[#2b2c2d] text-white pt-10 pb-8 px-4 border-b border-slate-800 shadow-sm relative">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          
          {/* --- INTERACTIVE AVATAR --- */}
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-950 border-2 border-slate-700 rounded-full shadow-lg flex items-center justify-center overflow-hidden relative">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                /* --- NEW: DEFAULT SILHOUETTE --- */
                <svg className="w-12 h-12 sm:w-14 sm:h-14 text-blue-400 opacity-80 mt-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}

              {/* Hover Overlay (Only shows if it's their own profile) */}
              {isCurrentUser && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white">Edit Photo</span>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            {isCurrentUser && (
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{profileUser.Username}</h1>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                Pro
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
              Total Points: <span className="text-white font-bold">{profileUser.TotalPoints || 0}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI DASHBOARD */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Group Stage Picks</span>
            <span className="text-3xl font-semibold text-slate-900 tabular-nums">{totalPicksMade}</span>
          </div>
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Accuracy Rate</span>
            <span className="text-3xl font-semibold text-blue-600 tabular-nums">{accuracyRate}</span>
          </div>
          
          {/* CHAMPION PICK CARD */}
          <div className={`p-5 rounded-lg border shadow-sm flex flex-col justify-between transition-colors ${
            championPick !== "TBD" ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${championPick !== "TBD" ? 'text-amber-700' : 'text-slate-400'}`}>
              Predicted Champion
            </span>
            {championPick !== "TBD" ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none rounded-full ring-1 ring-amber-300 overflow-hidden bg-white shadow-sm inline-block">
                  {FLAG_MAP[championPick] || ""}
                </span>
                <span className="text-xl font-bold text-amber-900">{championPick}</span>
              </div>
            ) : (
              <span className="text-xl font-semibold text-slate-400 italic">No Pick Yet</span>
            )}
          </div>
        </div>

        {/* RECENT PICKS TABLE */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-4 rounded-full bg-blue-600"></div>
              <h2 className="text-[13px] font-bold text-slate-700 uppercase tracking-widest">Scouting Report: Group Stage Picks</h2>
            </div>
          </div>
          
          {validPicks.length === 0 ? (
            <div className="p-8 text-center text-sm font-medium text-slate-400">This player hasn't submitted any daily picks yet.</div>
          ) : (
            <div className="flex flex-col text-sm bg-white">
              {/* Ghost Header */}
              <div className="flex bg-slate-50 border-b border-slate-100 px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="w-24">Match ID</div>
                <div className="flex-1">Predicted Winner</div>
                <div className="w-24 text-right">Lock Status</div>
              </div>
              
              {/* Rows mapped to validPicks instead of recentPicks */}
              {validPicks.map((pick, idx) => (
                <div key={idx} className="flex items-center px-5 py-3.5 border-b border-slate-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="w-24 font-bold text-slate-400 tabular-nums">#{pick.MatchID}</div>
                  <div className="flex-1 flex items-center gap-2.5">
                    {pick.PickedTeam && pick.PickedTeam !== "Draw" && FLAG_MAP[pick.PickedTeam] && (
                      <span className="text-lg leading-none rounded-full ring-1 ring-slate-200 overflow-hidden inline-block shadow-sm">
                        {FLAG_MAP[pick.PickedTeam]}
                      </span>
                    )}
                    <span className="font-semibold text-slate-800">{pick.PickedTeam}</span>
                  </div>
                  <div className="w-24 text-right">
                    {pick.IsLock ? (
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-red-200">Locked</span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}