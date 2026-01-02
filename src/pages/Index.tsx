import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { QuoteForm } from '@/components/QuoteForm';
import { QuoteResults } from '@/components/QuoteResults';
import { TrustSection } from '@/components/TrustSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { IntegrationsSection } from '@/components/IntegrationsSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { QuoteFormData, CarrierQuote } from '@/types/quote';
import { fetchQuotes } from '@/lib/mockQuotes';
import { tracking } from '@/lib/tracking';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<CarrierQuote[] | null>(null);
  const [formData, setFormData] = useState<QuoteFormData | null>(null);
  const [filterPreference, setFilterPreference] = useState<'price' | 'time'>('price');
  const [bookedQuote, setBookedQuote] = useState<CarrierQuote | null>(null);

  const handleSubmit = useCallback(async (data: QuoteFormData) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      const results = await fetchQuotes(data);
      setQuotes(results);
      
      // Track completion
      const lowestPrice = Math.min(...results.map(q => q.price));
      tracking.completeQuote(data.mode, results.length, lowestPrice);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBook = (quote: CarrierQuote) => {
    setBookedQuote(quote);
    // In production, this would open a booking modal or redirect to booking flow
  };

  const handleViewDetails = (quote: CarrierQuote) => {
    tracking.viewQuote(quote.id, quote.carrier, quote.price);
    // In production, this would open a details modal
  };

  const handleNewQuote = () => {
    setQuotes(null);
    setFormData(null);
    setBookedQuote(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                ✨ Cotação instantânea • Sem compromisso
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-display-sm md:text-display text-foreground mb-6"
            >
              Cotação de frete em segundos
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Compare preço, tempo e operadoras. Reserve online ou fale com um especialista.
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!quotes && !bookedQuote && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <QuoteForm onSubmit={handleSubmit} isLoading={isLoading} />
              </motion.div>
            )}

            {quotes && !bookedQuote && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <QuoteResults
                  quotes={quotes}
                  origin={formData?.origin || ''}
                  destination={formData?.destination || ''}
                  onBook={handleBook}
                  onViewDetails={handleViewDetails}
                  filterPreference={filterPreference}
                  onFilterChange={setFilterPreference}
                />
                
                <div className="text-center mt-8">
                  <Button variant="outline" onClick={handleNewQuote}>
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Nova Cotação
                  </Button>
                </div>
              </motion.div>
            )}

            {bookedQuote && (
              <motion.div
                key="booked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto text-center bg-card rounded-2xl shadow-float p-8"
              >
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Reserva Solicitada!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Sua reserva com <strong>{bookedQuote.carrier}</strong> foi solicitada.
                  Entraremos em contato em breve para confirmar os detalhes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="default" onClick={handleNewQuote}>
                    Nova Cotação
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      tracking.clickChat('whatsapp');
                      window.open('https://wa.me/5511999999999?text=Olá! Acabei de fazer uma reserva e gostaria de confirmar os detalhes.', '_blank');
                    }}
                  >
                    Falar no WhatsApp
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Integrations */}
      <IntegrationsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
