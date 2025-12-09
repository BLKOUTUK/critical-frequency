/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Play, Mic, Radio, Headphones, Settings, Volume2 } from 'lucide-react';

export const TheRelay: React.FC = () => {
  return (
    <section className="py-24 bg-act-black text-white relative overflow-hidden border-b-2 border-white" aria-labelledby="relay-title">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

       <div className="container mx-auto px-6 relative z-10">
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
             
             {/* Left Column: Text */}
             <div className="md:w-1/2 sticky top-24">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black font-mono text-xs font-bold uppercase mb-6 transform -rotate-2">
                     <Radio size={14} aria-hidden="true"/> LIVE TRANSMISSION
                 </div>
                 <h2 id="relay-title" className="font-display text-6xl md:text-8xl mb-6 leading-none text-white">
                     THE<br/><span className="text-act-pink">RELAY.</span>
                 </h2>
                 <p className="text-xl font-mono text-stone-300 mb-8 border-l-4 border-act-yellow pl-6 leading-relaxed">
                     Cutting through the hierarchy. New coalitions. Difficult conversations. No sacred cows.
                 </p>
                 <p className="text-lg font-sans text-white mb-4">
                     It takes a village - here's our public square.
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
                 
                 {/* Top Speaker Box */}
                 <div className="w-full bg-stone-900 border-2 border-stone-700 p-2 relative group cursor-pointer hover:border-act-pink transition-colors" role="listitem">
                     {/* "Bass Weight" Thick Border top */}
                     <div className="h-64 relative overflow-hidden grayscale contrast-125 sepia-50 group-hover:grayscale-0 transition-all duration-500">
                         {/* Image: The Relay Episode 1 */}
                         <img src="/relay-1.png" alt="The Relay podcast episode 1 - The Systemic Drift" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Play size={48} className="text-white fill-current" aria-hidden="true" />
                         </div>
                     </div>
                     <div className="bg-black p-4 mt-2 flex justify-between items-center border-t border-stone-800">
                         <div>
                             <div className="font-mono text-act-yellow text-xs uppercase">EPISODE 01</div>
                             <div className="font-display text-2xl uppercase leading-none">The Systemic Drift</div>
                         </div>
                         <div className="font-mono text-xs text-stone-500" aria-label="Duration 45 minutes">45:00</div>
                     </div>
                 </div>

                 {/* Middle Speaker Box */}
                 <div className="w-full bg-stone-900 border-2 border-stone-700 p-2 relative group cursor-pointer hover:border-act-blue transition-colors ml-4 md:ml-12" role="listitem">
                     <div className="h-48 relative overflow-hidden grayscale contrast-125 sepia-50 group-hover:grayscale-0 transition-all duration-500">
                         {/* Image: The Relay Episode 2 */}
                         <img src="/relay-2.png" alt="The Relay podcast episode 2 - Who Cares?" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Play size={48} className="text-white fill-current" aria-hidden="true" />
                         </div>
                     </div>
                     <div className="bg-black p-4 mt-2 flex justify-between items-center border-t border-stone-800">
                         <div>
                             <div className="font-mono text-act-blue text-xs uppercase">EPISODE 02</div>
                             <div className="font-display text-2xl uppercase leading-none">Who Cares?</div>
                         </div>
                         <div className="font-mono text-xs text-stone-500" aria-label="Duration 32 minutes">32:15</div>
                     </div>
                 </div>

                 {/* Bottom Speaker Box */}
                 <div className="w-full bg-stone-900 border-2 border-stone-700 p-2 relative group cursor-pointer hover:border-act-yellow transition-colors -ml-2 md:-ml-8" role="listitem">
                     <div className="h-48 relative overflow-hidden grayscale contrast-125 sepia-50 group-hover:grayscale-0 transition-all duration-500">
                         {/* Image: The Relay Episode 3 */}
                         <img src="/relay-3.png" alt="The Relay podcast episode 3 - New Coalitions" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Play size={48} className="text-white fill-current" aria-hidden="true" />
                         </div>
                     </div>
                     <div className="bg-black p-4 mt-2 flex justify-between items-center border-t border-stone-800">
                         <div>
                             <div className="font-mono text-act-yellow text-xs uppercase">EPISODE 03</div>
                             <div className="font-display text-2xl uppercase leading-none">New Coalitions</div>
                         </div>
                         <div className="font-mono text-xs text-stone-500" aria-label="Duration 51 minutes">51:00</div>
                     </div>
                 </div>

             </div>

          </div>
       </div>
    </section>
  );
};