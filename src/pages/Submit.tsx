import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Music2, Clock, Mic2, DollarSign, FileText } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import TermsModal from '../components/TermsModal';
import toast from 'react-hot-toast';

interface ProjectForm {
  name: string;
  genre: string;
  references: string;
  description: string;
  deadline: string;
  budget: string;
  termsAccepted: boolean;
}

const Submit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [formData, setFormData] = useState<ProjectForm>({
    name: '',
    genre: '',
    references: '',
    description: '',
    deadline: '',
    budget: '',
    termsAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    try {
      // TODO: Submit project to Supabase
      toast.success('Project submitted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit project');
      console.error('Submit error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Submit Your Project
          </h1>
          <p className="text-gray-400 mt-2">
            Tell us about your project and upload your files
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Details */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Project Details</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
                  Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select genre</option>
                  <option value="rock">Rock</option>
                  <option value="pop">Pop</option>
                  <option value="electronic">Electronic</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="jazz">Jazz</option>
                  <option value="classical">Classical</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your project and what you're looking to achieve"
                  required
                />
              </div>

              <div>
                <label htmlFor="references" className="block text-sm font-medium text-gray-300 mb-1">
                  Reference Tracks (Optional)
                </label>
                <textarea
                  id="references"
                  name="references"
                  value={formData.references}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="List any reference tracks that inspire your desired sound"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">
                    Desired Completion Date
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="basic">Basic ($299)</option>
                    <option value="standard">Standard ($499)</option>
                    <option value="premium">Premium ($799)</option>
                    <option value="custom">Custom Quote</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">Upload Files</h2>
            <FileUpload />
          </div>

          {/* Terms and Submit */}
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-chrome-600 rounded bg-chrome-700"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  terms and conditions
                </button>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/30 hover:shadow-neon transition-all text-lg font-medium"
            >
              Submit Project
            </button>
          </div>
        </form>

        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      </div>
    </div>
  );
};

export default Submit;