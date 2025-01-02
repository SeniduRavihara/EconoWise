import React, { useState, useEffect } from "react";

// Types for investment plan data
interface InvestmentPlan {
  id: string;
  name: string;
  maxInvestment: number;
  minMonthlyContribution: number;
  returns: string;
  taxAndFees: string;
}

const ManageInvestmentPage: React.FC = () => {
  // States for managing investment plans
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [newPlan, setNewPlan] = useState<InvestmentPlan>({
    id: "",
    name: "",
    maxInvestment: 0,
    minMonthlyContribution: 0,
    returns: "",
    taxAndFees: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch investment plans from an API (simulated with local data for now)
  useEffect(() => {
    // Replace with an API call for real data
    const fetchInvestmentPlans = async () => {
      const response = await fetch("/api/investment-plans");
      const data = await response.json();
      setInvestmentPlans(data);
    };

    fetchInvestmentPlans();
  }, []);

  // Handle adding or updating an investment plan
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // Update investment plan API call
      await fetch(`/api/investment-plans/${newPlan.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlan),
      });
      alert("Investment Plan updated successfully.");
    } else {
      // Create new investment plan API call
      await fetch("/api/investment-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlan),
      });
      alert("Investment Plan added successfully.");
    }
    setNewPlan({
      id: "",
      name: "",
      maxInvestment: 0,
      minMonthlyContribution: 0,
      returns: "",
      taxAndFees: "",
    });
    setIsEditing(false);
    // Reload the investment plans list
    const response = await fetch("/api/investment-plans");
    const data = await response.json();
    setInvestmentPlans(data);
  };

  // Handle editing an investment plan
  const handleEdit = (plan: InvestmentPlan) => {
    setNewPlan(plan);
    setIsEditing(true);
  };

  // Handle deleting an investment plan
  const handleDelete = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this investment plan?")
    ) {
      await fetch(`/api/investment-plans/${id}`, {
        method: "DELETE",
      });
      alert("Investment Plan deleted successfully.");
      // Reload the investment plans list
      const response = await fetch("/api/investment-plans");
      const data = await response.json();
      setInvestmentPlans(data);
    }
  };

  return (
    <div className="max-w-5xl lg:w-[90%] mt-5 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Manage Investment Plans
      </h2>

      {/* Investment Plans List */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          All Investment Plans
        </h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Investment Type
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Max Investment (£)
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Min Monthly Contribution (£)
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Returns
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tax and Fees
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {investmentPlans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-4 py-2 border border-gray-300">
                  {plan.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {plan.maxInvestment}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {plan.minMonthlyContribution}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {plan.returns}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {plan.taxAndFees}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(plan)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(plan.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Investment Plan Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {isEditing ? "Edit Investment Plan" : "Add New Investment Plan"}
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Investment Name
            </label>
            <input
              type="text"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Max Investment (£)
            </label>
            <input
              type="number"
              value={newPlan.maxInvestment}
              onChange={(e) =>
                setNewPlan({
                  ...newPlan,
                  maxInvestment: Number(e.target.value),
                })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Min Monthly Contribution (£)
            </label>
            <input
              type="number"
              value={newPlan.minMonthlyContribution}
              onChange={(e) =>
                setNewPlan({
                  ...newPlan,
                  minMonthlyContribution: Number(e.target.value),
                })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Annual Returns
            </label>
            <input
              type="text"
              value={newPlan.returns}
              onChange={(e) =>
                setNewPlan({ ...newPlan, returns: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tax and Fees
            </label>
            <input
              type="text"
              value={newPlan.taxAndFees}
              onChange={(e) =>
                setNewPlan({ ...newPlan, taxAndFees: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md"
            >
              {isEditing ? "Update Plan" : "Add Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageInvestmentPage;
