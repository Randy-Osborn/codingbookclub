"use client";
import React, { useState } from "react";

function rollD6(x) {
  let sum = 0;
  for (let i = 0; i < x; i++) {
    sum += Math.floor(Math.random() * 6) + 1;
  }
  return sum;
}
function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function Treasure() {
  const [selectedOption, setSelectedOption] = useState("0");
  const [copper, setCopper] = useState(0);
  const [silver, setSilver] = useState(0);
  const [electrum, setElectrum] = useState(0);
  const [gold, setGold] = useState(0);
  const [platinum, setPlatinum] = useState(0);
  function resetCoins() {
    setCopper(0);
    setSilver(0);
    setGold(0);
    setElectrum(0);
    setPlatinum(0);
  }

  function RollLoot() {
    let x = rollD100();
    console.log("Rolled: ", x);
    resetCoins();
    switch (selectedOption) {
      case "0":
        switch (true) {
          case x >= 1 && x <= 30:
            setCopper(rollD6(5));
            break;
          case x >= 31 && x <= 60:
            setSilver(rollD6(4));
            break;
          case x >= 61 && x <= 70:
            setElectrum(rollD6(3));

            break;
          case x >= 71 && x <= 95:
            setGold(rollD6(3));

            break;
          case x >= 96 && x <= 100:
            setPlatinum(rollD6(1));

            break;
          default:
            console.log("Number is out of range");
        }
        break;
      case "1":
        switch (true) {
          case x >= 1 && x <= 30:
            setCopper(rollD6(4) * 100);
            setElectrum(rollD6(1) * 10);
            break;
          case x >= 31 && x <= 60:
            setSilver(rollD6(6) * 10);
            setGold(rollD6(2) * 10);

            break;
          case x >= 61 && x <= 70:
            setElectrum(rollD6(3) * 10);
            setGold(rollD6(2) * 10);

            break;
          case x >= 71 && x <= 95:
            setGold(rollD6(4) * 10);

            break;
          case x >= 96 && x <= 100:
            setPlatinum(rollD6(2) * 10);
            setGold(rollD6(3) * 10);

            break;
          default:
            console.log("Number is out of range");
        }
        break;
      case "2":
        switch (true) {
          case x >= 1 && x <= 20:
            setSilver(rollD6(4) * 100);
            setGold(rollD6(1) * 100);

            break;
          case x >= 21 && x <= 35:
            setElectrum(rollD6(1) * 100);
            setGold(rollD6(1) * 100);

            break;
          case x >= 36 && x <= 75:
            setGold(rollD6(2) * 100);
            setPlatinum(rollD6(1) * 10);

            break;
          case x >= 76 && x <= 100:
            setGold(rollD6(2) * 100);
            setPlatinum(rollD6(2) * 10);

            break;

          default:
            console.log("Number is out of range");
        }
        break;
      case "3":
        switch (true) {
          case x >= 1 && x <= 15:
            setElectrum(rollD6(2) * 1000);
            setGold(rollD6(8) * 100);

            break;
          case x >= 16 && x <= 55:
            setGold(rollD6(1) * 1000);
            setPlatinum(rollD6(1) * 100);

            break;
          case x >= 56 && x <= 100:
            setGold(rollD6(1) * 1000);
            setPlatinum(rollD6(2) * 100);

            break;
          default:
            console.log("out of bounds");
            break;
        }
        break;
    }
  }

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex justify-end items-center space-x-4 w-full mb-8">
        <h1 className="text-3xl font-bold text-white">Challenge Rating</h1>
        <select
          className="p-2 border border-gray-300 bg-gray-500 rounded-md"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="0">0-4</option>
          <option value="1">5-10</option>
          <option value="2">11-16</option>
          <option value="3">17+</option>
        </select>
      </div>
      <div>
        {" "}
        {copper > 0 && <div className="text-lg mb-2">Copper: {copper}</div>}
        {silver > 0 && <div className="text-lg mb-2">Silver: {silver}</div>}
        {electrum > 0 && (
          <div className="text-lg mb-2">Electrum: {electrum}</div>
        )}
        {gold > 0 && <div className="text-lg mb-2">Gold: {gold}</div>}
        {platinum > 0 && (
          <div className="text-lg mb-2">Platinum: {platinum}</div>
        )}
      </div>
      <button
        onClick={RollLoot}
        className="mt-auto mr-auto p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Roll Loot
      </button>
    </main>
  );
}
