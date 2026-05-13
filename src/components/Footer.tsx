import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-midnight text-pearlWhite py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
        {/* Brand + Social */}
        <div className="flex flex-col items-center md:flex-row md:justify-between mb-8">
          <div className="text-center md:text-left max-w-sm">
            <h2 className="text-3xl font-semibold text-champagne mb-2">DriveLuxe</h2>
            <p className="text-pearlWhite/80 mb-4 text-sm leading-relaxed">
              Experience the ultimate driving pleasure with our premium car rental service.
              Choose from our extensive fleet of luxury vehicles.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Social links kept as <a> since they go to external sites.
                  Placeholder hrefs — update with real URLs before going live. */}
              <a
                href="#"
                aria-label="WhatsApp"
                className="text-champagne hover:text-luxeGold transition"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-champagne hover:text-luxeGold transition"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-champagne hover:text-luxeGold transition"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-xl font-semibold text-champagne mb-3">Quick Links</h4>
            <ul className="text-pearlWhite/80 space-y-2 text-sm">
              <li>
                <Link to="/cars" className="hover:text-champagne transition">
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-champagne transition">
                  Reservations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-champagne transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-champagne transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-champagne mb-2">Subscribe</h4>
          <p className="text-pearlWhite/80 mb-4 text-sm">
            Want to be notified about our services? Sign up and we'll send you updates by email.
          </p>
          <div className="flex items-center justify-center md:justify-start">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 w-72 rounded-l-lg bg-[#1A1F2E] text-pearlWhite placeholder-slateGray focus:outline-none focus:ring-2 focus:ring-luxeGold"
            />
            <button className="px-6 py-2 rounded-r-lg bg-luxeGold text-midnight font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 text-center text-slateGray text-xs">
        <p>&copy; {new Date().getFullYear()} DriveLuxe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;