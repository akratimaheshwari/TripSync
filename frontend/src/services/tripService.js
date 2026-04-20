import api from "./api";

export const getTrips = () => api.get("/trips");

export const createTrip = (data) =>
  api.post("/trips/create", data);

export const deleteTrip = (id) =>
  api.delete(`/trips/${id}`);

export const joinTrip = (joinCode) =>
  api.post("/trips/join", { joinCode });