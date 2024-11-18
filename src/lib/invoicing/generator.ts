import { Invoice, InvoiceItem } from '../../types/invoice';
import { Project } from '../../types/project';
import { supabase } from '../supabase';
import { format } from 'date-fns';

const INVOICE_PREFIX = 'INV';
const DEFAULT_PAYMENT_TERMS_DAYS = 30;
const DEFAULT_TAX_RATE = 0.20; // 20% tax rate

export const generateInvoiceNumber = async (): Promise<string> => {
  const { count } = await supabase
    .from('invoices')
    .select('*', { count: 'exact' });

  const nextNumber = (count || 0) + 1;
  const paddedNumber = nextNumber.toString().padStart(6, '0');
  return `${INVOICE_PREFIX}-${format(new Date(), 'yyyyMM')}-${paddedNumber}`;
};

export const calculateTotals = (items: InvoiceItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxTotal = items.reduce((sum, item) => sum + (item.total * item.taxRate), 0);
  return {
    subtotal,
    taxTotal,
    total: subtotal + taxTotal
  };
};

export const createInvoiceFromProject = async (project: Project): Promise<Invoice> => {
  const invoiceNumber = await generateInvoiceNumber();
  const issueDate = new Date().toISOString();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + DEFAULT_PAYMENT_TERMS_DAYS);

  // Create invoice items based on project services
  const items: InvoiceItem[] = [
    {
      id: crypto.randomUUID(),
      description: `${project.name} - Professional Audio Services`,
      quantity: 1,
      unitPrice: 500, // Base price, should be dynamic based on service type
      taxRate: DEFAULT_TAX_RATE,
      total: 500
    }
  ];

  const { subtotal, taxTotal, total } = calculateTotals(items);

  const invoice: Invoice = {
    id: crypto.randomUUID(),
    projectId: project.id,
    clientId: project.clientId,
    number: invoiceNumber,
    status: 'draft',
    issueDate,
    dueDate: dueDate.toISOString(),
    items,
    subtotal,
    taxTotal,
    total,
    terms: `Payment is due within ${DEFAULT_PAYMENT_TERMS_DAYS} days`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const { error } = await supabase
    .from('invoices')
    .insert(invoice);

  if (error) throw error;
  return invoice;
};