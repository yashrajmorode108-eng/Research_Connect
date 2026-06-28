import Navbar from "../components/Navbar";

function StudentProfile() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold">
          Student Profile
        </h1>

        <p className="mt-4 text-gray-500">
          Coming Soon...
        </p>
      </div>
    </div>
  );
}

export default StudentProfile;