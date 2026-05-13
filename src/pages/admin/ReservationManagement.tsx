import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Reservation {
  id: number;
  carName: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  status: string;
  username?: string;
  fullName?: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-green-600",
  pending: "bg-yellow-500",
  cancelled: "bg-red-600",
};

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const raw = localStorage.getItem("reservations");
    const data: Reservation[] = raw ? JSON.parse(raw) : [];
    // Ensure every reservation has a status
    setReservations(data.map((r) => ({ ...r, status: r.status ?? "pending" })));
  }, []);

  const persist = (updated: Reservation[]) => {
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  const updateStatus = (id: number, newStatus: string) => {
    persist(reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  const deleteReservation = (id: number) => {
    persist(reservations.filter((r) => r.id !== id));
  };

  const filtered = reservations
    .filter((r) =>
      statusFilter === "all" ? true : r.status?.toLowerCase() === statusFilter
    )
    .filter((r) => {
      const term = search.toLowerCase();
      return (
        r.carName?.toLowerCase().includes(term) ||
        r.username?.toLowerCase().includes(term) ||
        r.fullName?.toLowerCase().includes(term)
      );
    })
    .reverse();

  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status?.toLowerCase() === "pending").length,
    confirmed: reservations.filter((r) => r.status?.toLowerCase() === "confirmed").length,
    cancelled: reservations.filter((r) => r.status?.toLowerCase() === "cancelled").length,
  };

  const filterTabs = ["all", "pending", "confirmed", "cancelled"];

  return (
    <motion.div
      className="min-h-screen bg-midnight text-white px-6 pt-28 pb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading text-luxeGold mb-2">Reservation Management</h1>
        <p className="text-slateGray mb-8">
          {reservations.length} reservation{reservations.length !== 1 ? "s" : ""} total
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by car, customer name or username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 bg-[#1a1a1a] border border-[#2a2a2a] focus:border-luxeGold text-white text-sm rounded-xl px-4 py-3 outline-none placeholder:text-slateGray transition-colors duration-200"
          />

          {/* Status filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors duration-200 ${
                  statusFilter === tab
                    ? "bg-luxeGold text-midnight"
                    : "bg-[#1a1a1a] border border-[#2a2a2a] text-slateGray hover:text-white"
                }`}
              >
                {tab} ({counts[tab as keyof typeof counts]})
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
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
                  <th className="px-5 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slateGray">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-t border-[#2a2a2a] ${
                        i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1e1e1e]"
                      }`}
                    >
                      <td className="px-5 py-4 text-white font-medium">{r.carName}</td>
                      <td className="px-5 py-4 text-slate-300">
                        <div>{r.fullName ?? r.username ?? "—"}</div>
                        {r.fullName && r.username && (
                          <div className="text-xs text-slateGray">@{r.username}</div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-300">{r.pickupDate}</td>
                      <td className="px-5 py-4 text-slate-300">{r.returnDate}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full text-white capitalize ${
                            statusColors[r.status?.toLowerCase()] ?? "bg-slateGray"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2 flex-wrap">
                          {r.status?.toLowerCase() !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(r.id, "confirmed")}
                              className="text-xs px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors duration-200"
                            >
                              Confirm
                            </button>
                          )}
                          {r.status?.toLowerCase() !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(r.id, "cancelled")}
                              className="text-xs px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors duration-200"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => deleteReservation(r.id)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-[#3a3a3a] text-slateGray hover:text-white hover:border-white transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-[#2a2a2a] text-xs text-slateGray">
            Showing {filtered.length} of {reservations.length} reservations
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReservationManagement;