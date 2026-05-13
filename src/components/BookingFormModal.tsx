import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface BookingFormModalProps {
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
  onClose: () => void;
  // When provided, we're modifying an existing reservation
  existingReservationId?: number;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  car,
  onClose,
  existingReservationId,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [dateError, setDateError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // If user isn't logged in, show a prompt instead of the form
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4"
        onClick={onClose}
      >
        <motion.div
          className="bg-midnight rounded-3xl w-full max-w-md p-8 text-center border border-slateGray/30"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-2xl font-bold text-pearlWhite mb-2">Sign in required</p>
          <p className="text-slateGray mb-6 text-sm">
            You need to be signed in to make a reservation.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/signin")}
              className="bg-luxeGold text-midnight font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Sign In
            </button>
            <button
              onClick={onClose}
              className="bg-[#2a2a2a] text-white px-6 py-2 rounded-full hover:bg-[#333] transition"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const validateDates = (): boolean => {
    if (!pickupDate || !returnDate) {
      setDateError("Both pickup and return dates are required.");
      return false;
    }
    if (new Date(returnDate) <= new Date(pickupDate)) {
      setDateError("Return date must be after the pickup date.");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDates()) return;

    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");

    if (existingReservationId) {
      // Modify existing reservation
      const updated = reservations.map((r: any) =>
        r.id === existingReservationId
          ? { ...r, pickupDate, returnDate, additionalNote }
          : r
      );
      localStorage.setItem("reservations", JSON.stringify(updated));
    } else {
      // Create new reservation
      const newReservation = {
        id: Date.now(),
        car,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        pickupDate,
        returnDate,
        additionalNote,
        status: "Upcoming",
      };
      reservations.push(newReservation);
      localStorage.setItem("reservations", JSON.stringify(reservations));
    }

    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-midnight rounded-3xl overflow-hidden w-full max-w-2xl border border-slateGray/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-luxeGold text-midnight text-xl font-bold px-6 py-4 flex justify-between items-center">
          <span>{existingReservationId ? "Modify Booking" : "Booking Form"}</span>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            // ── Success state ──
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-pearlWhite mb-2">
                {existingReservationId ? "Booking Updated!" : "Booking Confirmed!"}
              </h3>
              <p className="text-slateGray text-sm mb-1">
                {car.make} {car.model} — {pickupDate} to {returnDate}
              </p>
              <p className="text-slateGray text-sm mb-6">
                We'll see you soon, {user.fullName.split(" ")[0]}.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate("/reservations")}
                  className="bg-luxeGold text-midnight font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
                >
                  View Reservations
                </button>
                <button
                  onClick={onClose}
                  className="bg-[#2a2a2a] text-white px-6 py-2 rounded-full hover:bg-[#333] transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          ) : (
            // ── Form state ──
            <motion.form
              key="form"
              className="space-y-4 p-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
            >
              {/* Read-only user info */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none opacity-70 cursor-not-allowed"
                  value={user.fullName}
                  readOnly
                />
                <input
                  type="email"
                  className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none opacity-70 cursor-not-allowed"
                  value={user.email}
                  readOnly
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="tel"
                  className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none opacity-70 cursor-not-allowed"
                  value={user.phoneNumber}
                  readOnly
                />
                <input
                  type="text"
                  className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none opacity-70 cursor-not-allowed"
                  value={`${car.make} ${car.model} (${car.year})`}
                  readOnly
                />
              </div>

              {/* Dates */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label className="text-xs text-slateGray mb-1 block">Pickup Date</label>
                  <input
                    type="date"
                    className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-luxeGold"
                    value={pickupDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => { setPickupDate(e.target.value); setDateError(""); }}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="text-xs text-slateGray mb-1 block">Return Date</label>
                  <input
                    type="date"
                    className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-luxeGold"
                    value={returnDate}
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => { setReturnDate(e.target.value); setDateError(""); }}
                    required
                  />
                </div>
              </div>

              {dateError && (
                <p className="text-red-400 text-xs">{dateError}</p>
              )}

              <textarea
                rows={3}
                placeholder="Additional notes (optional)"
                className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-luxeGold resize-none"
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-luxeGold text-midnight py-3 font-semibold rounded-full hover:opacity-90 transition"
              >
                {existingReservationId ? "Update Booking" : "Rent Now"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BookingFormModal;