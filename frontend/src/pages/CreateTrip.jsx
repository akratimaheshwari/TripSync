import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { Toast } from '../components/Toast';

export const CreateTrip = () => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { addTrip } = useTrips();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrip = {
      title,
      destination,
      startDate,
      endDate,
      budget: parseFloat(budget),
      spent: 0,
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'upcoming',
      members: [
        {
          id: user?.id || '1',
          name: user?.name || 'User',
          avatar: user?.avatar || '',
          role: 'admin',
        },
      ],
      itinerary: [],
      expenses: [],
    };

    addTrip(newTrip);
    setShowToast(true);
    setTimeout(() => {
      navigate('/trips');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {showToast && (
        <Toast
          type="success"
          message="Trip created successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Trip</h1>
          <p className="text-gray-600">Plan your next adventure</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Trip Title"
              placeholder="Summer in Santorini"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <Input
              type="text"
              label="Destination"
              placeholder="Santorini, Greece"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              icon={<MapPin className="w-5 h-5" />}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Start Date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                icon={<Calendar className="w-5 h-5" />}
                required
              />
              <Input
                type="date"
                label="End Date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                icon={<Calendar className="w-5 h-5" />}
                required
              />
            </div>

            <Input
              type="number"
              label="Budget ($)"
              placeholder="3500"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              icon={<DollarSign className="w-5 h-5" />}
              required
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => navigate('/trips')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
              >
                Create Trip
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};