import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useExpenseStore } from "../../store/expenseStore";
import WebService from "../../utility/WebService";

interface Expense {
  id: string;
  title: string;
  category?: string;
  amount: number;
  date: string;
}

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  photo?: string;
}

const List = () => {
  const { expenses, removeExpense } = useExpenseStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getlist();
  }, []);

  const getlist = async () => {
    setLoading(true);
    try {
      await WebService.getAPI<{ result: UserFormData }>("users/getuser")
        .then((res) => {
          console.log(res, "res")
        })
        .catch();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

export default List;
