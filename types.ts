
export type Language = 'ar' | 'en';
export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin?: string;
}

export interface TranslationDictionary {
  [key: string]: {
    [key: string]: string;
  };
}

export interface SiteSettings {
  brandNameAr: string;
  brandNameEn: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  showStatsOnHome: boolean;
  metaKeywordsAr: string;
  metaKeywordsEn: string;
  animations?: {
    type: string;
    speed: number;
    enabled: boolean;
  };
}

export interface NewsItem {
  id: number;
  date: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  contentAr?: string;
  contentEn?: string;
  image: string;
  author?: string;
}

export interface PriceItem {
  id: number;
  code: string;
  barcode?: string;
  nameAr: string;
  nameEn: string;
  price: number;
  categoryId: number;
  lastUpdated: string;
}

export interface ServiceItem {
  id: number;
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  isCustomIcon?: boolean;
}

export interface Publication {
  id: number;
  type: 'pdf' | 'excel';
  titleKey: string;
  size: string;
}

export interface PriceCategory {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface PrivacyPolicyContent {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}

export interface TeamMember {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  bioAr: string;
  bioEn: string;
  image: string;
}

export interface AboutUsContent {
  missionAr: string;
  missionEn: string;
  visionAr: string;
  visionEn: string;
  valuesAr: string;
  valuesEn: string;
}

export interface JobItem {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  requirementsAr: string;
  requirementsEn: string;
  instructionsAr: string;
  instructionsEn: string;
  keywordsAr: string;
  keywordsEn: string;
}

export interface VolunteerContent {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  contactEmail: string;
}

export interface DonationMethod {
  id: number;
  titleAr: string;
  titleEn: string;
  detailsAr: string;
  detailsEn: string;
  methodType: 'bank' | 'wallet' | 'cash';
  link?: string;
}

export interface SiteStatistics {
  totalReports: number;
  verifiedDiscrepancies: number;
  activeViolations: number;
}

export interface SuccessStory {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
}

export interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  feedbackAr: string;
  feedbackEn: string;
  image: string;
}

export interface Violation {
  id: number;
  lat: number;
  lng: number;
  typeAr: string;
  typeEn: string;
  date: string;
  descriptionAr: string;
  descriptionEn: string;
  status: 'pending' | 'verified' | 'resolved';
}
