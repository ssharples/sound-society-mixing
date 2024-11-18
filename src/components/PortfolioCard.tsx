import React from 'react';
import WaveformPlayer from './WaveformPlayer';
import { Badge } from './Badge';

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  category: string;
  tags: string[];
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageUrl,
  audioUrl,
  category,
  tags
}) => {
  return (
    <div className="bg-chrome-800 rounded-lg border border-chrome-600 overflow-hidden transition-all duration-300 hover:shadow-sharp group flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge>{category}</Badge>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2 flex-1">{description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-chrome-700 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <WaveformPlayer url={audioUrl} title={title} />
      </div>
    </div>
  );
};

export default PortfolioCard;