// Dashboard.tsx


const Dashboard = () => {
  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-50 min-h-screen transition-all">
      
      {/* Welcome Header */}
      <section className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome to Locker 🚀
        </h1>
        <p className="text-gray-700">
          Track your daily expenses, tasks, and assets efficiently.
        </p>
      </section>

      {/* Quick Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 text-sm">Total Expenses</h2>
          <p className="text-xl font-semibold text-gray-900">$1,250</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 text-sm">Assets</h2>
          <p className="text-xl font-semibold text-gray-900">3 Items</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 text-sm">Tasks Completed</h2>
          <p className="text-xl font-semibold text-gray-900">12</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 text-sm">Pending Tasks</h2>
          <p className="text-xl font-semibold text-gray-900">3</p>
        </div>
      </section>

      {/* Charts / Recent Activities */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-700 font-semibold mb-2">Expenses Chart</h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-700 font-semibold mb-2">Recent Activities</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>Paid electricity bill - $120</li>
            <li>Added new asset: Laptop</li>
            <li>Completed task: Finish project report</li>
            <li>Added daily expense: Coffee - $5</li>
          </ul>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h4 className="text-gray-700 font-semibold mb-2">Quick Add Expense</h4>
          <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add Expense
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h4 className="text-gray-700 font-semibold mb-2">Add Task</h4>
          <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Add Task
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h4 className="text-gray-700 font-semibold mb-2">Add Asset</h4>
          <button className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Add Asset
          </button>
        </div>
      </section>

    </main>
  );
};

export default Dashboard;
