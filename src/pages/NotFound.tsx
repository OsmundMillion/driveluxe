import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
    >
      <p className="text-8xl font-bold text-luxeGold mb-4">404</p>
      <h1 className="text-3xl font-semibold text-pearlWhite mb-3">Page Not Found</h1>
      <p className="text-slateGray max-w-md mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="bg-luxeGold text-midnight font-semibold px-8 py-3 rounded hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}