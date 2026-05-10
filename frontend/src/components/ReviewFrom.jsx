import { useState } from "react";
import API from "../api/axios";

const ReviewForm = ({ bookingId }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/reviews",
        { bookingId, rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-slate-700 p-4 rounded-xl"
    >
      <h3 className="text-xl mb-4">Leave Review</h3>

      {/* Rating Select */}
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="bg-slate-800 p-2 rounded mb-4 w-full"
      >
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>

      {/* Review Textarea */}
      <textarea
        placeholder="Write review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-3 rounded bg-slate-800 mb-4"
      />

      {/* Submit Button */}
      <button className="bg-blue-600 px-4 py-2 rounded-lg">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
