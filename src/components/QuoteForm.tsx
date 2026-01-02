import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Plane, Ship, Truck, ArrowRight, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { QuoteFormData, TransportMode } from '@/types/quote';
import { quoteFormSchema, formatCEP } from '@/lib/validation';
import { tracking } from '@/lib/tracking';

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
}

const transportModes = [
  { value: 'maritime' as TransportMode, label: 'Marítimo', icon: Ship },
  { value: 'air' as TransportMode, label: 'Aéreo', icon: Plane },
  { value: 'road' as TransportMode, label: 'Rodoviário', icon: Truck },
];

export function QuoteForm({ onSubmit, isLoading = false }: QuoteFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [mode, setMode] = useState<TransportMode>('road');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasStarted, setHasStarted] = useState(false);

  const handleInputFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      tracking.startQuote(mode);
    }
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Auto-format if it looks like a CEP
    if (/^\d/.test(value)) {
      setOrigin(formatCEP(value));
    } else {
      setOrigin(value);
    }
    if (errors.origin) setErrors(prev => ({ ...prev, origin: '' }));
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d/.test(value)) {
      setDestination(formatCEP(value));
    } else {
      setDestination(value);
    }
    if (errors.destination) setErrors(prev => ({ ...prev, destination: '' }));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.');
    setWeight(value);
    if (errors.weight) setErrors(prev => ({ ...prev, weight: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      origin,
      destination,
      weight: parseFloat(weight) || 0,
      mode,
    };

    const result = quoteFormSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    tracking.clickCTA('get_quote', 'hero_form');
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-card rounded-2xl shadow-float p-6 md:p-8 space-y-5">
        {/* Transport Mode Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Modo de Transporte</Label>
          <div className="grid grid-cols-3 gap-2">
            {transportModes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all duration-200",
                  mode === value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin" className="text-sm font-medium">
              <MapPin className="w-4 h-4 inline mr-1.5 text-primary" />
              Origem
            </Label>
            <Input
              id="origin"
              placeholder="CEP ou cidade (ex: 01001-000)"
              value={origin}
              onChange={handleOriginChange}
              onFocus={handleInputFocus}
              className={cn(
                "form-input-focus h-12",
                errors.origin && "border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.origin && (
              <p className="text-xs text-destructive animate-fade-in">{errors.origin}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium">
              <MapPin className="w-4 h-4 inline mr-1.5 text-accent" />
              Destino
            </Label>
            <Input
              id="destination"
              placeholder="CEP ou cidade (ex: 88010-000)"
              value={destination}
              onChange={handleDestinationChange}
              onFocus={handleInputFocus}
              className={cn(
                "form-input-focus h-12",
                errors.destination && "border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.destination && (
              <p className="text-xs text-destructive animate-fade-in">{errors.destination}</p>
            )}
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium">
            <Package className="w-4 h-4 inline mr-1.5 text-muted-foreground" />
            Peso Total (kg)
          </Label>
          <Input
            id="weight"
            type="text"
            inputMode="decimal"
            placeholder="Ex: 500"
            value={weight}
            onChange={handleWeightChange}
            onFocus={handleInputFocus}
            className={cn(
              "form-input-focus h-12",
              errors.weight && "border-destructive focus:ring-destructive/20"
            )}
          />
          {errors.weight && (
            <p className="text-xs text-destructive animate-fade-in">{errors.weight}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Se for pallet, multiplique pelo número de pallets
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full pulse-accent"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              Obter Cotação Instantânea
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>

        {/* Secondary CTA */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground">Precisa de ajuda?</span>
          <Button
            type="button"
            variant="link"
            className="text-sm p-0 h-auto text-primary"
            onClick={() => {
              tracking.clickCTA('talk_specialist', 'hero_form');
              tracking.clickChat('whatsapp');
              window.open('https://wa.me/5511999999999?text=Olá! Preciso de ajuda com uma cotação de frete.', '_blank');
            }}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Falar com especialista
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
