export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'pending' | 'in-progress' | 'review' | 'completed';

export interface Revision {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  attachments: string[];
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  attachments: string[];
}

export interface ChangelogEntry {
  id: string;
  version: string;
  description: string;
  changes: string[];
  userId: string;
  createdAt: string;
  files: string[];
}

export interface ProjectStats {
  totalRevisions: number;
  completedRevisions: number;
  pendingRevisions: number;
  averageCompletionTime: number;
  revisionsByPriority: Record<Priority, number>;
  revisionsByStatus: Record<Status, number>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  revisions: Revision[];
  changelog: ChangelogEntry[];
  comments: Comment[];
  stats: ProjectStats;
}</content>