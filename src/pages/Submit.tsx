import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Music2, Clock, Mic2, DollarSign, FileText, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import TermsModal from '../components/TermsModal';
import SpotifySearch from '../components/SpotifySearch';
import toast from 'react-hot-toast';

interface ProjectForm {
  name: string;
  genre: string;
  references: {
    id: string;
    name: string;
    artists: string[];
    album: string;
    preview_url: string | null;
  }[];
  description: string;
  deadline: string;
  budget: string;
  termsAccepted: boolean;
}

const GENRES = [
  { id: 'rock', label: 'Rock', icon: Music2 },
  { id: 'pop', label: 'Pop', icon: Music2 },
  { id: 'electronic', label: 'Electronic', icon: Music2 },
  { id: 'hiphop', label: 'Hip Hop', icon: Music2 },
  { id: 'jazz', label: 'Jazz', icon: Music2 },
  { id: 'classical', label: 'Classical', icon: Music2 },
];

const BUDGET_OPTIONS = [
  { value: 'basic', label: 'Basic', price: 299, features: ['Mix Only', '2 Revisions', '5-7 Day Delivery'] },
  { value: 'standard', label: 'Standard', price: 499, features: ['Mix & Master', '3 Revisions', '3-5 Day Delivery'] },
  { value: 'premium', label: 'Premium', price: 799, features: ['Mix & Master', 'Unlimited Revisions', '48hr Delivery'] },
  { value: 'custom', label: 'Custom', price: null, features: ['Custom Quote', 'Contact for Details'] },
];

const Submit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectForm>({
    name: '',
    genre: '',
    references: [],
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

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep
                ? 'bg-indigo-600 text-white'
                : step < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-chrome-700 text-gray-400'
            }`}
          >
            {step < currentStep ? <Check size={16} /> : step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-0.5 ${
                step < currentStep ? 'bg-green-500' : 'bg-chrome-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderProjectDetails = () => (
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
          className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Enter project name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Genre
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GENRES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, genre: id }))}
              className={`flex items-center p-4 ${
                formData.genre === id
                  ? 'bg-indigo-600 border-indigo-500'
                  : 'bg-chrome-700 border-chrome-600 hover:bg-chrome-600'
              } border rounded-lg transition-all group`}
            >
              <Icon className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-300" />
              <span className="text-gray-300 group-hover:text-gray-200">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Reference Tracks
        </label>
        <div className="space-y-4">
          <SpotifySearch
            onTrackSelect={(track) => {
              setFormData(prev => ({
                ...prev,
                references: [...prev.references, track]
              }));
            }}
          />
          
          {formData.references.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium text-gray-300 mb-2">Selected Tracks:</div>
              {formData.references.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-3 bg-chrome-700 border border-chrome-600 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="text-gray-200">{track.name}</div>
                    <div className="text-sm text-gray-400">
                      {track.artists.join(', ')} • {track.album}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        references: prev.references.filter(ref => ref.id !== track.id)
                      }));
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
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
          className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="Describe your project and what you're looking to achieve"
          required
        />
      </div>
    </div>
  );

  const renderTimelineAndBudget = () => (
    <div className="space-y-6">
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
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Your Package
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUDGET_OPTIONS.map(({ value, label, price, features }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, budget: value }))}
              className={`flex flex-col p-4 ${
                formData.budget === value
                  ? 'bg-indigo-600 border-indigo-500'
                  : 'bg-chrome-700 border-chrome-600 hover:bg-chrome-600'
              } border rounded-lg transition-all group text-left`}
            >
              <span className="text-lg font-semibold text-gray-200 mb-1">{label}</span>
              {price && <span className="text-2xl font-bold text-gray-100 mb-3">${price}</span>}
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-400">
                    <Check className="w-4 h-4 mr-2 text-gray-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
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
          className="w-full px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="List any reference tracks that inspire your desired sound"
        />
      </div>
    </div>
  );

  const renderFileUpload = () => (
    <div className="space-y-6">
      <FileUpload />
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={formData.termsAccepted}
          onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
          className="w-4 h-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
          I accept the{' '}
          <button
            type="button"
            onClick={() => setIsTermsOpen(true)}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            terms and conditions
          </button>
        </label>
      </div>
    </div>
  );

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

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">
              {currentStep === 1 ? 'Project Details' : 
               currentStep === 2 ? 'Timeline & Budget' : 
               'Upload Files'}
            </h2>
            
            {currentStep === 1 && renderProjectDetails()}
            {currentStep === 2 && renderTimelineAndBudget()}
            {currentStep === 3 && renderFileUpload()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-300 hover:bg-chrome-600 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </button>
              )}
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-indigo-500 rounded-lg text-white hover:bg-indigo-500 transition-all"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-2 bg-indigo-600 border border-indigo-500 rounded-lg text-white hover:bg-indigo-500 transition-all"
                  >
                    Submit Project
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  );
};

export default Submit;