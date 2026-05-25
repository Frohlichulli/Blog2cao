/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Film, Camera, Clock, Sparkles, Star, ChevronRight } from 'lucide-react';

export function CinemaExperience() {
  const [activeTab, setActiveTab] = useState<'synopsis' | 'backstage' | 'techniques'>('synopsis');

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
      title: 'Set de Filmagens Noturnas',
      desc: 'Simulação de chuva artificial e ventos sob pressão de holofotes no Vale dos Sinos.'
    },
    {
      url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
      title: 'Foco Absoluto nas Lentes',
      desc: 'Cão ator mantendo fixação atencional no eixo da câmera por mais de 1 minuto.'
    },
    {
      url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      title: 'Comando Gestual à Distância',
      desc: 'Treinador André Frohlich operando comandos de microexpressões sem som de voz.'
    }
  ];

  const techniques = [
    {
      title: 'Eye-Contact Lock (Fixação do Olhar Artístico)',
      desc: 'Treinado para encarar fixamente as pupilas de um ator principal, transmitindo medo, união ou luto cênico real sem desvios induzidos por distração de equipe.'
    },
    {
      title: 'Sons de Estúdio (Blindagem Acústica)',
      desc: 'Habituação precoce contra estouros de claquete, ruído metálico de gruas telescópicas em movimento brusco e simulações acústicas de tempestades.'
    },
    {
      title: 'Mark-Seta de Alta Precisão',
      desc: 'A habilidade biomecânica fina de caminhar em ritmo constante e pousar escápula exatamente sobre um ponto de marcação de 2cm desenhado no chão de gravação.'
    },
    {
      title: 'Interação de Estresse Lúdico',
      desc: 'Atuar de forma dócil e lúdica em cenas onde simula resgatar ou defender um personagem ferido, mantendo foco na brincadeira sem reatividade real ao conflito.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Immersive cinematic banner */}
      <div className="relative min-h-[50vh] flex items-center justify-center rounded-3xl overflow-hidden border border-[#D4AF37]/20 cinema-shadow">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80" 
            alt="Cinema Set de Filmagem" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/80 to-transparent"></div>
          {/* Subtle gold cinematic lighting */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-80 w-80 rounded-full bg-[#A1801F]/10 blur-[80px] ambient-overlay"></div>
        </div>

        {/* Cinematic Cover text */}
        <div className="relative z-10 p-8 md:p-12 text-center space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-[#D4AF37]/40 rounded-full text-[10px] font-mono tracking-widest text-[#F4E4B5] uppercase">
            <Film className="w-3.5 h-3.5 animate-spin" />
            <span>ESTRÉIA NACIONAL PREVISTA ● 2027</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
            Longa-Metragem <br />
            <span className="gold-gradient-text italic font-serif font-normal">“Anfitriãs”</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            A Cão Meu Amigo Adestramento foi homologada como a preparadora oficial de cães atores para o ambicioso longa nacional de suspense psicológico. Uma amostra do profissionalismo exigido de André Frohlich no set internacional.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 space-y-4">
          <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-4 flex flex-col gap-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('synopsis')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                activeTab === 'synopsis' ? 'bg-[#004B63] text-[#F4E4B5] font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'
              }`}
            >
              <span>● O Desafio & Sinopse</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('backstage')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                activeTab === 'backstage' ? 'bg-[#004B63] text-[#F4E4B5] font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'
              }`}
            >
              <span>● Diários de Bastidores</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('techniques')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                activeTab === 'techniques' ? 'bg-[#004B63] text-[#F4E4B5] font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'
              }`}
            >
              <span>● Métodos de Alta Tensão</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Quick contact box */}
          <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-2xl p-6 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37]">DIRETOR DE PRODUÇÃO</span>
            <p className="text-xs text-gray-400 leading-normal">
              Precisa locar ou preparar cães virtuosos para comerciais, sessões de fotos de moda ou produções televisivas no Rio Grande do Sul?
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=5551996566493&text=Ola%20Andre!%20Gostaria%20de%20solicitar%20uma%20consultoria%20para%20preparacao%20de%20caes%20atores%20audiovisual."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#004B63] hover:bg-[#D4AF37] text-[#F4E4B5] hover:text-black hover:scale-103 py-2.5 rounded-xl border border-[#D4AF37]/20 text-[10px] uppercase tracking-wider font-bold transition-all text-center flex items-center justify-center gap-1.5"
            >
              Consultoria Audiovisual
            </a>
          </div>
        </div>

        {/* Detail Display tab side */}
        <div className="md:col-span-8 bg-[#121212] border border-[#D4AF37]/15 rounded-2xl p-6 md:p-8 space-y-6">
          {activeTab === 'synopsis' && (
            <div className="space-y-4 leading-relaxed font-light text-gray-300">
              <div className="flex items-center gap-2 text-white">
                <Camera className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold text-[#F4E4B5]">A Atmosfera de "Anfitriãs"</h3>
              </div>
              
              <p className="text-sm">
                No thriller nacional de mistério psicológico, a atuação canina representa uma extensão física da própria tensão ambiental dos personagens principais. O cão selecionado sob a chancela da Cão Meu Amigo Adestramento passa por sessões que simulam picos súbitos de horror e interações com neblina de gelo seco.
              </p>

              <p className="text-sm">
                André Frohlich foi responsável pelo desenho comportamental de blindagem acústica. Foram necessárias dezenas de sessões para habituar o cão ao movimento de microfone "Boom" suspenso sobre sua cabeça nos cortes rápidos de cenas caladas.
              </p>

              <div className="bg-[#0A0A0A] p-4 rounded-xl border border-gray-850 flex items-start gap-3">
                <Star className="text-[#D4AF37] w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  <strong className="text-white block mb-0.5">Nota do Diretor de Cena (André F.):</strong> "O nível de foco e a precisão do cão surpreenderam a equipe técnica de imagem. Ele respondeu a marcações difíceis de roteiro sob chuva torrencial logo na primeira tomada!"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'backstage' && (
            <div className="space-y-4 leading-relaxed font-light text-gray-300">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold text-[#F4E4B5]">Diários de Gravação e Bastidores</h3>
              </div>
              
              <div className="space-y-3 font-mono text-xs text-[#F4E4B5]">
                <div className="border-l-2 border-[#D4AF37] pl-3 py-1">
                  <span className="block text-gray-400 text-[10px]">DIÁRIO - SEÇÃO 08 ● NOVO HAMBURGO</span>
                  <p className="text-gray-300 font-sans mt-1 text-xs">
                    "Gravação noturna externa em clima úmido do Vale. O cão devia expressar um alerta estático direcionado a um ponto cego da floresta. Resposta perfeita à sutil contração de queixo de André que disparou o latido seco controlado."
                  </p>
                </div>
                <div className="border-l-2 border-[#D4AF37] pl-3 py-1">
                  <span className="block text-gray-400 text-[10px]">DIÁRIO - SEÇÃO 14 ● ESTÚDIO FECHADO</span>
                  <p className="text-gray-300 font-sans mt-1 text-xs">
                    "Interação direta entre o cão e o elenco infantil. O animal deita sobre a marca de carpete e sustenta olhar dócil enquanto recebe toques em falso choro de sofrimento mecânico. Segurança biológica de 100% no estúdio."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'techniques' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold text-[#F4E4B5]">As Técnicas Científicas de Elite</h3>
              </div>

              <p className="text-xs text-gray-400 leading-normal">
                Ao contrário do truque doméstico básico, preparamos o animal de estimação para lidar com a ansiedade biomecânica e muscular inerente das repetições excessivas do set:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techniques.map((tech, idx) => (
                  <div key={idx} className="bg-[#0A0A0A] p-4 rounded-xl border border-gray-850 space-y-1.5">
                    <span className="text-[11px] font-semibold text-white font-serif">{tech.title}</span>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid of gallery mockups */}
      <div className="space-y-4">
        <h3 className="font-serif text-[#F4E4B5] text-base font-semibold uppercase tracking-wider text-center">Registros Fotográficos de Treinamento</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {galleryImages.map((g, idx) => (
            <div key={idx} className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl overflow-hidden cinema-shadow">
              <img src={g.url} className="h-44 w-full object-cover" alt={g.title} />
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">{g.title}</span>
                <p className="text-[11px] text-gray-400 font-light leading-normal">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
