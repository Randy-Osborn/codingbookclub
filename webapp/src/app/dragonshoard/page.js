"use client";
import { useState } from "react";
import Treasure from "./treasure";

const apiOptions = [
  { label: "Equipment", resource: "equipment" },
  { label: "Equipment Categories", resource: "equipment-categories" },
  { label: "Magic Items", resource: "magic-items" },
];

export default function DragonsHoardPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedApi, setSelectedApi] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchApi(resource) {
    setLoading(true);
    setSelectedApi(resource);
    setResults(null);
    try {
      const res = await fetch(`/api/dragonshoard/${resource}`);
      const data = await res.json();
      setResults(data.results || data);
    } catch (e) {
      setResults({ error: "Failed to fetch data." });
    }
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-7xl/loose font-bold bg-gradient-to-r from-[#b87333] to-[#e5e4e2] bg-clip-text text-transparent">
        Dragons Hoard
      </h1>
      <button
        onClick={() => setShowModal(true)}
        className="mt-8 px-6 py-3 bg-[#b87333] text-white rounded-lg font-semibold hover:bg-[#e5e4e2] hover:text-[#b87333] transition"
      >
        Open Treasure Generator
      </button>

      {/* Treasure Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 rounded-lg p-8 shadow-2xl max-w-xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#b87333]">
              Treasure Generator
            </h2>
            <Treasure />
          </div>
        </div>
      )}

      {/* API Explorer */}
      <div className="mt-8 w-full max-w-xl bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-[#b87333]">
          D&D 5e API Explorer
        </h2>
        <ul className="mb-4">
          {apiOptions.map((opt) => (
            <li key={opt.resource} className="mb-2">
              <button
                onClick={() => fetchApi(opt.resource)}
                className={`px-4 py-2 rounded ${
                  selectedApi === opt.resource
                    ? "bg-[#e5e4e2] text-[#b87333]"
                    : "bg-[#b87333] text-white"
                } hover:bg-[#e5e4e2] hover:text-[#b87333] transition`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
        {loading && <p className="text-gray-300">Loading...</p>}
        {results && (
          <div className="text-gray-200 max-h-64 overflow-y-auto">
            {Array.isArray(results) ? (
              <ul>
                {results.map((item) => (
                  <li key={item.index || item.name}>{item.name}</li>
                ))}
              </ul>
            ) : results.error ? (
              <p className="text-red-400">{results.error}</p>
            ) : (
              <pre>{JSON.stringify(results, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
