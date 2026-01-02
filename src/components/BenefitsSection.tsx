import { motion } from 'framer-motion';
import { DollarSign, MapPin, Shield, Headphones, Zap, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Transparência de Taxas',
    description: 'Sem custos ocultos. Veja o preço total all-in antes de reservar.',
  },
  {
    icon: MapPin,
    title: 'Rastreamento 24/7',
    description: 'Acompanhe sua carga em tempo real do início ao fim.',
  },
  {
    icon: Shield,
    title: 'Seguro Opcional',
    description: 'Proteção completa para sua carga com coberturas flexíveis.',
  },
  {
    icon: Headphones,
    title: 'Atendimento Dedicado',
    description: 'Suporte especializado disponível por chat, telefone ou email.',
  },
  {
    icon: Zap,
    title: 'Cotação em Segundos',
    description: 'Compare preços de múltiplas transportadoras instantaneamente.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios & Analytics',
    description: 'Dashboards completos para otimizar seus custos logísticos.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher nossa plataforma?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplifique sua logística com tecnologia de ponta e o melhor custo-benefício do mercado.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-quote transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
