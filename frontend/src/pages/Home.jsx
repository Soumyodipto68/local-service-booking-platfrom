import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Clock3,
  Star,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="px-8 py-24 text-center">
        <h1 className="text-6xl font-bold leading-tight max-w-4xl mx-auto">
          Find Trusted{" "}
          <span className="text-blue-500">
            Local Professionals
          </span>{" "}
          Near You
        </h1>

        <p className="text-slate-400 text-xl mt-6 max-w-2xl mx-auto">
          Book electricians, plumbers, cleaners,
          AC repair experts, and more instantly.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-4 mt-10">
          <Link
            to="/providers"
            className="bg-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Services
          </Link>

          <Link
            to="/register"
            className="border border-slate-700 px-8 py-4 rounded-2xl text-lg hover:bg-slate-900 transition"
          >
            Become Provider
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* VERIFIED PROVIDERS */}
          <div className="bg-slate-900 p-8 rounded-3xl">
            <ShieldCheck
              size={40}
              className="text-blue-500 mb-6"
            />

            <h2 className="text-2xl font-bold mb-4">
              Verified Providers
            </h2>

            <p className="text-slate-400">
              Every provider is manually approved
              by admin.
            </p>
          </div>

          {/* FAST BOOKING */}
          <div className="bg-slate-900 p-8 rounded-3xl">
            <Clock3
              size={40}
              className="text-blue-500 mb-6"
            />

            <h2 className="text-2xl font-bold mb-4">
              Fast Booking
            </h2>

            <p className="text-slate-400">
              Book services in minutes with
              realtime updates.
            </p>
          </div>

          {/* TRUSTED REVIEWS */}
          <div className="bg-slate-900 p-8 rounded-3xl">
            <Star
              size={40}
              className="text-blue-500 mb-6"
            />

            <h2 className="text-2xl font-bold mb-4">
              Trusted Reviews
            </h2>

            <p className="text-slate-400">
              Real ratings from real customers.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-4xl font-bold text-center mb-8">
            Search Services
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search profession..."
              className="flex-1 bg-slate-800 p-4 rounded-2xl outline-none"
            />

            <button
              className="bg-blue-600 px-8 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 mt-20 px-8 py-10 text-center text-slate-500">
        © 2026 Local Services Platform
      </footer>
    </div>
  );
};

export default Home;