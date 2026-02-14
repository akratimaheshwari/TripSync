import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Tabs } from '../components/Tabs';
import { Model } from '../components/Model';
import { Input } from '../components/Input';
import { ProgressBar } from '../components/ProgressBar';
import { useTrips } from '../context/TripContext';
import { MapPin, Calendar, DollarSign, Users, Plus, Plane, Hotel, Utensils, Activity, ArrowLeft } from 'lucide-react';

export const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip } = useTrips();
  const trip = getTrip(id || '');

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip not found</h2>
          <Button onClick={() => navigate('/trips')}>Back to My Trips</Button>
        </div>
      </div>
    );
  }

  const overviewTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-lg font-semibold text-gray-800">
                {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              <p className="text-lg font-semibold text-gray-800">${trip.budget.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Members</p>
              <p className="text-lg font-semibold text-gray-800">{trip.members.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Budget Overview</h3>
        <ProgressBar
          value={trip.spent}
          max={trip.budget}
          label={`$${trip.spent.toLocaleString()} / $${trip.budget.toLocaleString()}`}
          color={trip.spent / trip.budget > 0.8 ? 'red' : 'green'}
          size="lg"
        />
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Trip Members</h3>
          <Button variant="outline" size="sm" onClick={() => setShowInviteModal(true)}>
            Invite
          </Button>
        </div>
        <div className="space-y-3">
          {trip.members.map(member => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                <p className="font-semibold text-gray-800">{member.name}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const itineraryTab = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Daily activities</p>
        <Button variant="primary" size="sm" onClick={() => setShowAddActivityModal(true)}>Add Activity</Button>
      </div>

      {trip.itinerary.map(day => (
        <Card key={day.day}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{day.day}</div>
            <h3 className="text-lg font-bold">Day {day.day}</h3>
          </div>
          <div className="space-y-3">
            {day.activities.map(activity => (
              <div key={activity.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-grow">
                  <h4 className="font-semibold">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className="font-semibold text-blue-600">${activity.cost}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', content: overviewTab, icon: <MapPin className="w-4 h-4" /> },
    { id: 'itinerary', label: 'Itinerary', content: itineraryTab, icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate('/trips')} className="mb-4 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Trips
        </Button>

        <div className="relative mb-8">
          <img src={trip.image} alt={trip.destination} className="w-full h-64 object-cover rounded-2xl shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {trip.destination}</p>
          </div>
        </div>

        <Tabs tabs={tabs} />
      </div>

      <Model isOpen={showAddExpenseModal} onClose={() => setShowAddExpenseModal(false)} title="Add Expense">
        <form className="space-y-4">
          <Input label="Description" placeholder="Flight tickets" />
          <Input label="Amount ($)" type="number" />
          <Button variant="primary" fullWidth>Add Expense</Button>
        </form>
      </Model>

      <Model isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite Members">
        <form className="space-y-4">
          <Input label="Email Address" type="email" placeholder="friend@email.com" />
          <Button variant="primary" fullWidth>Send Invitation</Button>
        </form>
      </Model>
    </div>
  );
};