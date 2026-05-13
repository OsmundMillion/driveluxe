import { useState } from "react";
import { motion } from "framer-motion";
import { cars as initialCars } from "../../data/carsData";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  available: boolean;
  image: string;
}

const VehicleManagement = () => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [search, setSearch] = useState("");

  const filtered = cars.filter((c) =>
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAvailability = (id: number) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, available: !c.available } : c))
    );
  };

  const available = cars.filter((c) => c.available).length;
  const unavailable = cars.length - available;

  return (
    <motion.div
      className="min-h-screen bg-midnight text-white px-6 pt-28 pb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading text-luxeGold mb-2">Vehicle Management</h1>
        <p className="text-slateGray mb-8">
          {cars.length} vehicles total — {available} available, {unavailable} unavailable
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by make or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 bg-[#1a1a1a] border border-[#2a2a2a] focus:border-luxeGold text-white text-sm rounded-xl px-4 py-3 outline-none placeholder:text-slateGray transition-colors duration-200"
          />
        </div>

        {/* Table */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111] text-slateGray uppercase text-xs tracking-wider">
                  <th className="px-5 py-4 text-left">Vehicle</th>
                  <th className="px-5 py-4 text-left">Year</th>
                  <th className="px-5 py-4 text-left">Price / day</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-slateGray">
                      No vehicles match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((car, i) => (
                    <tr
                      key={car.id}
                      className={`border-t border-[#2a2a2a] ${
                        i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1e1e1e]"
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            alt={`${car.make} ${car.model}`}
                            className="w-14 h-10 object-cover rounded-lg shrink-0"
                          />
                          <span className="text-white font-medium">
                            {car.make} {car.model}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">{car.year}</td>
                      <td className="px-5 py-4 text-slate-300">${car.price}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${
                            car.available ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {car.available ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleAvailability(car.id)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-luxeGold text-luxeGold hover:bg-luxeGold hover:text-midnight transition-colors duration-200 font-semibold"
                        >
                          {car.available ? "Mark Unavailable" : "Mark Available"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-[#2a2a2a] text-xs text-slateGray">
            Showing {filtered.length} of {cars.length} vehicles
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleManagement;