import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart2, Users, Clock, AlertTriangle, Filter,
  Calendar, ArrowUp, ArrowDown, Search, Download
} from 'lucide-react';
import { Project, Status } from '../types/project';
import ProjectStats from '../components/project/ProjectStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { formatDistanceToNow } from 'date-fns';

type TimeRange = '7d' | '30d' | '90d' | 'all';
type SortField = 'date' | 'priority' | 'status';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - Replace with Supabase queries
  const stats = {
    totalProjects: 48,
    activeProjects: 12,
    completedProjects: 32,
    overdueProjects: 4,
    averageCompletionTime: 14,
    projectsByStatus: {
      pending: 8,
      'in-progress': 12,
      review: 4,
      completed: 24
    },
    revenueData: [
      { month: 'Jan', amount: 12000 },
      { month: 'Feb', amount: 15000 },
      { month: 'Mar', amount: 18000 },
      { month: 'Apr', amount: 22000 },
      { month: 'May', amount: 20000 },
      { month: 'Jun', amount: 25000 }
    ]
  };

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage projects, track performance, and analyze metrics
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-600/30 hover:shadow-neon transition-all">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Total Projects</h3>
              <BarChart2 className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-400">{stats.totalProjects}</p>
            <div className="mt-2">
              <div className="w-full bg-chrome-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-full" />
              </div>
            </div>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Active Projects</h3>
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">{stats.activeProjects}</p>
            <div className="mt-2">
              <div className="w-full bg-chrome-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(stats.activeProjects / stats.totalProjects) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Avg. Completion</h3>
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.averageCompletionTime}d</p>
            <div className="mt-2">
              <div className="w-full bg-chrome-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Overdue</h3>
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{stats.overdueProjects}</p>
            <div className="mt-2">
              <div className="w-full bg-chrome-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(stats.overdueProjects / stats.totalProjects) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Projects and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Time Range Filter */}
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-3 sm:p-4 overflow-x-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-300">Time Range:</span>
                </div>
                <div className="flex space-x-2">
                  {(['7d', '30d', '90d', 'all'] as TimeRange[]).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        timeRange === range
                          ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                          : 'text-gray-400 hover:text-indigo-400'
                      }`}
                    >
                      {range === 'all' ? 'All Time' : `Last ${range}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">Revenue Overview</h3>
              <div className="h-64">
                {/* Replace with actual chart component */}
                <div className="flex h-full items-end space-x-4">
                  {stats.revenueData.map((data) => (
                    <div key={data.month} className="flex-1">
                      <div 
                        className="bg-indigo-500/30 hover:bg-indigo-500/40 transition-all rounded-t"
                        style={{ height: `${(data.amount / 25000) * 100}%` }}
                      />
                      <div className="text-center mt-2">
                        <span className="text-xs text-gray-400">{data.month}</span>
                        <span className="block text-sm text-indigo-400">${(data.amount / 1000).toFixed(1)}k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project List */}
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-100">Recent Projects</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-chrome-700 border border-chrome-600 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
                    className="px-3 py-2 bg-chrome-700 border border-chrome-600 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Project Items */}
                {[1, 2, 3].map((project) => (
                  <div key={project} className="flex items-center justify-between p-4 bg-chrome-700 rounded-lg hover:bg-chrome-600 transition-colors">
                    <div>
                      <h4 className="text-gray-100 font-medium">Project {project}</h4>
                      <p className="text-sm text-gray-400">Last updated 2 hours ago</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                        In Progress
                      </span>
                      <button className="text-gray-400 hover:text-indigo-400">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Team Activity */}
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">Team Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((activity) => (
                  <div key={activity} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                        <Users className="h-4 w-4 text-indigo-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-300">User updated Project {activity}</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completion Rate</span>
                  <span className="text-green-400">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Client Satisfaction</span>
                  <span className="text-green-400">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Clients</span>
                  <span className="text-indigo-400">24</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((deadline) => (
                  <div key={deadline} className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300">Project {deadline}</p>
                      <p className="text-sm text-gray-500">Due in 3 days</p>
                    </div>
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}