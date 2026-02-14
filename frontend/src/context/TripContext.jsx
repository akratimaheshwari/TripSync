import { createContext, useContext, useState } from 'react';

const TripContext = createContext(undefined);

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([
    {
      id: '1',
      title: 'Summer in Santorini',
      destination: 'Santorini, Greece',
      startDate: '2026-06-15',
      endDate: '2026-06-22',
      budget: 3500,
      spent: 1200,
      image: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'upcoming',
      members: [
        {
          id: '1',
          name: 'Alex Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'admin',
        },
      ],
      itinerary: [
        {
          day: 1,
          date: '2026-06-15',
          activities: [
            {
              id: 'a1',
              time: '10:00 AM',
              title: 'Arrival & Check-in',
              description: 'Hotel Paradiso',
              category: 'stay',
              cost: 250,
            },
            {
              id: 'a2',
              time: '2:00 PM',
              title: 'Lunch at Sunset Taverna',
              description: 'Local Greek cuisine',
              category: 'food',
              cost: 45,
            },
          ],
        },
      ],
      expenses: [
        {
          id: 'e1',
          category: 'Transport',
          amount: 450,
          description: 'Flight tickets',
          date: '2026-06-15',
        },
        {
          id: 'e2',
          category: 'Stay',
          amount: 750,
          description: 'Hotel booking',
          date: '2026-06-15',
        },
      ],
    },
    {
      id: '2',
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      startDate: '2026-08-10',
      endDate: '2026-08-20',
      budget: 5000,
      spent: 500,
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'upcoming',
      members: [
        {
          id: '1',
          name: 'Alex Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'admin',
        },
      ],
      itinerary: [],
      expenses: [],
    },
  ]);

  const addTrip = (trip) => {
    const newTrip = { ...trip, id: Date.now().toString() };
    setTrips([...trips, newTrip]);
  };

  const updateTrip = (id, updatedTrip) => {
    setTrips(trips.map(trip => (trip.id === id ? { ...trip, ...updatedTrip } : trip)));
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const getTrip = (id) => {
    return trips.find(trip => trip.id === id);
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        getTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};