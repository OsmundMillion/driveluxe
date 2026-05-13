import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const [activeSet, setActiveSet] = useState(1);
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const servicesSet1 = [
    { id: 1, name: "Corporate Car Rental", image: "https://images.pexels.com/photos/4964951/pexels-photo-4964951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, name: "Car Rental with Driver", image: "https://images.pexels.com/photos/9519968/pexels-photo-9519968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, name: "Airport Transfer", image: "https://images.pexels.com/photos/29112731/pexels-photo-29112731/free-photo-of-luxury-car-and-private-jet-on-airport-tarmac.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  const servicesSet2 = [
    { id: 4, name: "Self-Drive Rentals", image: "https://images.pexels.com/photos/13275527/pexels-photo-13275527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 5, name: "Event & Wedding Car Rentals", image: "https://images.pexels.com/photos/14745476/pexels-photo-14745476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 6, name: "Luxury Van & SUV Rentals", image: "https://images.pexels.com/photos/11139395/pexels-photo-11139395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSet((prev) => (prev === 1 ? 2 : 1));
    }, 10000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSetClick = (setNumber: number) => {
    setActiveSet(setNumber);
    startInterval(); // reset timer on manual click
  };

  return (
    <section className="py-12 bg-midnight text-white px-4 sm:px-6 lg:px-12">
      <p className="text-center text-champagne uppercase mb-2 tracking-widest">WHAT WE DO</p>
      <h2 className="text-4xl font-semibold text-center text-white mb-8">
        <span className="text-white">Our</span>{" "}
        <span className="text-luxeGold">Services</span>
      </h2>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {(activeSet === 1 ? servicesSet1 : servicesSet2).map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate(`/services/${service.id}`)}
              className="relative bg-[#292929] p-0 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-luxeGold"
            >
              <div className="absolute left-4 top-4 w-10 h-10 bg-luxeGold rounded-full flex items-center justify-center text-midnight font-bold text-lg shadow-md animate-pulse z-10">
                {service.id < 10 ? `0${service.id}` : service.id}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-10 space-x-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSetClick(1)}
          className={`w-6 h-6 rounded-full border border-luxeGold ${
            activeSet === 1 ? "bg-luxeGold" : "bg-transparent"
          }`}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSetClick(2)}
          className={`w-6 h-6 rounded-full border border-luxeGold ${
            activeSet === 2 ? "bg-luxeGold" : "bg-transparent"
          }`}
        />
      </div>
    </section>
  );
};

export default ServicesSection;