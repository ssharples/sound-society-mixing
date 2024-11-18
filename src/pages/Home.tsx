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
        // First, list the files to verify the exact name
        const { data: files, error: listError } = await supabase
          .storage
          .from('web-content')
          .list();

        if (listError) {
          console.error('Error listing files:', listError);
          setError('Error listing files: ' + listError.message);
          return;
        }

        console.log('Available files:', files);

        // Find our banner image
        const bannerFile = files?.find(file => 
          file.name.toLowerCase().includes('banner') && 
          file.name.toLowerCase().includes('me') &&
          file.name.toLowerCase().includes('v2')
        );

        if (!bannerFile) {
          console.error('Banner file not found in storage');
          setError('Banner file not found in storage');
          return;
        }

        console.log('Found banner file:', bannerFile.name);

        // Get signed URL using the exact file name
        const { data: signedUrl, error: signError } = await supabase
          .storage
          .from('web-content')
          .createSignedUrl(bannerFile.name, 60 * 60 * 24); // 24 hour expiry

        if (signError) {
          console.error('Error getting signed URL:', signError);
          setError('Error getting signed URL: ' + signError.message);
          return;
        }

        if (signedUrl?.signedUrl) {
          console.log('Banner URL:', signedUrl.signedUrl);
          setBannerUrl(signedUrl.signedUrl);
          setError('');
        } else {
          setError('No signed URL received');
        }
      } catch (error) {
        console.error('Error getting banner URL:', error);
        setError('Unexpected error: ' + (error as Error).message);
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
          {error && (
            <div className="text-red-500 mb-4">
              Error loading banner: {error}
            </div>
          )}
          {bannerUrl && (
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <img
                src={bannerUrl}
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