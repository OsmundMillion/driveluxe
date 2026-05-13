import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cars as carData } from "../data/carsData";

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 text-luxeGold -translate-y-1/2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const BookingSection = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [rate, setRate] = useState("");

  const uniqueMakes = [...new Set(carData.map((car) => car.make))];
  const uniqueYears = [...new Set(carData.map((car) => car.year))].sort();
  const uniqueRates = [...new Set(carData.map((car) => car.price))].sort((a, b) => a - b);

  const handleSearch = () => {
    navigate("/cars", {
      state: { make, year, maxRate: rate },
    });
  };

  const selectClass =
    "appearance-none bg-midnight text-[#919191] px-3 py-2 pr-10 rounded-2xl w-full h-[44px]";

  return (
    <section
      className="relative h-[70vh] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1729966085578-c7b281cf11da?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
        <p className="text-center text-luxeGold uppercase mb-4 tracking-widest">
          Reserve Your Ride
        </p>

        <h2 className="text-4xl font-semibold text-center mb-6">
          <span className="text-champagne">Rent Your</span>{" "}
          <span className="text-white">Car Today</span>
        </h2>

        <div className="bg-midnight px-6 py-4 rounded-full w-full md:w-3/4 lg:w-1/2 overflow-hidden">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center w-full">

              {/* Make */}
              <div className="relative w-[160px]">
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>Choose Make</option>
                  {uniqueMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>

              {/* Year */}
              <div className="relative w-[100px]">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Year</option>
                  {uniqueYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>

              {/* Max Rate */}
              <div className="relative w-[130px]">
                <select
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Max Rate</option>
                  {uniqueRates.map((r) => (
                    <option key={r} value={r}>${r}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Browse Button */}
            <button
              onClick={handleSearch}
              className="px-6 h-[44px] bg-luxeGold text-midnight font-semibold rounded-full hover:bg-champagne transition whitespace-nowrap"
            >
              Browse Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;