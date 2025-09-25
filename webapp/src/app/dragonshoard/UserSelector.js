import { useState, useEffect } from "react";

export default function UserSelector({ onUserSelected }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [userClass, setUserClass] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch users from API
  useEffect(() => {
    fetch("/api/dragonshoard/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  // Add a new user
  async function handleAddUser(e) {
    e.preventDefault();
    await fetch("/api/dragonshoard/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userClass }),
    });
    setName("");
    setUserClass("");
    // Refresh user list
    const res = await fetch("/api/dragonshoard/users");
    setUsers(await res.json());
  }

  // Select user
  function handleSelectUser(e) {
    const id = Number(e.target.value);
    setCurrentUserId(id);
    onUserSelected?.(id);
    setShowModal(false);
  }

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#b87333] text-white px-4 py-2 rounded font-semibold"
      >
        Add/Select User
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 rounded-lg p-8 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <form onSubmit={handleAddUser} className="mb-4 flex flex-col gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="px-2 py-1 rounded"
              />
              <input
                value={userClass}
                onChange={(e) => setUserClass(e.target.value)}
                placeholder="Class"
                required
                className="px-2 py-1 rounded"
              />
              <button
                type="submit"
                className="bg-[#b87333] text-white px-3 py-1 rounded"
              >
                Add User
              </button>
            </form>
            <div>
              <strong>Select User:</strong>
              <select
                value={currentUserId || ""}
                onChange={handleSelectUser}
                className="w-full px-2 py-1 rounded bg-gray-700 text-white"
              >
                <option value="" disabled>
                  Choose a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.class})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
