import { useEffect, useState } from "react";
import API from "../../api/axios";
import ReviewForm from "../../components/ReviewFrom";

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        `/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking cancelled");
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">My Bookings</h1>

      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-slate-800 p-6 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-3">
                {booking.providerId?.name}
              </h2>

              <p className="mb-2">Address: {booking.address}</p>
              <p className="mb-2">Date: {booking.bookingDate}</p>
              <p className="mb-2">Time: {booking.bookingTime}</p>
              <p className="mb-2">Price: ₹{booking.estimatedPrice}</p>

              {/* Status */}
              <div className="mb-4">
                <span className="px-4 py-2 rounded-full bg-blue-600">
                  {booking.status}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex gap-4 text-sm mb-6">
                <span>Requested</span>
                <span>→</span>
                <span>Confirmed</span>
                <span>→</span>
                <span>In-progress</span>
                <span>→</span>
                <span>Completed</span>
              </div>

              {/* Cancel button */}
              {(booking.status === "requested" ||
                booking.status === "confirmed") && (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Cancel Booking
                </button>
              )}

              {/* Review form */}
              {booking.status === "completed" && (
                <ReviewForm bookingId={booking._id} />
              )}
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
