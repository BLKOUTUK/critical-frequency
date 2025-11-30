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
import { ArrowDown, Menu, X, Activity, Scale, Radio, Compass, EyeOff, Send, MessageSquare, User, Mail, Building, FileText, Users, Heart, Mic, Calendar, ExternalLink } from 'lucide-react';

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
            <a href="#about" onClick={scrollToSection('about')} className="hover:bg-act-black hover:text-white px-2 py-1 transition-all focus:outline-none focus:ring-2 focus:ring-act-pink">About</a>
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
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-act-pink py-4 w-full text-center">About</a>
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

        {/* ABOUT BLKOUT - Who We Are */}
        <section id="about" className="py-24 bg-white border-b-2 border-act-black relative overflow-hidden" aria-labelledby="section-about">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-act-black text-white font-mono text-xs font-bold uppercase mb-6">
                            <Users size={14} aria-hidden="true"/> WHO WE ARE
                        </div>
                        <h2 id="section-about" className="font-display text-5xl md:text-7xl mb-6 text-act-black uppercase leading-none">
                            BLKOUT<span className="text-act-pink">_</span>UK
                        </h2>
                        <p className="text-xl font-display uppercase text-stone-600 max-w-2xl mx-auto">
                            Community-Owned Liberation Platform for Black Queer Men in the UK
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                        {/* Left: The Story */}
                        <div className="space-y-6">
                            <div className="bg-act-paper p-6 border-2 border-act-black shadow-[4px_4px_0px_0px_#000]">
                                <h3 className="font-display text-2xl uppercase mb-4 text-act-black">The Mission</h3>
                                <p className="font-sans text-base leading-relaxed text-stone-700 mb-4">
                                    BLKOUT exists because Black Queer men in the UK deserve infrastructure built by and for us. Not charity. Not afterthought programming. Real, community-owned systems for connection, support, and collective power.
                                </p>
                                <p className="font-sans text-base leading-relaxed text-stone-700">
                                    We are registered as a <strong>Community Benefit Society</strong> under the Co-operative and Community Benefit Societies Act 2014—meaning democratic member ownership, not shareholders.
                                </p>
                            </div>

                            <div className="bg-act-black text-white p-6 border-2 border-act-black">
                                <div className="font-mono text-xs text-act-pink uppercase mb-3 font-bold">/// Core Belief</div>
                                <p className="font-display text-2xl uppercase leading-tight">
                                    "Without community, there is no liberation."
                                </p>
                            </div>
                        </div>

                        {/* Right: What We Do */}
                        <div className="space-y-4">
                            <h3 className="font-display text-2xl uppercase mb-4 text-act-black">What We Build</h3>

                            {[
                                { icon: Heart, title: "Peer Support", desc: "IVOR AI assistant and community networks for 24/7 connection" },
                                { icon: Calendar, title: "Events & Culture", desc: "Gatherings that create the conditions for joy and belonging" },
                                { icon: Mic, title: "The Relay", desc: "Podcast amplifying Black Queer voices and policy dialogue" },
                                { icon: FileText, title: "Research & Policy", desc: "Evidence base for systemic change, not just service delivery" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 border-2 border-stone-200 hover:border-act-pink hover:bg-stone-50 transition-all group">
                                    <div className="w-12 h-12 bg-act-yellow flex items-center justify-center border-2 border-act-black group-hover:bg-act-pink transition-colors">
                                        <item.icon size={20} className="text-act-black" />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-lg uppercase text-act-black">{item.title}</h4>
                                        <p className="font-mono text-xs text-stone-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full Proposal Link Box */}
                    <div className="bg-act-blue text-white p-8 border-2 border-act-black shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="font-mono text-xs text-act-yellow uppercase mb-2 font-bold">/// Full Research Proposal</div>
                                <h3 className="font-display text-3xl uppercase leading-tight mb-2">
                                    Read the Complete Strategy
                                </h3>
                                <p className="font-mono text-sm text-white/80">
                                    Research briefing, outcomes paper, policy recommendations, cost model, and user journeys.
                                </p>
                            </div>
                            <a
                                href="https://mental-health.blkoutuk.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-8 py-4 bg-white text-act-blue font-display text-xl uppercase hover:bg-act-yellow hover:text-act-black transition-colors border-2 border-white whitespace-nowrap"
                            >
                                <ExternalLink size={20} />
                                View Proposal
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-6 font-mono text-xs font-bold uppercase">
                        <a href="https://blkoutuk.com" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink focus:text-act-pink focus:outline-none underline decoration-2 underline-offset-4">BLKOUTUK.COM</a>
                        <a href="#relay" onClick={scrollToSection('relay')} className="hover:text-act-pink focus:text-act-pink focus:outline-none underline decoration-2 underline-offset-4">THE RELAY</a>
                        <a href="https://ivor-blkout.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink focus:text-act-pink focus:outline-none underline decoration-2 underline-offset-4">SUPPORT - #ASKIVOR</a>
                    </div>
                    <div className="flex gap-4 md:justify-end">
                        <a href="https://instagram.com/blkoutuk" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="https://twitter.com/blaboratories" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink transition-colors" aria-label="Twitter/X">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a href="https://facebook.com/blaboratories" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="https://youtube.com/@blkoutuk" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink transition-colors" aria-label="YouTube">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                        <a href="https://linkedin.com/company/blkoutuk" target="_blank" rel="noopener noreferrer" className="hover:text-act-pink transition-colors" aria-label="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                    </div>
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
