import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface User {
  username: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: string;
}

interface Reservation {
  username?: string;
  status?: string;
}

const CustomerManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const rawUsers: User[] = JSON.parse(localStorage.getItem("driveluxe_users") || "[]");
    const rawRes: Reservation[] = JSON.parse(localStorage.getItem("reservations") || "[]");
    setUsers(rawUsers.filter((u) => u.role === "customer"));
    setReservations(rawRes);
  }, []);

  const deleteUser = (username: string) => {
    const updated = users.filter((u) => u.username !== username);
    setUsers(updated);
    // Persist — write back all users including admin accounts
    const all: User[] = JSON.parse(localStorage.getItem("driveluxe_users") || "[]");
    localStorage.setItem(
      "driveluxe_users",
      JSON.stringify(all.filter((u) => u.username !== username))
    );
  };

  const reservationCount = (username: string) =>
    reservations.filter((r) => r.username === username).length;

  const activeCount = (username: string) =>
    reservations.filter(
      (r) => r.username === username && r.status?.toLowerCase() === "confirmed"
    ).length;

  const filtered = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      u.username?.toLowerCase().includes(term) ||
      u.fullName?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });

  return (
    <motion.div
      className="min-h-screen bg-midnight text-white px-6 pt-28 pb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading text-luxeGold mb-2">Customer Management</h1>
        <p className="text-slateGray mb-8">
          {users.length} registered customer{users.length !== 1 ? "s" : ""}
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 bg-[#1a1a1a] border border-[#2a2a2a] focus:border-luxeGold text-white text-sm rounded-xl px-4 py-3 outline-none placeholder:text-slateGray transition-colors duration-200"
          />
        </div>

        {/* Table */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111] text-slateGray uppercase text-xs tracking-wider">
                  <th className="px-5 py-4 text-left">Customer</th>
                  <th className="px-5 py-4 text-left">Email</th>
                  <th className="px-5 py-4 text-left">Phone</th>
                  <th className="px-5 py-4 text-left">Reservations</th>
                  <th className="px-5 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slateGray">
                      {users.length === 0
                        ? "No customers have registered yet."
                        : "No customers match your search."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((u, i) => {
                    const total = reservationCount(u.username);
                    const active = activeCount(u.username);
                    return (
                      <tr
                        key={u.username}
                        className={`border-t border-[#2a2a2a] ${
                          i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1e1e1e]"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-luxeGold text-midnight flex items-center justify-center font-bold text-sm shrink-0">
                              {u.fullName?.[0]?.toUpperCase() ?? "?"}
                            </div>
                            <div>
                              <div className="text-white font-medium">{u.fullName}</div>
                              <div className="text-xs text-slateGray">@{u.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-300">{u.email}</td>
                        <td className="px-5 py-4 text-slate-300">
                          {u.phoneNumber || <span className="text-slateGray">—</span>}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{total}</span>
                            {active > 0 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold">
                                {active} active
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => deleteUser(u.username)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-red-700 text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-200 font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-[#2a2a2a] text-xs text-slateGray">
            Showing {filtered.length} of {users.length} customers
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerManagement;