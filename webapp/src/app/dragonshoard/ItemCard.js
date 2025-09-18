import React from "react";

export default function ItemCard({ item }) {
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

  return (
    <div className="bg-gray-700 rounded p-4 mb-4 shadow max-w-xl">
      <h3 className="text-xl font-bold text-[#b87333] mb-2">{item.name}</h3>
      <div className="text-sm text-[#e5e4e2] mb-2">
        {item.equipment_category && (
          <span>
            <strong>Category:</strong> {item.equipment_category.name}
            <br />
          </span>
        )}
        {item.gear_category && (
          <span>
            <strong>Gear Category:</strong> {item.gear_category.name}
            <br />
          </span>
        )}
        {item.vehicle_category && (
          <span>
            <strong>Vehicle Category:</strong> {item.vehicle_category}
            <br />
          </span>
        )}
        {item.rarity && (
          <span>
            <strong>Rarity:</strong> {item.rarity.name}
            <br />
          </span>
        )}
        {item.cost && (
          <span>
            <strong>Cost:</strong> {renderCost(item.cost)}
            <br />
          </span>
        )}
        {item.weight !== undefined && (
          <span>
            <strong>Weight:</strong> {item.weight} lb
            <br />
          </span>
        )}
        {item.variant && (
          <span>
            <strong>Variant:</strong> Yes
            <br />
          </span>
        )}
      </div>
      {item.desc && item.desc.length > 0 && (
        <div className="text-gray-200 text-sm whitespace-pre-wrap mb-2">
          {item.desc.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      )}
      {item.special && item.special.length > 0 && (
        <div className="text-gray-200 text-sm whitespace-pre-wrap mb-2">
          <strong>Special:</strong>
          {item.special.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      )}
      {item.equipment && renderEquipmentList(item.equipment)}
      {item.image && (
        <img
          src={
            item.image.startsWith("/api/images")
              ? `https://www.dnd5eapi.co${item.image}`
              : item.image
          }
          alt={item.name}
          className="w-32 h-32 object-contain rounded border mt-2"
        />
      )}
      {item.variants && item.variants.length > 0 && (
        <div className="text-gray-200 text-sm whitespace-pre-wrap mb-2">
          <strong>Variants:</strong> {item.variants.join(", ")}
        </div>
      )}
      {item.contents && item.contents.length > 0 && (
        <div className="text-gray-200 text-sm whitespace-pre-wrap mb-2">
          <strong>Contents:</strong>
          <ul className="list-disc ml-4">
            {item.contents.map((c, i) => (
              <li key={i}>{c.name || c.index}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
