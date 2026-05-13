import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Clock3,
  Star,
  ArrowRight,
  Users,
  Briefcase,
  Sparkles,
  BadgeCheck,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";

import API from "../api/axios";
import Footer from "../components/Footer";

const Home = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    providers: 0,
    customers: 0,
    bookings: 0,
  });

  const [search, setSearch] = useState("");

  // FETCH DATA
  const fetchHomeData = async () => {
    try {
      // PROVIDERS
      const providerRes = await API.get("/provider/search");

      const providersData = providerRes.data.providers || [];

      setProviders(providersData.slice(0, 3));

      // DYNAMIC STATS
      setStats({
        providers: providersData.length,
        customers: 1000,
        bookings: 5000,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* HERO */}
      <section className="relative pt-36 pb-28 px-6 md:px-10">
        {/* BG GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-2 rounded-full mb-8">
              <BadgeCheck size={18} />
              Trusted Service Marketplace
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
              Find Skilled{" "}
              <span className="text-blue-500">
                Local Professionals
              </span>{" "}
              Near You
            </h1>

            <p className="text-slate-400 text-xl leading-9 max-w-2xl mb-10">
              Book electricians, plumbers, cleaners,
              carpenters, AC repair experts and more instantly.
            </p>

            {/* SEARCH */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <input
                type="text"
                placeholder="Search profession..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
              />

              <Link
                to={`/providers?profession=${search}`}
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
              >
                <Search size={20} />
                Search
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-5">
              <Link
                to="/providers"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-600/20"
              >
                Explore Services
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/register"
                className="border border-slate-700 hover:border-slate-600 hover:bg-slate-900 transition-all duration-300 px-8 py-4 rounded-2xl text-lg"
              >
                Become Provider
              </Link>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-10 mt-14">
              <div>
                <h2 className="text-4xl font-bold text-blue-400">
                  {stats.providers}+
                </h2>

                <p className="text-slate-400 mt-2">
                  Providers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-blue-400">
                  {stats.customers}+
                </h2>

                <p className="text-slate-400 mt-2">
                  Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-blue-400">
                  {stats.bookings}+
                </h2>

                <p className="text-slate-400 mt-2">
                  Bookings
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8">
                Top Providers
              </h2>

              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2
                    className="animate-spin"
                    size={40}
                  />
                </div>
              ) : (
                <div className="space-y-5">
                  {providers.map((provider) => (
                    <div
                      key={provider._id}
                      className="bg-slate-800 p-5 rounded-3xl border border-slate-700 hover:border-blue-500/30 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {provider?.userId?.name}
                          </h3>

                          <p className="text-slate-400 mb-3">
                            {provider.profession}
                          </p>
                        </div>

                        <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          ₹{provider.hourlyRate}/hr
                        </div>
                      </div>

                      {/* RATING */}
                      <div className="flex items-center gap-2 text-yellow-400 mb-4">
                        <Star
                          size={18}
                          fill="currentColor"
                        />

                        <span>4.9 Rating</span>
                      </div>

                      {/* BIO */}
                      <p className="text-slate-400 leading-7 mb-5">
                        {provider.bio}
                      </p>

                      <Link
                        to={`/provider/${provider._id}`}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        View Profile
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-5">
              Why Choose ServicePoint?
            </h2>

            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Fast, secure and trusted platform
              for local services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD */}
            <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 rounded-3xl p-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8">
                <ShieldCheck
                  size={32}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-2xl font-bold mb-5">
                Verified Providers
              </h3>

              <p className="text-slate-400 leading-8">
                Every provider is approved by admins.
              </p>
            </div>

            {/* CARD */}
            <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 rounded-3xl p-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8">
                <Clock3
                  size={32}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-2xl font-bold mb-5">
                Fast Booking
              </h3>

              <p className="text-slate-400 leading-8">
                Book services within seconds with realtime
                status updates.
              </p>
            </div>

            {/* CARD */}
            <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 rounded-3xl p-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8">
                <Sparkles
                  size={32}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-2xl font-bold mb-5">
                Trusted Reviews
              </h3>

              <p className="text-slate-400 leading-8">
                Real ratings from real customers after every
                completed booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLATFORM STATS */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
            <Users
              size={40}
              className="mx-auto text-blue-400 mb-5"
            />

            <h2 className="text-5xl font-bold mb-3">
              {stats.customers}+
            </h2>

            <p className="text-slate-400 text-lg">
              Active Customers
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
            <Briefcase
              size={40}
              className="mx-auto text-blue-400 mb-5"
            />

            <h2 className="text-5xl font-bold mb-3">
              {stats.providers}+
            </h2>

            <p className="text-slate-400 text-lg">
              Verified Providers
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
            <Star
              size={40}
              className="mx-auto text-blue-400 mb-5"
            />

            <h2 className="text-5xl font-bold mb-3">
              4.9★
            </h2>

            <p className="text-slate-400 text-lg">
              Average Rating
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-10 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Book a Service?
          </h2>

          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10 leading-8">
            Connect with experienced professionals
            and get your work done quickly and safely.
          </p>

          <Link
            to="/providers"
            className="inline-flex items-center gap-3 bg-white text-slate-900 hover:bg-slate-100 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;