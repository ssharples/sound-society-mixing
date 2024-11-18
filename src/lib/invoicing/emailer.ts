import { Invoice } from '../../types/invoice';
import { supabase } from '../supabase';
import { generatePDF } from './pdf';

export const sendInvoiceEmail = async (invoice: Invoice, recipientEmail: string) => {
  try {
    // Generate PDF
    const pdfBuffer = await generatePDF(invoice);

    // Upload PDF to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(`${invoice.number}.pdf`, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get public URL for the PDF
    const { data: { publicUrl } } = supabase.storage
      .from('invoices')
      .getPublicUrl(`${invoice.number}.pdf`);

    // Send email using your email service
    // This is a placeholder - implement with your preferred email service
    console.log(`Sending invoice ${invoice.number} to ${recipientEmail}`);
    console.log(`PDF URL: ${publicUrl}`);

    // Update invoice status
    const { error: updateError } = await supabase
      .from('invoices')
      .update({ status: 'pending' })
      .eq('id', invoice.id);

    if (updateError) throw updateError;

  } catch (error) {
    console.error('Error sending invoice email:', error);
    throw error;
  }
};