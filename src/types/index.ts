export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  link?: string;
}

export interface Skill {
  name: string;
  icon: string;
  tools: string;
  level: number;
}

export interface ContactInfo {
  type: string;
  icon: string;
  label: string;
  value: string;
}
