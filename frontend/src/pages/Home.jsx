import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Plane, Calendar, DollarSign, Users, MapPin, Clock, TrendingUp } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const featuredDestinations = [
    { id: 1, name: 'Santorini, Greece', image: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=800', price: 'From $2,500', days: '7 days' },
    { id: 2, name: 'Tokyo, Japan', image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800', price: 'From $3,800', days: '10 days' },
    { id: 3, name: 'Bali, Indonesia', image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800', price: 'From $1,800', days: '6 days' },
    { id: 4, name: 'Paris, France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', price: 'From $3,200', days: '5 days' },
  ];

  const features = [
    { icon: <Calendar className="w-8 h-8" />, title: 'Plan', description: 'Create detailed itineraries with day-by-day activities and schedules' },
    { icon: <Users className="w-8 h-8" />, title: 'Sync', description: 'Collaborate with travel companions and keep everyone on the same page' },
    { icon: <Plane className="w-8 h-8" />, title: 'Travel', description: 'Access your plans anywhere, anytime with our mobile-friendly platform' },
  ];

  const benefits = [
    { icon: <Clock className="w-6 h-6" />, title: 'Save Time', description: 'Plan trips 10x faster with smart templates and suggestions' },
    { icon: <DollarSign className="w-6 h-6" />, title: 'Budget Control', description: 'Track expenses in real-time and never overspend' },
    { icon: <Users className="w-6 h-6" />, title: 'Group Sync', description: 'Coordinate group trips effortlessly with shared itineraries' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Smart Insights', description: 'Get AI-powered recommendations for the best travel experience' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-600 via-teal-500 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Plan. Sync. Travel Smarter.</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-50">The all-in-one platform for effortless travel planning. Organize itineraries, manage budgets, and collaborate with friends.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" onClick={() => navigate('/register')} className="shadow-xl">Create Your First Trip</Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/explore')} className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">Explore Destinations</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">Featured Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {featuredDestinations.map(dest => (
              <Card key={dest.id} hover padding="none" className="overflow-hidden cursor-pointer">
                <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{dest.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-600">{dest.price}</span>
                    <span className="text-sm text-gray-600">{dest.days}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">How TripSync Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Next Adventure?</h2>
          <p className="text-xl mb-8 text-blue-50">Join thousands of travelers who trust TripSync for their journey planning</p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/register')} className="shadow-xl">Get Started Free</Button>
        </div>
      </section>
    </div>
  );
};