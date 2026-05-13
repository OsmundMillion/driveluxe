import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";

const CompareTray = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-luxeGold shadow-2xl px-4 py-3"
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
            {/* Car chips */}
            <div className="flex flex-wrap gap-2 flex-grow">
              {compareList.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-2 bg-[#1a1a1a] border border-luxeGold/40 rounded-full px-3 py-1 text-sm text-champagne"
                >
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>
                    {car.make} {car.model}
                  </span>
                  <button
                    onClick={() => removeFromCompare(car.id)}
                    className="text-slateGray hover:text-red-400 transition-colors ml-1 leading-none"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex items-center gap-2 border border-dashed border-luxeGold/20 rounded-full px-3 py-1 text-sm text-slateGray"
                >
                  + Add car
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={clearCompare}
                className="text-sm text-slateGray hover:text-red-400 transition-colors px-2"
              >
                Clear
              </button>
              <Link
                to="/compare"
                className="bg-luxeGold text-midnight text-sm font-semibold px-5 py-2 rounded-full hover:bg-champagne transition-colors"
              >
                Compare {compareList.length} car{compareList.length > 1 ? "s" : ""} →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareTray;