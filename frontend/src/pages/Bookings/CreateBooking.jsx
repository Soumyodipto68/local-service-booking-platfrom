import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const CreateBooking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryId: "",
    address: "",
    city: "",
    area: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
    estimatedPrice: "",
  });

  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!providerId) {
        return alert("Provider ID not found");
      }

      const data = new FormData();
      data.append("providerId", providerId);

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("issueImage", image);
      }

      const token = localStorage.getItem("token");

      const res = await API.post("/bookings", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(res.data);

      alert("Booking created successfully");
      navigate("/customer/dashboard");
    } catch (error) {
     console.log(error.response.data);
      alert(error?.response?.data?.message || "Booking creation failed");
    }
  };
  console.log("providerId:", providerId);

  return (
    <div className="flex justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl w-[500px]"
      >
        <h1 className="text-3xl font-bold mb-6">Create Booking</h1>

        {/* CATEGORY ID */}
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* ADDRESS */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* CITY */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* AREA */}
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* BOOKING DATE */}
        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* BOOKING TIME */}
        <input
          type="text"
          name="bookingTime"
          placeholder="Booking Time"
          value={formData.bookingTime}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* NOTES */}
        <textarea
          name="notes"
          placeholder="Issue Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        {/* PRICE */}
        <input
          type="number"
          name="estimatedPrice"
          placeholder="Estimated Price"
          value={formData.estimatedPrice}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          required
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-6"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
