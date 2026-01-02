import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#integracoes', label: 'Integrações' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Frete Rápido</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button variant="default" size="sm">
              Começar Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          className={cn(
            "lg:hidden overflow-hidden",
            !isMobileMenuOpen && "pointer-events-none"
          )}
        >
          <div className="py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-foreground font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                Entrar
              </Button>
              <Button variant="default" className="w-full">
                Começar Grátis
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
