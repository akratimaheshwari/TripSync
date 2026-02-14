import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyState } from '../components/EmptyState';
import { useTrips } from '../context/TripContext';
import { Plus, MapPin, Calendar, Users, Trash2, Edit } from 'lucide-react';

export const MyTrips = () => {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredTrips = filter === 'all' ? trips : trips.filter(trip => trip.status === filter);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
          <Button variant="primary" onClick={() => navigate('/trips/new')} className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Create New Trip
          </Button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'upcoming', 'ongoing', 'completed'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                filter === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {filteredTrips.length === 0 ? (
          <EmptyState icon={<MapPin className="w-16 h-16" />} title="No trips found" description="Start planning your next adventure!" actionLabel="Create Trip" onAction={() => navigate('/trips/new')} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <Card key={trip.id} hover padding="none" className="overflow-hidden cursor-pointer" onClick={() => navigate(`/trips/${trip.id}`)}>
                <div className="relative">
                  <img src={trip.image} alt={trip.destination} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${trip.status === 'upcoming' ? 'bg-blue-600' : trip.status === 'ongoing' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trip.title}</h3>
                  <div className="space-y-2 mb-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{trip.destination}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</div>
                  </div>
                  <ProgressBar value={trip.spent} max={trip.budget} color={trip.spent / trip.budget > 0.8 ? 'red' : 'green'} />
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" fullWidth onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/edit`); }}><Edit className="w-4 h-4 mr-2" />Edit</Button>
                    <Button variant="danger" size="sm" onClick={(e) => handleDelete(trip.id, e)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};