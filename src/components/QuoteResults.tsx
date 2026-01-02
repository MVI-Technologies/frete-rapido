import { motion } from 'framer-motion';
import { Clock, DollarSign, Star, Shield, Check, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarrierQuote, TransportMode } from '@/types/quote';
import { cn } from '@/lib/utils';
import { tracking } from '@/lib/tracking';

interface QuoteResultsProps {
  quotes: CarrierQuote[];
  origin: string;
  destination: string;
  onBook: (quote: CarrierQuote) => void;
  onViewDetails: (quote: CarrierQuote) => void;
  filterPreference?: 'price' | 'time';
  onFilterChange?: (preference: 'price' | 'time') => void;
}

const modeLabels: Record<TransportMode, string> = {
  maritime: 'Marítimo',
  air: 'Aéreo',
  road: 'Rodoviário',
};

const badgeConfig = {
  cheapest: {
    label: 'Menor Preço',
    className: 'badge-cheapest',
    icon: DollarSign,
  },
  fastest: {
    label: 'Mais Rápido',
    className: 'badge-fastest',
    icon: Zap,
  },
  recommended: {
    label: 'Recomendado',
    className: 'badge-recommended',
    icon: Sparkles,
  },
};

export function QuoteResults({
  quotes,
  origin,
  destination,
  onBook,
  onViewDetails,
  filterPreference = 'price',
  onFilterChange,
}: QuoteResultsProps) {
  const handleBook = (quote: CarrierQuote) => {
    tracking.clickCTA('book_quote', 'results');
    tracking.viewQuote(quote.id, quote.carrier, quote.price);
    onBook(quote);
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (filterPreference === 'time') {
      return a.transitDays - b.transitDays;
    }
    return a.price - b.price;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Cotações Disponíveis
          </h2>
          <p className="text-muted-foreground">
            {origin} → {destination} • {quotes.length} opções encontradas
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => onFilterChange?.('price')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all",
              filterPreference === 'price'
                ? "bg-card shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <DollarSign className="w-4 h-4 inline mr-1" />
            Menor Custo
          </button>
          <button
            onClick={() => onFilterChange?.('time')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all",
              filterPreference === 'time'
                ? "bg-card shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Clock className="w-4 h-4 inline mr-1" />
            Mais Rápido
          </button>
        </div>
      </div>

      {/* Quote Cards */}
      <div className="space-y-4">
        {sortedQuotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="quote-card p-5 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Carrier Info */}
              <div className="flex items-center gap-4 md:w-1/4">
                <div className="text-4xl">{quote.carrierLogo}</div>
                <div>
                  <h3 className="font-semibold text-foreground">{quote.carrier}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span>{quote.rating}</span>
                    <span className="text-muted-foreground/50">•</span>
                    <span>{quote.reliability} confiável</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 md:w-1/4">
                {quote.badges.map((badge) => {
                  const config = badgeConfig[badge];
                  const Icon = config.icon;
                  return (
                    <span
                      key={badge}
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                        config.className
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </span>
                  );
                })}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {modeLabels[quote.mode]}
                </span>
              </div>

              {/* Transit & Price */}
              <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/2">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Prazo</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{quote.transitTime}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Preço total</p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {quote.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="quote"
                    size="default"
                    onClick={() => handleBook(quote)}
                  >
                    Reservar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(quote)}
                    className="text-xs"
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
              {quote.includesInsurance && (
                <div className="flex items-center gap-1.5 text-sm text-success">
                  <Shield className="w-4 h-4" />
                  <span>Seguro incluído</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Check className="w-4 h-4" />
                <span>Rastreamento em tempo real</span>
              </div>
              {quote.co2Emission && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span>🌱 Emissão CO₂: {quote.co2Emission}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10 text-center"
      >
        <p className="text-foreground mb-3">
          Não encontrou o que procura? Fale com nossos especialistas para soluções personalizadas.
        </p>
        <Button
          variant="default"
          onClick={() => {
            tracking.clickCTA('custom_quote', 'results');
            tracking.clickChat('whatsapp');
            window.open('https://wa.me/5511999999999?text=Olá! Vi as cotações mas preciso de uma solução personalizada.', '_blank');
          }}
        >
          Solicitar Cotação Personalizada
        </Button>
      </motion.div>
    </motion.div>
  );
}
