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
      className="w-full max-w-4xl mx-auto px-4 sm:px-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Cotações Disponíveis
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground break-words mt-1">
            <span className="font-medium">{origin}</span> → <span className="font-medium">{destination}</span>
            <span className="mx-2">•</span>
            <span>{quotes.length} {quotes.length === 1 ? 'opção encontrada' : 'opções encontradas'}</span>
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg w-full sm:w-auto sm:self-start">
          <button
            onClick={() => onFilterChange?.('price')}
            className={cn(
              "flex-1 sm:flex-initial px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap",
              filterPreference === 'price'
                ? "bg-card shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-1.5" />
            <span className="hidden sm:inline">Menor Custo</span>
            <span className="inline sm:hidden">Custo</span>
          </button>
          <button
            onClick={() => onFilterChange?.('time')}
            className={cn(
              "flex-1 sm:flex-initial px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap",
              filterPreference === 'time'
                ? "bg-card shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-1.5" />
            <span className="hidden sm:inline">Mais Rápido</span>
            <span className="inline sm:hidden">Rápido</span>
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
            className="quote-card p-4 sm:p-5 lg:p-6"
          >
            <div className="flex flex-col gap-4">
              {/* Carrier Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl flex-shrink-0" role="img" aria-label="Logo da transportadora">
                  {quote.carrierLogo}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg truncate">
                    {quote.carrier}
                  </h3>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground flex-wrap mt-0.5 sm:mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-warning text-warning flex-shrink-0" />
                      <span className="font-medium">{quote.rating}</span>
                    </div>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="truncate">{quote.reliability} confiável</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {quote.badges.map((badge) => {
                  const config = badgeConfig[badge];
                  const Icon = config.icon;
                  return (
                    <span
                      key={badge}
                      className={cn(
                        "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold",
                        config.className
                      )}
                    >
                      <Icon className="w-3 h-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">{config.label}</span>
                    </span>
                  );
                })}
                <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {modeLabels[quote.mode]}
                </span>
              </div>

              {/* Transit & Price - Desktop Layout (MD+) */}
              <div className="hidden md:flex md:items-center md:justify-between md:gap-6">
                <div className="flex items-center gap-8 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Prazo</span>
                    </div>
                    <p className="text-lg lg:text-xl font-semibold text-foreground">{quote.transitTime}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Preço total</p>
                    <p className="text-2xl lg:text-3xl font-bold text-primary whitespace-nowrap">
                      R$ {quote.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 align-center items-center">
                  <Button
                    variant="quote"
                    size="default"
                    onClick={() => handleBook(quote)}
                    className="px-6"
                  >
                    Reservar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(quote)}
                    className="text-sm"
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>

              {/* Transit & Price - Mobile/Tablet Layout (SM to MD) */}
              <div className="flex md:hidden flex-col gap-4">
                <div className="flex items-center justify-between sm:justify-start sm:gap-8 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground mb-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Prazo</span>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-foreground">{quote.transitTime}</p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Preço total</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary whitespace-nowrap">
                      R$ {quote.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    variant="quote"
                    size="default"
                    onClick={() => handleBook(quote)}
                    className="w-full sm:flex-1"
                  >
                    Reservar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(quote)}
                    className="text-xs sm:text-sm w-full sm:flex-1"
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 mt-4 pt-4 border-t border-border text-xs sm:text-sm">
              {quote.includesInsurance && (
                <div className="flex items-center gap-1.5 text-success">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Seguro incluído</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap sm:whitespace-normal">Rastreamento em tempo real</span>
              </div>
              {quote.co2Emission && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="whitespace-nowrap">
                    🌱 <span className="hidden sm:inline">Emissão </span>CO₂: {quote.co2Emission}
                  </span>
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
        className="mt-8 p-4 sm:p-6 lg:p-8 bg-primary/5 rounded-xl border border-primary/10 text-center"
      >
        <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">
          Não encontrou o que procura? Fale com nossos especialistas para soluções personalizadas.
        </p>
        <Button
          variant="default"
          size="default"
          onClick={() => {
            tracking.clickCTA('custom_quote', 'results');
            tracking.clickChat('whatsapp');
            window.open('https://wa.me/5511999999999?text=Olá! Vi as cotações mas preciso de uma solução personalizada.', '_blank');
          }}
          className="w-full sm:w-auto"
        >
          Solicitar Cotação Personalizada
        </Button>
      </motion.div>
    </motion.div>
  );
}