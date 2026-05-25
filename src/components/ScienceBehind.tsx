/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, ShieldCheck, Zap, Dumbbell, Sparkles, BrainCircuit } from 'lucide-react';

export function ScienceBehind() {
  const scienceFacts = [
    {
      title: 'Dores Articulatórias e Reatividade Súbita',
      desc: 'Muitos cães diagnosticados como bravos ou bravios na guia escondem inflamações severas no tendão de Aquiles, ligamentos ou na junção coxofemoral posterior. Quando forçados a andar, reagem agressivamente ao estresse mecânico da guia.'
    },
    {
      title: 'Cinesiologia e Análise da Marcha (Gait Assessment)',
      desc: 'Antes de elaborar qualquer cronograma de adestramento de elite, André Frohlich analisa a locomoção dinâmica do cão. Identificamos assimetrias no apoio das patas, claudicações ocultas e reduções imprevistas do arco articular da coluna.'
    },
    {
      title: 'Estabilidade Neuromuscular & Autocontrole',
      desc: 'O treinamento proprioceptivo utiliza equipamentos especiais (meias táticas infláveis, tábuas de balanço e rampas). Eles fortalecem as cadeias internas proprioceptivas que mandam sinais calmantes diretos ao córtex cerebral canino.'
    },
    {
      title: 'Ausência Absoluta de Medo Ativo (Cortisol Control)',
      desc: 'O stresse excessivo bloqueia as conexões sinápticas. Evitamos castigos tardios ou puxões mecânicos bruscos. Trabalhamos exclusivamente para rebaixar os níveis de cortisol, garantindo que o cão aprenda com prazer e consolide o foco.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* Intro visual header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B63]/10 border border-[#D4AF37]/30 rounded-full text-[10px] font-mono tracking-widest text-[#F4E4B5] uppercase">
          <BrainCircuit className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>A Ciência por Trás do Adestramento</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight">
          Por que a Biomecânica do Cão dita <br />
          <span className="gold-gradient-text italic font-serif font-normal">o seu Comportamento?</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
          A maioria dos adestradores tradicionais encara o cão como uma máquina mecânica de estímulo e resposta visual. Nossos estudos apontam que o bem-estar mental do cão é dependente direto do alinhamento ortopédico e muscular de seu corpo.
        </p>
      </div>

      {/* Cinematic diagram panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121212] border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-10 cinema-shadow relative overflow-hidden">
        
        {/* Decorative blueprint grids representing drafting */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Vector graphic simulation of a dog biomechanical scan */}
        <div className="lg:col-span-5 relative bg-black/50 p-6 rounded-2xl border border-gray-880 flex flex-col justify-between h-[360px] font-mono">
          <div className="flex items-center justify-between text-[#D4AF37] text-[9px] border-b border-gray-900 pb-2">
            <span>AVALIAÇÃO CINÉTICA PREMIUM</span>
            <span>REG: CMA-99088</span>
          </div>

          {/* Graphical display */}
          <div className="my-auto space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase">Canine Frame Analysis:</span>
              <div className="h-2 w-full bg-gray-950 rounded-full overflow-hidden border border-gray-900">
                <div className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 w-4/5 animate-pulse"></div>
              </div>
              <div className="flex justify-between text-[8px] text-gray-650">
                <span>Cervical Tensions</span>
                <span>Spinal Alignment OK</span>
                <span>Hip Axis: Balanced</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-gray-900 p-3 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[10px] text-white">Análise Neuromuscular: ESTÁVEL</span>
              </div>
              <p className="text-[9px] text-gray-400 leading-normal">
                Nível de dopamina estabilizado. Ausência de microtrações corticais ao adotar o comando "fica" prolongado. Postura proprioceptiva neuromuscular consolidada.
              </p>
            </div>
          </div>

          <div className="text-[9px] text-gray-500 text-right">
            <span>ANDRÉ FROHLICH DIAGNOSTICS v4.1</span>
          </div>
        </div>

        {/* Facts points cards */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <h3 className="font-serif text-[#F4E4B5] text-lg font-bold border-b border-gray-880 pb-2">
            Como André Frohlich Reabilita a Mente do Cão:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {scienceFacts.map((fact, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-[#004B63] text-[#F4E4B5] flex items-center justify-center text-xs border border-[#D4AF37]/20">
                    {idx + 1}
                  </div>
                  <h4 className="font-serif text-white font-semibold text-xs sm:text-sm">
                    {fact.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust and emotional equilibrium card */}
      <div className="bg-[#004B63]/10 border border-[#D4AF37]/15 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] block">BEM-ESTAR INTEGRAL CANINO</span>
          <h4 className="font-serif text-white text-base font-semibold">O Objetivo é Construir Confiança e Equilíbrio Emocional</h4>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Cães calmos, que confiam nos seus tutores do animal de estimação, não necessitam morder, rosnar na guia, ou chorar quando deixados sozinhos. Tratamos o animal sob um ponto de vista clínico integrador, oferecendo o maior nível técnico do sul do Brasil.
          </p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('contact-form-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] text-black font-mono text-[10px] uppercase font-bold py-3 px-6 rounded-xl shrink-0 transition-all cursor-pointer shadow-md"
        >
          Agende um Diagnóstico
        </button>
      </div>
    </div>
  );
}
