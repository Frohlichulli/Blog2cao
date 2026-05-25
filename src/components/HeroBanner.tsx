/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Calendar, FileText, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

interface HeroBannerProps {
  onNavigate: (view: 'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms') => void;
  onNavigateToService: (categorySlug: string) => void;
}

export function HeroBanner({ onNavigate, onNavigateToService }: HeroBannerProps) {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black/90 pt-16">
      {/* Background cinematic overlay with ambient soft pulsing lights */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1920&q=80" 
          alt="Cão de Elite Posição de Foco"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/80 to-transparent"></div>
        {/* Soft radial petroleum blue light flares */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#004B63]/30 blur-[130px] ambient-overlay"></div>
        <div className="absolute -bottom-45 -right-45 h-[600px] w-[600px] rounded-full bg-brand-teal/10 blur-[150px] ambient-overlay"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 text-center md:text-left grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left column text props */}
        <div className="md:col-span-8 space-y-6">
          {/* Label callout */}
          <div className="inline-block px-3 py-1 bg-[#004B63]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] sm:text-xs tracking-tighter uppercase w-fit animate-in fade-in slide-in-from-top-4 duration-500">
            <span>18 Anos de Excelência Técnica ● Vale dos Sinos RS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight font-medium">
            Cão Meu Amigo <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-light font-serif">Adestramento Científico</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
            Elevando o comportamento canino ao patamar da ciência. Unimos <strong className="text-[#F4E4B5] font-medium">Fisioterapia aplicada, Biomecânica de marcha e Psicologia do aprendizado</strong> para construir conexões emocionais profundas e um foco inabalável, livres de coação ou violência.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-xl text-left">
            <div className="border-l border-[#D4AF37]/40 pl-3">
              <span className="block font-serif text-xl sm:text-2xl font-semibold text-white">18+ Anos</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">De dedicação e pesquisa</span>
            </div>
            <div className="border-l border-[#D4AF37]/40 pl-3">
              <span className="block font-serif text-xl sm:text-2xl font-semibold text-white">André Frohlich</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Fisioterapeuta Diretor</span>
            </div>
            <div className="border-l border-[#D4AF37]/40 pl-3 col-span-2 sm:col-span-1">
              <span className="block font-serif text-xl sm:text-2xl font-semibold text-white">Cinema Elite</span>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-medium">Anfitriãs (2027)</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6">
            <button
              onClick={() => {
                const element = document.getElementById('contact-form-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold uppercase tracking-wider py-3.5 px-6 rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-102"
            >
              <Calendar className="w-4 h-4" /> Agendar Avaliação
            </button>
            
            <button
              onClick={() => onNavigate('blog')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-gray-700 hover:border-[#D4AF37] py-3.5 px-6 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gray-500" /> Ler Artigos Científicos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right column bento promo box */}
        <div className="md:col-span-4 bg-[#121212]/80 border border-[#D4AF37]/15 rounded-2xl p-6 relative flex flex-col justify-between h-fit space-y-6 cinema-shadow max-w-md mx-auto">
          {/* subtle gold corner frame decorations representing technical drafting */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/40"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/40"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/40"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/40"></div>

          <div className="space-y-4">
            <h3 className="font-serif text-[#F4E4B5] text-base font-semibold uppercase tracking-wider">A Diferencial de Ciência</h3>
            
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-normal">
                  <strong className="text-white font-medium">Fisioterapia & Comportamento:</strong> Cães que rosnam ou saltam desordenados podem esconder dores lombares. Nós as identificamos com exames biomecânicos.
                </p>
              </div>

              <div className="flex gap-2.5 items-start">
                <GraduationCap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-normal">
                  <strong className="text-white font-medium">Metodologia André Frohlich:</strong> Biomecânica neuromuscular aplicada à mente. Obediência refinada sem estresses prejudiciais.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] p-3 rounded-xl border border-[#D4AF37]/10 grid grid-cols-2 gap-2 text-center text-xs">
            <button
              onClick={() => onNavigateToService('adestramento-basico')}
              className="text-[#F4E4B5] hover:text-white hover:underline block text-center font-serif font-bold text-xs cursor-pointer py-1.5"
            >
              Adestramento Básico
            </button>
            <button
              onClick={() => onNavigateToService('caes-para-cinema-e-publicidade')}
              className="text-[#F4E4B5] hover:text-white hover:underline block text-center font-serif font-bold text-xs cursor-pointer py-1.5 border-l border-gray-850"
            >
              Cães para Cinema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
