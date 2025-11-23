import React from 'react';
import { FileExtensionData } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { X, Check, AlertTriangle, Monitor, Layers, Activity, FileText, Globe, Share2, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DetailViewProps {
  data: FileExtensionData | null;
  onClose: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ data, onClose }) => {
  if (!data) return null;

  const colorClass = CATEGORY_COLORS[data.category];
  const accentColor = colorClass.match(/text-([a-z]+)-[0-9]+/)?.[1] || 'zinc';
  
  // Map tailwind color names to hex for charts
  const chartColorMap: Record<string, string> = {
    cyan: '#22d3ee',
    fuchsia: '#e879f9',
    violet: '#a78bfa',
    amber: '#fbbf24',
    emerald: '#34d399',
    rose: '#fb7185',
    slate: '#94a3b8',
    lime: '#a3e635',
    orange: '#fb923c',
    zinc: '#a1a1aa'
  };
  const chartFill = chartColorMap[accentColor] || '#a1a1aa';

  const chartData = [
    { name: 'Популярность', value: data.popularity },
    { name: 'Совместимость', value: Math.min(data.osCompatibility.length * 20, 100) },
    { name: 'Сложность', value: Math.floor(Math.random() * 40) + 30 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-hidden">
      <div 
        className="relative bg-black w-full max-w-6xl md:rounded-[32px] border border-zinc-900/80 shadow-2xl overflow-hidden flex flex-col h-full md:h-[90vh] animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Ambient Glow */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-${accentColor}-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3`}></div>
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-${accentColor}-500/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3`}></div>

        {/* Header */}
        <div className="p-6 md:p-8 flex justify-between items-center z-10 bg-gradient-to-b from-zinc-950/80 to-transparent backdrop-blur-sm sticky top-0">
           <div className="flex flex-col gap-1">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                {data.ext}
                <span className={`text-xs md:text-sm font-bold px-3 py-1 rounded-full bg-${accentColor}-500/10 text-${accentColor}-400 border border-${accentColor}-500/20 uppercase tracking-widest`}>
                  {data.category}
                </span>
              </h1>
              <p className="text-zinc-500 font-medium">{data.name}</p>
           </div>
           
           <div className="flex gap-4">
             <button onClick={onClose} className="p-4 rounded-full bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all hover:rotate-90 border border-zinc-800/50">
               <X size={24} />
             </button>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Info */}
            <div className="lg:col-span-8 space-y-12">
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed">
                  {data.description}
                </p>
                <div className="mt-8 pt-8 border-t border-zinc-900">
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={16} /> Технический разбор
                  </h3>
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {data.fullDescription}
                  </p>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                      <Check size={20} />
                    </div>
                    <span className="font-bold text-emerald-500/80 uppercase tracking-wider text-sm">Сильные стороны</span>
                  </div>
                  <ul className="space-y-4">
                    {data.pros.map((item, i) => (
                      <li key={i} className="flex gap-3 text-zinc-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0 opacity-50"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                      <AlertTriangle size={20} />
                    </div>
                    <span className="font-bold text-rose-500/80 uppercase tracking-wider text-sm">Слабые стороны</span>
                  </div>
                  <ul className="space-y-4">
                    {data.cons.map((item, i) => (
                      <li key={i} className="flex gap-3 text-zinc-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0 opacity-50"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Chart Block */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-900">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Аналитика</h3>
                   <Activity size={14} className="text-zinc-700" />
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={90} tick={{fill: '#52525b', fontSize: 10, fontWeight: 600}} tickLine={false} axisLine={false} />
                      <Tooltip 
                         cursor={{fill: 'rgba(255,255,255,0.02)'}}
                         contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: '#18181b', radius: [0,4,4,0] }}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartFill} fillOpacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-900">
                 <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Layers size={14}/> Стек технологий
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {data.technologies.map((tech) => (
                     <span key={tech} className="px-3 py-1.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-md text-xs font-mono hover:bg-zinc-800 hover:text-white transition-colors cursor-default">
                       {tech}
                     </span>
                   ))}
                 </div>
              </div>

              {/* OS Compatibility */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-900">
                 <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Monitor size={14}/> Платформы
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {data.osCompatibility.map((os) => (
                     <span key={os} className={`px-3 py-1.5 bg-${accentColor}-500/5 text-${accentColor}-200/70 border border-${accentColor}-500/10 rounded-md text-xs font-medium`}>
                       {os}
                     </span>
                   ))}
                 </div>
              </div>
              
              <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                 <Share2 size={18} />
                 Поделиться
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
