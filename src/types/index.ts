export type TabType = 
  | 'home'
  | 'ai-ml'
  | 'web-apps'
  | 'mobile-apps'
  | 'training'
  | 'final-year-projects'
  | 'blog'
  | 'about'
  | 'contact'
  | 'admin';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai-ml' | 'web-apps' | 'mobile-apps' | 'final-year';
  subtitle: string;
  description: string;
  tags: string[];
  techHighlight?: string;
  featured?: boolean;
  architecture?: string[];
  deliverables?: string[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: 'programming' | 'aiml' | 'flagship';
  badge: string;
  duration: string;
  level: string;
  highlights: string[];
  description: string;
  tools: string[];
  pricing?: string;
  isFlagship?: boolean;
  link?: string;
}

export interface FinalYearProjectDomain {
  id: string;
  domain: string;
  description: string;
  popularTopics: string[];
  techStack: string[];
  deliverables: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  imageDescription?: string;
  imageUrl?: string;
  excerpt: string;
  content: string[];
  createdAt?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
  createdAt?: string;
}
