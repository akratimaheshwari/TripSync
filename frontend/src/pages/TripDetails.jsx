import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Tabs } from '../components/Tabs';
import { ProgressBar } from '../components/ProgressBar';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';
import api from '../services/api';

export const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  // 🔥 Fetch trip from backend
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/trips/${id}`);
        setTrip(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 📅 Duration calculation
  const duration =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate) - new Date(trip.startDate)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // 🔹 Overview Tab
  const overviewTab = (
    <div className="space-y-6">

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <p className="text-sm text-gray-600">Duration</p>
          <p className="text-lg font-semibold">{duration} days</p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Members</p>
          <p className="text-lg font-semibold">
            {trip.members?.length || 1}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Join Code</p>

          <p
            className="text-lg font-semibold text-blue-600 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(trip.joinCode);
              alert("Join code copied!");
            }}
          >
            {trip.joinCode}
          </p>
        </Card>

      </div>

      {/* 👥 Members Section */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Trip Members</h3>

        <div className="space-y-3">
          {trip.members?.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {member.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {member.email}
                  </p>
                </div>

              </div>

              {/* Admin Badge */}
              {member._id === trip.admin?._id && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 💰 Placeholder Budget */}
      <Card>
        <h3 className="mb-2 font-semibold">Budget (Coming Soon)</h3>
        <ProgressBar value={50} max={100} />
      </Card>

    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', content: overviewTab },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/trips')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trips
        </Button>

        {/* Hero Section */}
        <div className="relative mb-8">
          <img
            src={
              trip.coverImage ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            }
            alt={trip.destination}
            className="w-full h-64 object-cover rounded-xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />

          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold">{trip.name}</h1>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {trip.destination}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} />

      </div>
    </div>
  );
};