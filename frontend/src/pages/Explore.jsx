import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MapPin, Heart, DollarSign, Calendar } from 'lucide-react';

export const Explore = () => {
  const [filter, setFilter] = useState('all');

  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 2500,
      duration: '7 days',
      type: 'luxury',
      description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 3800,
      duration: '10 days',
      type: 'adventure',
      description: 'Ancient temples meet modern technology in this vibrant metropolis',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 1800,
      duration: '6 days',
      type: 'budget',
      description: 'Tropical paradise with beaches, temples, and rich culture',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Paris, France',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 3200,
      duration: '5 days',
      type: 'luxury',
      description: 'The city of lights, love, and unmatched elegance',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Iceland',
      image: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 2800,
      duration: '8 days',
      type: 'adventure',
      description: 'Land of fire and ice with breathtaking natural wonders',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'Vietnam',
      image: 'https://images.pexels.com/photos/2868245/pexels-photo-2868245.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 1500,
      duration: '9 days',
      type: 'budget',
      description: 'Rich history, delicious cuisine, and stunning landscapes',
      rating: 4.6,
    },
  ];

  const filteredDestinations = filter === 'all'
    ? destinations
    : destinations.filter(dest => dest.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Destinations</h1>
          <p className="text-gray-600">Discover amazing places for your next adventure</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'budget', 'luxury', 'adventure'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type === 'all' ? 'All Destinations' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <Card key={destination.id} hover padding="none" className="overflow-hidden">
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-56 object-cover"
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-all">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-800">
                    {destination.type.charAt(0).toUpperCase() + destination.type.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{destination.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold text-gray-700">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>From ${destination.price.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="primary" size="sm" fullWidth>
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};