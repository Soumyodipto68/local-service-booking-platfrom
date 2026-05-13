import { useAuth } from "../../context/AuthContext";

const ProviderProfile = () => {

  const { user } = useAuth();

  return (

    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6">

      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-10 border border-slate-800">

        <h1 className="text-5xl font-bold mb-10">
          Provider Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Name
            </h2>

            <p className="text-2xl font-bold">
              {user?.name}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Email
            </h2>

            <p className="text-2xl font-bold">
              {user?.email}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Profession
            </h2>

            <p className="text-2xl font-bold">
              Electrician
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6">

            <h2 className="text-slate-400 mb-2">
              Experience
            </h2>

            <p className="text-2xl font-bold">
              5 Years
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProviderProfile;