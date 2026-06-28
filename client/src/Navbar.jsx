export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">
          ResearchConnect
        </h1>

        <div className="flex gap-6">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Sign In
        </button>

      </div>
    </nav>
  );
}