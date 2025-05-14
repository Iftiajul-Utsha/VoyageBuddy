import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiEdit, FiTrash, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // For development, we'll use dummy data
        // In production, this would be:
        // const bookingsResponse = await axios.get('/api/bookings/user');
        // const reviewsResponse = await axios.get('/api/reviews/user');
        
        // Dummy bookings data
        const dummyBookings = [
          {
            _id: '1',
            destination: {
              _id: '1',
              name: "Cox's Bazar",
              location: "Chittagong Division",
              image: "https://images.unsplash.com/photo-1619112004223-a0ae50c130e4?q=80&w=2071&auto=format&fit=crop"
            },
            date: new Date('2023-12-25'),
            travelers: 2,
            status: 'Confirmed',
            note: 'Looking forward to this beach vacation!'
          },
          {
            _id: '2',
            destination: {
              _id: '3',
              name: "Sylhet Tea Gardens",
              location: "Sylhet Division",
              image: "https://images.unsplash.com/photo-1566192091742-75a5edca2e99?q=80&w=2000&auto=format&fit=crop"
            },
            date: new Date('2024-01-15'),
            travelers: 4,
            status: 'Pending',
            note: 'Visiting with family, prefer a guide who speaks English.'
          }
        ];
        
        // Dummy reviews data
        const dummyReviews = [
          {
            _id: '101',
            userId: { _id: user._id, name: user.name },
            destination: { _id: '2', name: "Sundarbans" },
            rating: 5,
            text: "Our trip to the Sundarbans was the highlight of our year! We saw so much wildlife and the guides were very knowledgeable.",
            timestamp: new Date('2023-11-05')
          }
        ];
        
        setBookings(dummyBookings);
        setReviews(dummyReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // In a real application, this would be an API call
        // await axios.put(`/api/bookings/${bookingId}/cancel`);
        
        // Update UI
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'Cancelled' } 
            : booking
        ));
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };
  
  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        // In a real application, this would be an API call
        // await axios.delete(`/api/reviews/${reviewId}`);
        
        // Update UI
        setReviews(reviews.filter(review => review._id !== reviewId));
      } catch (error) {
        console.error("Error deleting review:", error);
        alert('Failed to delete review. Please try again.');
      }
    }
  };
  
  // Render booking status badge
  const renderStatusBadge = (status) => {
    let bgColor;
    switch (status) {
      case 'Confirmed':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Pending':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Cancelled':
        bgColor = 'bg-red-100 text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${bgColor}`}>
        {status}
      </span>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {/* User Profile Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Welcome, {user?.name}
                  </h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              <Link 
                to="/plan-trip" 
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Plan a New Trip
              </Link>
            </div>
            
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-3 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'bookings'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-purple-600'
                }`}
                onClick={() => setActiveTab('bookings')}
              >
                My Bookings
              </button>
              <button
                className={`py-3 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'reviews'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-purple-600'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                My Reviews
              </button>
            </div>
            
            {/* Tab Content */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : activeTab === 'bookings' ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Trip Bookings</h2>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
                    <Link 
                      to="/plan-trip" 
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Plan Your First Trip
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={booking.destination.image} 
                            alt={booking.destination.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold">{booking.destination.name}</h3>
                            {renderStatusBadge(booking.status)}
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center text-gray-600 mb-2">
                              <FiMapPin className="mr-2" />
                              <span>{booking.destination.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <FiCalendar className="mr-2" />
                              <span>
                                {new Date(booking.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <FiUsers className="mr-2" />
                              <span>{booking.travelers} Travelers</span>
                            </div>
                            {booking.note && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-md text-gray-700">
                                <p>{booking.note}</p>
                              </div>
                            )}
                          </div>
                          
                          {booking.status === 'Pending' && (
                            <div className="flex justify-between mt-4">
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                Cancel Booking
                              </button>
                              
                              <Link 
                                to={`/plan-trip?destination=${booking.destination._id}`}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                Modify Booking
                              </Link>
                            </div>
                          )}
                          
                          {booking.status === 'Confirmed' && !reviews.some(r => r.destination._id === booking.destination._id) && (
                            <div className="mt-4">
                              <Link 
                                to="/reviews" 
                                className="inline-flex items-center text-purple-600 hover:text-purple-800"
                              >
                                <FiStar className="mr-1" /> Write a Review
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
                
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You haven't written any reviews yet.</p>
                    <Link 
                      to="/reviews" 
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Write Your First Review
                    </Link>
                  </div>
                ) : (
                  <div>
                    {reviews.map((review) => (
                      <ReviewCard
                        key={review._id}
                        review={review}
                        onEdit={() => navigate('/reviews')}
                        onDelete={handleDeleteReview}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard; 