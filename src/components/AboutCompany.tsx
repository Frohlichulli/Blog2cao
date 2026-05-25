/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Shield, Heart, Medal, Activity, Sliders } from 'lucide-react';

export function AboutCompany() {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      
      {/* Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Visual photo and metrics */}
        <div className="lg:col-span-5 relative max-w-md mx-auto">
          {/* Decorative outline border representing architecture */}
          <div className="absolute inset-4 border border-[#D4AF37]/30 transform translate-x-4 translate-y-4 rounded-2xl z-0"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80" 
            alt="André Frohlich Adestrador de elite"
            referrerPolicy="no-referrer"
            className="rounded-2xl border border-[#D4AF37]/20 relative z-10 class-shadow w-full aspect-[4/5] object-cover"
          />

          <div className="absolute -bottom-6 -left-6 bg-[#004B63] border border-[#D4AF37]/20 rounded-2xl p-4 md:p-5 z-20 shadow-2xl relative-box max-w-[200px]">
            <span className="text-3xl font-serif font-extrabold text-white block">18 Anos</span>
            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest block mt-1">De pesquisa canina aplicada no RS</span>
          </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121212] border border-[#D4AF37]/25 rounded-full text-[10px] font-mono tracking-widest text-[#F4E4B5] uppercase w-fit">
            <Medal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Fundador & Diretor Técnico</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight">
            André Frohlich: <br />
            <span className="gold-gradient-text italic font-serif font-normal">A Fusão de Fisioterapia e Comportamento</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed font-light">
            A história da **Cão Meu Amigo Adestramento** é pautada pela inquietude científica de seu fundador, **André Frohlich**. Com formação consolidada em fisioterapia aplicada ao movimento corporal, cinesiologia humana e biomecânica ortopédica, André percebeu que o comportamento canino e a estrutura física do animal de estimação operam de forma interligada.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed font-light">
            Ao longo de quase duas décadas atuando em Novo Hamburgo, São Leopoldo e região metropolitana, André desenvolveu uma metodologia exclusiva que une a bio-reabilitação proprioceptiva e o adestramento sem violências. Ele atua também como professor de cursos extensivos para Terapia Assistida por Animais (TAA) e é o preparador homologado do longa-metragem cinematográfico nacional **“Anfitriãs” (previsto para 2027)**.
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-900 mt-6 md:text-xs">
            <div className="flex gap-2.5 items-start">
              <GraduationCap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm font-serif">Formação de Elite</strong>
                <span className="text-xs text-gray-400 leading-normal font-light">
                  Pesquisador do comportamento neurobiológico canino com formação continuada em fisioterapia articular aplicada.
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <Activity className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm font-serif">Biomecânica do Dorso</strong>
                <span className="text-xs text-gray-400 leading-normal font-light">
                  Estuda o deslocamento do peso e tensões ocultas na coluna para afastar desconfortos do animal.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
        {/* Soft layout background */}
        <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-[#004B63]/5 blur-3xl"></div>

        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">OS PILARES METODOLÓGICOS</span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#F4E4B5] font-bold">Respeito à Individualidade Biológica</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            Não existem receitas mágicas ou pacotes genéricos de treinamento na Cão Meu Amigo. Cada cão carrega uma bagagem genética, anatômica e metabólica distinta. Respeitamos os ritmos de maturação sináptica e preservamos a estrutura articular diante de cada comando ensinado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#D4AF37]/5 space-y-2">
            <Sliders className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif text-white font-semibold text-sm">Controle Neuromuscular</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Ensinamos o cão a ter controle sobre os próprios impulsos reativos através de dinâmicas corporais reguladoras da ansiedade.
            </p>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#D4AF37]/5 space-y-2">
            <Heart className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif text-white font-semibold text-sm">Sensibilidade & Emoção</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Acolhemos os medos do cachorro com dessensibilização cirúrgica, elevando os limites de tolerância sem assustar o animal.
            </p>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#D4AF37]/5 space-y-2">
            <GraduationCap className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif text-white font-semibold text-sm">Educação Sistêmica</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Capacitamos cães-guia e de suporte assistencial, promovendo verdadeira acessibilidade legal no Rio Grande do Sul.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
