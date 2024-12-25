import axios from "axios";
import React, { useEffect, useState } from "react";

const FlightSearch = () => {
  const [leavingFrom, setLeavingFrom] = useState("");
  const [leavingSuggestions, setLeavingSuggestions] = useState([]);
  const [to, setTo] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Economy");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch airport autosuggestions
  const fetchAirportSuggestions = async (query, setSuggestions) => {
    try {
      const response = await axios.get(
        `https://api.innotraveltech.com/tools/airport-autosuggetion-data?query=${query}`
      );
      setSuggestions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching airport data:", error);
      setSuggestions([]);
    }
  };

  // Handle flight search
  const handleSearch = async () => {
    try {
      const response = await axios.post("https://api.innotraveltech.com/flight/search", {
        from: leavingFrom,
        to,
        departureDate,
        passengers,
        classType,
      });
      setSearchResults(response.data.flights || []);
    } catch (error) {
      console.error("Error fetching flight search data:", error);
    }
  };

  // Update leaving suggestions
  useEffect(() => {
    if (leavingFrom) {
      fetchAirportSuggestions(leavingFrom, setLeavingSuggestions);
    }
  }, [leavingFrom]);

  // Update destination suggestions
  useEffect(() => {
    if (to) {
      fetchAirportSuggestions(to, setToSuggestions);
    }
  }, [to]);

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
        {/* Flight Type Buttons */}
        <div className="flex justify-between items-center mb-4">
          <button className="py-2 px-4 font-medium border-b-2 border-red-600 text-red-600">
            One Way
          </button>
          <button className="py-2 px-4 font-medium text-gray-500">Round Trip</button>
          <button className="py-2 px-4 font-medium text-gray-500">Multi-city</button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Leaving From */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Leaving From</label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Enter departure city"
              value={leavingFrom}
              onChange={(e) => setLeavingFrom(e.target.value)}
            />
            <ul className="bg-white shadow-md rounded-md mt-1">
              {Array.isArray(leavingSuggestions) &&
                leavingSuggestions.map((airport, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setLeavingFrom(airport.name)} // Replace 'airport.name' with the correct property name
                  >
                    {airport.name}
                  </li>
                ))}
            </ul>
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
            <ul className="bg-white shadow-md rounded-md mt-1">
              {Array.isArray(toSuggestions) &&
                toSuggestions.map((airport, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setTo(airport.name)}
                  >
                    {airport.name}
                  </li>
                ))}
            </ul>
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

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Search Results:</h2>
            <ul>
              {searchResults.map((flight, index) => (
                <li key={index} className="p-2 border-b border-gray-300">
                  {flight.details} {/* Replace with actual API response structure */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
