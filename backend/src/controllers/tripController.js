import Trip from "../models/Trip.js";

// CREATE TRIP
export const createTrip = async (req, res) => {
  const { name, destination, startDate, endDate, coverImage, currency } = req.body;

  try {
    const joinCode = Math.random().toString(36).substring(2, 8);

    const trip = await Trip.create({
      name,
      destination,
      startDate,
      endDate,
      coverImage,
      currency,
      admin: req.user.id,
      members: [req.user.id],
      joinCode
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// JOIN TRIP
export const joinTrip = async (req, res) => {
  const { joinCode } = req.body;

  try {
    const trip = await Trip.findOne({ joinCode });

    if (!trip) {
      return res.status(404).json({ message: "Invalid join code" });
    }

    if (!trip.members.includes(req.user.id)) {
      trip.members.push(req.user.id);
      await trip.save();
    }

    res.json({ message: "Joined trip successfully", trip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET TRIP DETAILS
export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("admin", "name email")
      .populate("members", "name email");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      members: req.user.id
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    // find trip
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    //  only admin can delete
    if (trip.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // delete trip
    await Trip.findByIdAndDelete(tripId);

    res.json({ message: "Trip deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};