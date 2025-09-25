import React, { useState } from "react";

export default function ItemCard({ item, currentUserId }) {
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  if (!item) return null;

  // Helper for cost
  const renderCost = (cost) => (cost ? `${cost.quantity} ${cost.unit}` : null);

  // Helper for contents/equipment list
  const renderEquipmentList = (equipment) =>
    Array.isArray(equipment) && equipment.length > 0 ? (
      <ul className="list-disc ml-4">
        {equipment.map((eq) => (
          <li key={eq.index}>{eq.name}</li>
        ))}
      </ul>
    ) : null;

  async function handleAddItem() {
    setError(null);
    try {
      const res = await fetch("/api/dragonshoard/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, userId: currentUserId }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      setAdded(true);
    } catch (e) {
      setError("Could not add item.");
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-[#b87333]">{item.name}</h2>
      {item.cost && (
        <div className="mb-2">
          <strong>Cost:</strong> {renderCost(item.cost)}
        </div>
      )}
      {item.weight && (
        <div className="mb-2">
          <strong>Weight:</strong> {item.weight}
        </div>
      )}
      {item.equipment_category && (
        <div className="mb-2">
          <strong>Category:</strong> {item.equipment_category.name}
        </div>
      )}
      {item.contents && renderEquipmentList(item.contents)}
      {/* Add to My Items Button */}
      {currentUserId && (
        <button
          onClick={handleAddItem}
          disabled={added}
          className={`mt-4 px-4 py-2 rounded font-semibold ${
            added
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-[#b87333] text-white hover:bg-[#e5e4e2] hover:text-[#b87333] transition"
          }`}
        >
          {added ? "Added!" : "Add to My Items"}
        </button>
      )}
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
}
