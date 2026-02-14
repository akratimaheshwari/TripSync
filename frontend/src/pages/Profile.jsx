import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { User, Mail, MapPin, Calendar, Award } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const { trips } = useTrips();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const stats = [
    {
      label: 'Total Trips',
      value: trips.length,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      label: 'Countries Visited',
      value: new Set(trips.map(t => t.destination.split(',')[1]?.trim())).size,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: 'Total Budget',
      value: `$${trips.reduce((sum, t) => sum + t.budget, 0).toLocaleString()}`,
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.name}</h1>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-5 h-5" />}
                  />
                  <div className="flex gap-2">
                    <Button variant="primary" onClick={() => setIsEditing(false)}>
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Travel History</h2>
          <div className="space-y-4">
            {trips.map(trip => (
              <div key={trip.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  trip.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                  trip.status === 'ongoing' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {trip.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};