// AddExpense.tsx
import { useState } from "react";
import { useExpenseStore } from "../../store/expenseStore";

interface AddExpenseProps {
  open?: boolean;
  onClose?: () => void;
}

const AddExpense = ({ open = false, onClose }: AddExpenseProps) => {
  const addExpense = useExpenseStore((s) => s.addExpense);
  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return alert("Please fill all fields");

    addExpense({
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
    });

    // reset fields
    setTitle("");
    setAmount("");
    setCategory(categories[0]);
    setDate(new Date().toISOString().slice(0, 10));

    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-30 flex justify-end">
      <div className="w-full sm:w-96 h-full relative bg-white shadow-xl flex flex-col">

        {/* Panel Header (fixed) */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Expense</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Scrollable form content */}
        <div className="p-4 flex-1 overflow-auto">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Expense title"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              className="w-full border p-2 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              className="w-full border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </form>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="p-4 border-t bg-white flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded transition"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
