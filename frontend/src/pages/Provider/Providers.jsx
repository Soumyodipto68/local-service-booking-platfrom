import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
} from "lucide-react";

import API from "../../api/axios";
import ProviderCard from "../../components/ProviderCard";

const Providers = () => {

  const [providers, setProviders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [city, setCity] =
    useState("");

  const [profession, setProfession] =
    useState("");

  // FETCH PROVIDERS
  const fetchProviders = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/provider/search?city=${city}&profession=${profession}`
      );

      setProviders(
        res.data.providers
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProviders();

  }, []);

  const handleSearch = () => {

    fetchProviders();

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white px-6 md:px-10 pt-32 pb-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Service Providers
        </h1>

        <p className="text-slate-400 text-lg">
          Find trusted professionals
          near you
        </p>

      </div>

      {/* FILTERS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* CITY */}
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <MapPin
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by city"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
            />

          </div>

          {/* PROFESSION */}
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

            <Briefcase
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search profession"
              value={profession}
              onChange={(e) =>
                setProfession(
                  e.target.value
                )
              }
              className="w-full bg-transparent p-4 outline-none text-white placeholder:text-slate-500"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl font-semibold py-4"
          >

            <Search size={18} />

            Search

          </button>

        </div>

      </div>

      {/* LOADING */}
      {
        loading && (

          <div className="text-center py-20 text-slate-400 text-lg">
            Loading providers...
          </div>

        )
      }

      {/* PROVIDERS GRID */}
      {
        !loading && (

          providers.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {
                providers.map(
                  (provider) => (

                    <ProviderCard
                      key={provider._id}
                      provider={provider}
                    />

                  )
                )
              }

            </div>

          ) : (

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

              <h2 className="text-2xl font-bold mb-3">
                No Providers Found
              </h2>

              <p className="text-slate-400">
                Try changing your
                search filters
              </p>

            </div>

          )

        )
      }

    </div>

  );

};

export default Providers;