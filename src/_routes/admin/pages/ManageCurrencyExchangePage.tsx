import React, { useState, useEffect } from "react";

// Types for currency exchange
interface ExchangeRate {
  currencyPair: string;
  rate: number;
  lastUpdated: string;
}

const ManageCurrencyExchangePage: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [newRate, setNewRate] = useState<number | string>("");

  // Fetch the current exchange rates (simulated here with dummy data)
  useEffect(() => {
    const fetchExchangeRates = async () => {
      // Replace with actual API call to fetch exchange rates
      const response = await fetch("/api/exchange-rates");
      const data = await response.json();
      setExchangeRates(data);
    };

    fetchExchangeRates();
  }, []);

  // Handle the addition of a new exchange rate
  const handleAddExchangeRate = async () => {
    if (newRate && !isNaN(Number(newRate))) {
      const newExchangeRate = {
        currencyPair: "USD/GBP", // Example pair, replace with dynamic values
        rate: Number(newRate),
        lastUpdated: new Date().toLocaleString(),
      };

      // Replace with actual API call to add new exchange rate
      const response = await fetch("/api/add-exchange-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExchangeRate),
      });

      if (response.ok) {
        setExchangeRates((prevRates) => [...prevRates, newExchangeRate]);
        setNewRate(""); // Clear the input field
      } else {
        console.error("Failed to add exchange rate");
      }
    } else {
      alert("Please enter a valid rate.");
    }
  };

  // Handle the removal of an exchange rate
  const handleRemoveExchangeRate = async (currencyPair: string) => {
    // Replace with actual API call to delete exchange rate
    const response = await fetch("/api/delete-exchange-rate", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currencyPair }),
    });

    if (response.ok) {
      setExchangeRates((prevRates) =>
        prevRates.filter((rate) => rate.currencyPair !== currencyPair)
      );
    } else {
      console.error("Failed to delete exchange rate");
    }
  };

  return (
    <div className="max-w-7xl lg:w-[85%] mt-5 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Manage Currency Exchange Rates
      </h2>

      {/* New Exchange Rate Input */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <input
            type="number"
            className="px-4 py-2 border border-gray-300 rounded-md w-40"
            placeholder="Enter Rate"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
          />
          <button
            onClick={handleAddExchangeRate}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Rate
          </button>
        </div>
      </div>

      {/* Exchange Rates Table */}
      <div>
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Current Exchange Rates
        </h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Currency Pair
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Rate
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Last Updated
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.length > 0 ? (
              exchangeRates.map((rate) => (
                <tr key={rate.currencyPair}>
                  <td className="px-4 py-2 border border-gray-300">
                    {rate.currencyPair}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {rate.rate}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {rate.lastUpdated}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() =>
                        handleRemoveExchangeRate(rate.currencyPair)
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-2 border border-gray-300 text-center"
                >
                  No exchange rates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCurrencyExchangePage;
