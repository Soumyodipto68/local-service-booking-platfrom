import { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminDashboard = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [newCategory, setNewCategory] = useState("");

  // FETCH ALL ADMIN DATA
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // PROVIDERS
      const providersRes = await API.get(
        "/admin/providers/pending",
        { headers }
      );

      setPendingProviders(providersRes.data.providers);

      // CATEGORIES
      const categoriesRes = await API.get("/categories");

      setCategories(categoriesRes.data.categories);

      // REVIEWS
      const reviewsRes = await API.get(
        "/admin/reviews",
        { headers }
      );

      setReviews(reviewsRes.data.reviews);

      // ANALYTICS
      const analyticsRes = await API.get(
        "/admin/analytics",
        { headers }
      );

      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // APPROVE PROVIDER
  const approveProvider = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/admin/providers/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT PROVIDER
  const rejectProvider = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/admin/providers/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE CATEGORY
  const createCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/categories",
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewCategory("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE REVIEW
  const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-4xl mt-3">
            {analytics.totalUsers}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl">Providers</h2>
          <p className="text-4xl mt-3">
            {analytics.totalProviders}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl">Bookings</h2>
          <p className="text-4xl mt-3">
            {analytics.totalBookings}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl">Revenue</h2>
          <p className="text-4xl mt-3">
            ₹{analytics.revenue}
          </p>
        </div>
      </div>

      {/* PENDING PROVIDERS */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-6">
          Pending Providers
        </h2>

        <div className="space-y-4">
          {pendingProviders.map((provider) => (
            <div
              key={provider._id}
              className="bg-slate-800 p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="text-xl">
                  {provider.userId?.name}
                </p>

                <p>{provider.profession}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() =>
                    approveProvider(provider._id)
                  }
                  className="bg-green-600 px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectProvider(provider._id)
                  }
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY MANAGEMENT */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-6">
          Categories
        </h2>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newCategory}
            onChange={(e) =>
              setNewCategory(e.target.value)
            }
            placeholder="Category Name"
            className="bg-slate-800 p-3 rounded w-[300px]"
          />

          <button
            onClick={createCategory}
            className="bg-blue-600 px-6 rounded-lg"
          >
            Add Category
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-slate-800 p-4 rounded-xl"
            >
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW MODERATION */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Reviews
        </h2>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-slate-800 p-5 rounded-xl"
            >
              <p className="mb-2">
                ⭐ {review.rating}
              </p>

              <p className="mb-4">
                {review.review}
              </p>

              <button
                onClick={() =>
                  deleteReview(review._id)
                }
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;