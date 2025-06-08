import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import ServiceDetails from "./pages/ServiceDetails";

function App() {
  const location = useLocation();

  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const move = (e: MouseEvent) => {
      if (dot) {
        dot.style.top = `${e.clientY}px`;
        dot.style.left = `${e.clientX}px`;
      }
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="font-body bg-midnight text-pearlWhite min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} /> {/* ← Car Detail Route */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <div
        id="cursor-dot"
        className="fixed top-0 left-0 w-4 h-4 bg-[#B33F62] rounded-full pointer-events-none z-50 hidden sm:block"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
