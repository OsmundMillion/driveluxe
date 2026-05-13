import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cars } from "../../data/carsData";

interface Reservation {
  id: number;
  carName: string;
  pickupDate: string;
  returnDate: string;
  status: string;
  username?: string;
}

interface User {
  username: string;
  fullName: string;
  role: string;
}

const statCard = (label: string, value: number | string, icon: string, to: string) => (
  <Link to={to} key={label}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#1a1a1a] border border-luxeGold rounded-2xl p-6 flex items-center gap-5 cursor-pointer hover:bg-[#222] transition-colors duration-300"
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-slateGray text-sm">{label}</p>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
    </motion.div>
  </Link>
);

const statusColors: Record<string, string> = {
  confirmed: "bg-green-600",
  pending: "bg-yellow-500",
  cancelled: "bg-red-600",
};

const AdminDashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem("reservations");
    setReservations(raw ? JSON.parse(raw) : []);

    const users: User[] = JSON.parse(localStorage.getItem("driveluxe_users") || "[]");
    setUserCount(users.filter((u) => u.role === "customer").length);
  }, []);

  const recent = [...reservations].reverse().slice(0, 5);

  return (
    <motion.div
      className="min-h-screen bg-midnight text-white px-6 pt-28 pb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading text-luxeGold mb-2">Admin Dashboard</h1>
        <p className="text-slateGray mb-10">Welcome back, Admin. Here's what's happening.</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {statCard("Total Cars", cars.length, "🚗", "/admin/vehicles")}
          {statCard("Reservations", reservations.length, "📋", "/admin/reservations")}
          {statCard("Customers", userCount, "👤", "/admin/customers")}
          {statCard(
            "Available Cars",
            cars.filter((c) => c.available).length,
            "✅",
            "/admin/vehicles"
          )}
        </div>

        {/* Recent Reservations */}
        <h2 className="text-xl font-bold text-white mb-4">Recent Reservations</h2>

        {recent.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-10 text-center text-slateGray">
            No reservations yet.
          </div>
        ) : (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#111] text-slateGray uppercase text-xs tracking-wider">
                    <th className="px-5 py-4 text-left">Car</th>
                    <th className="px-5 py-4 text-left">Customer</th>
                    <th className="px-5 py-4 text-left">Pickup</th>
                    <th className="px-5 py-4 text-left">Return</th>
                    <th className="px-5 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-t border-[#2a2a2a] ${i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1e1e1e]"}`}
                    >
                      <td className="px-5 py-4 text-white font-medium">{r.carName}</td>
                      <td className="px-5 py-4 text-slate-300">{r.username ?? "—"}</td>
                      <td className="px-5 py-4 text-slate-300">{r.pickupDate}</td>
                      <td className="px-5 py-4 text-slate-300">{r.returnDate}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full text-white capitalize ${
                            statusColors[r.status?.toLowerCase()] ?? "bg-slateGray"
                          }`}
                        >
                          {r.status ?? "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-[#2a2a2a]">
              <Link
                to="/admin/reservations"
                className="text-luxeGold text-sm hover:text-champagne transition-colors"
              >
                View all reservations →
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;