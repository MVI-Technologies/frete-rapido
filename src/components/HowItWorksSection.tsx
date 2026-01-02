import { motion } from 'framer-motion';
import { ClipboardList, Search, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Insira origem e destino',
    description: 'Preencha os dados básicos da sua carga: CEP ou cidade de origem/destino e peso.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Compare e escolha',
    description: 'Veja cotações de várias transportadoras, compare preços, prazos e avaliações.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Reserve ou agende',
    description: 'Reserve online em segundos ou fale com um especialista para cargas especiais.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em 3 passos simples, você obtém cotações e reserva seu frete.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="step-indicator mx-auto mb-6 relative z-10">
                    {step.number}
                  </div>

                  {/* Arrow (Mobile) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
