import { motion } from 'framer-motion';

const trustLogos = [
  { name: 'Mercado Livre', icon: '🛒' },
  { name: 'Magazine Luiza', icon: '🏬' },
  { name: 'Amazon Brasil', icon: '📦' },
  { name: 'Shopee', icon: '🛍️' },
  { name: 'Via Varejo', icon: '🏪' },
];

const stats = [
  { value: '15.000+', label: 'Empresas confiam' },
  { value: '500K+', label: 'Cotações/mês' },
  { value: '98%', label: 'Satisfação' },
];

export function TrustSection() {
  return (
    <section className="py-8 border-t border-b border-border/50 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Stats */}
          <div className="flex items-center gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Logos */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground hidden md:block">
              Usado por:
            </span>
            <div className="flex items-center gap-4">
              {trustLogos.map((logo, index) => (
                <motion.div
                  key={logo.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="trust-logo text-2xl"
                  title={logo.name}
                >
                  {logo.icon}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
