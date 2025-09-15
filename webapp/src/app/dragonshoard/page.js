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
  const [itemDetails, setItemDetails] = useState(null);

  async function fetchApi(resource) {
    setLoading(true);
    setSelectedApi(resource);
    setResults(null);
    setItemDetails(null); // Clear details when switching resource
    try {
      const res = await fetch(`/api/dragonshoard/${resource}`);
      const data = await res.json();
      setResults(data.results || data);
    } catch (e) {
      setResults({ error: "Failed to fetch data." });
    }
    setLoading(false);
  }

  async function fetchItemDetails(index) {
    setLoading(true);
    setItemDetails(null);
    try {
      const res = await fetch(
        `/api/dragonshoard/${selectedApi}?index=${index}`
      );
      const data = await res.json();
      setItemDetails(data);
    } catch (e) {
      setItemDetails({ error: "Failed to fetch item details." });
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
        {/* Resource Selector Dropdown */}
        <div className="mb-4">
          <select
            className="w-full p-2 rounded bg-gray-900 text-[#e5e4e2]"
            value={selectedApi || ""}
            onChange={(e) => {
              const resource = e.target.value;
              if (resource) fetchApi(resource);
            }}
          >
            <option value="" disabled>
              Select resource...
            </option>
            {apiOptions.map((opt) => (
              <option key={opt.resource} value={opt.resource}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {loading && <p className="text-gray-300">Loading...</p>}
        {results && (
          <div className="text-gray-200 max-h-64 overflow-y-auto">
            {Array.isArray(results) && selectedApi ? (
              <select
                className="w-full p-2 rounded bg-gray-900 text-[#e5e4e2] mb-4"
                defaultValue=""
                onChange={(e) => {
                  const index = e.target.value;
                  if (index) fetchItemDetails(index);
                }}
              >
                <option value="" disabled>
                  {`Select ${
                    apiOptions.find((opt) => opt.resource === selectedApi)
                      ?.label || "item"
                  }...`}
                </option>
                {results.map((item) => (
                  <option key={item.index} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : results.error ? (
              <p className="text-red-400">{results.error}</p>
            ) : (
              <pre>{JSON.stringify(results, null, 2)}</pre>
            )}
          </div>
        )}
        {itemDetails && (
          <div className="mt-4 bg-gray-700 p-4 rounded max-h-64 overflow-auto">
            {itemDetails.error ? (
              <p className="text-red-400">{itemDetails.error}</p>
            ) : (
              <pre className="text-gray-200 text-sm whitespace-pre-wrap break-words">
                {JSON.stringify(itemDetails, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
