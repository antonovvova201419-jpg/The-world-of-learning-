import React, { useState, useMemo } from 'react';
import { FILE_DATABASE, CATEGORY_COLORS } from './constants';
import { FileExtensionData, FileCategory } from './types';
import { FileCard } from './components/FileCard';
import { DetailView } from './components/DetailView';
import { Search, Database, Menu, X, Filter } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileExtensionData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredData = useMemo(() => {
    return FILE_DATABASE.filter(file => {
      const matchesCategory = selectedCategory === 'ALL' || file.category === selectedCategory;
      const matchesSearch = 
        file.ext.toLowerCase().includes(searchQuery.toLowerCase()) || 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = Object.values(FileCategory);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-white/30 selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
              <div className="p-2 bg-white text-black rounded-lg group-hover:scale-105 transition-transform duration-300">
                <Database size={20} strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white group-hover:tracking-wide transition-all duration-300">
                FILE<span className="text-zinc-500">WIKI</span>
              </h1>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="text"
                placeholder="Поиск расширения (например: .vpk, .exe)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-2.5 pl-11 pr-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:bg-zinc-900 focus:border-zinc-600 transition-all"
              />
            </div>

            <button 
              className="md:hidden p-2 text-zinc-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            
            <div className="hidden md:block text-zinc-500 text-xs font-mono">
              DB_VERSION: 2.0.4 // NO_AI_MODE
            </div>
          </div>
        </header>

        {/* Mobile Search */}
        <div className="md:hidden px-4 py-4 bg-black border-b border-zinc-900">
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
             <input 
               type="text"
               placeholder="Поиск..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-11 pr-4 text-sm text-zinc-200"
             />
          </div>
        </div>

        <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className={`
            fixed inset-0 z-30 bg-black pt-24 px-6 md:pt-0 md:px-0 md:static md:bg-transparent md:w-64 md:block flex-shrink-0 transition-transform duration-300 border-r border-zinc-900 md:border-none
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6 px-2 text-zinc-500 uppercase text-xs font-bold tracking-widest">
                <Filter size={12} />
                Фильтры
              </div>
              
              <div className="space-y-1">
                <button 
                  onClick={() => { setSelectedCategory('ALL'); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === 'ALL' 
                      ? 'bg-white text-black shadow-lg shadow-white/5' 
                      : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  Все категории
                </button>
                
                <div className="h-px bg-zinc-900 my-4 mx-2"></div>

                {categories.map(cat => {
                   const colorClass = CATEGORY_COLORS[cat] || '';
                   // Get pure color name for dot
                   const accent = colorClass.match(/text-([a-z]+)-[0-9]+/)?.[1] || 'zinc';
                   const isSelected = selectedCategory === cat;

                   return (
                    <button 
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setMobileMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? 'bg-zinc-900 text-white' 
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                      }`}
                    >
                      {cat}
                      <span className={`w-1.5 h-1.5 rounded-full bg-${accent}-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} transition-opacity`}></span>
                    </button>
                   );
                })}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <section className="flex-1">
            <div className="mb-8 flex items-end justify-between border-b border-zinc-900 pb-4">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                {selectedCategory === 'ALL' ? 'База знаний' : selectedCategory}
              </h2>
              <div className="text-right hidden sm:block">
                 <div className="text-3xl font-thin text-zinc-700">{filteredData.length.toString().padStart(2, '0')}</div>
              </div>
            </div>

            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                {filteredData.map(file => (
                  <FileCard 
                    key={file.ext} 
                    data={file} 
                    onClick={setSelectedFile} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 border border-zinc-900 rounded-2xl bg-zinc-950/30">
                 <div className="p-4 bg-zinc-900 rounded-full mb-4 opacity-50">
                    <Database size={32} className="text-zinc-600" />
                 </div>
                 <p className="text-zinc-500 font-mono text-sm">Объекты не найдены в секторе</p>
              </div>
            )}
          </section>

        </main>
      </div>

      {selectedFile && (
        <DetailView 
          data={selectedFile} 
          onClose={() => setSelectedFile(null)} 
        />
      )}
    </div>
  );
}
