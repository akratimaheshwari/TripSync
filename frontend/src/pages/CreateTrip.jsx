import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useTrips } from '../context/TripContext';
import { MapPin, Calendar } from 'lucide-react';
import { Toast } from '../components/Toast';

export const CreateTrip = () => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTrip({
        name: title, // 🔥 important
        destination,
        startDate,
        endDate,
        coverImage:
          'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      });

      setShowToast(true);

      setTimeout(() => {
        navigate('/trips');
      }, 1000);

    } catch (err) {
      console.error("Create Trip Error:", err);
    }
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create New Trip
          </h1>
          <p className="text-gray-600">Plan your next adventure</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              type="text"
              label="Trip Title"
              placeholder="Summer in Goa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              type="text"
              label="Destination"
              placeholder="Goa, India"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              icon={<MapPin className="w-5 h-5" />}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                icon={<Calendar className="w-5 h-5" />}
                required
              />

              <Input
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                icon={<Calendar className="w-5 h-5" />}
                required
              />
            </div>

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