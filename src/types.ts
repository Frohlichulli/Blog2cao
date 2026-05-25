/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  date: string;
  text: string;
  isApproved: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string; // Mark-ready text or beautiful structure
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  likes: number;
  views: number;
  seoKeywords: string[];
  metaDescription: string;
  isUserCreated?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  seoTitle: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  description: string[];
  icon: string; // Lucide icon identifier
  benefits: string[];
  faqs: Faq[];
  keywords: string[];
  metaDescription: string;
  coverImage: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed?: string;
  serviceInterest: string;
  message: string;
  date: string;
  type: 'newsletter' | 'contact' | 'evaluation';
  status: 'Novo' | 'Em Atendimento' | 'Concluído';
}
