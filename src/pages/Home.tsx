import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music2, 
  Mic2, 
  Award, 
  Shield, 
  RefreshCcw, 
  Upload, 
  ChevronRight,
  Play,
  Pause,
  Star,
  MessageCircle,
  Mail,
  Github,
  Twitter,
  Instagram,
  Check
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

// FAQ interface
interface FAQ {
  question: string;
  answer: string;
}

// Sample testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Independent Artist",
    content: "The mixing quality exceeded my expectations. Truly professional service!",
    image: "https://aflxjobceqjpjftxwewp.supabase.co/storage/v1/object/public/testimonials/alex.jpg"
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Band Lead Singer",
    content: "Amazing attention to detail and great communication throughout the process.",
    image: "https://aflxjobceqjpjftxwewp.supabase.co/storage/v1/object/public/testimonials/sarah.jpg"
  }
];

// FAQ data
const faqs: FAQ[] = [
  {
    question: "How long does the mixing process take?",
    answer: "Typically 3-5 business days for mixing and an additional 1-2 days for mastering."
  },
  {
    question: "What format should I submit my files in?",
    answer: "Please submit high-quality WAV files (24-bit, 48kHz minimum)."
  },
  {
    question: "How many revisions do I get?",
    answer: "All packages include unlimited revisions until you're completely satisfied."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans. Contact us for more details."
  }
];

const Home = () => {
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getBannerUrl = async () => {
      try {
        const { data } = supabase.storage
          .from('web-content')
          .getPublicUrl('website banner me v2.png');
        
        if (data?.publicUrl) {
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
    <div className="min-h-screen bg-chrome-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bannerUrl || 'https://aflxjobceqjpjftxwewp.supabase.co/storage/v1/object/public/web-content/website%20banner%20me%20v2.png'}
            alt="Studio Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              setError(`Failed to load image from URL: ${img.src}`);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chrome-900/60 via-chrome-900/80 to-chrome-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
            Your Sound, Perfected
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            Professional mixing and mastering services that bring your music to life.
            No compromises, just pure sonic excellence.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all text-lg font-medium group"
          >
            Start Your Project
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-chrome-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-chrome-700 p-6 rounded-lg">
              <Shield className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">No Upfront Payment</h3>
              <p className="text-gray-400">Pay only when you're completely satisfied with the results</p>
            </div>
            <div className="bg-chrome-700 p-6 rounded-lg">
              <Music2 className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Professional Grade</h3>
              <p className="text-gray-400">Industry standard equipment and techniques</p>
            </div>
            <div className="bg-chrome-700 p-6 rounded-lg">
              <RefreshCcw className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Unlimited Revisions</h3>
              <p className="text-gray-400">We work until you're 100% satisfied</p>
            </div>
            <div className="bg-chrome-700 p-6 rounded-lg">
              <Upload className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Secure Upload</h3>
              <p className="text-gray-400">Your files are safe with our encrypted system</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-chrome-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-chrome-700 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Submit Project</h3>
                <p className="text-gray-400">Upload your tracks and tell us about your vision</p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-600/30"></div>
            </div>
            <div className="relative">
              <div className="bg-chrome-700 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Initial Mix</h3>
                <p className="text-gray-400">We create the first version of your mix</p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-600/30"></div>
            </div>
            <div className="relative">
              <div className="bg-chrome-700 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Revisions</h3>
                <p className="text-gray-400">We refine the mix based on your feedback</p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-600/30"></div>
            </div>
            <div className="bg-chrome-700 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Final Delivery</h3>
              <p className="text-gray-400">Receive your professionally mixed tracks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-chrome-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-chrome-700 p-6 rounded-lg">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="bg-chrome-800 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-gray-100 font-medium">Before Mix</h4>
                      <div className="w-48 h-1 bg-chrome-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <div className="bg-chrome-800 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-gray-100 font-medium">After Mix</h4>
                      <div className="w-48 h-1 bg-chrome-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-chrome-700 p-6 rounded-lg">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="bg-chrome-800 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-gray-100 font-medium">Before Mix</h4>
                      <div className="w-48 h-1 bg-chrome-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <div className="bg-chrome-800 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-gray-100 font-medium">After Mix</h4>
                      <div className="w-48 h-1 bg-chrome-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-chrome-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-chrome-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-chrome-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Choose the package that best fits your needs. All packages include unlimited revisions
            and our satisfaction guarantee.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-chrome-700 rounded-lg p-8 border-2 border-transparent hover:border-indigo-500 transition-all">
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Basic</h3>
              <div className="text-4xl font-bold text-gray-100 mb-6">
                $299
                <span className="text-lg text-gray-400 font-normal">/track</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Professional Mixing
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  2 Revisions
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  5-7 Day Delivery
                </li>
              </ul>
              <Link
                to="/submit"
                className="block w-full py-3 px-6 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-chrome-700 rounded-lg p-8 border-2 border-indigo-500 relative transform hover:scale-105 transition-all">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Standard</h3>
              <div className="text-4xl font-bold text-gray-100 mb-6">
                $499
                <span className="text-lg text-gray-400 font-normal">/track</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Professional Mixing & Mastering
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  3 Revisions
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  3-5 Day Delivery
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Stem Mastering
                </li>
              </ul>
              <Link
                to="/submit"
                className="block w-full py-3 px-6 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-chrome-700 rounded-lg p-8 border-2 border-transparent hover:border-indigo-500 transition-all">
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Premium</h3>
              <div className="text-4xl font-bold text-gray-100 mb-6">
                $799
                <span className="text-lg text-gray-400 font-normal">/track</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Professional Mixing & Mastering
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Unlimited Revisions
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  48hr Delivery
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Stem Mastering
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Priority Support
                </li>
              </ul>
              <Link
                to="/submit"
                className="block w-full py-3 px-6 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <div className="min-h-screen bg-chrome-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            {error && (
              <div className="text-red-500 mb-4">
                Error loading banner: {error}
              </div>
            )}
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
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

      {/* About the Engineer */}
      <section className="py-20 bg-chrome-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-6">
                About the Engineer
              </h2>
              <p className="text-gray-300 mb-6">
                With over a decade of experience in professional audio engineering, I've worked with artists
                across multiple genres, from indie to major labels. My approach combines technical expertise
                with a deep understanding of musical aesthetics.
              </p>
              <p className="text-gray-300 mb-6">
                I've had the privilege of working on platinum-selling records and award-winning albums,
                always striving to bring out the best in every project, regardless of its scale.
              </p>
              <div className="bg-chrome-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Studio Equipment</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-400 mr-2" />
                    Pro Tools HDX System
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-400 mr-2" />
                    Neve Preamps & EQs
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-400 mr-2" />
                    Universal Audio Plugins
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-400 mr-2" />
                    Barefoot MicroMain27 Monitors
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://aflxjobceqjpjftxwewp.supabase.co/storage/v1/object/public/web-content/engineer-at-work.jpg"
                alt="Engineer at work"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-chrome-700 p-4 rounded-lg shadow-xl">
                <div className="text-4xl font-bold text-gray-100">10+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-chrome-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-chrome-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/faq"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
            >
              View all FAQs
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-chrome-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-100 mb-6">
            Ready to Perfect Your Sound?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Take the first step towards professional-quality audio. No upfront payment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/submit"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-lg font-medium"
            >
              Submit Your Project
            </Link>
            <a
              href="mailto:contact@soundsocietymixing.com"
              className="flex items-center text-gray-300 hover:text-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chrome-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/submit" className="text-gray-400 hover:text-gray-300">
                    Submit Project
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-gray-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/mixing" className="text-gray-400 hover:text-gray-300">
                    Mixing
                  </Link>
                </li>
                <li>
                  <Link to="/services/mastering" className="text-gray-400 hover:text-gray-300">
                    Mastering
                  </Link>
                </li>
                <li>
                  <Link to="/services/production" className="text-gray-400 hover:text-gray-300">
                    Production
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/soundsocietymix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/soundsocietymix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="mailto:contact@soundsocietymixing.com"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-chrome-600 pt-8">
            <p className="text-center text-gray-400">
              {new Date().getFullYear()} Sound Society Mixing. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;