import { z } from 'zod';

// CEP validation regex (Brazilian postal code)
const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

// Port codes (simplified list of major Brazilian ports)
const portCodes = [
  'BRSSZ', 'BRSFS', 'BRPNG', 'BRRIO', 'BRVIX', 'BRSUA', 'BRPEC', 'BRNVT',
  'BRMAO', 'BRSSA', 'BRMCP', 'BRSLV', 'BRITJ', 'BRITQ', 'BRNAT'
];

export const quoteFormSchema = z.object({
  origin: z.string()
    .min(1, 'Informe a origem')
    .refine(
      (val) => cepRegex.test(val.replace(/\s/g, '')) || val.length >= 3,
      'Informe um CEP válido (ex: 01001-000) ou nome da cidade/porto'
    ),
  destination: z.string()
    .min(1, 'Informe o destino')
    .refine(
      (val) => cepRegex.test(val.replace(/\s/g, '')) || val.length >= 3,
      'Informe um CEP válido (ex: 01001-000) ou nome da cidade/porto'
    ),
  weight: z.number()
    .min(0.1, 'Peso mínimo: 0.1 kg')
    .max(100000, 'Peso máximo: 100.000 kg'),
  length: z.number().min(0).max(10000).optional(),
  width: z.number().min(0).max(10000).optional(),
  height: z.number().min(0).max(10000).optional(),
  mode: z.enum(['maritime', 'air', 'road'], {
    required_error: 'Selecione o modo de transporte',
  }),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string()
    .optional()
    .refine(
      (val) => !val || val.replace(/\D/g, '').length >= 10,
      'Telefone deve ter pelo menos 10 dígitos'
    ),
});

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;

// Format CEP with mask
export function formatCEP(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 5) return numbers;
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
}

// Format phone with mask
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

// Validate if input looks like a CEP
export function isCEP(value: string): boolean {
  return cepRegex.test(value.replace(/\s/g, ''));
}

// Check if value is a port code
export function isPortCode(value: string): boolean {
  return portCodes.includes(value.toUpperCase());
}
