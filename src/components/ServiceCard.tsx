import React from 'react';
import { Music2, Zap, Clock, Award } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: 'mixing' | 'mastering' | 'stem' | 'premium';
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, price }) => {
  const icons = {
    mixing: <Music2 className="h-6 w-6 text-indigo-600" />,
    mastering: <Zap className="h-6 w-6 text-indigo-600" />,
    stem: <Clock className="h-6 w-6 text-indigo-600" />,
    premium: <Award className="h-6 w-6 text-indigo-600" />
  };

  return (
    <div className="bg-chrome-800 p-6 border border-chrome-600 rounded-lg hover:shadow-sharp transition-all duration-300">
      <div className="flex items-center mb-4">
        {icons[icon]}
        <h3 className="ml-2 text-xl font-semibold text-gray-100">{title}</h3>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-indigo-600">{price}</span>
        <button className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded hover:bg-indigo-600/20 hover:shadow-neon transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;