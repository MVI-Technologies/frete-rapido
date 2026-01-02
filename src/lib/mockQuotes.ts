import { QuoteFormData, CarrierQuote, TransportMode } from '@/types/quote';

// Mock carrier data
const carriers = {
  maritime: [
    { name: 'Maersk Line', logo: '🚢', rating: 4.8, reliability: '98%' },
    { name: 'MSC Shipping', logo: '🚢', rating: 4.6, reliability: '96%' },
    { name: 'CMA CGM', logo: '🚢', rating: 4.5, reliability: '95%' },
    { name: 'Hapag-Lloyd', logo: '🚢', rating: 4.7, reliability: '97%' },
  ],
  air: [
    { name: 'LATAM Cargo', logo: '✈️', rating: 4.7, reliability: '99%' },
    { name: 'Azul Cargo', logo: '✈️', rating: 4.5, reliability: '97%' },
    { name: 'Emirates SkyCargo', logo: '✈️', rating: 4.9, reliability: '99%' },
    { name: 'FedEx Express', logo: '✈️', rating: 4.8, reliability: '98%' },
  ],
  road: [
    { name: 'JSL Logística', logo: '🚚', rating: 4.6, reliability: '96%' },
    { name: 'Expresso Nepomuceno', logo: '🚚', rating: 4.4, reliability: '94%' },
    { name: 'Braspress', logo: '🚚', rating: 4.7, reliability: '97%' },
    { name: 'TNT Mercúrio', logo: '🚚', rating: 4.5, reliability: '95%' },
  ],
};

const transitTimeRanges: Record<TransportMode, { min: number; max: number }> = {
  maritime: { min: 15, max: 45 },
  air: { min: 1, max: 5 },
  road: { min: 2, max: 10 },
};

const basePricePerKg: Record<TransportMode, { min: number; max: number }> = {
  maritime: { min: 0.8, max: 2.5 },
  air: { min: 8, max: 25 },
  road: { min: 1.5, max: 5 },
};

function generateRandomPrice(mode: TransportMode, weight: number): number {
  const { min, max } = basePricePerKg[mode];
  const pricePerKg = min + Math.random() * (max - min);
  const basePrice = weight * pricePerKg;
  // Add some fixed costs
  const fixedCosts = mode === 'maritime' ? 500 : mode === 'air' ? 200 : 100;
  return Math.round((basePrice + fixedCosts) * 100) / 100;
}

function generateTransitDays(mode: TransportMode): number {
  const { min, max } = transitTimeRanges[mode];
  return Math.floor(min + Math.random() * (max - min));
}

function formatTransitTime(days: number): string {
  if (days === 1) return '1 dia útil';
  if (days <= 5) return `${days} dias úteis`;
  if (days <= 7) return '1 semana';
  if (days <= 14) return '2 semanas';
  if (days <= 21) return '3 semanas';
  if (days <= 30) return '1 mês';
  return `${Math.round(days / 7)} semanas`;
}

export function generateMockQuotes(formData: QuoteFormData): CarrierQuote[] {
  const modeCarriers = carriers[formData.mode];
  
  const quotes: CarrierQuote[] = modeCarriers.map((carrier, index) => {
    const transitDays = generateTransitDays(formData.mode);
    const price = generateRandomPrice(formData.mode, formData.weight);
    
    return {
      id: `quote-${formData.mode}-${index}`,
      carrier: carrier.name,
      carrierLogo: carrier.logo,
      price,
      currency: 'BRL',
      transitTime: formatTransitTime(transitDays),
      transitDays,
      mode: formData.mode,
      badges: [],
      rating: carrier.rating,
      reliability: carrier.reliability,
      co2Emission: formData.mode === 'air' ? 'Alto' : formData.mode === 'maritime' ? 'Baixo' : 'Médio',
      includesInsurance: Math.random() > 0.5,
    };
  });

  // Sort by price and assign badges
  const sortedByPrice = [...quotes].sort((a, b) => a.price - b.price);
  const sortedByTime = [...quotes].sort((a, b) => a.transitDays - b.transitDays);
  
  // Cheapest
  const cheapest = sortedByPrice[0];
  cheapest.badges.push('cheapest');
  
  // Fastest
  const fastest = sortedByTime[0];
  if (!fastest.badges.includes('cheapest')) {
    fastest.badges.push('fastest');
  } else {
    fastest.badges.push('fastest');
  }
  
  // Recommended (best value - good balance of price and time)
  const recommended = quotes.find(q => 
    q.rating >= 4.6 && 
    q.price <= sortedByPrice[1]?.price && 
    !q.badges.includes('cheapest') && 
    !q.badges.includes('fastest')
  ) || sortedByPrice[1];
  
  if (recommended && !recommended.badges.includes('cheapest') && !recommended.badges.includes('fastest')) {
    recommended.badges.push('recommended');
  }

  return quotes.sort((a, b) => {
    // Recommended first, then cheapest, then fastest
    if (a.badges.includes('recommended')) return -1;
    if (b.badges.includes('recommended')) return 1;
    if (a.badges.includes('cheapest')) return -1;
    if (b.badges.includes('cheapest')) return 1;
    return a.price - b.price;
  });
}

// Simulate API delay
export async function fetchQuotes(formData: QuoteFormData): Promise<CarrierQuote[]> {
  // Simulate network delay (800-1500ms for realism)
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  return generateMockQuotes(formData);
}
