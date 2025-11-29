
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Download, Type, Palette, Layout, Layers, Check, Scissors, Loader2, Square, Grid, Circle, AlertTriangle, Zap, Heart, Star, Skull, Stamp, MousePointer2, Save } from 'lucide-react';
import { toPng } from 'html-to-image';

type AssetType = 'FLYER' | 'BLUEPRINT' | 'STICKER';
type ColorTheme = 'PINK' | 'YELLOW' | 'BLUE' | 'BW';
type BorderStyle = 'SOLID' | 'DASHED' | 'DOTTED' | 'DOUBLE';
type GraphicIcon = 'NONE' | 'ZAP' | 'STAR' | 'ALERT' | 'SKULL' | 'HEART';

interface DesignState {
  headline: string;
  subhead: string;
  body: string;
  theme: ColorTheme;
  fontMode: 'LOUD' | 'TECH';
  texture: boolean;
  borderStyle: BorderStyle;
  graphic: GraphicIcon;
}

const THEMES = {
  PINK: { bg: 'bg-act-pink', text: 'text-black', border: 'border-black', accent: 'bg-white', secondary: 'text-white' },
  YELLOW: { bg: 'bg-act-yellow', text: 'text-black', border: 'border-black', accent: 'bg-black', secondary: 'text-black' },
  BLUE: { bg: 'bg-act-blue', text: 'text-white', border: 'border-white', accent: 'bg-act-yellow', secondary: 'text-act-yellow' },
  BW: { bg: 'bg-black', text: 'text-white', border: 'border-white', accent: 'bg-act-pink', secondary: 'text-stone-400' },
};

const BORDERS = {
  SOLID: 'border-solid',
  DASHED: 'border-dashed',
  DOTTED: 'border-dotted',
  DOUBLE: 'border-double'
};

const GRAPHICS = {
  NONE: null,
  ZAP: Zap,
  STAR: Star,
  ALERT: AlertTriangle,
  SKULL: Skull,
  HEART: Heart
};

export const MovementResourceBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AssetType>('FLYER');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  
  const [design, setDesign] = useState<DesignState>({
    headline: "REFUSE SILENCE",
    subhead: "THE SYSTEM IS DRIFTING.",
    body: "We are the signal in the noise. Join the vanguard of community health.",
    theme: 'PINK',
    fontMode: 'LOUD',
    texture: true,
    borderStyle: 'SOLID',
    graphic: 'NONE'
  });

  // Load saved design on mount
  useEffect(() => {
    const savedDesign = localStorage.getItem('blkout_zine_design');
    if (savedDesign) {
      try {
        setDesign(JSON.parse(savedDesign));
      } catch (e) {
        console.error("Failed to parse saved design", e);
      }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('blkout_zine_design', JSON.stringify(design));
      setSaveMessage("SAVED!");
      setTimeout(() => setSaveMessage(null), 2000);
    } catch (e) {
      console.error("Failed to save design", e);
      setSaveMessage("ERROR");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!captureRef.current) return;
    setIsDownloading(true);

    try {
        const dataUrl = await toPng(captureRef.current, { 
            cacheBust: true,
            pixelRatio: 2 // Higher resolution
        });
        const link = document.createElement('a');
        link.download = `BLKOUT-${activeTab}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Failed to generate image', err);
        alert('Failed to generate image. This may be due to browser security settings on external images.');
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <section id="resources" className="py-24 bg-white border-b-2 border-act-black relative" aria-labelledby="resources-title">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}} aria-hidden="true"></div>
       
       <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                  <div className="inline-block px-4 py-1 bg-black text-white font-mono text-xs font-bold uppercase mb-4 transform -rotate-1">
                      /// DIY DISTRO CENTRE
                  </div>
                  <h2 id="resources-title" className="font-display text-5xl md:text-6xl text-act-black uppercase leading-none">
                      Movement<br/>Materials
                  </h2>
              </div>
              <div className="flex flex-col items-end gap-2">
                  <p className="font-mono text-sm max-w-md text-right md:text-left">
                      The revolution will not be templated. <br/>
                      Customize. Print. Paste. Post.
                  </p>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-act-black font-mono text-xs font-bold uppercase hover:bg-act-yellow transition-colors focus:outline-none focus:ring-2 focus:ring-act-pink"
                  >
                    {isSaving ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>}
                    {saveMessage ? saveMessage : "SAVE PROGRESS"}
                  </button>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">
              
              {/* LEFT: CANVAS PREVIEW */}
              <div className="lg:col-span-8 bg-stone-200 border-2 border-act-black shadow-[8px_8px_0px_0px_#111] flex items-center justify-center p-8 relative overflow-hidden" role="region" aria-label="Design Preview">
                  <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                  
                  {/* The Asset Canvas */}
                  <div className="transform scale-75 md:scale-90 lg:scale-100 transition-all duration-300">
                      <div ref={captureRef} className="shadow-2xl">
                        {activeTab === 'FLYER' && <FlyerTemplate design={design} />}
                        {activeTab === 'BLUEPRINT' && <BlueprintTemplate design={design} />}
                        {activeTab === 'STICKER' && <StickerTemplate design={design} />}
                      </div>
                  </div>

                  <div className="absolute bottom-4 right-4 font-mono text-[10px] text-stone-500 uppercase flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      LIVE PREVIEW // 300 DPI
                  </div>
              </div>

              {/* RIGHT: TOOLKIT */}
              <div className="lg:col-span-4 bg-act-black text-white p-6 border-2 border-act-black flex flex-col gap-6 shadow-[8px_8px_0px_0px_#FF007F] h-full" role="form" aria-label="Customization Tools">
                  
                  {/* Tab Selectors */}
                  <div className="flex border-b border-stone-700 pb-6 gap-2" role="tablist">
                      {(['FLYER', 'BLUEPRINT', 'STICKER'] as AssetType[]).map((type) => (
                          <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            role="tab"
                            aria-selected={activeTab === type}
                            className={`flex-1 py-2 font-mono text-[10px] font-bold uppercase border transition-all focus:outline-none focus:ring-2 focus:ring-act-pink ${activeTab === type ? 'bg-white text-black border-white' : 'bg-transparent text-stone-500 border-stone-700 hover:border-white'}`}
                          >
                              {type}
                          </button>
                      ))}
                  </div>

                  {/* Editors */}
                  <div className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                      
                      {/* Text Edit */}
                      <div className="space-y-3">
                          <div className="flex items-center gap-2 text-act-yellow font-mono text-xs uppercase font-bold" id="text-edit-label">
                              <Type size={14} aria-hidden="true" /> Text Content
                          </div>
                          <label htmlFor="headline-input" className="sr-only">Headline</label>
                          <input 
                            id="headline-input"
                            type="text" 
                            value={design.headline}
                            onChange={(e) => setDesign({...design, headline: e.target.value})}
                            className="w-full bg-stone-900 border border-stone-700 p-3 font-display uppercase text-white focus:border-act-pink outline-none focus:ring-1 focus:ring-act-pink placeholder:text-stone-700"
                            placeholder="HEADLINE"
                            maxLength={30}
                          />
                          <label htmlFor="subhead-input" className="sr-only">Subhead</label>
                          <input 
                            id="subhead-input"
                            type="text" 
                            value={design.subhead}
                            onChange={(e) => setDesign({...design, subhead: e.target.value})}
                            className="w-full bg-stone-900 border border-stone-700 p-3 font-mono text-xs text-white focus:border-act-pink outline-none focus:ring-1 focus:ring-act-pink placeholder:text-stone-700"
                            placeholder="SUBHEAD"
                            maxLength={50}
                          />
                          {activeTab !== 'STICKER' && (
                              <>
                                <label htmlFor="body-input" className="sr-only">Body Text</label>
                                <textarea 
                                    id="body-input"
                                    value={design.body}
                                    onChange={(e) => setDesign({...design, body: e.target.value})}
                                    className="w-full bg-stone-900 border border-stone-700 p-3 font-sans text-sm text-white focus:border-act-pink outline-none focus:ring-1 focus:ring-act-pink h-24 resize-none placeholder:text-stone-700"
                                    placeholder="Body text..."
                                    maxLength={150}
                                />
                              </>
                          )}
                      </div>

                      {/* Theme Select */}
                      <div className="space-y-3">
                          <div className="flex items-center gap-2 text-act-blue font-mono text-xs uppercase font-bold" id="theme-label">
                              <Palette size={14} aria-hidden="true" /> Colorway
                          </div>
                          <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-labelledby="theme-label">
                              {Object.keys(THEMES).map((t) => (
                                  <button
                                    key={t}
                                    role="radio"
                                    aria-checked={design.theme === t}
                                    aria-label={`Select ${t} Theme`}
                                    onClick={() => setDesign({...design, theme: t as ColorTheme})}
                                    className={`h-10 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-white ${design.theme === t ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    style={{
                                        backgroundColor: t === 'PINK' ? '#FF007F' : t === 'YELLOW' ? '#E6FF00' : t === 'BLUE' ? '#0055FF' : '#000'
                                    }}
                                  >
                                      {design.theme === t && <Check size={16} className={t === 'YELLOW' ? 'text-black mx-auto' : 'text-white mx-auto'} aria-hidden="true" />}
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* Style Toggles */}
                      <div className="space-y-3">
                           <div className="flex items-center gap-2 text-act-pink font-mono text-xs uppercase font-bold">
                              <Layout size={14} aria-hidden="true" /> Style & Layout
                          </div>
                          
                          {/* Font Mode */}
                          <div className="flex gap-4">
                              <button 
                                onClick={() => setDesign({...design, fontMode: 'LOUD'})}
                                aria-pressed={design.fontMode === 'LOUD'}
                                className={`flex-1 py-2 font-display uppercase border-2 text-center focus:outline-none focus:ring-2 focus:ring-act-pink ${design.fontMode === 'LOUD' ? 'bg-white text-black border-white' : 'border-stone-700 text-stone-500'}`}
                              >
                                  LOUD
                              </button>
                              <button 
                                onClick={() => setDesign({...design, fontMode: 'TECH'})}
                                aria-pressed={design.fontMode === 'TECH'}
                                className={`flex-1 py-2 font-mono text-xs uppercase border-2 text-center font-bold focus:outline-none focus:ring-2 focus:ring-act-pink ${design.fontMode === 'TECH' ? 'bg-white text-black border-white' : 'border-stone-700 text-stone-500'}`}
                              >
                                  TECH
                              </button>
                          </div>

                          {/* Border Style */}
                          <div className="grid grid-cols-4 gap-2">
                             {(['SOLID', 'DASHED', 'DOTTED', 'DOUBLE'] as BorderStyle[]).map(bs => (
                                 <button
                                    key={bs}
                                    onClick={() => setDesign({...design, borderStyle: bs})}
                                    className={`h-8 border-white flex items-center justify-center transition-all ${design.borderStyle === bs ? 'bg-white text-black' : 'border opacity-50'}`}
                                    title={bs}
                                 >
                                     <Square size={16} className={bs === 'DASHED' ? 'stroke-dashed' : bs === 'DOTTED' ? 'stroke-dotted' : ''} strokeWidth={bs === 'DOUBLE' ? 1 : 2} />
                                 </button>
                             ))}
                          </div>

                           {/* Graphic Overlays */}
                           <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold mt-2">
                              <Stamp size={14} aria-hidden="true" /> Overlay Graphic
                          </div>
                          <div className="grid grid-cols-6 gap-2">
                             {(Object.keys(GRAPHICS) as GraphicIcon[]).map(icon => {
                                 const Icon = GRAPHICS[icon];
                                 return (
                                     <button
                                        key={icon}
                                        onClick={() => setDesign({...design, graphic: icon})}
                                        className={`h-8 border border-stone-700 flex items-center justify-center transition-all ${design.graphic === icon ? 'bg-act-pink text-white border-act-pink' : 'hover:bg-stone-800'}`}
                                        title={icon}
                                     >
                                         {Icon ? <Icon size={14} /> : <span className="text-[10px]">OFF</span>}
                                     </button>
                                 )
                             })}
                          </div>

                          <button 
                             onClick={() => setDesign({...design, texture: !design.texture})}
                             aria-pressed={design.texture}
                             className={`w-full py-2 border border-dashed text-xs font-mono uppercase flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-act-pink ${design.texture ? 'border-act-yellow text-act-yellow' : 'border-stone-700 text-stone-500'}`}
                          >
                             <Layers size={12} aria-hidden="true" /> {design.texture ? 'GRIT TEXTURE: ON' : 'GRIT TEXTURE: OFF'}
                          </button>
                      </div>

                  </div>

                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full py-4 bg-act-pink text-white font-display text-2xl uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 mt-auto focus:outline-none focus:ring-4 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {isDownloading ? (
                          <>
                             <Loader2 size={24} className="animate-spin" aria-hidden="true" /> PROCESSING...
                          </>
                      ) : (
                          <>
                             <Download size={24} aria-hidden="true" /> Download {activeTab}
                          </>
                      )}
                  </button>
              </div>
          </div>
       </div>
    </section>
  );
};

// --- TEMPLATES ---

const GraphicOverlay: React.FC<{ icon: GraphicIcon; color: string }> = ({ icon, color }) => {
    const IconComponent = GRAPHICS[icon];
    if (!IconComponent) return null;
    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none transform rotate-12 z-10 ${color}`}>
            <IconComponent size={200} strokeWidth={1} />
        </div>
    );
};

const FlyerTemplate: React.FC<{ design: DesignState }> = ({ design }) => {
    const theme = THEMES[design.theme];
    const [tornTabs, setTornTabs] = useState<number[]>([]);

    const handleTear = (index: number) => {
        if (!tornTabs.includes(index)) {
            setTornTabs([...tornTabs, index]);
        }
    };

    return (
        <div className="relative group perspective-1000">
            {/* Paper Shadow/Curl Effect for Photorealism */}
            <div className="absolute inset-0 bg-black/40 blur-xl transform translate-y-4 translate-x-4 z-[-1] rounded-sm"></div>

            <div className={`w-[350px] h-[550px] ${theme.bg} ${theme.text} relative flex flex-col overflow-visible shadow-inner`}>
                {design.texture && <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none mix-blend-multiply z-20"></div>}
                
                {/* Graphic Overlay */}
                <GraphicOverlay icon={design.graphic} color={theme.text} />

                {/* Main Content Area */}
                <div className={`p-6 border-b-4 border-black flex-1 flex flex-col justify-start relative z-10 border-4 border-b-0 ${BORDERS[design.borderStyle]}`}>
                    <div className="absolute top-0 right-0 p-2 bg-black text-white font-mono text-[10px] font-bold transform rotate-90 origin-top-right shadow-md">
                        BLKOUT UK POLICY
                    </div>

                    <div className={`font-mono text-xs font-bold uppercase mb-4 ${theme.secondary}`}>
                        /// {design.subhead}
                    </div>
                    
                    <h1 className={`${design.fontMode === 'LOUD' ? 'font-display text-7xl leading-[0.85]' : 'font-mono text-4xl font-bold'} uppercase mb-6 break-words drop-shadow-sm`}>
                        {design.headline}
                    </h1>

                    <div className={`w-16 h-2 bg-black mb-6`}></div>

                    <p className={`${design.fontMode === 'LOUD' ? 'font-sans text-lg font-bold' : 'font-mono text-xs'} leading-tight max-w-[90%]`}>
                        {design.body}
                    </p>
                </div>

                {/* Tear-off Bottom Section */}
                <div className="h-32 bg-white relative flex items-start pt-0 z-10 shadow-[0_-5px_10px_rgba(0,0,0,0.1)]">
                    {/* Dashed Cut Line */}
                    <div className="absolute -top-[2px] left-0 w-full border-t-4 border-black border-dashed flex items-center justify-center z-20">
                        <div className="bg-white px-2 -mt-3 text-black">
                            <Scissors size={20} className="transform rotate-90" />
                        </div>
                    </div>

                    {/* Tabs Container */}
                    <div className="w-full flex justify-around h-full items-start px-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <button 
                                key={i} 
                                onClick={() => handleTear(i)}
                                disabled={tornTabs.includes(i)}
                                className={`
                                    h-full w-full border-l border-r border-stone-300 relative group/tab
                                    transition-all duration-300 transform origin-top
                                    ${tornTabs.includes(i) ? 'opacity-0 pointer-events-none' : 'hover:translate-y-1 hover:rotate-1 cursor-pointer bg-white'}
                                `}
                                style={{
                                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
                                }}
                                title="Click to tear off"
                            >
                                 <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-white opacity-50 pointer-events-none"></div>
                                 <div className="h-full flex items-center justify-center">
                                     <span className="font-mono text-[9px] font-bold transform -rotate-90 whitespace-nowrap text-stone-800 tracking-wider">
                                         mental-health.blkoutuk.com
                                     </span>
                                 </div>
                                 
                                 {/* Hover Hint */}
                                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/tab:opacity-100 transition-opacity">
                                    <MousePointer2 size={12} className="text-act-pink" />
                                 </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const BlueprintTemplate: React.FC<{ design: DesignState }> = ({ design }) => {
    const theme = THEMES[design.theme];

    return (
        <div className={`w-[500px] h-[350px] ${theme.bg === 'bg-black' ? 'bg-[#003366]' : theme.bg} ${theme.text} relative flex flex-col overflow-hidden shadow-xl border-4 ${theme.border} ${BORDERS[design.borderStyle]}`}>
            {design.texture && <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] z-10"></div>}
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 z-0" style={{backgroundImage: `linear-gradient(${theme.bg === 'bg-white' ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${theme.bg === 'bg-white' ? '#000' : '#fff'} 1px, transparent 1px)`, backgroundSize: '20px 20px'}}></div>

            {/* Graphic Overlay */}
            <GraphicOverlay icon={design.graphic} color={theme.text === 'text-black' ? 'text-stone-400' : 'text-white'} />

            {/* Technical Header */}
            <div className={`absolute top-4 left-4 border ${theme.border} p-2 font-mono text-[10px] uppercase z-10 bg-inherit`}>
                <div className="font-bold">FIG 2.4: SYSTEM ARCHITECTURE</div>
                <div>SCALE: 1:100</div>
            </div>

            <div className="absolute top-4 right-4 z-10">
                <div className={`w-8 h-8 rounded-full border-2 ${theme.border} flex items-center justify-center font-display`}>A</div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 relative z-0">
                <div className={`border-2 ${theme.border} px-8 py-6 backdrop-blur-sm bg-opacity-10 bg-white`}>
                    <h1 className={`${design.fontMode === 'LOUD' ? 'font-display text-5xl' : 'font-mono text-3xl font-bold'} uppercase mb-2`}>
                        {design.headline}
                    </h1>
                    <div className="h-px w-full bg-current mb-2"></div>
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-4">{design.subhead}</div>
                    
                    <div className="flex justify-between items-end gap-4 text-left">
                        <p className="font-mono text-[10px] max-w-[200px] leading-tight opacity-80">
                            {design.body}
                        </p>
                        <div className={`w-12 h-12 border ${theme.border} flex items-center justify-center`}>
                             <div className="w-8 h-8 rounded-full border border-current"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Measurements */}
            <div className="absolute bottom-4 left-12 right-12 h-4 border-l border-r border-b border-current flex items-end justify-center">
                 <span className="bg-inherit px-2 font-mono text-[8px] translate-y-1/2">100% COMMUNITY OWNED</span>
            </div>
        </div>
    )
}

const StickerTemplate: React.FC<{ design: DesignState }> = ({ design }) => {
    const theme = THEMES[design.theme];

    return (
        <div className={`w-[400px] h-[250px] ${theme.bg} ${theme.text} relative flex items-center justify-center overflow-hidden shadow-xl rounded-lg border-8 border-white`}>
            {design.texture && <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none z-10"></div>}
            
            <GraphicOverlay icon={design.graphic} color={theme.text === 'text-black' ? 'text-black' : 'text-white'} />

            <div className={`w-full h-full p-4 flex flex-col items-center justify-center text-center relative z-0 border-4 border-transparent ${BORDERS[design.borderStyle]}`}>
                
                {/* Hello My Name Is Style Header */}
                <div className="bg-white text-black w-full py-1 mb-2 absolute top-0 left-0 text-center">
                    <span className="font-display uppercase text-2xl tracking-widest">HELLO</span>
                </div>
                <div className="bg-white text-black w-full py-0.5 mb-6 absolute top-8 left-0 text-center">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest">The Future Is</span>
                </div>

                <h1 className={`${design.fontMode === 'LOUD' ? 'font-display text-7xl' : 'font-display text-6xl'} uppercase leading-[0.85] mt-8 transform -rotate-2 mix-blend-hard-light`}>
                    {design.headline}
                </h1>
                
                <div className="mt-4 font-mono text-xs font-bold bg-black text-white px-2 py-1 transform rotate-1">
                    {design.subhead}
                </div>

                <div className="absolute bottom-2 right-2 font-display text-white text-xl opacity-50 mix-blend-overlay">
                    BLKOUT
                </div>
            </div>
        </div>
    )
}
