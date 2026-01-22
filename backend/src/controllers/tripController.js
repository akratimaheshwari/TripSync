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
      admin: req.user,
      members: [req.user],
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

    if (!trip.members.includes(req.user)) {
      trip.members.push(req.user);
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
