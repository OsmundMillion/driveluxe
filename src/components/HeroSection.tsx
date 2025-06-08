import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();


  return (
    <section
      className="relative w-full h-screen bg-cover bg-center cursor-none group"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1612563893490-d86ed296e5e6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-semibold"
          >
            Drive in <span className="text-shine">Luxury</span>, Travel with {" "}
            <span className="text-shine">Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-lg"
          >
            Experience the ultimate driving pleasure with our premium car
            rental service. Choose from our extensive fleet of luxury
            vehicles.
          </motion.p>

          <motion.div
            className="mt-6 flex justify-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/cars")}
              className="px-8 py-3 bg-luxeGold text-black rounded-full shadow-md hover:shadow-xl hover:ring-2 hover:ring-[#F1FFFA] transition-all"
            >
              Browse Cars
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(user ? "/cars" : "/signin")}
              className="px-8 py-3 bg-mintCream text-black rounded-full shadow-md hover:shadow-lg hover:ring-2 hover:ring-[#C6A15C] transition-all"
            >
              {user ? "Start Booking" : "Sign In to Rent"}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-luxeGold text-2xl">
        ↓
      </div>
    </section>
  );
};

export default HeroSection;
