import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowBigRight } from "lucide-react";

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
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [investmentType, setInvestmentType] =
    useState<InvestmentType>("Basic Savings Plan");
  const [projectionData, setProjectionData] = useState<{
    [key: string]: ProjectionData;
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [openProceedDialog, setOpenProceedDialog] = useState<boolean>(false);

  const handleCalculate = () => {
    const plan = investmentPlans[investmentType];

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

    setError("");

    const calculateProjection = (years: number): ProjectionData => {
      const annualRate =
        plan.returnRate.reduce(
          (min, max) => min + Math.random() * (max - min),
          0
        ) / 2;
      let totalAmount = initialInvestment;

      for (let i = 0; i < years; i++) {
        totalAmount += totalAmount * annualRate + monthlyContribution * 12;
        totalAmount -= totalAmount * plan.monthlyFee;
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

    const projections = {
      "1 Year": calculateProjection(1),
      "3 Years": calculateProjection(3),
      "10 Years": calculateProjection(10),
    };

    setProjectionData(projections);
  };

  return (
    <div className="max-w-4xl lg:w-[85%] mt-5 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Investment Calculator
      </h2>

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

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Investment Plan
        </label>
        <Select
          value={investmentType}
          onValueChange={(value) => setInvestmentType(value as InvestmentType)}
        >
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

      <button
        onClick={handleCalculate}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Calculate Projections
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

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

          <Button
            className="text-xl px-5 py-5"
            variant="destructive"
            onClick={() => setOpenProceedDialog(true)}
          >
            <span>Save and Proceed </span>
            <ArrowBigRight />
          </Button>
        </div>
      )}

      {/* Updated Dialog Content */}
      <Dialog open={openProceedDialog} onOpenChange={setOpenProceedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Investment</DialogTitle>
            <DialogDescription>
              You are about to proceed with the following details:
              <ul className="list-disc list-inside mt-3">
                <li>Plan: {investmentType}</li>
                <li>Initial Investment: £{initialInvestment}</li>
                <li>Monthly Contribution: £{monthlyContribution}</li>
              </ul>
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpenProceedDialog(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={() => console.log("Proceed!")}>
              Confirm and Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestmentPage;
