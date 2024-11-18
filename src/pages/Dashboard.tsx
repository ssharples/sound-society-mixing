import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Clock, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Project, Status } from '../types/project';

type ViewMode = 'grid' | 'list';

const mockProjects: Project[] = [
  {
    id: '1',
    name: "Summer EP",
    description: "Electronic music production",
    clientId: "1",
    status: "in-progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    revisions: [],
    changelog: [],
    comments: [],
    stats: {
      totalRevisions: 5,
      completedRevisions: 3,
      pendingRevisions: 2,
      averageCompletionTime: 2,
      revisionsByPriority: {
        low: 1,
        medium: 2,
        high: 1,
        urgent: 1
      },
      revisionsByStatus: {
        pending: 1,
        'in-progress': 1,
        review: 1,
        completed: 2
      }
    }
  },
  {
    id: '2',
    name: "Acoustic Sessions",
    description: "Live recording session",
    clientId: "2",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    revisions: [],
    changelog: [],
    comments: [],
    stats: {
      totalRevisions: 3,
      completedRevisions: 3,
      pendingRevisions: 0,
      averageCompletionTime: 1,
      revisionsByPriority: {
        low: 1,
        medium: 1,
        high: 1,
        urgent: 0
      },
      revisionsByStatus: {
        pending: 0,
        'in-progress': 0,
        review: 0,
        completed: 3
      }
    }
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [projects] = useState<Project[]>(mockProjects);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'review':
        return <AlertCircle className="h-5 w-5 text-blue-400" />;
      default:
        return <RotateCcw className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            My Projects
          </h1>
          <Link
            to="/submit"
            className="px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-600/30 hover:shadow-neon transition-all"
          >
            New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id} className="block">
              <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 hover:shadow-sharp transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-100">{project.name}</h3>
                  {getStatusIcon(project.status)}
                </div>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Due {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed'
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;