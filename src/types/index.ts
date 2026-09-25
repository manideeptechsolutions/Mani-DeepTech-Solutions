export type TabType = 
  | 'home'
  | 'ai-ml'
  | 'web-apps'
  | 'mobile-apps'
  | 'training'
  | 'final-year-projects'
  | 'blog'
  | 'about'
  | 'contact';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai-ml' | 'web-apps' | 'mobile-apps' | 'final-year';
  subtitle: string;
  description: string;
  tags: string[];
  metrics?: string;
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
  slug: string;
  category: 'AI & ML' | 'Web Development' | 'Mobile Apps' | 'Career & Projects';
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}
