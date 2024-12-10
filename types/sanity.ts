// Education type
export interface Education {
  school: string;
  degree: string;
  period: string;
  desc: string;
}

// Skill type
export interface Skill {
  category: string;
  items: string[];
}

// Experience type
export interface Experience {
  company: string;
  role: string;
  period: string;
  desc: string;
}

// About type
export interface AboutData {
  name: string;
  bio: string;
  profileImage: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}

// Post type
export interface Post {
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  slug: string;
} 