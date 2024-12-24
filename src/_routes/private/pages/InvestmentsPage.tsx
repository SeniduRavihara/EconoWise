import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Types for investment plan options
type InvestmentType =
  | "Basic Savings Plan"
  | "Growth Savings Plan"
  | "Advanced Portfolio Plan";

interface ProjectionData {
  totalAmount: string;
  totalProfit: string;
  taxes: string;
  fees: string;
}

// Investment plan data
const investmentPlans = {
  "Basic Savings Plan": {
    maxInvestment: 25000,
    minMonthly: 50,
    returnRate: [0.01, 0.02],
    taxRate: 0,
    monthlyFee: 0.002,
  },
  "Growth Savings Plan": {
    maxInvestment: 40000,
    minMonthly: 100,
    returnRate: [0.03, 0.06],
    taxRate: 0.05,
    monthlyFee: 0.004,
  },
  "Advanced Portfolio Plan": {
    maxInvestment: Infinity,
    minMonthly: 250,
    returnRate: [0.05, 0.15],
    taxRate: 0.15,
    monthlyFee: 0.01,
  },
};

const InvestmentPage: React.FC = () => {
  // State variables
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [investmentType, setInvestmentType] =
    useState<InvestmentType>("Basic Savings Plan");
  const [projectionData, setProjectionData] = useState<{
    [key: string]: ProjectionData;
  } | null>(null);
  const [error, setError] = useState<string>("");

  // Handle calculation logic
  const handleCalculate = () => {
    // Retrieve investment plan details
    const plan = investmentPlans[investmentType];

    // Input validation
    if (
      initialInvestment <= 0 ||
      monthlyContribution < plan.minMonthly ||
      initialInvestment > plan.maxInvestment
    ) {
      setError(
        `Initial Investment must be between £0 and £${plan.maxInvestment}. Monthly contribution must be at least £${plan.minMonthly}.`
      );
      return;
    }

    // Reset error message
    setError("");

    // Function to calculate projections for a given number of years
    const calculateProjection = (years: number): ProjectionData => {
      const annualRate =
        plan.returnRate.reduce(
          (min, max) => min + Math.random() * (max - min),
          0
        ) / 2;
      let totalAmount = initialInvestment;

      for (let i = 0; i < years; i++) {
        totalAmount += totalAmount * annualRate + monthlyContribution * 12;
        totalAmount -= totalAmount * plan.monthlyFee; // Monthly fee
      }

      const totalProfit =
        totalAmount - (initialInvestment + monthlyContribution * 12 * years);
      const taxes = totalProfit > 10000 ? totalProfit * plan.taxRate : 0;
      const fees = totalProfit * plan.monthlyFee;

      return {
        totalAmount: totalAmount.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        taxes: taxes.toFixed(2),
        fees: fees.toFixed(2),
      };
    };

    // Calculate projections for 1, 3, and 10 years
    const projections = {
      "1 Year": calculateProjection(1),
      "3 Years": calculateProjection(3),
      "10 Years": calculateProjection(10),
    };

    setProjectionData(projections);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Investment Calculator
      </h2>

      {/* Initial Investment Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Initial Investment (£)
        </label>
        <input
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
          min="0"
          className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Monthly Contribution Input */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Monthly Contribution (£)
        </label>
        <input
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
          min="0"
          className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Investment Plan Dropdown */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Investment Plan
        </label>

        <Select value={investmentType} onValueChange={(value) => setInvestmentType(value as InvestmentType)}>
          <SelectTrigger className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm">
            <SelectValue placeholder="Select investment plan" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(investmentPlans).map((plan) => (
              <SelectItem key={plan} value={plan}>
                {plan}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Calculate Projections
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Projection Results */}
      {projectionData && !error && (
        <div className="mt-6">
          <h3 className="text-2xl font-medium text-gray-700 mb-4">
            Investment Projections
          </h3>
          {Object.entries(projectionData).map(([period, data]) => (
            <div key={period} className="mb-6">
              <h4 className="text-xl font-semibold text-gray-700">{period}</h4>
              <div className="mt-2 text-lg text-gray-600">
                <p>
                  Total Amount:{" "}
                  <span className="font-bold">£{data.totalAmount}</span>
                </p>
                <p>
                  Total Profit:{" "}
                  <span className="font-bold">£{data.totalProfit}</span>
                </p>
                <p>
                  Taxes: <span className="font-bold">£{data.taxes}</span>
                </p>
                <p>
                  Fees: <span className="font-bold">£{data.fees}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestmentPage;
