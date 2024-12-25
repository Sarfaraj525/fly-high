import React, { useState } from "react";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Economy");

  const handleSearch = () => {
    console.log("Search Flights");
    // Call flight search API here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center mt-6 mb-6"
      style={{
        backgroundImage: "url('https://i.postimg.cc/wv7SBLrq/alev-takil-Tu-Fsbn5gedo-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <button className="py-2 px-4 font-medium border-b-2 border-red-600 text-red-600">
            One Way
          </button>
          <button className="py-2 px-4 font-medium text-gray-500">Round Trip</button>
          <button className="py-2 px-4 font-medium text-gray-500">Multi-city</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Leaving From */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Leaving From</label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Enter departure city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          {/* Going To */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Going To</label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Enter destination city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure Date</label>
            <input
              type="date"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>

        {/* Passengers and Class */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="py-2 px-4 border border-gray-300 rounded-md"
            onClick={() => setPassengers(passengers + 1)}
          >
            {passengers} Passenger{passengers > 1 ? "s" : ""}
          </button>
          <button
            className="py-2 px-4 border border-gray-300 rounded-md"
            onClick={() => setClassType("Economy")}
          >
            {classType}
          </button>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center">
          <button
            className="w-28 p-2 bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
