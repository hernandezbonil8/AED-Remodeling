import { Project, ProjectCategory, ServiceData, Language } from './types';

// Projects Data
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Custom Deck Build',
    category: ProjectCategory.CARPENTRY,
    description_en: 'Built a beautiful custom wooden deck with built-in seating.',
    description_es: 'Construimos una hermosa terraza de madera personalizada con asientos integrados.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    dateAdded: Date.now() - 100000,
  },
  {
    id: '2',
    title: 'Panel Upgrade',
    category: ProjectCategory.ELECTRICAL,
    description_en: 'Upgraded main electrical panel to 200 amps for a residential home.',
    description_es: 'Actualización del panel eléctrico principal a 200 amperios para una casa residencial.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    dateAdded: Date.now() - 200000,
  },
  {
    id: '3',
    title: 'Bathroom Pipe Replacement',
    category: ProjectCategory.PLUMBING,
    description_en: 'Complete repiping of a master bathroom during a remodel.',
    description_es: 'Reemplazo completo de tuberías de un baño principal durante una remodelación.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    dateAdded: Date.now() - 300000,
  },
  {
    id: '4',
    title: 'Living Room Drywall & Paint',
    category: ProjectCategory.DRYWALL_PAINT,
    description_en: 'Patched, textured, and painted a large living space.',
    description_es: 'Parcheado, texturizado y pintado de un gran espacio habitable.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    dateAdded: Date.now() - 400000,
  },
  {
    id: '5',
    title: 'Full Basement Remodel',
    category: ProjectCategory.GENERAL_CONTRACTING,
    description_en: 'Complete basement finishing including framing, electrical, and flooring.',
    description_es: 'Acabado completo del sótano incluyendo estructura, electricidad y pisos.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    dateAdded: Date.now() - 500000,
  },
];

export const SERVICES_DATA: ServiceData[] = [
  {
    id: 's1',
    title_en: 'Carpentry',
    title_es: 'Carpintería',
    description_en: 'Custom woodwork, framing, decking, and finishing carpentry.',
    description_es: 'Trabajos en madera a medida, estructuras, terrazas y carpintería de acabado.',
    iconName: 'Hammer'
  },
  {
    id: 's2',
    title_en: 'Electrical',
    title_es: 'Electricidad',
    description_en: 'Panel upgrades, lighting installations, and general electrical repairs.',
    description_es: 'Actualización de paneles, instalaciones de iluminación y reparaciones eléctricas generales.',
    iconName: 'Zap'
  },
  {
    id: 's3',
    title_en: 'Plumbing',
    title_es: 'Plomería',
    description_en: 'Pipe repairs, fixture installations, and full bathroom rough-ins.',
    description_es: 'Reparaciones de tuberías, instalación de accesorios y preparación completa de baños.',
    iconName: 'Droplets'
  },
  {
    id: 's4',
    title_en: 'Drywall & Paint',
    title_es: 'Panel de Yeso y Pintura',
    description_en: 'Seamless drywall installation, texturing, and premium interior/exterior painting.',
    description_es: 'Instalación impecable de paneles de yeso, texturizado y pintura premium para interiores/exteriores.',
    iconName: 'PaintRoller'
  },
  {
    id: 's5',
    title_en: 'General Contracting',
    title_es: 'Contratista General',
    description_en: 'Full-scale remodeling, flooring, tile work, and complete project management.',
    description_es: 'Remodelación a gran escala, pisos, trabajos en azulejos y gestión completa de proyectos.',
    iconName: 'HardHat'
  }
];

export const getInitialProjects = (): Project[] => PROJECTS;
export const getServices = (): ServiceData[] => SERVICES_DATA;

// Centralized configuration for the Before & After Showcase
export const BEFORE_AFTER_SHOWCASE = {
  beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200', // Typically a darker/older or unfinished room (using standard unsplash for now)
  afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',  // Beautiful remodeled room
  altText_en: 'Complete Home Renovation Showcase',
  altText_es: 'Exhibición de Renovación Completa del Hogar'
};
