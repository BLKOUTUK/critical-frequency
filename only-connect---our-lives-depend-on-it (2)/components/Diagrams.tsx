
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Activity, Heart, BarChart2, User, Users, X, Eye, EyeOff, Zap, Server, Signal, ArrowDown, ArrowUp, Map, Star } from 'lucide-react';

// --- DATA VOID DIAGRAM (Formerly Data Gap) ---
export const DataGapDiagram: React.FC = () => {
  const [view, setView] = useState<'official' | 'reality'>('official');

  return (
    <div className="flex flex-col items-center p-8 bg-act-paper border-2 border-act-black shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

      <div className="flex justify-between w-full items-start mb-8 z-10 relative">
          <div>
            <h3 className="font-display text-3xl uppercase text-act-black leading-none">The Data Void</h3>
            <p className="font-mono text-xs text-act-pink mt-1 font-bold">/// FIG 1.0: STATISTICAL ERASURE</p>
          </div>
          <button 
             onClick={() => setView(view === 'official' ? 'reality' : 'official')}
             className="px-4 py-2 bg-act-black text-white font-mono text-xs font-bold uppercase hover:bg-act-pink hover:text-black transition-colors border-2 border-transparent"
          >
             {view === 'official' ? 'Show Reality' : 'Reset View'}
          </button>
      </div>

      <div className="relative w-full h-64 flex items-end justify-center gap-4 md:gap-12 border-b-4 border-act-black pb-0 z-10">
         
         {/* Population Bar */}
         <div className="flex flex-col items-center gap-2 w-20 md:w-24 group relative">
            <motion.div 
                className="w-full bg-act-black border-x-2 border-t-2 border-act-black relative"
                initial={{ height: "10%" }}
                animate={{ height: view === 'official' ? "20%" : "90%" }}
                transition={{ duration: 0.5, ease: "circOut" }}
            >
                {/* Hatching pattern */}
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #fff 5px, #fff 10px)'}}></div>
            </motion.div>
            <span className="font-mono text-[10px] font-bold uppercase text-act-black text-center leading-tight">Est.<br/>Population</span>
         </div>

         {/* Engaged in Care Bar */}
         <div className="flex flex-col items-center gap-2 w-20 md:w-24 relative">
             <motion.div 
                className="w-full bg-act-blue border-x-2 border-t-2 border-act-black"
                initial={{ height: "5%" }}
                animate={{ height: "15%" }}
                transition={{ duration: 0.5 }}
             />
             <span className="font-mono text-[10px] font-bold uppercase text-act-black text-center leading-tight">Receiving<br/>Support</span>
         </div>

         {/* Crisis/Detention Bar */}
         <div className="flex flex-col items-center gap-2 w-20 md:w-24 relative">
             <motion.div 
                className="w-full bg-act-pink border-x-2 border-t-2 border-act-black"
                initial={{ height: "30%" }}
                animate={{ height: view === 'official' ? "30%" : "75%" }}
                transition={{ duration: 0.5, delay: 0.1 }}
             />
             <span className="font-mono text-[10px] font-bold uppercase text-act-black text-center leading-tight">Crisis /<br/>Custody</span>
         </div>
      </div>
      
      <div className="mt-8 p-4 bg-act-yellow border-2 border-act-black font-mono text-xs md:text-sm text-act-black font-bold uppercase w-full z-10">
         {view === 'official' 
            ? "STATUS: Official datasets fragment identity. Black Queer Men are statistically invisible until they become a problem for the state." 
            : "REALITY: A massive, unsupported population exists in the void. High crisis rates are not a pathology; they are a policy failure."}
      </div>
    </div>
  );
};


// --- THE BURNING PLATFORM (Intersectional Nexus) ---
export const IntersectionalNexusDiagram: React.FC = () => {
    const [active, setActive] = useState<string[]>(['person']);

    const toggle = (layer: string) => {
        // Prevent toggling off person
        if (layer === 'person') return;
        setActive(prev => prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]);
    };

    return (
        <div className="flex flex-col items-center justify-center relative w-full h-[450px] border-4 border-act-black bg-act-black overflow-hidden shadow-[8px_8px_0px_0px_#333]">
            {/* Speaker Mesh Background */}
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle, #333 1.5px, transparent 1.5px)', backgroundSize: '4px 4px'}}></div>
            
            <div className="absolute top-4 left-4 font-mono text-xs text-white z-20">
                <p>/// SYSTEM CONFIGURATION</p>
                <p className="text-act-yellow">MODE: LIBERATION</p>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                {['housing', 'justice', 'health'].map((type) => (
                    <button 
                        key={type}
                        onClick={() => toggle(type)} 
                        className={`px-3 py-1 text-[10px] font-mono font-bold border-2 transition-all uppercase ${active.includes(type) ? 'bg-act-pink text-act-black border-act-pink' : 'bg-transparent text-white border-white hover:bg-white hover:text-black'}`}
                    >
                        {active.includes(type) ? '[-]' : '[+]'} {type}
                    </button>
                ))}
            </div>

            {/* Diagram Area */}
            <div className="relative w-full h-full flex items-center justify-center">
                
                {/* The Individual (Center - Unmoving/Complex) */}
                <div className={`absolute z-30 w-32 h-32 rounded-full border-4 border-white flex items-center justify-center text-center bg-act-black shadow-[0_0_30px_rgba(255,255,255,0.3)]`}>
                    <div className="flex flex-col relative z-10">
                        <span className="font-display text-3xl leading-none text-white">THE<br/>HUMAN</span>
                        <span className="font-mono text-[8px] uppercase mt-1 text-act-yellow">Infinite Complexity</span>
                    </div>
                    {/* Radiating Energy */}
                    <motion.div 
                        className="absolute inset-0 rounded-full border border-act-yellow"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </div>

                {/* System Layers (Bending around the Individual) */}
                
                {/* Housing */}
                <motion.div 
                    className="absolute w-64 h-64 border-2 border-act-blue rounded-full border-dashed"
                    animate={{ 
                        scale: active.includes('housing') ? 1.1 : 1.5,
                        opacity: active.includes('housing') ? 1 : 0.2,
                        rotate: 360
                    }}
                    transition={{ rotate: { duration: 20, ease: "linear", repeat: Infinity }, scale: { duration: 0.5 } }}
                >
                     <span className="text-act-blue font-mono text-xs font-bold absolute top-2 left-1/2 bg-black px-1">HOUSING</span>
                </motion.div>

                {/* Justice */}
                <motion.div 
                    className="absolute w-80 h-80 border-2 border-act-pink rounded-full border-dashed"
                    animate={{ 
                        scale: active.includes('justice') ? 1.05 : 1.4,
                        opacity: active.includes('justice') ? 1 : 0.2,
                        rotate: -360
                    }}
                    transition={{ rotate: { duration: 25, ease: "linear", repeat: Infinity }, scale: { duration: 0.5 } }}
                >
                     <span className="text-act-pink font-mono text-xs font-bold absolute bottom-4 left-1/2 bg-black px-1">JUSTICE</span>
                </motion.div>

                 {/* Health */}
                 <motion.div 
                    className="absolute w-96 h-96 border-2 border-act-yellow rounded-full border-dashed"
                    animate={{ 
                        scale: active.includes('health') ? 1 : 1.3,
                        opacity: active.includes('health') ? 1 : 0.2,
                        rotate: 180
                    }}
                    transition={{ rotate: { duration: 30, ease: "linear", repeat: Infinity }, scale: { duration: 0.5 } }}
                >
                     <span className="text-act-yellow font-mono text-xs font-bold absolute top-1/2 right-0 bg-black px-1">HEALTH</span>
                </motion.div>

                {/* BLKOUT Framework (Supporting Ring) */}
                <div className="absolute w-[450px] h-[450px] border-4 border-stone-800 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
                </div>

            </div>
            
        </div>
    )
}

// --- AFFINITY NETWORK DIAGRAM (Formerly Radical Grid) ---
export const AffinityNetworkDiagram: React.FC = () => {
  // Simulating organic, non-grid connections
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="flex flex-col items-center p-8 bg-white border-2 border-act-black shadow-[8px_8px_0px_0px_#FF007F] my-8">
      <div className="w-full mb-6 border-b-2 border-act-black pb-4">
        <h3 className="font-display text-3xl text-act-black uppercase">Cultural Constellation</h3>
        <p className="font-mono text-xs text-stone-500 mt-2">
          /// CULTURE OVER GEOGRAPHY
        </p>
      </div>
      
      <div className="relative w-full aspect-square md:h-80 bg-act-black border-2 border-act-black overflow-hidden group">
         
         {/* Milky Way Background */}
         {!imgError ? (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-[60s] ease-linear group-hover:scale-110"
                style={{backgroundImage: 'url("https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=1000&auto=format&fit=crop")'}}
            >
                {/* Hidden img to catch errors */}
                <img 
                    src="https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=1000&auto=format&fit=crop" 
                    className="hidden" 
                    onError={() => setImgError(true)} 
                    alt=""
                />
            </div>
         ) : (
             <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
                 <div className="text-stone-700 font-mono text-xs">NO SATELLITE DATA</div>
             </div>
         )}
         
         <div className="absolute inset-0 bg-black/40"></div>

         {/* Connection Lines (Organic/Curved) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen">
             {/* Constellation Lines */}
             <motion.path 
                d="M 80,80 L 160,160 L 240,80" 
                stroke="#fff" strokeWidth="1" fill="none"
                strokeOpacity="0.3"
                animate={{ strokeOpacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             />
             <motion.path 
                d="M 80,80 L 100,200 L 80,240" 
                stroke="#fff" strokeWidth="1" fill="none"
                strokeOpacity="0.2"
             />
             <motion.path 
                d="M 240,80 L 220,200 L 240,240" 
                stroke="#fff" strokeWidth="1" fill="none"
                strokeOpacity="0.2"
             />
             <motion.path 
                d="M 80,240 L 160,160 L 240,240" 
                stroke="#fff" strokeWidth="1" fill="none"
                strokeOpacity="0.3"
             />
             {/* Dynamic Signal Beam */}
             <motion.path
                d="M 160,160 L 240,80"
                stroke="#FF007F" strokeWidth="2" fill="none"
                strokeDasharray="5,5"
                animate={{ strokeDashoffset: [0, 50] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
             />
         </svg>

         {/* Nodes (Stars) */}
         {[
             {id: 1, x: '20%', y: '20%', label: "MEDIA"},
             {id: 2, x: '70%', y: '25%', label: "ARTS"},
             {id: 3, x: '25%', y: '75%', label: "SPACE"},
             {id: 4, x: '75%', y: '70%', label: "SOCIAL"},
             {id: 5, x: '50%', y: '50%', label: "HUB", central: true},
         ].map(node => (
             <motion.div
                key={node.id}
                className={`absolute rounded-full flex flex-col items-center justify-center z-10 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.8)] ${node.central ? 'w-16 h-16 bg-white border-2 border-act-pink text-black' : 'w-2 h-2 bg-white'}`}
                style={{ left: node.x, top: node.y, marginLeft: node.central ? '-2rem' : '-0.25rem', marginTop: node.central ? '-2rem' : '-0.25rem' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.id * 0.5 }}
             >
                 {node.central && (
                    <>
                       <div className="font-mono text-[8px] font-bold">CORE</div>
                       <Zap size={10} className="text-act-pink fill-current" />
                    </>
                 )}
                 {/* Star Glow */}
                 <div className={`absolute inset-0 rounded-full bg-white blur-sm ${node.central ? 'opacity-50' : 'opacity-80'}`}></div>
                 
                 {/* Label */}
                 {!node.central && (
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-mono text-[8px] font-bold tracking-widest text-shadow-sm">{node.label}</div>
                 )}
             </motion.div>
         ))}

         <div className="absolute top-4 right-4 text-right">
             <div className="text-white font-mono text-[10px] uppercase font-bold tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/20">
                 Signal Strength: 100%
             </div>
         </div>

      </div>

      <div className="mt-4 w-full flex justify-between font-mono text-xs uppercase font-bold">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-white border border-black rounded-full"></div> Cultural Node</div>
          <div className="flex items-center gap-2 text-act-pink"><div className="w-8 h-0.5 bg-act-pink border-dashed"></div> Signal Boost</div>
      </div>
    </div>
  );
};

// --- CENTRE/MARGIN BALANCE DIAGRAM (Formerly Policy Pathway) ---
export const CentreMarginDiagram: React.FC = () => {
  return (
    <div className="flex flex-col h-[500px] w-full p-8 bg-act-black border-2 border-act-black my-8 relative overflow-hidden items-center justify-between">
      {/* Background Stardust (CSS Generated to avoid HTTP/HTTPS mixed content issues) */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
        }}
      ></div>
      
      {/* TOP: THE CENTRE (Whitehall) */}
      <div className="w-full relative z-10 flex flex-col items-center">
         <div className="w-64 border-2 border-white bg-white text-act-black p-4 text-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <h3 className="font-display text-2xl uppercase leading-none">THE CENTRE</h3>
            <p className="font-mono text-[10px] uppercase tracking-wider mt-1">Whitehall / Policy / Scale</p>
         </div>
         {/* Top-Down Flow (Rigid/Structured) */}
         <div className="flex flex-col items-center mt-2 space-y-1">
            <ArrowDown className="text-white animate-bounce" size={24} />
            <div className="h-16 w-0.5 bg-gradient-to-b from-white to-transparent"></div>
         </div>
      </div>

      {/* THE CONVERGENCE (The Sweet Spot) */}
      <div className="relative z-20 w-80 h-32 border-2 border-act-pink bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm">
         <div className="absolute inset-0 border border-act-pink animate-pulse"></div>
         <div className="text-center">
             <div className="font-mono text-xs text-act-pink uppercase mb-1 font-bold">/// THE FULCRUM</div>
             <h3 className="font-display text-4xl text-white uppercase leading-none">Equity<br/>Transfer</h3>
             <p className="font-sans text-[10px] text-stone-300 mt-2">Correcting the Imbalance.</p>
         </div>
         {/* Side connectors */}
         <div className="absolute left-0 top-1/2 -translate-x-full w-8 h-0.5 bg-act-pink"></div>
         <div className="absolute right-0 top-1/2 translate-x-full w-8 h-0.5 bg-act-pink"></div>
      </div>

      {/* BOTTOM: THE MARGINS (Community) */}
      <div className="w-full relative z-10 flex flex-col items-center justify-end">
          {/* Bottom-Up Flow (Organic/Energetic) */}
         <div className="flex flex-col items-center mb-2 space-y-1">
            <div className="h-16 w-0.5 bg-gradient-to-t from-act-yellow to-transparent"></div>
            <ArrowUp className="text-act-yellow animate-bounce" size={24} />
         </div>
         <div className="w-64 border-2 border-act-yellow bg-act-yellow text-act-black p-4 text-center shadow-[0_0_15px_rgba(230,255,0,0.4)]">
            <h3 className="font-display text-2xl uppercase leading-none">THE MARGINS</h3>
            <p className="font-mono text-[10px] uppercase tracking-wider mt-1">Community / Innovation / Survival</p>
         </div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 border-x border-white w-1/2 mx-auto"></div>
    </div>
  );
};

// --- OUTCOME METRIC (Outcomes) ---
export const OutcomeMetricDiagram: React.FC = () => {
    const [scenario, setScenario] = useState<'urban' | 'rural'>('urban');
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-start p-8 bg-white border-2 border-act-black shadow-[8px_8px_0px_0px_#111] my-8">
            <div className="flex-1">
                <h3 className="font-display text-3xl mb-2 text-act-black uppercase">Breaking the Cycle</h3>
                <p className="font-mono text-xs text-act-black mb-6 leading-relaxed border-l-2 border-act-pink pl-4">
                    /// DATA PROJECTION<br/>
                    We don't just reduce costs; we stop the destruction of lives. The BLKOUT model drastically cuts crisis intervention by catching people upstream.
                </p>
                <div className="flex gap-2">
                     <button onClick={() => setScenario('urban')} className={`px-2 py-1 font-mono text-xs border-2 uppercase font-bold ${scenario === 'urban' ? 'bg-act-black text-white border-act-black' : 'bg-white text-black border-black'}`}>Urban</button>
                     <button onClick={() => setScenario('rural')} className={`px-2 py-1 font-mono text-xs border-2 uppercase font-bold ${scenario === 'rural' ? 'bg-act-black text-white border-act-black' : 'bg-white text-black border-black'}`}>Regional</button>
                </div>
            </div>
            
            <div className="w-full md:w-64 h-64 border-l-2 border-b-2 border-act-black flex items-end justify-around p-4 relative bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:10px_10px]">
                
                {/* Bar 1: Status Quo */}
                <div className="w-16 group relative">
                    <div className="absolute -top-8 w-full text-center font-display text-xl text-red-600">HIGH</div>
                    <motion.div 
                        className="w-full bg-stone-300 border-2 border-black"
                        initial={{ height: "10%" }}
                        animate={{ height: scenario === 'urban' ? '80%' : '90%' }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                    <div className="mt-2 text-center font-mono text-[10px] uppercase font-bold">Sickness<br/>Model</div>
                </div>

                {/* Bar 2: BLKOUT */}
                <div className="w-16 group relative">
                    <div className="absolute -top-8 w-full text-center font-display text-xl text-act-blue">LOW</div>
                    <motion.div 
                        className="w-full bg-act-yellow border-2 border-black relative overflow-hidden"
                        initial={{ height: "5%" }}
                        animate={{ height: scenario === 'urban' ? '20%' : '35%' }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        {/* Stripes */}
                        <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)', backgroundSize: '10px 10px'}}></div>
                    </motion.div>
                    <div className="mt-2 text-center font-mono text-[10px] uppercase font-bold bg-act-black text-white">Prevention<br/>Model</div>
                </div>

            </div>
        </div>
    )
}
