import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  MapPin,
  Edit,
  Save,
} from "lucide-react";

const CustomerProfile = () => {

  const { user } = useAuth();

  const [editMode, setEditMode] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: user?.name || "",
      email: user?.email || "",
      city: user?.city || "",
      area: user?.area || "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6">

      <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">

        {/* TOP */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 flex justify-between items-center">

          <div className="flex items-center gap-5">

            <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center text-4xl font-bold">

              {user?.name?.charAt(0)}

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                {user?.name}

              </h1>

              <p className="text-blue-100">

                Customer Account

              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setEditMode(!editMode)
            }
            className="bg-white text-slate-900 px-5 py-3 rounded-2xl flex items-center gap-2"
          >

            {
              editMode
              ? <Save size={18} />
              : <Edit size={18} />
            }

            {
              editMode
              ? "Save"
              : "Edit"
            }

          </button>

        </div>

        {/* FORM */}
        <div className="p-10 grid md:grid-cols-2 gap-6">

          <div>

            <label className="text-slate-400 mb-2 block">
              Name
            </label>

            <div className="bg-slate-800 rounded-2xl flex items-center px-4">

              <User size={18} />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full p-4 bg-transparent outline-none"
              />

            </div>

          </div>

          <div>

            <label className="text-slate-400 mb-2 block">
              Email
            </label>

            <div className="bg-slate-800 rounded-2xl flex items-center px-4">

              <Mail size={18} />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full p-4 bg-transparent outline-none"
              />

            </div>

          </div>

          <div>

            <label className="text-slate-400 mb-2 block">
              City
            </label>

            <div className="bg-slate-800 rounded-2xl flex items-center px-4">

              <MapPin size={18} />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full p-4 bg-transparent outline-none"
              />

            </div>

          </div>

          <div>

            <label className="text-slate-400 mb-2 block">
              Area
            </label>

            <div className="bg-slate-800 rounded-2xl flex items-center px-4">

              <MapPin size={18} />

              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full p-4 bg-transparent outline-none"
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default CustomerProfile;