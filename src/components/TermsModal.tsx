import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-chrome-800 border border-chrome-600 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-chrome-600 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-100">Terms and Conditions</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4 text-gray-300">
            <p className="font-medium text-gray-100">
              Terms and Conditions for Project Submission:
            </p>

            <div className="space-y-2">
              <p><span className="text-indigo-400">1. Payment Terms:</span> Payment is due upon client approval of the final mix. No upfront payment is required, but the client agrees to pay the full amount once satisfied with the work.</p>
              
              <p><span className="text-indigo-400">2. Ownership:</span> The client retains all rights to their original recordings. The mixing engineer (hereinafter referred to as "the Engineer") retains rights to the mix itself.</p>
              
              <p><span className="text-indigo-400">3. Usage Rights:</span> Upon full payment, the client is granted non-exclusive rights to use the mixed recording for all purposes, including commercial release.</p>
              
              <p><span className="text-indigo-400">4. Revisions:</span> The initial project fee includes up to two rounds of revisions. Additional revisions may incur extra charges.</p>
              
              <p><span className="text-indigo-400">5. Project Abandonment:</span> If a client abandons a project after work has begun, a fee of 50% of the quoted price may be charged.</p>
              
              <p><span className="text-indigo-400">6. Confidentiality:</span> The Engineer agrees to keep all client materials and communications confidential.</p>
              
              <p><span className="text-indigo-400">7. File Retention:</span> The Engineer will retain project files for up to 30 days after project completion. After this period, files may be deleted without notice.</p>
              
              <p><span className="text-indigo-400">8. Quality Assurance:</span> The Engineer reserves the right to reject or request re-recording of files that do not meet minimum quality standards for mixing.</p>
              
              <p><span className="text-indigo-400">9. Liability:</span> The Engineer is not liable for any copyright infringements in the client's material.</p>
              
              <p><span className="text-indigo-400">10. Cancellation:</span> Clients may cancel a project before work begins without penalty. Once work has started, cancellation fees may apply.</p>
              
              <p><span className="text-indigo-400">11. Portfolio Use:</span> Unless otherwise specified, the Engineer reserves the right to use the final mix in their portfolio.</p>
              
              <p><span className="text-indigo-400">12. Dispute Resolution:</span> Any disputes will be resolved through arbitration in the Engineer's jurisdiction.</p>
            </div>

            <p className="text-gray-400 italic">
              By submitting a project, the client agrees to these terms and conditions.
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-chrome-600 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-600/30 hover:shadow-neon transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;