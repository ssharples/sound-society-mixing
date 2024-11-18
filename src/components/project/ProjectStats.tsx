import React from 'react';
import { ProjectStats } from '../../types/project';
import { CheckCircle, Clock, AlertTriangle, BarChart2 } from 'lucide-react';

interface ProjectStatsProps {
  stats: ProjectStats;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ stats }) => {
  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overview Cards */}
      <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Revisions</p>
            <h4 className="text-2xl font-semibold text-gray-100">{stats.totalRevisions}</h4>
          </div>
          <BarChart2 className="h-8 w-8 text-indigo-400" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-chrome-700 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Completed</p>
            <h4 className="text-2xl font-semibold text-gray-100">
              {calculatePercentage(stats.completedRevisions, stats.totalRevisions)}%
            </h4>
          </div>
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-chrome-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ 
                width: `${calculatePercentage(stats.completedRevisions, stats.totalRevisions)}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Pending</p>
            <h4 className="text-2xl font-semibold text-gray-100">
              {calculatePercentage(stats.pendingRevisions, stats.totalRevisions)}%
            </h4>
          </div>
          <Clock className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-chrome-700 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ 
                width: `${calculatePercentage(stats.pendingRevisions, stats.totalRevisions)}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Avg. Completion Time</p>
            <h4 className="text-2xl font-semibold text-gray-100">
              {stats.averageCompletionTime}d
            </h4>
          </div>
          <AlertTriangle className="h-8 w-8 text-orange-400" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-chrome-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: '70%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;