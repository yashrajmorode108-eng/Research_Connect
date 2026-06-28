function DepartmentGrid() {
  const departments = [
    {
      name: "Computer Science",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
    {
      name: "Biotechnology",
      image:
        "https://images.unsplash.com/photo-1532187643603-ba119ca4109e",
    },
    {
      name: "Mechanical",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    },
    {
      name: "Electrical",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
    {
      name: "Chemical",
      image:
        "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6",
    },
    {
      name: "Mathematics",
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          Browse By Department
        </h2>

        <p className="text-gray-500 mt-3">
          Explore research opportunities across
          different departments
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <img
              src={dept.image}
              alt={dept.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h3 className="font-bold text-xl">
                {dept.name}
              </h3>

              <p className="text-gray-500 mt-2">
                View Projects →
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DepartmentGrid;