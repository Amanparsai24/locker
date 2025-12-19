import { useState } from "react";
import Table from "../../components/table/Table";
import { useExpenseStore } from "../../store/expenseStore";

interface Expense {
  id: string;
  title: string;
  category?: string;
  amount: number;
  date: string;
}

const ExpenseList = () => {
  const { expenses, removeExpense } = useExpenseStore();
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const paginatedData = expenses.slice(start, start + pageSize);

  const columns = [
    { title: "Title", key: "title" },
    { title: "Category", key: "category" },

    {
      title: "Amount",
      key: "amount",
      render: (row: Expense) => `₹${row.amount}`,
    },

    {
      title: "Date",
      key: "date",
      render: (row: Expense) => new Date(row.date).toLocaleDateString(),
    },

    {
      title: "Actions",
      key: "actions",
      render: (row: Expense) => (
        <button
          onClick={() => removeExpense(row.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={paginatedData}
      pageSize={pageSize}
      currentPage={page}
      totalItems={expenses.length}
      onPageChange={setPage}
    />
  );
};

export default ExpenseList;
