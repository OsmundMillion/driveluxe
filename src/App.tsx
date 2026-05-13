import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Context
import { AuthProvider } from "./context/AuthContext";
import { CompareProvider } from "./context/CompareContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CompareTray from "./components/CompareTray";

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Compare from "./pages/Compare";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ServiceDetails from "./pages/ServiceDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VehicleManagement from "./pages/admin/VehicleManagement";
import ReservationManagement from "./pages/admin/ReservationManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";

// ProtectedRoute + 404
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


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
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/:id" element={<ServiceDetails />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin" element={<AdminDashboard />} />} />
            <Route path="/admin/vehicles" element={<ProtectedRoute requiredRole="admin" element={<VehicleManagement />} />} />
            <Route path="/admin/reservations" element={<ProtectedRoute requiredRole="admin" element={<ReservationManagement />} />} />
            <Route path="/admin/customers" element={<ProtectedRoute requiredRole="admin" element={<CustomerManagement />} />} />

            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <CompareTray />
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
      <AuthProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </AuthProvider>
    </Router>
  );
}