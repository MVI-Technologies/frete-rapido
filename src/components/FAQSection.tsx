import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Como cotar frete internacional?',
    answer: 'Basta inserir o CEP de origem no Brasil e o código do porto ou cidade de destino internacional. Nossa plataforma suporta fretes marítimos e aéreos para mais de 150 países. Você receberá cotações instantâneas de múltiplas transportadoras.',
  },
  {
    question: 'Qual o prazo para receber uma cotação?',
    answer: 'As cotações são geradas instantaneamente, em menos de 30 segundos. Você verá múltiplas opções de transportadoras com preços, prazos e avaliações para comparar e escolher a melhor opção.',
  },
  {
    question: 'Como funciona a cotação de pallet?',
    answer: 'Para cotação de pallets, basta informar o peso total da carga (peso unitário × quantidade de pallets). Se precisar de cálculo por volume (m³), use o formulário avançado ou fale com nossos especialistas.',
  },
  {
    question: 'Os preços incluem todas as taxas?',
    answer: 'Sim! Trabalhamos com preços "all-in", ou seja, o valor mostrado inclui frete base, taxas de combustível, seguros básicos e impostos aplicáveis. Sem surpresas ou custos ocultos.',
  },
  {
    question: 'Posso rastrear minha carga?',
    answer: 'Absolutamente! Todas as cargas podem ser rastreadas em tempo real através da nossa plataforma. Você recebe atualizações automáticas por e-mail e SMS em cada etapa da entrega.',
  },
  {
    question: 'Quais modos de transporte são suportados?',
    answer: 'Oferecemos cotações para frete rodoviário (nacional e internacional), marítimo (FCL e LCL) e aéreo. Você pode comparar diferentes modais para encontrar o melhor custo-benefício.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre cotação e contratação de frete.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  "w-full flex items-center justify-between p-5 text-left transition-colors",
                  openIndex === index ? "bg-muted/50" : "hover:bg-muted/30"
                )}
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
