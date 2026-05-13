import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton";
import BrandStrip from "../components/BrandStrip";
import BookingFormModal from "../components/BookingFormModal";

interface Reservation {
  id: number;
  car: {
    id: number;
    make: string;
    model: string;
    year: number;
    regNumber: string;
    price: number;
    image: string;
    available: boolean;
  };
  fullName: string;
  email: string;
  phoneNumber: string;
  pickupDate: string;   // consistent casing — matches BookingFormModal
  returnDate: string;
  additionalNote?: string;
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  Upcoming: "bg-blue-500",
  Confirmed: "bg-green-600",
  Active: "bg-yellow-500",
  Past: "bg-slateGray",
};

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState("All");
  const [modifyingReservation, setModifyingReservation] = useState<Reservation | null>(null);
  const navigate = useNavigate();

  const loadReservations = () => {
    const stored = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(stored);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const filteredReservations =
    filter === "All"
      ? reservations
      : reservations.filter((r) => r.status === filter);

  const handleCancelBooking = (id: number) => {
    const updated = reservations.filter((r) => r.id !== id);
    localStorage.setItem("reservations", JSON.stringify(updated));
    setReservations(updated);
  };

  const handleConfirmBooking = (id: number) => {
    const updated = reservations.map((r) =>
      r.id === id ? { ...r, status: "Confirmed" } : r
    );
    localStorage.setItem("reservations", JSON.stringify(updated));
    setReservations(updated);
  };

  // After modal closes, reload so updated data is reflected
  const handleModalClose = () => {
    setModifyingReservation(null);
    loadReservations();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-midnight text-white">
      {/* Hero Banner */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1484136540910-d66bb475348d?q=80&w=2753&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
          <p className="uppercase text-sm tracking-widest text-champagne mb-2">Your Dashboard</p>
          <h1 className="text-5xl font-bold">
            <span className="text-white">Manage</span>{" "}
            <span className="text-luxeGold">Bookings</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["All", "Upcoming", "Confirmed", "Active", "Past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === tab
                  ? "bg-luxeGold text-black"
                  : "bg-[#1e1e1e] text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredReservations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slateGray text-lg mb-4">No bookings found.</p>
            <button
              onClick={() => navigate("/cars")}
              className="bg-luxeGold text-midnight font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReservations.map((reservation) => {
              const statusColor = STATUS_COLORS[reservation.status] || "bg-slateGray";

              return (
                <motion.div
                  key={reservation.id}
                  className="bg-[#1a1a1a] rounded-2xl shadow-xl p-6 flex flex-col lg:flex-row gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={reservation.car.image}
                    alt={`${reservation.car.make} ${reservation.car.model}`}
                    className="w-full lg:w-72 h-48 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-white">
                        {reservation.car.make} {reservation.car.model}
                      </h3>
                      <span
                        className={`text-sm text-white px-3 py-1 rounded-full ${statusColor}`}
                      >
                        {reservation.status}
                      </span>
                    </div>

                    <p className="text-xs text-slateGray">Booking #{reservation.id}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-slateGray uppercase tracking-wide">Pickup Date</p>
                        <p className="font-semibold text-white">{formatDate(reservation.pickupDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slateGray uppercase tracking-wide">Return Date</p>
                        <p className="font-semibold text-white">{formatDate(reservation.returnDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slateGray uppercase tracking-wide">Rate</p>
                        <p className="font-semibold text-white">
                          ${reservation.car.price.toLocaleString()} / day
                        </p>
                      </div>
                    </div>

                    {reservation.additionalNote && (
                      <p className="text-sm text-slateGray mt-1 italic">
                        "{reservation.additionalNote}"
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        className="bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-full text-sm transition"
                        onClick={() => navigate(`/cars/${reservation.car.id}`)}
                      >
                        View Car
                      </button>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition"
                        onClick={() => setModifyingReservation(reservation)}
                      >
                        Modify
                      </button>
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition"
                        onClick={() => handleConfirmBooking(reservation.id)}
                        disabled={reservation.status === "Confirmed"}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
                        onClick={() => handleCancelBooking(reservation.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modify modal */}
      {modifyingReservation && (
        <BookingFormModal
          car={modifyingReservation.car}
          existingReservationId={modifyingReservation.id}
          onClose={handleModalClose}
        />
      )}

      <BrandStrip />
      <BackToTopButton />
    </section>
  );
};

export default Reservations;