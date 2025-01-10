import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUD, CAD, EUR, GBP, JPY, USD } from "@/assets";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config"; // Assuming you're using Firebase Firestore
import { addDoc, collection } from "firebase/firestore";

const CurrencyExchangePage = () => {
  const currencies = [
    { code: "GBP", flag: GBP },
    { code: "USD", flag: USD },
    { code: "EUR", flag: EUR },
    { code: "JPY", flag: JPY },
    { code: "CAD", flag: CAD },
    { code: "AUD", flag: AUD },
  ];

  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("GBP");
  const [amount, setAmount] = useState(250);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        setRates(response.data.rates);
      } catch {
        setError("Error fetching exchange rates.");
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(Math.min(Math.max(newAmount, 250), 10000));
  };

  const handleConvert = () => {
    if (amount < 250 || amount > 10000) {
      setError("Amount should be between 250 and 10,000.");
      return;
    }

    setError("");
    setLoading(true);

    const rate = rates[targetCurrency];
    if (rate) {
      const conversion = amount * rate;
      setConvertedAmount(conversion);

      let feeAmount = 0;
      if (amount <= 500) feeAmount = amount * 0.04;
      else if (amount <= 2000) feeAmount = amount * 0.03;
      else feeAmount = amount * 0.02;

      setFee(feeAmount);
    } else {
      setError("Error in exchange rates or target currency.");
    }

    setLoading(false);
  };

  const handleSaveTransaction = async () => {
    setIsSaving(true);
    try {
      await addDoc(collection(db, "transactions"), {
        baseCurrency,
        targetCurrency,
        amount,
        convertedAmount,
        fee,
        status: "Pending", // Initial status
        timestamp: new Date().toISOString(),
      });
      alert("Transaction saved successfully! Admin will contact you soon.");
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Failed to save transaction. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl lg:w-[85%] mt-5 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Currency Exchange
      </h2>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Base Currency
        </label>
        <Select value={baseCurrency} onValueChange={setBaseCurrency}>
          <SelectTrigger className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm">
            <SelectValue placeholder="Select base currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(({ code, flag }) => (
              <SelectItem key={code} value={code}>
                <div className="flex items-center">
                  <img
                    src={flag}
                    alt={`${code} flag`}
                    className="w-7 h-7 mr-2"
                  />
                  {code}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Target Currency
        </label>
        <Select value={targetCurrency} onValueChange={setTargetCurrency}>
          <SelectTrigger className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm">
            <SelectValue placeholder="Select target currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(({ code, flag }) => (
              <SelectItem key={code} value={code}>
                <div className="flex items-center">
                  <img
                    src={flag}
                    alt={`${code} flag`}
                    className="w-7 h-7 mr-2"
                  />
                  {code}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          min="250"
          max="10000"
          onChange={handleAmountChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={handleConvert}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Convert
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-6">
        {convertedAmount > 0 && !loading && (
          <div>
            <p className="text-xl font-medium text-gray-700">
              Converted Amount:{" "}
              <span className="font-bold">
                {convertedAmount.toFixed(2)} {targetCurrency}
              </span>
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Transaction Fee:{" "}
              <span className="font-bold">
                {fee.toFixed(2)} {baseCurrency}
              </span>
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Amount After Fee:{" "}
              <span className="font-bold">
                {(convertedAmount - fee).toFixed(2)} {targetCurrency}
              </span>
            </p>
            <Button
              onClick={handleSaveTransaction}
              disabled={isSaving}
              className="w-full py-3 mt-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isSaving ? "Saving..." : "Save Transaction"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyExchangePage;
