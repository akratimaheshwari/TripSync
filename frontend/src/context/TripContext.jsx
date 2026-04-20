import { createContext, useContext, useState, useEffect } from "react";
import { getTrips, createTrip, deleteTrip } from "../services/tripService";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  //  Fetch trips from backend
  const fetchTrips = async () => {
    try {
      const { data } = await getTrips();
      setTrips(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  //  Create trip
  const addTrip = async (tripData) => {
    const { data } = await createTrip(tripData);
    setTrips((prev) => [...prev, data]);
  };

  //  Delete trip
  const removeTrip = async (id) => {
    await deleteTrip(id);
    setTrips((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        fetchTrips,
        addTrip,
        deleteTrip: removeTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => useContext(TripContext);