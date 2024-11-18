import React, { useState } from 'react';
import PortfolioCard from '../components/PortfolioCard';
import { Music, Filter } from 'lucide-react';

type Category = 'All' | 'Mixing' | 'Mastering' | 'Production';

const categories: Category[] = ['All', 'Mixing', 'Mastering', 'Production'];

const portfolioItems = [
  {
    id: 1,
    title: "Summer Vibes EP",
    description: "A vibrant electronic EP featuring dynamic mixing and spatial effects.",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    audioUrl: "/samples/summer-vibes.mp3",
    category: "Mixing",
    tags: ["Electronic", "Dance", "Summer"]
  },
  {
    id: 2,
    title: "Acoustic Sessions",
    description: "Intimate acoustic recordings with natural room ambience.",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    audioUrl: "/samples/acoustic.mp3",
    category: "Production",
    tags: ["Acoustic", "Folk", "Live"]
  },
  {
    id: 3,
    title: "Heavy Metal Anthology",
    description: "Powerful metal tracks with pristine clarity and punch.",
    imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7",
    audioUrl: "/samples/metal.mp3",
    category: "Mastering",
    tags: ["Metal", "Rock", "High Energy"]
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-3 sm:mb-4">
            Audio Portfolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our collection of professionally mixed and mastered tracks.
            Listen to the quality and attention to detail in each project.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <Filter className="h-5 w-5 text-indigo-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-gray-400 hover:text-indigo-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-chrome-800 border border-chrome-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              audioUrl={item.audioUrl}
              category={item.category}
              tags={item.tags}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}