import React from "react";
import { Wrench, MapPin, ShieldCheck } from "lucide-react";

const LeftSide = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-full min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white p-12">

      {/* TOP SECTION */}
      <div>

        {/* LOGO */}
        <div className="flex items-center gap-4 mb-16">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-xl">
            <Wrench size={36} />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold tracking-wide">
              ServicePoint
            </h1>

            <p className="text-slate-300 text-sm mt-1">
              Local Service Booking Platform
            </p>
          </div>
        </div>

        {/* HERO TEXT */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Book Trusted Local Professionals
            In Minutes
          </h2>

          <p className="text-slate-300 text-lg leading-8">
            Connect with verified electricians,
            plumbers, cleaners, mechanics,
            and home service experts near you.
            Fast booking, real-time updates,
            and secure service management.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-14 space-y-6">

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl">
              <ShieldCheck className="text-green-400" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Verified Professionals
              </h3>

              <p className="text-slate-400 text-sm">
                Trusted and approved service providers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl">
              <MapPin className="text-blue-400" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Nearby Services
              </h3>

              <p className="text-slate-400 text-sm">
                Find local experts quickly in your area
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-slate-800 pt-6 text-sm text-slate-400">
        © 2026 FixEase. All rights reserved.
      </div>

    </div>
  );
};

export default LeftSide;