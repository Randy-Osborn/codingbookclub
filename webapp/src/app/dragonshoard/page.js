"use client";
import { useState, useEffect } from "react";
import Treasure from "./treasure";
import ItemCard from "./ItemCard";
import Sidebar from "./sidebar";
import UserSelector from "./UserSelector";
import UserItemsModal from "./UserItemsModal";

export default function DragonsHoardPage() {
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedSidebar, setSelectedSidebar] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showItemsModal, setShowItemsModal] = useState(false);

  useEffect(() => {
    if (currentUserId) {
      fetch("/api/dragonshoard/users")
        .then((res) => res.json())
        .then((users) => {
          const user = users.find((u) => u.id === currentUserId);
          setCurrentUser(user || null);
        });
    } else {
      setCurrentUser(null);
    }
  }, [currentUserId]);

  // When a category is selected
  async function handleSelectCategory(categoryIndex) {
    setLoading(true);
    setItemDetails(null);
    const res = await fetch(
      `/api/dragonshoard/equipment-categories?index=${categoryIndex}`
    );
    const data = await res.json();
    setItemList(data.equipment || []);
    setLoading(false);
  }

  // When "All Equipment" or "All Magic Items" is selected
  async function handleSelectAll(resource) {
    setLoading(true);
    setItemDetails(null);
    const res = await fetch(`/api/dragonshoard/${resource}`);
    const data = await res.json();
    setItemList(data.results || []);
    setLoading(false);
  }

  // When an item is selected from the list
  async function handleSelectItem(index, resource = "equipment") {
    setSelectedItemIndex(index);
    setLoading(true);
    setItemDetails(null);
    const res = await fetch(`/api/dragonshoard/${resource}?index=${index}`);
    const data = await res.json();
    setItemDetails(data);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar
        selectedSidebar={selectedSidebar}
        setSelectedSidebar={setSelectedSidebar}
        onSelectCategory={handleSelectCategory}
        onSelectAll={handleSelectAll}
      />
      <section className="flex-1 p-12 bg-gray-800">
        {/* Top bar with UserSelector and View My Items button side by side */}
        <div className="flex items-center justify-between mb-8 w-full">
          <div className="flex items-center gap-4">
            <UserSelector onUserSelected={setCurrentUserId} />
            <button
              onClick={() => setShowItemsModal(true)}
              className="bg-[#b87333] text-white px-4 py-2 rounded font-semibold"
              disabled={!currentUserId}
            >
              View My Items
            </button>
          </div>
          {currentUser && (
            <div className="text-lg text-[#e5e4e2]">
              Current User:{" "}
              <span className="font-bold text-[#b87333]">
                {currentUser.name} ({currentUser.class})
              </span>
            </div>
          )}
        </div>
        <div className="relative mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#b87333] to-[#e5e4e2] bg-clip-text text-transparent leading-tight text-center">
            Dragons Hoard
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#b87333] text-white rounded font-semibold hover:bg-[#e5e4e2] hover:text-[#b87333] transition"
            style={{ fontSize: "1rem" }}
          >
            Open Treasure Generator
          </button>
        </div>
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
        <div className="flex flex-1 flex-row items-start">
          {/* Item List Panel */}
          <div
            className="w-1/4 p-2 border-r border-gray-700"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <ul className="inline-block min-w-max text-sm">
              {itemList.map((item) => (
                <li key={item.index}>
                  <button
                    className={`underline text-[#e5e4e2] hover:text-[#b87333] w-full text-left ${
                      selectedItemIndex === item.index
                        ? "border border-[#b87333] bg-gray-800 text-[#b87333] font-bold"
                        : ""
                    }`}
                    onClick={() =>
                      handleSelectItem(
                        item.index,
                        item.url && item.url.includes("magic-items")
                          ? "magic-items"
                          : "equipment"
                      )
                    }
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Item Details Panel */}
          {itemDetails && (
            <div className="w-1/3 p-4">
              <ItemCard item={itemDetails} currentUserId={currentUserId} />
            </div>
          )}
        </div>
        <UserItemsModal
          userId={currentUserId}
          show={showItemsModal}
          onClose={() => setShowItemsModal(false)}
        />
      </section>
    </main>
  );
}
