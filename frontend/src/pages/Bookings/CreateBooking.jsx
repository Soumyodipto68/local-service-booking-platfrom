import {useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import API from "../../api/axios";

const CreateBooking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState({
      categoryId: "",
      address: "",
      city: "",
      area: "",
      bookingDate: "",
      bookingTime: "",
      notes: "",
      estimatedPrice: ""
    });

  const [image, setImage] =useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };
  const handleSubmit =
    async (e) => {
      e.preventDefault();
      try {
        const data =
          new FormData();
        data.append(
          "providerId",
          providerId
        );
        Object.keys(formData)
        .forEach((key) => {
          data.append(
            key,
            formData[key]
          );
        });
        if (image) {
          data.append("issueImage",image);
        }
        const token =localStorage.getItem("token");
        const res = await API.post("/bookings",data,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );
        alert("Booking created");
        navigate("/customer/dashboard");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message );
      }
    };
  return (
    <div className="flex justify-center p-10"  >
      <form
        onSubmit={handleSubmit}
        className=" bg-slate-800 p-8 rounded-2xl w-[500px] "
      >

        <h1 className="text-3xl font-bold mb-6">  Create Booking </h1>
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <input
          type="text"
          name="area"
          placeholder="Area"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <input
          type="date"
          name="bookingDate"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <input
          type="text"
          name="bookingTime"
          placeholder="Booking Time"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <textarea
          name="notes"
          placeholder="Issue Notes"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        <input
          type="number"
          name="estimatedPrice"
          placeholder="Estimated Price"
          onChange={handleChange}
          className="
          w-full
          p-3
          mb-4
          rounded
          bg-slate-700
        "
        />


        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          className="
          mb-6
        "
        />


        <button
          className="
          w-full
          bg-blue-600
          p-3
          rounded-lg
        "
        >
          Create Booking
        </button>

      </form>

    </div>

  );

};

export default CreateBooking;