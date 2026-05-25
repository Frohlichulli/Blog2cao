/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { Mail, Shield, CheckCircle2, FileText, Send, Heart, Eye } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms') => void;
  onAddLead: (lead: any) => void;
}

export function Footer({ onNavigate, onAddLead }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    onAddLead({
      name: 'Inscrição Newsletter',
      email: newsletterEmail,
      phone: '(51) 99999-9999',
      dogName: 'S/N',
      dogBreed: 'S/N',
      serviceInterest: 'Newsletter',
      message: 'Inscrição efetuada no rodapé do blog.',
      type: 'newsletter'
    });

    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-[#D4AF37]/15 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand overview and Newsletter */}
        <div className="md:col-span-5 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#D4AF37] rounded-lg flex items-center justify-center font-serif text-black font-extrabold text-sm">
              CMA
            </div>
            <h4 className="font-serif text-white font-bold tracking-wider uppercase text-sm">
              Cão Meu Amigo
            </h4>
          </div>

          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Unindo cinesiologia de fisioterapia animal e psicologia canina para atingir o maior nível de obediência e bem-estar. Liderado por André Frohlich em Novo Hamburgo e Vale dos Sinos.
          </p>

          {/* Integrated Newsletter */}
          <div className="space-y-3 pt-2">
            <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Inscrição na Newsletter Científica</span>
            {subscribed ? (
              <div className="text-[11px] text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-3.5 py-2 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>E-mail cadastrado com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="bg-[#121212] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none w-full"
                />
                <button
                  type="submit"
                  className="bg-[#004B63] hover:bg-[#D4AF37] text-[#F4E4B5] hover:text-black border border-[#D4AF37]/20 py-2 px-3.5 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3 h-3" /> Assinar
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links Sitemaps */}
        <div className="md:col-span-3 text-left space-y-4">
          <h5 className="font-serif text-white font-semibold text-xs uppercase tracking-wider">Metadados & Sitemap</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Página Inicial / Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('science')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                “A Ciência por Trás”
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Serviços de Obediência
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Artigos Técnicos e Blog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cinema')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Cães no Cinema (Longa 2027)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cms')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left font-semibold">
                Painel CMS Administrativo
              </button>
            </li>
          </ul>
        </div>

        {/* Regional coverage list */}
        <div className="md:col-span-4 text-left space-y-4">
          <h5 className="font-serif text-white font-semibold text-xs uppercase tracking-wider">Cidades com Atendimento RS</h5>
          <div className="space-y-4 text-xs font-light">
            <p className="text-gray-500 leading-relaxed text-[11px]">
              Prestamos serviços em toda a região de cobertura do Vale do Sinos, com preferência e deslocamento agilizado para:
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="bg-gray-900 border border-gray-800 text-gray-300 px-2 py-1 rounded">Novo Hamburgo - RS</span>
              <span className="bg-gray-900 border border-gray-800 text-gray-300 px-2 py-1 rounded">São Leopoldo - RS</span>
              <span className="bg-gray-900 border border-gray-800 text-gray-300 px-2 py-1 rounded">Estância Velha - RS</span>
              <span className="bg-gray-900 border border-gray-800 text-gray-300 px-2 py-1 rounded">Sapiranga - RS</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copy legal and deployment compatibility tags */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-650">
        <div>
          <span>© 2026 Cão Meu Amigo Adestramento. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX. Novo Hamburgo - RS.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Heart className="w-3" /> Fisioterapia Animal & Comportamento
          </span>
          <span>|</span>
          <span className="text-emerald-500 hover:underline cursor-pointer" title="Hospedagem Hostinger, domínio próprio e suporte para WordPress e Vite">
            Vite / WordPress / Hostinger OK
          </span>
        </div>
      </div>
    </footer>
  );
}
