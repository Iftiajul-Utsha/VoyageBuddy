import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiCalendar, FiUsers, FiMessageSquare, FiCheck } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const containerStyle = {
  width: '100%',
  height: '500px'
};

// Center on Bangladesh
const center = {
  lat: 23.8103,
  lng: 90.4125
};

const TripPlanner = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedDestId = searchParams.get('destination');
  
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Google Maps states
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const directionsService = useRef(null);
  
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY' // Would be replaced with actual API key
  });
  
  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // For development, we'll use dummy data
        // In production, this would be:
        // const response = await axios.get('/api/destinations');
        
        // Dummy destinations data
        const dummyDestinations = [
          {
            _id: '1',
            name: "Cox's Bazar",
            location: "Chittagong Division",
            description: "The longest natural sea beach in the world, stretching 120 kilometers along the Bay of Bengal.",
            image: "https://images.unsplash.com/photo-1619112004223-a0ae50c130e4?q=80&w=2071&auto=format&fit=crop",
            coordinates: { lat: 21.4272, lng: 92.0058 }
          },
          {
            _id: '2',
            name: "Sundarbans",
            location: "Khulna Division",
            description: "The largest mangrove forest in the world, home to the famous Royal Bengal Tiger.",
            image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=2070&auto=format&fit=crop",
            coordinates: { lat: 21.9497, lng: 89.1833 }
          },
          {
            _id: '3',
            name: "Sylhet Tea Gardens",
            location: "Sylhet Division",
            description: "Beautiful rolling hills covered with lush green tea gardens and serene landscapes.",
            image: "https://images.unsplash.com/photo-1566192091742-75a5edca2e99?q=80&w=2000&auto=format&fit=crop",
            coordinates: { lat: 24.8949, lng: 91.8687 }
          },
          {
            _id: '4',
            name: "Saint Martin Island",
            location: "Bay of Bengal",
            description: "The only coral island in Bangladesh with crystal clear waters and colorful marine life.",
            image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000&auto=format&fit=crop",
            coordinates: { lat: 20.6270, lng: 92.3200 }
          }
        ];
        
        setDestinations(dummyDestinations);
        
        // If a destination was preselected from the URL parameter
        if (preselectedDestId) {
          const preselected = dummyDestinations.find(d => d._id === preselectedDestId);
          if (preselected) {
            setSelectedDestination(preselected);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };
    
    fetchDestinations();
  }, [preselectedDestId]);
  
  // Initialize directions service when map is loaded
  const onMapLoad = useCallback(map => {
    setMap(map);
    if (window.google) {
      directionsService.current = new window.google.maps.DirectionsService();
    }
  }, []);
  
  // Update directions when destination is selected
  useEffect(() => {
    if (directionsService.current && selectedDestination && map) {
      // Use Dhaka as starting point for demo purposes
      const origin = { lat: 23.8103, lng: 90.4125 }; // Dhaka
      const destination = selectedDestination.coordinates;
      
      directionsService.current.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    }
  }, [selectedDestination, map]);
  
  // Handle destination selection
  const handleDestinationChange = (e) => {
    const destId = e.target.value;
    const selected = destinations.find(d => d._id === destId);
    setSelectedDestination(selected);
  };
  
  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setBookingStatus({
        submitted: true,
        success: false,
        message: "Please login to book a trip."
      });
      return;
    }
    
    if (!selectedDestination || !travelDate) {
      setBookingStatus({
        submitted: true,
        success: false,
        message: "Please select a destination and travel date."
      });
      return;
    }
    
    try {
      // In a real application, this would be an API call
      // const response = await axios.post('/api/bookings', {
      //   userId: user._id,
      //   destinationId: selectedDestination._id,
      //   date: travelDate,
      //   travelers: travelers,
      //   note: note,
      //   status: 'Pending'
      // });
      
      // Mock successful booking
      setBookingStatus({
        submitted: true,
        success: true,
        message: "Your booking request has been submitted successfully. We'll contact you soon."
      });
      
      // Reset form
      setNote('');
    } catch (error) {
      console.error("Booking error:", error);
      setBookingStatus({
        submitted: true,
        success: false,
        message: "There was an error submitting your booking. Please try again."
      });
    }
  };
  
  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Plan Your Perfect Trip</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Select your destination, choose your dates, and let us help you create an unforgettable journey across Bangladesh.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trip Planning Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Destination Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Destination
                    </label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                      value={selectedDestination ? selectedDestination._id : ""}
                      onChange={handleDestinationChange}
                      required
                    >
                      <option value="">Select a destination</option>
                      {destinations.map((dest) => (
                        <option key={dest._id} value={dest._id}>
                          {dest.name} - {dest.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Travel Date */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" />
                        Travel Date
                      </div>
                    </label>
                    <input
                      type="date"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      min={minDate}
                      required
                    />
                  </div>
                  
                  {/* Number of Travelers */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      <div className="flex items-center">
                        <FiUsers className="mr-2" />
                        Number of Travelers
                      </div>
                    </label>
                    <input
                      type="number"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value)))}
                      min="1"
                      max="20"
                      required
                    />
                  </div>
                  
                  {/* Additional Notes */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      <div className="flex items-center">
                        <FiMessageSquare className="mr-2" />
                        Additional Notes
                      </div>
                    </label>
                    <textarea
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                      rows="4"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Any specific requirements or questions?"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                  >
                    Book Now
                  </button>
                </form>
                
                {/* Booking Status Message */}
                {bookingStatus.submitted && (
                  <div className={`mt-4 p-3 rounded-md ${
                    bookingStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <div className="flex items-start">
                      {bookingStatus.success ? (
                        <FiCheck className="mt-1 mr-2" />
                      ) : (
                        <div className="text-red-500 mr-2">⚠</div>
                      )}
                      <p>{bookingStatus.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Map and Trip Summary */}
            <div className="lg:col-span-2">
              {/* Google Map */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Route Map</h2>
                
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedDestination ? selectedDestination.coordinates : center}
                    zoom={selectedDestination ? 10 : 7}
                    onLoad={onMapLoad}
                  >
                    {selectedDestination && !directions && (
                      <Marker position={selectedDestination.coordinates} />
                    )}
                    
                    {directions && (
                      <DirectionsRenderer directions={directions} />
                    )}
                  </GoogleMap>
                ) : (
                  <div className="flex justify-center items-center h-[500px] bg-gray-100 rounded-md">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                )}
              </div>
              
              {/* Trip Summary */}
              {selectedDestination && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <img 
                        src={selectedDestination.image} 
                        alt={selectedDestination.name} 
                        className="w-full h-52 object-cover rounded-md"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">{selectedDestination.name}</h3>
                      <p className="text-gray-600 mb-4">{selectedDestination.location}</p>
                      
                      <p className="text-gray-700 mb-4">
                        {selectedDestination.description}
                      </p>
                      
                      {directions && (
                        <div className="text-sm text-gray-600">
                          <div className="font-medium">Estimated journey:</div>
                          <div>Distance: {directions.routes[0].legs[0].distance.text}</div>
                          <div>Duration: {directions.routes[0].legs[0].duration.text}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {travelDate && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-gray-700">
                        <span className="font-medium">Travel Date:</span> {new Date(travelDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-gray-700">
                        <span className="font-medium">Number of Travelers:</span> {travelers}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TripPlanner; 