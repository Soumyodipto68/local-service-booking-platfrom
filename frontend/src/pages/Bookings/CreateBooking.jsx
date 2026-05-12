import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const CreateBooking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  // Submit booking
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
      console.error(error.response?.data);
      alert(error?.response?.data?.message || "Booking creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-8">Create Booking</h1>

        {/* Category */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        />

        {/* Area */}
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        />

        {/* Date */}
        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        />

        {/* Time */}
        <input
          type="text"
          name="bookingTime"
          placeholder="Booking Time"
          value={formData.bookingTime}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        />

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Issue Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
        />

        {/* Price */}
        <input
          type="number"
          name="estimatedPrice"
          placeholder="Estimated Price"
          value={formData.estimatedPrice}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-800"
          required
        />

        {/* Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-6 w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-semibold"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
