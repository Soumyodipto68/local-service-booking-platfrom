import { useEffect, useState } from "react";
import API from "../../api/axios";
import CompleteWorkForm from "../../components/CompleteWorkForm";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(true);

  // Fetch provider bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/bookings/provider", {
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

  // Update booking status
  const updateStatus = async (bookingId, action) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/bookings/${bookingId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle provider availability
  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.patch("/provider/toggle-availability", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailability(res.data.availability);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Provider Dashboard</h1>
        <button
          onClick={toggleAvailability}
          className={`px-6 py-3 rounded-xl ${
            availability ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {availability ? "Available" : "Unavailable"}
        </button>
      </div>

      {/* Bookings */}
      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">
                {booking.customerId?.name}
              </h2>

              <p className="mb-2">Address: {booking.address}</p>
              <p className="mb-2">Date: {booking.bookingDate}</p>
              <p className="mb-2">Notes: {booking.notes}</p>

              <p className="mb-4">
                Status:{" "}
                <span className="bg-blue-600 px-3 py-1 rounded-full">
                  {booking.status}
                </span>
              </p>

              {/* Issue Image */}
              {booking.issueImage && (
                <img
                  src={`http://localhost:5000/${booking.issueImage}`}
                  alt="Issue"
                  className="w-40 h-40 object-cover rounded-xl mb-4"
                />
              )}

              {/* Actions */}
              <div className="flex gap-4 flex-wrap mt-6">
                {booking.status === "requested" && (
                  <>
                    <button
                      onClick={() => updateStatus(booking._id, "accept")}
                      className="bg-green-600 px-4 py-2 rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(booking._id, "reject")}
                      className="bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => updateStatus(booking._id, "start")}
                    className="bg-yellow-600 px-4 py-2 rounded-lg"
                  >
                    Start Work
                  </button>
                )}

                {booking.status === "in-progress" && (
                  <CompleteWorkForm
                    bookingId={booking._id}
                    refreshBookings={fetchBookings}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
