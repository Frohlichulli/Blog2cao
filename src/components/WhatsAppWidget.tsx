/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, MapPin } from 'lucide-react';

interface WhatsAppWidgetProps {
  onAddLead: (lead: {
    name: string;
    email: string;
    phone: string;
    dogName: string;
    dogBreed: string;
    serviceInterest: string;
    message: string;
    type: 'evaluation';
  }) => void;
}

export function WhatsAppWidget({ onAddLead }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [service, setService] = useState('Adestramento Básico');
  const [city, setCity] = useState('Novo Hamburgo');
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !dogName) return;

    // Build perfect professional message for André Frohlich
    const baseText = `Olá André! Vi o blog Cão Meu Amigo Adestramento e gostaria de agendar uma avaliação.
Meus Dados:
- Nome: ${name}
- Cidade: ${city} (Região Vale dos Sinos)
- Cão: ${dogName}${dogBreed ? ` (${dogBreed})` : ''}
- Interesse: ${service}
- Contato: ${phone}`;

    const encodedText = encodeURIComponent(baseText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5551996566493&text=${encodedText}`;

    // Add lead locally in CMD system
    onAddLead({
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@exemplo.com`,
      phone,
      dogName,
      dogBreed,
      serviceInterest: service,
      message: `Solicitação via WhatsApp flutuante de agendamento em ${city}.`,
      type: 'evaluation'
    });

    // Reset and open link
    window.open(whatsappUrl, '_blank');
    setStep(2);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setDogName('');
    setDogBreed('');
    setService('Adestramento Básico');
    setCity('Novo Hamburgo');
    setStep(1);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="btn-whatsapp-floating"
          className="relative bg-[#004B63] hover:bg-[#25D366] text-[#F4E4B5] hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-[#D4AF37]/30 hover:border-emerald-400 group cursor-pointer group-hover:scale-110"
          title="Fale Conosco no WhatsApp"
        >
          {/* Custom pulsing ring indicating urgent and premium service */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4AF37]/10 animate-ping opacity-60"></span>
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-xs font-semibold uppercase tracking-widest pl-0 group-hover:pl-2">
            Avaliação Científica
          </span>
        </button>
      )}

      {/* Elegant Black-Gold Dialog Box */}
      {isOpen && (
        <div
          id="whatsapp-floater-card"
          className="w-80 md:w-96 rounded-2xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 bg-[#0A0A0A] text-gray-100"
        >
          {/* Header */}
          <div className="bg-[#004B63] px-5 py-4 flex items-center justify-between border-b border-[#D4AF37]/10">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-[#F4E4B5] tracking-wider uppercase">
                  Cão Meu Amigo
                </h3>
                <p className="text-[10px] text-gray-400 font-mono">SUPORTE EXCLUSIVO COM ANDRÉ</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Preencha os dados e converse diretamente com <strong className="text-[#D4AF37]">André Frohlich</strong> para avaliar a biomecânica e o comportamento do seu cão no Vale dos Sinos.
                </p>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Fabiano Martins"
                    className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">
                      Cão (Nome) *
                    </label>
                    <input
                      type="text"
                      required
                      value={dogName}
                      onChange={(e) => setDogName(e.target.value)}
                      placeholder="Ex: Thor"
                      className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">
                      Raça
                    </label>
                    <input
                      type="text"
                      value={dogBreed}
                      onChange={(e) => setDogBreed(e.target.value)}
                      placeholder="Ex: Golden / SRD"
                      className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">
                      Sua Cidade
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-2 py-2 text-xs text-gray-200 outline-none"
                    >
                      <option value="Novo Hamburgo">Novo Hamburgo</option>
                      <option value="São Leopoldo">São Leopoldo</option>
                      <option value="Estância Velha">Estância Velha</option>
                      <option value="Sapiranga">Sapiranga</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(51) 99656-6493"
                      className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">
                    Serviço de Interesse
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none cursor-pointer"
                  >
                    <option value="Adestramento Básico">Adestramento Básico</option>
                    <option value="Adestramento Avançado">Adestramento Avançado</option>
                    <option value="Socialização Canina">Socialização Canina</option>
                    <option value="Adestramento Sanitário">Adestramento Sanitário</option>
                    <option value="Cães para Cinema e TV">Cães para Cinema e TV</option>
                    <option value="Terapia Assistida por Animais">Terapia Assistida (TAA)</option>
                    <option value="Cães de Assistência e Serviço">Cão de Assistência</option>
                    <option value="Consultoria Comportamental">Consultoria Comportamental</option>
                    <option value="Correção de Desvios Comportamentais">Correção Comportamental</option>
                    <option value="Programa VIP Premium">Treinamento Personalizado VIP</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Enviar Mensagem Segura
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-[#F4E4B5] text-base">Solicitação Enviada!</h4>
                  <p className="text-xs text-gray-400 mt-2">
                    O WhatsApp foi aberto em uma aba externa com a mensagem formatada para André Frohlich.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={resetForm}
                    className="text-xs text-[#D4AF37] hover:text-[#F4E4B5] underline cursor-pointer"
                  >
                    Fazer outra solicitação
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-between items-center text-[9px] text-gray-500 font-mono border-t border-[#D4AF37]/5 pt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" /> Novo Hamburgo - RS
              </span>
              <span>100% Criptografado & Seguro</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
