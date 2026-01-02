import { TrackingEvent } from '@/types/quote';

// Mock tracking implementation
// In production, replace with actual GA4/GTM implementation

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ event, properties = {} }: TrackingEvent): void {
  // Log to console in development
  console.log('[Analytics]', event, properties);

  // Push to dataLayer for GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...properties,
    });
  }

  // Send to GA4 if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties);
  }
}

// Pre-defined tracking functions
export const tracking = {
  viewQuote: (quoteId: string, carrier: string, price: number) => {
    trackEvent({
      event: 'view_quote',
      properties: { quote_id: quoteId, carrier, price },
    });
  },

  submitLead: (email?: string, phone?: string) => {
    trackEvent({
      event: 'submit_lead',
      properties: { 
        has_email: !!email, 
        has_phone: !!phone,
      },
    });
  },

  startQuote: (mode: string) => {
    trackEvent({
      event: 'start_quote',
      properties: { transport_mode: mode },
    });
  },

  completeQuote: (mode: string, quotesCount: number, lowestPrice: number) => {
    trackEvent({
      event: 'complete_quote',
      properties: { 
        transport_mode: mode, 
        quotes_count: quotesCount,
        lowest_price: lowestPrice,
      },
    });
  },

  clickCTA: (ctaName: string, location: string) => {
    trackEvent({
      event: 'click_cta',
      properties: { cta_name: ctaName, location },
    });
  },

  clickChat: (chatType: 'whatsapp' | 'livechat') => {
    trackEvent({
      event: 'click_chat',
      properties: { chat_type: chatType },
    });
  },

  abVariant: (testName: string, variant: string) => {
    trackEvent({
      event: 'a_b_variant',
      properties: { test_name: testName, variant },
    });
  },
};
