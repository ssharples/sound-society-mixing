import React from 'react';
import { Comment } from '../../types/project';
import { formatDistanceToNow } from 'date-fns';
import { Paperclip, MessageSquare } from 'lucide-react';

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (content: string, attachments: string[]) => void;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment, []);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">User {comment.userId}</span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
              {comment.attachments.length > 0 && (
                <div className="mt-3 flex items-center space-x-2">
                  <Paperclip className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {comment.attachments.length} attachments
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-chrome-700 border border-chrome-600 rounded-md p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
          <div className="mt-3 flex justify-between items-center">
            <button
              type="button"
              className="flex items-center text-sm text-gray-400 hover:text-gray-300"
            >
              <Paperclip className="h-4 w-4 mr-1" />
              Attach files
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-600/30 hover:shadow-neon transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentThread;