import React from 'react';
import { FiStar, FiEdit, FiTrash } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();
  const { _id, userId, rating, text, timestamp, destination } = review;
  
  // Format the date
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Check if current user is the author or admin
  const isAuthor = user && user._id === userId._id;
  const canModify = isAuthor || (user && user.role === 'admin');
  
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar 
          key={i} 
          className={`${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold">{userId.name}</h3>
          <div className="flex mt-1 mb-2">
            {renderStars()}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {canModify && (
            <>
              <button 
                onClick={() => onEdit(review)} 
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit />
              </button>
              <button 
                onClick={() => onDelete(_id)} 
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash />
              </button>
            </>
          )}
        </div>
      </div>
      
      <p className="text-gray-700 mb-3">{text}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <div>
          Visited: {destination.name}
        </div>
        <div>
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard; 