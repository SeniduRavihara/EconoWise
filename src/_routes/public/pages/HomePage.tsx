import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "@/components/ProfileDropdown";

type CardProps = {
  title: string;
  description: string;
  onClick: () => void;
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col"
      style={{
        backgroundImage: "url('./bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
    >
      {/* <div
        className="absolute inset-0 w-screen h-screen z-10"
        style={{
          backgroundImage: "url('./bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      >awseaw</div> */}

      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">EconoWise</h1>

          <ProfileDropdown />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto mt-20 px-4">
        <h2 className="text-5xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] font-extrabold text-center mb-6">
          Streamline Your Financial Journey
        </h2>
        <p className="text-center text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] text-white  mb-8">
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
          © {new Date().getFullYear()} EconoWise. All Rights Reserved.
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
