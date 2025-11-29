
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, Quote, X, BookOpen, Library, ArrowLeft, FolderOpen } from 'lucide-react';

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

const StackedCard: React.FC<{ item: Paper; index: number; total: number; onClick: () => void }> = ({ item, index, total, onClick }) => {
    // Offset calculation for the "Stack" effect
    const topOffset = 120 + (index * 20); // Each card sticks 20px lower than the last
    const [imgError, setImgError] = useState(false);
    
    return (
        <div 
            className="sticky mb-12 w-full max-w-4xl mx-auto perspective-1000"
            style={{ 
                top: `${topOffset}px`, 
                zIndex: index + 10 
            }}
        >
            <button 
                onClick={onClick}
                className="w-full relative group transition-all duration-300 hover:-translate-y-4 focus:outline-none"
            >
                {/* File Tab */}
                <div className="absolute -top-8 left-0 bg-act-black text-white px-4 py-2 font-mono text-xs font-bold uppercase border-t-2 border-x-2 border-white rounded-t-lg z-0 group-hover:bg-act-pink group-hover:text-black transition-colors">
                    File 00{item.id} // {item.type}
                </div>

                {/* Main Card Body */}
                <div className="bg-act-paper border-4 border-act-black shadow-[0px_4px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[500px] md:h-[400px] overflow-hidden relative z-10 group-hover:shadow-[16px_16px_0px_0px_#FF007F] transition-shadow duration-300">
                    
                    {/* Image Section */}
                    {item.image && !imgError ? (
                        <div className="md:w-1/3 relative overflow-hidden grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 border-b-4 md:border-b-0 md:border-r-4 border-act-black">
                             <img 
                                src={item.image} 
                                alt="" 
                                className="w-full h-full object-cover" 
                                onError={() => setImgError(true)}
                             />
                             <div className="absolute inset-0 bg-act-blue mix-blend-multiply opacity-50"></div>
                        </div>
                    ) : (
                        <div className="md:w-1/3 bg-act-black text-white p-8 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black pattern-grid-lg">
                             <Quote size={48} className="text-act-yellow" />
                             <div className="font-mono text-[10px] uppercase opacity-50">NO IMAGE DATA</div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-1 p-8 flex flex-col justify-between bg-white relative">
                        {/* Background Stamp */}
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-5 pointer-events-none">
                            <FolderOpen size={200} />
                        </div>

                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-xs font-bold uppercase text-act-pink tracking-widest">{item.subtitle}</span>
                                <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors">
                                    <ArrowRight size={16} />
                                </span>
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl uppercase leading-[0.85] mb-6 text-act-black text-left group-hover:text-act-blue transition-colors">
                                {item.title}
                            </h3>
                            <p className="font-display text-xl md:text-2xl uppercase leading-none text-stone-500 line-clamp-3 text-left">
                                "{item.quote}"
                            </p>
                        </div>

                        <div className="pt-6 border-t-2 border-stone-200 flex justify-between items-center mt-auto">
                            <div className="font-mono text-[10px] uppercase font-bold text-stone-500">
                                Author: {item.author}
                            </div>
                            <div className="bg-act-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase border border-black shadow-[2px_2px_0px_0px_#000]">
                                Confidential
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};


// --- MAIN COMPONENT ---

export const EvidenceScroll: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  return (
    <>
    <section className="bg-stone-900 py-24 px-6 min-h-screen relative border-b-4 border-act-pink" aria-labelledby="evidence-bank-heading">
      
      {/* Section Header */}
      <div className="container mx-auto mb-24 text-center">
          <div className="inline-block px-4 py-2 bg-act-yellow border-2 border-black font-mono text-sm font-bold uppercase mb-6 transform -rotate-1 shadow-[4px_4px_0px_0px_#fff]">
              /// THE EVIDENCE DOSSIER
          </div>
          <h2 id="evidence-bank-heading" className="font-display text-6xl md:text-8xl uppercase leading-none text-white mb-6">
              THE CASE<br/>FILES.
          </h2>
          <p className="font-mono text-stone-400 max-w-xl mx-auto">
              We have compiled the data. We have mapped the erasure. 
              <span className="text-white font-bold"> Click a file below to open the full dossier.</span>
          </p>
      </div>

      {/* STACKED CARD CONTAINER */}
      <div className="container mx-auto pb-24 relative">
          {/* Vertical line connecting the stack */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-stone-800 -translate-x-1/2 z-0 hidden md:block"></div>
          
          {papers.map((item, index) => (
              <StackedCard 
                key={item.id} 
                item={item} 
                index={index} 
                total={papers.length}
                onClick={() => setSelectedPaper(item)} 
              />
          ))}
      </div>

    </section>

    {/* READER MODAL */}
    <AnimatePresence>
        {selectedPaper && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-8"
                onClick={() => setSelectedPaper(null)}
            >
                <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="bg-act-paper w-full max-w-5xl h-full md:h-[90vh] overflow-hidden border-x-4 border-t-4 border-act-pink shadow-[0px_0px_50px_rgba(255,0,127,0.5)] flex flex-col md:flex-row relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header / Sidebar */}
                    <div className="bg-act-black text-white p-8 md:w-1/3 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-act-pink shrink-0 relative overflow-hidden">
                         {/* Noise Texture */}
                         <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

                         <div>
                             <div className="font-mono text-xs text-act-pink font-bold uppercase mb-4 flex items-center gap-2">
                                <Library size={14}/> CLASSIFIED DOSSIER
                             </div>
                             <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.85] mb-8 text-white">{selectedPaper.title}</h2>
                             
                             <div className="space-y-4 font-mono text-xs text-stone-400 border-t border-stone-700 pt-4">
                                 <div><span className="text-white">AUTHOR:</span> {selectedPaper.author}</div>
                                 <div><span className="text-white">REF:</span> {selectedPaper.type}-00{selectedPaper.id}</div>
                                 <div><span className="text-white">ACCESS:</span> GRANTED</div>
                             </div>
                         </div>

                         <div className="hidden md:block mt-8">
                             <Quote size={40} className="text-act-yellow mb-4" />
                             <p className="font-display text-2xl uppercase leading-tight text-stone-300">
                                 "{selectedPaper.quote}"
                             </p>
                         </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white text-black overflow-y-auto custom-scrollbar relative">
                        
                        {/* Sticky Toolbar */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur border-b-2 border-stone-100 p-4 flex justify-between items-center z-20">
                            <div className="font-mono text-xs font-bold uppercase text-stone-500">Reading Mode</div>
                            <button 
                                onClick={() => setSelectedPaper(null)}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-act-pink hover:text-black transition-colors font-mono text-xs font-bold uppercase"
                            >
                                <X size={14} /> Close File
                            </button>
                        </div>

                        <div className="p-8 md:p-16 max-w-2xl mx-auto">
                            <h3 className="font-display text-3xl mb-8 border-b-4 border-black pb-4">{selectedPaper.subtitle}</h3>
                            <div className="prose prose-lg prose-headings:font-display prose-p:font-mono prose-li:font-mono">
                                {selectedPaper.fullText}
                            </div>
                        </div>

                        <div className="p-8 md:p-16 bg-stone-100 border-t-4 border-black text-center mt-12">
                            <div className="font-display text-4xl uppercase mb-2">BLKOUT UK</div>
                            <div className="font-mono text-xs font-bold text-stone-500 uppercase">Policy Unit // End of Transmission</div>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};
