import React from 'react';
import { IncentiveInfo } from '../types';

interface Props {
  data: IncentiveInfo;
}

const IncentiveCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg mb-6 transform transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="bg-white/20 text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm">
            OFERTA EXCLUSIVA
          </span>
          <h2 className="text-2xl font-bold mt-2 leading-tight">Tu Sonrisa Perfecta</h2>
        </div>
        <div className="text-right">
          <p className="text-teal-200 text-sm line-through decoration-red-400 decoration-2">
            ${data.originalPrice}
          </p>
          <p className="text-4xl font-extrabold text-white">
            ${data.discountedPrice}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium text-teal-50">Limpieza Dental Profesional</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium text-teal-50">Valoración General Completa</span>
        </div>
      </div>
    </div>
  );
};

export default IncentiveCard;