import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Cars", to: "/cars" },
  { label: "Reservations", to: "/reservations" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const linkClass = (path: string) =>
    isActive(path)
      ? "text-luxeGold font-semibold border-b-2 border-luxeGold"
      : "text-pearlWhite hover:text-champagne transition-colors duration-200";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        scrolling || menuOpen ? "bg-midnight/90" : "bg-transparent"
      } backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading text-champagne">
          DriveLuxe
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6 text-base">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} className={`relative inline-block ${linkClass(to)}`}>
              {label}
            </Link>
          ))}

          {user ? (
            <>
              <span className="text-slateGray text-sm">Hi, {user.fullName.split(" ")[0]}</span>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className={`relative inline-block ${linkClass("/admin")}`}>
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-pearlWhite hover:text-champagne transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className={`relative inline-block ${linkClass("/signin")}`}>
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-luxeGold text-midnight font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-pearlWhite text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-midnight/95 px-6 pb-6 flex flex-col space-y-4 text-base border-t border-slateGray/20">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} className={linkClass(to)}>
              {label}
            </Link>
          ))}

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className={linkClass("/admin")}>
                  Admin Dashboard
                </Link>
              )}
              <span className="text-slateGray text-sm">Signed in as {user.fullName}</span>
              <button
                onClick={handleLogout}
                className="text-left text-pearlWhite hover:text-champagne transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className={linkClass("/signin")}>
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-block bg-luxeGold text-midnight font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition w-fit"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;