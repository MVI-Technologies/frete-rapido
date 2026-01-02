export type TransportMode = 'maritime' | 'air' | 'road';

export interface QuoteFormData {
  origin: string;
  destination: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  mode: TransportMode;
  email?: string;
  phone?: string;
}

export interface CarrierQuote {
  id: string;
  carrier: string;
  carrierLogo: string;
  price: number;
  currency: string;
  transitTime: string;
  transitDays: number;
  mode: TransportMode;
  badges: ('fastest' | 'cheapest' | 'recommended')[];
  rating: number;
  reliability: string;
  co2Emission?: string;
  includesInsurance: boolean;
}

export interface QuoteResult {
  quotes: CarrierQuote[];
  origin: string;
  destination: string;
  estimatedWeight: number;
  mode: TransportMode;
}

export interface TrackingEvent {
  event: 'view_quote' | 'submit_lead' | 'start_quote' | 'complete_quote' | 'click_cta' | 'click_chat' | 'a_b_variant';
  properties?: Record<string, string | number | boolean>;
}
