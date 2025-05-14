import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import ReviewCard from '../components/ReviewCard';
import { FiMapPin, FiCalendar, FiMap, FiCheckCircle, FiThumbsUp } from 'react-icons/fi';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Fetch destinations and reviews on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // For development, we'll use dummy data
        // In production, this would be:
        // const destResponse = await axios.get('/api/destinations');
        // const reviewResponse = await axios.get('/api/reviews');
        
        // Dummy destinations data
        const dummyDestinations = [
          {
            _id: '1',
            name: "Cox's Bazar",
            location: "Chittagong Division",
            description: "The longest natural sea beach in the world, stretching 120 kilometers along the Bay of Bengal.",
            image: "https://images.unsplash.com/photo-1619112004223-a0ae50c130e4?q=80&w=2071&auto=format&fit=crop"
          },
          {
            _id: '2',
            name: "Sundarbans",
            location: "Khulna Division",
            description: "The largest mangrove forest in the world, home to the famous Royal Bengal Tiger.",
            image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=2070&auto=format&fit=crop"
          },
          {
            _id: '3',
            name: "Sylhet Tea Gardens",
            location: "Sylhet Division",
            description: "Beautiful rolling hills covered with lush green tea gardens and serene landscapes.",
            image: "https://images.unsplash.com/photo-1566192091742-75a5edca2e99?q=80&w=2000&auto=format&fit=crop"
          },
          {
            _id: '4',
            name: "Saint Martin Island",
            location: "Bay of Bengal",
            description: "The only coral island in Bangladesh with crystal clear waters and colorful marine life.",
            image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000&auto=format&fit=crop"
          }
        ];
        
        // Dummy reviews data
        const dummyReviews = [
          {
            _id: '1',
            userId: { _id: '101', name: 'Ahmed Khan' },
            rating: 5,
            text: "Cox's Bazar was an amazing experience! The beach stretches as far as the eye can see. VoyageBuddy made our trip planning so seamless.",
            timestamp: new Date('2023-11-10'),
            destination: { name: "Cox's Bazar" }
          },
          {
            _id: '2',
            userId: { _id: '102', name: 'Fatima Rahman' },
            rating: 4,
            text: "Loved exploring Sundarbans through VoyageBuddy's itinerary. We even caught a glimpse of a Royal Bengal Tiger from our boat!",
            timestamp: new Date('2023-10-15'),
            destination: { name: "Sundarbans" }
          },
          {
            _id: '3',
            userId: { _id: '103', name: 'Rahim Chowdhury' },
            rating: 5,
            text: "The tea gardens of Sylhet are like heaven on earth. VoyageBuddy arranged amazing local guides who knew all the best spots.",
            timestamp: new Date('2023-09-22'),
            destination: { name: "Sylhet Tea Gardens" }
          }
        ];
        
        setDestinations(dummyDestinations);
        setReviews(dummyReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up review carousel
    const interval = setInterval(() => {
      setCurrentReviewIndex(prevIndex => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Workflow steps
  const workflowSteps = [
    {
      id: 1,
      icon: <FiMapPin size={24} />,
      title: "Choose Destination",
      description: "Browse our collection of amazing destinations across Bangladesh."
    },
    {
      id: 2,
      icon: <FiCalendar size={24} />,
      title: "Select Dates",
      description: "Pick your travel dates and see availability in real-time."
    },
    {
      id: 3,
      icon: <FiMap size={24} />,
      title: "Plan Your Route",
      description: "Use our interactive map to plan your perfect travel route."
    },
    {
      id: 4,
      icon: <FiCheckCircle size={24} />,
      title: "Book Your Trip",
      description: "Confirm your travel plans with a few simple clicks."
    },
    {
      id: 5,
      icon: <FiThumbsUp size={24} />,
      title: "Enjoy Your Journey",
      description: "Travel worry-free with our 24/7 customer support."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1568819317551-31051b37f69f?q=80&w=2574&auto=format&fit=crop')",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Discover the Beauty of Bangladesh
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Plan your perfect trip with VoyageBuddy, your trusted companion for unforgettable journeys
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/plan-trip" className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors">
                  Plan Your Trip
                </Link>
                <Link to="/reviews" className="bg-transparent hover:bg-white/10 text-white border-2 border-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors">
                  Read Reviews
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How VoyageBuddy Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Planning your trip is easy with our simple step-by-step process. We handle the details so you can focus on making memories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {workflowSteps.map((step) => (
                <div key={step.id} className="bg-white rounded-lg shadow-md p-6 text-center relative">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {step.id !== workflowSteps.length && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore some of the most beautiful places in Bangladesh, each offering unique experiences and breathtaking views.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {destinations.map((destination) => (
                  <DestinationCard key={destination._id} destination={destination} />
                ))}
              </div>
            )}
            
            <div className="text-center mt-12">
              <Link to="/plan-trip" className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                View All Destinations
              </Link>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Read about the experiences of fellow travelers who planned their trips with VoyageBuddy.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div>
                {reviews.length > 0 && (
                  <div className="max-w-3xl mx-auto">
                    <ReviewCard 
                      review={reviews[currentReviewIndex]} 
                      onEdit={() => {}} 
                      onDelete={() => {}}
                    />
                    
                    <div className="flex justify-center mt-6">
                      {reviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentReviewIndex(index)}
                          className={`w-3 h-3 mx-1 rounded-full ${
                            index === currentReviewIndex ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="text-center mt-12">
              <Link to="/reviews" className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                View All Reviews
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of happy travelers who have discovered the beauty of Bangladesh with VoyageBuddy.
            </p>
            <Link to="/register" className="inline-block bg-white text-purple-600 hover:bg-gray-100 py-3 px-8 rounded-lg font-semibold text-lg transition-colors">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home; 