/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Download, Type, Palette, Layout, Layers, Check, Scissors, Loader2, Square, Grid, Circle, AlertTriangle, Zap, Heart, Star, Skull, Stamp, MousePointer2, Save, Send, Copy, Infinity, RefreshCw } from 'lucide-react';
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

// --- PRESETS / EXAMPLES ---
const PRESETS: { id: string; title: string; type: AssetType; design: DesignState }[] = [
    {
        id: 'p1',
        title: 'SYSTEM SHOCK',
        type: 'FLYER',
        design: {
            headline: "WAKE UP",
            subhead: "THE DATA IS MISSING",
            body: "We are invisible in the spreadsheet but dying in the streets. Demand reality data now.",
            theme: 'YELLOW',
            fontMode: 'LOUD',
            texture: true,
            borderStyle: 'DOUBLE',
            graphic: 'ALERT'
        }
    },
    {
        id: 'p2',
        title: 'BLUEPRINT 01',
        type: 'BLUEPRINT',
        design: {
            headline: "SAFE HARBOUR",
            subhead: "AFFINITY PROTOCOL V2.0",
            body: "Architecture for a new peer-to-peer support network. Decentralized. Encrypted. Human.",
            theme: 'BLUE',
            fontMode: 'TECH',
            texture: true,
            borderStyle: 'DOTTED',
            graphic: 'ZAP'
        }
    },
    {
        id: 'p3',
        title: 'HELLO CHANGE',
        type: 'STICKER',
        design: {
            headline: "THE VANGUARD",
            subhead: "IS HERE",
            body: "",
            theme: 'PINK',
            fontMode: 'LOUD',
            texture: true,
            borderStyle: 'SOLID',
            graphic: 'STAR'
        }
    },
    {
        id: 'p4',
        title: 'NOIR ACTIVIST',
        type: 'FLYER',
        design: {
            headline: "NOT A STATISTIC",
            subhead: "WE ARE THE SIGNAL",
            body: "Stop counting bodies. Start funding lives. The system is drifting, we are the anchor.",
            theme: 'BW',
            fontMode: 'TECH',
            texture: true,
            borderStyle: 'DASHED',
            graphic: 'SKULL'
        }
    }
];

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

  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
      setActiveTab(preset.type);
      setDesign(preset.design);
      // Smooth scroll to editor
      document.getElementById('resource-editor')?.scrollIntoView({ behavior: 'smooth' });
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
                  <div className="flex gap-2">
                      <div className="px-3 py-2 bg-stone-100 border-2 border-stone-200 font-mono text-[10px] font-bold uppercase flex items-center gap-1 text-stone-500">
                          <Infinity size={12} /> UNLIMITED DISTRO LICENSE
                      </div>
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
          </div>

          <div id="resource-editor" className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">

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

                  <div className="space-y-4 mt-auto">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full py-4 bg-act-pink text-white font-display text-2xl uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
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

                    {/* INCENTIVE SECTION */}
                    <div className="border-t-2 border-stone-800 pt-4">
                        <div className="flex items-center gap-2 text-act-yellow font-mono text-xs uppercase font-bold mb-2">
                            <Star size={14} className="animate-pulse" aria-hidden="true"/> VANGUARD GALLERY
                        </div>
                        <p className="font-mono text-[10px] text-stone-400 mb-3 leading-tight">
                            Don't let the signal die on your drive. Send us your remix. We broadcast the most radical designs on our main frequency.
                        </p>
                        <a
                            href="mailto:contact@blkoutuk.com?subject=My%20BLKOUT%20Remix&body=Attached%20is%20my%20submission%20for%20the%20Vanguard%20Gallery.%20Please%20find%20my%20remix%20attached."
                            className="w-full py-2 bg-stone-900 border border-stone-700 text-white font-mono text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 group"
                        >
                            <Send size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> SUBMIT TO GALLERY
                        </a>
                    </div>
                  </div>
              </div>
          </div>

          {/* INSPIRATION GALLERY / PRESETS */}
          <div className="mt-16">
              <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-stone-300 flex-1"></div>
                  <h3 className="font-display text-2xl text-act-black uppercase">Inspiration From The Network</h3>
                  <div className="h-px bg-stone-300 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleLoadPreset(preset)}
                        className="group bg-stone-100 border-2 border-transparent hover:border-act-pink hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
                      >
                          {/* Mini Preview Placeholder */}
                          <div className={`aspect-[3/4] p-4 flex items-center justify-center ${THEMES[preset.design.theme].bg} relative overflow-hidden`}>
                              {/* Simple representation of the design */}
                              <div className="text-center z-10">
                                   <div className={`font-display text-2xl uppercase leading-none mb-2 ${THEMES[preset.design.theme].text}`}>{preset.design.headline}</div>
                                   <div className="w-8 h-1 bg-black mx-auto"></div>
                              </div>
                              <div className="absolute inset-0 bg-noise opacity-30"></div>
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>

                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                   <span className="bg-black text-white px-3 py-1 font-mono text-xs font-bold uppercase flex items-center gap-2">
                                       <RefreshCw size={12} /> Remix This
                                   </span>
                              </div>
                          </div>

                          <div className="p-3 bg-white border-t-2 border-stone-200 group-hover:border-act-pink">
                              <div className="font-mono text-xs font-bold uppercase text-black">{preset.title}</div>
                              <div className="font-mono text-[10px] text-stone-500 uppercase">{preset.type} // {preset.design.theme}</div>
                          </div>
                      </button>
                  ))}
              </div>
          </div>

       </div>
    </section>
  );
};

// --- TEMPLATES ---

// Helper components
const TextureOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
         style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'}}
    />
  );
};

const GraphicOverlay = ({ type, color }: { type: GraphicIcon; color: string }) => {
    if (type === 'NONE') return null;
    const Icon = GRAPHICS[type];
    if (!Icon) return null;
    return (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 ${color}`}>
            <Icon size={250} strokeWidth={1} />
        </div>
    );
};

export const FlyerTemplate = ({ design }: { design: DesignState }) => {
    const theme = THEMES[design.theme];
    const border = BORDERS[design.borderStyle];

    return (
        <div className={`w-[400px] h-[560px] ${theme.bg} ${theme.text} p-8 flex flex-col relative overflow-hidden border-4 ${theme.border} ${border}`}>
             <TextureOverlay active={design.texture} />
             <GraphicOverlay type={design.graphic} color={theme.text} />

             <div className="relative z-10 flex-1 flex flex-col">
                 <div className={`border-b-4 ${theme.border} pb-4 mb-6`}>
                     <h1 className={`${design.fontMode === 'LOUD' ? 'font-display text-7xl' : 'font-mono text-4xl font-bold'} uppercase leading-[0.8] mb-2 break-words`}>
                         {design.headline}
                     </h1>
                     <h2 className={`${design.fontMode === 'LOUD' ? 'font-sans font-bold' : 'font-mono'} text-lg uppercase tracking-widest`}>
                         {design.subhead}
                     </h2>
                 </div>

                 <div className="flex-1">
                     <p className={`${design.fontMode === 'LOUD' ? 'font-sans font-bold text-xl' : 'font-mono text-sm'} leading-relaxed`}>
                         {design.body}
                     </p>
                 </div>

                 <div className={`mt-auto pt-4 border-t-2 ${theme.border} flex justify-between items-end`}>
                     <div className={`w-12 h-12 ${theme.text === 'text-white' ? 'bg-white text-black' : 'bg-black text-white'} flex items-center justify-center`}>
                         <Zap size={24} fill="currentColor" />
                     </div>
                     <div className="text-right font-mono text-[10px] font-bold uppercase">
                         BLKOUT UK<br/>POLICY UNIT
                     </div>
                 </div>
             </div>
        </div>
    )
}

export const BlueprintTemplate = ({ design }: { design: DesignState }) => {
    const theme = THEMES[design.theme];
     const border = BORDERS[design.borderStyle];

    return (
        <div className={`w-[560px] h-[400px] ${theme.bg} ${theme.text} p-6 relative overflow-hidden border-2 ${theme.border} ${border}`}>
             {/* Grid */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, backgroundSize: '20px 20px'}}></div>
             <TextureOverlay active={design.texture} />

             <div className={`relative z-10 h-full border-2 border-dashed ${theme.border} p-4 flex flex-col`}>
                 <div className={`flex justify-between items-start border-b ${theme.border} pb-2 mb-4`}>
                      <div className="font-mono text-xs font-bold uppercase">
                          <div>FIG 1.1</div>
                          <div className="text-xs opacity-50">SCHEMATIC VIEW</div>
                      </div>
                      <div className="font-mono text-[10px] border border-current px-2 py-1">
                          REF: VANGUARD-001
                      </div>
                 </div>

                 <div className="flex-1 flex items-center gap-8">
                     <div className="w-1/2">
                         <h1 className="font-mono text-4xl font-bold uppercase mb-2 leading-none">{design.headline}</h1>
                         <h2 className="font-mono text-sm uppercase opacity-70 mb-4">{design.subhead}</h2>
                         <p className="font-mono text-xs leading-relaxed pl-2 border-l-2 border-current">
                             {design.body}
                         </p>
                     </div>
                     <div className="w-1/2 h-full border border-current flex items-center justify-center relative">
                         {/* Crosshairs */}
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-current opacity-50"></div>
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-current opacity-50"></div>
                         {design.graphic !== 'NONE' && GRAPHICS[design.graphic] && React.createElement(GRAPHICS[design.graphic]!, { size: 100 })}
                     </div>
                 </div>
             </div>
        </div>
    )
}

export const StickerTemplate = ({ design }: { design: DesignState }) => {
    const theme = THEMES[design.theme];

    return (
        <div className={`w-[300px] h-[300px] rounded-full ${theme.bg} ${theme.text} relative overflow-hidden flex items-center justify-center border-[10px] ${theme.border} shadow-xl`}>
            <TextureOverlay active={design.texture} />
             <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  {design.graphic !== 'NONE' && GRAPHICS[design.graphic] && React.createElement(GRAPHICS[design.graphic]!, { size: 180 })}
             </div>

             <div className="relative z-10 text-center transform -rotate-12">
                 <h1 className={`${design.fontMode === 'LOUD' ? 'font-display text-6xl' : 'font-mono text-4xl font-bold'} uppercase leading-[0.8] mb-1 drop-shadow-md`}>
                     {design.headline}
                 </h1>
                 <div className={`${theme.accent} ${theme.secondary} px-2 py-1 inline-block transform rotate-6`}>
                     <h2 className="font-mono text-sm font-bold uppercase">{design.subhead}</h2>
                 </div>
             </div>
        </div>
    )
}
