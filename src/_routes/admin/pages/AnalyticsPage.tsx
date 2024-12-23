import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Types for investment data and projections
interface ProjectionData {
  year: number;
  totalAmount: number;
  totalProfit: number;
  taxes: number;
  fees: number;
}

interface InvestmentPlan {
  name: string;
  projections: ProjectionData[];
  color: string; // For the graph
}

const AnalyticsPage: React.FC = () => {
  // Investment plan projections (you can replace these with actual data or API calls)
  const investmentPlans: InvestmentPlan[] = [
    {
      name: "Basic Savings Plan",
      color: "rgb(75, 192, 192)",
      projections: [
        { year: 1, totalAmount: 1200, totalProfit: 200, taxes: 0, fees: 30 },
        { year: 3, totalAmount: 3500, totalProfit: 1000, taxes: 0, fees: 90 },
        {
          year: 10,
          totalAmount: 10000,
          totalProfit: 5000,
          taxes: 0,
          fees: 250,
        },
      ],
    },
    {
      name: "Growth Savings Plan",
      color: "rgb(255, 99, 132)",
      projections: [
        { year: 1, totalAmount: 1300, totalProfit: 300, taxes: 15, fees: 50 },
        { year: 3, totalAmount: 4500, totalProfit: 1500, taxes: 75, fees: 150 },
        {
          year: 10,
          totalAmount: 14000,
          totalProfit: 8000,
          taxes: 400,
          fees: 500,
        },
      ],
    },
    {
      name: "Advanced Portfolio Plan",
      color: "rgb(153, 102, 255)",
      projections: [
        { year: 1, totalAmount: 1400, totalProfit: 400, taxes: 60, fees: 80 },
        {
          year: 3,
          totalAmount: 5000,
          totalProfit: 2000,
          taxes: 300,
          fees: 200,
        },
        {
          year: 10,
          totalAmount: 20000,
          totalProfit: 15000,
          taxes: 1000,
          fees: 1000,
        },
      ],
    },
  ];

  // Prepare chart data
  const chartData = {
    labels: investmentPlans[0].projections.map((p) => `${p.year} Year`), // X-axis labels (1 Year, 3 Years, 10 Years)
    datasets: investmentPlans.map((plan) => ({
      label: plan.name,
      data: plan.projections.map((p) => p.totalAmount),
      borderColor: plan.color,
      backgroundColor: plan.color.replace("rgb", "rgba").replace(")", ", 0.2)"),
      tension: 0.4,
      fill: true,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Investment Analytics
      </h2>

      {/* Chart Display */}
      <div className="mb-8">
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      {/* Investment Plan Details */}
      <div>
        {investmentPlans.map((plan) => (
          <div key={plan.name} className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700">
              {plan.name}
            </h3>
            <table className="min-w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Year
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Total Amount (£)
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Total Profit (£)
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Taxes (£)
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Fees (£)
                  </th>
                </tr>
              </thead>
              <tbody>
                {plan.projections.map((data) => (
                  <tr key={data.year}>
                    <td className="px-4 py-2 border border-gray-300">
                      {data.year}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      £{data.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      £{data.totalProfit.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      £{data.taxes.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      £{data.fees.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
