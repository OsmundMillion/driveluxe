import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BackToTopButton from "../components/BackToTopButton";
import BrandStrip from "../components/BrandStrip";
import { cars as carData } from "../data/carsData";
import BookingFormModal from "../components/BookingFormModal";
import { useCompare } from "../context/CompareContext";

const rentalConditions = [
  {
    question: "Contract and Annexes",
    answer:
      "Rental contracts must be signed prior to pickup. An annex outlines specific usage terms and penalties.",
  },
  {
    question: "Driving License and Age",
    answer:
      "Drivers must be 25 years or older with a valid driver's license held for at least 2 years.",
  },
  {
    question: "Prices",
    answer:
      "All prices include VAT and standard insurance. Additional fees apply for accessories or late returns.",
  },
  {
    question: "Payments",
    answer: "We accept major credit cards. Payment is due before vehicle handover.",
  },
  {
    question: "Delivery",
    answer:
      "Delivery is available within 25km of our location at no extra cost. Beyond that, additional fees apply.",
  },
  {
    question: "Traffic Fines",
    answer:
      "Renters are fully responsible for any traffic violations or toll fees during the rental period.",
  },
  {
    question: "Fuel Policy",
    answer:
      "Vehicles must be returned with the same fuel level. Refueling charges apply otherwise.",
  },
];

const CarDetail = () => {
  const { id } = useParams();
  const car = carData.find((c) => c.id === Number(id));
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [compareMsg, setCompareMsg] = useState<string | null>(null);

  const { addToCompare, isInCompare } = useCompare();

  if (!car) {
    return (
      <motion.div
        className="min-h-screen bg-midnight text-white flex flex-col items-center justify-center gap-4 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-heading text-red-500">Car not found.</h1>
        <Link
          to="/cars"
          className="text-champagne hover:text-luxeGold text-sm transition-all underline"
        >
          ← Back to Cars
        </Link>
      </motion.div>
    );
  }

  const handleCompare = () => {
    const result = addToCompare({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      image: car.image,
      available: car.available,
    });

    if (result === "max_reached") {
      setCompareMsg("Max 3 cars");
    } else if (result === "already_added") {
      setCompareMsg("Already added");
    } else {
      setCompareMsg("✓ Added");
    }
    setTimeout(() => setCompareMsg(null), 2000);
  };

  return (
    <motion.div
      className="min-h-screen bg-midnight text-white px-6 pt-28 pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/cars"
            className="text-champagne hover:text-luxeGold text-sm transition-all"
          >
            ← Back to Cars
          </Link>
        </div>

        <h1 className="text-3xl font-heading text-luxeGold mb-8">Car Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Car image */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-luxeGold shadow-xl flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-luxeGold text-midnight text-center p-6">
              <h2 className="text-3xl font-extrabold">${car.price}</h2>
              <p className="text-sm">rent per day</p>
            </div>

            <div className="flex flex-col justify-between flex-grow p-6 text-slate-300 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Make</span>
                  <span>{car.make}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Model</span>
                  <span>{car.model}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Year</span>
                  <span>{car.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Availability</span>
                  <span className={car.available ? "text-green-400" : "text-red-500"}>
                    {car.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="relative flex items-stretch text-midnight gap-[1px] mt-auto">
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-1/2 py-3 bg-luxeGold font-semibold hover:bg-champagne transition-colors duration-300"
              >
                Rent Now
              </button>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-midnight text-white border border-luxeGold w-6 h-6 text-xs rounded-full flex items-center justify-center z-10 font-bold">
                🚗
              </div>

              <button
                onClick={handleCompare}
                className={`relative w-1/2 py-3 font-semibold transition-colors duration-300 ${
                  isInCompare(car.id)
                    ? "bg-green-500 text-white"
                    : "bg-luxeGold text-midnight hover:bg-champagne"
                }`}
              >
                <AnimatePresence mode="wait">
                  {compareMsg ? (
                    <motion.span
                      key="msg"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="block text-sm"
                    >
                      {compareMsg}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="compare"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="block"
                    >
                      {isInCompare(car.id) ? "✓ In Compare" : "Compare"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Rental Conditions accordion */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Rental Conditions</h3>
          <div className="space-y-3">
            {rentalConditions.map((faq, index) => (
              <div key={index} className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                <button
                  className={`w-full text-left px-6 py-4 flex justify-between items-center transition-colors duration-300 text-sm sm:text-base ${
                    activeFAQ === index
                      ? "bg-luxeGold text-black font-semibold"
                      : "text-white hover:bg-[#2a2a2a]"
                  }`}
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <span className="flex items-center gap-2">
                    <strong>{index + 1}.</strong> {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: activeFAQ === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg leading-none"
                  >
                    ›
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {activeFAQ === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 py-4 text-[#cccccc] text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <BackToTopButton />
      </div>

      <div className="w-full mt-24">
        <BrandStrip />
      </div>

      {showBookingForm && (
        <BookingFormModal car={car} onClose={() => setShowBookingForm(false)} />
      )}
    </motion.div>
  );
};

export default CarDetail;