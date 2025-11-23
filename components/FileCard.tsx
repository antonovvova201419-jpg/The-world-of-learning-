import React from 'react';
import { FileExtensionData, FileCategory } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { FileText, Image, Music, Video, Archive, Terminal, Cpu, HardDrive, Code, Gamepad2 } from 'lucide-react';

interface FileCardProps {
  data: FileExtensionData;
  onClick: (data: FileExtensionData) => void;
}

const getIcon = (category: string) => {
  switch (category) {
    case FileCategory.IMAGE: return <Image size={24} strokeWidth={1.5} />;
    case FileCategory.AUDIO: return <Music size={24} strokeWidth={1.5} />;
    case FileCategory.VIDEO: return <Video size={24} strokeWidth={1.5} />;
    case FileCategory.ARCHIVE: return <Archive size={24} strokeWidth={1.5} />;
    case FileCategory.EXECUTABLE: return <Terminal size={24} strokeWidth={1.5} />;
    case FileCategory.SYSTEM: return <Cpu size={24} strokeWidth={1.5} />;
    case FileCategory.CODE: return <Code size={24} strokeWidth={1.5} />;
    case FileCategory.DOCUMENT: return <FileText size={24} strokeWidth={1.5} />;
    case FileCategory.GAME: return <Gamepad2 size={24} strokeWidth={1.5} />;
    default: return <HardDrive size={24} strokeWidth={1.5} />;
  }
};

export const FileCard: React.FC<FileCardProps> = ({ data, onClick }) => {
  const colorClass = CATEGORY_COLORS[data.category] || 'text-zinc-400 bg-zinc-900/50 border-zinc-800';
  
  // Extract base color name for group-hover effects
  const baseColor = colorClass.split(' ')[0].replace('text-', '').replace('-400', '').replace('-500', '') || 'zinc';

  return (
    <div 
      onClick={() => onClick(data)}
      className="group relative bg-black/60 backdrop-blur-sm border border-zinc-900 rounded-xl p-6 hover:bg-zinc-950 hover:border-zinc-800 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden hover:shadow-2xl h-[260px]"
    >
      {/* Decorative gradient blob */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${baseColor}-500/10 rounded-full blur-3xl group-hover:bg-${baseColor}-500/20 transition-all duration-700 pointer-events-none`}></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-black/50 border border-white/5 ${colorClass.split(' ')[0]} transition-transform duration-500 group-hover:scale-110`}>
            {getIcon(data.category)}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-300 ${colorClass.split(' ')[0]}`}>
            {data.ext}
          </span>
        </div>
        
        <div className="flex-1">
           <h3 className="text-2xl font-bold text-white mb-1 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
            {data.name}
          </h3>
          <p className="text-zinc-500 text-xs font-mono mb-4">{data.category}</p>
          <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">
            {data.description}
          </p>
        </div>

        {/* Bottom bar indicator */}
        <div className={`w-0 group-hover:w-full h-0.5 mt-4 bg-${baseColor}-500/50 transition-all duration-700 ease-out`}></div>
      </div>
    </div>
  );
};
