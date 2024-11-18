import React from 'react';
import { Invoice } from '../../types/invoice';
import { FileText, Download, Send, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface InvoiceListProps {
  invoices: Invoice[];
  onSend: (invoice: Invoice) => void;
  onDownload: (invoice: Invoice) => void;
}

const statusConfig = {
  draft: { color: 'text-gray-400 bg-gray-600/20 border-gray-500/30' },
  pending: { color: 'text-yellow-400 bg-yellow-600/20 border-yellow-500/30' },
  paid: { color: 'text-green-400 bg-green-600/20 border-green-500/30' },
  overdue: { color: 'text-red-400 bg-red-600/20 border-red-500/30' },
  cancelled: { color: 'text-gray-400 bg-gray-600/20 border-gray-500/30' }
};

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onSend, onDownload }) => {
  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="bg-chrome-800 border border-chrome-600 rounded-lg p-4 hover:shadow-sharp transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-indigo-600/20 rounded-lg">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100">{invoice.number}</h3>
                <p className="text-sm text-gray-400">
                  Issued {format(new Date(invoice.issueDate), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs rounded-full border ${statusConfig[invoice.status].color}`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
              <span className="text-xl font-semibold text-indigo-400">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              Due {format(new Date(invoice.dueDate), 'dd MMM yyyy')}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onDownload(invoice)}
                className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                title="Download PDF"
              >
                <Download className="h-5 w-5" />
              </button>
              {invoice.status === 'draft' && (
                <button
                  onClick={() => onSend(invoice)}
                  className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                  title="Send Invoice"
                >
                  <Send className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;