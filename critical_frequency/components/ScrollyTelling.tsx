/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, Quote, X, BookOpen, Library } from 'lucide-react';

// --- DATA STRUCTURES ---

interface Paper {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  type: "ESSAY" | "DATA" | "STRATEGY" | "BIBLIOGRAPHY";
  quote: string;
  image: string | null;
  fullText: React.ReactNode;
}

const papers: Paper[] = [
  {
    id: 1,
    title: "THE DATA VOID",
    subtitle: "MAPPING THE ERASURE",
    author: "BLKOUT POLICY UNIT",
    type: "ESSAY",
    quote: "We cannot treat a population that the spreadsheet refuses to see.",
    image: null,
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <h3 className="font-display text-3xl md:text-4xl mb-4 uppercase">1. The Ghost Cohort</h3>
        <p>
          The UK mental health system operates on a fundamental paradox: it claims to be evidence-based, yet it systematically erases the evidence of Black Queer men's existence. Standard demographic monitoring forces a binary choice: Black OR LGBTQ+.
        </p>
        <p>
          This creates a "Ghost Cohort"—a population that is statistically invisible in primary care but hyper-visible in acute detention statistics. We are not seen when we ask for help, only when we are detained.
        </p>
        <hr className="border-stone-300 my-8"/>
        <h3 className="font-display text-3xl md:text-4xl mb-4 uppercase">2. The Cost of Invisibility</h3>
        <p>
          Invisibility is expensive. Because this cohort is not tracked in early intervention data, no specific commissioning takes place. The result is that 100% of the state's interaction with this group happens at the most expensive point of the pathway: crisis, sectioning, and custodial care.
        </p>
        <div className="bg-stone-100 p-6 border-l-4 border-act-pink my-6 font-bold">
           "The absence of evidence is treated as evidence of absence. It is not. It is evidence of structural neglect."
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "THE VANGUARD PROTOCOL",
    subtitle: "LIBERATORY INFRASTRUCTURE",
    author: "DIGITAL STRATEGY UNIT",
    type: "STRATEGY",
    quote: "We stopped waiting for an ambulance that was never coming. We built our own network.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <h3 className="font-display text-3xl md:text-4xl mb-4 uppercase">Beyond Geography</h3>
        <p>
          Traditional community health relies on the "postcode" model. For Black Queer men, the postcode is often a site of danger, surveillance, or isolation. A service based in a specific borough often fails to reach those who need it most because of the fear of local exposure.
        </p>
        <hr className="border-stone-300 my-8"/>
        <h3 className="font-display text-3xl md:text-4xl mb-4 uppercase">Digital Affinity</h3>
        <p>
          The Vanguard Protocol proposes a shift to "Affinity Infrastructure." We use digital tools to connect individuals based on shared identity and lived experience, not just proximity. This creates a "safe harbour" that exists everywhere and nowhere simultaneously.
        </p>
        <ul className="list-disc pl-5 space-y-4 my-6 font-bold">
            <li>End-to-end encrypted peer support</li>
            <li>Always-on digital triage</li>
            <li>Culturally competent algorithmic matching</li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "THE INVESTMENT CASE",
    subtitle: "ECONOMICS OF CURE",
    author: "BLKOUT FINANCE",
    type: "DATA",
    quote: "Trauma is the most expensive item on the state's ledger.",
    image: null,
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <h3 className="font-display text-3xl md:text-4xl mb-4 uppercase">ROI of Prevention</h3>
        <p>
          The cost of a single acute psychiatric admission (approx £500/night) outstrips the cost of a full year of community-based peer support. By shifting resources upstream, we do not just save lives; we save millions.
        </p>
        <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-act-black text-white p-4 text-center">
                <div className="text-3xl font-display text-red-500">£180k+</div>
                <div className="text-[10px] uppercase">Acute Episode Cost</div>
            </div>
            <div className="bg-act-yellow text-black p-4 text-center">
                <div className="text-3xl font-display text-black">£5k</div>
                <div className="text-[10px] uppercase">Vanguard Intervention</div>
            </div>
        </div>
        <h3 className="font-display text-3xl md:text-4xl mb-4 uppercase">Trust Equity</h3>
        <p>
          The NHS is currently running a massive deficit of trust with Black communities. Every engagement that ends in coercion bankrupts this trust further. BLKOUT UK acts as a "Trust Intermediary," rebuilding the social contract necessary for effective public health.
        </p>
      </div>
    )
  },
  {
    id: 4,
    title: "READING IS FUNDAMENTAL",
    subtitle: "THE ARCHIVE",
    author: "LEGACY DEPT.",
    type: "BIBLIOGRAPHY",
    quote: "Theory is a liberatory practice. We stand on the shoulders of giants.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <p className="mb-6 font-bold text-lg">Essential texts that inform the Vanguard Protocol:</p>
        <ul className="space-y-6 uppercase tracking-wide">
            <li className="border-b border-stone-300 pb-2">
                <span className="font-bold text-act-pink">Stuart Hall</span><br/>Policing the Crisis
            </li>
            <li className="border-b border-stone-300 pb-2">
                <span className="font-bold text-act-pink">Audre Lorde</span><br/>The Cancer Journals
            </li>
            <li className="border-b border-stone-300 pb-2">
                <span className="font-bold text-act-pink">Paul Gilroy</span><br/>There Ain't No Black in the Union Jack
            </li>
            <li className="border-b border-stone-300 pb-2">
                <span className="font-bold text-act-pink">Bell Hooks</span><br/>All About Love
            </li>
             <li className="border-b border-stone-300 pb-2">
                <span className="font-bold text-act-pink">Frantz Fanon</span><br/>Black Skin, White Masks
            </li>
             <li className="border-b border-stone-300 pb-2">
                <span className="font-bold text-act-pink">Marlon Riggs</span><br/>Tongues Untied (Film)
            </li>
        </ul>
      </div>
    )
  }
];

// --- MAIN COMPONENT ---

export const EvidenceScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);

  return (
    <>
    <section ref={targetRef} className="relative md:h-[300vh] bg-act-black text-white" aria-labelledby="evidence-bank-heading">
      
      {/* MOBILE VIEW (Vertical Stack) */}
      <div className="md:hidden p-6 pb-24">
         <div className="border-b-4 border-white mb-8 pb-4">
             <div className="inline-block px-2 py-1 bg-white text-black font-mono text-[10px] font-bold uppercase mb-2">
                 /// THE LIBRARY IS OPEN
             </div>
             <h2 id="evidence-bank-heading" className="font-display text-6xl uppercase leading-none text-act-yellow">
                 EVIDENCE<br/>BANK
             </h2>
         </div>
         
         <div className="flex flex-col gap-8">
             {papers.map((item, index) => (
                 <div 
                    key={index} 
                    onClick={() => setSelectedPaper(item)}
                    className="border-2 border-white bg-stone-900 active:scale-95 transition-transform"
                 >
                     {item.image && (
                         <div className="h-48 w-full relative overflow-hidden grayscale">
                             <img src={item.image} alt="" role="presentation" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-act-pink mix-blend-multiply opacity-40"></div>
                         </div>
                     )}
                     <div className="p-6 relative">
                         <Quote size={40} className="text-stone-700 absolute top-4 right-4" />
                         <div className="flex justify-between items-start mb-6">
                             <span className="bg-act-yellow text-black px-2 py-1 font-mono text-[10px] font-bold uppercase">{item.type}</span>
                         </div>
                         <p className="font-display text-2xl uppercase leading-tight mb-6 text-white">
                             "{item.quote}"
                         </p>
                         <div className="border-t border-stone-700 pt-4">
                            <h3 className="font-mono text-xs font-bold text-act-pink uppercase mb-1">{item.title}</h3>
                            <button className="text-stone-400 font-mono text-[10px] uppercase flex items-center gap-2">Read Full Paper <ArrowRight size={10}/></button>
                         </div>
                     </div>
                 </div>
             ))}
         </div>
      </div>


      {/* DESKTOP VIEW (Horizontal Scroll) */}
      <div className="hidden md:block sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

        <motion.div style={{ x }} className="flex gap-16 pl-24 pr-48">
          
          {/* Intro Card */}
          <div className="min-w-[600px] flex flex-col justify-center">
             <div className="border-l-8 border-act-yellow pl-12 py-8">
                 <div className="font-mono text-xs uppercase font-bold text-act-yellow mb-4 flex items-center gap-2">
                     <Library size={16}/> ARCHIVE ACCESS
                 </div>
                 <h2 className="font-display text-9xl uppercase leading-[0.8] mb-8">
                     THE<br/>EVIDENCE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-act-yellow to-white">BANK</span>
                 </h2>
                 <p className="font-mono text-lg text-stone-300 max-w-md border-t border-white/20 pt-6">
                     We don't claim to have all the answers, but we have asked the right questions. 300+ pages of community reality.
                 </p>
             </div>
          </div>

          {/* Cards */}
          {papers.map((item, index) => (
            <button 
                key={index} 
                onClick={() => setSelectedPaper(item)}
                className="relative min-w-[500px] h-[600px] border-4 border-white bg-act-black flex flex-col text-left group hover:border-act-pink transition-all duration-300 hover:-translate-y-4 focus:outline-none focus:ring-4 focus:ring-act-pink"
            >
                {/* Decorative Elements */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border-2 border-black z-20 group-hover:bg-act-pink transition-colors"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border-2 border-black z-20 group-hover:bg-act-pink transition-colors"></div>

                {/* Top Section */}
                <div className="flex-1 p-10 relative overflow-hidden flex flex-col justify-between">
                     {item.image && (
                         <div className="absolute inset-0 z-0 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60">
                             <img src={item.image} alt="" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-act-blue mix-blend-multiply opacity-50"></div>
                         </div>
                     )}
                     
                     <div className="relative z-10 flex justify-between items-start">
                         <span className="bg-white text-black px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_#000]">{item.type}</span>
                         <span className="font-mono text-4xl font-bold text-white/20">0{item.id}</span>
                     </div>

                     <div className="relative z-10">
                         <Quote size={60} className="text-act-yellow mb-6 opacity-80" />
                         <p className="font-display text-4xl uppercase leading-none text-white drop-shadow-lg">
                             "{item.quote}"
                         </p>
                     </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-white text-black p-8 border-t-4 border-black group-hover:bg-act-pink group-hover:text-white transition-colors h-48 flex flex-col justify-between">
                     <div>
                        <div className="font-mono text-xs uppercase font-bold opacity-60 mb-2">{item.subtitle}</div>
                        <h3 className="font-display text-4xl uppercase leading-none">{item.title}</h3>
                     </div>
                     <div className="flex justify-between items-end border-t-2 border-black/10 pt-4 group-hover:border-white/20">
                         <span className="font-mono text-xs font-bold uppercase">{item.author}</span>
                         <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase">Open Dossier <BookOpen size={16}/></span>
                     </div>
                </div>
            </button>
          ))}

          {/* Spacer for scroll */}
          <div className="min-w-[400px]"></div>

        </motion.div>
      </div>
    </section>

    {/* READER MODAL */}
    <AnimatePresence>
        {selectedPaper && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                onClick={() => setSelectedPaper(null)}
            >
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="bg-act-paper w-full max-w-4xl max-h-full h-[90vh] md:h-auto md:aspect-[3/4] lg:aspect-video overflow-hidden border-4 border-black shadow-[16px_16px_0px_0px_#FF007F] flex flex-col md:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header / Sidebar */}
                    <div className="bg-act-black text-white p-6 md:w-1/3 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black relative">
                         {/* Noise Texture */}
                         <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

                         <div>
                             <div className="font-mono text-xs text-act-yellow font-bold uppercase mb-2">/// CLASSIFIED DOCUMENT</div>
                             <h2 className="font-display text-5xl md:text-6xl uppercase leading-none mb-6 text-white">{selectedPaper.title}</h2>
                             <div className="w-12 h-1 bg-act-pink mb-6"></div>
                             <p className="font-mono text-xs md:text-sm text-stone-300 uppercase leading-relaxed">
                                 AUTHOR: {selectedPaper.author}<br/>
                                 REF: {selectedPaper.type}-00{selectedPaper.id}<br/>
                                 STATUS: PUBLIC RELEASE
                             </p>
                         </div>

                         <div className="hidden md:block">
                             <Quote size={40} className="text-stone-700 mb-4" />
                             <p className="font-display text-xl uppercase leading-tight text-stone-400">
                                 "{selectedPaper.quote}"
                             </p>
                         </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white text-black p-8 md:p-12 overflow-y-auto relative">
                        <button 
                            onClick={() => setSelectedPaper(null)}
                            className="absolute top-4 right-4 p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black focus:outline-none focus:ring-2 focus:ring-act-pink"
                            aria-label="Close Reader"
                        >
                            <X size={24} />
                        </button>

                        <div className="max-w-prose mx-auto pt-8">
                             {selectedPaper.fullText}
                        </div>

                        <div className="mt-12 pt-8 border-t-2 border-black flex justify-between items-center">
                            <div className="font-display text-2xl uppercase">BLKOUT UK</div>
                            <div className="font-mono text-xs font-bold uppercase">End of File</div>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};