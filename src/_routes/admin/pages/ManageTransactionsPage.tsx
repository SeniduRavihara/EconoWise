import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";

const ManageTransactionsPage = () => {
  interface Transaction {
    id: string;
    user: string;
    amount: number;
    type: string;
    timestamp: any;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Fetch transactions from Firestore
        const collectionRef = collection(db, "transactions");
        const q = query(collectionRef, orderBy("timestamp", "desc"));

        const querySnapshot = await getDocs(q);
        const transactionsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            user: data.user,
            amount: data.amount,
            type: data.type,
            timestamp: data.timestamp,
          };
        });
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Transactions</h1>

      {/* Filter Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by transaction type (e.g., investment, withdrawal)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading transactions...
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm text-gray-700">
                  <td className="py-2 px-4 border-b">{transaction.id}</td>
                  <td className="py-2 px-4 border-b">{transaction.user}</td>
                  <td className="py-2 px-4 border-b">
                    £{transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">{transaction.type}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(transaction.timestamp?.toDate()).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactionsPage;
