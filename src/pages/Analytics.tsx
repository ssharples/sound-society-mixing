import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart2, Users, Clock, TrendingUp,
  DollarSign, UserCheck, Award, Calendar
} from 'lucide-react';
import { AnalyticsDashboard } from '../types/analytics';
import { getAnalyticsDashboard } from '../lib/analytics/metrics';
import toast from 'react-hot-toast';

type TimeRange = '7d' | '30d' | '90d' | '1y';

export default function Analytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [data, setData] = useState<AnalyticsDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const analytics = await getAnalyticsDashboard();
      setData(analytics);
    } catch (error) {
      toast.error('Failed to load analytics data');
      console.error('Analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!data || loading) {
    return (
      <div className="min-h-screen bg-chrome-900 pt-16 flex items-center justify-center">
        <div className="text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Track key metrics and business performance
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="mb-8 bg-chrome-800 border border-chrome-600 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-indigo-400" />
            <div className="flex space-x-2">
              {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeRange === range
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-gray-400 hover:text-indigo-400'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Revenue</h3>
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              ${data.revenue.totalRevenue.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400">
                +{data.revenue.revenueGrowth.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Client Retention Card */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Client Retention</h3>
              <UserCheck className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">
              {data.clients.retentionRate.toFixed(1)}%
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-400">
                {data.clients.activeClients} active clients
              </span>
            </div>
          </div>

          {/* Project Success Card */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Project Success</h3>
              <Award className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-400">
              {data.projects.successRate.toFixed(1)}%
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-400">
                {data.projects.completedProjects} completed projects
              </span>
            </div>
          </div>

          {/* Delivery Time Card */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">On-Time Delivery</h3>
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {data.projects.onTimeDeliveryRate.toFixed(1)}%
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-400">
                Avg. {data.projects.averageCompletionTime} days
              </span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">Revenue Trend</h3>
            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {data.revenueHistory.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-indigo-500/30 hover:bg-indigo-500/40 transition-all rounded-t"
                      style={{ 
                        height: `${(item.value / Math.max(...data.revenueHistory.map(d => d.value))) * 100}%`
                      }}
                    />
                    <span className="text-xs text-gray-400 mt-2">
                      {item.date.split('-')[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Growth */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">Client Growth</h3>
            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {data.clientGrowth.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500/30 hover:bg-blue-500/40 transition-all rounded-t"
                      style={{ 
                        height: `${(item.value / Math.max(...data.clientGrowth.map(d => d.value))) * 100}%`
                      }}
                    />
                    <span className="text-xs text-gray-400 mt-2">
                      {item.date.split('-')[1]}
                    </span>
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