import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, DollarSign, Clock, TrendingUp, Plus, Users } from 'lucide-react';

export const Dashboard = () => {
  const { trips } = useTrips();
  const { user } = useAuth();
  const navigate = useNavigate();

  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming');
  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0);
  const totalSpent = trips.reduce((sum, trip) => sum + trip.spent, 0);

  const getDaysUntilNext = () => {
    if (upcomingTrips.length === 0) return 0;
    const nextTrip = upcomingTrips[0];
    const today = new Date();
    const tripDate = new Date(nextTrip.startDate);
    const diff = Math.ceil((tripDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const recentActivities = [
    { id: 1, type: 'created', trip: 'Summer in Santorini', time: '2 hours ago' },
    { id: 2, type: 'budget', trip: 'Tokyo Adventure', time: '1 day ago' },
    { id: 3, type: 'member', trip: 'Summer in Santorini', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Here's an overview of your travel plans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-teal-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8" />
              <span className="text-3xl font-bold">{upcomingTrips.length}</span>
            </div>
            <p className="text-blue-100">Upcoming Trips</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <span className="text-3xl font-bold">${totalBudget.toLocaleString()}</span>
            </div>
            <p className="text-purple-100">Total Budget</p>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8" />
              <span className="text-3xl font-bold">{getDaysUntilNext()}</span>
            </div>
            <p className="text-orange-100">Days Until Next Trip</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-3xl font-bold">${totalSpent.toLocaleString()}</span>
            </div>
            <p className="text-green-100">Total Spent</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Trips</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/trips')}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingTrips.slice(0, 3).map(trip => (
                <div
                  key={trip.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                >
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{trip.title}</h3>
                    <p className="text-sm text-gray-600">{trip.destination}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">${trip.budget}</p>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                </div>
              ))}
              {upcomingTrips.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No upcoming trips yet</p>
                  <Button variant="primary" onClick={() => navigate('/trips/new')}>
                    Create Your First Trip
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-800">
                      {activity.type === 'created' && 'Created trip: '}
                      {activity.type === 'budget' && 'Updated budget for: '}
                      {activity.type === 'member' && 'Added member to: '}
                      <span className="font-semibold">{activity.trip}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/trips/new')}
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-800">Create New Trip</span>
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-800">Explore Destinations</span>
              </button>
              <button
                onClick={() => navigate('/trips')}
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-gray-800">Manage Trips</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};