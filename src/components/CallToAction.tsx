import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-[70vh] bg-fixed bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=2608&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="uppercase text-sm text-luxeGold tracking-widest mb-2">Rent Your Car</p>
        <h2 className="text-white text-4xl font-bold mb-2">Interested in Renting?</h2>
        <p className="text-white mb-6">Don't hesitate and send us a message.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-8 py-3 bg-luxeGold text-black rounded-full font-medium hover:bg-champagne transition"
          >
            <FaWhatsapp className="mr-2" /> WhatsApp
          </a>

          <button
            onClick={() => navigate("/cars")}
            className="px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition"
          >
            Rent Now ↗
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
