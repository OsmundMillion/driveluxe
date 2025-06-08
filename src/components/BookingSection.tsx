import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSection = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [rate, setRate] = useState("");

  const handleSearch = () => {
    navigate("/cars", {
      state: {
        make,
        year,
        maxRate: rate,
      },
    });
  };

  return (
    <section
      className="relative h-[70vh] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1729966085578-c7b281cf11da?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
        <p className="text-center text-luxeGold uppercase mb-4 tracking-widest">
          Reserve Your Ride
        </p>
        <h2 className="text-4xl font-semibold text-center text-white mb-6">s
          <span className="text-white">Rent Your</span>{" "}
          <span className="text-white">Car Today</span>
        </h2>

        <div className="bg-midnight px-6 py-1 rounded-full w-full md:w-3/4 lg:w-1/2 overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Car Make */}
            <div className="relative w-full sm:w-auto min-w-[150px]">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="appearance-none bg-midnight text-[#919191] px-3 py-2 rounded-2xl w-full"
              >
                <option value="" disabled>
                  Choose Car Make
                </option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="bmw">BMW</option>
              </select>
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
            </div>

            <div className="hidden lg:block h-10 border-r border-[#292929]"></div>

            {/* Year */}
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-midnight text-[#919191] px-3 py-2 rounded-2xl w-full sm:w-auto min-w-[150px]"
              placeholder="Year (e.g., 2020)"
            />

            <div className="hidden lg:block h-10 border-r border-[#292929]"></div>

            {/* Max Rate */}
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="bg-midnight text-[#919191] px-3 py-2 rounded-2xl w-full sm:w-auto min-w-[150px]"
              placeholder="Max Daily Rate"
            />

            <div className="hidden lg:block h-10 border-r border-[#292929]"></div>

            {/* Browse Button */}
            <button
              onClick={handleSearch}
              className="py-3 px-6 text-md bg-luxeGold text-black rounded-full hover:bg-white transition w-full sm:w-auto min-w-[150px] text-center"
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
