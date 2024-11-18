import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface QualityMeterProps {
  type: string;
  value: number;
  label: string;
}

const QualityMeter: React.FC<QualityMeterProps> = ({ type, value, label }) => {
  const getColor = () => {
    if (value >= 80) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getIcon = () => {
    if (value >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (value >= 50) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{type}</span>
        {getIcon()}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColor().replace('text-', 'bg-')}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <p className="mt-2 text-xs text-gray-500">{label}</p>
    </div>
  );
};

export default QualityMeter;