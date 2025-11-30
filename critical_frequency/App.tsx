/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, CommunityHubScene } from './components/QuantumScene';
import { AffinityNetworkDiagram, CentreMarginDiagram, OutcomeMetricDiagram, DataGapDiagram, IntersectionalNexusDiagram } from './components/Diagrams';
import { EvidenceScroll } from './components/ScrollyTelling';
import { AmplificationStation } from './components/AmplificationStation';
import { MovementResourceBuilder } from './components/ZineGenerator';
import { TheRelay } from './components/TheRelay';
import { ArrowDown, Menu, X, Activity, Scale, Radio, Compass, EyeOff, Send, MessageSquare, User, Mail, Building, FileText } from 'lucide-react';

// Custom BLKOUT Logo Component - Uses user provided image
const BlkoutLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <img
    src="/logo.png"
    alt="BLKOUT UK Logo"
    className={`${className} object-contain`}
    onError={(e) => {
        // Fallback if logo.png is missing
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement?.classList.add('bg-black', 'rounded-full');
    }}
  />
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleDownloadStrategy = () => {
    // Strategy Summary based on mental-health.blkoutuk.com proposal
    const content = `
BLKOUT UK: CRITICAL FREQUENCY
SYSTEMS CHANGE FOR BLACK QUEER MENTAL HEALTH
=============================================================================

THE CASE FOR INVESTMENT
-----------------------------------------------------------------------------
£10.5M over 5 years | £60/year per person across 35,000 Black queer men

Current NHS talking therapy completion rate for Black groups: 3.8%
Cost per suicide prevented (community model): £50,000
Cost per suicide (NHS intensive care + lost productivity): £3.12M
Conservative ROI projection: 4-6:1

=============================================================================
PHASE 1: CAREER FELLOWSHIP (Years 1-5)
=============================================================================
ACTION:   10 Black queer specialists in 18-24 month rotations across
          NHS mental health | Housing | Social care | Legal | Arts | Employment

OUTCOME:  Institutional reform from within. Fellows become sector leaders,
          carrying community knowledge into decision-making positions.
          Policy changes appear in organizations without direct programme
          contact by Year 5.

=============================================================================
PHASE 2: COMMUNITY-DIRECTED RESOURCES (Years 1-5)
=============================================================================
ACTION:
• Therapy Access: 365 men/year accessing culturally competent care
  (1,825 total = 5.2% direct intervention)
• Hub-and-Spoke: London hub + Manchester, Birmingham, Bristol spokes
• Service Gap Fund: £1.2M for crisis prevention (housing, therapy, legal)
• Training: 200 men/year in Mental Health First Aid

OUTCOME:  Network effects amplify individual therapy into collective
          transformation. 1,825 participants x 25 connections = 45,625
          exposure points (130% of total population). Therapy becomes
          normalized; stigma reduces in people with NO direct contact.

=============================================================================
PHASE 3: DEMOCRATIC INFRASTRUCTURE (Years 3-10)
=============================================================================
ACTION:
• Years 1-2: Fellows report to community governance
• Year 3: Community deliberates on infrastructure for Years 6-10
• Years 4-5: Development lab pilots community-chosen projects

OUTCOME:  Community decides: housing trust, media co-op, cultural archive,
          or social care cooperative. Self-sustaining infrastructure
          requiring no ongoing programme funding after Year 10.

=============================================================================
THE NETWORK EFFECTS MODEL
=============================================================================
Year 1-2:  730 men in therapy | 10-15% network exposure | Local clustering
Year 3:    1,095 total | 20-25% exposure | Critical mass reached
Year 4-5:  1,825 total | 30-40% exposure | Tipping point crossed
Year 6-10: Self-sustaining cultural change | Zero programme dependence

"Without community, there is no liberation—because liberation is not
individual escape, but collective transformation through network effects."

=============================================================================
REPARATIVE JUSTICE FRAMEWORK (UN GA Resolution 60/147)
=============================================================================
1. RESTITUTION:    Fellowship restores leadership positions
2. COMPENSATION:   Career investment vs. unpaid community labour
3. REHABILITATION: Cohort model + consultancy protection
4. SATISFACTION:   Community democratic control
5. NON-REPETITION: Fellows become future leaders; reform embeds

This is not charity. It is a legal framework for addressing systematic harm.

=============================================================================
READ THE FULL PROPOSAL
=============================================================================
Research Briefing:  mental-health.blkoutuk.com/research-briefing.html
Outcomes Paper:     mental-health.blkoutuk.com/outcomes-paper.html
Policy Briefing:    mental-health.blkoutuk.com/policy-briefing.html
Cost Model:         mental-health.blkoutuk.com/cost-model.html

CONTACT
-----------------------------------------------------------------------------
BLKOUT UK | Community Benefit Society (FCA Registered)
Web: mental-health.blkoutuk.com | blkoutuk.com
Email: research@blkoutuk.com
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BLKOUT_UK_Strategy_Summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-act-paper text-act-black selection:bg-act-pink selection:text-white font-sans">

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none bg-noise mix-blend-multiply" aria-hidden="true"></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${scrolled ? 'bg-act-paper border-act-black py-2' : 'bg-transparent border-transparent py-6'}`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 cursor-pointer z-50 group focus:outline-none focus:ring-2 focus:ring-act-pink p-1 rounded" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Return to top">
            <div className="w-12 h-12 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <BlkoutLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col leading-none transition-transform duration-300 group-hover:translate-x-2">
                <span className="font-display text-2xl tracking-tighter uppercase group-hover:text-act-pink transition-colors">BLKOUT UK</span>
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-act-yellow px-1 self-start group-hover:bg-black group-hover:text-white transition-colors">Policy Unit</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-widest uppercase">
            <a href="#demographics" onClick={scrollToSection('demographics')} className="hover:bg-act-black hover:text-white px-2 py-1 transition-all focus:outline-none focus:ring-2 focus:ring-act-pink">The Shift</a>
            <a href="#evidence" onClick={scrollToSection('evidence')} className="hover:bg-act-black hover:text-white px-2 py-1 transition-all focus:outline-none focus:ring-2 focus:ring-act-pink">Evidence</a>
            <a href="#relay" onClick={scrollToSection('relay')} className="hover:bg-act-black hover:text-white px-2 py-1 transition-all focus:outline-none focus:ring-2 focus:ring-act-pink">The Relay</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:bg-act-black hover:text-white px-2 py-1 transition-all focus:outline-none focus:ring-2 focus:ring-act-pink">Impact</a>
            <button onClick={handleDownloadStrategy} className="px-6 py-2 bg-act-black text-white border-2 border-act-black hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-act-pink">
              Download Strategy
            </button>
          </div>

          <button
            className="md:hidden text-act-black p-2 z-50 focus:outline-none focus:ring-2 focus:ring-act-pink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-act-paper flex flex-col items-center justify-center gap-8 text-3xl font-display uppercase">
            <a href="#demographics" onClick={scrollToSection('demographics')} className="hover:text-act-pink py-4 w-full text-center">The Shift</a>
            <a href="#evidence" onClick={scrollToSection('evidence')} className="hover:text-act-pink py-4 w-full text-center">Evidence</a>
            <a href="#relay" onClick={scrollToSection('relay')} className="hover:text-act-pink py-4 w-full text-center">The Relay</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-act-pink py-4 w-full text-center">Impact</a>
            <button onClick={handleDownloadStrategy} className="px-6 py-2 bg-act-black text-white border-2 border-act-black hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-act-pink mt-4">
              Download Strategy
            </button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden border-b-4 border-act-black" role="banner">

        {/* Speaker Bass Bin Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
                src="https://images.unsplash.com/photo-1545167622-3a6ac15600f3?q=80&w=2000&auto=format&fit=crop"
                alt="Speaker Bass Bin Texture"
                className="w-full h-full object-cover grayscale contrast-125 scale-110"
                onError={(e) => {
                    // Fallback to a solid color if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-stone-800');
                }}
            />
        </div>

        <div aria-hidden="true" className="absolute inset-0 z-10">
            <HeroScene />
        </div>

        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center h-full pt-16">

          <div className="inline-block mb-6 px-4 py-2 bg-act-yellow text-black text-xs font-mono font-bold tracking-widest uppercase rotate-[-2deg] border-2 border-black shadow-[4px_4px_0px_0px_#000]">
             <FileText className="inline w-4 h-4 mr-2" aria-hidden="true" /> A POLICY INTERVENTION FOR BLACK QUEER MEN'S HEALTH
          </div>

          <h1 className="font-display text-center leading-[0.8] mb-8 w-full select-none flex flex-col items-center">
            <span className="block text-[15vw] md:text-[9rem] lg:text-[11rem] text-act-black mix-blend-multiply tracking-tighter">CRITICAL</span>
            <span className="block text-[15vw] md:text-[10rem] lg:text-[12rem] text-white tracking-tighter drop-shadow-[4px_4px_0_#000] [-webkit-text-stroke:2px_black] relative z-20">FREQUENCY.</span>
          </h1>

          <div className="max-w-3xl bg-white/95 backdrop-blur-sm p-8 border-2 border-act-black text-center shadow-[8px_8px_0px_0px_#111]">
            <h2 className="text-xl md:text-2xl font-display uppercase mb-4 leading-none text-act-black">
              £10.5M Investment | 35,000 Lives | 5 Years
            </h2>
            <div className="h-1 w-24 bg-act-pink mx-auto my-4 hidden md:block" aria-hidden="true"></div>
            <p className="text-base md:text-lg font-sans leading-relaxed text-stone-800">
              A phased strategy using network effects to transform individual therapy access into community-wide cultural change.
              <br/><br/>
              <span className="font-bold">NHS completion rate for Black groups: 3.8%.</span> We propose an alternative: career fellowships, community resources, and democratic infrastructure that becomes self-sustaining.
            </p>
          </div>

          <div className="mt-12 flex justify-center w-full">
             <a
               href="#demographics"
               onClick={scrollToSection('demographics')}
               className="animate-bounce p-4 bg-act-black text-white rounded-full hover:bg-act-pink transition-colors focus:outline-none focus:ring-4 focus:ring-act-pink"
               aria-label="Scroll down to content"
             >
                <ArrowDown size={24} aria-hidden="true" />
             </a>
          </div>
        </div>
      </header>

      {/* Mission Band - New Section to explicitly state purpose */}
      <div className="bg-act-black text-white py-4 border-b-2 border-act-pink relative z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
           <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest">
              <span className="text-act-yellow mr-2">/// MISSION:</span>
              To replace the crisis loop with community infrastructure.
           </div>
           <div className="font-mono text-[10px] md:text-xs text-stone-400 flex items-center gap-2">
              SCROLL FOR STRATEGY <ArrowDown size={14}/>
           </div>
        </div>
      </div>

      <main className="relative z-10">

        {/* Context: The Data Void */}
        <section id="demographics" className="py-24 bg-white border-b-2 border-act-black" aria-labelledby="section-demographics">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                   <DataGapDiagram />
                </div>
                <div className="order-1 md:order-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-act-black text-white font-mono text-xs font-bold uppercase mb-6">
                        <EyeOff size={14} aria-hidden="true"/> SECTION 1: THE OPPORTUNITY
                   </div>
                   <h2 id="section-demographics" className="font-display text-5xl md:text-6xl mb-6 leading-none text-act-black">Illuminating<br/><span className="text-act-blue underline decoration-4 underline-offset-4">The Invisible</span></h2>
                   <p className="text-lg font-sans font-medium leading-relaxed mb-6">
                     You cannot prevent sickness in a population you cannot see. Standard top-down metrics fail to capture the reality of our lives, leaving thousands visible only when they hit crisis point.
                   </p>
                   <p className="text-lg font-sans font-medium leading-relaxed border-l-4 border-act-pink pl-4 bg-stone-50 p-4">
                     <strong>The Feedback Loop:</strong> BLKOUT UK connects the margins to the centre. We turn the "blind spot" into a source of vital intelligence, feeding bottom-up reality back into top-down strategy.
                   </p>
                </div>
            </div>
          </div>
        </section>

        {/* EVIDENCE SCROLL (Responsive) */}
        <div id="evidence">
           <EvidenceScroll />
        </div>

        {/* The Solution: Cultural Constellation */}
        <section id="network" className="py-24 bg-act-paper border-b-2 border-act-black relative" aria-labelledby="section-network">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none" aria-hidden="true">
                <Radio size={500} />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-act-black text-white font-mono text-xs font-bold uppercase mb-6">
                            <Compass size={14} aria-hidden="true"/> SECTION 2: CULTURAL INFRASTRUCTURE
                        </div>
                        <h2 id="section-network" className="font-display text-5xl md:text-6xl mb-6 leading-none">CULTURAL<br/>CONSTELLATION</h2>
                        <p className="text-xl font-display uppercase text-act-pink mb-6">
                           Culture &gt; Geography.
                        </p>
                        <p className="text-lg font-sans font-medium mb-6 leading-relaxed">
                            Community is not a postcode. It is a frequency. Digital infrastructure allows us to bypass physical constraints, cultural participation amplifies the signal, creating liberatory networks based on sharing experiences and affinity.
                        </p>
                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 bg-act-black text-white flex items-center justify-center font-bold" aria-hidden="true">1</span>
                                <span>Shared Cultural Experience</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 bg-act-black text-white flex items-center justify-center font-bold" aria-hidden="true">2</span>
                                <span>Media-rich Connection</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 bg-act-black text-white flex items-center justify-center font-bold" aria-hidden="true">3</span>
                                <span>Liberatory Networks</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <AffinityNetworkDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* THE RELAY PODCAST (Sound System) */}
        <div id="relay">
            <TheRelay />
        </div>

        {/* Strategic Alignment: The Burning Platform */}
        <section id="alignment" className="py-24 bg-act-black text-white border-b-2 border-white relative overflow-hidden" aria-labelledby="section-alignment">

             <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 id="section-alignment" className="font-display text-5xl md:text-7xl mb-6 text-white leading-none">THE BURNING<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-act-pink to-act-yellow">PLATFORM</span></h2>
                    <p className="text-xl font-mono text-stone-300 leading-relaxed border-t border-b border-stone-700 py-4 inline-block">
                        Reshaping the system around the person.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 font-mono text-sm">
                        <p className="text-lg font-sans leading-relaxed text-stone-300 border-l-4 border-white pl-4 mb-8">
                             Black and Queer liberation has always depended on the defiance of "I am who I am." <br/><br/>
                             We do not ask people to conform to the system's view of them. We align the system to the infinite complexity of the individual.
                        </p>
                        <div className="border-l-2 border-act-pink pl-4 hover:bg-white/5 p-2 transition-colors">
                            <h3 className="text-act-pink font-bold text-lg mb-1">/// HOUSING & HEALTH</h3>
                            <p>We cannot medicate away homelessness. Secure housing is the first prescription.</p>
                        </div>
                        <div className="border-l-2 border-act-blue pl-4 hover:bg-white/5 p-2 transition-colors">
                            <h3 className="text-act-blue font-bold text-lg mb-1">/// SAFETY & JUSTICE</h3>
                            <p>Replacing policing with peer support de-escalates crisis and builds trust.</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <IntersectionalNexusDiagram />
                    </div>
                </div>
             </div>
        </section>

        {/* The Pipeline -> The Balance */}
        <section className="py-24 bg-act-yellow border-b-2 border-act-black" aria-labelledby="section-transfer">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <CentreMarginDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-act-black text-white font-mono text-xs font-bold uppercase mb-6">
                            <Scale size={14} aria-hidden="true"/> SECTION 3: THE STRATEGIC TRANSFER
                        </div>
                        <h2 id="section-transfer" className="font-display text-5xl mb-6 text-act-black uppercase leading-none">The<br/>Power Shift</h2>
                        <p className="text-lg font-sans font-bold text-act-black mb-6 leading-relaxed">
                            Resourcing the Margins to meet the Centre.
                        </p>
                        <p className="text-lg font-sans font-medium text-act-black leading-relaxed mb-6">
                            Transformational change is impossible without correcting the vast power imbalance. We argue for resources to be pushed to the edges, creating the capacity for the margins to engage, challenge, and redesign the centre.
                        </p>
                        <div className="bg-white p-4 border-2 border-black inline-block shadow-[4px_4px_0px_0px_#000]">
                             <div className="font-mono text-xs font-bold uppercase mb-2 text-stone-500">SYSTEM STATUS:</div>
                             <div className="font-display text-2xl uppercase">
                                 Analogue <span aria-hidden="true">→</span> Digital
                             </div>
                             <div className="font-display text-2xl uppercase text-act-pink">
                                 Sickness <span aria-hidden="true">→</span> Prevention
                             </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Outcomes */}
        <section id="impact" className="py-24 bg-white border-b-2 border-act-black" aria-labelledby="section-projection">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 id="section-projection" className="font-display text-6xl mb-6 text-act-black">THE PROJECTION</h2>
                    <p className="font-mono text-sm">Stopping the cycle of crisis before it starts.</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <OutcomeMetricDiagram />
                </div>
            </div>
        </section>

        {/* AMPLIFICATION STATION (Audio) */}
        <AmplificationStation />

        {/* RESOURCE BUILDER (Visual) */}
        <MovementResourceBuilder />

        {/* Manifesto / Footer - UPDATED "THE WAY FORWARD" */}
        <section className="py-24 bg-act-black text-white relative border-b-4 border-act-pink" aria-label="Manifesto and Footer">
             {/* Flashing Urgent Background Element */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-900 skew-x-12 opacity-50 z-0 pointer-events-none" aria-hidden="true"></div>

             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                <div className="md:col-span-5 relative min-h-[400px] border-2 border-white overflow-hidden bg-stone-900 hidden md:block" aria-hidden="true">
                     <CommunityHubScene />
                     <div className="absolute top-4 left-4 bg-act-pink text-black px-2 py-1 font-mono text-xs font-bold animate-pulse border border-black">
                         /// FREQUENCY: LOCKED
                     </div>
                     <div className="absolute bottom-4 right-4 bg-black px-2 py-1 font-mono text-xs border border-white text-right">
                         FIG 5.0: THE HORIZON
                     </div>
                </div>

                <div className="md:col-span-7 flex flex-col justify-center">
                    <h2 className="font-display text-6xl md:text-8xl mb-6 text-white uppercase leading-[0.8]">
                        The Way<br/><span className="text-act-yellow">Forward.</span>
                    </h2>

                    <div className="space-y-6 text-lg font-mono text-stone-300 mb-8 border-l-4 border-act-pink pl-6">
                        <p className="text-white font-bold text-2xl">
                             From Analogue to Digital. From Sickness to Prevention.
                        </p>
                        <p>
                             We invite all stakeholders to find out together. This is a shared exploration of how the margins can reshape the centre.
                        </p>
                        <p className="text-act-yellow font-bold">
                             Led by those for whom survival is not a strategy paper.
                        </p>
                    </div>

                    {/* CONTACT FORM */}
                    <div id="contact" className="mt-8 bg-white text-black p-6 border-2 border-act-pink shadow-[8px_8px_0px_0px_#FF007F]">
                        <p className="font-mono text-xs text-act-pink mb-4 uppercase font-bold tracking-widest flex items-center gap-2">
                             <MessageSquare size={14}/> Stay In Touch / Join The Vanguard
                        </p>
                        {/* UPDATE: Uses Formspree for actual submission logic */}
                        <form action="https://formspree.io/f/xbjnqnga" method="POST" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <div className="flex items-center border-2 border-black bg-stone-100 px-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-act-pink">
                                        <User size={16} className="text-stone-400" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="NAME"
                                            required
                                            className="w-full p-2 bg-transparent outline-none font-mono text-sm uppercase"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <div className="flex items-center border-2 border-black bg-stone-100 px-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-act-pink">
                                        <Mail size={16} className="text-stone-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="EMAIL"
                                            required
                                            className="w-full p-2 bg-transparent outline-none font-mono text-sm uppercase"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="org" className="sr-only">Organization</label>
                                <div className="flex items-center border-2 border-black bg-stone-100 px-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-act-pink">
                                    <Building size={16} className="text-stone-400" />
                                    <input
                                        id="org"
                                        name="organization"
                                        type="text"
                                        placeholder="ORGANIZATION / ROLE"
                                        className="w-full p-2 bg-transparent outline-none font-mono text-sm uppercase"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Feedback/Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="COMMENTS / FEEDBACK / PROPOSALS..."
                                    rows={3}
                                    className="w-full p-2 border-2 border-black bg-stone-100 focus:bg-white outline-none focus:ring-2 focus:ring-act-pink font-mono text-sm"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-black text-white font-display text-xl uppercase hover:bg-act-pink hover:text-black transition-colors flex items-center justify-center gap-2">
                                <Send size={20} /> SEND TRANSMISSION
                            </button>
                            <p className="text-[10px] font-mono text-center text-stone-500">
                                Directed to BLKOUT UK Policy Unit.
                            </p>
                        </form>
                    </div>
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-act-paper text-act-black py-12 border-t-4 border-act-black" role="contentinfo">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 p-2">
                         <BlkoutLogo className="w-full h-full" />
                    </div>
                    <div>
                        <div className="font-display text-4xl mb-2 uppercase">BLKOUT_UK</div>
                        <p className="font-mono text-xs max-w-sm font-bold uppercase tracking-widest">
                            Where Realness Lives.<br/>
                            Black. Queer. Welcome.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 font-mono text-xs font-bold uppercase">
                    <a href="https://blkoutuk.com" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink focus:text-act-pink focus:outline-none underline decoration-2 underline-offset-4">BLKOUTUK.COM</a>
                    <a href="#relay" onClick={scrollToSection('relay')} className="hover:text-act-pink focus:text-act-pink focus:outline-none underline decoration-2 underline-offset-4">THE RELAY</a>
                    <a href="https://ivor-blkout.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink focus:text-act-pink focus:outline-none underline decoration-2 underline-offset-4">SUPPORT - #ASKIVOR</a>
                </div>
            </div>

            <div className="border-t-2 border-act-black/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="font-mono text-[10px] text-stone-500 max-w-2xl leading-relaxed">
                    BLKOUT Creative Ltd is registered by the Financial Conduct Authority (London) as a Community Benefit Society under the Co-operative and Community Benefit Societies Act 2014.
                </p>
                <div className="font-mono text-[10px] text-stone-500">
                    &copy; {new Date().getFullYear()}
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
