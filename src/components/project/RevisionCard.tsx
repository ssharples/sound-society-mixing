import React from 'react';
import { Clock, AlertCircle, CheckCircle, RotateCw, ArrowRight } from 'lucide-react';
import { Revision, Priority, Status } from '../../types/project';
import { formatDistanceToNow } from 'date-fns';

interface RevisionCardProps {
  revision: Revision;
  onStatusChange: (id: string, status: Status) => void;
}

const priorityConfig: Record<Priority, { icon: JSX.Element; className: string }> = {
  low: { 
    icon: <Clock className="h-4 w-4" />, 
    className: 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
  },
  medium: { 
    icon: <AlertCircle className="h-4 w-4" />, 
    className: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30' 
  },
  high: { 
    icon: <AlertCircle className="h-4 w-4" />, 
    className: 'bg-orange-600/20 text-orange-400 border-orange-500/30' 
  },
  urgent: { 
    icon: <AlertCircle className="h-4 w-4" />, 
    className: 'bg-red-600/20 text-red-400 border-red-500/30' 
  }
};

const statusConfig: Record<Status, { icon: JSX.Element; className: string }> = {
  pending: { 
    icon: <Clock className="h-4 w-4" />, 
    className: 'bg-gray-600/20 text-gray-400 border-gray-500/30' 
  },
  'in-progress': { 
    icon: <RotateCw className="h-4 w-4" />, 
    className: 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
  },
  review: { 
    icon: <AlertCircle className="h-4 w-4" />, 
    className: 'bg-purple-600/20 text-purple-400 border-purple-500/30' 
  },
  completed: { 
    icon: <CheckCircle className="h-4 w-4" />, 
    className: 'bg-green-600/20 text-green-400 border-green-500/30' 
  }
};

const RevisionCard: React.FC<RevisionCardProps> = ({ revision, onStatusChange }) => {
  const priorityStyle = priorityConfig[revision.priority];
  const statusStyle = statusConfig[revision.status];

  return (
    <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-3 sm:p-4 hover:shadow-sharp transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-1">{revision.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{revision.description}</p>
        </div>
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityStyle.className}`}>
            {priorityStyle.icon}
            <span className="ml-1 capitalize">{revision.priority}</span>
          </span>
          <select
            value={revision.status}
            onChange={(e) => onStatusChange(revision.id, e.target.value as Status)}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-transparent ${statusStyle.className}`}
          >
            {Object.keys(statusConfig).map((status) => (
              <option key={status} value={status} className="bg-chrome-700">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-400 gap-2">
        <div className="flex items-center space-x-4">
          <span>Due {formatDistanceToNow(new Date(revision.dueDate), { addSuffix: true })}</span>
          {revision.attachments.length > 0 && (
            <span>{revision.attachments.length} attachments</span>
          )}
        </div>
        <div className="flex space-x-2">
          {revision.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full text-xs bg-chrome-700 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevisionCard;