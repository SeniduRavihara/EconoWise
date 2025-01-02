import { getUsersCount } from "@/firebase/api";
import React, { useState, useEffect } from "react";

// Types for the dashboard data
interface DashboardStats {
  totalUsers: number;
  totalInvestments: number;
  activePlans: number;
  pendingApprovals: number;
}

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalInvestments: 5,
    activePlans: 20,
    pendingApprovals: 3,
  });

  // Fetch the dashboard stats from an API (simulated here with dummy data)
  useEffect(() => {
    const fetchDashboardStats = async () => {
      const userCount = await getUsersCount();
      setStats((prevStats) => ({ ...prevStats, totalUsers: userCount }));
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Admin Dashboard
      </h2>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-medium">Total Users</h3>
          <p className="text-3xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-medium">Total Investments</h3>
          <p className="text-3xl font-semibold">{stats.totalInvestments}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-medium">Active Plans</h3>
          <p className="text-3xl font-semibold">{stats.activePlans}</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-medium">Pending Approvals</h3>
          <p className="text-3xl font-semibold">{stats.pendingApprovals}</p>
        </div>
      </div>

      {/* Recent Investments Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-medium text-gray-700 mb-6">
          Recent Investments
        </h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                User
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Investment Type
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Amount (£)
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with actual data */}
            <tr>
              <td className="px-4 py-2 border border-gray-300">John Doe</td>
              <td className="px-4 py-2 border border-gray-300">
                Growth Savings Plan
              </td>
              <td className="px-4 py-2 border border-gray-300">£15,000</td>
              <td className="px-4 py-2 border border-gray-300">2024-12-23</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
              <td className="px-4 py-2 border border-gray-300">
                Advanced Portfolio Plan
              </td>
              <td className="px-4 py-2 border border-gray-300">£25,000</td>
              <td className="px-4 py-2 border border-gray-300">2024-12-22</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Alan Brown</td>
              <td className="px-4 py-2 border border-gray-300">
                Basic Savings Plan
              </td>
              <td className="px-4 py-2 border border-gray-300">£10,000</td>
              <td className="px-4 py-2 border border-gray-300">2024-12-21</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pending Investment Approvals */}
      <div className="mt-12">
        <h3 className="text-2xl font-medium text-gray-700 mb-6">
          Pending Investment Approvals
        </h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                User
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Investment Type
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Amount (£)
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with actual data */}
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                Charlie Green
              </td>
              <td className="px-4 py-2 border border-gray-300">
                Growth Savings Plan
              </td>
              <td className="px-4 py-2 border border-gray-300">£5,000</td>
              <td className="px-4 py-2 border border-gray-300">Pending</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Emily White</td>
              <td className="px-4 py-2 border border-gray-300">
                Advanced Portfolio Plan
              </td>
              <td className="px-4 py-2 border border-gray-300">£7,500</td>
              <td className="px-4 py-2 border border-gray-300">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
