import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Diretor de Logística',
    company: 'TechStore Brasil',
    image: '👨‍💼',
    quote: 'Reduzimos nosso custo de frete em 23% nos primeiros 3 meses. A transparência de preços mudou nosso jogo.',
    metric: '-23% custo',
    rating: 5,
  },
  {
    name: 'Ana Paula Santos',
    role: 'Head de Operações',
    company: 'FashionBox',
    image: '👩‍💼',
    quote: 'Antes levávamos horas para cotar fretes. Agora fazemos em segundos. Nosso time de logística triplicou a produtividade.',
    metric: '3x mais produtivo',
    rating: 5,
  },
  {
    name: 'Roberto Mendes',
    role: 'CEO',
    company: 'Indústria Mendes',
    image: '👨‍🔧',
    quote: 'O rastreamento em tempo real nos dá visibilidade total. Nossos clientes adoram saber exatamente onde está a entrega.',
    metric: '98% satisfação cliente',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empresas de todos os tamanhos confiam em nós para suas operações logísticas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative bg-card rounded-xl p-6 border border-border hover:shadow-quote transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

              {/* Metric Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
                {testimonial.metric}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
