import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';

const DestinationCard = ({ destination }) => {
  const { _id, name, location, description, image } = destination;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <FiMapPin className="mr-2 text-purple-600" />
          <span>{location}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        <Link 
          to={`/plan-trip?destination=${_id}`}
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Plan Trip
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard; 