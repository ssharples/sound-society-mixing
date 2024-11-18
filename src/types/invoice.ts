export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  clientId: string;
  number: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  notes?: string;
  terms?: string;
  paymentMethod?: PaymentMethod;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}