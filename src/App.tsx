/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import { articlesData } from './data/articles';
import { servicesData } from './data/services';
import { Article, Lead, Comment } from './types';

// Component imports
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { AboutCompany } from './components/AboutCompany';
import { ScienceBehind } from './components/ScienceBehind';
import { CinemaExperience } from './components/CinemaExperience';
import { CmsPanel } from './components/CmsPanel';
import { ContactSection } from './components/ContactSection';
import { SeoAiPortal } from './components/SeoAiPortal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';

// Icons for interactive features
import { 
  Heart, Eye, Calendar, Sparkles, MessageSquare, 
  Share2, ArrowLeft, ChevronRight, Calculator, Check, ShieldAlert
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms'>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  
  // Blog State
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Interactive connection calculator state (Conversion booster)
  const [calcBreed, setCalcBreed] = useState('Pastor Alemão');
  const [calcIssue, setCalcIssue] = useState('puxado-guia');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  // DB States (synchronized in LocalStorage)
  const [articles, setArticles] = useState<Article[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Simulated Comments to populate CMS instantly
  const initialComments: Comment[] = [
    {
      id: 'com-1',
      articleId: 'adestramento-canino-moderno',
      author: 'Carlos Eduardo (Novo Hamburgo)',
      date: '2026-05-20',
      text: 'Explicação fantástica sobre os quadrantes operantes! Eu costumava usar broncas e percebi que só causava medo. Como mudo esse hábito com meu Pastor?',
      isApproved: true
    },
    {
      id: 'com-2',
      articleId: 'biomecanica-e-comportamento-canino',
      author: 'Dra. Mariana G. (São Leopoldo)',
      date: '2026-05-18',
      text: 'Espetacular essa associação de adestramento com biomecânica e fisioterapia. É nítido como desvios ortopédicos afetam o humor do animal de estimação.',
      isApproved: true
    }
  ];

  const initialLeads: Lead[] = [
    {
      id: 'lead-1',
      name: 'Fabiano Martins',
      email: 'fabianofisio@gmail.com',
      phone: '(51) 99888-2233',
      dogName: 'Marley',
      dogBreed: 'Labrador',
      serviceInterest: 'Adestramento Básico',
      message: 'Gostaria de agendar uma avaliação domiciliar em Novo Hamburgo para corrigir puxadas na guia.',
      date: '2026-05-25',
      type: 'evaluation',
      status: 'Novo'
    },
    {
      id: 'lead-2',
      name: 'Carla Souza',
      email: 'carla.souza@estanciavela.com',
      phone: '(51) 98777-6655',
      dogName: 'Pipoca',
      dogBreed: 'Poodle',
      serviceInterest: 'Adestramento Sanitário',
      message: 'Minha cachorra mija por toda a casa. Preciso de ajuda urgente no apartamento no centro de Estância Velha.',
      date: '2026-05-24',
      type: 'contact',
      status: 'Em Atendimento'
    }
  ];

  // Bootstrap Storage
  useEffect(() => {
    const storedArticles = localStorage.getItem('cma_articles');
    if (storedArticles) {
      try {
        const parsed: Article[] = JSON.parse(storedArticles);
        const merged = parsed.map(art => {
          const defaultArt = articlesData.find(d => d.id === art.id);
          if (defaultArt) {
            return {
              ...art,
              coverImage: defaultArt.coverImage,
              title: defaultArt.title,
              subtitle: defaultArt.subtitle,
              excerpt: defaultArt.excerpt,
              content: defaultArt.content,
              category: defaultArt.category,
              tags: defaultArt.tags,
            };
          }
          return art;
        });
        const missing = articlesData.filter(d => !parsed.some(p => p.id === d.id));
        const finalArticles = [...merged, ...missing];
        localStorage.setItem('cma_articles', JSON.stringify(finalArticles));
        setArticles(finalArticles);
      } catch (e) {
        localStorage.setItem('cma_articles', JSON.stringify(articlesData));
        setArticles(articlesData);
      }
    } else {
      localStorage.setItem('cma_articles', JSON.stringify(articlesData));
      setArticles(articlesData);
    }

    const storedLeads = localStorage.getItem('cma_leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    } else {
      localStorage.setItem('cma_leads', JSON.stringify(initialLeads));
      setLeads(initialLeads);
    }

    const storedComments = localStorage.getItem('cma_comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      localStorage.setItem('cma_comments', JSON.stringify(initialComments));
      setComments(initialComments);
    }
  }, []);

  // Sync back on changes
  const saveArticles = (updated: Article[]) => {
    localStorage.setItem('cma_articles', JSON.stringify(updated));
    setArticles(updated);
  };

  const saveLeads = (updated: Lead[]) => {
    localStorage.setItem('cma_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const saveComments = (updated: Comment[]) => {
    localStorage.setItem('cma_comments', JSON.stringify(updated));
    setComments(updated);
  };

  // Callback triggers
  const handleAddArticle = (newArt: Article) => {
    const updated = [newArt, ...articles];
    saveArticles(updated);
  };

  const handleEditArticle = (editedArt: Article) => {
    const updated = articles.map(art => art.id === editedArt.id ? editedArt : art);
    saveArticles(updated);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = articles.filter(art => art.id !== id);
    saveArticles(updated);
    if (selectedArticleId === id) setSelectedArticleId(null);
  };

  const handleAddLead = (newLeadData: any) => {
    const freshLead: Lead = {
      id: 'lead-' + Date.now().toString(),
      name: newLeadData.name,
      email: newLeadData.email || 'nao@anunciado.com',
      phone: newLeadData.phone,
      dogName: newLeadData.dogName,
      dogBreed: newLeadData.dogBreed || 'SRD',
      serviceInterest: newLeadData.serviceInterest,
      message: newLeadData.message || 'Solicitação efetuada no portal.',
      date: new Date().toISOString().split('T')[0],
      type: newLeadData.type || 'contact',
      status: 'Novo'
    };
    const updated = [freshLead, ...leads];
    saveLeads(updated);
  };

  const handleUpdateLeadStatus = (id: string, status: 'Novo' | 'Em Atendimento' | 'Concluído') => {
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    saveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeads(updated);
  };

  const handleApproveComment = (id: string) => {
    const updated = comments.map(c => c.id === id ? { ...c, isApproved: true } : c);
    saveComments(updated);
  };

  const handleDeleteComment = (id: string) => {
    const updated = comments.filter(c => c.id !== id);
    saveComments(updated);
  };

  // Likes and Views Increments (Blog focus)
  const handleLike = (articleId: string) => {
    const updated = articles.map(art => {
      if (art.id === articleId) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    });
    saveArticles(updated);
  };

  // On read entry
  const handleOpenArticle = (art: Article) => {
    setSelectedArticleId(art.id);
    setCurrentView('blog');
    
    // Increment views in state
    const updated = articles.map(a => {
      if (a.id === art.id) {
        return { ...a, views: a.views + 1 };
      }
      return a;
    });
    saveArticles(updated);
  };

  // Add Comment Form
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handlePostComment = (e: React.FormEvent, artId: string) => {
    e.preventDefault();
    if (!commentAuthor || !commentText) return;

    const newCom: Comment = {
      id: 'com-' + Date.now().toString(),
      articleId: artId,
      author: commentAuthor,
      date: new Date().toISOString().split('T')[0],
      text: commentText,
      isApproved: false // Requires moderation in CMS first
    };

    const updated = [...comments, newCom];
    saveComments(updated);
    
    setCommentAuthor('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 5000);
  };

  // Navigation callbacks
  const handleNavigateToService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentView('services');
  };

  const handleNavigate = (view: 'home' | 'science' | 'services' | 'blog' | 'cinema' | 'cms') => {
    setCurrentView(view);
    if (view !== 'services') setSelectedServiceSlug(null);
    if (view !== 'blog') setSelectedArticleId(null);
  };

  // Calculator diagnostic function
  const runCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    let text = '';
    if (calcIssue === 'puxado-guia') {
      text = `Análise Biomecânica do ${calcBreed}: Cães que puxam na guia costumam tencionar a cervical superior de forma crônica, deslocando o peso corporal inteiramente para os membros anteriores anteriorizados. Sugestão de André Frohlich: Prática de propriocepção para re-equilibrar o quadril traseiro e guias longas em formato "J" de sorriso.`;
    } else if (calcIssue === 'xixi-apartamento') {
      text = `Cronologia Metabólica do ${calcBreed}: Os acidentes em apartamento estão ligados ao reflexo gastrocólico pós-refeiçoes ou stress mecânico por falta de rotina de farejo cognitivo. Mantenha potes de comida isolados das áreas de descarte de urina por no mínimo 3 metros de distância.`;
    } else if (calcIssue === 'reatividade-rua') {
      text = `Reatividade Emocional do ${calcBreed}: Rosnar ou latir contra outros cães na rua é uma resposta límbica de preservação. O cão espelha a rigidez respiratória do condutor na guia de passeio. Pratique respirações diafragmática de calma e mantenha distâncias seguras de segurança.`;
    } else {
      text = `Ansiedade do ${calcBreed}: Cães que choram na ausência sofrem com pânicos de abandono. Pratique a dessensibilização dos ritos rituais de saídas da casa (ruído de chaves e roupas sociais) associando-os com distribuição periódica de brinquedos de nylon recheados de comida congelada.`;
    }
    setCalcResult(text);
  };

  // Filtering variables
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todos' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesList = ['Todos', 'Ciência Comportamental', 'Educação de Tutores', 'Socialização e Prevenção', 'Higiene e Rotina', 'Cães de Elite & Cinema', 'Correção de Desvios', 'Adestramento Técnico'];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0A0A0A]">
      {/* Embedded SEO / Voice search invisible elements which don&apos;t clutter visual */}
      <div className="hidden" aria-hidden="true">
        <h2>Adestrador de cães profissional em Novo Hamburgo RS, São Leopoldo, Estância Velha, Sapiranga Vale dos Sinos</h2>
        <p>Métodos de adestramento de cães por André Frohlich. Biomecânica aplicada, cão ator, cão de assistência em Novo Hamburgo</p>
      </div>

      {/* Floating interactive header */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate}
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          if (currentView !== 'blog') {
            setCurrentView('blog');
            setSelectedArticleId(null);
          }
        }}
      />

      {/* Main rendering views framework */}
      <main className="flex-grow pt-16">
        
        {currentView === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Immersive cinematic head header */}
            <HeroBanner 
              onNavigate={handleNavigate} 
              onNavigateToService={handleNavigateToService}
            />

            {/* Quick value grid icons block */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all text-left">
                <span className="text-3xl font-serif font-extrabold text-[#D4AF37] block">01</span>
                <h4 className="font-serif text-white font-semibold text-base mt-2">Diferencial Ortopédico</h4>
                <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
                  Avaliação da marcha cinemática e biomecânica muscular do cão antes de qualquer comando cognitivo.
                </p>
              </div>
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all text-left">
                <span className="text-3xl font-serif font-extrabold text-[#D4AF37] block">02</span>
                <h4 className="font-serif text-white font-semibold text-base mt-2">Elite Audiovisual</h4>
                <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
                  Cães atores preparados para atuar sob alta pressão cênica em comerciais da grande Porto Alegre gaúcha e longa "Anfitriãs" (2027).
                </p>
              </div>
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all text-left">
                <span className="text-3xl font-serif font-extrabold text-[#D4AF37] block">03</span>
                <h4 className="font-serif text-white font-semibold text-base mt-2">Auxílio & Inclusão</h4>
                <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
                  Formação técnica de cães terapeutas hospitalares hospital e cães de assistência médica com peitorais ergonômicos protetores.
                </p>
              </div>
            </section>

            {/* Services modular grid section */}
            <section className="max-w-7xl mx-auto px-6">
              <ServicesGrid 
                onAddLead={handleAddLead}
                selectedServiceSlug={selectedServiceSlug}
                onClearServiceSelection={() => setSelectedServiceSlug(null)}
                onSelectServiceSlug={setSelectedServiceSlug}
              />
            </section>

            {/* Connection calculator tool (Super Conversion item!) */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="bg-gradient-to-r from-[#121212] to-[#002D3B] border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-10 cinema-shadow text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B63]/35 border border-[#D4AF37]/20 rounded-full text-[10px] font-mono tracking-widest text-[#F4E4B5] uppercase w-fit">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>DIAGNÓSTICO EXPRESSO</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F4E4B5] font-bold leading-tight">
                    Calculadora de Compatibilidade Comportamental
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Examine na hora prováveis razões biomecânicas ou metabólicas por trás dos comportamentos indesejados do seu cão. Selecione os itens abaixo:
                  </p>
                </div>

                <div className="lg:col-span-7 bg-[#0A0A0A] p-6 rounded-2xl border border-[#D4AF37]/10 space-y-4">
                  <form onSubmit={runCalculator} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Raça do seu Cão:</label>
                      <select
                        value={calcBreed}
                        onChange={(e) => setCalcBreed(e.target.value)}
                        className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
                      >
                        <option value="Pastor Alemão">Pastor Alemão / Belga</option>
                        <option value="Border Collie">Border Collie / Aussie</option>
                        <option value="Golden Retriever">Golden / Labrador</option>
                        <option value="Poodle / Chihuahua">Raças de Mini Porte</option>
                        <option value="SRD (Vira-lata)">SRD (Sem Raça Definida)</option>
                        <option value="Rottweiler / Pitbull">Raça de Porte Robusto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Sinal Comportamental:</label>
                      <select
                        value={calcIssue}
                        onChange={(e) => setCalcIssue(e.target.value)}
                        className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
                      >
                        <option value="puxado-guia">Puxar ou morder a guia ao andar</option>
                        <option value="xixi-apartamento">Xixi ou cocô fora do local correto em casa</option>
                        <option value="reatividade-rua">Rosnar ou latir contra outros cachorros</option>
                        <option value="ansiedade-sozinho">Chorar / destruir marcos de porta ao ficar só</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:col-span-2 bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md mt-2"
                    >
                      Processar Diagnóstico Biomecânico
                    </button>
                  </form>

                  {calcResult && (
                    <div className="bg-[#002D3B]/45 border border-emerald-500/20 rounded-xl p-4 text-xs text-gray-300 leading-relaxed animate-in fade-in duration-300 flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                      <p>{calcResult}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <h3 className="text-2xl font-serif text-white tracking-wide text-center uppercase border-b border-gray-900 pb-3">Testemunhos no Vale dos Sinos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#121212] p-6 rounded-2xl border border-[#D4AF37]/10 text-left">
                  <p className="text-xs text-gray-400 italic">"André operou um verdadeiro milagre com meu filhote de Golden em Novo Hamburgo. O treinamento básico na guia salvou nossas caminhadas, ele não puxa mais nada e o foco dele é perfeito."</p>
                  <span className="block font-serif text-[#F4E4B5] text-xs font-semibold mt-4">— Fabiano Martins (Tutor de Marley)</span>
                </div>
                <div className="bg-[#121212] p-6 rounded-2xl border border-[#D4AF37]/10 text-left">
                  <p className="text-xs text-gray-400 italic">"Gostaria de registrar como a consultoria de ansiedade mudou a vida da Pipoca. Ela chorava tanto no apartamento no centro de Estância Velha, mas os brinquedos recheados resolveram de vez."</p>
                  <span className="block font-serif text-[#F4E4B5] text-xs font-semibold mt-4">— Carla Souza (Tutora de Pipoca)</span>
                </div>
                <div className="bg-[#121212] p-6 rounded-2xl border border-[#D4AF37]/10 text-left">
                  <p className="text-xs text-gray-400 italic">"Enquanto produtora audiovisual, a perícia canina em gravações foi espetacular no filme Anfitriãs. É impressionante como André Frohlich controla gestos microscópicos sem som."</p>
                  <span className="block font-serif text-[#F4E4B5] text-xs font-semibold mt-4">— Produtora Cultural RS (Direção Comercial)</span>
                </div>
              </div>
            </section>

            {/* SEO extreme visual crawler and maps panel */}
            <section className="max-w-7xl mx-auto px-6">
              <SeoAiPortal />
            </section>

            {/* Contact section */}
            <section className="max-w-7xl mx-auto px-6 border-t border-gray-900 pt-16">
              <ContactSection onAddLead={handleAddLead} />
            </section>
          </div>
        )}

        {currentView === 'science' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <ScienceBehind />
            <section className="border-t border-gray-900 pt-16">
              <AboutCompany />
            </section>
          </div>
        )}

        {currentView === 'services' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <ServicesGrid 
              onAddLead={handleAddLead}
              selectedServiceSlug={selectedServiceSlug}
              onClearServiceSelection={() => setSelectedServiceSlug(null)}
              onSelectServiceSlug={setSelectedServiceSlug}
            />
          </div>
        )}

        {currentView === 'cinema' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <CinemaExperience />
          </div>
        )}

        {currentView === 'cms' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <CmsPanel 
              articles={articles}
              leads={leads}
              comments={comments}
              onAddArticle={handleAddArticle}
              onEditArticle={handleEditArticle}
              onDeleteArticle={handleDeleteArticle}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onDeleteLead={handleDeleteLead}
              onApproveComment={handleApproveComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        )}

        {currentView === 'blog' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 text-left">
            {selectedArticleId ? (
              // Read specific single Full article
              (() => {
                const art = articles.find(a => a.id === selectedArticleId);
                if (!art) return <p className="text-white text-center">Artigo não encontrado.</p>;

                // Approved comments for this post
                const postComments = comments.filter(c => c.articleId === art.id && c.isApproved);

                return (
                  <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto">
                    {/* Back header */}
                    <button
                      onClick={() => setSelectedArticleId(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#D4AF37] hover:text-[#F4E4B5] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Artigos do Blog
                    </button>

                    {/* Meta structural cards */}
                    <div className="space-y-4">
                      <span className="bg-[#002D3B] text-[#F4E4B5] border border-[#D4AF37]/25 px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase">
                        {art.category}
                      </span>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold leading-tight">
                        {art.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-gray-400 italic">
                        {art.subtitle}
                      </p>

                      {/* Author row */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-y border-gray-950 py-3.5">
                        <div className="flex items-center gap-3">
                          <img src={art.author.avatar} alt={art.author.name} className="h-10 w-10 rounded-full border border-[#D4AF37]/40 object-cover" />
                          <div>
                            <span className="block text-xs font-serif text-white font-bold">{art.author.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono italic">{art.author.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                          <span>Publicação: {art.date}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Full-width Cover */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#D4AF37]/15 cursor-pointer" onClick={() => handleLike(art.id)}>
                      <img src={art.coverImage} className="w-full h-full object-cover" alt="capa do artigo" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-3.5 text-xs text-[#F4E4B5] font-mono bg-[#121212]/80 px-3 py-1.5 rounded-full border border-[#D4AF37]/15">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400 animate-pulse" /> {art.likes} Likes</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {art.views} Visualizações</span>
                      </div>
                    </div>

                    {/* Rich HTML styled text reading view */}
                    <div className="prose prose-invert max-w-none text-sm md:text-base text-gray-300 leading-relaxed font-light space-y-6">
                      {art.content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('---')) {
                          return <hr key={idx} className="border-gray-850 my-6" />;
                        }
                        if (paragraph.startsWith('###')) {
                          return <h3 key={idx} className="text-xl font-serif text-[#F4E4B5] font-bold mt-8 mb-4">{paragraph.replace('###', '').trim()}</h3>;
                        }
                        if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.')) {
                          return (
                            <div key={idx} className="pl-4 border-l border-[#D4AF37] text-xs text-gray-300 italic my-4 font-mono leading-relaxed">
                              {paragraph}
                            </div>
                          );
                        }
                        if (paragraph.startsWith('-')) {
                          return <li key={idx} className="list-disc pl-2 font-mono text-xs text-gray-300 mb-1">{paragraph.replace('-', '').trim()}</li>;
                        }
                        return <p key={idx}>{paragraph}</p>;
                      })}
                    </div>

                    {/* CTA section inside article for conversion */}
                    <div className="bg-[#121212]/80 border border-[#D4AF37]/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1 text-left">
                        <h4 className="font-serif text-white text-sm font-semibold">Gostou desse conteúdo de adestramento?</h4>
                        <p className="text-xs text-gray-400 font-light">Agende uma análise biomecânica com o diretor André Frohlich na sua casa em Novo Hamburgo.</p>
                      </div>
                      <button
                        onClick={() => {
                          const form = document.getElementById('contact-form-section');
                          if (form) form.scrollIntoView({ behavior: 'smooth' });
                          setSelectedArticleId(null);
                        }}
                        className="bg-gradient-to-r from-[#A1801F] to-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase py-2.5 px-5 rounded-lg shrink-0 transition-transform hover:scale-103 cursor-pointer"
                      >
                        Avaliar Meu Cão
                      </button>
                    </div>

                    {/* Post comments lists */}
                    <div className="space-y-6 border-t border-gray-900 pt-8 text-left">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                        <h4 className="font-serif text-lg font-bold text-[#F4E4B5]">Mensagens & Discussão ({postComments.length})</h4>
                      </div>

                      {postComments.length === 0 ? (
                        <p className="text-xs text-gray-500 font-mono italic">Sem comentários aprovados ainda nesta discussão. Seja o primeiro!</p>
                      ) : (
                        <div className="space-y-4">
                          {postComments.map((com) => (
                            <div key={com.id} className="bg-[#121212] p-4 rounded-xl border border-gray-900 space-y-1 text-left">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-serif text-white font-bold text-xs">{com.author}</span>
                                <span className="text-[9px] font-mono text-gray-500">{com.date}</span>
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed italic">"{com.text}"</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment submission form */}
                      <div className="bg-[#121212]/50 border border-[#D4AF37]/10 rounded-xl p-5">
                        <h5 className="font-serif text-white font-semibold text-xs uppercase tracking-wide mb-3">Deixe seu Comentário Acadêmico</h5>
                        
                        <form onSubmit={(e) => handlePostComment(e, art.id)} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono mb-1">Seu Nome / Região *</label>
                              <input
                                type="text"
                                required
                                value={commentAuthor}
                                onChange={(e) => setCommentAuthor(e.target.value)}
                                placeholder="Ex: Joana Alves (Novo Hamburgo)"
                                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono mb-1">Mensagem *</label>
                            <textarea
                              required
                              rows={3}
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Escreva sua pergunta ou observação comportamental..."
                              className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none font-sans"
                            />
                          </div>

                          {commentSubmitted && (
                            <div className="text-[10px] text-amber-400 bg-amber-950/25 border border-amber-900/30 px-3 py-2 rounded flex items-center gap-1.5 font-mono">
                              <ShieldAlert className="w-4 h-4 shrink-0" />
                              <span>Comentário enviado! Aguardando moderação de André Frohlich no painel CMS para evitar spans.</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            className="bg-[#002D3B] hover:bg-[#D4AF37] text-[#F4E4B5] hover:text-black border border-[#D4AF37]/25 py-2 px-4 rounded-lg text-[10px] font-mono uppercase tracking-widest font-bold transition-all cursor-pointer"
                          >
                            Compartilhar Comentário
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* SEO schema simulation block for index visualizer */}
                    <div className="bg-black p-5 border border-gray-900 rounded-2xl space-y-2.5 font-mono text-[9px] text-gray-500">
                      <span className="text-[#D4AF37] uppercase font-bold text-[10px]">JSON-LD Schema de Artigo (Google SGE & Perplexity indexable)</span>
                      <pre className="text-gray-400 bg-gray-950 p-3 rounded-lg overflow-x-auto leading-normal max-h-32">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${art.title}",
  "alternativeHeadline": "${art.subtitle}",
  "image": "${art.coverImage}",
  "genre": "Dog Training & Behavior",
  "keywords": "${art.tags.join(' ')}",
  "wordcount": "1530",
  "publisher": {
    "@type": "Organization",
    "name": "Cão Meu Amigo Adestramento"
  },
  "author": {
    "@type": "Person",
    "name": "André Frohlich"
  }
}`}
                      </pre>
                    </div>

                  </div>
                );
              })()
            ) : (
              // General Blog Feed list with Category filter
              <div className="space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <h2 className="text-3xl font-serif text-white tracking-wide font-semibold">Artigos Científicos & Diretório Canino</h2>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Mantenha-se informado com estudos técnicos de comportamento, biomecânica e reabilitação proprioceptiva animal escritos por quem possui duas décadas de excelência em Novo Hamburgo.
                  </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                  {categoriesList.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border cursor-pointer transition-all ${
                        selectedCategory === cat 
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                          : 'bg-[#121212] text-gray-400 border-[#D4AF37]/15 hover:border-[#D4AF37]/30 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Main list loop */}
                {filteredArticles.length === 0 ? (
                  <p className="text-xs text-gray-500 font-mono index text-center py-12">Nenhum artigo localizado para a busca ou filtro selecionado.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto pt-4">
                    {filteredArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleOpenArticle(art)}
                        className="group bg-[#121212] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-video h-48 w-full overflow-hidden">
                            <img src={art.coverImage} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" alt="capa" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                            <span className="absolute bottom-3 left-4 bg-black/85 border border-gray-900 px-2 py-0.5 rounded text-[8px] font-mono uppercase text-gray-300">
                              {art.category}
                            </span>
                          </div>

                          <div className="p-6 space-y-2">
                            <h3 className="font-serif text-[#F4E4B5] text-base group-hover:text-white font-semibold transition-colors leading-snug">
                              {art.title}
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                              {art.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Article brief bottom row info */}
                        <div className="px-6 pb-6 pt-3 border-t border-gray-950 flex items-center justify-between text-[10px] font-mono text-gray-500">
                          <span>Ler: {art.readTime}</span>
                          <span className="text-[#D4AF37] hover:underline group-hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5">
                            Estudo Completo <ChevronRight className="w-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating customized WhatsApp Badge trigger */}
      <WhatsAppWidget onAddLead={handleAddLead} />

      {/* Structured Legal Footer */}
      <Footer onNavigate={handleNavigate} onAddLead={handleAddLead} />
    </div>
  );
}
