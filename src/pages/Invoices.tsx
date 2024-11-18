import React, { useState, useEffect } from 'react';
import { Invoice } from '../types/invoice';
import InvoiceList from '../components/invoice/InvoiceList';
import { FileText, Filter, Search, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendInvoiceEmail } from '../lib/invoicing/emailer';
import { generatePDF } from '../lib/invoicing/pdf';
import toast from 'react-hot-toast';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      toast.error('Failed to fetch invoices');
      return;
    }

    setInvoices(data || []);
  };

  const handleSendInvoice = async (invoice: Invoice) => {
    try {
      // In a real app, get the client's email from the database
      const recipientEmail = 'client@example.com';
      await sendInvoiceEmail(invoice, recipientEmail);
      toast.success('Invoice sent successfully');
      await fetchInvoices(); // Refresh the list
    } catch (error) {
      toast.error('Failed to send invoice');
    }
  };

  const handleDownloadInvoice = async (invoice: Invoice) => {
    try {
      const pdfBuffer = await generatePDF(invoice);
      // Create a blob and download it
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${invoice.number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download invoice');
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesSearch = invoice.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              Invoices
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and track all your project invoices
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-600/30 hover:shadow-neon transition-all">
            <Plus className="h-5 w-5 mr-2" />
            New Invoice
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-chrome-800 border border-chrome-600 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-chrome-800 border border-chrome-600 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Invoice List */}
        <InvoiceList
          invoices={filteredInvoices}
          onSend={handleSendInvoice}
          onDownload={handleDownloadInvoice}
        />
      </div>
    </div>
  );
}