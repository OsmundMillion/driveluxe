import { useLocation, useNavigate } from "react-router-dom";
import { cars as carData } from "../data/carsData";
import { FaArrowRight, FaSearch, FaSlidersH, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackToTopButton from "../components/BackToTopButton";
import BrandStrip from "../components/BrandStrip";

const uniqueMakes = [...new Set(carData.map((car) => car.make))].slice(0, 7);
const uniqueYears = [...new Set(carData.map((car) => car.year))].sort();
const priceRanges = [
  { label: "< $400", max: 399 },
  { label: "$400 – $600", max: 600 },
  { label: "> $600", max: 10000 },
];

interface FilterPanelProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  make: string;
  year: number;
  maxRate: number;
  setMake: (m: string) => void;
  setYear: (y: number) => void;
  setMaxRate: (r: number) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  make,
  year,
  maxRate,
  setMake,
  setYear,
  setMaxRate,
  hasActiveFilters,
  clearFilters,
}: FilterPanelProps) => (
  <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl">
    {/* Search */}
    <div className="bg-luxeGold px-4 py-4">
      <div className="bg-[#1a1a1a] rounded-full flex items-center overflow-hidden">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-[#999] px-4 py-2 w-full focus:outline-none text-sm"
        />
        <div className="bg-luxeGold p-3 rounded-full flex-shrink-0">
          <FaSearch className="text-black text-sm" />
        </div>
      </div>
    </div>

    <div className="px-6 py-6 space-y-6">
      {/* Make */}
      <div>
        <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Make</p>
        <div className="space-y-2">
          {uniqueMakes.map((m) => (
            <label key={m} className="flex items-center gap-2 text-[#ccc] text-sm cursor-pointer">
              <input
                type="radio"
                name="make"
                value={m}
                checked={make === m}
                onChange={() => setMake(m)}
                className="accent-luxeGold"
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Year</p>
        <div className="space-y-2">
          {uniqueYears.map((y) => (
            <label key={y} className="flex items-center gap-2 text-[#ccc] text-sm cursor-pointer">
              <input
                type="radio"
                name="year"
                value={y}
                checked={year === y}
                onChange={() => setYear(y)}
                className="accent-luxeGold"
              />
              {y}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Price / Day</p>
        <div className="space-y-2">
          {priceRanges.map(({ label, max }) => (
            <label key={label} className="flex items-center gap-2 text-[#ccc] text-sm cursor-pointer">
              <input
                type="radio"
                name="rate"
                checked={maxRate === max}
                onChange={() => setMaxRate(max)}
                className="accent-luxeGold"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 rounded-full bg-luxeGold text-midnight text-sm font-semibold hover:opacity-90 transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  </div>
);

const Cars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const filters = location.state || {};
  const { make, year, maxRate } = filters;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const carsPerPage = 10;

  const filteredCars = carData.filter((car) => {
    const matchesMake = !make || car.make === make;
    const matchesYear = !year || car.year === Number(year);
    const matchesRate = !maxRate || car.price <= Number(maxRate);
    const matchesSearch =
      !searchQuery ||
      `${car.make} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMake && matchesYear && matchesRate && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
  }, [make, year, maxRate, searchQuery]);

  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + carsPerPage);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const setMake = (m: string) => navigate("/cars", { state: { make: m, year, maxRate } });
  const setYear = (y: number) => navigate("/cars", { state: { make, year: y, maxRate } });
  const setMaxRate = (r: number) => navigate("/cars", { state: { make, year, maxRate: r } });
  const clearFilters = () => { navigate("/cars"); setSearchQuery(""); };

  const hasActiveFilters = make || year || maxRate || searchQuery;

  return (
    <section className="min-h-screen bg-midnight text-white">
      {/* Hero Banner */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=2670&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center text-center z-10">
          <p className="uppercase text-sm tracking-widest text-champagne mb-2">Rent Now</p>
          <h1 className="text-5xl font-bold">
            <span className="text-white">Browse</span>{" "}
            <span className="text-luxeGold">Cars</span>
          </h1>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <p className="text-slateGray text-sm">
          {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} found
        </p>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-luxeGold text-midnight font-semibold px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
        >
          <FaSlidersH /> Filters {hasActiveFilters && "•"}
        </button>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-[300px] z-50 overflow-y-auto bg-midnight lg:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slateGray/20">
                <p className="font-semibold text-champagne">Filters</p>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <FaTimes className="text-pearlWhite text-lg" />
                </button>
              </div>
              <div className="p-4">
                <FilterPanel
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  make={make}
                  year={year}
                  maxRate={maxRate}
                  setMake={setMake}
                  setYear={setYear}
                  setMaxRate={setMaxRate}
                  hasActiveFilters={!!hasActiveFilters}
                  clearFilters={clearFilters}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0 sticky top-24">
          <FilterPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            make={make}
            year={year}
            maxRate={maxRate}
            setMake={setMake}
            setYear={setYear}
            setMaxRate={setMaxRate}
            hasActiveFilters={!!hasActiveFilters}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Car grid */}
        <div className="flex-1 min-w-0">
          <p className="text-slateGray text-sm mb-4 hidden lg:block">
            {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} found
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredCars.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slateGray mb-4">No cars match your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="bg-luxeGold text-midnight font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {paginatedCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden hover:ring-1 hover:ring-luxeGold transition-all duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 space-y-2">
                        <h3 className="text-xl font-heading text-luxeGold">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-slateGray">{car.year}</p>
                        <p className="text-md font-bold text-white">
                          ${car.price.toLocaleString()} / day
                        </p>
                        <button
                          onClick={() => navigate(`/cars/${car.id}`)}
                          className="w-full mt-3 py-2 bg-luxeGold text-midnight rounded-full hover:bg-champagne flex items-center justify-center gap-2 transition font-semibold text-sm"
                        >
                          View Details <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-3 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full bg-[#1e1e1e] text-white flex items-center justify-center hover:bg-luxeGold disabled:opacity-30 transition"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        currentPage === i + 1
                          ? "bg-luxeGold text-midnight"
                          : "bg-[#1e1e1e] text-white hover:bg-luxeGold"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full bg-[#1e1e1e] text-white flex items-center justify-center hover:bg-luxeGold disabled:opacity-30 transition"
                  >
                    ›
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BrandStrip />
      <BackToTopButton />
    </section>
  );
};

export default Cars;