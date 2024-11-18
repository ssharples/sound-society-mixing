import { supabase } from '../supabase';
import { 
  RevenueMetrics, 
  ClientMetrics, 
  ProjectMetrics,
  TimeSeriesData,
  AnalyticsDashboard 
} from '../../types/analytics';
import { addMonths, subMonths, startOfMonth, endOfMonth, format } from 'date-fns';

export const calculateRevenueMetrics = async (startDate: Date, endDate: Date): Promise<RevenueMetrics> => {
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('total, status, created_at')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  if (error) throw error;

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  const previousPeriodStart = subMonths(startDate, 12);
  const previousPeriodEnd = subMonths(endDate, 12);

  const { data: previousInvoices } = await supabase
    .from('invoices')
    .select('total, status, created_at')
    .gte('created_at', previousPeriodStart.toISOString())
    .lte('created_at', previousPeriodEnd.toISOString());

  const previousRevenue = previousInvoices
    ?.filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0) || 0;

  const revenueGrowth = previousRevenue ? 
    ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;

  return {
    totalRevenue,
    recurringRevenue: totalRevenue * 0.6, // Assuming 60% is recurring
    averageProjectValue: totalRevenue / (invoices.length || 1),
    revenueGrowth,
    projectedRevenue: totalRevenue * 1.2 // Simple projection
  };
};

export const calculateClientMetrics = async (): Promise<ClientMetrics> => {
  const { data: clients, error } = await supabase
    .from('clients')
    .select('id, created_at, last_active');

  if (error) throw error;

  const now = new Date();
  const threeMonthsAgo = subMonths(now, 3);

  const activeClients = clients.filter(
    client => new Date(client.last_active) >= threeMonthsAgo
  ).length;

  const previousClients = clients.filter(
    client => new Date(client.created_at) <= threeMonthsAgo
  ).length;

  const retainedClients = clients.filter(
    client => 
      new Date(client.created_at) <= threeMonthsAgo &&
      new Date(client.last_active) >= threeMonthsAgo
  ).length;

  const retentionRate = previousClients ? (retainedClients / previousClients) * 100 : 100;
  const churnRate = 100 - retentionRate;

  return {
    totalClients: clients.length,
    activeClients,
    retentionRate,
    churnRate,
    averageClientLifetime: 12, // In months, calculate based on actual data
    clientSatisfactionScore: 4.5 // Implement actual satisfaction tracking
  };
};

export const calculateProjectMetrics = async (): Promise<ProjectMetrics> => {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*');

  if (error) throw error;

  const completed = projects.filter(p => p.status === 'completed').length;
  const active = projects.filter(p => p.status === 'in-progress').length;
  const onTime = projects.filter(p => {
    const completionDate = new Date(p.updated_at);
    const dueDate = new Date(p.due_date);
    return p.status === 'completed' && completionDate <= dueDate;
  }).length;

  return {
    totalProjects: projects.length,
    completedProjects: completed,
    activeProjects: active,
    successRate: (completed / (projects.length || 1)) * 100,
    averageCompletionTime: 14, // In days, calculate from actual data
    onTimeDeliveryRate: (onTime / (completed || 1)) * 100
  };
};

export const getTimeSeriesData = async (
  table: string,
  valueField: string,
  months: number
): Promise<TimeSeriesData[]> => {
  const endDate = endOfMonth(new Date());
  const startDate = startOfMonth(subMonths(endDate, months));

  const { data, error } = await supabase
    .from(table)
    .select('created_at, ' + valueField)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  if (error) throw error;

  const monthlyData: Record<string, number> = {};
  
  // Initialize all months with 0
  for (let i = 0; i <= months; i++) {
    const date = format(addMonths(startDate, i), 'yyyy-MM');
    monthlyData[date] = 0;
  }

  // Aggregate data by month
  data.forEach(record => {
    const date = format(new Date(record.created_at), 'yyyy-MM');
    monthlyData[date] += Number(record[valueField]) || 1;
  });

  return Object.entries(monthlyData).map(([date, value]) => ({
    date,
    value
  }));
};

export const getAnalyticsDashboard = async (): Promise<AnalyticsDashboard> => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [
    revenue,
    clients,
    projects,
    revenueHistory,
    clientGrowth,
    projectCompletion
  ] = await Promise.all([
    calculateRevenueMetrics(startOfYear, now),
    calculateClientMetrics(),
    calculateProjectMetrics(),
    getTimeSeriesData('invoices', 'total', 12),
    getTimeSeriesData('clients', 'id', 12),
    getTimeSeriesData('projects', 'id', 12)
  ]);

  return {
    revenue,
    clients,
    projects,
    revenueHistory,
    clientGrowth,
    projectCompletion
  };
}