import type { Route } from "./+types/home";
import TopBar from "./topbar"
import { Add } from "./add";
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setsearchQuery] = useState('');

  return (
    <>
      <div className="bg-taupe-300 min-h-screen flex flex-col">
        {/* 🟢 TOPBAR: Yeh upar apni full width par mast baitha rahega */}
        <TopBar searchQuery={searchQuery} setsearchQuery={setsearchQuery} />

        {/* 📊 MAIN CONTAINER: Isko Grid banaya 12 columns ka */}
        <div className="grid grid-cols-12 gap-4 p-4 flex-1">
          
          {/* 📑 LEFT SIDEBAR (Tumhaara Black drawn box) */}
          {/* col-span-2 ka matlab yeh 12 me se 2 columns lega */}
          <aside className="col-span-2 bg-white/40 border border-black/10 rounded-xl p-4 min-h-[80vh]">
            <h2 className="font-bold text-sm text-slate-800 mb-4">NAVIGATION</h2>
            <ul className="flex flex-col gap-2 text-sm text-slate-700">
              <li className="cursor-pointer hover:font-bold">🏠 Dashboard</li>
              <li className="cursor-pointer hover:font-bold">👥 Custom Rooms</li>
            </ul>
          </aside>

          {/* 🔴 MIDDLE CONTENT (Red lines ke beech ka main task area) */}
          {/* col-span-7 ka matlab yeh beech ke 7 bade columns lega */}
          <main className="col-span-7 bg-white/70 border border-black/10 rounded-xl p-4">
            {/* Tumhaara as-is Add task component yahan fit ho gaya */}
            <Add searchQuery={searchQuery} />
          </main>

          {/* 🎵 RIGHT SIDEBAR (Spotify aur Timer ke liye) */}
          {/* col-span-3 ka matlab bache hue 3 columns iske paas hain */}
          <aside className="col-span-3 flex flex-col gap-4">
            
            {/* Box 1: Timer Widget Placeholder */}
            <div className="bg-white/40 border border-black/10 rounded-xl p-4 flex-1 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-500 tracking-wider">TIMER</span>
              <div className="text-2xl font-mono font-bold mt-1 text-slate-800">25:00</div>
            </div>

            {/* Box 2: Spotify Plugin Placeholder */}
            <div className="bg-white/40 border border-black/10 rounded-xl p-4 flex-1 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-wider">SPOTIFY</span>
              <div className="bg-black/5 h-24 rounded-lg flex items-center justify-center text-xs text-slate-400 border border-dashed border-black/20">
                Plugin Area
              </div>
            </div>

          </aside>

        </div>
      </div>
    </>
  );
}