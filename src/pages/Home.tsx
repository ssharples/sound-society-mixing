import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Mic2, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getBannerUrl = async () => {
      try {
        // Get public URL
        const { data } = supabase.storage
          .from('web-content')
          .getPublicUrl('website banner me v2.png');
        
        if (data?.publicUrl) {
          console.log('Banner URL:', data.publicUrl);
          setBannerUrl(data.publicUrl);
          setError('');
        } else {
          setError('No public URL received');
        }
      } catch (error) {
        console.error('Error getting banner URL:', error);
        setError('Unexpected error: ' + (error as Error).message);
      }
    };

    getBannerUrl();
  }, []);

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {error && (
            <div className="text-red-500 mb-4 bg-red-500/10 p-3 rounded-lg">
              Error loading banner: {error}
            </div>
          )}
          <div className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={bannerUrl || 'https://aflxjobceqjpjftxwewp.supabase.co/storage/v1/object/public/web-content/website%20banner%20me%20v2.png'}
              alt="Professional Audio Services"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                console.error('Error loading image:', {
                  src: img.src,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                  error: e
                });
                setError(`Failed to load image from URL: ${img.src}`);
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                console.log('Image loaded successfully:', {
                  src: img.src,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight
                });
                setError('');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-chrome-900/0 via-chrome-900/60 to-chrome-900"></div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text text-transparent mb-6 relative z-10">
            Professional Audio Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 relative z-10">
            Expert mixing, mastering, and production services for musicians and creators
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-neon">
            <div className="inline-block p-3 bg-indigo-600/20 rounded-lg mb-4">
              <Music2 className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Professional Mixing</h3>
            <p className="text-gray-400">
              Industry-standard mixing services to make your tracks sound their best
            </p>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-neon">
            <div className="inline-block p-3 bg-indigo-600/20 rounded-lg mb-4">
              <Mic2 className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Expert Mastering</h3>
            <p className="text-gray-400">
              Bring out the best in your music with our professional mastering services
            </p>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-neon">
            <div className="inline-block p-3 bg-indigo-600/20 rounded-lg mb-4">
              <Award className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Quality Guarantee</h3>
            <p className="text-gray-400">
              100% satisfaction guarantee with our industry-leading quality standards
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            to="/submit"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-indigo-100 border border-indigo-500 rounded-lg hover:bg-indigo-700 hover:shadow-neon transition-all text-lg font-medium"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;