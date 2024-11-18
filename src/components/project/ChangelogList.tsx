import React from 'react';
import { ChangelogEntry } from '../../types/project';
import { formatDistanceToNow } from 'date-fns';
import { GitCommit, FileText, ChevronRight } from 'lucide-react';

interface ChangelogListProps {
  entries: ChangelogEntry[];
}

const ChangelogList: React.FC<ChangelogListProps> = ({ entries }) => {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <GitCommit className="h-5 w-5 text-indigo-400 mr-2" />
              <div>
                <h4 className="text-lg font-semibold text-gray-100">Version {entry.version}</h4>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            {entry.files.length > 0 && (
              <button className="flex items-center text-sm text-indigo-400 hover:text-indigo-300">
                <FileText className="h-4 w-4 mr-1" />
                {entry.files.length} files
              </button>
            )}
          </div>

          <p className="text-gray-300 mb-3">{entry.description}</p>

          <div className="space-y-2">
            {entry.changes.map((change, index) => (
              <div key={index} className="flex items-start text-sm">
                <ChevronRight className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-400">{change}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangelogList;