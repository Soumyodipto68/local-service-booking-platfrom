import {useEffect,useState,} from "react";
import socket from "../../socket";
import {
  CheckCircle,
  Clock3,
  MapPin,
  User,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import API from "../../api/axios";
import CompleteWorkForm from "../../components/CompleteWorkForm";

const ProviderDashboard = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [availability, setAvailability] =
    useState(true);

  // FETCH BOOKINGS
  const fetchBookings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/bookings/provider",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setBookings(
          res.data.bookings
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchBookings();

  }, []);

  // UPDATE STATUS
  const updateStatus =
    async (
      bookingId,
      action
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.patch(
          `/bookings/${bookingId}/${action}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchBookings();

      } catch (error) {

        console.log(error);

      }

    };

useEffect(() => {

  socket.on(

    "new-booking",

    (data) => {

      alert(data.message);

      fetchBookings();

    }

  );


  return () => {

    socket.off(
      "new-booking"
    );

  };

}, []);    

  // TOGGLE AVAILABILITY
  const toggleAvailability =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.patch(
            "/provider/availability",
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAvailability(
          res.data.availability
        );

      } catch (error) {

        console.log(error);

      }

    };

  // STATUS COLORS
  const getStatusColor = (
    status
  ) => {

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

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <p className="text-slate-400 text-lg">
          Loading dashboard...
        </p>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white px-6 md:px-10 pt-32 pb-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Provider Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Manage your bookings
            and service requests
          </p>

        </div>

        {/* AVAILABILITY */}
        <button
          onClick={
            toggleAvailability
          }
          className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
            availability
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-red-500/20 text-red-400 border-red-500/30"
          }`}
        >

          <div className="flex items-center gap-2">

            <ShieldCheck size={18} />

            {
              availability
                ? "Available for Work"
                : "Unavailable"
            }

          </div>

        </button>

      </div>

      {/* BOOKINGS */}
      {
        bookings.length > 0 ? (

          <div className="space-y-8">

            {
              bookings.map(
                (booking) => (

                  <div
                    key={booking._id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl"
                  >

                    {/* TOP */}
                    <div className="p-8 border-b border-slate-800">

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* CUSTOMER */}
                        <div>

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-bold">

                              {
                                booking
                                  ?.customerId
                                  ?.name
                                  ?.charAt(
                                    0
                                  )
                              }

                            </div>

                            <div>

                              <h2 className="text-2xl font-bold">

                                {
                                  booking
                                    ?.customerId
                                    ?.name
                                }

                              </h2>

                              <p className="text-slate-400">

                                {
                                  booking
                                    ?.customerId
                                    ?.email
                                }

                              </p>

                            </div>

                          </div>

                          {/* DETAILS */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex items-center gap-3 text-slate-300">

                              <MapPin
                                size={18}
                              />

                              {
                                booking.address
                              }

                            </div>

                            <div className="flex items-center gap-3 text-slate-300">

                              <CalendarDays
                                size={18}
                              />

                              {
                                booking.bookingDate
                              }

                            </div>

                            <div className="flex items-center gap-3 text-slate-300">

                              <Clock3
                                size={18}
                              />

                              {
                                booking.bookingTime
                              }

                            </div>

                            <div className="flex items-center gap-3 text-slate-300">

                              <IndianRupee
                                size={18}
                              />

                              ₹
                              {
                                booking.estimatedPrice
                              }

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

                            {
                              booking.status
                            }

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* BODY */}
                    <div className="p-8">

                      {/* NOTES */}
                      <div className="mb-6">

                        <h3 className="text-lg font-bold mb-3">
                          Customer Notes
                        </h3>

                        <p className="text-slate-300 leading-7 bg-slate-800 rounded-2xl p-5">

                          {
                            booking.notes ||
                            "No notes added."
                          }

                        </p>

                      </div>

                      {/* IMAGE */}
                      {
                        booking.issueImage && (

                          <div className="mb-6">

                            <h3 className="text-lg font-bold mb-4">
                              Issue Image
                            </h3>

                            <img
                              src={`http://localhost:5000/${booking.issueImage}`}
                              alt="Issue"
                              className="w-full max-w-sm h-64 object-cover rounded-2xl border border-slate-700"
                            />

                          </div>

                        )
                      }

                      {/* ACTIONS */}
                      <div className="flex flex-wrap gap-4 mt-8">

                        {
                          booking.status ===
                          "requested" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(
                                    booking._id,
                                    "accept"
                                  )
                                }
                                className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl font-semibold"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() =>
                                  updateStatus(
                                    booking._id,
                                    "reject"
                                  )
                                }
                                className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold"
                              >
                                Reject
                              </button>
                            </>
                          )
                        }

                        {
                          booking.status ===
                          "confirmed" && (
                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "start"
                                )
                              }
                              className="bg-yellow-600 hover:bg-yellow-700 transition px-6 py-3 rounded-xl font-semibold"
                            >
                              Start Work
                            </button>
                          )
                        }

                        {
                          booking.status ===
                          "in-progress" && (
                            <CompleteWorkForm
                              bookingId={
                                booking._id
                              }
                              refreshBookings={
                                fetchBookings
                              }
                            />
                          )
                        }

                        {
                          booking.status ===
                          "completed" && (
                            <div className="flex items-center gap-2 text-green-400 font-semibold">

                              <CheckCircle
                                size={20}
                              />

                              Work Completed

                            </div>
                          )
                        }

                      </div>

                    </div>

                  </div>

                )
              )
            }

          </div>

        ) : (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Bookings Yet
            </h2>

            <p className="text-slate-400 text-lg">
              Your incoming booking
              requests will appear here
            </p>

          </div>

        )
      }

    </div>

  );

};

export default ProviderDashboard;