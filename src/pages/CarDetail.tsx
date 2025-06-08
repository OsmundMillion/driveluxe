import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import BackToTopButton from "../components/BackToTopButton";
import BrandStrip from "../components/BrandStrip";

// Mock data
const carData = [
  {
    id: 1,
    name: "Lamborghini Huracan",
    make: "Lamborghini",
    model: "Huracan",
    year: 2022,
    regNumber: "LUX-001",
    price: 600,
    available: 1,
    image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?q=80&w=2599&auto=format&fit=crop",
  },
  // ... add more cars
];

const rentalConditions = [
  {
    question: "Contract and Annexes",
    answer: "Rental contracts must be signed prior to pickup. An annex outlines specific usage terms and penalties."
  },
  {
    question: "Driving License and Age",
    answer: "Drivers must be 25 years or older with a valid driver’s license held for at least 2 years."
  },
  {
    question: "Prices",
    answer: "All prices include VAT and standard insurance. Additional fees apply for accessories or late returns."
  },
  {
    question: "Payments",
    answer: "We accept major credit cards. Payment is due before vehicle handover."
  },
  {
    question: "Delivery",
    answer: "Delivery is available within 25km of our location at no extra cost. Beyond that, additional fees apply."
  },
  {
    question: "Traffic Fines",
    answer: "Renters are fully responsible for any traffic violations or toll fees during the rental period."
  },
  {
    question: "Fuel Policy",
    answer: "Vehicles must be returned with the same fuel level. Refueling charges apply otherwise."
  }
];

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carData.find((c) => c.id === Number(id));
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  if (!car) {
    return (
      <div className="min-h-screen bg-midnight text-white p-6">
        <h1 className="text-3xl font-heading text-red-500">Car not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-white px-6 pt-28 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/cars" className="text-champagne hover:text-luxeGold text-sm transition-all">
            ← Back to Cars
          </Link>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-heading text-luxeGold mb-8">Car Details</h1>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Image */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Right: Card */}
          <motion.div
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-luxeGold shadow-xl flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Price */}
            <div className="bg-luxeGold text-midnight text-center p-6">
              <h2 className="text-3xl font-extrabold">${car.price}</h2>
              <p className="text-sm">rent per day</p>
            </div>

            {/* Info */}
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
                  <span className="text-white font-semibold">Reg. Number</span>
                  <span>{car.regNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Availability</span>
                  <span className={car.available ? "text-green-400" : "text-red-500"}>
                    {car.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="relative flex items-stretch text-midnight gap-[1px] mt-auto">
              <button
                onClick={() => navigate("/reservations")}
                className="w-1/2 py-3 bg-luxeGold font-semibold hover:bg-champagne transition-colors duration-300"
              >
                Rent Now
              </button>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-midnight text-white border border-luxeGold w-6 h-6 text-xs rounded-full flex items-center justify-center z-10 font-bold">
                🚗
              </div>

              <button
                onClick={() => alert("Added to comparison list")}
                className="w-1/2 py-3 bg-luxeGold font-semibold hover:bg-champagne transition-colors duration-300"
              >
                Compare
              </button>
            </div>
          </motion.div>
        </div>

        {/* Rental Conditions */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Rental Conditions</h3>
          <div className="space-y-6">
            {rentalConditions.map((faq, index) => (
              <div key={index} className="rounded-2xl bg-[#1a1a1a]">
                <button
                  className={`w-full text-left px-6 py-4 flex justify-between items-center rounded-t-2xl transition-colors duration-300 text-sm sm:text-base ${activeFAQ === index ? "bg-luxeGold text-black font-semibold" : "text-white hover:bg-[#2a2a2a]"}`}
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <span className="flex items-center gap-2">
                    <strong>{index + 1}.</strong> {faq.question}
                  </span>
                  <span className="text-xl">{activeFAQ === index ? "˅" : ">"}</span>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 py-4 text-[#cccccc] text-sm">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



        {/* Back To Top */}
        <BackToTopButton />
      </div>
              {/* Branding Strip */}
        <div className="w-full mt-24">
          <BrandStrip />
        </div>
    </div>
  );
};

export default CarDetail;
