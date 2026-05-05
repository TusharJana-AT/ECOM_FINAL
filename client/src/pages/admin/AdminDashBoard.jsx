import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold">₹ {stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;