import { Link } from "react-router-dom";

import {
  Search,
  ShieldCheck,
  Clock3,
  Star,
  ArrowRight,
  Wrench,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const Home = () => {

  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-28 px-6 md:px-10">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* TAG */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-2 rounded-full mb-8">

              <BadgeCheck size={18} />

              Trusted Service Marketplace

            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">

              Find Skilled{" "}

              <span className="text-blue-500">
                Local Professionals
              </span>{" "}

              Anytime, Anywhere

            </h1>

            {/* SUBTEXT */}
            <p className="text-slate-400 text-xl leading-9 max-w-2xl mb-10">

              Book electricians, plumbers,
              AC repair experts, cleaners,
              carpenters, and more —
              all from one modern platform.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5">

              <Link
                to="/providers"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
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

                <h2 className="text-4xl font-bold">
                  500+
                </h2>

                <p className="text-slate-400 mt-2">
                  Providers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold">
                  10K+
                </h2>

                <p className="text-slate-400 mt-2">
                  Customers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold">
                  4.9★
                </h2>

                <p className="text-slate-400 mt-2">
                  Ratings
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">

            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-2xl">

              {/* MOCK CARD */}
              <div className="bg-slate-800 rounded-3xl p-6 mb-6">

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">

                    <Wrench size={30} />

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      Raj Electrician
                    </h3>

                    <p className="text-slate-400">
                      Electrical Expert
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 text-yellow-400 mb-4">

                  <Star
                    size={18}
                    fill="currentColor"
                  />

                  <Star
                    size={18}
                    fill="currentColor"
                  />

                  <Star
                    size={18}
                    fill="currentColor"
                  />

                  <Star
                    size={18}
                    fill="currentColor"
                  />

                  <Star
                    size={18}
                    fill="currentColor"
                  />

                  <span className="text-slate-300 ml-2">
                    4.9 Rating
                  </span>

                </div>

                <p className="text-slate-400 leading-7">

                  Expert home electrical
                  repair and installation
                  service with quick response.

                </p>

              </div>

              {/* SEARCH BOX */}
              <div className="bg-slate-800 rounded-3xl p-5">

                <div className="flex items-center gap-3 mb-4">

                  <Search
                    size={20}
                    className="text-blue-400"
                  />

                  <h3 className="text-xl font-bold">
                    Search Services
                  </h3>

                </div>

                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Search profession..."
                    className="w-full bg-slate-700 p-4 rounded-2xl outline-none placeholder:text-slate-500"
                  />

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold"
                  >
                    Search Providers
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-10 py-24">

        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold mb-5">
              Why Choose Fixora?
            </h2>

            <p className="text-slate-400 text-xl max-w-2xl mx-auto">

              A smarter way to connect
              customers with trusted local
              service professionals.

            </p>

          </div>

          {/* FEATURE GRID */}
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

                Every provider is manually
                reviewed and approved by
                our admin team.

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

                Book services in just a
                few clicks with realtime
                booking updates.

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

                Real customer ratings and
                reviews help you choose
                the best professionals.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-10 pb-24">

        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-10 md:p-16 text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">

            Ready to Book a Service?

          </h2>

          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10 leading-8">

            Connect with experienced
            professionals and get your
            work done quickly and safely.

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
      <footer className="border-t border-slate-800 px-6 md:px-10 py-10">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Fixora
            </h2>

            <p className="text-slate-500">
              Modern Local Service Platform
            </p>

          </div>

          <p className="text-slate-500 text-center">

            © 2026 Fixora. All rights reserved.

          </p>

        </div>

      </footer>

    </div>

  );

};

export default Home;