export interface LineItem {
  id: string;
  description_en: string;
  description_es: string;
  quantity: number;
  price: number;
  total: number;
}

export interface EstimateData {
  id: string;
  // Client Info
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  clientPhone: string;
  clientEmail: string;

  // Project Info
  estimateNumber: string;
  estimateDate: string;
  startDate: string;
  endDate: string;
  projectType: string;
  description_en: string;
  description_es: string;

  // Line Items
  items: LineItem[];

  // Calculations
  subtotal: number;
  discountType: 'fixed' | 'percent';
  discountValue: number;
  taxRate: number;
  totalDue: number;
  deposit: number;
  balance: number;

  // Notes & Terms
  notes_en: string;
  notes_es: string;
  terms_en: string;
  terms_es: string;

  // Contract
  colorSelections_en: string;
  colorSelections_es: string;
  clientSignature: string | null; // Base64 image
  signatureDate: string;
  
  // Metadata
  status: 'draft' | 'saved';
  lastModified: number;
}

export const DEFAULT_TERMS = `1. DEPOSIT: A deposit of 50% is required to schedule the work.
2. COMPLETION: The balance is due upon substantial completion of the work.
3. CANCELLATION: You may cancel this transaction at any time prior to midnight of the third business day after the date of this transaction.
4. CHANGES: Any changes to the scope of work must be agreed upon in writing.
5. WARRANTY: We provide a 2-year warranty on workmanship.`;
