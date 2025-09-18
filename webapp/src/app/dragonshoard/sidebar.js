import { useEffect, useState } from "react";

const apiOptions = [
  { label: "All Equipment", resource: "equipment" },
  { label: "All Magic Items", resource: "magic-items" },
];

export default function Sidebar({
  onSelectCategory,
  onSelectAll,
  selectedSidebar,
  setSelectedSidebar,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const res = await fetch("/api/dragonshoard/equipment-categories");
      const data = await res.json();
      setCategories(data.results || []);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <aside className="w-64 bg-gray-900 p-6 text-[#e5e4e2] overflow-y-auto">
      {loading && <p className="text-gray-300">Loading...</p>}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#b87333]">
          Equipment
        </h2>
        <ul>
          {/* All Equipment and All Magic Items at the top, not bold */}
          {apiOptions.map((opt) => (
            <li key={opt.resource}>
              <button
                className={`hover:underline w-full text-left text-base text-[#e5e4e2] ${
                  selectedSidebar === opt.resource
                    ? "border border-[#b87333] bg-gray-800 text-[#b87333]"
                    : ""
                }`}
                onClick={() => {
                  setSelectedSidebar(opt.resource);
                  onSelectAll(opt.resource);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
          {/* Equipment categories below */}
          {categories.map((cat) => (
            <li key={cat.index}>
              <button
                className={`hover:underline w-full text-left text-base text-[#e5e4e2] ${
                  selectedSidebar === cat.index
                    ? "border border-[#b87333] bg-gray-800 text-[#b87333] font-bold"
                    : ""
                }`}
                onClick={() => {
                  setSelectedSidebar(cat.index);
                  onSelectCategory(cat.index);
                }}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
