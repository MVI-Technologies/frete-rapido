import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { tracking } from '@/lib/tracking';
import { cn } from '@/lib/utils';

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    tracking.submitLead(formData.email, formData.phone);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* CTA Banner */}
      <div className="hero-gradient py-12">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para simplificar sua logística?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Obtenha cotações instantâneas e comece a economizar hoje mesmo.
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => {
                tracking.clickCTA('footer_cta', 'footer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Começar Agora — É Grátis
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">Fale Conosco</h3>
              
              {submitted ? (
                <div className="bg-success/20 border border-success/30 rounded-lg p-6 text-center">
                  <p className="text-success font-semibold mb-2">Mensagem enviada com sucesso!</p>
                  <p className="text-primary-foreground/70 text-sm">
                    Nossa equipe entrará em contato em até 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-primary-foreground/70">Nome *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email" className="text-primary-foreground/70">E-mail *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-phone" className="text-primary-foreground/70">Telefone</Label>
                      <Input
                        id="contact-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-primary-foreground/70">Empresa</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-primary-foreground/70">Mensagem *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info & Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-12"
            >
              <div className="space-y-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Contato Direto</h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:contato@freightquote.com.br"
                      className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      contato@freterapido.com.br
                    </a>
                    <a
                      href="tel:+551140028922"
                      className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      (11) 4002-8922
                    </a>
                    <div className="flex items-center gap-3 text-primary-foreground/70">
                      <MapPin className="w-5 h-5" />
                      São Paulo, SP - Brasil
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Produto</h4>
                    <ul className="space-y-2 text-sm text-primary-foreground/70">
                      <li><a href="#como-funciona" className="hover:text-primary-foreground transition-colors">Como Funciona</a></li>
                      <li><a href="#beneficios" className="hover:text-primary-foreground transition-colors">Benefícios</a></li>
                      <li><a href="#integracoes" className="hover:text-primary-foreground transition-colors">Integrações</a></li>
                      <li><a href="#faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Empresa</h4>
                    <ul className="space-y-2 text-sm text-primary-foreground/70">
                      <li><a href="#" className="hover:text-primary-foreground transition-colors">Sobre Nós</a></li>
                      <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
                      <li><a href="#" className="hover:text-primary-foreground transition-colors">Carreiras</a></li>
                      <li><a href="#" className="hover:text-primary-foreground transition-colors">Parceiros</a></li>
                    </ul>
                  </div>
                </div>

                {/* Legal */}
                <div className="pt-6 border-t border-primary-foreground/10">
                  <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/50">
                    <a href="#" className="hover:text-primary-foreground transition-colors">Termos de Uso</a>
                    <a href="#" className="hover:text-primary-foreground transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-primary-foreground transition-colors">Cookies</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © 2024 FreteRapido. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/50">
              <span>🇧🇷</span>
              <span>Feito com ❤️ no Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
