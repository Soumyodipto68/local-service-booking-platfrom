import {useEffect,useState} from "react";
import {useParams,Link} from "react-router-dom";
import API from "../../api/axios";

const ProviderDetails = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProvider =
    async () => {
      try {
        const res =await API.get(`/provider/${id}`);
        setProvider(res.data.provider);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProvider();
  }, []);
  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }
  return (
    <div className="p-10">
      <div className=" bg-slate-800 p-8 rounded-2xl max-w-3xl " >
        <h1 className=" text-4xl font-boldmb-4">{provider.userId?.name}</h1>
        <p className="mb-3">
          Profession:
          {" "}
          {provider.profession}
        </p>
        <p className="mb-3">
          Experience:
          {" "}
          {provider.experience}
          {" "}
          years
        </p>
        <p className="mb-3">
          Hourly Rate:
          ₹{provider.hourlyRate}
        </p>
        <p className="mb-3">
          City:
          {" "}
          {provider.userId?.city}
        </p>
        <p className="mb-3">
          Bio:
          {" "}
          {provider.bio}
        </p>
        <p className="mb-6">
          Status:
          {" "}
          {
            provider.availability
            ? "Available"
            : "Unavailable"
          }

        </p>
        <Link
          to={`/book/${provider.userId._id}`}
          className="bg-blue-600 px-6 py-3 rounded-lg">
          Book Now
        </Link>
      </div>
    </div>
  );

};

export default ProviderDetails;