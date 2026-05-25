/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Sparkles, Shield, UserCheck, Search, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms';
  onNavigate: (view: 'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms') => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export function Navbar({ currentView, onNavigate, searchTerm, onSearchChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { view: 'home' as const, label: 'Início' },
    { view: 'science' as const, label: 'A Ciência por Trás' },
    { view: 'services' as const, label: 'Serviços Elite' },
    { view: 'blog' as const, label: 'Artigos & Blog' },
    { view: 'cinema' as const, label: 'Cães no Cinema' },
  ];

  const handleItemClick = (view: 'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms') => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="h-9 w-9 bg-gradient-to-br from-[#A1801F] to-[#D4AF37] rounded-xl flex items-center justify-center p-0.5 border border-[#D4AF37]/30 transform group-hover:rotate-6 transition-transform">
            <span className="font-serif text-black font-extrabold text-sm tracking-tighter">CMA</span>
          </div>
          <div>
            <h1 className="font-serif text-xs md:text-sm text-white font-bold tracking-wider uppercase leading-none group-hover:text-[#F4E4B5] transition-colors">
              Cão Meu Amigo
            </h1>
            <span className="text-[9px] text-[#D4AF37] font-mono block mt-0.5 tracking-widest">ADESTRAMENTO DE ELITE</span>
          </div>
        </div>

        {/* Desktop Menu links */}
        <div className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleItemClick(item.view)}
              className={`font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg ${
                currentView === item.view 
                  ? 'bg-[#004B63] text-[#F4E4B5] border border-[#D4AF37]/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search bar inside navigation for extreme UX */}
        <div className="hidden md:flex items-center relative max-w-44 lg:max-w-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar artigos..."
            className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37]/50 rounded-full py-1.5 pl-8 pr-3 text-xs text-gray-300 outline-none transition-colors font-mono"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
        </div>

        {/* Highlight CMS Console and Mobile buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleItemClick('cms')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest font-bold border transition-all cursor-pointer ${
              currentView === 'cms'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-transparent text-[#F4E4B5] border-[#D4AF37]/30 hover:bg-[#D4AF37]/10'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> André Frohlich CMS
          </button>

          {/* Hamburger trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 border-b border-[#D4AF37]/20 px-6 py-6 space-y-4 animate-in fade-in duration-300">
          {/* Mobile search */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar ciência canina..."
              className="w-full bg-[#121212] border border-[#D4AF37]/10 rounded-full py-2 pl-9 pr-4 text-xs text-gray-300 outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleItemClick(item.view)}
                className={`w-full text-left py-2.5 px-4 rounded-xl cursor-pointer ${
                  currentView === item.view 
                    ? 'bg-[#004B63] text-[#F4E4B5] border border-[#D4AF37]/25' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleItemClick('cms')}
              className={`w-full text-left py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 ${
                currentView === 'cms' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'text-[#F4E4B5] hover:bg-[#D4AF37]/10'
              }`}
            >
              <UserCheck className="w-4 h-4" /> André Frohlich CMS (Entrar)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
