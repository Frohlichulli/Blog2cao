/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { Article, Lead, Comment } from '../types';
import { 
  Plus, Trash2, Edit, FileText, Users, MessageSquare, 
  Check, Lock, LogOut, Code, AlertCircle, Image as ImageIcon, Send 
} from 'lucide-react';

interface CmsPanelProps {
  articles: Article[];
  leads: Lead[];
  comments: Comment[];
  onAddArticle: (article: Article) => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onUpdateLeadStatus: (id: string, status: 'Novo' | 'Em Atendimento' | 'Concluído') => void;
  onDeleteLead: (id: string) => void;
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
}

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', label: 'Cão Atento Retrato' },
  { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80', label: 'Treino de Obediência' },
  { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80', label: 'Cães Brincando' },
  { url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80', label: 'Fisioterapia Proprioceptiva' },
  { url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80', label: 'Cão Calmo' },
];

export function CmsPanel({
  articles,
  leads,
  comments,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  onUpdateLeadStatus,
  onDeleteLead,
  onApproveComment,
  onDeleteComment,
}: CmsPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [cmsTab, setCmsTab] = useState<'articles' | 'leads' | 'comments'>('articles');
  
  // Article Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Ciência Comportamental');
  const [tagsInput, setTagsInput] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [readTime, setReadTime] = useState('5 min de leitura');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'andre123' || adminPassword === 'admin' || adminPassword === '') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha inválida. Tente "admin" ou deixe em branco.');
    }
  };

  const startNewArticle = () => {
    setEditArticleId(null);
    setTitle('');
    setSubtitle('');
    setExcerpt('');
    setContent('');
    setCategory('Ciência Comportamental');
    setTagsInput('Adestramento, Comportamento, Biomecânica');
    setCoverImage(PRESET_IMAGES[0].url);
    setCustomImageUrl('');
    setReadTime('6 min de leitura');
    setIsEditing(true);
  };

  const startEditArticle = (article: Article) => {
    setEditArticleId(article.id);
    setTitle(article.title);
    setSubtitle(article.subtitle);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setCategory(article.category);
    setTagsInput(article.tags.join(', '));
    setCoverImage(article.coverImage);
    setCustomImageUrl(PRESET_IMAGES.some(p => p.url === article.coverImage) ? '' : article.coverImage);
    setReadTime(article.readTime);
    setIsEditing(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert('Por favor, preencha o título e o conteúdo.');

    const chosenImage = customImageUrl || coverImage;
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editArticleId) {
      // Edit
      const orig = articles.find(a => a.id === editArticleId);
      onEditArticle({
        id: editArticleId,
        title,
        slug,
        subtitle,
        excerpt: excerpt || title.substring(0, 100) + '...',
        content,
        author: orig?.author || {
          name: 'André Frohlich',
          role: 'Fundador & Diretor',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        date: orig?.date || new Date().toISOString().split('T')[0],
        category,
        tags: tagsArray,
        coverImage: chosenImage,
        readTime,
        likes: orig?.likes || 10,
        views: orig?.views || 35,
        seoKeywords: tagsArray.map(t => `${t.toLowerCase()} adestramento rs`),
        metaDescription: subtitle.substring(0, 150)
      });
    } else {
      // Create New
      onAddArticle({
        id: 'user-' + Date.now().toString(),
        title,
        slug,
        subtitle,
        excerpt: excerpt || title.substring(0, 100) + '...',
        content,
        author: {
          name: 'André Frohlich',
          role: 'Fundador & Diretor',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        date: new Date().toISOString().split('T')[0],
        category,
        tags: tagsArray,
        coverImage: chosenImage,
        readTime,
        likes: 1,
        views: 12,
        seoKeywords: tagsArray.map(t => `${t.toLowerCase()} adestramento rs`),
        metaDescription: subtitle.substring(0, 150),
        isUserCreated: true
      });
    }

    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-[#121212] border border-[#D4AF37]/20 p-8 rounded-2xl cinema-shadow text-center">
        <div className="h-14 w-14 rounded-full bg-[#004B63] text-[#F4E4B5] flex items-center justify-center mx-auto mb-5 border border-[#D4AF37]/10">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl text-[#F4E4B5] tracking-wide mb-1">Acesso Restrito CMS</h2>
        <p className="text-xs text-gray-400 mb-6 font-mono">CÃO MEU AMIGO ● PAINEL EXCLUSIVO</p>
        
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1.5">
              Identificação do Adestrador
            </label>
            <input
              type="text"
              disabled
              value="andrefrohlich@caomeuamigo.com.br"
              className="w-full bg-[#0A0A0A] border border-[#D4AF37]/5 rounded-lg px-3 py-2.5 text-xs text-gray-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1.5">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Digite &apos;admin&apos; ou clique em entrar"
              className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2.5 text-xs text-gray-200 outline-none transition-colors"
            />
          </div>

          {authError && (
            <div className="text-[11px] text-red-400 bg-red-950/20 border border-red-900 px-3 py-2 rounded flex items-center gap-1.5 font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
          >
            Autenticar no Sistema
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] border border-[#D4AF37]/15 rounded-2xl p-6 cinema-shadow">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="André Frohlich Director"
              className="h-14 w-14 rounded-full border-2 border-[#D4AF37] object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#121212]"></span>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#F4E4B5] tracking-wide">André Frohlich</h3>
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Painel Administrativo CMS Ativo</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/20 px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Desconectar
          </button>
        </div>
      </div>

      {/* Grid CMS Navigation tabs */}
      <div className="flex border-b border-[#D4AF37]/15 text-xs font-mono">
        <button
          onClick={() => { setCmsTab('articles'); setIsEditing(false); }}
          className={`flex items-center gap-2 px-5 py-3 cursor-pointer border-b-2 transition-colors ${
            cmsTab === 'articles' ? 'border-[#D4AF37] text-[#F4E4B5]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Artigos do Blog ({articles.length})
        </button>
        <button
          onClick={() => { setCmsTab('leads'); setIsEditing(false); }}
          className={`flex items-center gap-2 px-5 py-3 cursor-pointer border-b-2 transition-colors relative ${
            cmsTab === 'leads' ? 'border-[#D4AF37] text-[#F4E4B5]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Leads Recebidos ({leads.length})
          {leads.some(l => l.status === 'Novo') && (
            <span className="absolute top-2.5 right-1 h-2 w-2 rounded-full bg-emerald-500"></span>
          )}
        </button>
        <button
          onClick={() => { setCmsTab('comments'); setIsEditing(false); }}
          className={`flex items-center gap-2 px-5 py-3 cursor-pointer border-b-2 transition-colors ${
            cmsTab === 'comments' ? 'border-[#D4AF37] text-[#F4E4B5]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Comentários ({comments.length})
          {comments.some(c => !c.isApproved) && (
            <span className="absolute top-2.5 right-1 h-2 w-2 rounded-full bg-amber-500"></span>
          )}
        </button>
      </div>

      {/* Editor or lists */}
      {isEditing ? (
        <form onSubmit={handleSaveArticle} className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h4 className="font-serif text-lg text-[#F4E4B5]">
              {editArticleId ? 'Editar Artigo Cinematográfico' : 'Criar Novo Artigo Acadêmico'}
            </h4>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer border border-gray-800 px-3 py-1.5 rounded-lg"
            >
              Cancelar Edição
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">Título do Artigo *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Como Adestrar um Border Collie biomecanicamente"
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] content-box rounded-lg px-3 py-2 text-sm text-gray-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">Linguagem / Subtítulo</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Um guia científico de comportamento e cinesioterapia aplicada."
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">Categoria Principal</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
              >
                <option value="Ciência Comportamental">Ciência Comportamental</option>
                <option value="Educação de Tutores">Educação de Tutores</option>
                <option value="Socialização e Prevenção">Socialização e Prevenção</option>
                <option value="Higiene e Rotina">Higiene e Rotina</option>
                <option value="Cães de Elite & Cinema">Cães de Elite & Cinema</option>
                <option value="Correção de Desvios">Correção de Desvios</option>
                <option value="Adestramento Técnico">Adestramento Técnico</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">Tags (Separadas por Vírgula)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Dicas, Canino, Biomecânica"
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">Tempo de Leitura Calculado</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="Ex: 8 min de leitura"
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none"
              />
            </div>
          </div>

          {/* Media upload mock image select / custom URL */}
          <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#D4AF37]/10 space-y-3">
            <span className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Carregamento de Imagem de Captação e Capa
            </span>
            
            <p className="text-[11px] text-gray-400">
              Escolha uma imagem canina de alta resolução premium do nosso banco ou providencie uma URL customizada:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => { setCoverImage(img.url); setCustomImageUrl(''); }}
                  className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer ${
                    coverImage === img.url && !customImageUrl ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/25' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} className="h-full w-full object-cover" alt={img.label} />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-center text-white py-0.5 whitespace-nowrap block truncate">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-[10px] uppercase text-gray-400 font-mono mb-1">Ou Insira uma URL Externa:</label>
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-[#121212] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-300 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-mono mb-1">Conteúdo do Artigo (Suporta HTML ou Parágrafos Simples) *</label>
            <textarea
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva as análises clínicas comportamentais de forma robusta e internacional..."
              className="w-full bg-[#0A0A0A] border border-[#D4AF37]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none leading-relaxed font-sans"
            />
          </div>

          <div className="pt-3 border-t border-gray-800 text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#A1801F] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F4E4B5] text-black font-semibold py-2.5 px-6 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ml-auto cursor-pointer shadow-lg"
            >
              <Send className="w-3.5 h-3.5" /> Salvar & Publicar Artigo
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-2xl overflow-hidden shadow-xl">
          {/* List display based on selected inner CMS Tab */}
          {cmsTab === 'articles' && (
            <div>
              <div className="px-6 py-4 bg-[#1E1E1E] border-b border-[#D4AF37]/10 flex items-center justify-between">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#F4E4B5] uppercase">Lista de Matérias do Blog</h4>
                <button
                  onClick={startNewArticle}
                  className="bg-[#004B63] hover:bg-[#D4AF37] text-[#F4E4B5] hover:text-black font-mono text-[10px] uppercase font-bold py-1.5 px-3 rounded border border-[#D4AF37]/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Novo Artigo
                </button>
              </div>

              <div className="divide-y divide-gray-800">
                {articles.map((art) => (
                  <div key={art.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1E1E1E]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <img src={art.coverImage} className="h-10 w-16 object-cover rounded-md border border-gray-800" alt="capa" />
                      <div>
                        <h5 className="font-serif text-[#F4E4B5] text-sm leading-tight font-semibold">{art.title}</h5>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-mono">
                          <span>{art.category}</span>
                          <span>•</span>
                          <span>{art.date}</span>
                          {art.isUserCreated && (
                            <span className="bg-[#004B63] text-emerald-400 border border-emerald-500/20 px-1 rounded text-[8px]">ADICIONADO</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                       <button
                        onClick={() => startEditArticle(art)}
                        className="text-gray-400 hover:text-[#D4AF37] p-2 hover:bg-[#0A0A0A] rounded transition-all cursor-pointer"
                        title="Editar Artigo"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Tem certeza de que deseja expurgar este artigo do rodapé do blog?')) {
                            onDeleteArticle(art.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-400 p-2 hover:bg-[#0A0A0A] rounded transition-all cursor-pointer"
                        title="Deletar Artigo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cmsTab === 'leads' && (
            <div>
              <div className="px-6 py-4 bg-[#1E1E1E] border-b border-[#D4AF37]/10">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#F4E4B5] uppercase">Lista de Clientes e Leads Coletados</h4>
              </div>

              {leads.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  Nenhum lead coletado até o momento.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300 font-sans">
                    <thead className="bg-[#0A0A0A] text-[9px] uppercase font-mono tracking-wider border-b border-[#D4AF37]/10 text-gray-400">
                      <tr>
                        <th className="p-4">Interessado</th>
                        <th className="p-4">Cão / Raça</th>
                        <th className="p-4">Serviço / Mensagem</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-800/10">
                          <td className="p-4">
                            <span className="font-semibold block text-white">{lead.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{lead.email}</span>
                            <span className="text-[10px] text-emerald-400 block font-mono">{lead.phone}</span>
                          </td>
                          <td className="p-4 font-mono text-[11px]">
                            <span>{lead.dogName}</span>
                            {lead.dogBreed && <span className="text-gray-500 block text-[9px]">{lead.dogBreed}</span>}
                          </td>
                          <td className="p-4 max-w-xs">
                            <span className="bg-[#004B63] text-[#F4E4B5] px-1.5 py-0.5 rounded text-[9px] block w-fit font-mono mb-1">{lead.serviceInterest}</span>
                            <p className="text-[10px] text-gray-400 truncate" title={lead.message}>{lead.message}</p>
                          </td>
                          <td className="p-4">
                            <select
                               value={lead.status}
                              onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                              className={`text-[9px] uppercase tracking-wider font-mono rounded px-2 py-1 outline-none font-bold border cursor-pointer ${
                                lead.status === 'Novo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                lead.status === 'Em Atendimento' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-gray-800 text-gray-400 border-gray-700'
                              }`}
                            >
                              <option value="Novo">Novo</option>
                              <option value="Em Atendimento">Em Atendimento</option>
                              <option value="Concluído">Concluído</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => onDeleteLead(lead.id)}
                              className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-[#0A0A0A] cursor-pointer"
                              title="Remover Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {cmsTab === 'comments' && (
            <div>
              <div className="px-6 py-4 bg-[#1E1E1E] border-b border-[#D4AF37]/10">
                <h4 className="font-serif text-sm font-semibold tracking-wider text-[#F4E4B5] uppercase">Moderação de Comentários</h4>
              </div>

              {comments.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  Nenhum comentário adicionado ao blog.
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {comments.map((com) => (
                    <div key={com.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif text-white text-xs font-semibold">{com.author}</span>
                          <span className="text-[9px] font-mono text-gray-500">{com.date}</span>
                          {com.isApproved ? (
                            <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1 rounded font-mono">APROVADO</span>
                          ) : (
                            <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-1 rounded font-mono">AGUARDANDO MODERAÇÃO</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 italic">"{com.text}"</p>
                      </div>

                      <div className="flex items-center gap-2 bg-black/25 p-1 rounded-lg self-end md:self-auto">
                        {!com.isApproved && (
                          <button
                            onClick={() => onApproveComment(com.id)}
                            className="bg-[#004B63] text-emerald-400 hover:bg-[#D4AF37] hover:text-black text-[9px] uppercase tracking-wider font-mono font-bold py-1 px-2.5 rounded transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Aprovar
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteComment(com.id)}
                          className="text-gray-400 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                          title="Remover Comentário"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
