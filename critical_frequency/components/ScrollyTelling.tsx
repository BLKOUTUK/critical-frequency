/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Quote, X, Library, FolderOpen, ExternalLink } from 'lucide-react';

// --- DATA STRUCTURES ---

interface Paper {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  type: "ESSAY" | "DATA" | "POLICY" | "RESEARCH";
  quote: string;
  image: string | null;
  externalLink: string;
  fullText: React.ReactNode;
}

const papers: Paper[] = [
  {
    id: 1,
    title: "THE DATA VOID",
    subtitle: "MAPPING THE INVISIBLE",
    author: "BLKOUT RESEARCH",
    type: "DATA",
    quote: "You cannot prevent sickness in a population you cannot see.",
    image: null,
    externalLink: "https://mental-health.blkoutuk.com/who-are-uk-black-queer-men.html",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <p>
          Standard demographic monitoring forces a binary choice: Black OR LGBTQ+. This creates a "Ghost Cohort"—statistically invisible in primary care but hyper-visible in acute detention statistics.
        </p>

        <div className="bg-stone-900 text-white p-6 my-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-4xl font-display text-act-yellow">50-65K</div>
              <div className="text-xs uppercase opacity-70">Black queer men in the UK</div>
            </div>
            <div>
              <div className="text-4xl font-display text-act-pink">3.8%</div>
              <div className="text-xs uppercase opacity-70">Therapy completion (vs 79.8% white)</div>
            </div>
          </div>
        </div>

        <p>
          Black populations in the UK are significantly younger—median age 32 for Black African vs 45 for White British. Gen Z identifies as LGB at 6.91%, more than double the overall rate. Census data substantially undercounts due to family stigma, hostile environment policies, and strategic invisibility as survival.
        </p>

        <div className="bg-stone-100 p-6 border-l-4 border-act-pink my-6 font-bold">
           "The absence of evidence is treated as evidence of absence. It is not. It is evidence of structural neglect."
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "THE EVIDENCE BASE",
    subtitle: "WHERE WE ARE. WHERE WE COULD BE.",
    author: "BLKOUT POLICY UNIT",
    type: "ESSAY",
    quote: "Communities aren't waiting for institutions to save them—they're already doing the work of keeping each other alive.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    externalLink: "https://mental-health.blkoutuk.com/research-briefing-prose.html",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <h3 className="font-display text-2xl md:text-3xl mb-4 uppercase">Where We Are Now</h3>
        <p>
          UK Black queer men face mental health crisis rooted in colonial violence and systemic institutional failure. NHS services achieve only 3.8% therapy completion rates for Black populations versus 79.8% for white groups, while communities sustain themselves through unpaid peer support, mutual aid networks, and cultural reclamation work.
        </p>

        <hr className="border-stone-300 my-8"/>

        <h3 className="font-display text-2xl md:text-3xl mb-4 uppercase">Where We Could Be</h3>
        <p>
          Community-led interventions—peer support, cultural connection, joy-based practices—demonstrate superior outcomes compared to clinical services, yet receive minimal funding. The evidence suggests we should resource existing community infrastructure rather than only creating parallel institutional services.
        </p>

        <div className="bg-act-yellow text-black p-6 my-6 border-2 border-black">
          <p className="font-bold">
            This is not charity. This is accountability—compensating communities for the mental health labour they've been providing without pay, recognising that parties responsible for creating harm should bear the cost of healing.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "THE NUMBERS",
    subtitle: "THE INVESTMENT CASE",
    author: "BLKOUT FINANCE",
    type: "DATA",
    quote: "£60 per person annually. £5 per month. That's what liberation infrastructure costs.",
    image: null,
    externalLink: "https://mental-health.blkoutuk.com/cost-model.html",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <div className="grid grid-cols-3 gap-4 my-6">
            <div className="bg-act-black text-white p-4 text-center">
                <div className="text-2xl font-display text-act-yellow">£10.5M</div>
                <div className="text-[10px] uppercase">5-Year Investment</div>
            </div>
            <div className="bg-act-pink text-white p-4 text-center">
                <div className="text-2xl font-display">35,000</div>
                <div className="text-[10px] uppercase">People Reached</div>
            </div>
            <div className="bg-act-yellow text-black p-4 text-center">
                <div className="text-2xl font-display">4-6:1</div>
                <div className="text-[10px] uppercase">ROI Ratio</div>
            </div>
        </div>

        <h3 className="font-display text-2xl mb-4 uppercase">Investment Breakdown</h3>
        <ul className="space-y-2">
          <li><strong>60%</strong> — Cohort + Support Infrastructure (£6.3M)</li>
          <li><strong>40%</strong> — Relational Infrastructure & Governance (£4.2M)</li>
        </ul>

        <hr className="border-stone-300 my-8"/>

        <h3 className="font-display text-2xl mb-4 uppercase">Cost Comparison</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 p-4 border-l-4 border-green-500">
            <div className="font-bold text-green-800">This Model</div>
            <div className="text-green-700">£60/person/year</div>
          </div>
          <div className="bg-red-50 p-4 border-l-4 border-red-500">
            <div className="font-bold text-red-800">NHS Mental Health</div>
            <div className="text-red-700">£141/person/year</div>
          </div>
        </div>

        <h3 className="font-display text-2xl mb-4 uppercase mt-8">Prevention Economics</h3>
        <ul className="space-y-2 text-sm">
          <li>• Single psychiatric admission: <strong>£10K-15K</strong></li>
          <li>• Homelessness prevention: <strong>£36K-73K/person</strong></li>
          <li>• HIV transmission prevention: <strong>£380K-450K/case</strong></li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "THE PROPOSAL",
    subtitle: "LIBERATORY INFRASTRUCTURE",
    author: "BLKOUT POLICY UNIT",
    type: "POLICY",
    quote: "We stopped waiting for an ambulance that was never coming. We built our own network.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
    externalLink: "https://mental-health.blkoutuk.com/policy-briefing.html",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <h3 className="font-display text-2xl mb-4 uppercase">Career Fellowship Programme</h3>
        <p>
          10 Black queer specialists cycle through 18-24 month placements across six sectors: NHS mental health trusts, housing associations, social care, legal advocacy, arts/culture, and employment/education. By Year 5, fellows transition to permanent senior roles.
        </p>

        <hr className="border-stone-300 my-8"/>

        <h3 className="font-display text-2xl mb-4 uppercase">Community-Directed Resources</h3>
        <ul className="space-y-2">
          <li>• <strong>Therapy Access:</strong> 365 men annually accessing culturally competent care</li>
          <li>• <strong>Hub-and-Spoke:</strong> London centre connecting to Manchester, Birmingham</li>
          <li>• <strong>Service Gap Fund:</strong> Democratic allocation for housing deposits, crisis support</li>
          <li>• <strong>Digital Platform:</strong> Peer support, mental health first aid training</li>
        </ul>

        <hr className="border-stone-300 my-8"/>

        <h3 className="font-display text-2xl mb-4 uppercase">Reparative Justice Framework</h3>
        <p className="text-sm">Operationalising UN Resolution 60/147 (2005):</p>
        <div className="bg-stone-100 p-4 my-4 space-y-1 text-sm">
          <div><span className="font-bold text-act-pink">Restitution:</span> Restore Black queer men to leadership</div>
          <div><span className="font-bold text-act-blue">Compensation:</span> Replace unpaid community labour</div>
          <div><span className="font-bold">Rehabilitation:</span> Heal workers from sector harm</div>
          <div><span className="font-bold">Non-repetition:</span> Build lasting institutional capacity</div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "THE OUTCOMES",
    subtitle: "TRANSFORMATION OVER 10 YEARS",
    author: "BLKOUT RESEARCH",
    type: "POLICY",
    quote: "Liberation IS the network effect where individual transformation becomes collective power.",
    image: null,
    externalLink: "https://mental-health.blkoutuk.com/outcomes-paper.html",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <p className="font-bold text-lg">
          Individual mental health interventions scale into collective cultural shift through network effects.
        </p>

        <div className="space-y-4 my-6">
          <div className="border-l-4 border-stone-300 pl-4">
            <div className="font-bold text-act-pink">Years 1-2</div>
            <p className="text-sm">Early adopters access therapy; stigma reduces within dense local clusters.</p>
          </div>
          <div className="border-l-4 border-stone-400 pl-4">
            <div className="font-bold text-act-pink">Year 3</div>
            <p className="text-sm">~1,095 men engaged; behaviour threshold reached. Specialists embedded in institutions.</p>
          </div>
          <div className="border-l-4 border-stone-500 pl-4">
            <div className="font-bold text-act-pink">Years 4-5</div>
            <p className="text-sm">Critical mass achieved (5.2% direct); therapy normalisation self-sustaining.</p>
          </div>
          <div className="border-l-4 border-act-pink pl-4">
            <div className="font-bold text-act-pink">Years 6-10</div>
            <p className="text-sm">Cultural norm fully institutionalised. Community infrastructure operates independently.</p>
          </div>
        </div>

        <div className="bg-act-black text-white p-6 my-6">
          <div className="font-display text-xl uppercase mb-2">End State</div>
          <ul className="space-y-1 text-sm">
            <li>• Therapy normalised across 35,000 Black queer men</li>
            <li>• Institutional reforms spread through networks</li>
            <li>• Community-owned infrastructure operates independently</li>
            <li>• Compounding returns beyond initial investment</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "THE RESEARCH",
    subtitle: "DEEP DIVE: EVIDENCE & CITATIONS",
    author: "BLKOUT POLICY UNIT",
    type: "RESEARCH",
    quote: "3.8% therapy completion for Black communities vs 79.8% for white. The system isn't broken—it was never built for us.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop",
    externalLink: "https://mental-health.blkoutuk.com/research-briefing.html",
    fullText: (
      <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
        <p>
          The full Research Briefing contains 47+ peer-reviewed citations examining colonial trauma, minority stress, family rejection, peer support efficacy, and liberation psychology.
        </p>

        <h3 className="font-display text-2xl mb-4 uppercase">Key Evidence Areas</h3>
        <ul className="space-y-3">
          <li><strong>Colonial Harm:</strong> British export of anti-sodomy laws to 35+ colonies; destruction of pre-colonial gender diversity</li>
          <li><strong>Family Rejection:</strong> 8.4x higher suicide attempt likelihood with high rejection</li>
          <li><strong>Community Practices:</strong> Peer support reduces hospitalisation, increases hope</li>
          <li><strong>Cost Effectiveness:</strong> £50K per suicide prevented (peer) vs £1.67M (NHS intensive)</li>
          <li><strong>NHS Failures:</strong> Over-medication, lack of cultural adaptation, re-traumatisation</li>
        </ul>

        <hr className="border-stone-300 my-8"/>

        <h3 className="font-display text-2xl mb-4 uppercase">Key Sources</h3>
        <ul className="space-y-2 text-sm">
          <li>• Berkeley, R. (2020). <em>In The Picture</em></li>
          <li>• Centre for Mental Health (2024). <em>A space to be me</em></li>
          <li>• NHS Talking Therapies Annual Report (2022/23)</li>
          <li>• Health Foundation & Runnymede Trust (2025)</li>
          <li>• UN GA Resolution 60/147 (2005)</li>
        </ul>
      </div>
    )
  }
];

const StackedCard: React.FC<{ item: Paper; index: number; total: number; onClick: () => void }> = ({ item, index, onClick }) => {
    const topOffset = 120 + (index * 20);
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
                <div className="absolute -top-8 left-0 bg-act-black text-white px-4 py-2 font-mono text-xs font-bold uppercase border-t-2 border-x-2 border-white rounded-t-lg z-0 group-hover:bg-act-pink group-hover:text-black transition-colors">
                    Case File 00{item.id} // {item.type}
                </div>

                <div className="bg-act-paper border-4 border-act-black shadow-[0px_4px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[500px] md:h-[400px] overflow-hidden relative z-10 group-hover:shadow-[16px_16px_0px_0px_#FF007F] transition-shadow duration-300">

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
                             <div className="font-mono text-[10px] uppercase opacity-50">{item.type} DOCUMENT</div>
                        </div>
                    )}

                    <div className="flex-1 p-8 flex flex-col justify-between bg-white relative">
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
                                {item.author}
                            </div>
                            <div className="bg-act-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase border border-black shadow-[2px_2px_0px_0px_#000]">
                                Open Dossier
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};

export const EvidenceScroll: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  return (
    <>
    <section className="bg-stone-900 py-24 px-6 min-h-screen relative border-b-4 border-act-pink" aria-labelledby="evidence-bank-heading">

      <div className="container mx-auto mb-24 text-center">
          <div className="inline-block px-4 py-2 bg-act-yellow border-2 border-black font-mono text-sm font-bold uppercase mb-6 transform -rotate-1 shadow-[4px_4px_0px_0px_#fff]">
              /// THE EVIDENCE DOSSIER
          </div>
          <h2 id="evidence-bank-heading" className="font-display text-6xl md:text-8xl uppercase leading-none text-white mb-6">
              THE CASE<br/>FILES.
          </h2>
          <p className="font-mono text-stone-400 max-w-xl mx-auto">
              We have compiled the data. We have mapped the erasure. We have built the proposal.
              <span className="text-white font-bold"> Click a file to open the dossier.</span>
          </p>
      </div>

      <div className="container mx-auto pb-24 relative">
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
                    <div className="bg-act-black text-white p-8 md:w-1/3 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-act-pink shrink-0 relative overflow-hidden">
                         <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

                         <div>
                             <div className="font-mono text-xs text-act-pink font-bold uppercase mb-4 flex items-center gap-2">
                                <Library size={14}/> {selectedPaper.type} DOSSIER
                             </div>
                             <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.85] mb-6 text-white">{selectedPaper.title}</h2>

                             <div className="space-y-3 font-mono text-xs text-stone-400 border-t border-stone-700 pt-4">
                                 <div><span className="text-white">SUBTITLE:</span> {selectedPaper.subtitle}</div>
                                 <div><span className="text-white">AUTHOR:</span> {selectedPaper.author}</div>
                                 <div><span className="text-white">REF:</span> {selectedPaper.type}-00{selectedPaper.id}</div>
                             </div>
                         </div>

                         <div className="hidden md:block mt-6">
                             <Quote size={32} className="text-act-yellow mb-3" />
                             <p className="font-display text-lg uppercase leading-tight text-stone-300 mb-6">
                                 "{selectedPaper.quote}"
                             </p>

                             <a
                               href={selectedPaper.externalLink}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center gap-2 px-4 py-2 bg-act-pink text-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors"
                             >
                               <ExternalLink size={14} /> Read Full Document
                             </a>
                         </div>
                    </div>

                    <div className="flex-1 bg-white text-black overflow-y-auto custom-scrollbar relative">

                        <div className="sticky top-0 bg-white/95 backdrop-blur border-b-2 border-stone-100 p-4 flex justify-between items-center z-20">
                            <div className="font-mono text-xs font-bold uppercase text-stone-500">Summary</div>
                            <button
                                onClick={() => setSelectedPaper(null)}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-act-pink hover:text-black transition-colors font-mono text-xs font-bold uppercase"
                            >
                                <X size={14} /> Close
                            </button>
                        </div>

                        <div className="p-8 md:p-12 max-w-2xl mx-auto">
                            {selectedPaper.fullText}
                        </div>

                        <div className="p-8 bg-stone-100 border-t-4 border-black text-center">
                            <a
                              href={selectedPaper.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-act-black text-white font-mono text-sm font-bold uppercase hover:bg-act-pink hover:text-black transition-colors"
                            >
                              <ExternalLink size={16} /> Read Full Document on mental-health.blkoutuk.com
                            </a>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};
