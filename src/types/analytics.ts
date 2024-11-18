export interface RevenueMetrics {
  totalRevenue: number;
  recurringRevenue: number;
  averageProjectValue: number;
  revenueGrowth: number;
  projectedRevenue: number;
}

export interface ClientMetrics {
  totalClients: number;
  activeClients: number;
  retentionRate: number;
  churnRate: number;
  averageClientLifetime: number;
  clientSatisfactionScore: number;
}

export interface ProjectMetrics {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  successRate: number;
  averageCompletionTime: number;
  onTimeDeliveryRate: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface AnalyticsDashboard {
  revenue: RevenueMetrics;
  clients: ClientMetrics;
  projects: ProjectMetrics;
  revenueHistory: TimeSeriesData[];
  clientGrowth: TimeSeriesData[];
  projectCompletion: TimeSeriesData[];
}</content>