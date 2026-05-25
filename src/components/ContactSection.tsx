/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  Map, MessageSquare, Instagram, Facebook, ShieldCheck 
} from 'lucide-react';

interface ContactSectionProps {
  onAddLead: (lead: {
    name: string;
    email: string;
    phone: string;
    dogName: string;
    dogBreed: string;
    serviceInterest: string;
    message: string;
    type: 'contact';
  }) => void;
}

export function ContactSection({ onAddLead }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [interest, setInterest] = useState('Adestramento Básico');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !dogName) return;

    onAddLead({
      name,
      email,
      phone,
      dogName,
      dogBreed,
      serviceInterest: interest,
      message: message || 'Interesse geral de avaliação.',
      type: 'contact'
    });

    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setDogName('');
    setDogBreed('');
    setMessage('');
    setInterest('Adestramento Básico');
  };

  return (
    <div id="contact-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-6">
      
      {/* Information channels */}
      <div className="lg:col-span-5 space-y-6 text-left">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">ATENDIMENTO DE ELITE</span>
          <h2 className="text-3xl font-serif text-white font-bold">Entre em Contato Conosco</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Agende um diagnóstico inicial com o especialista André Frohlich. Atendemos residências e condomínios no Vale dos Sinos.
          </p>
        </div>

        {/* Channels lists */}
        <div className="space-y-4">
          <div className="flex gap-3.5 items-center bg-[#121212] border border-[#D4AF37]/5 p-4 rounded-xl">
            <div className="h-10 w-10 bg-[#004B63] text-[#F4E4B5] border border-[#D4AF37]/20 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono text-gray-400">Telefone & WhatsApp</span>
              <a href="https://api.whatsapp.com/send?phone=5551996566493" target="_blank" rel="noreferrer" className="text-xs sm:text-sm text-white hover:text-[#D4AF37] block transition-colors">
                (51) 99656-6493
              </a>
            </div>
          </div>

          <div className="flex gap-3.5 items-center bg-[#121212] border border-[#D4AF37]/5 p-4 rounded-xl">
            <div className="h-10 w-10 bg-[#004B63] text-[#F4E4B5] border border-[#D4AF37]/20 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono text-gray-400">E-mail de Contato</span>
              <span className="text-xs sm:text-sm text-white block">fabianofisio@gmail.com</span>
            </div>
          </div>

          <div className="flex gap-3.5 items-center bg-[#121212] border border-[#D4AF37]/5 p-4 rounded-xl">
            <div className="h-10 w-10 bg-[#004B63] text-[#F4E4B5] border border-[#D4AF37]/20 rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono text-gray-400">Horário de Atendimento</span>
              <span className="text-xs sm:text-sm text-white block">Segunda à Sábado: 08:00 - 19:00</span>
            </div>
          </div>
        </div>

        {/* Local Social Integrals */}
        <div className="space-y-3">
          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Canais Digitais Oficiais</span>
          <div className="flex gap-3">
            <a href="https://instagram.com/caomeuamigo_adestramento" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-2 bg-[#121212] hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:text-white border border-[#D4AF37]/10 rounded-xl text-xs text-gray-300 transition-all">
              <Instagram className="w-4 h-4" /> Instagram Direct
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 p-2 bg-[#121212] hover:bg-[#004B63] hover:text-white border border-[#D4AF37]/10 rounded-xl text-xs text-gray-300 transition-all">
              <Facebook className="w-4 h-4" /> Facebook Page
            </a>
          </div>
        </div>
      </div>

      {/* Scheduler Form panel */}
      <div className="lg:col-span-7 bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-6 sm:p-8 cinema-shadow text-left">
        <h3 className="font-serif text-[#F4E4B5] text-lg font-bold border-b border-gray-800 pb-2 mb-4">
          Agendamento de Diagnóstico Clínico
        </h3>

        {success ? (
          <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
            <div className="h-12 w-12 rounded-full bg-[#004B63] border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif text-white text-base">Solicitação Registrada!</h4>
              <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                André Frohlich recebeu sua ficha com sucesso. Entraremos em contato para formalizar o dia e horário de avaliação no Vale dos Sinos.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="text-xs text-[#D4AF37] hover:text-[#F4E4B5] underline mt-3 cursor-pointer"
            >
              Fazer outra solicitação
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Fabiano Martins"
                  className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Seu E-mail de Contato *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail favorito"
                  className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">WhatsApp de Contato *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(51) 99656-6493"
                  className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Nome do Cão *</label>
                <input
                  type="text"
                  required
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  placeholder="Ex: Max"
                  className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Raça ou Tipo</label>
                <input
                  type="text"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  placeholder="Ex: Border Collie / SRD"
                  className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Área Terapêutica de Interesse</label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none cursor-pointer"
              >
                <option value="Adestramento Básico">Adestramento Básico</option>
                <option value="Adestramento Avançado">Adestramento Avançado</option>
                <option value="Socialização Canina">Socialização Canina</option>
                <option value="Adestramento Sanitário">Adestramento Sanitário (Apartamentos)</option>
                <option value="Cães para Cinema e Publicidade">Cães atores para Cinema & TV</option>
                <option value="Terapia Assistida por Animais">Terapia Assistida (TAA)</option>
                <option value="Cães de Assistência">Cães de Assistência e Serviço</option>
                <option value="Consultoria Comportamental">Consultoria Comportamental</option>
                <option value="Correção de Desvios Comportamentais">Correção Comportamental</option>
                <option value="Treinamento VIP Personalizado">Programa Personalizado VIP</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Escreva detalhes do comportamento do seu cão</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Ex: Meu cão puxa excessivamente na coleira e rosna contra cães ao passear de guia."
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold py-3 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <Send className="w-3.5 h-3.5" /> Enviar Ficha de Avaliação
            </button>
          </form>
        )}
      </div>

      {/* Map simulation wrapper */}
      <div className="lg:col-span-12 space-y-4">
        <h4 className="font-serif text-[#F4E4B5] text-[15px] underline decoration-[#D4AF37]/25 underline-offset-4 text-center">
          Área de Operação Técnica e Atendimento Domiciliar Vale do Sinos
        </h4>

        {/* Matrix-grid structured map canvas */}
        <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-6 h-60 flex flex-col justify-between relative overflow-hidden cinema-shadow">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          
          {/* Simulated satellite vector layers of cities */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 relative z-10 w-full max-w-lg">
            
            {/* Novo Hamburgo core node */}
            <div className="flex items-center gap-2 text-white font-serif font-bold text-xs">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span>NOVO HAMBURGO (Sede Central Integrada)</span>
            </div>

            {/* Satellite coverage branches */}
            <div className="grid grid-cols-3 gap-8 text-center text-[10px] font-mono text-gray-400">
              <div className="flex flex-col items-center">
                <MapPin className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span className="text-white mt-1">SÃO LEOPOLDO</span>
                <span className="text-[8px] text-gray-500">Guimarães / Feitoria</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span className="text-white mt-1">ESTÂNCIA VELHA</span>
                <span className="text-[8px] text-gray-500">Rincão / Centro</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span className="text-white mt-1">SAPIRANGA</span>
                <span className="text-[8px] text-gray-500">Centenário / RS-239</span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 relative z-10 border-t border-gray-900 pt-3">
            <span>SISTEMA DE MAPEAMENTO DE GEO-ATENDIMENTO REGIONAL</span>
            <span className="text-emerald-400">● Mapeamento Ativo (100% On-site)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
