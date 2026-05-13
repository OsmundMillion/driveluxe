import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";

const rows: { label: string; key: keyof ReturnType<typeof useCompare>["compareList"][0] }[] = [
  { label: "Make", key: "make" },
  { label: "Model", key: "model" },
  { label: "Year", key: "year" },
  { label: "Price / day", key: "price" },
  { label: "Availability", key: "available" },
];

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <motion.div
        className="min-h-screen bg-midnight text-white flex flex-col items-center justify-center gap-6 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading text-luxeGold">Nothing to Compare</h1>
        <p className="text-slateGray text-sm">
          Browse cars and hit "Compare" to add them here.
        </p>
        <Link
          to="/cars"
          className="bg-luxeGold text-midnight font-semibold px-6 py-3 rounded-full hover:bg-champagne transition-colors"
        >
          Browse Cars
        </Link>
      </motion.div>
    );
  }

  const formatValue = (key: string, value: unknown) => {
    if (key === "price") return `$${value}/day`;
    if (key === "available")
      return value ? (
        <span className="text-green-400">Available</span>
      ) : (
        <span className="text-red-500">Unavailable</span>
      );
    return String(value);
  };

  return (
    <motion.div
      className="min-h-screen bg-midnight text-white px-6 pt-28 pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link to="/cars" className="text-champagne hover:text-luxeGold text-sm">
              ← Back to Cars
            </Link>
            <h1 className="text-3xl font-heading text-luxeGold mt-2">Compare Cars</h1>
          </div>
          <button
            onClick={clearCompare}
            className="text-sm text-slateGray hover:text-red-400 transition-colors border border-slateGray/30 px-4 py-2 rounded-full"
          >
            Clear All
          </button>
        </div>

        {/* Car images header */}
        <div className="grid gap-4 mb-8"
          style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
        >
          <div /> {/* empty label column */}
          {compareList.map((car) => (
            <div key={car.id} className="relative group">
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-40 object-cover rounded-2xl shadow-lg"
              />
              <div className="mt-2 text-center">
                <p className="text-white font-semibold text-sm">
                  {car.make} {car.model}
                </p>
                <p className="text-slateGray text-xs">{car.year}</p>
              </div>
              <button
                onClick={() => removeFromCompare(car.id)}
                className="absolute top-2 right-2 bg-midnight/80 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Remove from comparison"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl overflow-hidden border border-luxeGold/20">
          {rows.map((row, i) => (
            <div
              key={row.key}
              className={`grid items-center ${
                i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#151515]"
              }`}
              style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
            >
              <div className="px-5 py-4 text-slateGray text-sm font-semibold">
                {row.label}
              </div>
              {compareList.map((car) => (
                <div key={car.id} className="px-5 py-4 text-sm text-champagne">
                  {formatValue(row.key, car[row.key])}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* View detail links */}
        <div
          className="grid gap-4 mt-6"
          style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}
        >
          <div />
          {compareList.map((car) => (
            <Link
              key={car.id}
              to={`/cars/${car.id}`}
              className="block text-center bg-luxeGold text-midnight text-sm font-semibold py-2 rounded-full hover:bg-champagne transition-colors"
            >
              View / Rent
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Compare;