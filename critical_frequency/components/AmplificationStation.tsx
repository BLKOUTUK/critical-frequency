/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Share2, Download, Copy, Speaker, Radio, Music, Disc, Mic2, BarChart2, Volume2, Settings } from 'lucide-react';

export const AmplificationStation: React.FC = () => {
  return (
    <section className="py-24 bg-act-paper border-b-2 border-act-black relative overflow-hidden">
      {/* Background Texture: Speaker Mesh */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '4px 4px'}}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
           <div className="inline-block px-4 py-1 bg-act-blue text-white font-mono text-xs font-bold uppercase mb-4 border border-black shadow-[4px_4px_0px_0px_#000]">
              /// BROADCAST UNIT
           </div>
           <h2 className="font-display text-5xl md:text-7xl uppercase leading-none text-act-black mb-4">
              Amplification<br/>Station
           </h2>
           <p className="font-mono text-sm md:text-base max-w-xl mx-auto text-act-black/80 font-bold">
              We need to boost the signal to cut through the noise. <br/>
              Use these tools to transmit the findings to your network.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PreAmpWidget />
            <DubplateCutter />
            <FrequencyVisualizer />
        </div>
      </div>
    </section>
  );
};

const PreAmpWidget: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const textToShare = "We found the map. BLKOUT UK is charting a path back to people-centred care. Check the findings: mental-health.blkoutuk.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Cable graphic */}
      <div className="absolute -top-12 left-8 w-2 h-16 bg-black z-0"></div>

      <div className="bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black h-full flex flex-col justify-between relative z-10">

        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
           <span className="font-display text-2xl uppercase">PRE-AMP</span>
           <Settings size={24} />
        </div>

        <div className="flex-1">
           <div className="flex gap-2 mb-4">
               {/* Knobs */}
               <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center transform rotate-45"><div className="w-1 h-3 bg-black mt-1"></div></div>
               <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center transform rotate-90"><div className="w-1 h-3 bg-black mt-1"></div></div>
               <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center transform rotate-180 bg-act-yellow"><div className="w-1 h-3 bg-black mt-1"></div></div>
           </div>
           <p className="font-sans font-bold text-sm mb-4">
             "I found something that resonates."
           </p>
           <div className="bg-stone-100 p-4 border border-stone-300 font-mono text-xs text-stone-600 italic">
               "{textToShare}"
           </div>
        </div>

        <div className="mt-8">
             <button
                onClick={handleCopy}
                className={`w-full py-3 font-mono text-xs font-bold uppercase border-2 border-black flex items-center justify-center gap-2 transition-all ${copied ? 'bg-act-pink text-white' : 'bg-act-black text-white hover:bg-white hover:text-black'}`}
             >
                {copied ? <span className="flex items-center gap-2">TRANSMITTED <Share2 size={14}/></span> : <span className="flex items-center gap-2">BOOST SIGNAL <Copy size={14}/></span>}
             </button>
        </div>
      </div>
    </div>
  );
};

const DubplateCutter: React.FC = () => {
    const handleDownload = () => {
        const content = `
BLKOUT UK: POLICY DUBPLATE (ONE-PAGER)
=======================================

1. REALITY DATA (VIP MIX)
-------------------------
Standard stats hide us. We use "Street Intel" to map the true needs of Black Queer men.
We are invisible to the spreadsheet but dying in the streets. We demand data justice.

2. ECONOMIC MODEL
-----------------
Prevention is cheaper than cure.
Acute Episode: £180k+
Vanguard Intervention: £5k
The math is simple. The choice is political.

3. THE VANGUARD PROTOCOL
------------------------
- Digital Affinity Networks (Safe Harbour)
- Peer-Led Triage (Trust Equity)
- Culture as Infrastructure (Signal Boost)

JOIN THE MOVEMENT: mental-health.blkoutuk.com
`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'BLKOUT_Policy_Dubplate.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="relative group">
             {/* Cable graphic */}
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2 h-16 bg-black z-0"></div>

             <div className="bg-act-black p-6 shadow-[4px_4px_0px_0px_#FF007F] border-2 border-white h-full text-white flex flex-col relative z-10">

                <div className="flex justify-between items-center border-b border-white/30 pb-4 mb-4">
                    <span className="font-display text-2xl uppercase text-white">DUBPLATE</span>
                    <Disc size={24} className="animate-spin-slow" />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center py-4">
                    <div className="w-32 h-32 rounded-full border-4 border-act-pink flex items-center justify-center bg-stone-900 relative">
                         {/* Acetate Look */}
                         <div className="absolute inset-0 rounded-full border border-stone-700 w-28 h-28 m-auto opacity-50"></div>
                         <div className="absolute inset-0 rounded-full border border-stone-700 w-24 h-24 m-auto opacity-50"></div>
                         <div className="absolute inset-0 rounded-full border border-stone-700 w-20 h-20 m-auto opacity-50"></div>
                         <div className="font-mono text-[10px] text-center leading-tight relative z-10 bg-white text-black p-2 rounded-full w-12 h-12 flex items-center justify-center transform rotate-12">
                             SIDE<br/>A
                         </div>
                    </div>
                </div>

                <div className="space-y-2 font-mono text-[10px] text-stone-400 mb-6 border-t border-white/20 pt-4">
                    <div className="flex justify-between"><span>TRACK 1:</span> <span className="text-white">REALITY DATA (VIP MIX)</span></div>
                    <div className="flex justify-between"><span>TRACK 2:</span> <span className="text-white">ECONOMIC MODEL</span></div>
                </div>

                <button
                    onClick={handleDownload}
                    className="w-full py-3 bg-white text-black font-display text-xl uppercase hover:bg-act-pink hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                    <Download size={20} />
                    CUT TO DISC
                </button>
             </div>
        </div>
    )
}

const FrequencyVisualizer: React.FC = () => {
    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group">
            {/* Cable graphic */}
            <div className="absolute -top-12 right-8 w-2 h-16 bg-black z-0"></div>

            <div className="bg-act-blue p-6 shadow-[4px_4px_0px_0px_#E6FF00] border-2 border-black h-full flex flex-col justify-between relative z-10 text-white">

                <div className="flex justify-between items-center border-b border-white/30 pb-4 mb-4">
                    <span className="font-display text-2xl uppercase">VISUALIZER</span>
                    <BarChart2 size={24} />
                </div>

                <div className="flex-1 flex items-end justify-between gap-1 h-32 mb-6 px-4 bg-black/20 border border-white/10 p-2 relative">
                    {/* VU Meter Look */}
                    <div className="absolute top-2 right-2 text-[10px] font-mono text-red-500 font-bold">PEAK</div>
                    {[40, 70, 30, 80, 50, 90, 60, 40].map((h, i) => (
                        <div key={i} className={`w-full animate-pulse ${h > 75 ? 'bg-red-500' : 'bg-act-yellow'}`} style={{height: `${h}%`, animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                </div>

                <div className="font-mono text-xs text-center mb-6 opacity-80">
                    "We refuse to be left picking up the pieces."
                </div>

                <button
                    onClick={handleScrollToContact}
                    className="w-full py-3 border-2 border-white text-white font-display text-xl uppercase hover:bg-white hover:text-act-blue transition-colors flex items-center justify-center gap-2"
                >
                    <Mic2 size={20} />
                    SHARE THE MIC
                </button>
            </div>
        </div>
    )
}
