// ExpensePage.tsx
import { useState } from "react";
import { Plus } from "lucide-react";
import AddEdit from "./AddEdit";
import List from "./List";

const UsersPage = () => {
  const [showAddPanel, setShowAddPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-6">

      {/* Header (fixed) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sticky top-0 bg-gray-50 z-10 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Users List
        </h1>
        <button
          onClick={() => setShowAddPanel(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Table Section */}

      <div className="overflow-x-auto">
        <List />
      </div>


      {/* Off-canvas Add Expense */}
      <AddEdit open={showAddPanel} onClose={() => setShowAddPanel(false)} />
    </div>
  );
};

export default UsersPage;
