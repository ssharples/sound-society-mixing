import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Mic2, Award, Waveform, Laptop2, Headphones, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SpotifyPlaylist from '../components/SpotifyPlaylist';

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

        {/* Featured Tracks Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-chrome-800/50">
          <SpotifyPlaylist />
        </div>

        {/* Meet the Engineer Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-6">Meet Your Engineer</h2>
              <p className="text-gray-400 mb-6">
                With over a decade of experience in audio engineering and music production,
                I've had the privilege of working with artists across various genres.
                My passion lies in helping musicians achieve their sonic vision and
                creating mixes that stand out in today's competitive music landscape.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <Award className="h-5 w-5 text-indigo-400 mr-3" />
                  <span>10+ years of professional experience</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Music2 className="h-5 w-5 text-indigo-400 mr-3" />
                  <span>Worked with 500+ artists</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Headphones className="h-5 w-5 text-indigo-400 mr-3" />
                  <span>Specialized in multiple genres</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                <img
                  src="https://aflxjobceqjpjftxwewp.supabase.co/storage/v1/object/public/web-content/studio-setup.jpg"
                  alt="Studio Setup"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Studio Equipment Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-chrome-800/50">
          <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">Studio Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <Laptop2 className="h-6 w-6 text-indigo-400 mr-3" />
                DAW & Software
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Pro Tools Ultimate</li>
                <li>Ableton Live 11 Suite</li>
                <li>Universal Audio Luna</li>
                <li>Waves Complete Bundle</li>
                <li>FabFilter Pro Bundle</li>
              </ul>
            </div>
            
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <Headphones className="h-6 w-6 text-indigo-400 mr-3" />
                Monitoring
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Focal Solo6 Be Monitors</li>
                <li>Audeze LCD-X Headphones</li>
                <li>Sonarworks Reference 4</li>
                <li>Subpac X1</li>
              </ul>
            </div>

            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <Waveform className="h-6 w-6 text-indigo-400 mr-3" />
                Hardware
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Universal Audio Apollo x8p</li>
                <li>Dangerous Music 2-BUS+</li>
                <li>API 2500 Compressor</li>
                <li>Neve 1073 Preamp</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <HelpCircle className="h-6 w-6 text-indigo-400 mr-3" />
                What format should I send my files in?
              </h3>
              <p className="text-gray-400">
                Please send WAV files (24-bit/48kHz minimum) with peaks no higher than -6dB.
                Each track should be bounced from the very beginning of your project.
              </p>
            </div>

            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <HelpCircle className="h-6 w-6 text-indigo-400 mr-3" />
                How many revisions do I get?
              </h3>
              <p className="text-gray-400">
                The number of revisions depends on your chosen package. Basic includes 2 revisions,
                Standard includes 3 revisions, and Premium includes unlimited revisions.
              </p>
            </div>

            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <HelpCircle className="h-6 w-6 text-indigo-400 mr-3" />
                What's your turnaround time?
              </h3>
              <p className="text-gray-400">
                Turnaround times vary by package: Premium is 48 hours, Standard is 3-5 days,
                and Basic is 5-7 days. Custom projects will be quoted based on complexity.
              </p>
            </div>

            <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                <HelpCircle className="h-6 w-6 text-indigo-400 mr-3" />
                Do you offer stem mastering?
              </h3>
              <p className="text-gray-400">
                Yes, we offer stem mastering services. This allows for more detailed control
                over the final master and is included in our Premium package.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">Ready to Start?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's work together to make your music sound its absolute best.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-indigo-100 border border-indigo-500 rounded-lg hover:bg-indigo-700 hover:shadow-neon transition-all text-lg font-medium"
          >
            Start Your Project
          </Link>
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