function StudentHero() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="max-w-7xl mx-auto px-8 py-12">
      <p className="text-blue-600 font-medium mb-3">
        Student Dashboard
      </p>

      <h1 className="text-5xl font-bold">
        Welcome Back,
        <span className="text-blue-600">
          {" "}
          {user?.name || "Student"}
        </span>
        👋
      </h1>

      <p className="text-gray-500 mt-5 max-w-2xl text-lg">
        Explore research opportunities, manage your applications,
        and connect with professors from different departments.
      </p>
    </section>
  );
}

export default StudentHero;