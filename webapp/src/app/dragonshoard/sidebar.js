import { useEffect, useState } from "react";

const apiOptions = [
  { label: "All Equipment", resource: "equipment" },
  { label: "All Magic Items", resource: "magic-items" },
];

export default function Sidebar({ onSelectCategory, onSelectAll }) {
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
    <aside className="w-1/5 bg-gray-900 p-6 text-[#e5e4e2] overflow-y-auto">
      {loading && <p className="text-gray-300">Loading...</p>}
      <div className="mb-6">
        {apiOptions.map((opt) => (
          <button
            key={opt.resource}
            className="block w-full text-left font-bold text-[#b87333] hover:underline mb-2"
            onClick={() => onSelectAll(opt.resource)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 text-[#b87333]">
          Equipment Categories
        </h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.index}>
              <button
                className="hover:underline"
                onClick={() => onSelectCategory(cat.index)}
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
