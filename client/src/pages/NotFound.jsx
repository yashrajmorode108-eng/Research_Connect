
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-blue-600">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-6">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist
          or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
        >
          Go to Homepage
        </Link>

      </div>
    </div>
  );
}

export default NotFound;