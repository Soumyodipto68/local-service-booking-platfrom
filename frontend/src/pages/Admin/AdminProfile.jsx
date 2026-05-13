import { useAuth } from "../../context/AuthContext";

const AdminProfile = () => {

  const { user } = useAuth();

  return (

    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6">

      <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Admin Profile
        </h1>

        <div className="space-y-6">

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Name
            </h2>

            <p className="text-3xl font-bold">
              {user?.name}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Email
            </h2>

            <p className="text-3xl font-bold">
              {user?.email}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Role
            </h2>

            <p className="text-3xl font-bold text-red-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminProfile;