import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock3,
  BadgeCheck,
  User,
} from "lucide-react";

import API from "../../api/axios";

const ProviderDetails = () => {

  const { id } = useParams();

  const [provider, setProvider] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH PROVIDER
  const fetchProvider =
    async () => {

      try {

        const res =
          await API.get(
            `/provider/${id}`
          );

        setProvider(
          res.data.provider
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchProvider();

  }, []);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <p className="text-slate-400 text-lg">
          Loading provider...
        </p>

      </div>

    );

  }

  // NO PROVIDER
  if (!provider) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <p className="text-red-400 text-lg">
          Provider not found
        </p>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white px-6 md:px-10 pt-32 pb-10">

      <div className="max-w-5xl mx-auto">

        {/* CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

          {/* TOP SECTION */}
          <div className="p-8 md:p-10 border-b border-slate-800">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              {/* LEFT */}
              <div className="flex items-center gap-5">

                {/* AVATAR */}
                <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-4xl font-bold">

                  {
                    provider?.userId?.name
                      ?.charAt(0)
                  }

                </div>

                {/* INFO */}
                <div>

                  <h1 className="text-4xl font-extrabold mb-3">

                    {
                      provider?.userId
                        ?.name
                    }

                  </h1>

                  <div className="flex flex-wrap gap-3">

                    <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-slate-300">

                      <Briefcase size={18} />

                      {
                        provider?.profession
                      }

                    </div>

                    <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-slate-300">

                      <MapPin size={18} />

                      {
                        provider?.userId
                          ?.city
                      }

                    </div>

                  </div>

                </div>

              </div>

              {/* STATUS */}
              <div>

                {
                  provider?.availability ? (

                    <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">

                      <BadgeCheck size={18} />

                      Available

                    </div>

                  ) : (

                    <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-3 rounded-2xl font-semibold">

                      Unavailable

                    </div>

                  )
                }

              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* EXPERIENCE */}
            <div className="bg-slate-800 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <Clock3
                  size={20}
                  className="text-blue-400"
                />

                <h3 className="text-xl font-bold">
                  Experience
                </h3>

              </div>

              <p className="text-slate-300 text-lg">

                {
                  provider?.experience
                }{" "}
                years

              </p>

            </div>

            {/* RATE */}
            <div className="bg-slate-800 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <IndianRupee
                  size={20}
                  className="text-blue-400"
                />

                <h3 className="text-xl font-bold">
                  Hourly Rate
                </h3>

              </div>

              <p className="text-slate-300 text-lg">

                ₹
                {
                  provider?.hourlyRate
                }/hr

              </p>

            </div>

            {/* CUSTOMER INFO */}
            <div className="bg-slate-800 rounded-2xl p-6 md:col-span-2">

              <div className="flex items-center gap-3 mb-3">

                <User
                  size={20}
                  className="text-blue-400"
                />

                <h3 className="text-xl font-bold">
                  About Provider
                </h3>

              </div>

              <p className="text-slate-300 leading-7">

                {
                  provider?.bio ||
                  "No bio added yet."
                }

              </p>

            </div>

          </div>

          {/* FOOTER */}
          <div className="p-8 border-t border-slate-800 flex flex-col md:flex-row gap-4">

            <Link
              to={`/book/${provider?._id}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-center py-4 rounded-2xl font-semibold text-lg"
            >
              Book Now
            </Link>

            <button
              className="flex-1 bg-slate-800 hover:bg-slate-700 transition-all duration-300 py-4 rounded-2xl font-semibold text-lg"
            >
              Contact Provider
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProviderDetails;