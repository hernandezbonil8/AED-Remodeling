export type Language = 'en' | 'es';

export interface Project {
  id: string;
  title: string;
  category: string;
  description_en: string;
  description_es: string;
  imageUrl: string;
  videoUrl?: string;
  dateAdded: number;
}

export interface ServiceData {
  id: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  iconName: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  projectDescription: string;
  preferredDate: string;
  status: 'pending' | 'confirmed' | 'archived';
  submittedAt: number;
  budgetRange?: string;
}

export enum ProjectCategory {
  CARPENTRY = 'Carpentry',
  ELECTRICAL = 'Electrical',
  PLUMBING = 'Plumbing',
  DRYWALL_PAINT = 'Drywall & Paint',
  GENERAL_CONTRACTING = 'General Contracting',
  OTHER = 'Other'
}
