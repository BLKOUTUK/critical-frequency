/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { Mic, Radio, Settings, Volume2, Clock, Play, Pause } from 'lucide-react';

export const TheRelay: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-24 bg-act-black text-white relative overflow-hidden border-b-2 border-white" aria-labelledby="relay-title">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

       {/* Hidden audio element */}
       <audio ref={audioRef} src="/CF Blueprint.mp3" preload="metadata" onEnded={() => setIsPlaying(false)} />

       <div className="container mx-auto px-6 relative z-10">

          <div className="flex flex-col md:flex-row gap-12 items-start">

             {/* Left Column: Text */}
             <div className="md:w-1/2 sticky top-24">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black font-mono text-sm font-bold uppercase mb-6 transform -rotate-2">
                     <Radio size={14} aria-hidden="true"/> LIVE TRANSMISSION
                 </div>
                 <h2 id="relay-title" className="font-display text-6xl md:text-8xl mb-6 leading-none text-white">
                     THE<br/><span className="text-act-pink">RELAY.</span>
                 </h2>
                 <p className="text-xl font-mono text-stone-300 mb-8 border-l-4 border-act-yellow pl-6 leading-relaxed">
                     This is what co-creation sounds like. The policy audience and the community building the change together.
                 </p>
                 <p className="text-lg font-sans text-white mb-4">
                     It takes a village — here's our public square.
                 </p>
                 <p className="text-lg font-sans text-stone-300 mb-8">
                     Who gets passed the mic? Help us decide.
                 </p>
                 <button className="px-8 py-4 bg-transparent border-2 border-act-pink text-act-pink hover:bg-act-pink hover:text-black transition-all font-display text-2xl uppercase flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-white">
                     <Mic size={24} aria-hidden="true" /> Help Us Decide
                 </button>

                 <div className="mt-12 flex gap-4 opacity-50" aria-hidden="true">
                    <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center"><Volume2 size={20}/></div>
                    <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center"><Settings size={20}/></div>
                 </div>
             </div>

             {/* Right Column: Speaker Stack Layout */}
             <div className="md:w-1/2 flex flex-col gap-4" role="list">

                 {/* Episode 1: CF Blueprint — LIVE with audio player */}
                 <div className="w-full bg-stone-900 border-2 border-act-pink p-2 relative group" role="listitem">
                     <div className="h-64 relative overflow-hidden">
                         <img src="/relay-1.png" alt="The Relay — Episode 1: CF Blueprint" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                             <button
                               onClick={togglePlay}
                               className="w-20 h-20 rounded-full bg-act-pink text-black flex items-center justify-center hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-white"
                               aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
                             >
                                 {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                             </button>
                         </div>
                     </div>
                     <div className="bg-black p-4 mt-2 border-t border-act-pink">
                         <div className="flex justify-between items-center mb-2">
                             <div>
                                 <div className="font-mono text-act-pink text-xs uppercase font-bold">Episode 01 — Now Playing</div>
                                 <div className="font-display text-2xl uppercase leading-none">CF Blueprint</div>
                             </div>
                             <div className="font-mono text-sm text-stone-500" aria-label="Duration">
                                 {isPlaying ? <span className="text-act-pink animate-pulse">Playing</span> : '2:00'}
                             </div>
                         </div>
                         <p className="font-sans text-sm text-stone-400 leading-relaxed">
                             An introduction to Critical Frequency — the proposal, the methodology, and why designing for Black queer men changes the whole system.
                         </p>
                     </div>
                 </div>

                 {/* Episode 2: Coming Soon */}
                 <div className="w-full bg-stone-900 border-2 border-stone-700 p-2 relative group hover:border-act-blue transition-colors ml-4 md:ml-12" role="listitem">
                     <div className="h-48 relative overflow-hidden grayscale contrast-125 sepia-50 group-hover:grayscale-0 transition-all duration-500">
                         <img src="/relay-2.png" alt="The Relay podcast episode 2 - Who Cares?" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="flex items-center gap-2 px-4 py-2 bg-act-pink text-black font-mono text-sm font-bold uppercase border-2 border-black">
                                 <Clock size={14} aria-hidden="true" /> Coming Soon
                             </span>
                         </div>
                     </div>
                     <div className="bg-black p-4 mt-2 flex justify-between items-center border-t border-stone-800">
                         <div>
                             <div className="font-mono text-act-blue text-xs uppercase">EPISODE 02</div>
                             <div className="font-display text-2xl uppercase leading-none">Who Cares?</div>
                         </div>
                         <div className="font-mono text-sm text-stone-500" aria-label="Coming soon">TBC</div>
                     </div>
                 </div>

                 {/* Episode 3: Coming Soon */}
                 <div className="w-full bg-stone-900 border-2 border-stone-700 p-2 relative group hover:border-act-yellow transition-colors -ml-2 md:-ml-8" role="listitem">
                     <div className="h-48 relative overflow-hidden grayscale contrast-125 sepia-50 group-hover:grayscale-0 transition-all duration-500">
                         <img src="/relay-3.png" alt="The Relay podcast episode 3 - New Coalitions" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="flex items-center gap-2 px-4 py-2 bg-act-pink text-black font-mono text-sm font-bold uppercase border-2 border-black">
                                 <Clock size={14} aria-hidden="true" /> Coming Soon
                             </span>
                         </div>
                     </div>
                     <div className="bg-black p-4 mt-2 flex justify-between items-center border-t border-stone-800">
                         <div>
                             <div className="font-mono text-act-yellow text-xs uppercase">EPISODE 03</div>
                             <div className="font-display text-2xl uppercase leading-none">New Coalitions</div>
                         </div>
                         <div className="font-mono text-sm text-stone-500" aria-label="Coming soon">TBC</div>
                     </div>
                 </div>

             </div>

          </div>
       </div>
    </section>
  );
};
