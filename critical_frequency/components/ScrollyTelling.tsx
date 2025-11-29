/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, ArrowRight, Quote } from 'lucide-react';

const essays = [
  {
    id: 1,
    title: "MAPPING THE ERASURE",
    author: "Dr. K. Andrews",
    excerpt: "We cannot fix what we cannot find. The first step was simply counting those who had been left off the map.",
    image: "https://images.unsplash.com/photo-1555791010-09852277c041?q=80&w=1000&auto=format&fit=crop", // Gritty street texture
    type: "ESSAY"
  },
  {
    id: 2,
    title: "THE EVIDENCE BANK",
    author: "BLKOUT Policy Unit",
    excerpt: "300+ pages of community reality. We listened before we spoke. This is what we heard.",
    image: null,
    type: "DATA"
  },
  {
    id: 3,
    title: "THE CULTURAL ALGORITHM",
    author: "Digital Strategy Unit",
    excerpt: "More digital. More community. More early. Using AI-informed cultural strategy to deliver true population health.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop", // Abstract music/crowd
    type: "STRATEGY"
  },
  {
    id: 4,
    title: "BEYOND RESILIENCE",
    author: "Policy Briefing",
    excerpt: "Resilience is not a policy strategy; it is a survival mechanism. We explore the conditions for thriving.",
    image: null,
    type: "MANIFESTO"
  },
  {
    id: 5,
    title: "THE ECONOMIC CASE",
    author: "S. Hall (Archive)",
    excerpt: "Care is an investment. Untreated trauma costs the state millions. Healing restores economic power.",
    image: "https://images.unsplash.com/photo-1549497557-d54e6f432321?q=80&w=1000&auto=format&fit=crop", // Shadow/Light
    type: "ESSAY"
  }
];

export const EvidenceScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative md:h-[300vh] bg-act-black text-white" aria-labelledby="evidence-bank-heading">
      
      {/* MOBILE VIEW (Vertical Stack) */}
      <div className="md:hidden p-6 pb-24">
         <h2 id="evidence-bank-heading" className="font-display text-5xl uppercase leading-none mb-2 text-act-yellow border-b border-white pb-4">
             The<br/>Evidence<br/>Bank
         </h2>
         <p className="font-mono text-sm text-stone-300 mb-8">
             300+ pages of community reality. Scroll to explore.
         </p>
         
         <div className="flex flex-col gap-8">
             {essays.map((item, index) => (
                 <div key={index} className="border border-white bg-stone-900">
                     {item.image && (
                         <div className="h-48 w-full relative overflow-hidden grayscale">
                             <img src={item.image} alt="" role="presentation" className="w-full h-full object-cover" />
                         </div>
                     )}
                     <div className="p-6">
                         <div className="flex justify-between items-start mb-4">
                             <span className="bg-white text-black px-2 py-1 font-mono text-[10px] font-bold uppercase">{item.type}</span>
                             <span className="font-mono text-xs text-stone-500">0{index + 1}</span>
                         </div>
                         <h3 className="font-display text-3xl uppercase leading-none mb-4">{item.title}</h3>
                         <p className="font-mono text-xs text-stone-300 border-l border-stone-600 pl-3 mb-4">"{item.excerpt}"</p>
                         <button className="text-act-pink font-bold uppercase text-xs flex items-center gap-2">Read <ArrowRight size={14}/></button>
                     </div>
                 </div>
             ))}
         </div>
      </div>


      {/* DESKTOP VIEW (Horizontal Scroll) */}
      <div className="hidden md:block sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Texture of Text */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden flex flex-col gap-4" aria-hidden="true">
             {Array.from({ length: 20 }).map((_, i) => (
                 <div key={i} className="whitespace-nowrap font-mono text-[10px] text-stone-500">
                     FIG {i}.0 LISTENING PHASE // REF: POLICY DOC {i * 342} // SIGNAL ACQUIRED // CLINICAL TRIAL {i} // PEER REVIEWED // 
                     FIG {i}.0 LISTENING PHASE // REF: POLICY DOC {i * 342} // SIGNAL ACQUIRED // CLINICAL TRIAL {i} // PEER REVIEWED //
                     FIG {i}.0 LISTENING PHASE // REF: POLICY DOC {i * 342} // SIGNAL ACQUIRED // CLINICAL TRIAL {i} // PEER REVIEWED //
                 </div>
             ))}
        </div>

        <motion.div style={{ x }} className="flex gap-16 pl-12 pr-48">
          
          {/* Intro Card */}
          <div className="min-w-[80vw] md:min-w-[40vw] flex flex-col justify-center">
             <div className="border-l-4 border-act-yellow pl-8">
                 <h2 className="font-display text-6xl md:text-8xl uppercase leading-none mb-6">
                     The<br/>Evidence<br/><span className="text-act-yellow">Bank</span>
                 </h2>
                 <p className="font-mono text-lg text-stone-300 max-w-md">
                     We don't claim to have all the answers, but we have asked the right questions. This is the result of deep listening.
                 </p>
             </div>
          </div>

          {/* Cards */}
          {essays.map((item, index) => (
            <div key={index} className="relative min-w-[85vw] md:min-w-[45vw] h-[70vh] border-2 border-white bg-act-black flex flex-col md:flex-row group hover:border-act-pink transition-colors focus-within:ring-4 focus-within:ring-act-pink">
                
                {/* Image Section (if applicable) */}
                {item.image ? (
                     <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden grayscale contrast-125 sepia-50 group-hover:grayscale-0 transition-all duration-500">
                         <img src={item.image} alt={`Visual texture for ${item.title}`} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-act-pink mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity"></div>
                     </div>
                ) : (
                    <div className="w-full md:w-1/2 h-1/2 md:h-full bg-stone-900 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/20">
                         <div className="font-mono text-xs uppercase opacity-50">/// RAW DATA VISUALIZATION</div>
                         <div className="space-y-2">
                             <div className="h-2 w-full bg-stone-700"></div>
                             <div className="h-2 w-3/4 bg-stone-700"></div>
                             <div className="h-2 w-5/6 bg-stone-700"></div>
                             <div className="h-2 w-full bg-stone-700"></div>
                             <div className="h-2 w-1/2 bg-stone-700"></div>
                         </div>
                         <FileText size={48} className="text-stone-700" aria-hidden="true" />
                    </div>
                )}

                {/* Text Content */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 flex flex-col justify-between relative">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-white text-black px-2 py-1 font-mono text-xs font-bold uppercase">{item.type}</span>
                            <span className="font-mono text-xs text-stone-500">0{index + 1}</span>
                        </div>
                        <h3 className="font-display text-4xl md:text-5xl uppercase leading-none mb-6 group-hover:text-act-pink transition-colors">
                            {item.title}
                        </h3>
                        <p className="font-mono text-sm md:text-base text-stone-300 leading-relaxed border-l-2 border-stone-700 pl-4">
                            "{item.excerpt}"
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="font-sans font-bold uppercase text-sm mb-1">{item.author}</div>
                        <button className="flex items-center gap-2 text-xs font-mono uppercase hover:text-act-pink underline underline-offset-4 focus:outline-none focus:text-act-pink">
                            Read Full Paper <ArrowRight size={12} />
                        </button>
                    </div>

                    {/* Decorative Watermark */}
                    <div className="absolute bottom-4 right-4 opacity-10" aria-hidden="true">
                        <Quote size={80} />
                    </div>
                </div>
            </div>
          ))}

          {/* Closing Statement */}
           <div className="min-w-[80vw] md:min-w-[40vw] flex flex-col justify-center items-center text-center">
                 <h2 className="font-display text-5xl uppercase leading-none mb-6">
                     Credibility<br/>Established
                 </h2>
                 <p className="font-mono text-sm mb-8">
                     SCROLL TO CONTINUE
                 </p>
                 <div className="w-1 h-24 bg-gradient-to-b from-white to-transparent"></div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};