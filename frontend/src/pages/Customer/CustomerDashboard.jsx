import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  IndianRupee,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

import API from "../../api/axios";
import ReviewForm from "../../components/ReviewFrom";

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  // CANCEL BOOKING
  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  // STATUS COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "requested":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";

      case "confirmed":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

      case "in-progress":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";

      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";

      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";

      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-lg">
          <Loader2 size={22} className="animate-spin" />
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 md:px-10 pt-32 pb-10">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          My Bookings
        </h1>

        <p className="text-slate-400 text-lg">
          Track all your service requests in one place
        </p>
      </div>

      {/* BOOKINGS */}
      {bookings.length > 0 ? (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl"
            >
              {/* TOP */}
              <div className="p-8 border-b border-slate-800">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* PROVIDER */}
                  <div>
                    <h2 className="text-3xl font-bold mb-3">
                      {booking?.providerId?.name}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                      <div className="flex items-center gap-3">
                        <MapPin size={18} />
                        {booking.address}
                      </div>

                      <div className="flex items-center gap-3">
                        <CalendarDays size={18} />
                        {booking.bookingDate}
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock3 size={18} />
                        {booking.bookingTime}
                      </div>

                      <div className="flex items-center gap-3">
                        <IndianRupee size={18} />₹
                        {booking.estimatedPrice}
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      className={`px-5 py-3 rounded-2xl border text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* BODY */}
              <div className="p-8">
                {/* NOTES */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3">
                    Service Notes
                  </h3>

                  <div className="bg-slate-800 rounded-2xl p-5 text-slate-300 leading-7">
                    {booking.notes || "No notes added."}
                  </div>
                </div>

                {/* TIMELINE */}
                {/*
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">
                    Booking Progress
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl">
                      Requested
                    </div>

                    <span className="text-slate-500">→</span>

                    <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl">
                      Confirmed
                    </div>

                    <span className="text-slate-500">→</span>

                    <div className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-xl">
                      In Progress
                    </div>

                    <span className="text-slate-500">→</span>

                    <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
                      Completed
                    </div>
                  </div>
                </div>
                */}

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-4">
                  {(booking.status === "requested" ||
                    booking.status === "confirmed") && (
                    <button
                      onClick={() =>
                        cancelBooking(booking._id)
                      }
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold"
                    >
                      <XCircle size={18} />
                      Cancel Booking
                    </button>
                  )}

                  {booking.status === "completed" && (
                    <div className="w-full mt-4">
                      <div className="flex items-center gap-2 text-green-400 font-semibold mb-5">
                        <CheckCircle size={20} />
                        Service Completed
                      </div>

                      <ReviewForm
                        bookingId={booking._id}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            No Bookings Found
          </h2>

          <p className="text-slate-400 text-lg">
            Your service bookings will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;