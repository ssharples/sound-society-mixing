import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project, Status } from '../types/project';
import RevisionCard from '../components/project/RevisionCard';
import ChangelogList from '../components/project/ChangelogList';
import CommentThread from '../components/project/CommentThread';
import ProjectStats from '../components/project/ProjectStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Clock, GitCommit, MessageSquare, Filter, Search, ArrowRight } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('revisions');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

  // TODO: Fetch project data from Supabase
  const project: Project = {
    id: '1',
    name: 'Summer EP Project',
    description: 'Electronic music production and mastering',
    clientId: 'client1',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    revisions: [],
    changelog: [],
    comments: [],
    stats: {
      totalRevisions: 12,
      completedRevisions: 8,
      pendingRevisions: 4,
      averageCompletionTime: 3,
      revisionsByPriority: {
        low: 3,
        medium: 4,
        high: 3,
        urgent: 2
      },
      revisionsByStatus: {
        pending: 2,
        'in-progress': 2,
        review: 2,
        completed: 6
      }
    }
  };

  const handleStatusChange = (revisionId: string, newStatus: Status) => {
    // TODO: Update revision status in Supabase
    console.log('Updating status:', revisionId, newStatus);
  };

  const handleAddComment = (content: string, attachments: string[]) => {
    // TODO: Add comment to Supabase
    console.log('Adding comment:', content, attachments);
  };

  const filteredRevisions = project.revisions.filter(revision => {
    const matchesStatus = statusFilter === 'all' || revision.status === statusFilter;
    const matchesSearch = revision.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         revision.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            {project.name}
          </h1>
          <p className="text-gray-400 mt-2">{project.description}</p>
        </div>

        {/* Project Stats */}
        <div className="mb-8">
          <ProjectStats stats={project.stats} />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-chrome-800 border border-chrome-600 p-1 rounded-lg mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="revisions" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Revisions
            </TabsTrigger>
            <TabsTrigger value="changelog" className="flex items-center">
              <GitCommit className="h-4 w-4 mr-2" />
              Changelog
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Comments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revisions">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-indigo-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
                  className="bg-chrome-800 border border-chrome-600 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search revisions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-chrome-800 border border-chrome-600 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Revisions List */}
            <div className="space-y-4">
              {filteredRevisions.map((revision) => (
                <RevisionCard
                  key={revision.id}
                  revision={revision}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="changelog">
            <ChangelogList entries={project.changelog} />
          </TabsContent>

          <TabsContent value="comments">
            <CommentThread
              comments={project.comments}
              onAddComment={handleAddComment}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}