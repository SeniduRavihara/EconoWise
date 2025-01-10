import React, { useState, useEffect } from "react";

// Types for currency exchange
interface ExchangeRate {
  currencyPair: string;
  rate: number;
  lastUpdated: string;
  fee?: number; // Optional fee property
}

const ManageCurrencyExchangePage: React.FC = () => {
  // Mock data for exchange rates
  const mockExchangeRates: ExchangeRate[] = [
    { currencyPair: "USD/EUR", rate: 0.91, lastUpdated: "2025-01-01 10:00 AM" },
    { currencyPair: "USD/GBP", rate: 0.79, lastUpdated: "2025-01-01 10:00 AM" },
    {
      currencyPair: "USD/JPY",
      rate: 114.15,
      lastUpdated: "2025-01-01 10:00 AM",
    },
    { currencyPair: "USD/AUD", rate: 1.34, lastUpdated: "2025-01-01 10:00 AM" },
    { currencyPair: "USD/CAD", rate: 1.26, lastUpdated: "2025-01-01 10:00 AM" },
  ];

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  // Load mock data into state
  useEffect(() => {
    const initializeData = () => {
      // Add default fees (e.g., 0) to each rate
      const ratesWithFees = mockExchangeRates.map((rate) => ({
        ...rate,
        fee: 0, // Default fee
      }));
      setExchangeRates(ratesWithFees);
    };

    initializeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle fee changes
  const handleFeeChange = (currencyPair: string, newFee: number) => {
    setExchangeRates((prevRates) =>
      prevRates.map((rate) =>
        rate.currencyPair === currencyPair ? { ...rate, fee: newFee } : rate
      )
    );
  };

  return (
    <div className="max-w-7xl lg:w-[85%] mt-5 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Manage Currency Exchange Fees
      </h2>

      {/* Exchange Rates Table */}
      <div>
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Current Exchange Rates and Fees
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
                Fee (%)
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
                    <input
                      type="number"
                      className="px-2 py-1 border border-gray-300 rounded-md w-20"
                      value={rate.fee ?? 0}
                      onChange={(e) =>
                        handleFeeChange(
                          rate.currencyPair,
                          Number(e.target.value)
                        )
                      }
                    />
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
