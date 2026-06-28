function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-blue-600 font-medium mb-3">
          University Research Platform
        </p>

        <h1 className="text-6xl font-bold leading-tight">
          Discover Research.
          <br />
          Connect.
          <span className="text-blue-600">
            {" "}
            Collaborate.
          </span>
          <br />
          Create Impact.
        </h1>

        <p className="text-gray-500 mt-6 max-w-lg">
          Explore research projects by top
          faculty and apply to be part of
          innovative work shaping the future.
        </p>

        <div className="flex gap-4 mt-8">
          <input
            placeholder="Search projects..."
            className="border rounded-lg px-4 py-3 w-72"
          />

          <button className="bg-blue-600 text-white px-6 rounded-lg">
            Explore Projects
          </button>
        </div>

        <div className="flex gap-12 mt-10">
          <div>
            <h2 className="font-bold text-2xl">
              300+
            </h2>
            <p>Projects</p>
          </div>

          <div>
            <h2 className="font-bold text-2xl">
              120+
            </h2>
            <p>Professors</p>
          </div>

          <div>
            <h2 className="font-bold text-2xl">
              850+
            </h2>
            <p>Students</p>
          </div>
        </div>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
          alt=""
          className="rounded-full shadow-xl w-full"
        />
      </div>
    </section>
  );
}

export default Hero;