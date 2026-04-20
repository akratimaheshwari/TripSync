import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Toast } from "../components/Toast";
import { joinTrip } from "../services/tripService";
import { useTrips } from "../context/TripContext";

export const JoinTrip = () => {
  const [code, setCode] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { fetchTrips } = useTrips();

  const handleJoin = async (e) => {
    e.preventDefault();

    try {
      await joinTrip(code);

      setShowToast(true);

      // 🔥 refresh trips after joining
      await fetchTrips();

      setTimeout(() => {
        navigate("/trips");
      }, 1000);

    } catch (err) {
      alert("Invalid join code ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      {showToast && (
        <Toast
          type="success"
          message="Joined trip successfully!"
          onClose={() => setShowToast(false)}
        />
      )}

      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Join a Trip
        </h2>

        <form onSubmit={handleJoin} className="space-y-4">

          <Input
            type="text"
            label="Enter Join Code"
            placeholder="e.g. ab12cd"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <Button type="submit" fullWidth>
            Join Trip
          </Button>

        </form>
      </Card>
    </div>
  );
};