import { useEffect, useState } from "react";

export default function UserItemsModal({ userId, show, onClose }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (show && userId) {
      fetch(`/api/dragonshoard/items?userId=${userId}`)
        .then((res) => res.json())
        .then(setItems);

      // Fetch user info
      fetch(`/api/dragonshoard/users`)
        .then((res) => res.json())
        .then((users) => {
          const foundUser = users.find((u) => u.id === userId);
          setUser(foundUser || null);
        });
    }
  }, [show, userId]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 rounded-lg p-8 shadow-2xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-[#b87333]">
          User Items
        </h2>
        {user && (
          <div className="mb-4 text-lg text-[#e5e4e2]">
            <strong>User:</strong>{" "}
            <span className="font-bold text-[#b87333]">
              {user.name} ({user.class})
            </span>
          </div>
        )}
        {items.length === 0 ? (
          <p className="text-gray-300">No items found.</p>
        ) : (
          <ul className="text-gray-200">
            {items.map((item) => (
              <li key={item.id} className="mb-2">
                <strong>{item.name}</strong>
                {item.rarity && <span> — {item.rarity}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
