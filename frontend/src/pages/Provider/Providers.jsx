import { useEffect, useState } from "react";

import API from "../../api/axios";

import ProviderCard from "../../components/ProviderCard";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("");

  const [profession, setProfession] = useState("");

  // FETCH PROVIDERS
  const fetchProviders = async () => {
    try {
      const res = await API.get(
        `/provider/search?city=${city}&profession=${profession}`
      );
      setProviders(res.data.providers);
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

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Service Providers</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-slate-800 p-3 rounded  w-[250px]"/>

        <input
          type="text"
          placeholder="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className=" bg-slate-800 p-3 roundedw-[250px]"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 px-6 rounded text-white hover:bg-blue-700 transition" >
          Search
        </button>
      </div>

      {/* PROVIDERS GRID */}
      <div
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {providers.length > 0 ? (
          providers.map((provider) => (
            <ProviderCard key={provider._id} provider={provider} />
          ))
        ) : (
          <p>No providers found</p>
        )}
      </div>
    </div>
  );
};

export default Providers;
