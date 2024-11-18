import { Invoice } from '../../types/invoice';
import { format } from 'date-fns';

export const generatePDF = async (invoice: Invoice): Promise<Buffer> => {
  // This is a placeholder for PDF generation
  // Implement with a PDF library of your choice
  
  const content = `
    Invoice: ${invoice.number}
    Date: ${format(new Date(invoice.issueDate), 'dd/MM/yyyy')}
    Due Date: ${format(new Date(invoice.dueDate), 'dd/MM/yyyy')}
    
    Items:
    ${invoice.items.map(item => `
      ${item.description}
      Quantity: ${item.quantity}
      Unit Price: $${item.unitPrice}
      Total: $${item.total}
    `).join('\n')}
    
    Subtotal: $${invoice.subtotal}
    Tax: $${invoice.taxTotal}
    Total: $${invoice.total}
    
    Terms: ${invoice.terms}
  `;

  // Return a buffer containing the PDF data
  return Buffer.from(content);
};