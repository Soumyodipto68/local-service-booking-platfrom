import { useState } from "react";
import API from "../api/axios";

const CompleteWorkForm = ({ bookingId, refreshBookings }) => {
  const [workNotes, setWorkNotes] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("workNotes", workNotes);

      if (beforeImage) data.append("beforeImage", beforeImage);
      if (afterImage) data.append("afterImage", afterImage);

      await API.patch(`/bookings/${bookingId}/complete`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Work completed");
      setWorkNotes("");
      setBeforeImage(null);
      setAfterImage(null);
      refreshBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 p-4 rounded-xl w-full"
    >
      {/* Work Notes */}
      <textarea
        placeholder="Work Notes"
        value={workNotes}
        onChange={(e) => setWorkNotes(e.target.value)}
        className="w-full p-3 rounded bg-slate-800 mb-4"
      />

      {/* Before Image Upload */}
      <div className="mb-4">
        <p className="mb-2">Before Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBeforeImage(e.target.files[0])}
        />
      </div>

      {/* After Image Upload */}
      <div className="mb-4">
        <p className="mb-2">After Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAfterImage(e.target.files[0])}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Complete Work
      </button>
    </form>
  );
};

export default CompleteWorkForm;
