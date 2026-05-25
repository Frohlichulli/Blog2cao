/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { Service } from '../types';
import { servicesData } from '../data/services';
import { 
  Compass, Award, Users, Sparkles, Tv, Heart, Shield, 
  MessageSquare, Activity, Sliders, ChevronDown, ChevronUp, 
  ArrowLeft, Send, CheckCircle2, MapPin, SearchCheck 
} from 'lucide-react';

interface ServicesGridProps {
  onAddLead: (lead: any) => void;
  selectedServiceSlug: string | null;
  onClearServiceSelection: () => void;
  onSelectServiceSlug: (slug: string) => void;
}

// Icon mapper helper
const IconMap: { [key: string]: any } = {
  Compass,
  Award,
  Users,
  Sparkles,
  Tv,
  Heart,
  Shield,
  MessageSquare,
  Activity,
  Sliders,
};

export function ServicesGrid({ 
  onAddLead, 
  selectedServiceSlug, 
  onClearServiceSelection,
  onSelectServiceSlug 
}: ServicesGridProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Form states for in-service estimate booking
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Selected Service
  const service = servicesData.find(s => s.slug === selectedServiceSlug);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleBookService = (e: React.FormEvent, serviceTitle: string) => {
    e.preventDefault();
    if (!name || !phone || !dogName) return;

    onAddLead({
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@atendimento.com`,
      phone,
      dogName,
      dogBreed,
      serviceInterest: serviceTitle,
      message: `Lead capturado via formulário interno da página de serviço detalhado de ${serviceTitle}.`,
      type: 'evaluation'
    });

    setIsBooked(true);
    setName('');
    setPhone('');
    setDogName('');
    setDogBreed('');
  };

  if (service) {
    const IconComponent = IconMap[service.icon] || Compass;

    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        {/* Back navigation */}
        <button
          onClick={() => {
            onClearServiceSelection();
            setIsBooked(false);
          }}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-[#F4E4B5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Grade de Serviços
        </button>

        {/* Big visual header for detailed service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cover & Explanatory Texts */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#D4AF37]/15">
              <img 
                src={service.coverImage} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3.5">
                <div className="h-12 w-12 bg-[#004B63] border border-[#D4AF37]/30 rounded-xl text-[#F4E4B5] flex items-center justify-center shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">DIAGNÓSTICO PREMIUM</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-bold leading-tight">{service.title}</h2>
                </div>
              </div>
            </div>

            {/* Scientific explanation paragraphs */}
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
              <p className="text-white text-base md:text-lg font-serif italic mb-6">
                "{service.subtitle}"
              </p>
              {service.description.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Benefits box list */}
            <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-[#F4E4B5] text-base font-semibold uppercase tracking-wider">Benefícios Clínicos & Comportamentais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-300 leading-normal">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-4">
              <h3 className="font-serif text-[#F4E4B5] text-base font-semibold uppercase tracking-wider">Perguntas Frequentes (F.A.Q.)</h3>
              <div className="space-y-2.5">
                {service.faqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="border border-[#D4AF37]/10 rounded-xl overflow-hidden bg-[#121212]/30"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left text-xs md:text-sm font-serif font-semibold text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {openFaqIdx === idx ? <ChevronUp className="w-4 h-4 text-[#D4AF37]" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>
                    {openFaqIdx === idx && (
                      <div className="px-5 pb-4 pt-1 text-xs text-gray-400 leading-relaxed border-t border-[#D4AF37]/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Action contact form plus SEO inspection detail */}
          <div className="lg:col-span-4 space-y-6">
            {/* Action booking card */}
            <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-6 cinema-shadow text-left space-y-4 relative">
              <h3 className="font-serif text-[#F4E4B5] text-base font-semibold uppercase tracking-wide border-b border-gray-800 pb-2">Agendar Avaliação</h3>
              
              {isBooked ? (
                <div className="py-8 text-center space-y-4">
                  <div className="h-10 w-10 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center rounded-full mx-auto animate-pulse">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-white text-sm font-semibold">Plano de Treino Solicitado!</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      André Frohlich recebeu sua solicitação técnica para {service.title}. Entraremos em contato via telefone em Novo Hamburgo / Região em breve.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBooked(false)}
                    className="text-xs text-[#D4AF37] hover:text-[#F4E4B5] underline cursor-pointer"
                  >
                    Fazer outro agendamento
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => handleBookService(e, service.title)} className="space-y-3">
                  <p className="text-xs text-gray-400">
                    Preencha o microformulário abaixo e garanta o monitoramento do adestrador André Frohlich.
                  </p>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono mb-1">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Fabiano Martins"
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono mb-1">Cão (Nome) *</label>
                      <input
                        type="text"
                        required
                        value={dogName}
                        onChange={(e) => setDogName(e.target.value)}
                        placeholder="Ex: Thor"
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-2 py-2 text-xs text-gray-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono mb-1">Raça do Pet</label>
                      <input
                        type="text"
                        value={dogBreed}
                        onChange={(e) => setDogBreed(e.target.value)}
                        placeholder="Ex: Pastor Alemão"
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-2 py-2 text-xs text-gray-200 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono mb-1">Contato Telefônico *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(51) 99656-6493"
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold uppercase tracking-wider py-2.5 rounded-lg text-[10px] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md mt-2"
                  >
                    <Send className="w-3 h-3" /> Solicitar Avaliação Física
                  </button>
                </form>
              )}
            </div>

            {/* Quick contact alternative */}
            <div className="bg-[#004B63]/20 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#45A29E] uppercase block">CONTATO IMEDIATO</span>
              <p className="text-xs text-gray-300">Gostaria de agilizar o contato pelo WhatsApp agora mesmo?</p>
              <a
                href={`https://api.whatsapp.com/send?phone=5551996566493&text=Ola%20Andre!%20Gostaria%20de%20conversar%20sobre%20${encodeURIComponent(service.title)}%20para%20o%20meu%2520cao.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-[10px] uppercase font-bold py-2 px-4 rounded-xl shadow-lg hover:scale-103 active:scale-98 transition-all"
              >
                Conversar no WhatsApp
              </a>
            </div>

            {/* SEO & IA Grounding diagnostics display for prospective web masters */}
            <div className="bg-black/95 p-5 border border-gray-800 rounded-2xl space-y-3.5 font-mono text-[10px]">
              <span className="flex items-center gap-1.5 text-[#D4AF37] uppercase font-bold">
                <SearchCheck className="w-3.5 h-3.5" /> Metadados SEO Ocultos & IA SGE
              </span>

              <div className="space-y-2 border-t border-gray-900 pt-2.5 text-gray-400 leading-normal">
                <div>
                  <span className="text-gray-500">SEO Title Tag:</span>
                  <p className="text-gray-300 text-[11px] font-sans mt-0.5 leading-tight">{service.seoTitle}</p>
                </div>
                <div>
                  <span className="text-gray-500">Meta Description invisível:</span>
                  <p className="text-gray-400 font-sans mt-0.5 leading-relaxed italic">"{service.metaDescription}"</p>
                </div>
                <div>
                  <span className="text-gray-500">Palavras-chave ocultas injetadas no markup:</span>
                  <div className="flex flex-wrap gap-1 mt-1 font-mono">
                    {service.keywords.map((kw, i) => (
                      <span key={i} className="bg-gray-900 border border-gray-800 text-gray-500 px-1 rounded">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 pt-1 text-[9px] uppercase tracking-wider font-extrabold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Compatível com robôs do ChatGPT e Google Discover
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif text-white tracking-wide">
          Nossos Serviços Especializados
        </h2>
        <p className="text-sm text-gray-400 font-light leading-relaxed">
          Cada programa foi desenvolvido sob os rigores da cinesiologia motora e psicologia comportamental. Escolha uma das divisões para ver detalhes, FAQs e estimativas:
        </p>
      </div>

      {/* Bento grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((ser) => {
          const IconComponent = IconMap[ser.icon] || Compass;
          return (
            <div
              key={ser.id}
              onClick={() => onSelectServiceSlug(ser.slug)}
              id={`service-card-${ser.id}`}
              className="group bg-[#121212] hover:bg-[#1A202C]/45 border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden cinema-shadow transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between flex-grow"
            >
              <div>
                {/* Photo cover with overlay color */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img 
                    src={ser.coverImage} 
                    alt={ser.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-[#121212]/85 border border-[#D4AF37]/20 p-2.5 rounded-xl text-[#F4E4B5]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-[#F4E4B5] text-base group-hover:text-white font-semibold leading-snug transition-colors">
                    {ser.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 font-light">
                    {ser.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer action indicator */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-900 mt-auto text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#D4AF37] transition-colors" /> Novo Hamburgo & Região
                </span>
                <span>Explorar Ciência</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
