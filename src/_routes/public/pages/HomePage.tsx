import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/firebase/api";
import { useData } from "@/hooks/useData";

type CardProps = {
  title: string;
  description: string;
  onClick: () => void;
};

const HomePage: React.FC = () => {
  const { currentUserData } = useData();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout(); // Assumes `logout` is implemented in Firebase API
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Finance Management App</h1>
          {currentUserData?.roles.includes("ADMIN") && (
            <Link to="/admin">
              <Button>Admin Dashboard</Button>
            </Link>
          )}
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome to Your Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Manage your finances, track investments, and stay on top of your
          transactions.
        </p>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Dashboard"
            description="View your financial overview and activity."
            onClick={() => navigate("/dashboard")}
          />
          <Card
            title="Profile"
            description="Manage your personal details and preferences."
            onClick={() => navigate("/dashboard/profile")}
          />
          <Card
            title="Currency Exchange"
            description="Convert and manage currency transactions."
            onClick={() => navigate("/dashboard/currency-exchange")}
          />
          <Card
            title="Investments"
            description="Track and manage your investments."
            onClick={() => navigate("/dashboard/investments")}
          />
          <Card
            title="Analytics"
            description="Analyze your financial data and insights."
            onClick={() => navigate("/admin/analytics")}
          />
          <Card
            title="Transactions"
            description="View and manage your financial transactions."
            onClick={() => navigate("/admin/transactions")}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} Finance Management App. All Rights
          Reserved.
        </div>
      </footer>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
  >
    <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default HomePage;
