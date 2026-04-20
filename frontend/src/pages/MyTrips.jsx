import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { EmptyState } from "../components/EmptyState";
import { useTrips } from "../context/TripContext";
import { Plus, MapPin, Calendar, Trash2, Edit } from "lucide-react";

export const MyTrips = () => {
  const { trips, deleteTrip, fetchTrips } = useTrips();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const defaultImage =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  // 🔥 fetch trips on load
  useEffect(() => {
    fetchTrips();
  }, []);

  const filteredTrips = trips;

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
      await fetchTrips(); // 🔥 refresh after delete
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => fetchTrips()}>
              Refresh
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate("/trips/new")}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Create Trip
            </Button>
          </div>
        </div>

        {/* Filters (UI only for now) */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["all", "upcoming", "ongoing", "completed"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                filter === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 ? (
          <EmptyState
            icon={<MapPin className="w-16 h-16" />}
            title="No trips found"
            description="Start planning your next adventure!"
            actionLabel="Create Trip"
            onAction={() => navigate("/trips/new")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip._id}
                onClick={() => {
                  console.log("CLICK WORKING", trip._id);
                  navigate(`/trips/${trip._id}`);
                }}
                className="cursor-pointer"
              >
                <Card hover padding="none" className="overflow-hidden">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={trip.coverImage || defaultImage}
                      alt={trip.destination}
                      className="w-full h-48 object-cover"
                    />

                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-600">
                        Upcoming
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {trip.name}
                    </h3>

                    <div className="space-y-2 mb-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {trip.destination}
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {trip.startDate
                          ? new Date(trip.startDate).toLocaleDateString()
                          : "N/A"}{" "}
                        -{" "}
                        {trip.endDate
                          ? new Date(trip.endDate).toLocaleDateString()
                          : "N/A"}
                      </div>

                      <div>👥 {trip.members?.length || 1} members</div>

                      <div className="text-xs text-gray-500">
                        Code: {trip.joinCode}
                      </div>
                    </div>

                    <ProgressBar value={50} max={100} />

                    {/* Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/trips/${trip._id}/edit`);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => handleDelete(trip._id, e)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
