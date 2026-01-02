import { motion } from 'framer-motion';
import { Code, Database, RefreshCw, FileText, Webhook, Plug } from 'lucide-react';

const integrations = [
  {
    icon: Code,
    title: 'API RESTful',
    description: 'Integre cotações e reservas diretamente no seu sistema.',
  },
  {
    icon: Database,
    title: 'Conectores ERP',
    description: 'SAP, TOTVS, Oracle, Bling e outros ERPs suportados.',
  },
  {
    icon: RefreshCw,
    title: 'Suporte EDI',
    description: 'Troca eletrônica de dados para grandes volumes.',
  },
  {
    icon: FileText,
    title: 'Formatos aceitos',
    description: 'CSV, XML, JSON, Excel. Importe e exporte facilmente.',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Notificações em tempo real para seu sistema.',
  },
  {
    icon: Plug,
    title: 'Plugins E-commerce',
    description: 'Shopify, WooCommerce, Magento, VTEX.',
  },
];

export function IntegrationsSection() {
  return (
    <section id="integracoes" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Integrações & APIs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecte sua operação com as ferramentas que você já usa. Documentação completa e suporte técnico dedicado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border hover:border-primary/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* API Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 bg-foreground rounded-xl p-6 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground text-sm ml-4">api/v1/quotes</span>
          </div>
          <pre className="text-sm text-primary-foreground/80 overflow-x-auto">
            <code>{`POST /api/v1/quotes
{
  "origin": "01001-000",
  "destination": "88010-000",
  "weight": 500,
  "mode": "road"
}

// Response: 200 OK
{
  "quotes": [
    { "carrier": "JSL", "price": 1250.00, "transit": "3 dias" },
    { "carrier": "Braspress", "price": 1180.00, "transit": "4 dias" }
  ]
}`}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
