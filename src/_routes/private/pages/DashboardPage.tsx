import React, { useState, useEffect } from "react";

// Types for investment data and exchange rates
interface Investment {
  type: string;
  amount: number;
  monthlyContribution: number;
  rateOfReturn: number;
  projection: number;
  lastUpdated: string;
}

interface ExchangeRate {
  currencyPair: string;
  rate: number;
}

const DashboardPage: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  // Fetch current investment data (simulated here with dummy data)
  useEffect(() => {
    const fetchInvestments = async () => {
      // Replace with actual API call to fetch investments
      const response = await fetch("/api/investments");
      const data = await response.json();
      setInvestments(data);
    };

    const fetchExchangeRates = async () => {
      // Replace with actual API call to fetch exchange rates
      const response = await fetch("/api/exchange-rates");
      const data = await response.json();
      setExchangeRates(data);
    };

    fetchInvestments();
    fetchExchangeRates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Client Dashboard
      </h2>

      {/* Investment Summary */}
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Investment Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.length > 0 ? (
            investments.map((investment) => (
              <div
                key={investment.type}
                className="p-6 border border-gray-300 rounded-lg shadow-sm"
              >
                <h4 className="text-xl font-semibold text-gray-800">
                  {investment.type}
                </h4>
                <p className="mt-2 text-gray-600">
                  Amount: £{investment.amount.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Monthly Contribution: £
                  {investment.monthlyContribution.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Rate of Return: {investment.rateOfReturn}%
                </p>
                <p className="mt-2 text-gray-600">
                  Projected Return (10 years): £
                  {investment.projection.toFixed(2)}
                </p>
                <p className="mt-4 text-gray-500 text-sm">
                  Last Updated: {investment.lastUpdated}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">
              No investment data available.
            </div>
          )}
        </div>
      </div>

      {/* Exchange Rates */}
      <div className="mb-6">
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
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-2 border border-gray-300 text-center"
                >
                  No exchange rates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Profile Summary */}
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Profile Summary
        </h3>
        <div className="p-6 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-gray-600">Name: John Doe</p>
          <p className="text-gray-600">Email: johndoe@example.com</p>
          <p className="text-gray-600">Phone: +44 123 456 7890</p>
          <p className="text-gray-600">Date of Birth: 01/01/1980</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
