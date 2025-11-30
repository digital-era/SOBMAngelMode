import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Zap, 
  Microscope, 
  Brain, 
  FileText, 
  ChevronRight,
  LogOut,
  Dna,
  Wifi
} from 'lucide-react';
import { REPORT_DATA } from '../data';
import { SectionId } from '../types';
import { EITChart, BCIChart } from './Visuals';

interface DashboardProps {
  onLogout: () => void;
  user: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState<SectionId>(SectionId.INTRO);

  const renderNav = (id: SectionId, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-300 ${
        activeTab === id 
          ? 'bg-neon-blue/10 text-neon-blue border-r-2 border-neon-blue' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      {icon}
      <span className="font-medium tracking-wide text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-bio-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-slate-700 z-20 flex flex-col h-screen fixed top-0 left-0 hidden md:flex">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-2 text-neon-green mb-1">
            <ShieldCheck size={20} />
            <span className="text-xs font-mono font-bold">SECURE CONNECTION</span>
          </div>
          <p className="text-slate-500 text-xs font-mono truncate">USER: {user}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {renderNav(SectionId.INTRO, <FileText size={18} />, "OVERVIEW")}
          {renderNav(SectionId.CORE, <Cpu size={18} />, "I. SAGE CORE")}
          {renderNav(SectionId.MACRO, <Zap size={18} />, "II. FLYING NEEDLE")}
          {renderNav(SectionId.MICRO, <Microscope size={18} />, "III. NANO ANGEL")}
          {renderNav(SectionId.UNITY, <Brain size={18} />, "IV. UNITY & BCI")}
          {renderNav(SectionId.REFS, <Dna size={18} />, "V. REFERENCES")}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-400 hover:text-rose-400 transition-colors w-full p-2"
          >
            <LogOut size={16} />
            <span className="text-xs font-mono">TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 z-10 overflow-y-auto h-screen scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
          
          {/* Header Section (Intro) */}
          <section id={SectionId.INTRO} className={`${activeTab === SectionId.INTRO ? 'block' : 'hidden md:block'}`}>
            <header className="mb-12 border-b border-slate-800 pb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-xs font-mono border border-rose-500/20 rounded-full">
                  {REPORT_DATA.header.classification}
                </span>
                <span className="text-slate-500 font-mono text-xs">{REPORT_DATA.header.version}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4 leading-tight">
                {REPORT_DATA.header.title}
              </h1>
              <p className="text-xl text-neon-blue/80 font-light mb-6">
                {REPORT_DATA.header.subtitle}
              </p>
              <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-blue">
                <h3 className="text-sm font-mono text-slate-400 mb-2">CORE DEFINITION</h3>
                <p className="text-lg text-slate-200">{REPORT_DATA.header.definition}</p>
              </div>
            </header>
          </section>

          {/* Core (Sage Agent) */}
          <section id={SectionId.CORE} className={`space-y-6 ${activeTab === SectionId.CORE ? 'block' : 'hidden md:block'}`}>
            <SectionHeader title={REPORT_DATA.sections.core.title} subtitle={REPORT_DATA.sections.core.subtitle} />
            <p className="text-slate-300 leading-relaxed">{REPORT_DATA.sections.core.content}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {REPORT_DATA.sections.core.features.map((feature, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-xl hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-bold ${idx === 0 ? 'text-cyan-400' : 'text-emerald-400'}`}>
                      {feature.side}
                    </h3>
                    {idx === 0 ? <Cpu className="text-slate-500 group-hover:text-cyan-400 transition-colors" /> : <Activity className="text-slate-500 group-hover:text-emerald-400 transition-colors" />}
                  </div>
                  <div className="h-px w-full bg-slate-700 mb-4"></div>
                  <span className="text-xs font-mono text-slate-500 block mb-2">{feature.label}</span>
                  <p className="text-slate-300 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Macro (Flying Needle) */}
          <section id={SectionId.MACRO} className={`space-y-6 ${activeTab === SectionId.MACRO ? 'block' : 'hidden md:block'}`}>
            <SectionHeader title={REPORT_DATA.sections.macro.title} subtitle={REPORT_DATA.sections.macro.subtitle} />
            
            <div className="glass-panel p-8 rounded-xl border border-neon-blue/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Wifi size={100} />
              </div>
              <h3 className="text-lg text-white font-medium mb-4 flex items-center">
                <Zap className="mr-2 text-neon-blue" size={20}/>
                Core Vision
              </h3>
              <p className="text-slate-300 italic mb-6">"{REPORT_DATA.sections.macro.vision}"</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {REPORT_DATA.sections.macro.techs.map((tech, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-neon-blue font-mono text-sm uppercase">{tech.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{tech.details}</p>
                  </div>
                ))}
              </div>

              {/* Math Vis */}
              <div className="mt-8 bg-black/40 p-4 rounded-lg font-mono text-center text-sm text-slate-400 border border-dashed border-slate-700">
                <p className="mb-2 text-xs text-slate-600">PHASE DELAY CALCULATION</p>
                <p>τ_ij = (√[(x_i - x_f)² + (y_j - y_f)² + z_f²] - z_f) / c</p>
              </div>

              <EITChart />
            </div>
          </section>

          {/* Micro (Nano Angel) */}
          <section id={SectionId.MICRO} className={`space-y-6 ${activeTab === SectionId.MICRO ? 'block' : 'hidden md:block'}`}>
            <SectionHeader title={REPORT_DATA.sections.micro.title} subtitle={REPORT_DATA.sections.micro.subtitle} />
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                 {REPORT_DATA.sections.micro.techs.map((tech, i) => (
                   <div key={i} className="glass-panel p-4 rounded-lg">
                     <h4 className="text-neon-purple font-mono text-xs uppercase mb-2">{tech.title}</h4>
                     <p className="text-xs text-slate-300">{tech.desc}</p>
                   </div>
                 ))}
              </div>
              <div className="md:col-span-2 glass-panel p-6 rounded-lg bg-black/40 border border-neon-green/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-neon-green font-mono text-sm flex items-center">
                    <Dna className="mr-2" size={16} /> MOLECULAR LOGIC GATE
                  </h4>
                  <span className="text-[10px] text-slate-500 uppercase">Runtime: Bio-Chemical</span>
                </div>
                <pre className="font-mono text-xs md:text-sm text-slate-300 overflow-x-auto">
                  <code dangerouslySetInnerHTML={{__html: REPORT_DATA.sections.micro.codeSnippet}} />
                </pre>
              </div>
            </div>
          </section>

           {/* Unity (BCI) */}
           <section id={SectionId.UNITY} className={`space-y-6 ${activeTab === SectionId.UNITY ? 'block' : 'hidden md:block'}`}>
            <SectionHeader title={REPORT_DATA.sections.unity.title} subtitle={REPORT_DATA.sections.unity.subtitle} />
            
            <div className="glass-panel p-6 rounded-xl border-l-4 border-rose-500/50">
               <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1 space-y-6">
                    <p className="text-lg font-light text-white">"{REPORT_DATA.sections.unity.vision}"</p>
                    <ul className="space-y-4">
                      {REPORT_DATA.sections.unity.modules.map((mod, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="text-rose-500 mt-1 mr-2 shrink-0" size={16} />
                          <div>
                            <strong className="block text-slate-200 text-sm">{mod.title}</strong>
                            <span className="text-slate-400 text-sm">{mod.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="flex-1 min-h-[200px]">
                   <BCIChart />
                 </div>
               </div>
            </div>
          </section>

          {/* References */}
          <section id={SectionId.REFS} className={`${activeTab === SectionId.REFS ? 'block' : 'hidden md:block'}`}>
            <h3 className="text-lg font-mono text-slate-500 mb-6 border-b border-slate-800 pb-2">REFERENCES & STANDARDS</h3>
            <ul className="space-y-3">
              {REPORT_DATA.references.map((ref, i) => (
                <li key={i} className="text-sm text-slate-500 font-mono hover:text-slate-300 transition-colors cursor-default">
                  [{String(i + 1).padStart(2, '0')}] {ref}
                </li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-12 pb-8 text-center border-t border-slate-800/50 mt-12">
            <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
              Wisdom-Engineering Fusion V3.0 • Confidential • Do Not Distribute
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

const SectionHeader: React.FC<{title: string, subtitle: string}> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-white mb-1 flex items-center">
      <span className="w-2 h-2 bg-neon-blue rounded-full mr-3 inline-block animate-pulse"></span>
      {title}
    </h2>
    <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider ml-5">{subtitle}</h3>
  </div>
);

export default Dashboard;