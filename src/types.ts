/* Types for LOGESH_OS */

export type SectionId =
  | 'about'
  | 'techstacks'
  | 'projects'
  | 'contact'
  | 'projects/cognifocus'
  | 'projects/startup-valuation'
  | 'projects/image-authenticity'
  | 'projects/email-triage';

export interface DesktopIcon {
  id: string;
  label: string;
  section?: SectionId;
  isSpecial?: boolean; // for Camera.exe, Snake.exe etc.
  iconType: 'about' | 'techstacks' | 'projects' | 'contact' | 'camera' | 'snake';
}

export interface BrowserState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  activeSection: SectionId;
  history: SectionId[];
  historyIndex: number;
}

export interface ProjectData {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Prototype' | 'Concept';
  description: string;
  problem: string;
  implemented: string[];
  technologies: string[];
  approach?: string;
  dataset?: string;
  results?: string;
  limitations?: string;
  githubUrl?: string;
  liveUrl?: string;
  icon: 'folder' | 'file';
}

export interface TechCategory {
  id: string;
  name: string;
  icon: string;
  skills: TechSkill[];
}

export interface TechSkill {
  name: string;
  level: 'Used in projects' | 'Comfortable with' | 'Currently learning';
}

export const SECTION_PATHS: Record<SectionId, string> = {
  about: 'C:\\LOGESH_OS\\ABOUT.HTML',
  techstacks: 'C:\\LOGESH_OS\\TECHSTACKS.HTML',
  projects: 'C:\\Documents and Settings\\Logesh\\My Documents\\My Projects',
  contact: 'C:\\LOGESH_OS\\CONTACT.HTML',
  'projects/cognifocus': 'C:\\Documents and Settings\\Logesh\\My Documents\\My Projects\\CogniFocus',
  'projects/startup-valuation': 'C:\\Documents and Settings\\Logesh\\My Documents\\My Projects\\Startup Valuation Engine',
  'projects/image-authenticity': 'C:\\Documents and Settings\\Logesh\\My Documents\\My Projects\\Image Authenticity Detection',
  'projects/email-triage': 'C:\\Documents and Settings\\Logesh\\My Documents\\My Projects\\Intelligent Email Triage',
};

export const SECTION_TITLES: Record<SectionId, string> = {
  about: 'About Me',
  techstacks: 'Tech Stacks',
  projects: 'My Projects',
  contact: 'Contact',
  'projects/cognifocus': 'CogniFocus — Project Detail',
  'projects/startup-valuation': 'Startup Valuation Engine — Project Detail',
  'projects/image-authenticity': 'CNN Image Authenticity Detection — Project Detail',
  'projects/email-triage': 'Intelligent Email Triage — Project Detail',
};
