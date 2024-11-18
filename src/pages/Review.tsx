import React from 'react';
import QualityMeter from '../components/QualityMeter';
import { Download, MessageCircle } from 'lucide-react';

const Review = () => {
  const qualityMetrics = [
    {
      type: "Dynamic Range",
      value: 85,
      label: "Excellent dynamic range with proper headroom"
    },
    {
      type: "Frequency Balance",
      value: 92,
      label: "Well-balanced across the frequency spectrum"
    },
    {
      type: "Stereo Width",
      value: 78,
      label: "Good stereo image with room for improvement"
    },
    {
      type: "Peak Levels",
      value: 95,
      label: "Optimal peak levels for streaming"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">File Quality Review</h1>
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Download Report
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quality Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualityMetrics.map((metric, index) => (
                <QualityMeter
                  key={index}
                  type={metric.type}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Engineer's Notes</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    The overall quality of your files is excellent. The dynamic range is well-preserved,
                    and the frequency balance is professional-grade. I would recommend a slight
                    adjustment to the stereo width in the mid-range frequencies to achieve better
                    compatibility across different playback systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;