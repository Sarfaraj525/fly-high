import axios from "axios";
import React, { useEffect, useState } from "react";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("One Way");
  const [leavingFrom, setLeavingFrom] = useState("");
  const [leavingSuggestions, setLeavingSuggestions] = useState([]);
  const [selectedLeavingFrom, setSelectedLeavingFrom] = useState("");

  const [to, setTo] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedTo, setSelectedTo] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Business");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch airport autosuggestions
  const options = {
    method: "GET",
    url: "https://api.innotraveltech.com/tools/airport-autosuggetion-data",
    headers: {
      apikey: "S10944771678913327924",
      secretecode: "dxbz4eCVjJ5U6TevfIUqMVD1LbMG3eWfLdJ14qjQZRy5j",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const options2 = {
    method: "POST",
    url: "https://api.innotraveltech.com/flight/search",
    headers: {
      apikey: "S10944771678913327924",
      secretecode: "dxbz4eCVjJ5U6TevfIUqMVD1LbMG3eWfLdJ14qjQZRy5j",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const fetchAirportSuggestions = async (query, setSuggestions) => {
    try {
      const response = await axios.request(options);
      setSuggestions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching airport data:", error);
      setSuggestions([]);
    }
  };

  // Handle flight search
  const handleSearch = async () => {
    const from = selectedLeavingFrom || "ANY";
    const destination = selectedTo || "ANY";
    const date = departureDate || new Date().toISOString().split("T")[0];
    const returnTripDate = tripType === "Round Trip" ? returnDate : null;
    const pax = passengers || 1;
    const travelClass = classType || "Business";

    try {
      const response = await axios.request(options2);

      if (response.data && response.data.flights) {
        setSearchResults(response.data.flights);
      } else {
        setSearchResults([]);
        alert("No flights found. Please try with different inputs.");
      }
    } catch (error) {
      console.error("Error fetching flight search data:", error);
      alert("An error occurred while searching for flights. Please try again.");
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
      className="min-h-screen flex items-center justify-center mt-2 mb-2"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/wv7SBLrq/alev-takil-Tu-Fsbn5gedo-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl">
        {/* Trip Type Selector */}
        <div className="flex justify-between items-center mb-4">
          <button
            className={`py-2 px-4 font-medium ${
              tripType === "One Way"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500"
            }`}
            onClick={() => setTripType("One Way")}
          >
            One Way
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              tripType === "Round Trip"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500"
            }`}
            onClick={() => setTripType("Round Trip")}
          >
            Round Trip
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              tripType === "Multi-city"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500"
            }`}
            onClick={() => setTripType("Multi-city")}
          >
            Multi-city
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Leaving From */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leaving From
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Enter departure city"
              value={leavingFrom}
              onChange={(e) => setLeavingFrom(e.target.value)}
            />
            <ul className="bg-white shadow-md rounded-md mt-1">
              {leavingSuggestions.map((airport, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedLeavingFrom(airport.code);
                    setLeavingFrom(airport.name);
                    setLeavingSuggestions([]);
                  }}
                >
                  {airport.name} ({airport.code})
                </li>
              ))}
            </ul>
          </div>

          {/* Going To */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Going To
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Enter destination city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <ul className="bg-white shadow-md rounded-md mt-1">
              {toSuggestions.map((airport, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedTo(airport.code);
                    setTo(airport.name);
                    setToSuggestions([]);
                  }}
                >
                  {airport.name} ({airport.code})
                </li>
              ))}
            </ul>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departure Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          {/* Return Date for Round Trip */}
          {tripType === "Round Trip" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Return Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          )}
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
            onClick={() =>
              setClassType(classType === "Business" ? "Economy" : "Business")
            }
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
                  {flight.details}{" "}
                  
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
