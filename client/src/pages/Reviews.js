import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import { FiStar, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Reviews = () => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  
  // Form states
  const [selectedDestination, setSelectedDestination] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Fetch reviews and destinations
  useEffect(() => {
    const fetchData = async () => {
      try {
        // For development, we'll use dummy data
        // In production, this would be:
        // const reviewsResponse = await axios.get('/api/reviews');
        // const destinationsResponse = await axios.get('/api/destinations');
        
        // Dummy reviews data
        const dummyReviews = [
          {
            _id: '1',
            userId: { _id: '101', name: 'Ahmed Khan' },
            rating: 5,
            text: "Cox's Bazar was an amazing experience! The beach stretches as far as the eye can see. VoyageBuddy made our trip planning so seamless.",
            timestamp: new Date('2023-12-10'),
            destination: { _id: '1', name: "Cox's Bazar" }
          },
          {
            _id: '2',
            userId: { _id: '102', name: 'Fatima Rahman' },
            rating: 4,
            text: "Loved exploring Sundarbans through VoyageBuddy's itinerary. We even caught a glimpse of a Royal Bengal Tiger from our boat!",
            timestamp: new Date('2023-11-15'),
            destination: { _id: '2', name: "Sundarbans" }
          },
          {
            _id: '3',
            userId: { _id: '103', name: 'Rahim Chowdhury' },
            rating: 5,
            text: "The tea gardens of Sylhet are like heaven on earth. VoyageBuddy arranged amazing local guides who knew all the best spots.",
            timestamp: new Date('2023-10-22'),
            destination: { _id: '3', name: "Sylhet Tea Gardens" }
          },
          {
            _id: '4',
            userId: { _id: '104', name: 'Nusrat Jahan' },
            rating: 5,
            text: "Saint Martin Island has the most beautiful beaches and crystal clear waters. Perfect for snorkeling! Would definitely recommend this trip to anyone.",
            timestamp: new Date('2023-09-05'),
            destination: { _id: '4', name: "Saint Martin Island" }
          },
          {
            _id: '5',
            userId: { _id: '105', name: 'Kabir Ahmed' },
            rating: 4,
            text: "The Sundarbans tour was well organized, although it rained a bit during our visit. The boat accommodations were comfortable and the food was great.",
            timestamp: new Date('2023-08-18'),
            destination: { _id: '2', name: "Sundarbans" }
          }
        ];
        
        // Dummy destinations data
        const dummyDestinations = [
          { _id: '1', name: "Cox's Bazar" },
          { _id: '2', name: "Sundarbans" },
          { _id: '3', name: "Sylhet Tea Gardens" },
          { _id: '4', name: "Saint Martin Island" },
          { _id: '5', name: "Bandarban" },
          { _id: '6', name: "Rangamati" }
        ];
        
        setReviews(dummyReviews);
        setDestinations(dummyDestinations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle review edit
  const handleEditReview = (review) => {
    setEditingReview(review);
    setSelectedDestination(review.destination._id);
    setRating(review.rating);
    setReviewText(review.text);
    setShowForm(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        // In a real application, this would be an API call
        // await axios.delete(`/api/reviews/${reviewId}`);
        
        // Update UI
        setReviews(reviews.filter(review => review._id !== reviewId));
        setFormSuccess('Review deleted successfully.');
        
        // Clear form success message after 3 seconds
        setTimeout(() => {
          setFormSuccess('');
        }, 3000);
      } catch (error) {
        console.error("Error deleting review:", error);
        setFormError('Failed to delete review. Please try again.');
        
        // Clear form error message after 3 seconds
        setTimeout(() => {
          setFormError('');
        }, 3000);
      }
    }
  };
  
  // Toggle review form
  const toggleReviewForm = () => {
    if (!isAuthenticated) {
      setFormError('Please login to submit a review.');
      
      // Clear form error message after 3 seconds
      setTimeout(() => {
        setFormError('');
      }, 3000);
      return;
    }
    
    // If we're closing the form or not editing, reset the form
    if (showForm || !editingReview) {
      setSelectedDestination('');
      setRating(0);
      setReviewText('');
      setEditingReview(null);
    }
    
    setShowForm(!showForm);
  };
  
  // Submit review form
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setFormError('Please login to submit a review.');
      return;
    }
    
    if (!selectedDestination || rating === 0 || !reviewText.trim()) {
      setFormError('Please fill in all fields.');
      return;
    }
    
    try {
      const destination = destinations.find(d => d._id === selectedDestination);
      
      if (editingReview) {
        // Update existing review
        // In a real application, this would be an API call
        // const response = await axios.put(`/api/reviews/${editingReview._id}`, {
        //   destinationId: selectedDestination,
        //   rating,
        //   text: reviewText
        // });
        
        // Mock update
        const updatedReview = {
          ...editingReview,
          rating,
          text: reviewText,
          destination: {
            _id: selectedDestination,
            name: destination.name
          }
        };
        
        setReviews(reviews.map(review => 
          review._id === editingReview._id ? updatedReview : review
        ));
        
        setFormSuccess('Review updated successfully!');
      } else {
        // Create new review
        // In a real application, this would be an API call
        // const response = await axios.post('/api/reviews', {
        //   destinationId: selectedDestination,
        //   rating,
        //   text: reviewText
        // });
        
        // Mock creation
        const newReview = {
          _id: `temp-${Date.now()}`,
          userId: {
            _id: user._id,
            name: user.name
          },
          rating,
          text: reviewText,
          timestamp: new Date(),
          destination: {
            _id: selectedDestination,
            name: destination.name
          }
        };
        
        setReviews([newReview, ...reviews]);
        setFormSuccess('Review submitted successfully!');
      }
      
      // Reset form
      setSelectedDestination('');
      setRating(0);
      setReviewText('');
      setEditingReview(null);
      setShowForm(false);
      
      // Clear form success message after 3 seconds
      setTimeout(() => {
        setFormSuccess('');
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setFormError('Failed to submit review. Please try again.');
      
      // Clear form error message after 3 seconds
      setTimeout(() => {
        setFormError('');
      }, 3000);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Traveler Experiences</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Read authentic reviews from fellow travelers who have explored Bangladesh with VoyageBuddy. Share your own experience to help others plan their perfect trip.
          </p>
          
          {/* Success Message */}
          {formSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
              {formSuccess}
            </div>
          )}
          
          {/* Error Message */}
          {formError && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
              {formError}
            </div>
          )}
          
          {/* Review Form Toggle Button */}
          <div className="mb-8 text-center">
            <button
              onClick={toggleReviewForm}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              {showForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>
          
          {/* Review Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-10 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingReview ? 'Edit Your Review' : 'Share Your Experience'}
                </h2>
                <button
                  onClick={toggleReviewForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmitReview}>
                {/* Destination Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Destination
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    required
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((dest) => (
                      <option key={dest._id} value={dest._id}>
                        {dest.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-2xl mr-1 focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                      >
                        <FiStar
                          className={`${
                            (hoveredStar ? star <= hoveredStar : star <= rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Review Text */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    rows="5"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    required
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                >
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
          
          {/* Reviews List */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews; 