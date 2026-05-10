import {
  Link
} from "react-router-dom";

const ProviderCard = ({provider}) => {

  return (

    <div
      className="
      bg-slate-800
      p-6
      rounded-2xl
      shadow-lg
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-2
      "
      >
        {provider.userId?.name}
      </h2>


      <p className="mb-2">
        Profession:
        {" "}
        {provider.profession}
      </p>


      <p className="mb-2">
        Experience:
        {" "}
        {provider.experience}
        {" "}
        years
      </p>


      <p className="mb-2">
        Rate:
        ₹{provider.hourlyRate}
      </p>


      <p className="mb-2">
        City:
        {" "}
        {provider.userId?.city}
      </p>


      <p
        className="
        mb-4
      "
      >
        Status:
        {" "}

        {
          provider.availability
          ? "Available"
          : "Unavailable"
        }
      </p>


      <Link
        to={`/providers/${provider._id}`}
        className="
        inline-block
        bg-blue-600
        px-4
        py-2
        rounded-lg
      "
      >
        View Details
      </Link>

    </div>

  );

};

export default ProviderCard;