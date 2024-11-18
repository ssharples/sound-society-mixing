import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Mic2, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [bannerUrl, setBannerUrl] = useState<string>('');

  useEffect(() => {
    const getBannerUrl = async () => {
      try {
        const { data: signedUrl, error } = await supabase
          .storage
          .from('web-content')
          .createSignedUrl('website banner me v2.png', 60 * 60 * 24); // 24 hour expiry

        if (error) {
          console.error('Error getting signed URL:', error);
          return;
        }

        if (signedUrl?.signedUrl) {
          console.log('Banner URL:', signedUrl.signedUrl);
          setBannerUrl(signedUrl.signedUrl);
        }
      } catch (error) {
        console.error('Error getting banner URL:', error);
      }
    };

    getBannerUrl();

    // Refresh the signed URL every 12 hours to prevent expiry
    const interval = setInterval(getBannerUrl, 1000 * 60 * 60 * 12);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {bannerUrl && (
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <img
                src={bannerUrl}
                alt="Professional Audio Services"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error loading image:', e);
                  const img = e.target as HTMLImageElement;
                  console.log('Failed URL:', img.src);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-chrome-900/0 via-chrome-900/60 to-chrome-900"></div>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 relative z-10">
            Professional Audio Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto relative z-10">
            Expert mixing, mastering, and production services for musicians and creators
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 text-center">
            <div className="inline-block p-3 bg-indigo-600/20 rounded-lg mb-4">
              <Music2 className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Professional Mixing</h3>
            <p className="text-gray-400">
              Industry-standard mixing services to make your tracks sound their best
            </p>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 text-center">
            <div className="inline-block p-3 bg-indigo-600/20 rounded-lg mb-4">
              <Mic2 className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Expert Mastering</h3>
            <p className="text-gray-400">
              Bring out the best in your music with our professional mastering services
            </p>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 text-center">
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
            className="inline-flex items-center px-6 py-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/30 hover:shadow-neon transition-all text-lg font-medium"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;