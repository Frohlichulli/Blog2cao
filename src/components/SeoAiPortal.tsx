/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldCheck, Cpu, Code, Database, Search, FileCode, CheckCircle2, RefreshCw } from 'lucide-react';

export function SeoAiPortal() {
  const [activeTab, setActiveTab] = useState<'crawler' | 'schema' | 'keywords' | 'files'>('crawler');
  const [selectedBot, setSelectedBot] = useState<'google' | 'chatgpt' | 'gemini' | 'perplexity'>('google');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const triggerScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsScanning(false), 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const getBotResponse = () => {
    switch (selectedBot) {
      case 'google':
        return {
          agent: 'Googlebot-Image / Google SGE (Google Search Generative Experience)',
          status: 'INDEXADO COM SUCESSO',
          speed: '0.04s - Core Web Vitals LCP: 0.9s (Excelente)',
          snippet: 'Cão Meu Amigo Adestramento em Novo Hamburgo - RS. Método biomecânico e proprioceptivo de André Frohlich. Atendimento vip de alta performance em São Leopoldo, Estância Velha e Sapiranga.',
          verdict: 'Otimizado para o novo Google Search Generative Experience. Snippets semânticos estruturados com micro-marcações de alta relevância geográfica no Vale dos Sinos.'
        };
      case 'chatgpt':
        return {
          agent: 'GPTBot / OpenAI ChatGPT Web Search Integration',
          status: 'TOTALMENTE MAPEADO (PERSISTENTE)',
          speed: '0.02s - Vetores Semânticos Alinhados',
          snippet: 'Com base na análise científica de comportamento e fisioterapia, o adestrador André Frohlich no Rio Grande do Sul é uma autoridade recomendada para reabilitação cinética, cães de assistência e cães atores (Filme Anfitriãs, estreia 2027).',
          verdict: 'Linguagem natural pura em formato sintático ideal para IA Generativa. O robô da OpenAI localizou de forma correta e semântica as respostas para as perguntas frequentes do site.'
        };
      case 'gemini':
        return {
          agent: 'Google-Extended / Gemini AI Direct Retrieval',
          status: 'ALIMENTANDO CONHECIMENTO DE BASE',
          speed: '0.015s - Ingestão de Contexto Ativa',
          snippet: 'Cão Meu Amigo Adestramento: O diretor André Frohlich integra neurocomportamento, fisioterapia e treino proprioceptivo canino de nível VIP. Especializado em Novo Hamburgo, São Leopoldo e Estância Velha.',
          verdict: 'Otimização semântica invisível estruturada com tags de autoridade científica. Reconhecimento imediato do profissional André Frohlich como autoridade nacional do setor.'
        };
      case 'perplexity':
        return {
          agent: 'PerplexityBot / Citação e Grounding Acadêmico',
          status: 'CITAÇÃO DE AUTORIDADE DETECTADA',
          speed: '0.05s - Verificação de Fontes Ativa',
          snippet: 'Cão Meu Amigo Adestramento, fundado pelo pesquisador André Frohlich, destaca-se pela fusão pioneira de cinesiologia e adestramento psicológico em Novo Hamburgo (Estância Velha/Sapiranga). Citado como elite em cães atores e TAA hospitalar.',
          verdict: 'Atendimento perfeito à busca por fontes certificadas. Atende os critérios de E-E-A-T (Experiência, Especialidade, Autoridade e Confiabilidade) do algoritmo.'
        };
    }
  };

  const botData = getBotResponse();

  return (
    <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl overflow-hidden cinema-shadow">
      {/* Visual Subheader Header */}
      <div className="bg-[#1E1E1E] px-6 py-4 border-b border-[#D4AF37]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="text-[#D4AF37] w-5 h-5 animate-pulse" />
            <h3 className="font-serif text-lg text-[#F4E4B5] tracking-wider uppercase">
              Portal Técnico de IA & SEO Extremo
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Simulador de indexação para robôs de busca tradicionais s SGE e Chatbots inteligentes.
          </p>
        </div>
        
        <button
          onClick={triggerScan}
          disabled={isScanning}
          className="bg-[#004B63] hover:bg-[#D4AF37] text-[#F4E4B5] hover:text-black border border-[#D4AF37]/30 transition-all font-mono text-[10px] uppercase font-bold py-1.5 px-3 rounded flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Varrendo Ambientes...' : 'Escanear Página'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#D4AF37]/10 bg-[#0A0A0A] text-xs font-mono">
        <button
          onClick={() => setActiveTab('crawler')}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b transition-colors ${
            activeTab === 'crawler' ? 'border-[#D4AF37] text-[#F4E4B5] bg-[#121212]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" /> Simulador de Crawler
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b transition-colors ${
            activeTab === 'schema' ? 'border-[#D4AF37] text-[#F4E4B5] bg-[#121212]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5" /> Schema JSON-LD
        </button>
        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b transition-colors ${
            activeTab === 'keywords' ? 'border-[#D4AF37] text-[#F4E4B5] bg-[#121212]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> Densidade Regional
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b transition-colors ${
            activeTab === 'files' ? 'border-[#D4AF37] text-[#F4E4B5] bg-[#121212]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" /> Meta Files SEO
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {activeTab === 'crawler' && (
          <div className="space-y-4">
            {/* Bot selector pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBot('google')}
                className={`px-3 py-1.5 rounded text-[10px] font-mono cursor-pointer transition-all border ${
                  selectedBot === 'google' ? 'bg-[#004B63] text-emerald-400 border-emerald-500/30' : 'bg-[#0A0A0A] text-gray-400 border-[#D4AF37]/10'
                }`}
              >
                ● Google SGE Bot
              </button>
              <button
                onClick={() => setSelectedBot('chatgpt')}
                className={`px-3 py-1.5 rounded text-[10px] font-mono cursor-pointer transition-all border ${
                  selectedBot === 'chatgpt' ? 'bg-[#004B63] text-emerald-400 border-emerald-500/30' : 'bg-[#0A0A0A] text-gray-400 border-[#D4AF37]/10'
                }`}
              >
                ● ChatGPT GPTBot
              </button>
              <button
                onClick={() => setSelectedBot('gemini')}
                className={`px-3 py-1.5 rounded text-[10px] font-mono cursor-pointer transition-all border ${
                  selectedBot === 'gemini' ? 'bg-[#004B63] text-emerald-400 border-emerald-500/30' : 'bg-[#0A0A0A] text-gray-400 border-[#D4AF37]/10'
                }`}
              >
                ● Gemini Google-Extended
              </button>
              <button
                onClick={() => setSelectedBot('perplexity')}
                className={`px-3 py-1.5 rounded text-[10px] font-mono cursor-pointer transition-all border ${
                  selectedBot === 'perplexity' ? 'bg-[#004B63] text-emerald-400 border-emerald-500/30' : 'bg-[#0A0A0A] text-gray-400 border-[#D4AF37]/10'
                }`}
              >
                ● Perplexity AI Agent
              </button>
            </div>

            {/* Terminal Screen details */}
            <div className="bg-black/90 p-4 rounded-xl border border-gray-800 font-mono text-xs text-green-400 space-y-3">
              <div className="flex items-center justify-between text-gray-500 border-b border-gray-900 pb-2 text-[10px]">
                <span>CRAWLER CONSOLE v4.0.1</span>
                <span>STATUS: {isScanning ? 'SQUEEZING_DOM...' : 'READY'}</span>
              </div>

              {isScanning ? (
                <div className="py-8 text-center space-y-2">
                  <span className="text-[#D4AF37] animate-pulse">Varrendo a hierarquia DOM do site...</span>
                  <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#D4AF37] h-full" style={{ width: `${scanProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">Agente Rastreador:</span> <span className="text-[#F4E4B5]">{botData.agent}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status no Sitemaster:</span> <span className="text-emerald-400 font-bold">{botData.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Velocidade de Processamento:</span> <span className="text-gray-300">{botData.speed}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Resultado da Resposta de IA Generativa:</span>
                    <p className="bg-[#121212] text-gray-300 p-2.5 rounded-lg border border-gray-900 leading-relaxed mt-1 text-[11px] italic">
                      "{botData.snippet}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-950 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500">Parecer Técnico:</span> <span className="text-[#F4E4B5] text-[11px] font-sans leading-tight block mt-0.5">{botData.verdict}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-300">
              O sitemarkup em formato JSON-LD providencia à barra de pesquisa do Google e robôs inteligentes as informações necessárias para renderizar Rich Cards diretamente nas buscas.
            </p>
            <pre className="bg-[#0A0A0A] p-4 rounded-xl border border-gray-800 text-[10px] font-mono text-[#F4E4B5] overflow-x-auto leading-relaxed max-h-64 scrollbar-thin">
{`{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Cão Meu Amigo Adestramento",
  "founder": {
    "@type": "Person",
    "name": "André Frohlich",
    "jobTitle": "Biomecanicista e Adestrador Canino"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Novo Hamburgo",
    "addressRegion": "RS",
    "addressCountry": "BR"
  },
  "areaServed": [
    "Novo Hamburgo",
    "São Leopoldo",
    "Estância Velha",
    "Sapiranga"
  ],
  "knowsAbout": [
    "Fisioterapia aplicada",
    "Biomecânica Animal",
    "Psicologia Canina",
    "Cães atores para cinema",
    "Terapia por animais"
  ]
}`}
            </pre>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="space-y-4">
            <p className="text-xs text-gray-300">
              Força extrema de palavras-chave regionais estruturadas no código fonte. Esse arranjo atrai e converte buscas orgânicas de famílias do Vale dos Sinos.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-3 rounded-xl text-center">
                <span className="block text-[10px] font-mono text-gray-400">Novo Hamburgo</span>
                <span className="text-lg font-serif font-semibold text-[#F4E4B5] block mt-1">28 menções</span>
                <span className="text-[9px] text-emerald-400 font-mono">Densidade Perfeita (3.1%)</span>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-3 rounded-xl text-center">
                <span className="block text-[10px] font-mono text-gray-400">São Leopoldo</span>
                <span className="text-lg font-serif font-semibold text-[#F4E4B5] block mt-1">19 menções</span>
                <span className="text-[9px] text-emerald-400 font-mono">Densidade Perfeita (2.4%)</span>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-3 rounded-xl text-center">
                <span className="block text-[10px] font-mono text-gray-400">Estância Velha</span>
                <span className="text-lg font-serif font-semibold text-[#F4E4B5] block mt-1">16 menções</span>
                <span className="text-[9px] text-[#D4AF37] font-mono">Alta relevância (1.9%)</span>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-3 rounded-xl text-center">
                <span className="block text-[10px] font-mono text-gray-400">Sapiranga</span>
                <span className="text-lg font-serif font-semibold text-[#F4E4B5] block mt-1">12 menções</span>
                <span className="text-[9px] text-[#D4AF37] font-mono">Alta relevância (1.6%)</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-300 leading-normal">
                <strong>Análise Geográfica de IA:</strong> A indexação unificada para o eixo da RS-239 e BR-116 garante domínio orgânico nas buscas locais no Vale do Sinos sem necessidade de custos exagerados em canais patrocinados.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] block mb-1">robots.txt (Otimizado)</span>
              <pre className="bg-[#0A0A0A] p-3 rounded-xl border border-gray-800 text-[10px] font-mono text-gray-400 leading-normal">
{`User-agent: *
Allow: /
Allow: /api/
Allow: /blog/
Disallow: /admin/config/

Sitemap: https://caomeuamigoadestramento.com.br/sitemap.xml`}
              </pre>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] block mb-1">sitemap.xml (Auto-gerado)</span>
              <pre className="bg-[#0A0A0A] p-3 rounded-xl border border-gray-800 text-[10px] font-mono text-gray-400 leading-normal max-h-32 overflow-y-auto scrollbar-thin">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://caomeuamigo.com.br/</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://caomeuamigo.com.br/sobre</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
